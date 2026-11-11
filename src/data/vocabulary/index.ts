import type { Level, VocabularyItem } from "@/types";
import { vocabPart1 } from "./part1";
import { vocabPart2 } from "./part2";
import { vocabExpanded } from "./expanded";
import { categoryTitleUz, TOPIC_TO_CATEGORY } from "./categories";

const LEVEL_DIFFICULTY: Record<Level, number> = { A1: 1, A2: 2, B1: 3, B2: 4, C1: 5, C2: 5 };

/**
 * Eski (A1) yozuvlarni yagona kengaytirilgan modelga keltiradi.
 * Har bir yozuv kategoriya, ma'nolar, misollar va sifat holatiga ega bo'ladi.
 */
function normalize(v: VocabularyItem): VocabularyItem {
  const categories =
    v.categories && v.categories.length > 0
      ? v.categories
      : [TOPIC_TO_CATEGORY[v.topic] ?? "everyday"];
  return {
    ...v,
    entryType:
      v.entryType ??
      (v.partOfSpeech.includes("ibora") || v.partOfSpeech.includes("so'z")
        ? "expression"
        : "lemma"),
    meanings: v.meanings ?? [{ uz: v.uzbekTranslation }],
    examples:
      v.examples ??
      (v.exampleRu ? [{ ru: v.exampleRu, uz: v.exampleUz }] : []),
    categories,
    difficulty: v.difficulty ?? LEVEL_DIFFICULTY[v.level],
    frequencyRank: v.frequencyRank ?? null,
    status: v.status ?? "verified",
    source: v.source ?? "RusGo seed (qo'lda tekshirilgan)",
    verifiedAt: v.verifiedAt ?? "2026-01-15",
  };
}

/** Barcha lug'at yozuvlari (yagona normallashtirilgan model) */
export const vocabulary: VocabularyItem[] = [
  ...vocabPart1,
  ...vocabPart2,
  ...vocabExpanded,
].map(normalize);

/** Mavzular ro'yxati (eski admin filtri uchun) */
export const vocabularyTopics: string[] = Array.from(
  new Set(vocabulary.map((v) => v.topic)),
).sort();

/** Faqat o'quvchilarga ko'rinadigan yozuvlar (sifat nazorati qoidasi) */
export function visibleVocabulary(items: VocabularyItem[] = vocabulary): VocabularyItem[] {
  return items.filter(
    (v) => v.status === "verified" || v.status === "published",
  );
}

/** Oddiy filtr (eski API — moslik uchun saqlanadi) */
export function filterVocabulary(
  items: VocabularyItem[],
  opts: { search?: string; topic?: string; level?: string },
): VocabularyItem[] {
  const search = (opts.search ?? "").trim().toLowerCase();
  return items.filter((v) => {
    if (opts.topic && opts.topic !== "all" && v.topic !== opts.topic) return false;
    if (opts.level && opts.level !== "all" && v.level !== opts.level) return false;
    if (!search) return true;
    return (
      v.russianWord.toLowerCase().includes(search) ||
      v.uzbekTranslation.toLowerCase().includes(search) ||
      v.transliteration.toLowerCase().includes(search)
    );
  });
}

/** Qidiruv uchun matn indeksi (ruscha, o'zbekcha, transliteratsiya, sinonimlar) */
export function vocabularyHaystack(v: VocabularyItem): string {
  return [
    v.russianWord,
    v.uzbekTranslation,
    v.transliteration,
    ...(v.meanings ?? []).map((m) => m.uz),
    ...(v.synonyms ?? []),
    ...(v.antonyms ?? []),
    ...(v.categories ?? []).map((c) => categoryTitleUz(c)),
    v.topic,
  ]
    .join(" ")
    .toLowerCase();
}

/** Daraja bo'yicha guruhlangan sonlar */
export function vocabularyLevelCounts(items: VocabularyItem[]): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const v of items) counts[v.level] = (counts[v.level] ?? 0) + 1;
  return counts;
}
