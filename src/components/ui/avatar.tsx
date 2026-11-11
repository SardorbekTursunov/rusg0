import { getAvatar } from "@/data/avatars";
import { cn } from "@/lib/utils";

interface AvatarProps {
  avatarId: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizes = {
  sm: "h-8 w-8 text-base",
  md: "h-11 w-11 text-xl",
  lg: "h-16 w-16 text-3xl",
  xl: "h-24 w-24 text-5xl",
};

export function Avatar({ avatarId, size = "md", className }: AvatarProps) {
  const a = getAvatar(avatarId);
  return (
    <span
      role="img"
      aria-label={a.label}
      className={cn(
        "inline-flex select-none items-center justify-center rounded-full border-2 border-white shadow-sm",
        sizes[size],
        className,
      )}
      style={{ backgroundColor: a.bg }}
    >
      {a.emoji}
    </span>
  );
}
