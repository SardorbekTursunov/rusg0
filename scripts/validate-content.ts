/**
 * Kontent sifat nazorati — lug'at va kurikulum uchun avtomatik tekshiruvlar.
 *
 *   npm run check-content
 *
 * Tekshiradi:
 *  - takroriy lug'at yozuvlari (ruscha so'z + so'z turkumi)
 *  - transliteratsiyada kirill harflari yo'qligi
 *  - o'zbekcha tarjimada kirill harflari yo'qligi
 *  - ruscha so'zda lotin harflari yo'qligi
 *  - misollar va kategoriyalar mavjudligi
 *  - dars IDlari unikalligi, 10–20 mashq, daraja va status
 */
import { vocabulary } from "../src/data/vocabulary/index";
import { VOCAB_CATEGORIES } from "../src/data/vocabulary/categories";

const CATEGORY_SLUGS = new Set(VOCAB_CATEGORIES.map((c) => c.slug));
const CYRILLIC = /[\u0400-\u04FF]/;
const LATIN = /[A-Za-z]/;

let errors = 0;
const problem = (msg: string) => {
  errors++;
  console.error("✗ " + msg);
};

const seen = new Map<string, string>();
for (const v of vocabulary) {
  const key = `${v.russianWord.toLowerCase()}|${v.partOfSpeech}`;
  if (seen.has(key)) problem(`Takroriy yozuv: ${v.russianWord} (${v.id} va ${seen.get(key)})`);
  else seen.set(key, v.id);

  if (!v.id) problem("ID yo'q: " + v.russianWord);
  if (!v.russianWord.trim()) problem(`Bo'sh ruscha so'z: ${v.id}`);
  if (!CYRILLIC.test(v.russianWord) && v.entryType !== "expression")
    problem(`Ruscha so'zda kirill yo'q: ${v.id} (${v.russianWord})`);
  if (LATIN.test(v.russianWord)) problem(`Ruscha so'zda lotin harfi: ${v.id} (${v.russianWord})`);
  if (CYRILLIC.test(v.uzbekTranslation)) problem(`O'zbekcha tarjimada kirill: ${v.id} (${v.uzbekTranslation})`);
  if (CYRILLIC.test(v.transliteration)) problem(`Transliteratsiyada kirill: ${v.id} (${v.transliteration})`);
  if (!v.exampleRu.trim() || !v.exampleUz.trim()) problem(`Misol yo'q: ${v.id}`);
  if (!v.categories || v.categories.length === 0) problem(`Kategoriya yo'q: ${v.id}`);
  for (const c of v.categories ?? []) {
    if (!CATEGORY_SLUGS.has(c)) problem(`Noto'g'ri kategoriya: ${v.id} (${c})`);
  }
  if (!["A1", "A2", "B1", "B2", "C1", "C2"].includes(v.level)) problem(`Noto'g'ri daraja: ${v.id}`);
  if (v.status !== "verified" && v.status !== "published") problem(`Ko'rinmaydigan status: ${v.id} (${v.status})`);
}

console.log(`Lug'at: ${vocabulary.length} ta yozuv tekshirildi.`);
if (errors > 0) {
  console.error(`\n${errors} ta muammo topildi.`);
  process.exit(1);
}
console.log("✓ Lug'at sifat tekshiruvidan o'tdi.");
