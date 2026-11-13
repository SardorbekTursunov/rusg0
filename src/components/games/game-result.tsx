"use client";

import Link from "next/link";
import { RotateCcw, Gamepad2, Zap, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

/**
 * Barcha o'yinlarning yakuniy ekrani: natija + XP + qayta o'ynash.
 */
export function GameResultScreen({
  correct,
  total,
  xpAwarded,
  capReached,
  title,
  onAgain,
}: {
  correct: number;
  total: number;
  xpAwarded: number;
  capReached: boolean;
  title: string;
  onAgain: () => void;
}) {
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
  const perfect = total > 0 && correct === total;

  return (
    <Card className="p-6 sm:p-8">
      <div className="text-center">
        <span className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-soft text-3xl">
          {perfect ? "🏆" : pct >= 60 ? "🎉" : "💪"}
        </span>
        <h2 className="text-2xl font-extrabold text-ink">
          {perfect ? "Mukammal!" : pct >= 60 ? "Zo'r o'yin!" : "Yaxshi urinish!"}
        </h2>
        <p className="mt-1 text-sm text-ink-soft">
          {title} — natija
        </p>

        <div className="mt-5 rounded-2xl border-2 border-line bg-surface p-4">
          <p className="text-3xl font-extrabold text-ink tabular-nums">
            {correct} / {total}
          </p>
          <p className="mt-1 text-sm font-bold text-[#2e7d32]">
            {xpAwarded > 0 ? (
              <>
                <Zap size={14} className="mr-1 inline" />
                +{xpAwarded} XP
              </>
            ) : capReached ? (
              "Bugungi o'yin XP limiti tugadi (30/30)"
            ) : (
              "XP berilmadi"
            )}
          </p>
        </div>

        {capReached && xpAwarded > 0 && (
          <p className="mt-3 text-xs text-ink-soft">
            ⚠️ Bugungi o&apos;yin XP limitiga yetdilar — ertaga davom eting (kuniga 30 XP).
          </p>
        )}

        <div className="mt-5 flex flex-col gap-2">
          <Button onClick={onAgain} className="w-full">
            <RotateCcw size={16} />
            Yana o&apos;ynash
          </Button>
          <Link
            href="/games"
            className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border-2 border-line bg-white text-sm font-bold text-ink shadow-[0_3px_0_0_var(--color-line)] hover:bg-surface active:shadow-none"
          >
            <Gamepad2 size={16} />
            Boshqa o&apos;yinlar
          </Link>
        </div>

        <p className="mt-4 text-xs text-ink-soft">
          O&apos;yinlardan kuniga ko&apos;pi bilan <strong>30 XP</strong> olinadi —{" "}
          <Flame size={12} className="inline" /> streak ham hisoblanadi
        </p>
      </div>
    </Card>
  );
}
