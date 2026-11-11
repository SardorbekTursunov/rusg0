"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Heart,
  CheckCircle2,
  XCircle,
  Zap,
  Target,
  Loader2,
  ArrowRight,
  Trophy,
  RotateCcw,
  Star,
} from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/components/providers/auth-provider";
import { QuestionView } from "./question-view";
import {
  isAnswered,
  isCorrect,
  correctAnswerText,
  QUESTION_TYPE_LABELS,
  type AnswerState,
} from "./engine";
import { playSound } from "@/lib/sound";
import { getStore } from "@/lib/store";
import { lessonOrder } from "@/data/curriculum";
import { MAX_HEARTS } from "@/data/quests";
import { cn, percent } from "@/lib/utils";
import type { Lesson, Question } from "@/types";

type Phase = "loading" | "playing" | "out_of_hearts" | "saving" | "finished";

interface Props {
  lessonId: string;
}

export function LessonPlayer({ lessonId }: Props) {
  const router = useRouter();
  const { profile, refresh, demoMode } = useAuth();

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [phase, setPhase] = useState<Phase>("loading");

  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState<AnswerState | null>(null);
  const [checked, setChecked] = useState(false);
  const [correct, setCorrect] = useState<boolean | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [hearts, setHearts] = useState(MAX_HEARTS);
  const [exitOpen, setExitOpen] = useState(false);

  const [result, setResult] = useState<{
    xp: number;
    bonus: number;
    accuracy: number;
    correct: number;
    total: number;
    alreadyCompleted: boolean;
    achievements: string[];
    streak: number;
  } | null>(null);

  const soundEnabled = profile?.soundEnabled ?? true;
  const heartsEnabled = profile?.heartsEnabled ?? true;

  // --- Yuklash ---
  useEffect(() => {
    let cancelled = false;
    setPhase("loading");
    void (async () => {
      const store = getStore();
      const [lessons, qs] = await Promise.all([
        store.getLessons(),
        store.getQuestions(lessonId),
      ]);
      if (cancelled) return;
      const l = lessons.find((x) => x.id === lessonId);
      if (!l || qs.length === 0) {
        setPhase("playing");
        return;
      }
      setLesson(l);
      setQuestions(qs);
      setPhase("playing");
    })();
    return () => {
      cancelled = true;
    };
  }, [lessonId]);

  const question = questions[index] ?? null;
  const total = questions.length;
  const progressPct = total > 0 ? ((index + (checked ? 1 : 0)) / total) * 100 : 0;

  // --- Tekshirish ---
  const handleCheck = useCallback(() => {
    if (!question || !isAnswered(question, answer) || checked) return;
    const ok = isCorrect(question, answer);
    setChecked(true);
    setCorrect(ok);
    if (ok) {
      setCorrectCount((c) => c + 1);
      playSound("correct", soundEnabled);
      void getStore().clearMistake(question.id);
    } else {
      playSound("wrong", soundEnabled);
      void getStore().recordMistake(question.id, lessonId);
      if (heartsEnabled) {
        setHearts((h) => {
          const next = h - 1;
          if (next <= 0) {
            setTimeout(() => setPhase("out_of_hearts"), 650);
          }
          return Math.max(0, next);
        });
      }
    }
  }, [question, answer, checked, soundEnabled, heartsEnabled, lessonId]);

  // --- Yakunlash ---
  const finish = useCallback(
    async (finalCorrect: number, finalTotal: number) => {
      setPhase("saving");
      playSound("complete", soundEnabled);
      try {
        const res = await getStore().completeLesson({
          lessonId,
          correct: finalCorrect,
          total: finalTotal,
        });
        await refresh();
        setResult({
          xp: res.xpAwarded,
          bonus: res.bonusXp,
          accuracy: percent(finalCorrect, finalTotal),
          correct: finalCorrect,
          total: finalTotal,
          alreadyCompleted: res.alreadyCompleted,
          achievements: res.newAchievements.map((a) => a.title),
          streak: res.currentStreak,
        });
      } catch {
        setResult({
          xp: 0,
          bonus: 0,
          accuracy: percent(finalCorrect, finalTotal),
          correct: finalCorrect,
          total: finalTotal,
          alreadyCompleted: false,
          achievements: [],
          streak: profile?.currentStreak ?? 0,
        });
      }
      setPhase("finished");
    },
    [lessonId, refresh, soundEnabled, profile],
  );

  // --- Keyingi savol ---
  const handleContinue = useCallback(() => {
    if (!question) return;
    if (index + 1 >= total) {
      void finish(correctCount, total);
      return;
    }
    setIndex((i) => i + 1);
    setAnswer(null);
    setChecked(false);
    setCorrect(null);
  }, [question, index, total, correctCount, finish]);

  // --- Yuraklar tugagach ---
  const retryLesson = () => {
    setIndex(0);
    setAnswer(null);
    setChecked(false);
    setCorrect(null);
    setCorrectCount(0);
    setHearts(MAX_HEARTS);
    setPhase("playing");
  };

  const nextLessonId = useMemo(() => {
    const i = lessonOrder.indexOf(lessonId);
    return i >= 0 && i + 1 < lessonOrder.length ? lessonOrder[i + 1] : null;
  }, [lessonId]);

  // --- Yuklanish ---
  if (phase === "loading" || (!lesson && phase === "playing")) {
    return (
      <div className="mx-auto max-w-2xl space-y-5">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!lesson || total === 0) {
    return (
      <div className="mx-auto max-w-2xl py-16 text-center">
        <h1 className="text-xl font-extrabold text-ink">Dars topilmadi</h1>
        <p className="mt-2 text-sm text-ink-soft">
          Bu dars hozircha mavjud emas yoki o‘chirilgan.
        </p>
        <Link href="/learn" className="mt-5 inline-block">
          <Button>Yo‘lga qaytish</Button>
        </Link>
      </div>
    );
  }

  // --- Muvaffaqiyat ekrani ---
  if (phase === "finished" && result) {
    const perfect = result.accuracy === 100;
    return (
      <div className="mx-auto max-w-2xl py-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", bounce: 0.4, duration: 0.6 }}
          className="overflow-hidden rounded-3xl bg-white text-center shadow-xl ring-1 ring-line"
        >
          <div className="bg-gradient-to-b from-primary to-[#4ab802] px-6 py-8 text-white">
            <motion.span
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.15, type: "spring", bounce: 0.7 }}
              className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white text-primary shadow-lg"
            >
              <Trophy size={40} />
            </motion.span>
            <h1 className="mt-4 text-2xl font-extrabold">Dars tugadi!</h1>
            <p className="mt-1 text-sm font-semibold opacity-90">
              {perfect ? "Mukammal natija! 🎉" : "Yaxshi harakat — davom eting!"}
            </p>
            {result.alreadyCompleted && (
              <p className="mt-2 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-bold">
                Bu dars allaqachon tugallangan — takrorlash XP bermaydi
              </p>
            )}
          </div>

          <div className="grid grid-cols-3 gap-3 p-5">
            <StatBox
              label="Aniqlik"
              value={`${result.accuracy}%`}
              icon={<Target size={15} className="text-accent-blue" />}
              tone="bg-accent-blue-soft"
            />
            <StatBox
              label="To‘g‘ri"
              value={`${result.correct}/${result.total}`}
              icon={<CheckCircle2 size={15} className="text-primary" />}
              tone="bg-primary-soft"
            />
            <StatBox
              label="XP"
              value={`+${result.xp + result.bonus}`}
              icon={<Zap size={15} className="text-accent-yellow" />}
              tone="bg-accent-yellow-soft"
            />
          </div>

          {result.achievements.length > 0 && (
            <div className="mx-5 mb-5 rounded-2xl bg-accent-yellow-soft p-4">
              <p className="flex items-center justify-center gap-2 text-sm font-extrabold text-[#8a6d00]">
                <Star size={16} className="fill-accent-yellow text-accent-yellow" />
                Yangi yutuq ochildi!
              </p>
              <p className="mt-1 text-sm font-bold text-ink">
                {result.achievements.join(", ")}
              </p>
            </div>
          )}

          {perfect && !result.alreadyCompleted && (
            <p className="px-5 pb-1 text-sm font-bold text-primary">
              Mukammal dars uchun +5 XP bonus!
            </p>
          )}

          <div className="space-y-3 p-5 pt-3">
            {nextLessonId ? (
              <Button
                size="lg"
                className="w-full"
                onClick={() => router.push(`/lesson/${nextLessonId}`)}
              >
                Keyingi darsga o‘tish <ArrowRight size={17} />
              </Button>
            ) : (
              <Link href="/learn" className="block">
                <Button size="lg" className="w-full">
                  O‘rganish yo‘li <ArrowRight size={17} />
                </Button>
              </Link>
            )}
            <Link href="/dashboard" className="block">
              <Button variant="secondary" className="w-full">
                Bosh sahifaga
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // --- Yuraklar tugadi ---
  if (phase === "out_of_hearts") {
    return (
      <div className="mx-auto max-w-2xl py-10 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-error-soft"
        >
          <Heart size={40} className="fill-error text-error" />
        </motion.div>
        <h1 className="mt-5 text-2xl font-extrabold text-ink">Yuraklar tugadi!</h1>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-ink-soft">
          Xatolaringizni tahlil qiling va qayta urinib ko‘ring — har bir xato
          uchun tushuntirish beriladi.
        </p>
        <div className="mx-auto mt-6 flex max-w-xs flex-col gap-3">
          <Button size="lg" onClick={retryLesson}>
            <RotateCcw size={16} /> Qaytadan boshlash
          </Button>
          <Link href="/review" className="block">
            <Button variant="secondary" className="w-full">
              Xatolarni takrorlash
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // --- Asosiy dars ---
  return (
    <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-2xl flex-col">
      {/* Header */}
      <div className="sticky top-0 z-20 -mx-4 bg-surface/95 px-4 pb-3 pt-2 backdrop-blur sm:-mx-6 sm:px-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setExitOpen(true)}
            aria-label="Darsdan chiqish"
            className="rounded-full p-1.5 text-ink-faint transition-colors hover:bg-surface-2 hover:text-ink"
          >
            <X size={22} />
          </button>
          <Progress value={progressPct} height="h-3" ariaLabel="Dars progressi" striped={checked} />
          {heartsEnabled ? (
            <span
              className="flex min-w-14 items-center justify-end gap-1 text-sm font-extrabold text-error"
              aria-label={`${hearts} yurak`}
            >
              <Heart size={17} className={cn("fill-error", hearts <= 2 && "animate-flame")} />
              {hearts}
            </span>
          ) : (
            <span className="min-w-14" />
          )}
        </div>
        <div className="mt-1.5 flex items-center justify-between text-xs font-bold text-ink-soft">
          <span>
            {index + 1}/{total} savol
          </span>
          <span className="flex items-center gap-1 text-[#8a6d00]">
            <Zap size={12} /> +{lesson.xpReward} XP
          </span>
        </div>
      </div>

      {/* Savol */}
      <div className="flex-1 pb-40">
        <AnimatePresence mode="wait">
          <motion.div
            key={question?.id ?? "q"}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {question && (
              <>
                <div className="mb-4 flex items-center gap-2">
                  <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-extrabold text-primary-ink">
                    {QUESTION_TYPE_LABELS[question.type]}
                  </span>
                  <h1 className="text-base font-extrabold text-ink">{lesson.title}</h1>
                </div>
                <QuestionView
                  question={question}
                  answer={answer}
                  onChange={setAnswer}
                  checked={checked}
                  soundEnabled={soundEnabled}
                />
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pastki panel */}
      <div
        className={cn(
          "fixed inset-x-0 bottom-0 z-30 border-t-2 transition-colors lg:left-64",
          !checked && "border-line bg-white",
          checked && correct && "border-primary bg-primary-soft",
          checked && correct === false && "border-error bg-error-soft",
        )}
      >
        <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6">
          {!checked ? (
            <Button
              id="lesson-check-btn"
              size="lg"
              className="w-full"
              disabled={!question || !isAnswered(question, answer)}
              onClick={handleCheck}
            >
              Tekshirish
            </Button>
          ) : (
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="min-w-0 flex-1">
                <p
                  className={cn(
                    "flex items-center gap-2 text-base font-extrabold",
                    correct ? "text-primary-ink" : "text-[#c62828]",
                  )}
                >
                  {correct ? (
                    <>
                      <CheckCircle2 size={20} /> To‘g‘ri!
                    </>
                  ) : (
                    <>
                      <XCircle size={20} /> Noto‘g‘ri
                    </>
                  )}
                </p>
                {!correct && (
                  <p className="mt-0.5 text-sm font-bold text-[#c62828]">
                    To‘g‘ri javob: {correctAnswerText(question!)}
                  </p>
                )}
                <p className="mt-1 text-sm leading-snug text-ink-soft">
                  {question?.explanationUz}
                </p>
              </div>
              <Button
                size="lg"
                variant={correct ? "primary" : "danger"}
                className="shrink-0 sm:w-44"
                onClick={handleContinue}
                autoFocus
              >
                {index + 1 >= total ? "Yakunlash" : "Davom etish"}
                <ArrowRight size={16} />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Chiqish tasdig'i */}
      <Modal open={exitOpen} onClose={() => setExitOpen(false)} title="Darsdan chiqishmi?">
        <p className="text-sm leading-relaxed text-ink-soft">
          Hozirgi progress saqlanmaydi va dars boshidan boshlanadi.
        </p>
        <div className="mt-5 flex gap-3">
          <Button variant="secondary" className="flex-1" onClick={() => setExitOpen(false)}>
            Davom etish
          </Button>
          <Button
            variant="danger"
            className="flex-1"
            onClick={() => router.push("/learn")}
          >
            Chiqish
          </Button>
        </div>
      </Modal>

      {demoMode && phase === "saving" && (
        <span className="sr-only">Saqlanmoqda…</span>
      )}
      {phase === "saving" && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-white/70">
          <Loader2 size={30} className="animate-spin text-primary" />
        </div>
      )}
    </div>
  );
}

function StatBox({
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
    <div className="rounded-2xl border border-line p-3">
      <span className={`mx-auto mb-1.5 flex h-8 w-8 items-center justify-center rounded-lg ${tone}`}>
        {icon}
      </span>
      <p className="text-lg font-extrabold text-ink">{value}</p>
      <p className="text-[11px] font-bold text-ink-soft">{label}</p>
    </div>
  );
}
