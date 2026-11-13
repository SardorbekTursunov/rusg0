"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { GameResultScreen } from "@/components/games/game-result";
import { useGamePool } from "@/hooks/use-game-pool";
import { finishGame, pickN, type GameWord } from "@/lib/games";
import { useAuth } from "@/components/providers/auth-provider";

/**
 * 🃏 Juftlash — xotira o'yini: ruscha va o'zbekcha kartochkalar
 * juftligini topish. 6 juftlik = 12 kartochka.
 */
const PAIRS = 6;

interface CardItem {
  key: string;
  wordId: string;
  text: string;
  side: "ru" | "uz";
}

function buildDeck(pool: GameWord[]): { deck: CardItem[]; words: GameWord[] } {
  const words = pickN(pool, PAIRS);
  const deck: CardItem[] = [];
  words.forEach((w, i) => {
    deck.push({ key: `ru-${w.id}-${i}`, wordId: w.id, text: w.russianWord, side: "ru" });
    deck.push({ key: `uz-${w.id}-${i}`, wordId: w.id, text: w.uzbekTranslation, side: "uz" });
  });
  // aralashtirish
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return { deck, words };
}

export default function MemoryGamePage() {
  const { refresh } = useAuth();
  const { pool, loading, error } = useGamePool();

  const [phase, setPhase] = useState<"intro" | "play" | "done">("intro");
  const [deck, setDeck] = useState<CardItem[]>([]);
  const [flipped, setFlipped] = useState<string[]>([]); // ochiq kartochkalar (key)
  const [matched, setMatched] = useState<string[]>([]);  // topilgan wordId'lar
  const [wrongPair, setWrongPair] = useState<string[] | null>(null);
  const [moves, setMoves] = useState(0);
  const [result, setResult] = useState<{ xp: number; cap: boolean } | null>(null);

  const start = () => {
    if (!pool) return;
    const { deck: d } = buildDeck(pool);
    setDeck(d);
    setFlipped([]);
    setMatched([]);
    setWrongPair(null);
    setMoves(0);
    setResult(null);
    setPhase("play");
  };

  // 2 ta kartochka ochilganda tekshirish
  useEffect(() => {
    if (phase !== "play" || flipped.length !== 2) return;
    const [aKey, bKey] = flipped;
    const a = deck.find((c) => c.key === aKey);
    const b = deck.find((c) => c.key === bKey);
    if (!a || !b) return;

    const isMatch = a.wordId === b.wordId && a.side !== b.side;
    if (isMatch) {
      const next = [...matched, a.wordId];
      setMatched(next);
      setFlipped([]);
      if (next.length === PAIRS) {
        // o'yin tugadi
        (async () => {
          const r = await finishGame("memory", PAIRS, PAIRS);
          if (r) {
            setResult({ xp: r.xpAwarded, cap: r.capReached });
            await refresh();
          }
          setPhase("done");
        })();
      }
    } else {
      setWrongPair([aKey, bKey]);
      const t = setTimeout(() => {
        setFlipped([]);
        setWrongPair(null);
      }, 800);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flipped]);

  const flip = (card: CardItem) => {
    if (flipped.length >= 2 || wrongPair || matched.includes(card.wordId)) return;
    if (flipped.includes(card.key)) return;
    if (flipped.length === 1 && flipped[0] === card.key) return;
    setMoves((m) => m + (flipped.length === 1 ? 1 : 0));
    setFlipped((f) => [...f, card.key]);
  };

  const isOpen = (card: CardItem) => flipped.includes(card.key) || matched.includes(card.wordId);

  if (loading) return <Center><Loader2 size={26} className="animate-spin text-primary" /></Center>;
  if (error || !pool || pool.length < PAIRS)
    return <Center><p className="text-sm text-ink-soft">So&apos;zlarni yuklashda xatolik.</p></Center>;

  return (
    <div className="mx-auto max-w-lg px-4 py-6">
      <Link href="/games" className="mb-4 inline-flex items-center gap-1.5 text-sm font-bold text-ink-soft hover:text-ink">
        <ArrowLeft size={16} />
        O&apos;yinlar
      </Link>

      {phase === "intro" && (
        <Card className="p-6 text-center">
          <span className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e8f0ff] text-3xl">🃏</span>
          <h1 className="text-2xl font-extrabold text-ink">Juftlash</h1>
          <p className="mt-2 text-sm text-ink-soft">
            6 juftlik: ruscha so&apos;z va o&apos;zbekcha tarjimasi. Kartochkalarni xotiradan
            juftlab toping.
          </p>
          <button
            type="button"
            onClick={start}
            className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-xl bg-primary text-sm font-bold text-white shadow-[0_4px_0_0_var(--color-primary-dark)] hover:brightness-105 active:shadow-none"
          >
            Boshlash
          </button>
        </Card>
      )}

      {phase === "play" && (
        <>
          <div className="mb-4 flex items-center justify-between text-sm font-extrabold">
            <span className="rounded-full bg-primary-soft px-3 py-1 text-ink">
              {matched.length}/{PAIRS} juftlik
            </span>
            <span className="rounded-full bg-surface-2 px-3 py-1 text-ink tabular-nums">
              {moves} harakat
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {deck.map((card) => {
              const open = isOpen(card);
              const isWrong = wrongPair?.includes(card.key) ?? false;
              return (
                <button
                  key={card.key}
                  type="button"
                  onClick={() => flip(card)}
                  disabled={open && !isWrong}
                  className={`flex h-20 items-center justify-center rounded-xl border-2 p-1 text-center text-xs font-bold transition-colors sm:text-sm ${
                    isWrong
                      ? "border-error bg-[#ffecec] text-[#c62828]"
                      : open
                        ? card.side === "ru"
                          ? "border-primary bg-primary-soft text-ink"
                          : "border-[#2e7d32] bg-[#e8f5e9] text-[#1b5e20]"
                        : "border-line bg-white text-transparent hover:border-primary/40"
                  }`}
                >
                  {open ? card.text : "❓"}
                </button>
              );
            })}
          </div>
        </>
      )}

      {phase === "done" && (
        <GameResultScreen
          title="Juftlash"
          correct={PAIRS}
          total={PAIRS}
          xpAwarded={result?.xp ?? 0}
          capReached={result?.cap ?? false}
          onAgain={start}
        />
      )}
    </div>
  );
}

function Center({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg items-center justify-center px-4">
      <Card className="p-10">{children}</Card>
    </div>
  );
}
