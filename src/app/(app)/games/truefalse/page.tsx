"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GameResultScreen } from "@/components/games/game-result";
import { useGamePool } from "@/hooks/use-game-pool";
import { finishGame, shuffle, type GameWord } from "@/lib/games";
import { useAuth } from "@/components/providers/auth-provider";

/**
 * ✅❌ To'g'ri/Xato — 10 ta tasodifiy juftlik ko'rsatiladi:
 * "Собака = mushuk" kabi. Yarimi to'g'ri tarjima, yarimi boshqa so'zning
 * tarjimasi. Har to'g'ri javob = 1 XP.
 */
const ROUNDS = 10;

interface Q {
  word: GameWord;      // asl so'z
  shownUz: string;     // ko'rsatilgan tarjima
  isCorrect: boolean;  // to'g'ri tarjima berilganmi?
}

function makeQuestions(pool: GameWord[]): Q[] {
  const words = shuffle(pool).slice(0, ROUNDS);
  return words.map((w, i) => {
    // Toq indekslarda ~ yarmida boshqa so'z tarjimasini ko'rsatamiz
    const fake = i % 2 === 1;
    if (!fake) return { word: w, shownUz: w.uzbekTranslation, isCorrect: true };
    const other = pool[Math.floor(Math.random() * pool.length)];
    // boshqa so'zning tarjimasini olamiz (bir xil bo'lsa to'g'ri deb hisoblanadi)
    return { word: w, shownUz: other.uzbekTranslation, isCorrect: other.uzbekTranslation === w.uzbekTranslation ? true : false };
  });
}

export default function TrueFalseGamePage() {
  const { refresh } = useAuth();
  const { pool, loading, error } = useGamePool();

  const [phase, setPhase] = useState<"intro" | "play" | "done">("intro");
  const [questions, setQuestions] = useState<Q[]>([]);
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [flash, setFlash] = useState<"ok" | "no" | null>(null);
  const [result, setResult] = useState<{ xp: number; cap: boolean } | null>(null);

  const start = () => {
    if (!pool) return;
    setQuestions(makeQuestions(pool));
    setIdx(0);
    setScore(0);
    setFlash(null);
    setResult(null);
    setPhase("play");
  };

  useEffect(() => {
    if (phase !== "play" || flash === null) return;
    const t = setTimeout(() => setFlash(null), 300);
    return () => clearTimeout(t);
  }, [flash, phase]);

  const answer = (guess: boolean) => {
    const q = questions[idx];
    const ok = guess === q.isCorrect;
    setScore((s) => s + (ok ? 1 : 0));
    setFlash(ok ? "ok" : "no");
    setTimeout(() => {
      if (idx + 1 >= ROUNDS) {
        const finalScore = score + (ok ? 1 : 0);
        setPhase("done");
        (async () => {
          const r = await finishGame("truefalse", finalScore, ROUNDS);
          if (r) {
            setResult({ xp: r.xpAwarded, cap: r.capReached });
            await refresh();
          }
        })();
      } else {
        setIdx((i) => i + 1);
      }
    }, 350);
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
          <span className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e9f7ec] text-3xl">✅</span>
          <h1 className="text-2xl font-extrabold text-ink">To&apos;g&apos;ri / Xato</h1>
          <p className="mt-2 text-sm text-ink-soft">
            Ruscha so&apos;z va o&apos;zbekcha tarjima ko&apos;rsatiladi. Tarjima to&apos;g&apos;rimi?
            Tez qaror qabul qil — 10 savol!
          </p>
          <p className="mt-3 text-xs text-ink-soft">Har to&apos;g&apos;ri javob = 1 XP (kunlik limit 30)</p>
          <Button onClick={start} className="mt-5 w-full">
            Boshlash
          </Button>
        </Card>
      )}

      {phase === "play" && questions[idx] && (
        <>
          <div className="mb-4 flex items-center justify-between">
            <span className="rounded-full bg-primary-soft px-3 py-1 text-sm font-extrabold text-ink tabular-nums">
              {score} to&apos;g&apos;ri
            </span>
            <span className="rounded-full bg-surface-2 px-3 py-1 text-sm font-extrabold text-ink tabular-nums">
              {idx + 1}/{ROUNDS}
            </span>
          </div>

          <Card className={`p-8 transition-colors ${flash === "ok" ? "bg-[#e8f5e9]" : flash === "no" ? "bg-[#ffecec]" : ""}`}>
            <p className="text-center text-sm font-bold text-ink-soft">Tarjima to&apos;g&apos;rimi?</p>
            <p className="mt-3 text-center text-4xl font-extrabold text-ink">{questions[idx].word.russianWord}</p>
            <p className="mt-1 text-center text-lg font-bold text-primary">= {questions[idx].shownUz}</p>

            <div className="mt-8 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => answer(true)}
                disabled={flash !== null}
                className="flex h-14 items-center justify-center gap-2 rounded-xl border-2 border-line bg-white text-sm font-extrabold text-[#1b5e20] hover:border-[#2e7d32] hover:bg-[#e8f5e9] disabled:opacity-50"
              >
                ✅ To&apos;g&apos;ri
              </button>
              <button
                type="button"
                onClick={() => answer(false)}
                disabled={flash !== null}
                className="flex h-14 items-center justify-center gap-2 rounded-xl border-2 border-line bg-white text-sm font-extrabold text-[#c62828] hover:border-error hover:bg-[#ffecec] disabled:opacity-50"
              >
                ❌ Xato
              </button>
            </div>
          </Card>
        </>
      )}

      {phase === "done" && (
        <GameResultScreen
          title="To'g'ri / Xato"
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
