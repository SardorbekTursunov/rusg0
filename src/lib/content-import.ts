import type {
  ContentStatus,
  ImportRowError,
  Level,
  VocabularyItem,
} from "@/types";
import { VOCAB_CATEGORIES, TOPIC_TO_CATEGORY, categoryTitleUz } from "@/data/vocabulary/categories";

// --------------------------------------------------------------------------
// CSV/JSON import quvuri — qatorlarni tekshirish, normallashtirish, dublikat
// aniqlash. Bu modul sof (pure) funksiyalardan iborat: ham demo, ham server
// tomonida ishlatiladi.
// --------------------------------------------------------------------------

export const LEVELS: Level[] = ["A1", "A2", "B1", "B2", "C1", "C2"];
const CATEGORY_SLUGS = new Set(VOCAB_CATEGORIES.map((c) => c.slug));

const FIELD_ALIASES: Record<string, string[]> = {
  russianWord: ["russianword", "russian_word", "russian", "ru", "word", "soz", "so'z"],
  uzbekTranslation: ["uzbektranslation", "uzbek_translation", "uzbek", "uz", "translation", "tarjima"],
  transliteration: ["transliteration", "translit", "transkripsiya"],
  partOfSpeech: ["partofspeech", "part_of_speech", "pos", "tur", "soz_turkumi"],
  level: ["level", "cefr", "daraja"],
  categories: ["categories", "category", "kategoriya", "kategoriyalar", "topic", "mavzu"],
  exampleRu: ["exampleru", "example_ru", "misol_ru", "example"],
  exampleUz: ["exampleuz", "example_uz", "misol_uz", "tarjima_misol"],
  gender: ["gender", "jins", "rod"],
  plural: ["plural", "koplik", "ko'plik"],
  synonyms: ["synonyms", "sinonimlar"],
  antonyms: ["antonyms", "antonimlar"],
  frequencyRank: ["frequencyrank", "frequency_rank", "frequency", "chastota"],
  difficulty: ["difficulty", "qiyinlik"],
  source: ["source", "manba"],
  status: ["status", "holat"],
  entryType: ["entrytype", "entry_type", "type", "tur"],
};

function canonicalKey(key: string): string {
  const cleaned = key.trim().toLowerCase().replace(/^\ufeff/, "");
  for (const [canon, aliases] of Object.entries(FIELD_ALIASES)) {
    if (aliases.includes(cleaned)) return canon;
  }
  return key.trim();
}

function normalizeRecord(raw: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(raw)) out[canonicalKey(k)] = v;
  return out;
}

