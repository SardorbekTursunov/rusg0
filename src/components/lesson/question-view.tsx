"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Volume2, Loader2, Check, X } from "lucide-react";
import type { Question } from "@/types";
import type { AnswerState } from "./engine";
import { useSpeech } from "@/hooks/use-speech";
import { playSound } from "@/lib/sound";
import { cn } from "@/lib/utils";

interface QuestionViewProps {
  question: Question;
  answer: AnswerState | null;
  onChange: (next: AnswerState) => void;
  checked: boolean;
  soundEnabled: boolean;
}

/** Deterministik aralashtirish (har bir savol uchun barqaror) */
function seededShuffle<T>(items: T[], seed: number): T[] {
  const arr = [...items];
  let s = seed;
  const rand = () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function seedFromId(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return h || 42;
}

export function QuestionView({
  question,
  answer,
  onChange,
  checked,
  soundEnabled,
}: QuestionViewProps) {
  const { speak, speaking, ttsSupported } = useSpeech();
  const spokenRef = useRef(false);

  // Juftlash (word_matching) uchun holatlar — hook'lar doim yuqorida turadi
  const [selectedRu, setSelectedRu] = useState<number | null>(null);
  const [flash, setFlash] = useState<number | null>(null);

  // Tinglash: birinchi marta avtomatik o'qish
  useEffect(() => {
    if (question.type !== "listening") return;
    if (!soundEnabled || !ttsSupported || spokenRef.current) return;
    spokenRef.current = true;
    const text = question.payload.speakText;
    const t = setTimeout(() => speak(text), 350);
    return () => clearTimeout(t);
  }, [question, soundEnabled, ttsSupported, speak]);

  // Savol o'zgarganda holatlarni tozalash
  useEffect(() => {
    setSelectedRu(null);
    setFlash(null);
  }, [question.id]);

  // Gap tuzish uchun so'zlar banki (deterministik)
  const sentenceBank = useMemo(() => {
    if (question.type !== "sentence_building") return [];
    return seededShuffle(
      [...question.payload.correct, ...question.payload.distractors],
      seedFromId(question.id),
    );
  }, [question]);

  // Moslash uchun o'zbekcha tomon tartibi
  const uzOrder = useMemo(() => {
    if (question.type !== "word_matching") return [];
    return seededShuffle(
      question.payload.pairs.map((_, i) => i),
      seedFromId(question.id),
    );
  }, [question]);

  // ------------------------- Tanlov turidagi savollar -------------------------
  if (
    question.type === "multiple_choice" ||
    question.type === "word_selection" ||
    question.type === "fill_blank" ||
    question.type === "listening"
  ) {
    const p = question.payload;
    const selected = answer?.kind === "index" ? answer.value : -1;
    // Turga xos qiymatlar — oldindan toraytiriladi (closure'larda ishlatish uchun)
    const speakText =
      question.type === "listening" ? question.payload.speakText : "";
    const listenPrompt =
      question.type === "listening" ? question.payload.promptUz : "";
    const fbSentence =
      question.type === "fill_blank" ? question.payload.sentence : "";
    const promptText =
      question.type === "multiple_choice"
        ? question.payload.prompt
        : question.type === "word_selection"
          ? question.payload.promptUz
          : "";
    const isRuPrompt =
      question.type === "multiple_choice" && question.payload.promptLang === "ru";

    return (
      <div className="space-y-6">
        {question.type === "listening" && (
          <div className="flex flex-col items-center gap-3 rounded-2xl bg-accent-blue-soft p-6">
            <button
              type="button"
              onClick={() => speak(speakText)}
              disabled={!ttsSupported || speaking}
              className={cn(
                "btn-3d flex h-20 w-20 items-center justify-center rounded-full bg-accent-blue text-white shadow-[0_5px_0_0_#0d8ec7]",
                speaking && "opacity-70",
              )}
              aria-label="Eshitish"
            >
              {speaking ? (
                <Loader2 size={30} className="animate-spin" />
              ) : (
                <Volume2 size={32} />
              )}
            </button>
            <p className="text-sm font-semibold text-[#0a7ba8]">
              {ttsSupported ? "Tinglash uchun bosing" : "Bu brauzerda ovoz yo‘q"}
            </p>
            <p className="text-sm font-bold text-ink">{listenPrompt}</p>
          </div>
        )}

        {question.type === "fill_blank" && (
          <p className="text-center text-2xl font-bold leading-relaxed text-ink">
            {fbSentence.split("___").map((part, i, arr) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 && (
                  <span
                    className={cn(
                      "mx-1 inline-block min-w-24 rounded-lg border-b-4 px-3",
                      selected >= 0
                        ? "border-primary text-primary"
                        : "border-line text-ink-faint",
                    )}
                  >
                    {selected >= 0 ? p.options[selected] : "????"}
                  </span>
                )}
              </span>
            ))}
          </p>
        )}

        {(question.type === "multiple_choice" || question.type === "word_selection") && (
          <p
            className={cn(
              "text-xl font-bold leading-snug text-ink",
              isRuPrompt && "text-2xl",
            )}
          >
            {promptText}
          </p>
        )}

        <div className="grid gap-3 sm:grid-cols-2">
          {p.options.map((opt: string, i: number) => {
            const isSelected = selected === i;
            const isOk = checked && i === p.correctIndex;
            const isBad = checked && isSelected && i !== p.correctIndex;
            return (
              <button
                key={opt}
                type="button"
                disabled={checked}
                onClick={() => {
                  playSound("click", soundEnabled);
                  onChange({ kind: "index", value: i });
                }}
                className={cn(
                  "rounded-2xl border-2 px-4 py-4 text-left text-base font-semibold transition-all",
                  "hover:-translate-y-0.5 hover:border-accent-blue",
                  !checked && isSelected && "border-accent-blue bg-accent-blue-soft",
                  isOk && "border-primary bg-primary-soft text-primary-ink",
                  isBad && "border-error bg-error-soft text-[#c62828]",
                  checked && !isOk && !isBad && "border-line opacity-70",
                )}
              >
                <span className="flex items-center justify-between gap-2">
                  {opt}
                  {isOk && <Check size={18} className="text-primary" />}
                  {isBad && <X size={18} className="text-error" />}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // ------------------------- To'g'ri / Noto'g'ri -------------------------
  if (question.type === "true_false") {
    const p = question.payload;
    const selected = answer?.kind === "index" ? answer.value : -1;
    const correctValue = p.isTrue ? 0 : 1;
    return (
      <div className="space-y-6">
        <div className="rounded-2xl bg-surface p-5 text-center">
          <p className="text-2xl font-bold text-ink" lang="ru">
            {p.ruText}
          </p>
          <div className="my-3 h-px bg-line" />
          <p className="text-lg font-semibold text-ink-soft">{p.uzTranslation}</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {["To‘g‘ri", "Noto‘g‘ri"].map((label, i) => {
            const isSelected = selected === i;
            const isOk = checked && i === correctValue;
            const isBad = checked && isSelected && i !== correctValue;
            return (
              <button
                key={label}
                type="button"
                disabled={checked}
                onClick={() => {
                  playSound("click", soundEnabled);
                  onChange({ kind: "index", value: i });
                }}
                className={cn(
                  "rounded-2xl border-2 px-4 py-5 text-base font-bold transition-all",
                  !checked && isSelected && "border-accent-blue bg-accent-blue-soft",
                  isOk && "border-primary bg-primary-soft text-primary-ink",
                  isBad && "border-error bg-error-soft text-[#c62828]",
                  checked && !isOk && !isBad && "border-line opacity-70",
                )}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // ------------------------- Tarjima (matnli) -------------------------
  if (question.type === "translation") {
    const p = question.payload;
    const value = answer?.kind === "text" ? answer.value : "";
    const dirLabel =
      p.direction === "ru_to_uz" ? "Ruscha → O‘zbekcha" : "O‘zbekcha → Ruscha";
    return (
      <div className="space-y-5">
        <span className="inline-block rounded-full bg-surface-2 px-3 py-1 text-xs font-bold text-ink-soft">
          {dirLabel}
        </span>
        <p
          className="rounded-2xl bg-surface p-6 text-center text-2xl font-bold text-ink"
          lang={p.direction === "ru_to_uz" ? "ru" : "uz"}
        >
          {p.source}
        </p>
        <div>
          <label
            htmlFor="answer-input"
            className="mb-2 block text-sm font-bold text-ink-soft"
          >
            Javobingizni yozing:
          </label>
          <input
            id="answer-input"
            type="text"
            value={value}
            disabled={checked}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            onChange={(e) => onChange({ kind: "text", value: e.target.value })}
            onKeyDown={(e) => {
              if (e.key === "Enter" && value.trim().length > 0 && !checked) {
                e.preventDefault();
                document.getElementById("lesson-check-btn")?.click();
              }
            }}
            placeholder={
              p.direction === "ru_to_uz" ? "Tarjimani yozing…" : "Ruscha yozing…"
            }
            className={cn(
              "h-14 w-full rounded-2xl border-2 bg-white px-4 text-lg font-semibold text-ink",
              "placeholder:text-base placeholder:font-normal placeholder:text-ink-faint focus:outline-none",
              checked ? "border-line" : "border-line focus:border-accent-blue",
            )}
          />
          <p className="mt-2 text-xs text-ink-soft">
            Katta-kichik harf va tinish belgilariga e’tibor bermaydi.
          </p>
        </div>
      </div>
    );
  }

  // ------------------------- Juftliklarni moslash -------------------------
  if (question.type === "word_matching") {
    const p = question.payload;
    const matched = answer?.kind === "pairs" ? answer.matched : [];
    const wrong = answer?.kind === "pairs" ? answer.wrong : 0;
    const pairs = p.pairs;

    const clickRu = (i: number) => {
      if (matched.includes(i) || checked) return;
      playSound("click", soundEnabled);
      setSelectedRu((cur) => (cur === i ? null : i));
    };

    const clickUz = (j: number) => {
      if (selectedRu === null || checked) return;
      if (selectedRu === j) {
        playSound("correct", soundEnabled);
        onChange({ kind: "pairs", matched: [...matched, selectedRu], wrong });
        setSelectedRu(null);
      } else {
        playSound("wrong", soundEnabled);
        setFlash(j);
        window.setTimeout(() => setFlash(null), 450);
        onChange({ kind: "pairs", matched, wrong: wrong + 1 });
        setSelectedRu(null);
      }
    };

    return (
      <div className="space-y-4">
        <p className="text-sm font-bold text-ink-soft">
          Mos kelgan juftni tanlang: avval o‘z tomoningizni bosing
        </p>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2.5">
            {pairs.map((pr, i) => {
              const isMatched = matched.includes(i);
              return (
                <button
                  key={`ru-${i}`}
                  type="button"
                  disabled={isMatched || checked}
                  onClick={() => clickRu(i)}
                  className={cn(
                    "w-full rounded-xl border-2 px-3 py-3.5 text-left font-bold transition-all",
                    isMatched && "border-primary bg-primary-soft text-primary-ink opacity-60",
                    selectedRu === i && !isMatched && "border-accent-blue bg-accent-blue-soft",
                    !isMatched &&
                      selectedRu !== i &&
                      "border-line bg-white hover:border-accent-blue",
                  )}
                  lang="ru"
                >
                  {pr.ru}
                </button>
              );
            })}
          </div>
          <div className="space-y-2.5">
            {uzOrder.map((j) => {
              const pr = pairs[j];
              const isMatched = matched.includes(j);
              return (
                <button
                  key={`uz-${j}`}
                  type="button"
                  disabled={isMatched || checked || selectedRu === null}
                  onClick={() => clickUz(j)}
                  className={cn(
                    "w-full rounded-xl border-2 px-3 py-3.5 text-left font-bold transition-all",
                    isMatched && "border-primary bg-primary-soft text-primary-ink opacity-60",
                    flash === j && "animate-pop border-error bg-error-soft text-[#c62828]",
                    !isMatched &&
                      flash !== j &&
                      "border-line bg-white hover:border-accent-blue disabled:opacity-60",
                  )}
                >
                  {pr.uz}
                </button>
              );
            })}
          </div>
        </div>
        <p className="text-center text-xs font-semibold text-ink-soft">
          {matched.length}/{pairs.length} juft topildi
        </p>
      </div>
    );
  }

  // ------------------------- Gap tuzish -------------------------
  if (question.type === "sentence_building") {
    const p = question.payload;
    const selected = answer?.kind === "tokens" ? answer.selected : [];

    const addToken = (token: string) => {
      if (checked) return;
      const used = selected.filter((t) => t === token).length;
      const totalInBank = sentenceBank.filter((t) => t === token).length;
      if (used >= totalInBank) return;
      playSound("click", soundEnabled);
      onChange({ kind: "tokens", selected: [...selected, token] });
    };

    const removeToken = (idx: number) => {
      if (checked) return;
      playSound("click", soundEnabled);
      onChange({ kind: "tokens", selected: selected.filter((_, i) => i !== idx) });
    };

    return (
      <div className="space-y-5">
        <p className="text-sm font-bold text-ink-soft">
          So‘zlarni bosib, «{p.correct.join(" ")}» gapini tuzing:
        </p>

        {/* Tuzilgan gap */}
        <div className="flex min-h-16 flex-wrap items-center gap-2 rounded-2xl border-2 border-dashed border-line bg-white p-3">
          {selected.length === 0 && (
            <span className="px-2 text-sm text-ink-faint">
              Bu yerga so‘zlarni qo‘shing…
            </span>
          )}
          {selected.map((t, i) => (
            <button
              key={`${t}-${i}`}
              type="button"
              disabled={checked}
              onClick={() => removeToken(i)}
              className={cn(
                "rounded-xl border-2 px-3 py-2 text-base font-bold transition-all",
                /^[,.!?;:]$/.test(t)
                  ? "border-line bg-surface text-ink-soft"
                  : "border-primary bg-primary-soft text-primary-ink",
              )}
            >
              {t}
            </button>
          ))}
        </div>

        {/* So'zlar banki */}
        <div className="flex flex-wrap gap-2">
          {sentenceBank.map((t, i) => {
            const usedCount = selected.filter((s) => s === t).length;
            const totalCount = sentenceBank.filter((b) => b === t).length;
            const isUsed = usedCount >= totalCount;
            return (
              <button
                key={`${t}-${i}`}
                type="button"
                disabled={isUsed || checked}
                onClick={() => addToken(t)}
                className={cn(
                  "rounded-xl border-2 px-3.5 py-2.5 text-base font-bold transition-all",
                  isUsed
                    ? "border-line bg-surface text-ink-faint opacity-50"
                    : "border-line bg-white hover:-translate-y-0.5 hover:border-accent-blue",
                )}
              >
                {t}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return null;
}
