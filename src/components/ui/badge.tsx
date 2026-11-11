import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Tone = "green" | "blue" | "yellow" | "red" | "gray" | "purple";

const tones: Record<Tone, string> = {
  green: "bg-primary-soft text-primary-ink",
  blue: "bg-accent-blue-soft text-[#0a7ba8]",
  yellow: "bg-accent-yellow-soft text-[#8a6d00]",
  red: "bg-error-soft text-[#c62828]",
  gray: "bg-surface-2 text-ink-soft",
  purple: "bg-[#f0ebff] text-[#6b46c1]",
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
}

export function Badge({ tone = "gray", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
