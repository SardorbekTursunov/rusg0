import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "danger" | "yellow" | "blue";
type Size = "sm" | "md" | "lg" | "icon";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-white shadow-[0_4px_0_0_var(--color-primary-dark)] hover:brightness-105 active:shadow-none",
  secondary:
    "bg-white text-ink border-2 border-line shadow-[0_3px_0_0_var(--color-line)] hover:bg-surface active:shadow-none",
  ghost: "bg-transparent text-ink-soft hover:bg-surface-2",
  danger:
    "bg-error text-white shadow-[0_4px_0_0_#d93a3a] hover:brightness-105 active:shadow-none",
  yellow:
    "bg-accent-yellow text-ink shadow-[0_4px_0_0_#e0ad00] hover:brightness-105 active:shadow-none",
  blue:
    "bg-accent-blue text-white shadow-[0_4px_0_0_#0d8ec7] hover:brightness-105 active:shadow-none",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-12 px-8 text-base",
  icon: "h-10 w-10 p-0",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "btn-3d inline-flex items-center justify-center gap-2 whitespace-nowrap",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}
