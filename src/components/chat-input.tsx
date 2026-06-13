"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export const EXAMPLE_QUERIES = [
  "melancholic, slow, like late Schubert but simpler, under grade 6",
  "impressionist and atmospheric, intermediate level",
  "fast baroque counterpoint for finger independence",
  "something like Gymnopédies but less well-known",
];

interface ChatInputProps {
  onSend: (query: string) => void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}

export function ChatInput({
  onSend,
  disabled = false,
  placeholder = "Describe what you want to play…",
  className,
}: ChatInputProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  }, [value]);

  function submit() {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  }

  return (
    <div className={cn("mx-auto w-full max-w-3xl px-4 pb-4 pt-2", className)}>
      <div className="relative flex items-end rounded-[26px] border border-border/80 bg-[hsl(var(--chat-surface))] shadow-sm">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          rows={1}
          className="max-h-40 min-h-[52px] flex-1 resize-none bg-transparent px-4 py-3.5 text-[15px] leading-relaxed text-foreground placeholder:text-muted-foreground focus:outline-none disabled:opacity-50"
        />
        <button
          type="button"
          onClick={submit}
          disabled={disabled || !value.trim()}
          aria-label="Send"
          className={cn(
            "mb-2 mr-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors",
            value.trim() && !disabled
              ? "bg-foreground text-background hover:opacity-90"
              : "bg-muted text-muted-foreground"
          )}
        >
          <ArrowUp className="h-4 w-4" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}
