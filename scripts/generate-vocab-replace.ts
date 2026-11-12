// RusGo — 500 so'zlik yangi asosiy lug'atni bazaga almashtirish SQL'ini yaratish
// Chiqish: supabase/vocabulary-replace-500.sql
// Ishga tushirish: npx tsx scripts/generate-vocab-replace.ts
//
// Eslatma: SQL ijro bo'lganda ESKI lug'at (366 yozuv) va unga bog'langan
// foydalanuvchi holatlari (user_vocabulary — SRS progress) o'chadi (cascade).

import { mkdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { VOCAB_500 } from "./vocab-500-data";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "supabase");
const outFile = join(outDir, "vocabulary-replace-500.sql");

// --- Ruscha → lotin transliteratsiya -----------------------------------------
const RU_MAP: Record<string, string> = {
  а: "a", б: "b", в: "v", г: "g", д: "d", ж: "zh", з: "z", и: "i",
  й: "y", к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r",
  с: "s", т: "t", у: "u", ф: "f", х: "kh", ц: "ts", ч: "ch", ш: "sh",
  щ: "shch", ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya",
};
const VOWELS = new Set(["а", "е", "ё", "и", "о", "у", "ы", "э", "ю", "я"]);

function transliterate(ru: string): string {
  let out = "";
  for (let i = 0; i < ru.length; i++) {
    const ch = ru[i].toLowerCase();
    if (ch === "е") {
      const prev = i > 0 ? ru[i - 1].toLowerCase() : "";
      out += i === 0 || VOWELS.has(prev) || prev === "ъ" || prev === "ь" || prev === "й"
        ? "ye"
        : "e";
      continue;
    }
    if (ch === "ё") {
      out += "yo";
      continue;
    }
    out += RU_MAP[ch] ?? ch;
  }
  return out;
}

// --- Kategoriyalar ------------------------------------------------------------
interface CatDef {
  topic: string;
  slug: string;
  defaultLevel: string;
}

const CATS: Record<number, CatDef> = {
  1: { topic: "Salomlashish", slug: "communication", defaultLevel: "A1" },
  2: { topic: "Oila", slug: "family", defaultLevel: "A1" },
  3: { topic: "Uy", slug: "home", defaultLevel: "A1" },
  4: { topic: "Oziq-ovqat", slug: "food", defaultLevel: "A1" },
  5: { topic: "Vaqt", slug: "time", defaultLevel: "A1" },
  6: { topic: "Maktab", slug: "school", defaultLevel: "A1" },
  7: { topic: "Fe'llar", slug: "everyday", defaultLevel: "A1" },
  8: { topic: "Sifatlar", slug: "personality", defaultLevel: "A1" },
  9: { topic: "Shahar", slug: "transport", defaultLevel: "A1" },
  10: { topic: "Texnologiya", slug: "technology", defaultLevel: "A2" },
};

/** Qo'shimcha kategoriyalar (ruscha so'z bo'yicha) */
const EXTRA_CATS: Record<string, string[]> = {
  Телефон: ["technology"],
  Учитель: ["education"],
  Ученик: ["education"],
  Студент: ["education"],
  Экзамен: ["education"],
  Библиотека: ["education"],
  Врач: ["medicine"],
  Больница: ["medicine"],
  Аптека: ["medicine"],
  Поликлиника: ["medicine"],
  Магазин: ["shopping"],
  Рынок: ["shopping"],
  Покупатель: ["shopping"],
  Деньги: ["finance"],
  Цена: ["finance"],
  Скидка: ["finance"],
  Касса: ["finance"],
  Банк: ["finance"],
  Автобус: ["travel"],
  Такси: ["travel"],
  Поезд: ["travel"],
  Самолёт: ["travel"],
  Метро: ["travel"],
  Велосипед: ["travel"],
  Мотоцикл: ["travel"],
  Машина: ["travel"],
  Аэропорт: ["travel"],
  Вокзал: ["travel"],
  Билет: ["travel"],
  Погода: ["weather"],
  Солнце: ["weather"],
  Дождь: ["weather"],
  Снег: ["weather"],
  Ветер: ["weather"],
  Небо: ["nature"],
  Земля: ["nature"],
  Спорт: ["sports"],
  Футбол: ["sports"],
  Музыка: ["culture"],
  Песня: ["culture"],
  Фильм: ["culture"],
  Кинотеатр: ["culture"],
  Музей: ["culture"],
  Интернет: ["internet"],
  Сайт: ["internet"],
  Приложение: ["internet"],
  Ссылка: ["internet"],
  Сообщение: ["internet"],
  Пароль: ["internet"],
  Логин: ["internet"],
  Аккаунт: ["internet"],
  Почта: ["internet"],
  "Зубная щётка": ["health"],
  "Зубная паста": ["health"],
  Мыло: ["health"],
  Шампунь: ["health"],
  Работа: ["work"],
  Работник: ["work"],
  Начальник: ["work"],
  Коллега: ["work"],
  Жизнь: ["society"],
};

/** Ibora sifatida belgilanadigan iboralar */
const EXPRESSIONS = new Set([
  "Здравствуйте", "Доброе утро", "Добрый день", "Добрый вечер",
  "Спокойной ночи", "До свидания", "Может быть", "Конечно же", "Потому что",
]);

