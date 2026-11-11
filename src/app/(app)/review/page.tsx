"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  RotateCcw,
  Volume2,
  CheckCircle2,
  XCircle,
  Zap,
  Brain,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Trophy,
  BookOpen,
  Headphones,
  Keyboard,
  ListChecks,
  Languages,
  Shuffle,
  PenLine,
  Eye,
} from "lucide-react";
import { useStoreData } from "@/hooks/use-store-data";
import { useSpeech } from "@/hooks/use-speech";
import { useAuth } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/toast";
import { QuestionView } from "@/components/lesson/question-view";
import {
  isAnswered,
  isCorrect,
  correctAnswerText,
  QUESTION_TYPE_LABELS,
  type AnswerState,
} from "@/components/lesson/engine";
import { getStore } from "@/lib/store";
import { playSound } from "@/lib/sound";
import { cn } from "@/lib/utils";
import type { AppStore } from "@/lib/store";
import type { MistakeReviewItem, ReviewWordItem } from "@/lib/store/types";
import type { Question, VocabularyItem } from "@/types";

interface ReviewData {
  dueWords: ReviewWordItem[];
  mistakes: MistakeReviewItem[];
}

type Tab = "words" | "mistakes";

type ReviewMode =
  | "flashcards"
  | "ru_uz"
  | "uz_ru"
  | "listening"
  | "spelling"
  | "sentence"
  | "multiple_choice"
  | "mixed";

const MODES: { id: ReviewMode; label: string; hint: string; icon: React.ReactNode }[] = [
  { id: "flashcards", label: "Kartochka", hint: "Ko‘rib, o‘zingiz baholang", icon: <BookOpen size={15} /> },
  { id: "ru_uz", label: "RU → UZ", hint: "Tarjimani tanlang", icon: <Languages size={15} /> },
  { id: "uz_ru", label: "UZ → RU", hint: "Ruscha so‘zni tanlang", icon: <Languages size={15} /> },
  { id: "listening", label: "Tinglash", hint: "Eshitib tanlang", icon: <Headphones size={15} /> },
  { id: "spelling", label: "Imlo", hint: "Ruscha yozing", icon: <Keyboard size={15} /> },
  { id: "sentence", label: "Gap to‘ldirish", hint: "Bo‘sh joyni to‘ldiring", icon: <PenLine size={15} /> },
  { id: "multiple_choice", label: "Test", hint: "Aralash yo‘nalish", icon: <ListChecks size={15} /> },
  { id: "mixed", label: "Aralash", hint: "Har xil mashqlar", icon: <Shuffle size={15} /> },
];

const MIX_POOL: ReviewMode[] = [
  "ru_uz",
  "uz_ru",
  "listening",
  "spelling",
  "sentence",
  "multiple_choice",
];

