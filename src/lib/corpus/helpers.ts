import type { PianoPiece } from "../types";

export function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "_")
    .replace(/^_|_$/g, "");
}

export function buildImslpUrl(title: string, composer: string): string {
  const composerSlug = slugify(composer.split(" ").pop() ?? composer);
  const titleSlug = slugify(title);
  return `https://imslp.org/wiki/${titleSlug}_(${composerSlug})`;
}

export function buildEmbedText(piece: PianoPiece): string {
  return [
    `${piece.title} by ${piece.composer}`,
    `Era: ${piece.era}. Year: ${piece.year}.`,
    `Difficulty: ${piece.difficulty}. Tempo: ${piece.tempo}.`,
    `Mood: ${piece.mood.join(", ")}.`,
    `Texture: ${piece.texture}.`,
    piece.description,
    `Tags: ${piece.tags.join(", ")}.`,
  ].join(" ");
}

export function definePiece(
  partial: Omit<PianoPiece, "id" | "imslpUrl"> & { imslpUrl?: string }
): PianoPiece {
  const id = slugify(`${partial.composer}-${partial.title}`);
  return {
    ...partial,
    id,
    imslpUrl: partial.imslpUrl ?? buildImslpUrl(partial.title, partial.composer),
  };
}
