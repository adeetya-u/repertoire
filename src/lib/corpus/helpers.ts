import type { PianoPiece } from "../types";
import { resolveImslpUrl } from "./imslp-urls";

export function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "_")
    .replace(/^_|_$/g, "");
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
    imslpUrl:
      partial.imslpUrl ??
      resolveImslpUrl(partial.title, partial.composer),
  };
}