function normalizeText(s: string): string {
  return s
    .toLowerCase()
    .replace(/ё/g, "е")
    .replace(/[.,!?;:«»"()]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export default function ReviewPage() {
  const { profile } = useAuth();
  const { data, loading, reload } = useStoreData<ReviewData>(
    async (store: AppStore) => store.getReviewQueue(),
    [],
  );

  const [tab, setTab] = useState<Tab>("words");

  const dueCount = data?.dueWords.length ?? 0;
  const mistakeCount = data?.mistakes.length ?? 0;

  if (loading || !data) {
    return (
      <div className="space-y-5">
        <Skeleton className="h-9 w-56" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-72 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">Takrorlash</h1>
          <p className="mt-1 text-sm text-ink-soft">
            SM-2 algoritmi asosida so‘zlarni 8 xil usulda mustahkamlang.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge tone="blue">
            <Brain size={13} /> {dueCount} so‘z
          </Badge>
          <Badge tone="red">
            <AlertTriangle size={13} /> {mistakeCount} xato
          </Badge>
        </div>
      </div>

      {/* Tablar */}
      <div className="flex gap-2" role="tablist" aria-label="Takrorlash turi">
        <TabButton
          active={tab === "words"}
          onClick={() => setTab("words")}
          label={`So‘zlar (${dueCount})`}
          icon={<Brain size={15} />}
        />
        <TabButton
          active={tab === "mistakes"}
          onClick={() => setTab("mistakes")}
          label={`Xatolar (${mistakeCount})`}
          icon={<AlertTriangle size={15} />}
        />
      </div>

      {tab === "words" ? (
        <WordReview
          items={data.dueWords}
          soundEnabled={profile?.soundEnabled ?? true}
          onDone={() => reload()}
        />
      ) : (
        <MistakeReview
          items={data.mistakes}
          soundEnabled={profile?.soundEnabled ?? true}
          onDone={() => reload()}
        />
      )}
    </div>
  );
}

function TabButton({
  active,
  onClick,
  label,
  icon,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 rounded-xl border-2 px-4 py-2.5 text-sm font-bold transition-colors",
        active
          ? "border-primary bg-primary-soft text-primary-ink"
          : "border-line bg-white text-ink-soft hover:border-ink-faint",
      )}
    >
      {icon}
      {label}
    </button>
  );
}

// ---------------------------------------------------------------------------
// So‘zlar bo‘yicha takrorlash — 8 rejim
// ---------------------------------------------------------------------------
function WordReview({
  items,
  soundEnabled,
  onDone,
}: {
  items: ReviewWordItem[];
  soundEnabled: boolean;
  onDone: () => void;
}) {
  const { toast } = useToast();
  const { speak, ttsSupported } = useSpeech();
  const [mode, setMode] = useState<ReviewMode>("flashcards");
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [choice, setChoice] = useState<string | null>(null);
  const [typed, setTyped] = useState("");
  const [checked, setChecked] = useState(false);
  const [correct, setCorrect] = useState<boolean | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [xp, setXp] = useState(0);
  const [lastState, setLastState] = useState<ReviewWordItem["state"] | null>(null);
  const [busy, setBusy] = useState(false);
  const [finished, setFinished] = useState(false);

  const { data: extra } = useStoreData<VocabularyItem[]>(
    async (store: AppStore) => {
      const res = await store.searchVocabulary({
        query: "",
        pageSize: 40,
        sort: "frequency",
      });
      return res.items;
    },
    [],
  );

  const pool = useMemo(() => {
    const byId = new Map<string, VocabularyItem>();
    for (const it of items) byId.set(it.item.id, it.item);
    for (const it of extra ?? []) byId.set(it.id, it);
    return Array.from(byId.values());
  }, [items, extra]);

  const current = items[index] ?? null;
  const cardMode: ReviewMode = useMemo(() => {
    if (mode !== "mixed") return mode;
    return MIX_POOL[index % MIX_POOL.length];
  }, [mode, index]);

  const direction: "ru_uz" | "uz_ru" =
    cardMode === "uz_ru"
      ? "uz_ru"
      : cardMode === "multiple_choice"
        ? index % 2 === 0
          ? "ru_uz"
          : "uz_ru"
        : "ru_uz";

  const questionTextValue = useMemo(() => {
    if (!current) return "";
    switch (cardMode) {
      case "uz_ru":
        return current.item.uzbekTranslation;
      case "listening":
        return "🎧 Tinglang va tarjimani tanlang";
      case "spelling":
        return current.item.uzbekTranslation;
      case "sentence":
        return "Gapdagi bo‘sh joyni to‘ldiring";
      default:
        return current.item.russianWord;
    }
  }, [current, cardMode]);

  const sentence = useMemo(() => {
    if (!current || cardMode !== "sentence") return null;
    const text = current.item.exampleRu;
    if (!text) return null;
    const re = new RegExp(escapeRegExp(current.item.russianWord), "i");
    if (!re.test(text)) return null;
    return text.replace(re, "____");
  }, [current, cardMode]);

  const choices = useMemo(() => {
    if (!current) return [] as string[];
    if (!["ru_uz", "uz_ru", "listening", "sentence", "multiple_choice"].includes(cardMode)) {
      return [];
    }
    const useRu = cardMode === "sentence" || direction === "uz_ru";
    const correctValue = useRu
      ? current.item.russianWord
      : current.item.uzbekTranslation;
    const values = new Set<string>([correctValue]);
    for (const p of shuffle(pool)) {
      if (values.size >= 4) break;
      const v = useRu ? p.russianWord : p.uzbekTranslation;
      if (v && v !== correctValue) values.add(v);
    }
    return shuffle(Array.from(values));
  }, [current, cardMode, direction, pool]);

  const expected = useMemo(() => {
    if (!current) return "";
    if (cardMode === "sentence") return current.item.russianWord;
    if (cardMode === "spelling") return current.item.russianWord;
    if (direction === "uz_ru") return current.item.russianWord;
    return current.item.uzbekTranslation;
  }, [current, cardMode, direction]);

  // Tinglash rejimida avtomatik talaffuz
  useEffect(() => {
    if (!current || finished) return;
    if (cardMode === "listening" && ttsSupported) speak(current.item.russianWord);
  }, [cardMode, current, finished, speak, ttsSupported]);

  const resetCardState = useCallback(() => {
    setRevealed(false);
    setChoice(null);
    setTyped("");
    setChecked(false);
    setCorrect(null);
    setLastState(null);
  }, []);

  const chooseMode = useCallback(
    (next: ReviewMode) => {
      setMode(next);
      setIndex(0);
      setCorrectCount(0);
      setXp(0);
      setFinished(false);
      resetCardState();
    },
    [resetCardState],
  );

  const grade = useCallback(
    async (ok: boolean) => {
      if (!current || busy) return;
      setBusy(true);
      setChecked(true);
      setCorrect(ok);
      try {
        const res = await getStore().reviewWord(current.item.id, ok);
        setXp((x) => x + res.xpAwarded);
        setLastState(res.state);
        if (ok) setCorrectCount((c) => c + 1);
        playSound(ok ? "correct" : "wrong", soundEnabled);
      } catch {
        toast("Takrorlashni saqlashda xatolik", "error");
      } finally {
        setBusy(false);
      }
    },
    [current, busy, soundEnabled, toast],
  );

  const advance = useCallback(() => {
    if (index + 1 >= items.length) {
      setFinished(true);
    } else {
      setIndex((i) => i + 1);
      resetCardState();
    }
  }, [index, items.length, resetCardState]);

  const submit = useCallback(() => {
    if (!current || checked) return;
    const ok =
      cardMode === "spelling"
        ? normalizeText(typed) === normalizeText(expected)
        : normalizeText(choice ?? "") === normalizeText(expected);
    grade(ok);
  }, [current, checked, cardMode, typed, expected, choice, grade]);

  const restart = useCallback(() => {
    setIndex(0);
    setCorrectCount(0);
    setXp(0);
    setFinished(false);
    resetCardState();
    onDone();
  }, [onDone, resetCardState]);

  if (items.length === 0) {
    return (
      <Card className="py-12 text-center">
        <span className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-primary-soft">
          <Trophy size={26} className="text-primary" />
        </span>
        <h2 className="text-lg font-extrabold text-ink">Navbatda so‘z yo‘q!</h2>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-ink-soft">
          Hozircha takrorlash kerak bo‘lgan so‘zlar yo‘q. Lug‘atdan yangi so‘zlarni
          o‘rganildi deb belgilang — ular SM-2 navbatiga tushadi.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          <Link href="/vocabulary">
            <Button>
              Lug‘atga o‘tish <ArrowRight size={16} />
            </Button>
          </Link>
          <Link href="/learn">
            <Button variant="secondary">Darslarni davom ettirish</Button>
          </Link>
        </div>
      </Card>
    );
  }

  if (finished) {
    const accuracy = Math.round((correctCount / items.length) * 100);
    return (
      <Card className="mx-auto max-w-xl py-10 text-center">
        <span className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-accent-yellow-soft">
          <CheckCircle2 size={28} className="text-[#8a6d00]" />
        </span>
        <h2 className="text-lg font-extrabold text-ink">Takrorlash tugadi! 🎉</h2>
        <p className="mt-2 text-sm text-ink-soft">
          {correctCount}/{items.length} to‘g‘ri · {accuracy}% aniqlik
          {xp > 0 && ` · +${xp} XP`}
        </p>
        <p className="mx-auto mt-2 max-w-sm text-xs text-ink-faint">
          SM-2 jadvali yangilandi: keyingi takrorlash intervalli ravishda o‘sadi.
        </p>
        <div className="mx-auto mt-5 flex max-w-xs flex-col gap-3">
          <Button className="w-full" onClick={restart}>
            <RotateCcw size={15} /> Yangi sessiya
          </Button>
          <Link href="/vocabulary" className="block">
            <Button variant="secondary" className="w-full">
              Lug‘atga o‘tish
            </Button>
          </Link>
        </div>
      </Card>
    );
  }

  const v = current!;

  return (
    <div className="mx-auto max-w-2xl space-y-3">
      {/* Rejim tanlash */}
      <Card className="p-3">
        <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4">
          {MODES.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => chooseMode(m.id)}
              className={cn(
                "flex flex-col items-start gap-0.5 rounded-xl border px-2.5 py-2 text-left transition-colors",
                mode === m.id
                  ? "border-primary bg-primary-soft text-primary-ink"
                  : "border-line bg-white text-ink-soft hover:bg-surface",
              )}
              title={m.hint}
              aria-pressed={mode === m.id}
            >
              <span className="flex items-center gap-1.5 text-xs font-extrabold">
                {m.icon} {m.label}
              </span>
              <span className="text-[10px] leading-tight opacity-80">{m.hint}</span>
            </button>
          ))}
        </div>
      </Card>

      <Card className="space-y-5 p-6">
        <div className="flex items-center gap-3">
          <Progress
            value={(index / items.length) * 100}
            height="h-2.5"
            ariaLabel="Takrorlash progressi"
            striped={checked}
          />
          <span className="shrink-0 text-xs font-extrabold text-ink-soft">
            {index + 1}/{items.length}
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs font-bold uppercase tracking-wide text-ink-faint">
            {v.item.topic} · {v.item.partOfSpeech} · {v.item.level}
          </p>
          <Badge tone="blue">
            {MODES.find((m) => m.id === cardMode)?.label ?? "Kartochka"}
          </Badge>
        </div>

        {/* Savol */}
        <div className="space-y-3 text-center">
          {cardMode === "listening" ? (
            <button
              type="button"
              onClick={() => speak(v.item.russianWord)}
              disabled={!ttsSupported}
              className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-accent-blue-soft text-accent-blue transition-transform hover:scale-105 disabled:opacity-40"
              aria-label="So‘zni qayta eshitish"
            >
              <Volume2 size={34} />
            </button>
          ) : cardMode === "sentence" ? (
            <div className="space-y-2">
              <p className="text-lg font-bold leading-relaxed text-ink">
                {sentence ?? `«${v.item.uzbekTranslation}» so‘zini tanlang`}
              </p>
              <p className="text-xs text-ink-faint">{v.item.transliteration}</p>
            </div>
          ) : cardMode === "spelling" ? (
            <div className="space-y-2">
              <p className="text-2xl font-extrabold text-primary-ink">
                {v.item.uzbekTranslation}
              </p>
              <p className="text-sm font-semibold text-ink-faint">
                {v.item.transliteration} · {v.item.russianWord.length} harf
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2">
                <h2 className="text-3xl font-extrabold text-ink">
                  {questionTextValue}
                </h2>
                <button
                  type="button"
                  onClick={() =>
                    speak(
                      cardMode === "uz_ru"
                        ? v.item.russianWord
                        : v.item.russianWord,
                    )
                  }
                  disabled={!ttsSupported}
                  aria-label="Talaffuzni eshitish"
                  className="rounded-full p-2 text-accent-blue transition-colors hover:bg-accent-blue-soft disabled:opacity-40"
                >
                  <Volume2 size={20} />
                </button>
              </div>
              <p className="text-sm font-semibold text-ink-faint">
                {cardMode === "uz_ru" ? "Ruscha tarjimasini tanlang" : v.item.transliteration}
              </p>
            </div>
          )}
        </div>

        {/* Javob maydoni */}
        {cardMode === "flashcards" ? (
          revealed ? (
            <div className="animate-fade-up space-y-3 rounded-2xl bg-primary-soft p-4 text-center">
              <p className="text-xl font-extrabold text-primary-ink">
                {v.item.uzbekTranslation}
              </p>
              <p className="text-sm leading-relaxed text-ink-soft">{v.item.exampleRu}</p>
              <p className="text-xs text-ink-faint">{v.item.exampleUz}</p>
            </div>
          ) : (
            <p className="text-center text-sm text-ink-soft">
              Avval o‘z fikringizni ayting, keyin javobni ko‘ring.
            </p>
          )
        ) : cardMode === "spelling" ? (
          <input
            value={typed}
            onChange={(e) => setTyped(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !checked) submit();
            }}
            disabled={checked}
            autoFocus
            placeholder="Ruscha so‘zni yozing…"
            className="w-full rounded-xl border-2 border-line bg-white px-4 py-3 text-center text-lg font-bold text-ink outline-none focus:border-primary disabled:bg-surface"
            aria-label="Javobni yozing"
          />
        ) : (
          <div className="grid gap-2 sm:grid-cols-2">
            {choices.map((c) => {
              const isPicked = choice === c;
              const isRight = checked && normalizeText(c) === normalizeText(expected);
              const isWrong = checked && isPicked && !isRight;
              return (
                <button
                  key={c}
                  type="button"
                  disabled={checked}
                  onClick={() => setChoice(c)}
                  className={cn(
                    "rounded-xl border-2 px-3 py-3 text-sm font-bold transition-colors",
                    isRight && "border-primary bg-primary-soft text-primary-ink",
                    isWrong && "border-error bg-error-soft text-[#c62828]",
                    !checked && isPicked && "border-primary bg-primary-soft text-primary-ink",
                    !checked && !isPicked && "border-line bg-white text-ink hover:border-ink-faint",
                    checked && !isRight && !isWrong && "border-line bg-white text-ink-faint",
                  )}
                >
                  {c}
                </button>
              );
            })}
          </div>
        )}

        {/* Harakatlar */}
        {cardMode === "flashcards" && !revealed ? (
          <Button size="lg" className="w-full" onClick={() => setRevealed(true)}>
            <Eye size={17} /> Javobni ko‘rsatish
          </Button>
        ) : cardMode === "flashcards" && !checked ? (
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              variant="danger"
              className="flex-1"
              disabled={busy}
              onClick={() => grade(false)}
            >
              <XCircle size={17} /> Yodlamadim
            </Button>
            <Button
              size="lg"
              className="flex-1"
              disabled={busy}
              onClick={() => grade(true)}
            >
              <CheckCircle2 size={17} /> Bilaman
            </Button>
          </div>
        ) : !checked ? (
          <Button
            size="lg"
            className="w-full"
            disabled={
              busy ||
              (cardMode === "spelling" ? typed.trim().length === 0 : !choice)
            }
            onClick={submit}
          >
            Tekshirish
          </Button>
        ) : (
          <div className="space-y-3">
            <div
              className={cn(
                "rounded-2xl border-l-4 p-4",
                correct ? "border-primary bg-primary-soft" : "border-error bg-error-soft",
              )}
            >
              <p
                className={cn(
                  "flex items-center gap-2 text-base font-extrabold",
                  correct ? "text-primary-ink" : "text-[#c62828]",
                )}
              >
                {correct ? (
                  <>
                    <CheckCircle2 size={19} /> To‘g‘ri!
                  </>
                ) : (
                  <>
                    <XCircle size={19} /> Noto‘g‘ri
                  </>
                )}
              </p>
              {!correct && (
                <p className="mt-1 text-sm font-bold text-[#c62828]">
                  To‘g‘ri javob: {expected}
                </p>
              )}
              <p className="mt-1 text-sm text-ink-soft">
                {v.item.russianWord} — {v.item.uzbekTranslation}
              </p>
              {v.item.exampleRu && (
                <p className="mt-1 text-xs text-ink-faint">
                  {v.item.exampleRu} · {v.item.exampleUz}
                </p>
              )}
            </div>
            <Button size="lg" className="w-full" onClick={advance} autoFocus>
              {index + 1 >= items.length ? "Yakunlash" : "Keyingi so‘z"}
              <ArrowRight size={16} />
            </Button>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-bold text-ink-soft">
          <span className="flex items-center gap-1">
            <Zap size={13} className="text-accent-yellow" /> Sessiyada +{xp} XP
          </span>
          <span>
            SM-2: {(lastState ?? v.state).repetitions ?? 0} takror · interval{" "}
            {(lastState ?? v.state).intervalDays ?? 0} kun · ease{" "}
            {((lastState ?? v.state).ease ?? 2.5).toFixed(2)}
          </span>
        </div>
      </Card>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Xatolar bo‘yicha takrorlash (savollar qayta ishlashi)
// ---------------------------------------------------------------------------
function MistakeReview({
  items,
  soundEnabled,
  onDone,
}: {
  items: MistakeReviewItem[];
  soundEnabled: boolean;
  onDone: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState<AnswerState | null>(null);
  const [checked, setChecked] = useState(false);
  const [correct, setCorrect] = useState<boolean | null>(null);
  const [fixed, setFixed] = useState(0);
  const [busy, setBusy] = useState(false);

  const current = items[index] ?? null;
  const question: Question | null = current?.question ?? null;

  const handleCheck = useCallback(async () => {
    if (!question || !current || busy || checked) return;
    if (!isAnswered(question, answer)) return;
    setBusy(true);
    const ok = isCorrect(question, answer);
    setChecked(true);
    setCorrect(ok);
    playSound(ok ? "correct" : "wrong", soundEnabled);
    try {
      if (ok) {
        await getStore().clearMistake(question.id);
        setFixed((f) => f + 1);
      } else {
        await getStore().recordMistake(question.id, current.question.lessonId);
      }
    } catch {
      /* demo rejimida xato e'tiborsiz qoladi */
    } finally {
      setBusy(false);
    }
  }, [question, current, answer, checked, busy, soundEnabled]);

  const handleContinue = useCallback(() => {
    if (index + 1 >= items.length) {
      onDone();
      setIndex(0);
      setAnswer(null);
      setChecked(false);
      setCorrect(null);
      return;
    }
    setIndex((i) => i + 1);
    setAnswer(null);
    setChecked(false);
    setCorrect(null);
  }, [index, items.length, onDone]);

  if (items.length === 0) {
    return (
      <Card className="py-12 text-center">
        <span className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-primary-soft">
          <CheckCircle2 size={26} className="text-primary" />
        </span>
        <h2 className="text-lg font-extrabold text-ink">Xatolar yo‘q!</h2>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-ink-soft">
          Ajoyib! Hozirgacha yig‘ilgan xatolar yo‘q. Darslarni davom ettiring —
          xato qilsangiz, shu yerda paydo bo‘ladi.
        </p>
        <Link href="/learn" className="mt-5 inline-block">
          <Button>
            Darslarni davom ettirish <ArrowRight size={16} />
          </Button>
        </Link>
      </Card>
    );
  }

  if (!question) {
    return (
      <Card className="py-12 text-center">
        <p className="text-sm text-ink-soft">Savol topilmadi.</p>
        <Link href="/learn" className="mt-4 inline-block">
          <Button variant="secondary">O‘rganish yo‘li</Button>
        </Link>
      </Card>
    );
  }

  return (
    <Card className="mx-auto max-w-2xl space-y-5 p-6">
      <div className="flex items-center gap-3">
        <Progress
          value={(index / items.length) * 100}
          height="h-2.5"
          ariaLabel="Takrorlash progressi"
          striped={checked}
        />
        <span className="shrink-0 text-xs font-extrabold text-ink-soft">
          {index + 1}/{items.length}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Badge tone="red">
          <AlertTriangle size={12} /> {current!.count} marta xato
        </Badge>
        <Badge tone="blue">{QUESTION_TYPE_LABELS[question.type]}</Badge>
        <Badge tone="green">
          {fixed}/{items.length} tuzatildi
        </Badge>
      </div>

      <QuestionView
        question={question}
        answer={answer}
        onChange={setAnswer}
        checked={checked}
        soundEnabled={soundEnabled}
      />

      {!checked ? (
        <Button
          size="lg"
          className="w-full"
          disabled={!isAnswered(question, answer) || busy}
          onClick={handleCheck}
        >
          Tekshirish
        </Button>
      ) : (
        <div
          className={cn(
            "space-y-3 rounded-2xl border-l-4 p-4",
            correct ? "border-primary bg-primary-soft" : "border-error bg-error-soft",
          )}
        >
          <p
            className={cn(
              "flex items-center gap-2 text-base font-extrabold",
              correct ? "text-primary-ink" : "text-[#c62828]",
            )}
          >
            {correct ? (
              <>
                <CheckCircle2 size={19} /> Endi to‘g‘ri! Xato tuzatildi.
              </>
            ) : (
              <>
                <XCircle size={19} /> Hali noto‘g‘ri
              </>
            )}
          </p>
          {!correct && (
            <p className="text-sm font-bold text-[#c62828]">
              To‘g‘ri javob: {correctAnswerText(question)}
            </p>
          )}
          <p className="text-sm leading-relaxed text-ink-soft">
            {question.explanationUz}
          </p>
          <Button size="lg" className="w-full" onClick={handleContinue} autoFocus>
            {index + 1 >= items.length ? "Yakunlash" : "Keyingi savol"}
            <ArrowRight size={16} />
          </Button>
        </div>
      )}

      <div className="flex items-center justify-between">
        <Link
          href="/learn"
          className="flex items-center gap-1 text-xs font-bold text-ink-soft hover:text-ink"
        >
          <ArrowLeft size={13} /> O‘rganish
        </Link>
        <span className="flex items-center gap-1 text-xs font-bold text-ink-soft">
          <RotateCcw size={13} /> To‘g‘ri javob berilganda xato o‘chadi
        </span>
      </div>
    </Card>
  );
}
