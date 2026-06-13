import { NextRequest, NextResponse } from "next/server";
import { corpus, CORPUS_SIZE } from "@/lib/corpus";
import {
  embedQuery,
  getEmbeddedCorpus,
} from "@/lib/corpus-store";
import {
  RERANK_MODEL,
  RERANK_TOP_N,
  RECALL_TOP_K,
  getCohereClient,
} from "@/lib/cohere";
import { topKBySimilarity } from "@/lib/vector-store";
import type { ScoredPiece, SearchResult } from "@/lib/types";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

interface SearchBody {
  query?: string;
  mode?: "both" | "embed" | "rerank";
}

function toScoredPieces(
  items: Array<{ piece: { id: string }; score: number }>,
  rankOffset = 0
): ScoredPiece[] {
  const pieceMap = new Map(corpus.map((p) => [p.id, p]));

  return items.map((item, index) => {
    const piece = pieceMap.get(item.piece.id);
    if (!piece) {
      throw new Error(`Piece not found: ${item.piece.id}`);
    }
    return {
      ...piece,
      score: item.score,
      rank: rankOffset + index + 1,
    };
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as SearchBody;
    const query = body.query?.trim();

    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    const mode = body.mode ?? "both";
    const totalStart = Date.now();

    const embedStart = Date.now();
    const [queryEmbedding, embeddedCorpus] = await Promise.all([
      embedQuery(query),
      getEmbeddedCorpus(),
    ]);
    const embedMs = Date.now() - embedStart;

    const cosineStart = Date.now();
    const recall = topKBySimilarity(queryEmbedding, embeddedCorpus, RECALL_TOP_K);
    const cosineMs = Date.now() - cosineStart;

    const embedResults = toScoredPieces(recall, 0).map((p) => ({
      ...p,
      score: Math.max(0, Math.min(1, (p.score + 1) / 2)),
    }));

    if (mode === "embed") {
      const result: SearchResult = {
        query,
        embedResults: embedResults.slice(0, RERANK_TOP_N),
        rerankResults: [],
        timings: {
          embedMs,
          cosineMs,
          rerankMs: 0,
          totalMs: Date.now() - totalStart,
        },
        corpusSize: CORPUS_SIZE,
      };
      return NextResponse.json(result);
    }

    const documents = recall.map(({ piece }) => piece.embedText);
    const rerankStart = Date.now();
    const cohere = getCohereClient();
    const rerankResponse = await cohere.v2.rerank({
      model: RERANK_MODEL,
      query,
      documents,
      topN: RERANK_TOP_N,
    });
    const rerankMs = Date.now() - rerankStart;

    const rerankResults = rerankResponse.results.map((result, index) => {
      const recalled = recall[result.index];
      return {
        ...recalled.piece,
        score: result.relevanceScore,
        rank: index + 1,
      };
    });

    const response: SearchResult = {
      query,
      embedResults: mode === "rerank" ? [] : embedResults.slice(0, RERANK_TOP_N),
      rerankResults,
      timings: {
        embedMs,
        cosineMs,
        rerankMs,
        totalMs: Date.now() - totalStart,
      },
      corpusSize: CORPUS_SIZE,
    };

    return NextResponse.json(response);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
