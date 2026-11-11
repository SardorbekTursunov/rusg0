import { cn } from "@/lib/utils";

interface ProgressProps {
  value: number; // 0..100
  className?: string;
  color?: "primary" | "blue" | "yellow" | "red";
  height?: string;
  striped?: boolean;
  ariaLabel?: string;
}

const colors = {
  primary: "bg-primary",
  blue: "bg-accent-blue",
  yellow: "bg-accent-yellow",
  red: "bg-error",
};

export function Progress({
  value,
  className,
  color = "primary",
  height = "h-3",
  striped = false,
  ariaLabel,
}: ProgressProps) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(v)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={ariaLabel}
      className={cn(
        "w-full overflow-hidden rounded-full bg-surface-2",
        height,
        className,
      )}
    >
      <div
        className={cn(
          "h-full rounded-full transition-[width] duration-500 ease-out",
          colors[color],
          striped && "striped",
        )}
        style={{ width: `${v}%` }}
      />
    </div>
  );
}
