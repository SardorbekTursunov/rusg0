/**
 * Kurikulum generatori — 500 darslik katalog va mashqlarni yaratadi.
 *
 *   npm run generate-curriculum
 *
 * Natija:
 *   src/data/curriculum/generated/catalog.json      — modullar + dars metama'lumotlari
 *   src/data/curriculum/generated/questions-a1.json — A1 savollari (lazy load)
 *   ... c2 gacha
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import type {
  Level,
  Lesson,
  Module,
  Question,
  VocabularyItem,
} from "../src/types";
import { module1 } from "../src/data/curriculum/a1/module1";
import { module2 } from "../src/data/curriculum/a1/module2";
import { module3 } from "../src/data/curriculum/a1/module3";
import { module4 } from "../src/data/curriculum/a1/module4";
import { module5 } from "../src/data/curriculum/a1/module5";
import { vocabPart1 } from "../src/data/vocabulary/part1";
import { vocabPart2 } from "../src/data/vocabulary/part2";
import { vocabExpanded } from "../src/data/vocabulary/expanded";
import { MODULE_PLANS, type ModulePlan } from "./content/curriculum-plan";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "src", "data", "curriculum", "generated");

const LEVELS: Level[] = ["A1", "A2", "B1", "B2", "C1", "C2"];
const LEVEL_INDEX: Record<Level, number> = { A1: 1, A2: 2, B1: 3, B2: 4, C1: 5, C2: 6 };

const ASPECTS = [
  { key: "vocabulary", ru: "новые слова", uz: "yangi so'zlar" },
  { key: "listening", ru: "аудирование", uz: "tinglash" },
  { key: "grammar", ru: "грамматика", uz: "grammatika" },
  { key: "reading", ru: "чтение", uz: "o'qish" },
  { key: "practice", ru: "практика", uz: "amaliyot" },
] as const;

type Aspect = (typeof ASPECTS)[number];

// --- Deterministik tasodif ---------------------------------------------------

function hashString(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffled<T>(arr: T[], rand: () => number): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// --- Lug'at ------------------------------------------------------------------

const ALL_VOCAB: VocabularyItem[] = [...vocabPart1, ...vocabPart2, ...vocabExpanded];

function scoreWord(v: VocabularyItem, categories: string[], lessonLevel: Level): number {
  const catHits = (v.categories ?? []).filter((c) => categories.includes(c)).length;
  const levelGap = Math.abs(LEVEL_INDEX[v.level] - LEVEL_INDEX[lessonLevel]);
  return catHits * 10 - levelGap * 3;
}

function pickVocabulary(
  categories: string[],
  level: Level,
  seed: number,
  count = 8,
): VocabularyItem[] {
  const rand = mulberry32(seed);
  const ranked = ALL_VOCAB.map((v) => ({ v, s: scoreWord(v, categories, level) }))
    .filter((x) => x.s > -6)
    .sort((a, b) => b.s - a.s);
  const top = ranked.slice(0, Math.max(count * 4, 24)).map((x) => x.v);
  const mix = shuffled(top, rand);
  const out: VocabularyItem[] = [];
  const usedTranslations = new Set<string>();
  for (const v of mix) {
    const key = v.uzbekTranslation.toLowerCase();
    if (usedTranslations.has(key)) continue;
    usedTranslations.add(key);
    out.push(v);
    if (out.length >= count) break;
  }
  if (out.length < count) {
    for (const v of shuffled(ALL_VOCAB, rand)) {
      if (out.some((x) => x.id === v.id)) continue;
      if (usedTranslations.has(v.uzbekTranslation.toLowerCase())) continue;
      usedTranslations.add(v.uzbekTranslation.toLowerCase());
      out.push(v);
      if (out.length >= count) break;
    }
  }
  return out;
}

// --- Mashq yordamchilari -----------------------------------------------------

const norm = (s: string) => s.toLowerCase().replace(/[«»"'`.,!?;:()-]/g, "").trim();

function uniqueOptions(
  correct: string,
  pool: string[],
  n: number,
  rand: () => number,
): string[] {
  const seen = new Set([norm(correct)]);
  const options = [correct];
  for (const p of shuffled(pool, rand)) {
    if (options.length >= n) break;
    if (!seen.has(norm(p)) && p.trim()) {
      seen.add(norm(p));
      options.push(p);
    }
  }
  return shuffled(options, rand);
}

function correctIndex(options: string[], correct: string): number {
  return options.findIndex((o) => norm(o) === norm(correct));
}

function tokenize(sentence: string): string[] {
  return sentence
    .replace(/([,.!?;:…])/g, " $1 ")
    .split(/\s+/)
    .filter(Boolean);
}

interface Blank {
  sentence: string;
  answer: string;
}

/** Misol gapdan dars so'zini (yoki uning o'zagini) topib, bo'sh joy qiladi */
function makeBlank(exampleRu: string, word: string): Blank | null {
  const tokens = exampleRu.split(/(\s+)/);
  const stem = word.slice(0, Math.max(4, word.length - 2)).toLowerCase();
  let found: { index: number; token: string } | null = null;
  for (let i = 0; i < tokens.length; i++) {
    const raw = tokens[i].replace(/[,.!?;:()«»"]/g, "");
    if (!raw) continue;
    const low = raw.toLowerCase();
    if (low === word.toLowerCase() || low.startsWith(stem)) {
      found = { index: i, token: raw };
      break;
    }
  }
  if (!found) return null;
  const clean = tokens[found.index].replace(found.token, "___");
  tokens[found.index] = clean;
  return { sentence: tokens.join(""), answer: found.token };
}

interface Ctx {
  lessonId: string;
  module: Module;
  level: Level;
  aspect: Aspect;
  grammarTopic: string;
  words: VocabularyItem[];
  pool: VocabularyItem[];
  rand: () => number;
}

function explanation(word: VocabularyItem): string {
  return `«${word.russianWord}» — «${word.uzbekTranslation}». Misol: ${word.exampleRu}`;
}

let qCounter = 0;

function qid(lessonId: string, n: number): string {
  qCounter++;
  return `${lessonId}-q${String(n).padStart(2, "0")}-${qCounter}`;
}

function choiceQuestion(ctx: Ctx, n: number, word: VocabularyItem): Question {
  const pool = ctx.pool.map((v) => v.uzbekTranslation);
  const options = uniqueOptions(word.uzbekTranslation, pool, 4, ctx.rand);
  return {
    id: qid(ctx.lessonId, n),
    lessonId: ctx.lessonId,
    orderIndex: n,
    type: "multiple_choice",
    explanationUz: explanation(word),
    payload: {
      prompt: `«${word.russianWord}» so'zining tarjimasini top.`,
      promptLang: "uz",
      options,
      correctIndex: correctIndex(options, word.uzbekTranslation),
    },
  };
}

function selectionQuestion(ctx: Ctx, n: number, word: VocabularyItem): Question {
  const pool = ctx.pool.map((v) => v.russianWord);
  const options = uniqueOptions(word.russianWord, pool, 4, ctx.rand);
  return {
    id: qid(ctx.lessonId, n),
    lessonId: ctx.lessonId,
    orderIndex: n,
    type: "word_selection",
    explanationUz: explanation(word),
    payload: {
      promptUz: `«${word.uzbekTranslation}» — ruscha qanday?`,
      options,
      correctIndex: correctIndex(options, word.russianWord),
    },
  };
}

function translationQuestion(
  ctx: Ctx,
  n: number,
  word: VocabularyItem,
  direction: "ru_to_uz" | "uz_to_ru",
): Question {
  return {
    id: qid(ctx.lessonId, n),
    lessonId: ctx.lessonId,
    orderIndex: n,
    type: "translation",
    explanationUz: explanation(word),
    payload:
      direction === "ru_to_uz"
        ? { direction, source: word.russianWord, accepted: [word.uzbekTranslation] }
        : { direction, source: word.uzbekTranslation, accepted: [word.russianWord] },
  };
}

function listeningQuestion(ctx: Ctx, n: number, phrase: string, correctUz: string): Question {
  const pool = ctx.pool.map((v) => v.uzbekTranslation);
  const options = uniqueOptions(correctUz, pool, 4, ctx.rand);
  return {
    id: qid(ctx.lessonId, n),
    lessonId: ctx.lessonId,
    orderIndex: n,
    type: "listening",
    explanationUz: `Eshitilgan matn: «${phrase}». To'g'ri tarjima: «${correctUz}».`,
    payload: {
      speakText: phrase,
      promptUz: "Eshiting va to'g'ri tarjimani tanlang.",
      options,
      correctIndex: correctIndex(options, correctUz),
    },
  };
}

function trueFalseQuestion(ctx: Ctx, n: number, word: VocabularyItem, lie: boolean): Question {
  let translation = word.uzbekTranslation;
  if (lie) {
    const other = shuffled(
      ctx.pool.filter((v) => v.uzbekTranslation !== word.uzbekTranslation),
      ctx.rand,
    )[0];
    if (other) translation = other.uzbekTranslation;
  }
  const isTrue = !lie || translation === word.uzbekTranslation;
  return {
    id: qid(ctx.lessonId, n),
    lessonId: ctx.lessonId,
    orderIndex: n,
    type: "true_false",
    explanationUz: explanation(word),
    payload: {
      ruText: word.russianWord,
      uzTranslation: translation,
      isTrue,
    },
  };
}

function matchingQuestion(ctx: Ctx, n: number, words: VocabularyItem[]): Question {
  const unique: VocabularyItem[] = [];
  const seen = new Set<string>();
  for (const w of words) {
    if (seen.has(norm(w.uzbekTranslation))) continue;
    seen.add(norm(w.uzbekTranslation));
    unique.push(w);
    if (unique.length === 4) break;
  }
  return {
    id: qid(ctx.lessonId, n),
    lessonId: ctx.lessonId,
    orderIndex: n,
    type: "word_matching",
    explanationUz: unique.map((w) => `${w.russianWord} — ${w.uzbekTranslation}`).join(", "),
    payload: {
      pairs: unique.map((w) => ({ ru: w.russianWord, uz: w.uzbekTranslation })),
    },
  };
}

function fillQuestion(ctx: Ctx, n: number, word: VocabularyItem): Question | null {
  const blank = makeBlank(word.exampleRu, word.russianWord);
  if (!blank) return null;
  const pool = ctx.pool.map((v) => v.russianWord);
  const options = uniqueOptions(blank.answer, pool, 4, ctx.rand);
  return {
    id: qid(ctx.lessonId, n),
    lessonId: ctx.lessonId,
    orderIndex: n,
    type: "fill_blank",
    explanationUz: `«${word.russianWord}» — «${word.uzbekTranslation}». To'liq gap: ${word.exampleRu}`,
    payload: {
      sentence: blank.sentence,
      options,
      correctIndex: correctIndex(options, blank.answer),
    },
  };
}

function sentenceQuestion(ctx: Ctx, n: number, word: VocabularyItem): Question | null {
  const tokens = tokenize(word.exampleRu);
  if (tokens.length < 3 || tokens.length > 9) return null;
  const distractors = shuffled(
    ctx.pool
      .map((v) => v.russianWord)
      .filter((w) => !tokens.some((t) => norm(t) === norm(w))),
    ctx.rand,
  )
    .slice(0, 3)
    .map((w) => w.replace(/[,.!?]/g, ""));
  return {
    id: qid(ctx.lessonId, n),
    lessonId: ctx.lessonId,
    orderIndex: n,
    type: "sentence_building",
    explanationUz: `To'g'ri gap: «${word.exampleRu}». ${word.uzbekTranslation}.`,
    payload: { correct: tokens, distractors },
  };
}

/** O'qish savoli — matnda qatnashgan so'zni topish */
function readingWordQuestion(
  ctx: Ctx,
  n: number,
  textWords: VocabularyItem[],
  allWords: VocabularyItem[],
): Question {
  const target = textWords[0];
  const notInText = allWords.filter(
    (v) =>
      !textWords.some((t) => norm(t.russianWord) === norm(v.russianWord)) &&
      norm(v.uzbekTranslation) !== norm(target.uzbekTranslation),
  );
  const options = uniqueOptions(
    target.uzbekTranslation,
    notInText.map((v) => v.uzbekTranslation),
    4,
    ctx.rand,
  );
  return {
    id: qid(ctx.lessonId, n),
    lessonId: ctx.lessonId,
    orderIndex: n,
    type: "multiple_choice",
    explanationUz: `Matnda «${target.russianWord}» so'zi ishlatilgan — «${target.uzbekTranslation}».`,
    payload: {
      prompt: `Matnda qaysi so'zning tarjimasi uchraydi?`,
      promptLang: "uz",
      options,
      correctIndex: correctIndex(options, target.uzbekTranslation),
    },
  };
}

function readingTfQuestion(ctx: Ctx, n: number, textWords: VocabularyItem[]): Question {
  const w = textWords[0];
  const lie = hashString(ctx.lessonId + n) % 2 === 0;
  return {
    id: qid(ctx.lessonId, n),
    lessonId: ctx.lessonId,
    orderIndex: n,
    type: "true_false",
    explanationUz: `${w.exampleRu} — ${w.exampleUz}`,
    payload: {
      ruText: w.exampleRu,
      uzTranslation: lie ? textWords[1]?.exampleUz ?? w.exampleUz : w.exampleUz,
      isTrue: !lie,
    },
  };
}

function buildQuestions(ctx: Ctx): Question[] {
  const w = ctx.words;
  const byType = ctx.aspect.key;
  const list: (Question | null)[] = [];

  // 1–4: asosiy lug'at mashqlari
  list.push(choiceQuestion(ctx, 1, w[0]));
  list.push(selectionQuestion(ctx, 2, w[1] ?? w[0]));
  list.push(translationQuestion(ctx, 3, w[2] ?? w[0], "ru_to_uz"));
  list.push(translationQuestion(ctx, 4, w[3] ?? w[1], "uz_to_ru"));

  // 5: tinglash
  list.push(listeningQuestion(ctx, 5, w[4]?.russianWord ?? w[0].russianWord, w[4]?.uzbekTranslation ?? w[0].uzbekTranslation));

  // 6: to'g'ri / noto'g'ri
  list.push(trueFalseQuestion(ctx, 6, w[5] ?? w[2], hashString(ctx.lessonId) % 2 === 0));

  // 7: juftlash
  list.push(matchingQuestion(ctx, 7, w.slice(0, 4)));

  // 8–9: bo'sh joy va gap tuzish
  list.push(fillQuestion(ctx, 8, w[6] ?? w[0]) ?? choiceQuestion(ctx, 8, w[6] ?? w[0]));
  list.push(sentenceQuestion(ctx, 9, w[7] ?? w[1]) ?? selectionQuestion(ctx, 9, w[7] ?? w[1]));

  // 10–11: qo'shimcha lug'at
  list.push(choiceQuestion(ctx, 10, w[1] ?? w[0]));
  list.push(translationQuestion(ctx, 11, w[4] ?? w[0], "ru_to_uz"));

  // 12–14: aspektga mos mashqlar
  if (byType === "listening") {
    const second = w[2];
    list.push(listeningQuestion(ctx, 12, second.exampleRu, second.exampleUz));
    list.push(listeningQuestion(ctx, 13, w[5]?.exampleRu ?? w[0].exampleRu, w[5]?.exampleUz ?? w[0].exampleUz));
    list.push(trueFalseQuestion(ctx, 14, w[3] ?? w[0], false));
  } else if (byType === "grammar") {
    list.push(fillQuestion(ctx, 12, w[2]) ?? choiceQuestion(ctx, 12, w[2]));
    list.push(sentenceQuestion(ctx, 13, w[4]) ?? selectionQuestion(ctx, 13, w[4]));
    list.push(fillQuestion(ctx, 14, w[5] ?? w[0]) ?? choiceQuestion(ctx, 14, w[5] ?? w[0]));
  } else if (byType === "reading") {
    list.push(readingTfQuestion(ctx, 12, w));
    list.push(readingWordQuestion(ctx, 13, w, ctx.pool));
    list.push(translationQuestion(ctx, 14, w[6] ?? w[0], "ru_to_uz"));
  } else if (byType === "practice") {
    list.push(selectionQuestion(ctx, 12, w[3] ?? w[0]));
    list.push(sentenceQuestion(ctx, 13, w[5] ?? w[1]) ?? choiceQuestion(ctx, 13, w[5] ?? w[1]));
    list.push(translationQuestion(ctx, 14, w[7] ?? w[2], "uz_to_ru"));
  } else {
    // vocabulary
    list.push(selectionQuestion(ctx, 12, w[2]));
    list.push(choiceQuestion(ctx, 13, w[3] ?? w[0]));
    list.push(readingTfQuestion(ctx, 14, w));
  }

  return list.filter((q): q is Question => q !== null).map((q, i) => ({ ...q, orderIndex: i + 1 }));
}

function buildReadingText(words: VocabularyItem[]): string {
  return words
    .slice(0, 3)
    .map((w) => w.exampleRu)
    .join(" ");
}

function aspectObjectives(plan: ModulePlan, aspect: Aspect, grammar: string): string[] {
  switch (aspect.key) {
    case "vocabulary":
      return [
        `${plan.titleUz} mavzusida 8 ta yangi so'zni o'rganish`,
        "So'zlarning ruscha talaffuzini mashq qilish",
        "Tarjima va tanlov topshiriqlarini bajarish",
      ];
    case "listening":
      return [
        "Audio matnni tinglab tushunish",
        "Eshitilgan so'z va iboralarni aniqlash",
        "Talaffuzni takrorlash va eslab qolish",
      ];
    case "grammar":
      return [
        `«${grammar}» mavzusini misollar asosida o'zlashtirish`,
        "Grammatik jihatdan to'g'ri gap tuzish",
        "Bo'sh joy va gap tuzish mashqlarini bajarish",
      ];
    case "reading":
      return [
        "Qisqa matnni o'qib tushunish",
        "Matndan kerakli so'z va ma'lumotni topish",
        "Yangi so'zlarni kontekstda ko'rish",
      ];
    default:
      return [
        "O'rganilgan lug'at va grammatikani amalda qo'llash",
        "Savol-javob va tarjima mashqlarini bajarish",
        "Bilimni mustahkamlash va xatolarni tuzatish",
      ];
  }
}

// --- Asosiy yig'ish ----------------------------------------------------------

const handcrafted = [module1, module2, module3, module4, module5];

const modules: Module[] = handcrafted.map((c) => ({
  ...c.module,
  level: "A1",
  orderIndex: Number(c.module.id.split("-m")[1]),
}));

const lessons: Lesson[] = [];
const questionsByLesson: Record<string, Question[]> = {};

// 1) Qo'lda yozilgan A1 darslari (25 ta)
const HAND_CATEGORIES: Record<string, string[]> = {
  "a1-m1": ["communication"],
  "a1-m2": ["education", "communication"],
  "a1-m3": ["family"],
  "a1-m4": ["school", "education"],
  "a1-m5": ["everyday", "time"],
};

for (const content of handcrafted) {
  for (const lesson of content.lessons) {
    const cats = HAND_CATEGORIES[content.module.id] ?? ["everyday"];
    const words = pickVocabulary(cats, "A1", hashString(lesson.id), 6);
    lessons.push({
      ...lesson,
      level: "A1",
      objectives: [
        `«${lesson.title}» mavzusini o'zlashtirish`,
        "Yangi so'z va iboralarni yodlash",
        "Amaliy mashqlarni bajarish",
      ],
      grammarTopic: content.module.titleUz,
      vocabularyIds: words.map((w) => w.id),
      examples: words.slice(0, 3).map((w) => ({ ru: w.exampleRu, uz: w.exampleUz })),
      readingText: null,
      listeningText: words[0]?.exampleRu ?? null,
      status: "published",
      published: true,
      completionCriteria: { minScore: 70 },
      source: "handcrafted",
      tags: cats,
    });
    questionsByLesson[lesson.id] = content.questions
      .filter((q) => q.lessonId === lesson.id)
      .sort((a, b) => a.orderIndex - b.orderIndex);
  }
}

// 2) Generatsiya qilingan darslar (475 ta)
const sortedPlans: { level: Level; plan: ModulePlan; moduleIndex: number }[] = [];
for (const level of LEVELS) {
  const plans = level === "A1" ? MODULE_PLANS.A1_GENERATED : MODULE_PLANS[level];
  const start = level === "A1" ? 6 : 1;
  plans.forEach((plan, i) => sortedPlans.push({ level, plan, moduleIndex: start + i }));
}

const modulesByLevel: Record<string, Module[]> = {};
for (const { level, plan, moduleIndex } of sortedPlans) {
  const moduleId = `${level.toLowerCase()}-m${moduleIndex}`;
  const mod: Module = {
    id: moduleId,
    level,
    orderIndex: moduleIndex,
    title: plan.titleRu,
    titleUz: plan.titleUz,
    description: plan.description,
  };
  modules.push(mod);
  (modulesByLevel[level] ??= []).push(mod);

  for (let li = 0; li < ASPECTS.length; li++) {
    const aspect = ASPECTS[li];
    const lessonId = `${moduleId}-l${li + 1}`;
    const seed = hashString(lessonId);
    const rand = mulberry32(seed);
    const words = pickVocabulary(plan.categories, level, seed, 8);
    const pool = pickVocabulary(plan.categories, level, seed ^ 0x9e3779b9, 32);
    const grammarTopic = plan.grammar[li % plan.grammar.length];

    const ctx: Ctx = {
      lessonId,
      module: mod,
      level,
      aspect,
      grammarTopic,
      words,
      pool: pool.length >= 12 ? pool : ALL_VOCAB,
      rand,
    };

    const readingText = buildReadingText(words);
    const lesson: Lesson = {
      id: lessonId,
      moduleId,
      orderIndex: li + 1,
      title: `${plan.titleUz}: ${aspect.uz}`,
      titleRu: `${plan.titleRu}: ${aspect.ru}`,
      description: `${plan.description} — ${aspect.uz} mashqlari.`,
      xpReward: level === "A1" || level === "A2" ? 10 : level === "B1" || level === "B2" ? 15 : 20,
      estimatedMinutes: 6 + LEVEL_INDEX[level],
      level,
      objectives: aspectObjectives(plan, aspect, grammarTopic),
      grammarTopic,
      grammarExplanation: `«${grammarTopic}» mavzusi ${level} darajasida misollar va mashqlar orqali o'rganiladi.`,
      vocabularyIds: words.map((w) => w.id),
      examples: words.slice(0, 3).map((w) => ({ ru: w.exampleRu, uz: w.exampleUz })),
      readingText,
      readingTitle: `${plan.titleRu} — текст`,
      listeningText: words[0].exampleRu,
      completionCriteria: { minScore: 70 },
      tags: plan.categories,
      status: "published",
      published: true,
      source: "seed-template-v1",
    };

    lessons.push(lesson);
    questionsByLesson[lessonId] = buildQuestions(ctx);
  }
}

// 3) Prerequisites — global ketma-ketlik
const LEVEL_RANK: Record<Level, number> = { A1: 0, A2: 1, B1: 2, B2: 3, C1: 4, C2: 5 };
const moduleById = new Map(modules.map((m) => [m.id, m]));
const orderedLessons = [...lessons].sort((a, b) => {
  const ma = moduleById.get(a.moduleId)!;
  const mb = moduleById.get(b.moduleId)!;
  return (
    LEVEL_RANK[ma.level] - LEVEL_RANK[mb.level] ||
    ma.orderIndex - mb.orderIndex ||
    a.orderIndex - b.orderIndex
  );
});
for (let i = 0; i < orderedLessons.length; i++) {
  orderedLessons[i].prerequisites =
    i === 0 ? [] : [orderedLessons[i - 1].id];
}

// --- Tekshiruv ---------------------------------------------------------------

const lessonIds = new Set<string>();
for (const l of lessons) {
  if (lessonIds.has(l.id)) throw new Error(`Takroriy dars ID: ${l.id}`);
  lessonIds.add(l.id);
}
for (const l of lessons) {
  const qs = questionsByLesson[l.id] ?? [];
  if (qs.length < 10 || qs.length > 20) {
    throw new Error(`Dars ${l.id}: savollar soni ${qs.length} (10–20 bo'lishi kerak)`);
  }
  l.exerciseCount = qs.length;
}

// --- Yozish ------------------------------------------------------------------

mkdirSync(outDir, { recursive: true });

const catalog = {
  version: 2,
  generatedBy: "npm run generate-curriculum",
  totals: {
    levels: LEVELS.length,
    modules: modules.length,
    lessons: lessons.length,
    exercises: Object.values(questionsByLesson).reduce((s, q) => s + q.length, 0),
  },
  modules: modules.sort(
    (a, b) => LEVEL_RANK[a.level] - LEVEL_RANK[b.level] || a.orderIndex - b.orderIndex,
  ),
  lessons: orderedLessons,
};

writeFileSync(join(outDir, "catalog.json"), JSON.stringify(catalog), "utf8");

for (const level of LEVELS) {
  const map: Record<string, Question[]> = {};
  for (const lesson of orderedLessons) {
    const mod = moduleById.get(lesson.moduleId)!;
    if (mod.level !== level) continue;
    map[lesson.id] = questionsByLesson[lesson.id] ?? [];
  }
  writeFileSync(
    join(outDir, `questions-${level.toLowerCase()}.json`),
    JSON.stringify(map),
    "utf8",
  );
}

console.log("✓ Kurikulum generatsiyasi tugadi");
console.log(`  Modullar: ${catalog.totals.modules}`);
console.log(`  Darslar: ${catalog.totals.lessons}`);
console.log(`  Mashqlar: ${catalog.totals.exercises}`);
for (const level of LEVELS) {
  const count = orderedLessons.filter((l) => moduleById.get(l.moduleId)!.level === level).length;
  console.log(`  ${level}: ${count} dars`);
}
