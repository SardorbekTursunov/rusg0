/**
 * Seed generator — kurikulum va lug'at ma'lumotlaridan supabase/seed.sql
 * faylini yaratadi. Ichki kontent o'zgargach qayta ishga tushiring:
 *
 *   npm run generate-seed
 *
 * Natija: supabase/seed.sql (idempotent — ON CONFLICT DO UPDATE).
 * 0002_content_expansion.sql migratsiyasidan KEYIN bajarilishi kerak.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { vocabulary } from "../src/data/vocabulary/index";
import { VOCAB_CATEGORIES } from "../src/data/vocabulary/categories";
import { achievements } from "../src/data/achievements";
import { dailyQuests } from "../src/data/quests";
import type { Lesson, Module, Question } from "../src/types";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const outDir = join(root, "supabase");
const outFile = join(outDir, "seed.sql");

const catalog = JSON.parse(
  readFileSync(join(root, "src/data/curriculum/generated/catalog.json"), "utf8"),
) as { modules: Module[]; lessons: Lesson[]; totals: { exercises: number } };

const LEVEL_SLUGS = ["a1", "a2", "b1", "b2", "c1", "c2"];
const questions: Question[] = LEVEL_SLUGS.flatMap((slug) => {
  const map = JSON.parse(
    readFileSync(
      join(root, `src/data/curriculum/generated/questions-${slug}.json`),
      "utf8",
    ),
  ) as Record<string, Question[]>;
  return Object.values(map).flat();
});

const modules = catalog.modules;
const lessons = catalog.lessons;
const moduleLevel = new Map(modules.map((m) => [m.id, m.level]));

// --- SQL yordamchilari -----------------------------------------------------

/** SQL string uchun apostrof escape */
function q(s: string): string {
  return `'${s.replace(/'/g, "''")}'`;
}

/** JSON payload uchun jsonb literalasi */
function jsonb(v: unknown): string {
  return `${q(JSON.stringify(v))}::jsonb`;
}

/** null yoki 'string' */
function qs(s: string | null | undefined): string {
  return s === null || s === undefined ? "null" : q(s);
}

function textArray(arr: string[] | undefined): string {
  if (!arr || arr.length === 0) return "'{}'::text[]";
  return `array[${arr.map(q).join(", ")}]`;
}

function questionText(p: Record<string, unknown>): string {
  return (
    (typeof p.prompt === "string" && p.prompt) ||
    (typeof p.source === "string" && p.source) ||
    (typeof p.sentence === "string" && p.sentence) ||
    (typeof p.speakText === "string" && p.speakText) ||
    (typeof p.promptUz === "string" && p.promptUz) ||
    (typeof p.ruText === "string" && p.ruText) ||
    ""
  );
}

const lines: string[] = [];

lines.push("-- ===========================================================================");
lines.push("-- RusGo — SEED (avtomatik generatsiya qilingan — qo'lda tahrirlamang)");
lines.push("-- Generatsiya: npm run generate-seed");
lines.push(
  `-- Modullar: ${modules.length} | Darslar: ${lessons.length} | Mashqlar: ${questions.length} | So'zlar: ${vocabulary.length}`,
);
lines.push("-- ===========================================================================");
lines.push("");
lines.push("begin;");
lines.push("");

// --- Kategoriyalar ----------------------------------------------------------
lines.push("-- Lug'at kategoriyalari (40 ta)");
for (const c of VOCAB_CATEGORIES) {
  lines.push(
    `insert into public.vocabulary_categories (slug, title_uz, title_ru) values (` +
      `${q(c.slug)}, ${q(c.titleUz)}, ${q(c.titleRu)}) ` +
      `on conflict (slug) do update set title_uz = excluded.title_uz, title_ru = excluded.title_ru;`,
  );
}
lines.push("");

// --- Modullar ---------------------------------------------------------------
lines.push("-- Modullar");
for (const m of modules) {
  lines.push(
    `insert into public.modules (id, level, order_index, title, title_uz, description) values (` +
      `${q(m.id)}, ${q(m.level)}, ${m.orderIndex}, ${q(m.title)}, ${q(m.titleUz)}, ${q(m.description)}) ` +
      `on conflict (id) do update set level = excluded.level, order_index = excluded.order_index, ` +
      `title = excluded.title, title_uz = excluded.title_uz, description = excluded.description;`,
  );
}
lines.push("");

