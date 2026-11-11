import { cn } from "@/lib/utils";

/**
 * RusGo logotipi — original belgi: yo'l nuqtalari bilan «R» harfi.
 * (Duolingo bilan hech qanday o'xshashlik yo'q — mustaqil identifikatsiya.)
 */
export function Logo({
  size = 36,
  className,
  withText = true,
}: {
  size?: number;
  className?: string;
  withText?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        {/* Yashil yumaloq "yo'l belgisi" */}
        <rect x="2" y="2" width="44" height="44" rx="14" fill="#58CC02" />
        {/* «R» harfi — yo'l chizig'idan hosil bo'ladi */}
        <path
          d="M16 34V14h8.6c4.4 0 7.4 2.6 7.4 6.4 0 3-1.9 5.2-4.7 6l5.7 7.6h-5.4l-5-6.8H21V34h-5zm5-10.6h3.3c1.9 0 3.1-1 3.1-2.6s-1.2-2.6-3.1-2.6H21v5.2z"
          fill="#FFFFFF"
        />
        {/* Harakat nuqtalari — "Go" ma'nosini beradi */}
        <circle cx="35.5" cy="12.5" r="2.4" fill="#FFC800" />
        <circle cx="41" cy="19.5" r="1.6" fill="#FFFFFF" opacity="0.85" />
      </svg>
      {withText && (
        <span className="text-[1.4rem] font-extrabold tracking-tight text-ink">
          Rus<span className="text-primary">Go</span>
        </span>
      )}
    </span>
  );
}
