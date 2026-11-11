/**
 * Kurikulum sifat tekshiruvi — 500 dars, mashqlar, CEFR taqsimoti.
 *
 *   npx tsx scripts/validate-curriculum.ts
 *
 * Muvaffaqiyatsizlikda exit code 1 (CI uchun).
 */
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import type { Lesson, Module, Question } from "../src/types";
import { VOCAB_CATEGORIES } from "../src/data/vocabulary/categories";
import { vocabulary } from "../src/data/vocabulary/index";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dir = join(__dirname, "..", "src", "data", "curriculum", "generated");

const catalog = JSON.parse(readFileSync(join(dir, "catalog.json"), "utf8")) as {
  modules: Module[];
  lessons: Lesson[];
};

const slugs = ["a1", "a2", "b1", "b2", "c1", "c2"];
const questions: Question[] = slugs.flatMap((s) =>
  Object.values(
    JSON.parse(readFileSync(join(dir, `questions-${s}.json`), "utf8")) as Record<
      string,
      Question[]
    >,
  ).flat(),
);

const errors: string[] = [];
const warn: string[] = [];

const LEVEL_MIN: Record<string, number> = {
  A1: 80,
  A2: 80,
  B1: 90,
  B2: 90,
  C1: 80,
  C2: 80,
};

const byLevel = new Map<string, Lesson[]>();
for (const l of catalog.lessons) {
  const level = l.level ?? "A1";
  if (!byLevel.has(level)) byLevel.set(level, []);
  byLevel.get(level)!.push(l);
}

if (catalog.lessons.length < 500) {
  errors.push(`Darslar soni 500 dan kam: ${catalog.lessons.length}`);
}

for (const [level, min] of Object.entries(LEVEL_MIN)) {
  const count = byLevel.get(level)?.length ?? 0;
  if (count < min) errors.push(`${level}: ${count} dars (kamida ${min} kerak)`);
}

const ids = new Set<string>();
const titles = new Map<string, string>();
for (const l of catalog.lessons) {
  if (ids.has(l.id)) errors.push(`Takrorlangan dars ID: ${l.id}`);
  ids.add(l.id);
  if (!l.title || !l.titleRu) errors.push(`Sarlavha yo'q: ${l.id}`);
  if (!l.description) errors.push(`Tavsif yo'q: ${l.id}`);
  if (!l.objectives || l.objectives.length === 0) errors.push(`Maqsad yo'q: ${l.id}`);
  if (!l.vocabularyIds || l.vocabularyIds.length === 0)
    errors.push(`Lug'at bog'lanmagan: ${l.id}`);
  if (!l.grammarTopic) errors.push(`Grammatika mavzusi yo'q: ${l.id}`);
  if (!l.examples || l.examples.length === 0) errors.push(`Namuna yo'q: ${l.id}`);
  const normalizedTitle = `${l.titleRu}`.trim().toLowerCase();
  const prev = titles.get(normalizedTitle);
  if (prev) errors.push(`Bir xil ruscha sarlavha: ${prev} va ${l.id}`);
  titles.set(normalizedTitle, l.id);
  if (l.status !== "published") warn.push(`Nashr etilmagan: ${l.id} (${l.status})`);
}

const moduleIds = new Set(catalog.modules.map((m) => m.id));
for (const l of catalog.lessons) {
  if (!moduleIds.has(l.moduleId)) errors.push(`Modul topilmadi: ${l.id} → ${l.moduleId}`);
}

const qByLesson = new Map<string, Question[]>();
for (const q of questions) {
  if (!qByLesson.has(q.lessonId)) qByLesson.set(q.lessonId, []);
  qByLesson.get(q.lessonId)!.push(q);
}

for (const l of catalog.lessons) {
  const list = qByLesson.get(l.id) ?? [];
  if (list.length < 10) errors.push(`${l.id}: ${list.length} mashq (kamida 10)`);
  if (list.length > 20) errors.push(`${l.id}: ${list.length} mashq (ko'pi bilan 20)`);
  const types = new Set(list.map((q) => q.type));
  if (types.size < 3) warn.push(`${l.id}: faqat ${types.size} xil mashq turi`);
  if (l.exerciseCount !== list.length)
    warn.push(`${l.id}: exerciseCount=${l.exerciseCount}, haqiqiy=${list.length}`);
}

// Mashq IDlari noyob bo'lishi shart
const qIds = new Set<string>();
for (const q of questions) {
  if (qIds.has(q.id)) errors.push(`Takrorlangan mashq ID: ${q.id}`);
  qIds.add(q.id);
}

// Lug'at tekshiruvi
const vocabIds = new Set(vocabulary.map((v) => v.id));
if (vocabIds.size !== vocabulary.length) {
  errors.push(`Lug'atda takrorlangan ID bor: ${vocabulary.length - vocabIds.size}`);
}
const categorySlugs = new Set(VOCAB_CATEGORIES.map((c) => c.slug));
for (const v of vocabulary) {
  if (!v.russianWord || !v.uzbekTranslation)
    errors.push(`Lug'at tarjimasi to'liq emas: ${v.id}`);
  for (const c of v.categories ?? []) {
    if (!categorySlugs.has(c)) errors.push(`Noma'lum kategoriya: ${v.id} → ${c}`);
  }
}
for (const l of catalog.lessons) {
  for (const vid of l.vocabularyIds ?? []) {
    if (!vocabIds.has(vid)) errors.push(`${l.id}: lug'at ID topilmadi (${vid})`);
  }
}

const stats = {
  modules: catalog.modules.length,
  lessons: catalog.lessons.length,
  exercises: questions.length,
  vocabulary: vocabulary.length,
  categories: VOCAB_CATEGORIES.length,
  levels: Object.fromEntries(
    [...byLevel.entries()].sort().map(([k, v]) => [k, v.length]),
  ),
  minExercises: Math.min(...[...qByLesson.values()].map((q) => q.length)),
  maxExercises: Math.max(...[...qByLesson.values()].map((q) => q.length)),
  types: [...new Set(questions.map((q) => q.type))].sort(),
};

console.log(JSON.stringify(stats, null, 2));

if (warn.length > 0) {
  console.log(`\n⚠ Ogohlantirishlar (${warn.length}):`);
  for (const w of warn.slice(0, 20)) console.log(`  - ${w}`);
}

if (errors.length > 0) {
  console.error(`\n✗ Xatolar (${errors.length}):`);
  for (const e of errors.slice(0, 50)) console.error(`  - ${e}`);
  process.exit(1);
}

console.log("\n✓ Kurikulum sifat tekshiruvidan o'tdi.");
