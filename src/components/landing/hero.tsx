"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Flame, Zap, BookOpen, Check, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

/**
 * Hero: chapda mavzu + CTA, o'ngda haqiqiy dashboard maketi
 * va uchib yuruvchi XP / streak / so'z kartalari.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Fon dekoratsiyasi — yumshoq shakllar */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-primary-soft opacity-70 blur-2xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 top-40 h-64 w-64 rounded-full bg-accent-blue-soft opacity-70 blur-2xl"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pb-16 pt-12 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:pb-24 lg:pt-16">
        {/* Matn */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3.5 py-1.5 text-xs font-bold text-primary-ink">
            <Star size={14} className="fill-accent-yellow text-accent-yellow" />
            O‘zbek tilida tushuntirishlar bilan
          </span>

          <h1 className="mt-5 text-4xl font-extrabold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]">
            Rus tilini o‘rganish{" "}
            <span className="relative inline-block text-primary">
              endi oson!
              <svg
                aria-hidden="true"
                viewBox="0 0 300 12"
                className="absolute -bottom-2 left-0 w-full"
                preserveAspectRatio="none"
              >
                <path
                  d="M4 8c60-6 130-7 292-4"
                  stroke="#FFC800"
                  strokeWidth="6"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-soft">
            Har kuni 10 daqiqa. Yangi so‘zlar, interaktiv darslar va haqiqiy
            natijalar.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link href="/register">
              <Button size="lg">Bepul boshlash</Button>
            </Link>
            <a href="#qanday-ishlaydi">
              <Button variant="secondary" size="lg">
                Qanday ishlaydi?
              </Button>
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm font-semibold text-ink-soft">
            <span className="flex items-center gap-2">
              <Check size={16} className="text-primary" /> 25 ta dars
            </span>
            <span className="flex items-center gap-2">
              <Check size={16} className="text-primary" /> 290+ savol
            </span>
            <span className="flex items-center gap-2">
              <Check size={16} className="text-primary" /> 120 ta so‘z
            </span>
          </div>
        </motion.div>

        {/* Dashboard maketi */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12 }}
          className="relative mx-auto w-full max-w-md"
        >
          {/* Uchib yuruvchi kartalar */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-4 top-6 z-20 flex items-center gap-2 rounded-2xl bg-white px-3.5 py-2.5 shadow-lg ring-1 ring-line sm:-left-10"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent-yellow-soft">
              <Zap size={16} className="text-accent-yellow" />
            </span>
            <div className="leading-tight">
              <p className="text-xs font-bold text-ink">+10 XP</p>
              <p className="text-[10px] text-ink-soft">Dars tugadi</p>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
            className="absolute -right-3 top-1/3 z-20 flex items-center gap-2 rounded-2xl bg-white px-3.5 py-2.5 shadow-lg ring-1 ring-line sm:-right-8"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-error-soft">
              <Flame size={16} className="text-error animate-flame" />
            </span>
            <div className="leading-tight">
              <p className="text-xs font-bold text-ink">7 kun</p>
              <p className="text-[10px] text-ink-soft">Streak</p>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 1.1 }}
            className="absolute -bottom-5 left-6 z-20 flex items-center gap-2 rounded-2xl bg-white px-3.5 py-2.5 shadow-lg ring-1 ring-line sm:left-14"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary-soft">
              <BookOpen size={16} className="text-primary" />
            </span>
            <div className="leading-tight">
              <p className="text-xs font-bold text-ink">128 so‘z</p>
              <p className="text-[10px] text-ink-soft">Lug‘at</p>
            </div>
          </motion.div>

          {/* Dashboard kartasi */}
          <div className="card relative z-10 overflow-hidden p-0">
            <div className="flex items-center justify-between border-b border-line bg-white px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-soft text-lg">
                  🦊
                </span>
                <div>
                  <p className="text-sm font-bold text-ink">Salom, Aziza!</p>
                  <p className="text-xs text-ink-soft">A1 · Знакомство</p>
                </div>
              </div>
              <span className="flex items-center gap-1 rounded-full bg-error-soft px-2.5 py-1 text-xs font-bold text-error">
                <Flame size={13} /> 7
              </span>
            </div>

            <div className="space-y-5 px-5 py-5">
              <div>
                <div className="mb-1.5 flex items-center justify-between text-xs font-bold">
                  <span className="text-ink-soft">Kunlik maqsad</span>
                  <span className="text-primary">24/30 XP</span>
                </div>
                <Progress value={80} height="h-2.5" ariaLabel="Kunlik maqsad" />
              </div>

              {/* O'rganish yo'li maketi */}
              <div className="relative rounded-2xl bg-surface p-4">
                <p className="mb-3 text-xs font-bold uppercase tracking-wide text-ink-faint">
                  O‘rganish yo‘li
                </p>
                <div className="flex items-end justify-between gap-2">
                  <PathNode state="done">1</PathNode>
                  <Connector done />
                  <PathNode state="done">2</PathNode>
                  <Connector done />
                  <PathNode state="current">3</PathNode>
                  <Connector />
                  <PathNode state="locked">4</PathNode>
                  <Connector />
                  <PathNode state="locked">5</PathNode>
                </div>
                <div className="mt-4 rounded-xl bg-white p-3 shadow-sm">
                  <p className="text-sm font-bold text-ink">Ism va yosh</p>
                  <p className="mt-0.5 text-xs text-ink-soft">
                    «Сколько тебе лет?» — Yoshing nechaga to‘ladi?
                  </p>
                  <div className="mt-2.5 flex items-center justify-between">
                    <span className="rounded-full bg-accent-yellow-soft px-2 py-0.5 text-[10px] font-bold text-[#8a6d00]">
                      +10 XP
                    </span>
                    <span className="flex items-center gap-1 text-[11px] font-bold text-primary">
                      Davom etish <ChevronRight size={13} />
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <Stat label="XP" value="480" tone="bg-accent-yellow-soft" icon={<Zap size={14} className="text-accent-yellow" />} />
                <Stat label="Streak" value="7" tone="bg-error-soft" icon={<Flame size={14} className="text-error" />} />
                <Stat label="So‘z" value="128" tone="bg-primary-soft" icon={<BookOpen size={14} className="text-primary" />} />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function PathNode({
  state,
  children,
}: {
  state: "done" | "current" | "locked";
  children: React.ReactNode;
}) {
  return (
    <span
      className={[
        "flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold transition-all",
        state === "done" && "bg-primary text-white shadow-[0_3px_0_0_var(--color-primary-dark)]",
        state === "current" && "scale-110 bg-white text-primary ring-4 ring-primary-soft",
        state === "locked" && "bg-surface-2 text-ink-faint",
      ].join(" ")}
    >
      {state === "done" ? <Check size={16} /> : children}
    </span>
  );
}

function Connector({ done = false }: { done?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`mb-5 h-1 flex-1 rounded-full ${done ? "bg-primary" : "bg-surface-2"}`}
    />
  );
}

function Stat({
  label,
  value,
  icon,
  tone,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  tone: string;
}) {
  return (
    <div className="rounded-xl bg-white p-2.5 text-center shadow-sm">
      <span className={`mx-auto mb-1 flex h-7 w-7 items-center justify-center rounded-lg ${tone}`}>
        {icon}
      </span>
      <p className="text-sm font-extrabold text-ink">{value}</p>
      <p className="text-[10px] font-semibold text-ink-soft">{label}</p>
    </div>
  );
}
