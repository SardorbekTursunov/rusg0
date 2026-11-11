import catalogData from "./generated/catalog.json";
import type { Level, Lesson, Module, Question } from "@/types";
import { LEVEL_META } from "@/data/vocabulary/categories";

// --------------------------------------------------------------------------
// RusGo kurikulum katalogi — 500 dars, 100 modul, A1–C2.
//
// Katalog (dars metama'lumotlari) sahifa yuklanishida bir marta o'qiladi.
// Savollar esa daraja bo'yicha alohida JSON fayllarda saqlanadi va faqat
// kerak bo'lganda (dars ochilganda) dinamik yuklanadi — bu 500 darslik
// kontentni bitta katta bundlega aylantirmaydi.
// --------------------------------------------------------------------------

interface Catalog {
  version: number;
  totals: {
    levels: number;
    modules: number;
    lessons: number;
    exercises: number;
  };
  modules: Module[];
  lessons: Lesson[];
}

const catalog = catalogData as unknown as Catalog;

export const modules: Module[] = catalog.modules;
export const lessons: Lesson[] = catalog.lessons;
export const catalogTotals = catalog.totals;

/** Umumiy mashqlar soni (admin statistikasi uchun) */
export const totalQuestions = catalog.totals.exercises;

export const LEVELS: { id: Level; title: string; subtitle: string }[] = (
  ["A1", "A2", "B1", "B2", "C1", "C2"] as Level[]
).map((id) => ({
  id,
  title: LEVEL_META[id].titleUz,
  subtitle: LEVEL_META[id].subtitle,
}));

// --------------------------------------------------------------------------
// Qidiruv yordamchilari
// --------------------------------------------------------------------------

export function getModuleById(id: string): Module | undefined {
  return modules.find((m) => m.id === id);
}

export function getLessonById(id: string): Lesson | undefined {
  return lessons.find((l) => l.id === id);
}

export function getLessonsForModule(moduleId: string): Lesson[] {
  return lessons
    .filter((l) => l.moduleId === moduleId)
    .sort((a, b) => a.orderIndex - b.orderIndex);
}

export function getModulesForLevel(level: Level): Module[] {
  return modules
    .filter((m) => m.level === level)
    .sort((a, b) => a.orderIndex - b.orderIndex);
}

/** Kursdagi darslarning umumiy tartib ro'yxati (ochilish ketma-ketligi uchun) */
export const lessonOrder: string[] = catalog.lessons.map((l) => l.id);

/** Dars ochiqmi? (oldingi dars tugallangan bo'lsa) */
export function isLessonUnlocked(lessonId: string, completed: Set<string>): boolean {
  const idx = lessonOrder.indexOf(lessonId);
  if (idx <= 0) return true;
  const prev = lessonOrder[idx - 1];
  return completed.has(prev);
}

/** Keyingi ochilishi kerak bo'lgan dars (tavsiya etilgan) */
export function getRecommendedLessonId(completed: Set<string>): string | null {
  for (const id of lessonOrder) {
    if (!completed.has(id)) return id;
  }
  return null; // barcha darslar tugallandi
}

/** Modulning barcha darslari tugallanganmi? */
export function isModuleCompleted(moduleId: string, completed: Set<string>): boolean {
  const ls = getLessonsForModule(moduleId);
  return ls.length > 0 && ls.every((l) => completed.has(l.id));
}

/** Darajadagi umumiy progress (foiz) */
export function getLevelProgress(level: Level, completed: Set<string>): number {
  const ids = lessons
    .filter((l) => {
      const m = modules.find((mm) => mm.id === l.moduleId);
      return m?.level === level;
    })
    .map((l) => l.id);
  if (ids.length === 0) return 0;
  const done = ids.filter((id) => completed.has(id)).length;
  return Math.round((done / ids.length) * 100);
}

/** Darajadagi darslar soni */
export function countLessonsInLevel(level: Level): number {
  return lessons.filter((l) => l.level === level || getModuleById(l.moduleId)?.level === level)
    .length;
}

// --------------------------------------------------------------------------
// Savollarni daraja bo'yicha lazy yuklash
// --------------------------------------------------------------------------

type QuestionMap = Record<string, Question[]>;

const QUESTION_LOADERS: Record<Level, () => Promise<{ default: unknown }>> = {
  A1: () => import("./generated/questions-a1.json"),
  A2: () => import("./generated/questions-a2.json"),
  B1: () => import("./generated/questions-b1.json"),
  B2: () => import("./generated/questions-b2.json"),
  C1: () => import("./generated/questions-c1.json"),
  C2: () => import("./generated/questions-c2.json"),
};

const questionCache = new Map<Level, QuestionMap>();

async function loadLevelQuestions(level: Level): Promise<QuestionMap> {
  const cached = questionCache.get(level);
  if (cached) return cached;
  const mod = await QUESTION_LOADERS[level]();
  const map = mod.default as QuestionMap;
  questionCache.set(level, map);
  return map;
}

/** Dars savollarini yuklaydi (kesh bilan) */
export async function loadQuestionsForLesson(lessonId: string): Promise<Question[]> {
  const lesson = getLessonById(lessonId);
  if (!lesson) return [];
  const level = (lesson.level ?? "A1") as Level;
  const map = await loadLevelQuestions(level);
  const qs = map[lessonId] ?? [];
  return [...qs].sort((a, b) => a.orderIndex - b.orderIndex);
}

/** Darajadagi barcha savollarni yuklaydi (admin statistikasi uchun) */
export async function loadQuestionsForLevel(level: Level): Promise<Question[]> {
  const map = await loadLevelQuestions(level);
  return Object.values(map).flat();
}

/** Barcha savollarni yuklaydi (faqat admin/eksport uchun) */
export async function loadAllQuestions(): Promise<Question[]> {
  const all: Question[] = [];
  for (const level of Object.keys(QUESTION_LOADERS) as Level[]) {
    all.push(...(await loadQuestionsForLevel(level)));
  }
  return all;
}
