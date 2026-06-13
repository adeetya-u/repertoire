"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, Columns2 } from "lucide-react";
import { ChatAssistantMessage } from "@/components/chat-assistant-message";
import { ChatInput, EXAMPLE_QUERIES } from "@/components/chat-input";
import { search, getEmbeddedCorpus, type ClientSearchResult } from "@/lib/client-search";
import type { ScoredPiece, SearchResult } from "@/lib/types";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content?: string;
  result?: SearchResult;
  error?: string;
  loading?: boolean;
}

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function toSearchResult(r: ClientSearchResult): SearchResult {
  return {
    query: r.query,
    embedResults: r.embedResults.map((e, i) => ({
      ...e.piece,
      score: e.score,
      rank: i + 1,
    })) as ScoredPiece[],
    rerankResults: r.rerankResults.map((e, i) => ({
      ...e.piece,
      score: e.score,
      rank: i + 1,
    })) as ScoredPiece[],
    timings: r.timings,
    corpusSize: r.corpusSize,
  };
}

export default function HomePage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [compareMode, setCompareMode] = useState(false);
  const [corpusReady, setCorpusReady] = useState(false);
  const [corpusLoading, setCorpusLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function warmCorpus() {
      try {
        setCorpusLoading(true);
        await getEmbeddedCorpus();
        setCorpusReady(true);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Could not index the corpus";
        setMessages([
          {
            id: createId(),
            role: "assistant",
            error: `Could not index the corpus. ${message}`,
          },
        ]);
      } finally {
        setCorpusLoading(false);
      }
    }

    warmCorpus();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = useCallback(async (query: string) => {
    const userId = createId();
    const assistantId = createId();

    setMessages((prev) => [
      ...prev,
      { id: userId, role: "user", content: query },
      { id: assistantId, role: "assistant", loading: true },
    ]);
    setBusy(true);

    try {
      const data = await search(query);
      const result = toSearchResult(data);

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantId ? { ...msg, loading: false, result } : msg
        )
      );
    } catch (err) {
      const message = err instanceof Error ? err.message : "Search failed";
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantId ? { ...msg, loading: false, error: message } : msg
        )
      );
    } finally {
      setBusy(false);
    }
  }, []);

  const isEmpty = messages.length === 0;
  const inputDisabled = busy || corpusLoading;

  return (
    <div className="flex h-[100dvh] flex-col bg-[hsl(var(--chat-bg))]">
      <header
        className={cn(
          "flex shrink-0 items-center justify-between gap-3 border-b border-border/60 px-4",
          compareMode ? "min-h-12 py-2" : "h-12"
        )}
      >
        <div className="flex shrink-0 items-center gap-3">
          <a
            href="https://adeetya.dev"
            className="flex items-center gap-0.5 text-[12px] text-muted-foreground transition-colors hover:text-foreground"
          >
            <ChevronLeft className="h-3.5 w-3.5" strokeWidth={2} />
            Portfolio
          </a>
          {!compareMode && (
            <span className="text-[15px] font-medium text-foreground">Repertoire</span>
          )}
        </div>
        {compareMode && (
          <p className="min-w-0 flex-1 truncate text-center text-[12px] text-muted-foreground">
            <span className="font-medium text-foreground">Compare mode</span>
            {" · "}
            Embed left, rerank right
          </p>
        )}
        <button
          type="button"
          role="switch"
          aria-checked={compareMode}
          aria-label={compareMode ? "Turn off compare mode" : "Turn on compare mode"}
          onClick={() => setCompareMode((v) => !v)}
          className={cn(
            "flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12px] transition-colors",
            compareMode
              ? "border-foreground/30 bg-[hsl(var(--chat-surface))] text-foreground shadow-sm"
              : "border-border/80 text-muted-foreground hover:border-border hover:text-foreground"
          )}
        >
          <Columns2 className="h-3.5 w-3.5" strokeWidth={2} />
          {compareMode ? "Comparing" : "Compare"}
        </button>
      </header>

      <div
        ref={scrollRef}
        className="chat-scrollbar min-h-0 flex-1 overflow-y-auto pb-36"
      >
        <div
          className={cn(
            "mx-auto w-full px-4",
            compareMode ? "max-w-5xl" : "max-w-3xl"
          )}
        >
          {isEmpty && !corpusLoading && (
            <div className="flex min-h-[calc(100dvh-8rem)] flex-col items-center justify-center pb-32 pt-16 text-center">
              <h1 className="text-2xl font-normal tracking-tight text-foreground">
                What do you want to play?
              </h1>
              <p className="mt-2 max-w-md text-[15px] leading-relaxed text-muted-foreground">
                Find your next piece by how it feels, not what it&apos;s called.
              </p>
              <div className="mt-8 flex max-w-lg flex-col items-stretch gap-2 sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center">
                {EXAMPLE_QUERIES.map((example) => (
                  <button
                    key={example}
                    type="button"
                    onClick={() => handleSend(example)}
                    disabled={inputDisabled || !corpusReady}
                    className="rounded-full border border-border/80 px-4 py-2 text-left text-[13px] text-muted-foreground transition-colors hover:border-border hover:bg-[hsl(var(--chat-surface))] hover:text-foreground disabled:opacity-40 sm:text-center"
                  >
                    {example}
                  </button>
                ))}
              </div>

              {compareMode ? (
                <div className="mt-10 w-full max-w-2xl rounded-xl border border-foreground/20 bg-[hsl(var(--chat-surface))]/60 p-5 text-left">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
                    <div className="flex-1">
                      <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                        Embed recall
                      </p>
                      <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
                        Broad semantic matches from the full library
                      </p>
                    </div>
                    <div
                      className="hidden w-px shrink-0 self-stretch bg-border/60 sm:block"
                      aria-hidden
                    />
                    <div className="flex-1 border-t border-border/60 pt-4 sm:border-t-0 sm:pt-0">
                      <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                        After rerank
                      </p>
                      <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
                        Tighter fit to your exact wording
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 border-t border-border/60 pt-4 text-center text-[12px] text-muted-foreground">
                    Try a search to see both lists side by side
                  </p>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setCompareMode(true)}
                  className="mt-8 flex items-center gap-1.5 rounded-full border border-border/80 px-4 py-2 text-[13px] text-muted-foreground transition-colors hover:border-border hover:bg-[hsl(var(--chat-surface))] hover:text-foreground"
                >
                  <Columns2 className="h-3.5 w-3.5" strokeWidth={2} />
                  Turn on Compare to see embed recall next to reranked results
                </button>
              )}
            </div>
          )}

          {corpusLoading && isEmpty && (
            <div className="flex min-h-[calc(100dvh-8rem)] items-center justify-center pb-32">
              <p className="text-[14px] text-muted-foreground">Indexing pieces…</p>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "py-6",
                message.role === "user" ? "flex justify-end" : ""
              )}
            >
              {message.role === "user" ? (
                <div className="max-w-[85%] rounded-3xl bg-[hsl(var(--chat-user))] px-4 py-2.5">
                  <p className="text-[15px] leading-relaxed text-foreground">
                    {message.content}
                  </p>
                </div>
              ) : (
                <ChatAssistantMessage
                  result={message.result}
                  loading={message.loading}
                  error={message.error}
                  compareMode={compareMode}
                />
              )}
            </div>
          ))}
          <div ref={bottomRef} className="h-4" />
        </div>
      </div>

      <div
        className={cn(
          "shrink-0 border-t border-border/40 bg-[hsl(var(--chat-bg))]",
          compareMode && "mx-auto w-full max-w-5xl"
        )}
      >
        <ChatInput
          onSend={handleSend}
          disabled={inputDisabled || !corpusReady}
          placeholder={
            corpusLoading
              ? "Indexing corpus…"
              : "Describe what you want to play…"
          }
        />
      </div>
    </div>
  );
}
