"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { ShieldCheck, LayoutDashboard, BookOpen, Library, Loader2, Upload, BadgeCheck } from "lucide-react";
import { useAuth } from "@/components/providers/auth-provider";
import { getStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const tabs = [
  { href: "/admin", label: "Umumiy", icon: LayoutDashboard },
  { href: "/admin/lessons", label: "Darslar va savollar", icon: BookOpen },
  { href: "/admin/vocabulary", label: "Lug‘at", icon: Library },
  { href: "/admin/import", label: "Import", icon: Upload },
  { href: "/admin/reviews", label: "Sifat nazorati", icon: BadgeCheck },
];

/**
 * Admin bo'limi uchun himoya: client tekshiruvi (DEMO) +
 * sahifa ichida store orqali rol qayta tekshiriladi.
 */
export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { status } = useAuth();
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    if (status !== "authenticated") return;
    let cancelled = false;
    void (async () => {
      const isAdmin = await getStore().adminIsAdmin();
      if (cancelled) return;
      setAllowed(isAdmin);
      if (!isAdmin) router.replace("/dashboard");
    })();
    return () => {
      cancelled = true;
    };
  }, [status, router]);

  if (status !== "authenticated" || allowed === null) {
    return (
      <div className="flex justify-center py-24">
        <Loader2 size={26} className="animate-spin text-primary" />
        <span className="sr-only">Tekshirilmoqda…</span>
      </div>
    );
  }

  if (!allowed) return null;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f0ebff]">
            <ShieldCheck size={22} className="text-[#6b46c1]" />
          </span>
          <div>
            <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">Admin panel</h1>
            <p className="text-sm text-ink-soft">
              Kontent boshqaruvi — o‘zgarishlar darhol barcha foydalanuvchilarga ko‘rinadi.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Admin bo‘limlari">
        {tabs.map((t) => {
          const active = pathname === t.href;
          return (
            <Link
              key={t.href}
              href={t.href}
              role="tab"
              aria-selected={active}
              className={cn(
                "inline-flex items-center gap-2 rounded-xl border-2 px-4 py-2.5 text-sm font-bold transition-colors",
                active
                  ? "border-primary bg-primary-soft text-primary-ink"
                  : "border-line bg-white text-ink-soft hover:border-ink-faint",
              )}
            >
              <t.icon size={15} />
              {t.label}
            </Link>
          );
        })}
      </div>

      {children}
    </div>
  );
}
