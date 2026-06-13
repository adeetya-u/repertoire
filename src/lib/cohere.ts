import { CohereClient } from "cohere-ai";

let client: CohereClient | null = null;

export function getCohereClient(): CohereClient {
  if (!client) {
    const token = process.env.COHERE_API_KEY;
    if (!token) {
      throw new Error("COHERE_API_KEY is not set");
    }
    client = new CohereClient({
      token,
    });
  }
  return client;
}

export const EMBED_MODEL = "embed-v4.0";
export const RERANK_MODEL = "rerank-v4.0-pro";
export const EMBED_DIMENSION = 1024;
export const RECALL_TOP_K = 30;
export const RERANK_TOP_N = 10;
