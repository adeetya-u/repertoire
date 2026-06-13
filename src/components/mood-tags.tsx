import { cn } from "@/lib/utils";

interface MoodTagsProps {
  moods: string[];
  max?: number;
  className?: string;
}

export function MoodTags({ moods, max = 4, className }: MoodTagsProps) {
  return (
    <div className={cn("flex flex-wrap gap-1.5", className)}>
      {moods.slice(0, max).map((mood) => (
        <span
          key={mood}
          className="rounded-md bg-zinc-800/80 px-2 py-0.5 text-xs text-zinc-400"
        >
          {mood}
        </span>
      ))}
    </div>
  );
}
