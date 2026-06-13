import { corpus } from "./corpus";
import {
  EMBED_DIMENSION,
  EMBED_MODEL,
  getCohereClient,
} from "./cohere";
import { buildEmbedText } from "./corpus/helpers";
import type { EmbeddedPiece } from "./types";

const BATCH_SIZE = 96;

let embeddedCorpus: EmbeddedPiece[] | null = null;
let embeddingPromise: Promise<EmbeddedPiece[]> | null = null;

async function embedBatch(texts: string[]): Promise<number[][]> {
  const cohere = getCohereClient();
  const response = await cohere.v2.embed({
    model: EMBED_MODEL,
    texts,
    inputType: "search_document",
    embeddingTypes: ["float"],
    outputDimension: EMBED_DIMENSION,
  });

  const embeddings = response.embeddings?.float;
  if (!embeddings || embeddings.length !== texts.length) {
    throw new Error("Failed to embed corpus batch");
  }

  return embeddings;
}

export async function getEmbeddedCorpus(): Promise<EmbeddedPiece[]> {
  if (embeddedCorpus) return embeddedCorpus;
  if (embeddingPromise) return embeddingPromise;

  embeddingPromise = (async () => {
    const pieces: EmbeddedPiece[] = [];

    for (let i = 0; i < corpus.length; i += BATCH_SIZE) {
      const batch = corpus.slice(i, i + BATCH_SIZE);
      const texts = batch.map(buildEmbedText);
      const embeddings = await embedBatch(texts);

      for (let j = 0; j < batch.length; j++) {
        pieces.push({
          ...batch[j],
          embedding: embeddings[j],
          embedText: texts[j],
        });
      }
    }

    embeddedCorpus = pieces;
    return pieces;
  })();

  return embeddingPromise;
}

export async function embedQuery(query: string): Promise<number[]> {
  const cohere = getCohereClient();
  const response = await cohere.v2.embed({
    model: EMBED_MODEL,
    texts: [query],
    inputType: "search_query",
    embeddingTypes: ["float"],
    outputDimension: EMBED_DIMENSION,
  });

  const embedding = response.embeddings?.float?.[0];
  if (!embedding) {
    throw new Error("Failed to embed query");
  }

  return embedding;
}

export function getCorpusStatus() {
  return {
    loaded: embeddedCorpus !== null,
    size: corpus.length,
    embeddedCount: embeddedCorpus?.length ?? 0,
  };
}