// --- Darslar ----------------------------------------------------------------
lines.push("-- Darslar (CEFR, maqsadlar, grammatika, o'qish/tinglash, nashr holati)");
for (const l of lessons) {
  const level = l.level ?? moduleLevel.get(l.moduleId) ?? "A1";
  lines.push(
    `insert into public.lessons (` +
      `id, module_id, order_index, title, title_ru, description, xp_reward, estimated_minutes, ` +
      `level, objectives, grammar_topic, grammar_explanation, vocabulary_ids, examples, ` +
      `reading_text, reading_title, listening_text, prerequisites, completion_criteria, tags, ` +
      `status, published, source, exercise_count) values (` +
      `${q(l.id)}, ${q(l.moduleId)}, ${l.orderIndex}, ${q(l.title)}, ${q(l.titleRu)}, ${q(l.description)}, ` +
      `${l.xpReward}, ${l.estimatedMinutes}, ${q(level)}, ${textArray(l.objectives)}, ` +
      `${qs(l.grammarTopic)}, ${qs(l.grammarExplanation)}, ${textArray(l.vocabularyIds)}, ` +
      `${jsonb(l.examples ?? [])}, ${qs(l.readingText)}, ${qs(l.readingTitle)}, ${qs(l.listeningText)}, ` +
      `${textArray(l.prerequisites)}, ${jsonb(l.completionCriteria ?? { minScore: 70 })}, ` +
      `${textArray(l.tags)}, ${q(l.status ?? "published")}, ${l.published ?? true}, ` +
      `${qs(l.source ?? "handcrafted")}, ${l.exerciseCount ?? 0}) ` +
      `on conflict (id) do update set module_id = excluded.module_id, order_index = excluded.order_index, ` +
      `title = excluded.title, title_ru = excluded.title_ru, description = excluded.description, ` +
      `xp_reward = excluded.xp_reward, estimated_minutes = excluded.estimated_minutes, level = excluded.level, ` +
      `objectives = excluded.objectives, grammar_topic = excluded.grammar_topic, ` +
      `grammar_explanation = excluded.grammar_explanation, vocabulary_ids = excluded.vocabulary_ids, ` +
      `examples = excluded.examples, reading_text = excluded.reading_text, ` +
      `reading_title = excluded.reading_title, listening_text = excluded.listening_text, ` +
      `prerequisites = excluded.prerequisites, completion_criteria = excluded.completion_criteria, ` +
      `tags = excluded.tags, status = excluded.status, published = excluded.published, ` +
      `source = excluded.source, exercise_count = excluded.exercise_count;`,
  );
}
lines.push("");

// --- Mashqlar ---------------------------------------------------------------
lines.push("-- Mashqlar (payload — asosiy ma'lumot, qolgan ustunlar qidiruv uchun)");
for (const question of questions) {
  const p = question.payload as unknown as Record<string, unknown>;
  const options = Array.isArray(p.options) ? (p.options as string[]) : undefined;
  const correct = p.correctIndex ?? p.correctAnswer ?? null;
  lines.push(
    `insert into public.lesson_exercises (` +
      `id, lesson_id, order_index, exercise_type, explanation_uz, payload, ` +
      `question_text, options, correct_answer) values (` +
      `${q(question.id)}, ${q(question.lessonId)}, ${question.orderIndex}, ${q(question.type)}, ` +
      `${q(question.explanationUz)}, ${jsonb(question.payload)}, ${q(questionText(p))}, ` +
      `${options ? textArray(options) : "null"}, ${jsonb(correct)}) ` +
      `on conflict (id) do update set lesson_id = excluded.lesson_id, order_index = excluded.order_index, ` +
      `exercise_type = excluded.exercise_type, explanation_uz = excluded.explanation_uz, ` +
      `payload = excluded.payload, question_text = excluded.question_text, ` +
      `options = excluded.options, correct_answer = excluded.correct_answer;`,
  );
}
lines.push("");

// --- Lug'at -----------------------------------------------------------------
lines.push("-- Lug'at (boy maydonlar + qidiruv uchun ustunlar)");
for (const v of vocabulary) {
  lines.push(
    `insert into public.vocabulary (` +
      `id, russian_word, uzbek_translation, transliteration, part_of_speech, example_ru, example_uz, ` +
      `audio_url, level, topic, entry_type, meanings, examples, gender, plural, infinitive, forms, ` +
      `synonyms, antonyms, word_family, categories, frequency_rank, difficulty, source, status, verified_at) values (` +
      `${q(v.id)}, ${q(v.russianWord)}, ${q(v.uzbekTranslation)}, ${q(v.transliteration)}, ${q(v.partOfSpeech)}, ` +
      `${q(v.exampleRu)}, ${q(v.exampleUz)}, ${qs(v.audioUrl)}, ${q(v.level)}, ${q(v.topic)}, ` +
      `${q(v.entryType ?? "lemma")}, ${jsonb(v.meanings ?? [{ uz: v.uzbekTranslation }])}, ` +
      `${jsonb(v.examples ?? [])}, ${qs(v.gender)}, ${qs(v.plural)}, ${qs(v.infinitive)}, ` +
      `${jsonb(v.forms ?? [])}, ${textArray(v.synonyms)}, ${textArray(v.antonyms)}, ` +
      `${textArray(v.wordFamily)}, ${textArray(v.categories)}, ` +
      `${v.frequencyRank ?? "null"}, ${v.difficulty ?? "null"}, ` +
      `${qs(v.source ?? "RusGo seed")}, ${q(v.status ?? "verified")}, ${qs(v.verifiedAt ?? null)}) ` +
      `on conflict (id) do update set russian_word = excluded.russian_word, ` +
      `uzbek_translation = excluded.uzbek_translation, transliteration = excluded.transliteration, ` +
      `part_of_speech = excluded.part_of_speech, example_ru = excluded.example_ru, ` +
      `example_uz = excluded.example_uz, audio_url = excluded.audio_url, level = excluded.level, ` +
      `topic = excluded.topic, entry_type = excluded.entry_type, meanings = excluded.meanings, ` +
      `examples = excluded.examples, gender = excluded.gender, plural = excluded.plural, ` +
      `infinitive = excluded.infinitive, forms = excluded.forms, synonyms = excluded.synonyms, ` +
      `antonyms = excluded.antonyms, word_family = excluded.word_family, categories = excluded.categories, ` +
      `frequency_rank = excluded.frequency_rank, difficulty = excluded.difficulty, ` +
      `source = excluded.source, status = excluded.status, verified_at = excluded.verified_at;`,
  );
}
lines.push("");

