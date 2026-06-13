"use client";

import { ChatPieceRow } from "@/components/chat-piece-row";
import type { SearchResult } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ChatAssistantMessageProps {
  result?: SearchResult;
  loading?: boolean;
  error?: string;
  compareMode?: boolean;
  className?: string;
}

const COMPARE_LIMIT = 5;

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 py-2">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-1.5 w-1.5 animate-pulse rounded-full bg-muted-foreground/60"
          style={{ animationDelay: `${i * 150}ms` }}
        />
      ))}
    </div>
  );
}

export function ChatAssistantMessage({
  result,
  loading,
  error,
  compareMode = false,
  className,
}: ChatAssistantMessageProps) {
  if (loading) {
    return (
      <div className={cn("py-1", className)}>
        <TypingIndicator />
      </div>
    );
  }

  if (error) {
    return (
      <p className={cn("text-[15px] leading-relaxed text-destructive", className)}>
        {error}
      </p>
    );
  }

  if (!result) return null;

  const { rerankResults, embedResults, timings } = result;

  return (
    <div className={cn("w-full min-w-0 space-y-4", className)}>
      {!compareMode && rerankResults.length > 0 && (
        <div className="min-w-0">
          <p className="mb-1 text-[15px] leading-relaxed text-foreground/90">
            Here are pieces that match what you described:
          </p>
          <div className="divide-y divide-border/60">
            {rerankResults.map((piece) => (
              <ChatPieceRow key={piece.id} piece={piece} scoreLabel="match" />
            ))}
          </div>
        </div>
      )}

      {compareMode && (
        <div className="min-w-0 space-y-6">
          <div className="grid min-w-0 grid-cols-1 gap-8 md:grid-cols-2 md:gap-6">
            <section className="min-w-0 overflow-hidden md:border-r md:border-border/60 md:pr-6">
              <p className="mb-3 text-[12px] font-medium uppercase tracking-wide text-muted-foreground">
                Embed recall
              </p>
              <div className="divide-y divide-border/60">
                {embedResults.slice(0, COMPARE_LIMIT).map((piece) => (
                  <ChatPieceRow
                    key={`embed-${piece.id}`}
                    piece={piece}
                    scoreLabel="similarity"
                  />
                ))}
              </div>
            </section>
            <section className="min-w-0 overflow-hidden md:pl-2">
              <p className="mb-3 text-[12px] font-medium uppercase tracking-wide text-muted-foreground">
                After rerank
              </p>
              <div className="divide-y divide-border/60">
                {rerankResults.slice(0, COMPARE_LIMIT).map((piece) => (
                  <ChatPieceRow
                    key={`rerank-${piece.id}`}
                    piece={piece}
                    scoreLabel="relevance"
                  />
                ))}
              </div>
            </section>
          </div>
        </div>
      )}

      <p className="text-[11px] text-muted-foreground">
        {timings.totalMs}ms · embed {timings.embedMs}ms · rerank {timings.rerankMs}ms
      </p>
    </div>
  );
}
