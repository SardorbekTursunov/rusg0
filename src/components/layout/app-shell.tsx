"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import {
  Home,
  Map,
  BookOpen,
  Gamepad2,
  RotateCcw,
  Trophy,
  Award,
  User,
  Settings,
  ShieldCheck,
  Menu,
  X,
  Loader2,
  Flame,
  Zap,
} from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { Avatar } from "@/components/ui/avatar";
import { useAuth } from "@/components/providers/auth-provider";
import { cn, formatNumber } from "@/lib/utils";

const nav = [
  { href: "/dashboard", label: "Bosh sahifa", icon: Home },
  { href: "/learn", label: "O‘rganish", icon: Map },
  { href: "/games", label: "O‘yinlar", icon: Gamepad2 },
  { href: "/vocabulary", label: "Lug‘at", icon: BookOpen },
  { href: "/review", label: "Takrorlash", icon: RotateCcw },
  { href: "/leaderboard", label: "Reyting", icon: Trophy },
  { href: "/achievements", label: "Yutuqlar", icon: Award },
  { href: "/profile", label: "Profil", icon: User },
  { href: "/settings", label: "Sozlamalar", icon: Settings },
];

export function AppShell({ children }: { children: ReactNode }) {
  const { status, profile, demoMode, signOut, refresh } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [drawer, setDrawer] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Himoyalangan yo‘nalishlar: sessiya + onboarding tekshiruvi
  useEffect(() => {
    if (status === "anonymous") router.replace("/login");
    if (status === "authenticated" && !profile?.onboarding) router.replace("/onboarding");
  }, [status, profile, router]);

  useEffect(() => {
    setDrawer(false);
  }, [pathname]);

  useEffect(() => {
    if (status !== "authenticated") return;
    let cancelled = false;
    void (async () => {
      const { getStore } = await import("@/lib/store");
      const admin = await getStore().adminIsAdmin();
      if (!cancelled) setIsAdmin(admin);
    })();
    return () => {
      cancelled = true;
    };
  }, [status, pathname]);

  if (status === "loading" || (status === "authenticated" && !profile)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface">
        <Loader2 size={28} className="animate-spin text-primary" />
        <span className="sr-only">Yuklanmoqda…</span>
      </div>
    );
  }

  if (status === "anonymous" || !profile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface">
        <Loader2 size={28} className="animate-spin text-primary" />
      </div>
    );
  }

  const items = isAdmin ? [...nav, { href: "/admin", label: "Admin", icon: ShieldCheck }] : nav;

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="px-5 py-5">
        <Link href="/" aria-label="RusGo">
          <Logo size={30} />
        </Link>
      </div>

      <nav className="flex-1 space-y-1 px-3" aria-label="Asosiy menyu">
        {items.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-bold transition-colors",
                active
                  ? "bg-primary-soft text-primary-ink"
                  : "text-ink-soft hover:bg-surface-2 hover:text-ink",
              )}
              aria-current={active ? "page" : undefined}
            >
              <item.icon size={18} className={active ? "text-primary" : ""} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Statistika qisqa ko‘rinishda */}
      <div className="mx-3 mb-3 grid grid-cols-2 gap-2">
        <span className="flex items-center justify-center gap-1.5 rounded-xl bg-error-soft px-2 py-2 text-xs font-extrabold text-error">
          <Flame size={14} /> {profile.currentStreak}
        </span>
        <span className="flex items-center justify-center gap-1.5 rounded-xl bg-accent-yellow-soft px-2 py-2 text-xs font-extrabold text-[#8a6d00]">
          <Zap size={14} /> {formatNumber(profile.totalXp)} XP
        </span>
      </div>

      <div className="border-t border-line p-3">
        <Link
          href="/profile"
          className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-surface-2"
        >
          <Avatar avatarId={profile.avatarId} size="sm" />
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-bold text-ink">
              {profile.username}
            </span>
            <span className="block text-xs text-ink-soft">{profile.currentLevel} daraja</span>
          </span>
        </Link>
        <button
          type="button"
          onClick={async () => {
            await signOut();
            await refresh();
            router.replace("/");
          }}
          className="mt-1 w-full rounded-xl px-3 py-2 text-left text-xs font-bold text-ink-soft transition-colors hover:bg-error-soft hover:text-error"
        >
          Chiqish
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-surface">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-line bg-white lg:block">
        {sidebar}
      </aside>

      {/* Mobile header */}
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-line bg-white px-4 lg:hidden">
        <Link href="/" aria-label="RusGo">
          <Logo size={28} />
        </Link>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 rounded-full bg-error-soft px-2.5 py-1 text-xs font-extrabold text-error">
            <Flame size={13} /> {profile.currentStreak}
          </span>
          <span className="flex items-center gap-1 rounded-full bg-accent-yellow-soft px-2.5 py-1 text-xs font-extrabold text-[#8a6d00]">
            <Zap size={13} /> {formatNumber(profile.totalXp)}
          </span>
          <button
            type="button"
            onClick={() => setDrawer(true)}
            aria-label="Menyuni ochish"
            className="rounded-lg p-1.5 text-ink"
          >
            <Menu size={22} />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      {drawer && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-ink/40"
            onClick={() => setDrawer(false)}
            aria-hidden="true"
          />
          <div className="absolute inset-y-0 left-0 w-72 max-w-[85vw] animate-fade-up bg-white shadow-xl">
            <button
              type="button"
              onClick={() => setDrawer(false)}
              aria-label="Menyuni yopish"
              className="absolute right-3 top-4 rounded-lg p-1.5 text-ink-soft"
            >
              <X size={20} />
            </button>
            {sidebar}
          </div>
        </div>
      )}

      {/* Kontent */}
      <main className="lg:pl-64">
        <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:py-8">
          {demoMode && (
            <div className="mb-4 rounded-xl border-l-4 border-accent-yellow bg-accent-yellow-soft px-4 py-2.5 text-xs font-semibold text-[#8a6d00]">
              DEMO rejimi — Supabase sozlanmagan, ma’lumotlar brauzerda saqlanadi.
            </div>
          )}
          {children}
        </div>
      </main>
    </div>
  );
}
