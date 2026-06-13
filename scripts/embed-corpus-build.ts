import { writeFileSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { corpus } from "../src/lib/corpus";
import { buildEmbedText } from "../src/lib/corpus/helpers";

const BATCH_SIZE = 96;
const EMBED_MODEL = "embed-v4.0";
const EMBED_DIMENSION = 1024;

function getApiKey(): string {
  const key = process.env.COHERE_API_KEY ?? process.env.NEXT_PUBLIC_COHERE_API_KEY;
  if (!key) {
    throw new Error("COHERE_API_KEY is not set");
  }
  return key;
}

async function embedBatch(texts: string[]): Promise<number[][]> {
  const res = await fetch("https://api.cohere.com/v2/embed", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getApiKey()}`,
      "Content-Type": "application/json",
      "X-Client-Name": "repertoire-build",
    },
    body: JSON.stringify({
      model: EMBED_MODEL,
      texts,
      input_type: "search_document",
      embedding_types: ["float"],
      output_dimension: EMBED_DIMENSION,
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { message?: string }).message ?? `Embed failed: ${res.status}`);
  }

  const data = (await res.json()) as { embeddings?: { float?: number[][] } };
  const embeddings = data.embeddings?.float;
  if (!embeddings || embeddings.length !== texts.length) {
    throw new Error("Embed response missing vectors");
  }

  return embeddings;
}

async function main() {
  const root = join(dirname(fileURLToPath(import.meta.url)), "..");
  const outPath = join(root, "public", "corpus-embeddings.json");
  const embeddings: Record<string, number[]> = {};

  console.log(`Embedding ${corpus.length} pieces...`);
  const start = Date.now();

  for (let i = 0; i < corpus.length; i += BATCH_SIZE) {
    const batch = corpus.slice(i, i + BATCH_SIZE);
    const texts = batch.map(buildEmbedText);
    const vectors = await embedBatch(texts);
    for (let j = 0; j < batch.length; j++) {
      embeddings[batch[j].id] = vectors[j];
    }
    console.log(`  ${Math.min(i + BATCH_SIZE, corpus.length)}/${corpus.length}`);
  }

  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(
    outPath,
    JSON.stringify({
      version: 1,
      model: EMBED_MODEL,
      dimension: EMBED_DIMENSION,
      count: corpus.length,
      embeddings,
    })
  );

  console.log(`Wrote ${outPath} in ${Date.now() - start}ms`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