// --- Lug'at: normalizatsiya jadvallari --------------------------------------
lines.push("-- Lug'at: kategoriya bog'lanishlari, ma'nolar, misollar, shakllar");
for (const v of vocabulary) {
  for (const c of v.categories ?? []) {
    lines.push(
      `insert into public.vocabulary_entry_categories (vocabulary_id, category_slug) values (` +
        `${q(v.id)}, ${q(c)}) on conflict do nothing;`,
    );
  }
  (v.meanings ?? []).forEach((m, i) => {
    lines.push(
      `insert into public.vocabulary_meanings (vocabulary_id, meaning_index, uz, note_uz) values (` +
        `${q(v.id)}, ${i}, ${q(m.uz)}, ${qs(m.note)}) ` +
        `on conflict (vocabulary_id, meaning_index) do update set uz = excluded.uz, ` +
        `note_uz = excluded.note_uz;`,
    );
  });
  (v.examples ?? []).forEach((ex, i) => {
    lines.push(
      `insert into public.vocabulary_examples (vocabulary_id, example_index, ru, uz) values (` +
        `${q(v.id)}, ${i}, ${q(ex.ru)}, ${q(ex.uz)}) ` +
        `on conflict (vocabulary_id, example_index) do update set ru = excluded.ru, uz = excluded.uz;`,
    );
  });
  (v.forms ?? []).forEach((f, i) => {
    lines.push(
      `insert into public.vocabulary_forms (vocabulary_id, form_index, form, label) values (` +
        `${q(v.id)}, ${i}, ${q(f.form)}, ${q(f.label)}) ` +
        `on conflict (vocabulary_id, form_index) do update set form = excluded.form, label = excluded.label;`,
    );
  });
}
lines.push("");

// --- Dars ↔ lug'at -----------------------------------------------------------
lines.push("-- Dars ↔ lug'at bog'lanishlari");
for (const l of lessons) {
  for (const vocabId of l.vocabularyIds ?? []) {
    lines.push(
      `insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values (` +
        `${q(l.id)}, ${q(vocabId)}) on conflict do nothing;`,
    );
  }
}
lines.push("");

// --- Yutuqlar (SQL mantiqi uchun) -------------------------------------------
lines.push("-- Yutuqlar (unlock_achievements funksiyasi shu jadvaldan foydalanadi)");
for (const a of achievements) {
  lines.push(
    `insert into public.achievements (id, title, description, icon, xp_reward, condition_type, condition_value) values (` +
      `${q(a.id)}, ${q(a.title)}, ${q(a.description)}, ${q(a.icon)}, ${a.xpReward}, ` +
      `${q(a.conditionType)}, ${a.conditionValue}) ` +
      `on conflict (id) do update set title = excluded.title, description = excluded.description, ` +
      `icon = excluded.icon, xp_reward = excluded.xp_reward, condition_type = excluded.condition_type, ` +
      `condition_value = excluded.condition_value;`,
  );
}
lines.push("");

// --- Kunlik vazifalar -------------------------------------------------------
lines.push("-- Kunlik vazifalar (bump_quest funksiyasi shu jadvaldan foydalanadi)");
for (const d of dailyQuests) {
  lines.push(
    `insert into public.daily_quests (id, title, description, quest_type, target_value, xp_reward) values (` +
      `${q(d.id)}, ${q(d.title)}, ${q(d.description)}, ${q(d.questType)}, ${d.targetValue}, ${d.xpReward}) ` +
      `on conflict (id) do update set title = excluded.title, description = excluded.description, ` +
      `quest_type = excluded.quest_type, target_value = excluded.target_value, xp_reward = excluded.xp_reward;`,
  );
}
lines.push("");

lines.push("commit;");
lines.push("");

mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, lines.join("\n"), "utf8");

console.log(`Seed yaratildi: ${outFile}`);
console.log(
  `  modullar: ${modules.length}, darslar: ${lessons.length}, mashqlar: ${questions.length}, ` +
    `so'zlar: ${vocabulary.length}, kategoriyalar: ${VOCAB_CATEGORIES.length}, ` +
    `yutuqlar: ${achievements.length}, vazifalar: ${dailyQuests.length}`,
);
