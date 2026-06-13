"use client";

import { useCallback, useEffect, useState } from "react";
import { Music2 } from "lucide-react";
import { PipelineComparison } from "@/components/pipeline-comparison";
import { ResultsList } from "@/components/results-list";
import { SearchInput } from "@/components/search-input";
import { Toggle } from "@/components/ui/toggle";
import type { SearchResult } from "@/lib/types";
import { cn } from "@/lib/utils";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [compareMode, setCompareMode] = useState(true);
  const [corpusReady, setCorpusReady] = useState(false);
  const [corpusLoading, setCorpusLoading] = useState(true);

  useEffect(() => {
    async function warmCorpus() {
      try {
        setCorpusLoading(true);
        await fetch("/api/embed-corpus", { method: "POST" });
        setCorpusReady(true);
      } catch {
        setError("Failed to index the piano corpus. Check your API key.");
      } finally {
        setCorpusLoading(false);
      }
    }

    warmCorpus();
  }, []);

  const handleSearch = useCallback(async (searchQuery: string) => {
    setQuery(searchQuery);
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: searchQuery, mode: "both" }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? "Search failed");
      }

      setResult(data as SearchResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Search failed");
      setResult(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-950/30 via-zinc-950 to-zinc-950" />

      <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-10 space-y-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1 text-xs text-zinc-400">
            <Music2 className="h-3.5 w-3.5 text-violet-400" />
            Powered by Cohere Embed + Rerank
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Repertoire
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-zinc-400">
            Describe the piano piece you want to play — mood, difficulty, era,
            texture — and find it in a curated IMSLP corpus. Keyword search
            can&apos;t do this. Semantic search can.
          </p>
          {corpusLoading && (
            <p className="text-sm text-violet-400/80 animate-pulse">
              Indexing {corpusReady ? "" : "440+"} piano pieces with Cohere Embed…
            </p>
          )}
        </header>

        <SearchInput onSearch={handleSearch} loading={loading || corpusLoading} />

        <div className="mt-6 flex items-center justify-between gap-4">
          <label className="flex items-center gap-3 text-sm text-zinc-400">
            <Toggle
              pressed={compareMode}
              onPressedChange={setCompareMode}
              className="data-[state=on]:bg-violet-600 data-[state=on]:text-white"
              aria-label="Toggle comparison mode"
            />
            Compare Embed recall vs Embed + Rerank
          </label>
          {query && !loading && (
            <p className="truncate text-xs text-zinc-600">
              Query: &ldquo;{query}&rdquo;
            </p>
          )}
        </div>

        {error && (
          <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        {result && (
          <div className="mt-6">
            <PipelineComparison result={result} compareMode={compareMode} />
          </div>
        )}

        {(loading || result) && (
          <div
            className={cn(
              "mt-8 grid gap-8",
              compareMode ? "lg:grid-cols-2" : "mx-auto max-w-2xl"
            )}
          >
            {compareMode ? (
              <>
                <ResultsList
                  title="Embed recall"
                  subtitle="Top matches by semantic similarity (cosine)"
                  results={result?.embedResults ?? []}
                  scoreLabel="Similarity"
                  loading={loading}
                  emptyMessage="Run a search to see embed recall results."
                />
                <ResultsList
                  title="Embed + Rerank"
                  subtitle="Top 10 after Cohere Rerank precision scoring"
                  results={result?.rerankResults ?? []}
                  scoreLabel="Relevance"
                  loading={loading}
                  emptyMessage="Run a search to see reranked results."
                />
              </>
            ) : (
              <ResultsList
                title="Best matches"
                subtitle="Precision-ranked by Cohere Rerank"
                results={result?.rerankResults ?? []}
                scoreLabel="Relevance"
                loading={loading}
                emptyMessage="Run a search to see results."
              />
            )}
          </div>
        )}

        {!loading && !result && !error && corpusReady && (
          <div className="mt-16 text-center">
            <p className="text-sm text-zinc-600">
              Try: &ldquo;melancholic, slow, like late Schubert but under grade
              6&rdquo;
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
