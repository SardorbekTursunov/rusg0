"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, Loader2, Timer } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GameResultScreen } from "@/components/games/game-result";
import { useGamePool } from "@/hooks/use-game-pool";
import { finishGame, buildOptions, type GameWord } from "@/lib/games";
import { useAuth } from "@/components/providers/auth-provider";

/**
 * ⚡ Quiz rush — 60 sekundda maksimal to'g'ri javob.
 * Ruscha so'z ko'rsatiladi, 4 o'zbekcha variantdan to'g'risini tanlash.
 */
const DURATION = 60; // sekund

interface Q {
  word: GameWord;
  options: string[];
}

function makeQuestion(pool: GameWord[]): Q {
  const word = pool[Math.floor(Math.random() * pool.length)];
  return {
    word,
    options: buildOptions(word.uzbekTranslation, pool.map((w) => w.uzbekTranslation)),
  };
}

export default function QuizGamePage() {
  const { refresh } = useAuth();
  const { pool, loading, error } = useGamePool();

  const [phase, setPhase] = useState<"intro" | "play" | "done">("intro");
  const [q, setQ] = useState<Q | null>(null);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [seconds, setSeconds] = useState(DURATION);
  const [result, setResult] = useState<{ xp: number; cap: boolean } | null>(null);
  const savedRef = useRef(false);

  // Taymer
  useEffect(() => {
    if (phase !== "play") return;
    if (seconds <= 0) {
      setPhase("done");
      return;
    }
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [phase, seconds]);

  // O'yin tugadi → XP saqlash
  useEffect(() => {
    if (phase !== "done" || savedRef.current) return;
    savedRef.current = true;
    (async () => {
      const r = await finishGame("quiz", score, answered);
      if (r) {
        setResult({ xp: r.xpAwarded, cap: r.capReached });
        await refresh();
      }
    })();
  }, [phase, score, answered, refresh]);

  const start = () => {
    if (!pool) return;
    setPhase("play");
    setSeconds(DURATION);
    setScore(0);
    setAnswered(0);
    setQ(makeQuestion(pool));
    setPicked(null);
    setResult(null);
    savedRef.current = false;
  };

  const answer = useCallback(
    (opt: string) => {
      if (picked !== null || !q || !pool) return;
      setPicked(opt);
      const ok = opt === q.word.uzbekTranslation;
      setScore((s) => s + (ok ? 1 : 0));
      setAnswered((n) => n + 1);
      setTimeout(() => {
        setPicked(null);
        setQ(makeQuestion(pool));
      }, ok ? 350 : 750);
    },
    [picked, q, pool],
  );

  if (loading) {
    return (
      <Center>
        <Loader2 size={26} className="animate-spin text-primary" />
      </Center>
    );
  }
  if (error || !pool || pool.length < 4) {
    return (
      <Center>
        <p className="text-sm text-ink-soft">So&apos;zlarni yuklashda xatolik. Keyinroq urinib ko&apos;ring.</p>
      </Center>
    );
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-6">
      <Link href="/games" className="mb-4 inline-flex items-center gap-1.5 text-sm font-bold text-ink-soft hover:text-ink">
        <ArrowLeft size={16} />
        O&apos;yinlar
      </Link>

      {phase === "intro" && (
        <Card className="p-6 text-center">
          <span className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fff7e0] text-3xl">⚡</span>
          <h1 className="text-2xl font-extrabold text-ink">Quiz rush</h1>
          <p className="mt-2 text-sm text-ink-soft">
            60 sekund ichida maksimal to&apos;g&apos;ri javob ber! Ruscha so&apos;z ko&apos;rsatiladi —
            to&apos;g&apos;ri o&apos;zbekcha tarjimasini tanla.
          </p>
          <p className="mt-3 text-xs text-ink-soft">Har to&apos;g&apos;ri javob = 1 XP (kunlik limit 30)</p>
          <Button onClick={start} className="mt-5 w-full">
            <Timer size={16} />
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
            <span className={`rounded-full px-3 py-1 text-sm font-extrabold tabular-nums ${seconds <= 10 ? "bg-[#ffecec] text-[#c62828]" : "bg-surface-2 text-ink"}`}>
              ⏱ {seconds}s
            </span>
          </div>

          <Card className="p-6">
            <p className="text-center text-sm font-bold text-ink-soft">Bu nima degani?</p>
            <p className="mt-2 text-center text-4xl font-extrabold text-ink">{q.word.russianWord}</p>
            <p className="mt-1 text-center text-sm text-ink-soft">[{q.word.transliteration}]</p>

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
          title="Quiz rush"
          correct={score}
          total={Math.max(answered, 1)}
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
