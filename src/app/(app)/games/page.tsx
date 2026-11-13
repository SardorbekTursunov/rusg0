"use client";

import Link from "next/link";
import { useMemo } from "react";
import { ArrowLeft, Volume2, LetterText, CheckCircle2, Shuffle, Timer, Gamepad2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useStoreData } from "@/hooks/use-store-data";

/**
 * O'yinlar markazi — 5 ta o'yin, hammasi lug'atdagi so'zlarda.
 * O'yinlardan kuniga ko'pi bilan 30 XP olinadi (farm'dan himoya).
 */

const GAMES = [
  {
    slug: "/games/quiz",
    icon: Timer,
    emoji: "⚡",
    title: "Quiz rush",
    desc: "60 sekundda maksimal to'g'ri javob ber!",
    accent: "bg-[#fff7e0]",
  },
  {
    slug: "/games/memory",
    icon: Shuffle,
    emoji: "🃏",
    title: "Juftlash",
    desc: "Ruscha va o'zbekcha kartochkalarni xotiradan juftlang.",
    accent: "bg-[#e8f0ff]",
  },
  {
    slug: "/games/truefalse",
    icon: CheckCircle2,
    emoji: "✅",
    title: "To'g'ri / Xato",
    desc: "Tarjima to'g'rimi yoki yolg'onmi — tez qaror qabul qil!",
    accent: "bg-[#e9f7ec]",
  },
  {
    slug: "/games/listen",
    icon: Volume2,
    emoji: "🎧",
    title: "Tingla va top",
    desc: "So'zni eshitib, to'g'ri tarjimani toping.",
    accent: "bg-[#fdf0e6]",
  },
  {
    slug: "/games/letters",
    icon: LetterText,
    emoji: "🔤",
    title: "Harflarni yig'",
    desc: "Harflar tartibsiz — ruscha so'zni qayta yig'ing.",
    accent: "bg-[#f3ecff]",
  },
];

export default function GamesPage() {
  // Bugungi o'yin XP'si (limit 30)
  const { data: events } = useStoreData((store) => store.getXpEvents(100), []);
  const todayKey = new Date().toISOString().slice(0, 10);
  const todayGameXp = useMemo(
    () =>
      (events ?? [])
        .filter((e) => e.source === "game" && String(e.createdAt).slice(0, 10) === todayKey)
        .reduce((s, e) => s + e.amount, 0),
    [events, todayKey],
  );

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:py-8">
      <Link href="/dashboard" className="mb-4 inline-flex items-center gap-1.5 text-sm font-bold text-ink-soft hover:text-ink">
        <ArrowLeft size={16} />
        Bosh sahifa
      </Link>

      <div className="mb-6">
        <h1 className="flex items-center gap-2 text-3xl font-extrabold text-ink">
          <Gamepad2 size={26} className="text-primary" />
          O&apos;yinlar
        </h1>
        <p className="mt-1 text-sm text-ink-soft">
          Lug&apos;atdagi so&apos;zlar bilan 5 ta o&apos;yin — o&apos;ynab, XP yig&apos;ing!
        </p>
        <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1.5 text-xs font-bold text-ink">
          <ZapIcon />
          Bugungi o&apos;yin XP: {todayGameXp}/30
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {GAMES.map((g) => {
          const Icon = g.icon;
          return (
            <Link key={g.slug} href={g.slug} className="group">
              <Card className="h-full p-4 transition-transform group-hover:-translate-y-0.5 group-hover:shadow-md">
                <div className="flex items-start gap-3">
                  <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xl ${g.accent}`}>
                    {g.emoji}
                  </span>
                  <div>
                    <h2 className="font-extrabold text-ink group-hover:text-primary">{g.title}</h2>
                    <p className="mt-0.5 text-sm text-ink-soft">{g.desc}</p>
                  </div>
                  <Icon size={16} className="ml-auto shrink-0 text-line" />
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function ZapIcon() {
  return <span aria-hidden>⚡</span>;
}
