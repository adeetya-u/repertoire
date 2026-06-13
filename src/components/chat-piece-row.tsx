"use client";

import { ExternalLink } from "lucide-react";
import type { ScoredPiece } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ChatPieceRowProps {
  piece: ScoredPiece;
  showScore?: boolean;
  scoreLabel?: string;
  className?: string;
}

export function ChatPieceRow({
  piece,
  showScore = true,
  scoreLabel = "match",
  className,
}: ChatPieceRowProps) {
  return (
    <article className={cn("group py-3", className)}>
      <div className="flex items-baseline justify-between gap-3">
        <h4 className="min-w-0 flex-1 text-[15px] font-medium leading-snug text-foreground break-words">
          {piece.rank}. {piece.title}
        </h4>
        {showScore && (
          <span className="shrink-0 text-[11px] tabular-nums text-muted-foreground">
            {Math.round(piece.score * 100)}% {scoreLabel}
          </span>
        )}
      </div>
      <p className="mt-0.5 text-[13px] text-muted-foreground">
        {piece.composer} · {piece.difficulty} · {piece.mood.slice(0, 3).join(", ")}
      </p>
      <p className="mt-1.5 break-words text-[14px] leading-relaxed text-foreground/80">
        {piece.description}
      </p>
      <a
        href={piece.imslpUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 inline-flex items-center gap-1 text-[13px] text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
      >
        View score on IMSLP
        <ExternalLink className="h-3 w-3 opacity-60" />
      </a>
    </article>
  );
}
