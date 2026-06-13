import type { EmbeddedPiece } from "./types";
import { corpus } from "./corpus";
import { buildEmbedText } from "./corpus/helpers";

const EMBED_MODEL = "embed-v4.0";
const RERANK_MODEL = "rerank-v4.0-pro";
const EMBED_DIMENSION = 1024;
const RECALL_TOP_K = 30;
const RERANK_TOP_N = 10;
const BATCH_SIZE = 96;

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

interface PrecomputedEmbeddings {
  version: number;
  model: string;
  dimension: number;
  count: number;
  embeddings: Record<string, number[]>;
}

function getApiKey(): string {
  const key = process.env.NEXT_PUBLIC_COHERE_API_KEY;
  if (!key) throw new Error("NEXT_PUBLIC_COHERE_API_KEY is not set");
  return key;
}

async function coherePost(endpoint: string, body: Record<string, unknown>) {
  const res = await fetch(`https://api.cohere.com/v2/${endpoint}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getApiKey()}`,
      "Content-Type": "application/json",
      "X-Client-Name": "repertoire",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(
      (err as { message?: string }).message ?? `Cohere ${endpoint} failed: ${res.status}`
    );
  }
  return res.json();
}

function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0,
    normA = 0,
    normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  const denom = Math.sqrt(normA) * Math.sqrt(normB);
  return denom === 0 ? 0 : dot / denom;
}

let embeddedCorpus: EmbeddedPiece[] | null = null;
let embeddingPromise: Promise<EmbeddedPiece[]> | null = null;

async function loadPrecomputedEmbeddings(): Promise<EmbeddedPiece[]> {
  const res = await fetch(`${basePath}/corpus-embeddings.json`);
  if (!res.ok) {
    throw new Error(`Could not load corpus embeddings (${res.status})`);
  }

  const data = (await res.json()) as PrecomputedEmbeddings;
  const pieces: EmbeddedPiece[] = [];

  for (const piece of corpus) {
    const embedding = data.embeddings[piece.id];
    if (!embedding) {
      throw new Error(`Missing embedding for ${piece.id}`);
    }
    pieces.push({
      ...piece,
      embedding,
      embedText: buildEmbedText(piece),
    });
  }

  return pieces;
}

async function embedCorpusLive(): Promise<EmbeddedPiece[]> {
  const pieces: EmbeddedPiece[] = [];

  for (let i = 0; i < corpus.length; i += BATCH_SIZE) {
    const batch = corpus.slice(i, i + BATCH_SIZE);
    const texts = batch.map(buildEmbedText);

    const data = await coherePost("embed", {
      model: EMBED_MODEL,
      texts,
      input_type: "search_document",
      embedding_types: ["float"],
      output_dimension: EMBED_DIMENSION,
    });

    const embeddings: number[][] = data.embeddings?.float ?? [];
    for (let j = 0; j < batch.length; j++) {
      pieces.push({
        ...batch[j],
        embedding: embeddings[j],
        embedText: texts[j],
      });
    }
  }

  return pieces;
}

export async function getEmbeddedCorpus(): Promise<EmbeddedPiece[]> {
  if (embeddedCorpus) return embeddedCorpus;
  if (embeddingPromise) return embeddingPromise;

  embeddingPromise = (async () => {
    try {
      embeddedCorpus = await loadPrecomputedEmbeddings();
    } catch {
      embeddedCorpus = await embedCorpusLive();
    }
    return embeddedCorpus;
  })();

  return embeddingPromise;
}

export function getCorpusStatus() {
  return { loaded: embeddedCorpus !== null, size: corpus.length };
}

export interface ClientSearchResult {
  query: string;
  embedResults: Array<{ piece: EmbeddedPiece; score: number }>;
  rerankResults: Array<{ piece: EmbeddedPiece; score: number }>;
  timings: { embedMs: number; cosineMs: number; rerankMs: number; totalMs: number };
  corpusSize: number;
}

export async function search(query: string): Promise<ClientSearchResult> {
  const totalStart = Date.now();

  const embedStart = Date.now();
  const [embeddedPieces, queryData] = await Promise.all([
    getEmbeddedCorpus(),
    coherePost("embed", {
      model: EMBED_MODEL,
      texts: [query],
      input_type: "search_query",
      embedding_types: ["float"],
      output_dimension: EMBED_DIMENSION,
    }),
  ]);
  const queryEmbedding: number[] = queryData.embeddings?.float?.[0] ?? [];
  const embedMs = Date.now() - embedStart;

  const cosineStart = Date.now();
  const scored = embeddedPieces.map((piece) => ({
    piece,
    score: cosineSimilarity(queryEmbedding, piece.embedding),
  }));
  scored.sort((a, b) => b.score - a.score);
  const topK = scored.slice(0, RECALL_TOP_K);
  const cosineMs = Date.now() - cosineStart;

  const documents = topK.map(({ piece }) => piece.embedText);

  const rerankStart = Date.now();
  const rerankData = await coherePost("rerank", {
    model: RERANK_MODEL,
    query,
    documents,
    top_n: RERANK_TOP_N,
  });
  const rerankMs = Date.now() - rerankStart;

  const rerankResults = (rerankData.results ?? []).map(
    (r: { index: number; relevance_score: number }) => ({
      piece: topK[r.index].piece,
      score: r.relevance_score,
    })
  );

  const embedResults = topK.slice(0, RERANK_TOP_N).map((item) => ({
    piece: item.piece,
    score: Math.max(0, Math.min(1, (item.score + 1) / 2)),
  }));

  return {
    query,
    embedResults,
    rerankResults,
    timings: { embedMs, cosineMs, rerankMs, totalMs: Date.now() - totalStart },
    corpusSize: corpus.length,
  };
}
