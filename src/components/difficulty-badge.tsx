import { cn } from "@/lib/utils";

interface DifficultyBadgeProps {
  difficulty: string;
  grade: number;
  className?: string;
}

function gradeColor(grade: number): string {
  if (grade <= 3) return "bg-emerald-500/15 text-emerald-300 border-emerald-500/30";
  if (grade <= 5) return "bg-amber-500/15 text-amber-300 border-amber-500/30";
  if (grade <= 7) return "bg-orange-500/15 text-orange-300 border-orange-500/30";
  return "bg-rose-500/15 text-rose-300 border-rose-500/30";
}

export function DifficultyBadge({ difficulty, grade, className }: DifficultyBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        gradeColor(grade),
        className
      )}
    >
      {difficulty}
    </span>
  );
}
