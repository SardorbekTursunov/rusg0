"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/providers/auth-provider";
import { cn } from "@/lib/utils";

const links = [
  { href: "/#kurslar", label: "Kurslar" },
  { href: "/#qanday-ishlaydi", label: "Qanday ishlaydi?" },
  { href: "/#biz-haqimizda", label: "Biz haqimizda" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { status } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const dashboardHref = status === "authenticated" ? "/dashboard" : "/register";

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-all",
        scrolled ? "border-b border-line bg-white/85 backdrop-blur-md" : "bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" aria-label="RusGo bosh sahifa" className="flex items-center">
          <Logo size={34} />
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-semibold text-ink-soft transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/login"
            className="rounded-full px-4 py-2 text-sm font-bold text-ink-soft transition-colors hover:bg-surface-2 hover:text-ink"
          >
            Kirish
          </Link>
          <Link href={dashboardHref}>
            <Button size="sm">Boshlash</Button>
          </Link>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-ink md:hidden"
          aria-label={open ? "Menyuni yopish" : "Menyuni ochish"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-line bg-white px-4 pb-4 pt-2 md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-semibold text-ink-soft hover:bg-surface-2"
              >
                {l.label}
              </a>
            ))}
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-semibold text-ink-soft hover:bg-surface-2"
            >
              Kirish
            </Link>
            <Link href={dashboardHref} onClick={() => setOpen(false)} className="mt-1">
              <Button className="w-full">Boshlash</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
