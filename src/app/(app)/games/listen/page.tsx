"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, Loader2, Volume2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GameResultScreen } from "@/components/games/game-result";
import { useGamePool } from "@/hooks/use-game-pool";
import { finishGame, pickN, buildOptions, speakRu, type GameWord } from "@/lib/games";
import { useAuth } from "@/components/providers/auth-provider";

/**
 * 🎧 Tingla va top — ruscha so'z ovoz bilan eshitiladi (TTS),
 * 4 o'zbekcha variantdan to'g'risi tanlanadi. 10 raund.
 */
const ROUNDS = 10;

interface Q {
  word: GameWord;
  options: string[];
}

export default function ListenGamePage() {
  const { refresh } = useAuth();
  const { pool, loading, error } = useGamePool();

  const [phase, setPhase] = useState<"intro" | "play" | "done">("intro");
  const [questions, setQuestions] = useState<Q[]>([]);
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [result, setResult] = useState<{ xp: number; cap: boolean } | null>(null);

  const start = () => {
    if (!pool) return;
    const words = pickN(pool, ROUNDS);
    const qs = words.map((w) => ({
      word: w,
      options: buildOptions(w.uzbekTranslation, pool.map((p) => p.uzbekTranslation)),
    }));
    setQuestions(qs);
    setIdx(0);
    setScore(0);
    setPicked(null);
    setResult(null);
    setPhase("play");
  };

  // Har savolda avtomatik o'qish
  useEffect(() => {
    if (phase !== "play" || !questions[idx]) return;
    const t = setTimeout(() => speakRu(questions[idx].word.russianWord, 0.85), 400);
    return () => clearTimeout(t);
  }, [phase, idx, questions]);

  const answer = (opt: string) => {
    if (picked !== null) return;
    const q = questions[idx];
    setPicked(opt);
    const ok = opt === q.word.uzbekTranslation;
    if (ok) setScore((s) => s + 1);
    setTimeout(() => {
      if (idx + 1 >= ROUNDS) {
        setPhase("done");
        (async () => {
          const r = await finishGame("listen", score + (ok ? 1 : 0), ROUNDS);
          if (r) {
            setResult({ xp: r.xpAwarded, cap: r.capReached });
            await refresh();
          }
        })();
      } else {
        setIdx((i) => i + 1);
        setPicked(null);
      }
    }, ok ? 500 : 900);
  };

  if (loading) return <Center><Loader2 size={26} className="animate-spin text-primary" /></Center>;
  if (error || !pool || pool.length < ROUNDS)
    return <Center><p className="text-sm text-ink-soft">So&apos;zlarni yuklashda xatolik.</p></Center>;

  const q = questions[idx];

  return (
    <div className="mx-auto max-w-lg px-4 py-6">
      <Link href="/games" className="mb-4 inline-flex items-center gap-1.5 text-sm font-bold text-ink-soft hover:text-ink">
        <ArrowLeft size={16} />
        O&apos;yinlar
      </Link>

      {phase === "intro" && (
        <Card className="p-6 text-center">
          <span className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fdf0e6] text-3xl">🎧</span>
          <h1 className="text-2xl font-extrabold text-ink">Tingla va top</h1>
          <p className="mt-2 text-sm text-ink-soft">
            Ruscha so&apos;z ovoz bilan eshitiladi — to&apos;g&apos;ri o&apos;zbekcha tarjimasini
            toping. 10 savol.
          </p>
          <p className="mt-3 text-xs text-ink-soft">Har to&apos;g&apos;ri javob = 1 XP (kunlik limit 30)</p>
          <Button onClick={start} className="mt-5 w-full">
            <Volume2 size={16} />
            Boshlash
          </Button>
        </Card>
      )}

      {phase === "play" && q && (
        <>
          <div className="mb-4 flex items-center justify-between">
            <span className="rounded-full bg-primary-soft px-3 py-1 text-sm font-extrabold text-ink tabular-nums">
              {score} to&apos;g&apos;ri
            </span>
            <span className="rounded-full bg-surface-2 px-3 py-1 text-sm font-extrabold text-ink tabular-nums">
              {idx + 1}/{ROUNDS}
            </span>
          </div>

          <Card className="p-8">
            <p className="text-center text-sm font-bold text-ink-soft">Eshitilgan so&apos;z tarjimasi qaysi?</p>
            <button
              type="button"
              onClick={() => speakRu(q.word.russianWord, 0.85)}
              className="mx-auto mt-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white shadow-[0_4px_0_0_var(--color-primary-dark)] hover:brightness-105 active:shadow-none"
              aria-label="Qayta tinglash"
            >
              <Volume2 size={26} />
            </button>
            <p className="mt-2 text-center text-xs text-ink-soft">Qayta tinglash uchun bosing</p>

            <div className="mt-6 grid gap-2">
              {q.options.map((opt) => {
                const isCorrect = opt === q.word.uzbekTranslation;
                const state =
                  picked === null
                    ? "idle"
                    : isCorrect
                      ? "correct"
                      : opt === picked
                        ? "wrong"
                        : "dim";
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => answer(opt)}
                    disabled={picked !== null}
                    className={`rounded-xl border-2 px-4 py-3 text-left text-sm font-bold transition-colors ${
                      state === "idle"
                        ? "border-line bg-white hover:border-primary hover:bg-primary-soft"
                        : state === "correct"
                          ? "border-[#2e7d32] bg-[#e8f5e9] text-[#1b5e20]"
                          : state === "wrong"
                            ? "border-error bg-[#ffecec] text-[#c62828]"
                            : "border-line bg-white opacity-40"
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </Card>
        </>
      )}

      {phase === "done" && (
        <GameResultScreen
          title="Tingla va top"
          correct={score}
          total={ROUNDS}
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