/** Ruscha so'zni lotin transliteratsiyasiga o'giradi (translit berilmagan bo'lsa) */
export function transliterateRussian(input: string): string {
  const map: Record<string, string> = {
    а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "yo", ж: "zh",
    з: "z", и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o",
    п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f", х: "kh", ц: "ts",
    ч: "ch", ш: "sh", щ: "shch", ъ: "", ы: "y", ь: "", э: "e", ю: "yu",
    я: "ya",
  };
  return input
    .toLowerCase()
    .split("")
    .map((ch) => map[ch] ?? ch)
    .join("")
    .replace(/[^a-z0-9' -]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function splitList(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String).map((s) => s.trim()).filter(Boolean);
  if (typeof value !== "string") return [];
  return value
    .split(/[;,|]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

const CYRILLIC = /[\u0400-\u04FF]/;

export interface NormalizedRow {
  item?: VocabularyItem;
  error?: ImportRowError;
}

/** Bitta qatorni tekshirib, VocabularyItem yoki xato qaytaradi */
export function normalizeImportRow(
  rawInput: unknown,
  rowNumber: number,
  defaultStatus: ContentStatus,
): NormalizedRow {
  if (typeof rawInput !== "object" || rawInput === null) {
    return { error: { row: rowNumber, message: "Qator obyekt (JSON) bo'lishi kerak." } };
  }
  const raw = normalizeRecord(rawInput as Record<string, unknown>);
  const ru = String(raw.russianWord ?? "").trim();
  const uz = String(raw.uzbekTranslation ?? "").trim();
  const errors: string[] = [];

  if (!ru) errors.push("russianWord bo'sh.");
  if (!uz) errors.push("uzbekTranslation bo'sh.");
  if (ru && !CYRILLIC.test(ru)) errors.push("russianWord kirill yozuvida bo'lishi kerak.");
  if (uz && CYRILLIC.test(uz)) errors.push("uzbekTranslation kirill harflarini o'z ichiga olmasligi kerak.");

  const levelRaw = String(raw.level ?? "A1").trim().toUpperCase();
  const level = (LEVELS.includes(levelRaw as Level) ? levelRaw : "A1") as Level;
  if (!LEVELS.includes(levelRaw as Level)) errors.push(`Noto'g'ri level: ${levelRaw}.`);

  let categories = splitList(raw.categories)
    .map((c) => c.toLowerCase().replace(/\s+/g, "-"))
    .filter((c) => CATEGORY_SLUGS.has(c));
  if (categories.length === 0) {
    const topic = String(raw.categories ?? "").trim();
    const mapped = TOPIC_TO_CATEGORY[topic];
    categories = mapped ? [mapped] : ["everyday"];
  }

  const pos = String(raw.partOfSpeech ?? "ot").trim() || "ot";
  const transliteration =
    String(raw.transliteration ?? "").trim() || transliterateRussian(ru);
  if (transliteration && CYRILLIC.test(transliteration))
    errors.push("transliteration lotin yozuvida bo'lishi kerak.");

  const exampleRu = String(raw.exampleRu ?? "").trim();
  const exampleUz = String(raw.exampleUz ?? "").trim();

  if (errors.length > 0) {
    return {
      error: {
        row: rowNumber,
        message: errors.join(" "),
        raw: JSON.stringify(rawInput).slice(0, 300),
      },
    };
  }

  const freq = Number(raw.frequencyRank);
  const diff = Number(raw.difficulty);
  const statusRaw = String(raw.status ?? "").trim().toLowerCase();
  const status: ContentStatus = ["draft", "pending", "verified", "published", "rejected"].includes(
    statusRaw,
  )
    ? (statusRaw as ContentStatus)
    : defaultStatus;

  const id =
    `imp-` +
    ru
      .toLowerCase()
      .replace(/[^a-zа-яё0-9]+/gi, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 40) +
    "-" +
    Math.abs(hashString(`${ru}|${pos}`)).toString(36);

  const item: VocabularyItem = {
    id,
    russianWord: ru,
    uzbekTranslation: uz,
    transliteration,
    partOfSpeech: pos,
    exampleRu,
    exampleUz,
    audioUrl: null,
    level,
    topic: categories[0] ? categoryTitleUz(categories[0]) : "Boshqa",
    entryType: (["lemma", "form", "expression", "collocation"].includes(
      String(raw.entryType ?? ""),
    )
      ? raw.entryType
      : "lemma") as VocabularyItem["entryType"],
    meanings: [{ uz }],
    examples: exampleRu && exampleUz ? [{ ru: exampleRu, uz: exampleUz }] : [],
    categories,
    gender: (["m", "f", "n"].includes(String(raw.gender ?? ""))
      ? raw.gender
      : null) as VocabularyItem["gender"],
    plural: raw.plural ? String(raw.plural) : null,
    synonyms: splitList(raw.synonyms),
    antonyms: splitList(raw.antonyms),
    frequencyRank: Number.isFinite(freq) && freq > 0 ? freq : null,
    difficulty: Number.isFinite(diff) && diff >= 1 && diff <= 5 ? diff : undefined,
    status,
    source: String(raw.source ?? "CSV/JSON import"),
    verifiedAt: status === "verified" || status === "published" ? new Date().toISOString() : null,
  };

  return { item };
}

// --- CSV -------------------------------------------------------------------

/** Oddiy, lekin qo'shtirnoq va ko'p qatorli maydonlarni qo'llaydigan CSV parser */
export function parseCsv(text: string): { rows: Record<string, string>[]; errors: ImportRowError[] } {
  const rows: string[][] = [];
  let field = "";
  let row: string[] = [];
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ",") {
      row.push(field);
      field = "";
    } else if (ch === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else if (ch !== "\r") {
      field += ch;
    }
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  const nonEmpty = rows.filter((r) => r.some((c) => c.trim() !== ""));
  if (nonEmpty.length === 0) return { rows: [], errors: [] };
  const header = nonEmpty[0].map((h) => h.trim());
  const out: Record<string, string>[] = [];
  const errors: ImportRowError[] = [];
  for (let i = 1; i < nonEmpty.length; i++) {
    const cells = nonEmpty[i];
    if (cells.length !== header.length) {
      errors.push({
        row: i + 1,
        message: `Ustunlar soni mos emas: ${cells.length} (kutilgan ${header.length}).`,
        raw: cells.join(",").slice(0, 300),
      });
      continue;
    }
    const obj: Record<string, string> = {};
    header.forEach((h, idx) => {
      obj[h] = cells[idx] ?? "";
    });
    out.push(obj);
  }
  return { rows: out, errors };
}

/** Lug'at ro'yxatini CSV ga aylantirish (eksport) */
export function vocabularyToCsv(items: VocabularyItem[]): string {
  const header = [
    "russianWord",
    "uzbekTranslation",
    "transliteration",
    "partOfSpeech",
    "level",
    "categories",
    "exampleRu",
    "exampleUz",
    "gender",
    "plural",
    "synonyms",
    "antonyms",
    "frequencyRank",
    "difficulty",
    "entryType",
    "status",
    "source",
  ];
  const esc = (s: unknown) => {
    const str = String(s ?? "");
    return /[",\n]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
  };
  const lines = [header.join(",")];
  for (const v of items) {
    lines.push(
      [
        v.russianWord,
        v.uzbekTranslation,
        v.transliteration,
        v.partOfSpeech,
        v.level,
        (v.categories ?? []).join(";"),
        v.exampleRu,
        v.exampleUz,
        v.gender ?? "",
        v.plural ?? "",
        (v.synonyms ?? []).join(";"),
        (v.antonyms ?? []).join(";"),
        v.frequencyRank ?? "",
        v.difficulty ?? "",
        v.entryType ?? "lemma",
        v.status ?? "pending",
        v.source ?? "",
      ]
        .map(esc)
        .join(","),
    );
  }
  return lines.join("\n");
}

function hashString(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Dublikat kaliti: ruscha so'z + so'z turkumi (kichik harflarda) */
export function vocabKey(item: { russianWord: string; partOfSpeech: string }): string {
  return `${item.russianWord.trim().toLowerCase()}|${item.partOfSpeech.trim().toLowerCase()}`;
}

// --- Shablonlar -------------------------------------------------------------

export const VOCAB_IMPORT_HEADER = [
  "russianWord",
  "uzbekTranslation",
  "transliteration",
  "partOfSpeech",
  "level",
  "categories",
  "exampleRu",
  "exampleUz",
  "gender",
  "plural",
  "synonyms",
  "antonyms",
  "frequencyRank",
  "difficulty",
  "entryType",
] as const;

export const VOCAB_IMPORT_SAMPLE_CSV = [
  VOCAB_IMPORT_HEADER.join(","),
  'книга,kitob,kniga,ot,A1,education;everyday,Я читаю книгу.,Men kitob o‘qiyapman.,f,книги,,,1200,2,lemma',
].join("\n");

export const VOCAB_IMPORT_TEMPLATE_JSON = "[]\n";

export const VOCAB_IMPORT_SAMPLE_JSON = JSON.stringify(
  [
    {
      russianWord: "книга",
      uzbekTranslation: "kitob",
      transliteration: "kniga",
      partOfSpeech: "ot",
      level: "A1",
      categories: ["education", "everyday"],
      exampleRu: "Я читаю книгу.",
      exampleUz: "Men kitob o‘qiyapman.",
      gender: "f",
      plural: "книги",
      synonyms: [],
      antonyms: [],
      frequencyRank: 1200,
      difficulty: 2,
      entryType: "lemma",
    },
  ],
  null,
  2,
);
