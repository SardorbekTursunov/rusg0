import type { VocabularyItem } from "@/types";

/**
 * O'yinlar uchun umumiy yordamchilar.
 * Barcha o'yinlar lug'atdagi (500 so'z) so'zlardan foydalanadi.
 */

export interface GameWord {
  id: string;
  russianWord: string;
  uzbekTranslation: string;
  transliteration: string;
}

/** VocabItem → o'yin uchun minimal shakl */
export function toGameWord(v: VocabularyItem): GameWord {
  return {
    id: v.id,
    russianWord: v.russianWord,
    uzbekTranslation: v.uzbekTranslation,
    transliteration: v.transliteration,
  };
}

/** Fisher-Yates aralashtirish (nusxa qaytaradi) */
export function shuffle<T>(arr: readonly T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Tasodifiy n ta element (takrorlanmas) */
export function pickN<T>(arr: readonly T[], n: number): T[] {
  return shuffle(arr).slice(0, Math.min(n, arr.length));
}

/**
 * Savol variantlari: to'g'ri javob + 3 xato variant (boshqa so'zlardan).
 * Bir xil tarjimalar takrorlanmaydi.
 */
export function buildOptions(correct: string, pool: readonly string[], count = 4): string[] {
  const seen = new Set([correct.toLowerCase()]);
  const opts: string[] = [correct];
  for (const w of shuffle(pool)) {
    if (opts.length >= count) break;
    const key = w.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    opts.push(w);
  }
  // Agar lug'at kichik bo'lsa (demo) — variant yetmasligi mumkin
  return shuffle(opts);
}

/** Ruscha so'zni TTS bilan o'qish (Web Speech API — tekin) */
export function speakRu(text: string, rate = 0.9): void {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "ru-RU";
  u.rate = rate;
  window.speechSynthesis.speak(u);
}

export function isSingleWord(w: GameWord): boolean {
  return w.russianWord.trim().split(/\s+/).length === 1;
}

/** Umumiy o'yin natijasi saqlash */
export async function finishGame(
  game: "quiz" | "memory" | "truefalse" | "listen" | "letters",
  correct: number,
  total: number,
): Promise<{ xpAwarded: number; capReached: boolean; totalXp: number; currentStreak: number } | null> {
  const { getStore } = await import("@/lib/store");
  try {
    return await getStore().recordGameResult(game, correct, total);
  } catch {
    return null;
  }
}