// --- SQL yordamchilar ---------------------------------------------------------
function q(s: string): string {
  return `'${s.replace(/'/g, "''")}'`;
}
function qs(s: string | null | undefined): string {
  return s == null ? "null" : q(s);
}
function textArray(a: string[]): string {
  if (a.length === 0) return "'{}'";
  return `array[${a.map(q).join(", ")}]`;
}
function jsonb(v: unknown): string {
  return `${q(JSON.stringify(v))}::jsonb`;
}

// --- Ma'lumotni tahlil qilish -------------------------------------------------
interface Entry {
  id: string;
  russianWord: string;
  uzbekTranslation: string;
  transliteration: string;
  partOfSpeech: string;
  level: string;
  topic: string;
  categories: string[];
  entryType: "lemma" | "collocation" | "expression";
  difficulty: number;
}

const entries: Entry[] = [];
const seen = new Set<string>();

for (const [i, raw] of VOCAB_500.split("\n").entries()) {
  const line = raw.trim();
  if (!line) continue;
  const parts = line.split("|");
  if (parts.length < 4) throw new Error(`${i + 1}-qator noto'g'ri: ${line}`);
  const [ru, uz, catStr, pos, levelOverride] = parts.map((p) => p.trim());
  const cat = Number(catStr);
  const def = CATS[cat];
  if (!def) throw new Error(`${i + 1}-qator: noma'lum kategoriya ${cat}`);

  const ruKey = `${ru}#${cat}`;
  if (seen.has(ruKey)) throw new Error(`Takroriy yozuv: ${ru} (kat. ${cat})`);
  seen.add(ruKey);

  const level = levelOverride || def.defaultLevel;
  const extras = EXTRA_CATS[ru] ?? [];
  const categories = [def.slug, ...extras.filter((e) => e !== def.slug)];

  const isPhrase = ru.includes(" ");
  const entryType: Entry["entryType"] = EXPRESSIONS.has(ru)
    ? "expression"
    : isPhrase
      ? "collocation"
      : "lemma";

  entries.push({
    id: `v-${String(entries.length + 1).padStart(3, "0")}`,
    russianWord: ru,
    uzbekTranslation: uz,
    transliteration: transliterate(ru),
    partOfSpeech: pos,
    level,
    topic: def.topic,
    categories,
    entryType,
    difficulty: level === "A1" ? 1 : level === "A2" ? 2 : 3,
  });
}

if (entries.length !== 500) {
  throw new Error(`Kutilgan 500 ta yozuv, bor: ${entries.length}`);
}

// --- SQL yig'ish ---------------------------------------------------------------
const lines: string[] = [];
lines.push("-- RusGo — yangi asosiy lug'at: 500 ta so'z (10 mavzu)");
lines.push("-- ESKI lug'at (366) o'chiriladi va bu ro'yxat bilan ALMASHTIRILADI.");
lines.push("-- user_vocabulary (SRS holatlari) cascade bilan tozalanadi.");
lines.push("-- Qayta ishga tushirish xavfsiz (upsert).");
lines.push("");
lines.push("begin;");
lines.push("");
lines.push("-- Eski bog'lanishlarni tozalash (dars-so'z, foydalanuvchi holatlari cascade)");
lines.push("delete from public.lesson_vocabulary;");
lines.push("delete from public.vocabulary;");
lines.push("");

const VOC_COLS =
  "id, russian_word, uzbek_translation, transliteration, part_of_speech, example_ru, example_uz, " +
  "audio_url, level, topic, entry_type, meanings, examples, gender, plural, infinitive, forms, " +
  "synonyms, antonyms, word_family, categories, frequency_rank, difficulty, source, status, verified_at";

for (const v of entries) {
  lines.push(
    `insert into public.vocabulary (${VOC_COLS}) values (` +
      `${q(v.id)}, ${q(v.russianWord)}, ${q(v.uzbekTranslation)}, ${q(v.transliteration)}, ${q(v.partOfSpeech)}, ` +
      `${q("")}, ${q("")}, null, ${q(v.level)}, ${q(v.topic)}, ` +
      `${q(v.entryType)}, ${jsonb([{ uz: v.uzbekTranslation }])}, ${jsonb([])}, null, null, null, ` +
      `${jsonb([])}, ${textArray([])}, ${textArray([])}, ` +
      `${textArray([])}, ${textArray(v.categories)}, ${entries.indexOf(v) + 1}, ${v.difficulty}, ` +
      `${q("RusGo asosiy 500")}, ${q("verified")}, now()) ` +
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

lines.push("-- Kategoriya bog'lanishlari");
for (const v of entries) {
  const vals = v.categories.map((c) => `(${q(v.id)}, ${q(c)})`).join(", ");
  lines.push(
    `insert into public.vocabulary_entry_categories (vocabulary_id, category_slug) values ${vals} on conflict do nothing;`,
  );
}
lines.push("");

lines.push("commit;");
lines.push("");

mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, lines.join("\n"), "utf8");

const levels = entries.reduce<Record<string, number>>((acc, e) => {
  acc[e.level] = (acc[e.level] ?? 0) + 1;
  return acc;
}, {});

console.log(`SQL yaratildi: ${outFile}`);
console.log(
  `  yozuvlar: ${entries.length}, darajalar: ${JSON.stringify(levels)}, ` +
    `iboralar: ${entries.filter((e) => e.entryType !== "lemma").length}`,
);
