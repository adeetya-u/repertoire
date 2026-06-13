"use client";

import { PieceCard } from "@/components/piece-card";
import type { ScoredPiece } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ResultsListProps {
  title: string;
  subtitle: string;
  results: ScoredPiece[];
  scoreLabel?: string;
  emptyMessage?: string;
  loading?: boolean;
  className?: string;
}

export function ResultsList({
  title,
  subtitle,
  results,
  scoreLabel = "Similarity",
  emptyMessage = "No results yet.",
  loading = false,
  className,
}: ResultsListProps) {
  return (
    <section className={cn("space-y-4", className)}>
      <div>
        <h2 className="text-lg font-semibold text-zinc-100">{title}</h2>
        <p className="text-sm text-zinc-500">{subtitle}</p>
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-40 animate-pulse rounded-xl border border-zinc-800 bg-zinc-900/40"
            />
          ))}
        </div>
      ) : results.length === 0 ? (
        <div className="rounded-xl border border-dashed border-zinc-800 px-6 py-12 text-center text-sm text-zinc-500">
          {emptyMessage}
        </div>
      ) : (
        <div className="space-y-3">
          {results.map((piece) => (
            <PieceCard key={piece.id} piece={piece} scoreLabel={scoreLabel} />
          ))}
        </div>
      )}
    </section>
  );
}
