"use client";

import { useEffect, useState } from "react";
import { Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export const EXAMPLE_QUERIES = [
  "melancholic, slow, something like late Schubert but simpler, under grade 6",
  "energetic baroque counterpoint, good for developing finger independence",
  "impressionist, atmospheric, with unusual harmonies, intermediate level",
  "something like Gymnopédies but less well-known",
  "fast, virtuosic, romantic, lots of octaves, like Liszt but shorter",
  "gentle, dreamy, good for sight-reading, not too many accidentals",
  "dark, dramatic, minor key, big chords, grade 7-8",
  "something happy and classical to play at a dinner party, not too hard",
];

interface SearchInputProps {
  onSearch: (query: string) => void;
  loading?: boolean;
  className?: string;
}

export function SearchInput({ onSearch, loading = false, className }: SearchInputProps) {
  const [query, setQuery] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((i) => (i + 1) % EXAMPLE_QUERIES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed && !loading) {
      onSearch(trimmed);
    }
  }

  function applyExample(example: string) {
    setQuery(example);
    onSearch(example);
  }

  return (
    <div className={cn("space-y-4", className)}>
      <form onSubmit={handleSubmit} className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={EXAMPLE_QUERIES[placeholderIndex]}
          disabled={loading}
          className="h-14 border-zinc-800 bg-zinc-900/80 pl-12 pr-32 text-base text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-violet-500/40"
        />
        <Button
          type="submit"
          disabled={loading || !query.trim()}
          className="absolute right-2 top-1/2 h-10 -translate-y-1/2 bg-violet-600 px-5 hover:bg-violet-500"
        >
          {loading ? "Searching..." : "Search"}
        </Button>
      </form>

      <div className="flex flex-wrap gap-2">
        {EXAMPLE_QUERIES.slice(0, 4).map((example) => (
          <button
            key={example}
            type="button"
            onClick={() => applyExample(example)}
            disabled={loading}
            className="inline-flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900/50 px-3 py-1.5 text-left text-xs text-zinc-400 transition-colors hover:border-zinc-700 hover:text-zinc-200 disabled:opacity-50"
          >
            <Sparkles className="h-3 w-3 shrink-0 text-violet-500" />
            <span className="line-clamp-1">{example}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
