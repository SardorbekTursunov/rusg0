import type { Question } from "@/types";
import { answersMatch, formatSentence, normalizeAnswer } from "@/lib/utils";

/** Javob holati — har bir savol turi uchun */
export type AnswerState =
  | { kind: "index"; value: number }
  | { kind: "text"; value: string }
  | { kind: "pairs"; matched: number[]; wrong: number }
  | { kind: "tokens"; selected: string[] };

export function initialAnswer(question: Question): AnswerState {
  switch (question.type) {
    case "word_matching":
      return { kind: "pairs", matched: [], wrong: 0 };
    case "sentence_building":
      return { kind: "tokens", selected: [] };
    case "translation":
      return { kind: "text", value: "" };
    default:
      return { kind: "index", value: -1 };
  }
}

/** Javob kiritilganmi? (Tekshirish tugmasi uchun) */
export function isAnswered(question: Question, answer: AnswerState | null): boolean {
  if (!answer) return false;
  switch (answer.kind) {
    case "index":
      if (question.type === "true_false") return answer.value === 0 || answer.value === 1;
      return answer.value >= 0;
    case "text":
      return answer.value.trim().length > 0;
    case "pairs":
      return question.type === "word_matching"
        ? answer.matched.length === question.payload.pairs.length
        : false;
    case "tokens":
      return question.type === "sentence_building"
        ? answer.selected.length > 0
        : false;
    default:
      return false;
  }
}

/** Javob to‘g‘rimi? */
export function isCorrect(question: Question, answer: AnswerState | null): boolean {
  if (!answer) return false;
  switch (question.type) {
    case "multiple_choice":
    case "word_selection":
    case "fill_blank":
    case "listening": {
      const p = question.payload;
      return answer.kind === "index" && answer.value === p.correctIndex;
    }
    case "true_false": {
      const p = question.payload;
      // 0 = To'g'ri, 1 = Noto'g'ri
      return answer.kind === "index" && answer.value === (p.isTrue ? 0 : 1);
    }
    case "translation": {
      if (answer.kind !== "text") return false;
      const p = question.payload;
      return p.accepted.some((a) => answersMatch(a, answer.value));
    }
    case "word_matching": {
      if (answer.kind !== "pairs") return false;
      const p = question.payload;
      return answer.matched.length === p.pairs.length && answer.wrong === 0;
    }
    case "sentence_building": {
      if (answer.kind !== "tokens") return false;
      const p = question.payload;
      return (
        normalizeAnswer(formatSentence(answer.selected)) ===
        normalizeAnswer(formatSentence(p.correct))
      );
    }
    default:
      return false;
  }
}

/** Notog'ri javobni tekshirganda — to'g'ri javob matni (feedback uchun) */
export function correctAnswerText(question: Question): string {
  switch (question.type) {
    case "multiple_choice":
    case "word_selection":
    case "fill_blank":
    case "listening": {
      const p = question.payload;
      return p.options[p.correctIndex] ?? "";
    }
    case "true_false": {
      const p = question.payload;
      return p.isTrue ? "To‘g‘ri" : "Noto‘g‘ri";
    }
    case "translation": {
      const p = question.payload;
      return p.accepted[0] ?? "";
    }
    case "word_matching": {
      const p = question.payload;
      return p.pairs.map((x) => `${x.ru} — ${x.uz}`).join(", ");
    }
    case "sentence_building": {
      const p = question.payload;
      return formatSentence(p.correct);
    }
    default:
      return "";
  }
}

/** Savol turining o'zbekcha nomi (label uchun) */
export const QUESTION_TYPE_LABELS: Record<Question["type"], string> = {
  multiple_choice: "Tanlov",
  translation: "Tarjima",
  word_matching: "Moslash",
  sentence_building: "Gap tuzish",
  fill_blank: "Bo‘sh joyni to‘ldirish",
  listening: "Tinglash",
  true_false: "To‘g‘ri / Noto‘g‘ri",
  word_selection: "So‘z tanlash",
};
