"use client";

import type { SearchResult } from "@/lib/types";
import { cn } from "@/lib/utils";

interface PipelineComparisonProps {
  result: SearchResult | null;
  compareMode: boolean;
  className?: string;
}

export function PipelineComparison({
  result,
  compareMode,
  className,
}: PipelineComparisonProps) {
  if (!result) return null;

  const { timings, corpusSize } = result;

  return (
    <div
      className={cn(
        "rounded-xl border border-zinc-800 bg-zinc-900/40 p-4",
        className
      )}
    >
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-medium text-zinc-300">Search pipeline</p>
        <p className="text-xs text-zinc-500">{corpusSize} pieces indexed</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-4">
        <TimingStat label="Embed query" ms={timings.embedMs} />
        <TimingStat label="Cosine recall" ms={timings.cosineMs} />
        <TimingStat
          label="Rerank"
          ms={timings.rerankMs}
          muted={!compareMode && timings.rerankMs === 0}
        />
        <TimingStat label="Total" ms={timings.totalMs} highlight />
      </div>

      {compareMode && (
        <p className="mt-3 text-xs leading-relaxed text-zinc-500">
          Embed recalls semantically similar pieces from the full corpus. Rerank
          re-scores the top 30 candidates against your exact query — catching
          nuance like &quot;slow <em>and</em> melancholic&quot; vs &quot;slow but
          triumphant.&quot;
        </p>
      )}
    </div>
  );
}

function TimingStat({
  label,
  ms,
  highlight = false,
  muted = false,
}: {
  label: string;
  ms: number;
  highlight?: boolean;
  muted?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border border-zinc-800/80 px-3 py-2",
        highlight && "border-violet-500/30 bg-violet-500/5",
        muted && "opacity-50"
      )}
    >
      <p className="text-xs text-zinc-500">{label}</p>
      <p
        className={cn(
          "text-lg font-semibold tabular-nums",
          highlight ? "text-violet-300" : "text-zinc-200"
        )}
      >
        {ms}ms
      </p>
    </div>
  );
}
