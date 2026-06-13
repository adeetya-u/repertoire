"use client";

import { ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { MoodTags } from "@/components/mood-tags";
import { ScoreBar } from "@/components/score-bar";
import type { ScoredPiece } from "@/lib/types";
import { cn } from "@/lib/utils";

interface PieceCardProps {
  piece: ScoredPiece;
  scoreLabel?: string;
  highlight?: boolean;
  className?: string;
}

export function PieceCard({
  piece,
  scoreLabel = "Relevance",
  highlight = false,
  className,
}: PieceCardProps) {
  return (
    <Card
      className={cn(
        "border-zinc-800 bg-zinc-900/50 transition-colors hover:border-zinc-700",
        highlight && "border-violet-500/40 ring-1 ring-violet-500/20",
        className
      )}
    >
      <CardHeader className="space-y-3 pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 space-y-1">
            <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
              #{piece.rank} · {piece.era} · {piece.year}
            </p>
            <h3 className="text-base font-semibold leading-snug text-zinc-100">
              {piece.title}
            </h3>
            <p className="text-sm text-zinc-400">{piece.composer}</p>
          </div>
          <DifficultyBadge difficulty={piece.difficulty} grade={piece.grade} />
        </div>
        <ScoreBar score={piece.score} label={scoreLabel} />
      </CardHeader>
      <CardContent className="space-y-3 pt-0">
        <p className="line-clamp-2 text-sm leading-relaxed text-zinc-400">
          {piece.description}
        </p>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <MoodTags moods={piece.mood} />
          <a
            href={piece.imslpUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1.5 text-xs font-medium text-violet-400 transition-colors hover:text-violet-300"
          >
            View on IMSLP
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
        <p className="text-xs text-zinc-600">
          {piece.tempo} · {piece.texture}
        </p>
      </CardContent>
    </Card>
  );
}
