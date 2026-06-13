import { cn } from "@/lib/utils";

interface ScoreBarProps {
  score: number;
  label?: string;
  className?: string;
}

export function ScoreBar({ score, label, className }: ScoreBarProps) {
  const pct = Math.round(score * 100);

  return (
    <div className={cn("space-y-1", className)}>
      {label && (
        <div className="flex items-center justify-between text-xs text-zinc-500">
          <span>{label}</span>
          <span>{pct}%</span>
        </div>
      )}
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-800">
        <div
          className="h-full rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
