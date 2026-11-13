"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GameResultScreen } from "@/components/games/game-result";
import { useGamePool } from "@/hooks/use-game-pool";
import { finishGame, isSingleWord, shuffle, speakRu, type GameWord } from "@/lib/games";
import { useAuth } from "@/components/providers/auth-provider";

/**
 * 🔤 Harflarni yig' — ruscha so'z harflari tartibsiz beriladi,
 * o'zbekcha tarjimasi maslahat. To'g'ri tartibda bosiladi. 8 raund.
 */
const ROUNDS = 8;

interface Tile {
  id: number;
  letter: string;
}

interface Round {
  word: GameWord;
  tiles: Tile[];
}

function makeRound(pool: GameWord[]): Round | null {
  const candidates = pool.filter(isSingleWord).filter((w) => w.russianWord.length >= 3 && w.russianWord.length <= 9);
  if (candidates.length === 0) return null;
  const word = candidates[Math.floor(Math.random() * candidates.length)];
  const letters = [...word.russianWord.toLowerCase()];
  const tiles = shuffle(letters.map((letter, id) => ({ id, letter })));
  // agar aralashgan holat asl so'z bilan bir xil qoldi — yana almashtiramiz
  if (tiles.every((t, i) => t.letter === letters[i]) && letters.some((l, i) => letters.lastIndexOf(l) !== i)) {
    tiles.reverse();
  }
  return { word, tiles };
}

export default function LettersGamePage() {
  const { refresh } = useAuth();
  const { pool, loading, error } = useGamePool();

  const [phase, setPhase] = useState<"intro" | "play" | "done">("intro");
  const [rounds, setRounds] = useState<Round[]>([]);
  const [idx, setIdx] = useState(0);
  const [built, setBuilt] = useState<number[]>([]); // ishlatilgan tile id'lari
  const [score, setScore] = useState(0);
  const [flash, setFlash] = useState<"ok" | "no" | null>(null);
  const [result, setResult] = useState<{ xp: number; cap: boolean } | null>(null);

  const cur = rounds[idx];

  const currentWord = useMemo(() => {
    if (!cur) return "";
    return built.map((id) => cur.tiles.find((t) => t.id === id)?.letter ?? "").join("");
  }, [cur, built]);

  const start = () => {
    if (!pool) return;
    const rs: Round[] = [];
    for (let i = 0; i < ROUNDS; i++) {
      const r = makeRound(pool);
      if (r) rs.push(r);
    }
    setRounds(rs);
    setIdx(0);
    setBuilt([]);
    setScore(0);
    setFlash(null);
    setResult(null);
    setPhase("play");
  };

  const tap = (id: number) => {
    if (built.includes(id) || flash) return;
    const next = [...built, id];
    setBuilt(next);
    if (!cur || next.length !== cur.word.russianWord.length) return;

    // so'z to'ldirildi → tekshirish
    const assembled = next.map((i) => cur.tiles.find((t) => t.id === i)?.letter ?? "").join("");
    const ok = assembled === cur.word.russianWord.toLowerCase();
    setFlash(ok ? "ok" : "no");
    if (ok) {
      speakRu(cur.word.russianWord, 0.85);
      setScore((s) => s + 1);
    }
    setTimeout(() => {
      setFlash(null);
      if (idx + 1 >= rounds.length) {
        const finalScore = score + (ok ? 1 : 0);
        setPhase("done");
        (async () => {
          const r = await finishGame("letters", finalScore, rounds.length);
          if (r) {
            setResult({ xp: r.xpAwarded, cap: r.capReached });
            await refresh();
          }
        })();
      } else {
        setIdx((i) => i + 1);
        setBuilt([]);
      }
    }, ok ? 800 : 1100);
  };

  if (loading) return <Center><Loader2 size={26} className="animate-spin text-primary" /></Center>;
  if (error || !pool || pool.length < ROUNDS)
    return <Center><p className="text-sm text-ink-soft">So&apos;zlarni yuklashda xatolik.</p></Center>;

  return (
    <div className="mx-auto max-w-lg px-4 py-6">
      <Link href="/games" className="mb-4 inline-flex items-center gap-1.5 text-sm font-bold text-ink-soft hover:text-ink">
        <ArrowLeft size={16} />
        O&apos;yinlar
      </Link>

      {phase === "intro" && (
        <Card className="p-6 text-center">
          <span className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f3ecff] text-3xl">🔤</span>
          <h1 className="text-2xl font-extrabold text-ink">Harflarni yig&apos;</h1>
          <p className="mt-2 text-sm text-ink-soft">
            O&apos;zbekcha tarjima ko&apos;rsatiladi — ruscha so&apos;zni harflardan to&apos;g&apos;ri
            tartibda yig&apos;ing. 8 so&apos;z.
          </p>
          <p className="mt-3 text-xs text-ink-soft">Har to&apos;g&apos;ri so&apos;z = 1 XP (kunlik limit 30)</p>
          <Button onClick={start} className="mt-5 w-full">
            Boshlash
          </Button>
        </Card>
      )}

      {phase === "play" && cur && (
        <>
          <div className="mb-4 flex items-center justify-between">
            <span className="rounded-full bg-primary-soft px-3 py-1 text-sm font-extrabold text-ink tabular-nums">
              {score} to&apos;g&apos;ri
            </span>
            <span className="rounded-full bg-surface-2 px-3 py-1 text-sm font-extrabold text-ink tabular-nums">
              {idx + 1}/{rounds.length}
            </span>
          </div>

          <Card className={`p-8 transition-colors ${flash === "ok" ? "bg-[#e8f5e9]" : flash === "no" ? "bg-[#ffecec]" : ""}`}>
            <p className="text-center text-sm font-bold text-ink-soft">
              «{cur.word.uzbekTranslation}» ruscha qanday yoziladi?
            </p>

            {/* Yig'ilgan so'z joyi */}
            <div className="mx-auto mt-5 flex min-h-14 items-center justify-center gap-1 rounded-xl border-2 border-dashed border-line bg-surface px-3">
              <span className={`text-2xl font-extrabold tabular-nums tracking-widest ${flash === "no" ? "text-[#c62828]" : "text-ink"}`}>
                {currentWord || <span className="text-line">?</span>}
              </span>
              <span className="ml-2 text-xs text-ink-soft">[{cur.word.transliteration}]</span>
            </div>

            {/* Harflar */}
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {cur.tiles.map((t) => {
                const used = built.includes(t.id);
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => tap(t.id)}
                    disabled={used || flash !== null}
                    className={`h-12 w-12 rounded-xl border-2 text-lg font-extrabold transition-colors ${
                      used
                        ? "border-line bg-surface-2 text-ink-soft opacity-50"
                        : "border-line bg-white text-ink hover:border-primary hover:bg-primary-soft"
                    }`}
                  >
                    {t.letter}
                  </button>
                );
              })}
            </div>

            {/* Bekor qilish */}
            <button
              type="button"
              onClick={() => setBuilt([])}
              disabled={built.length === 0 || flash !== null}
              className="mx-auto mt-5 block text-xs font-bold text-ink-soft hover:text-ink disabled:opacity-40"
            >
              ← Boshidan
            </button>
          </Card>
        </>
      )}

      {phase === "done" && (
        <GameResultScreen
          title="Harflarni yig'"
          correct={score}
          total={rounds.length}
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
