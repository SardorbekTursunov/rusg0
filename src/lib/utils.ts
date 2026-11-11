import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Tailwind klasslarini birlashtirish (shadcn uslubida) */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/** O'zbekcha apostrofni bir xil formatga keltirish: ' ʻ ’ → ' */
export function normalizeApostrophe(s: string): string {
  return s.replace(/[ʻ’ʼ´`]/g, "'");
}

/** Javoblarni solishtirish uchun normalizatsiya (katta/kichik harf, tinish, qo'shtirnoq) */
export function normalizeAnswer(s: string): string {
  return normalizeApostrophe(s)
    .toLowerCase()
    .replace(/[«»"'`.,!?;:()-]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** Ikki javob tengmi (normalizatsiya qilingan holda) */
export function answersMatch(a: string, b: string): boolean {
  return normalizeAnswer(a) === normalizeAnswer(b);
}

/** Sana → lokal YYYY-MM-DD (foydalanuvchining vaqt mintaqasi bo'yicha) */
export function localDateKey(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** ISO sana yoki bugun */
export function todayKey(): string {
  return localDateKey(new Date());
}

/** Hafta boshish (dushanba) sanasi — haftalik reyting uchun */
export function weekStartKey(d: Date = new Date()): string {
  const copy = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const day = copy.getDay(); // 0 = yakshanba
  const diff = day === 0 ? 6 : day - 1; // dushanba = hafta boshi
  copy.setDate(copy.getDate() - diff);
  return localDateKey(copy);
}

/** Kunlar orasidagi farq (kunlarda) */
export function daysBetween(aKey: string, bKey: string): number {
  const a = new Date(aKey + "T00:00:00");
  const b = new Date(bKey + "T00:00:00");
  return Math.round((b.getTime() - a.getTime()) / 86400000);
}

/** ISO → lokal ko'rinish: "9-noy 2026" */
export function formatDateUz(iso: string): string {
  const months = [
    "yanvar", "fevral", "mart", "aprel", "may", "iyun",
    "iyul", "avgust", "sentabr", "oktabr", "noyabr", "dekabr",
  ];
  const d = new Date(iso);
  return `${d.getDate()}-${months[d.getMonth()]} ${d.getFullYear()}`;
}

/** Sonni ko'rinishga moslash: 1234 → "1 234" */
export function formatNumber(n: number): string {
  return new Intl.NumberFormat("ru-RU").format(n);
}

/** Nisbat → foiz (0-100, yaxlitlangan) */
export function percent(correct: number, total: number): number {
  if (total <= 0) return 0;
  return Math.round((correct / total) * 100);
}

/** Unikal id yaratish */
export function uid(prefix = "id"): string {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

/** Matnni "gap" qilinishi uchun birinchi harfni katta qilish */
export function capitalize(s: string): string {
  return s.length === 0 ? s : s[0].toUpperCase() + s.slice(1);
}

/** Satrlar massivini tartibli gapga birlashtirish (tinish belgilari bo'shliqsiz) */
export function formatSentence(tokens: string[]): string {
  let out = "";
  for (const t of tokens) {
    if (/^[,.!?;:…]$/.test(t)) {
      out += t;
    } else {
      out += out === "" ? t : " " + t;
    }
  }
  return out;
}

/** Xato javoblar soni → aniqlik foizi */
export function accuracyPct(correct: number, total: number): number {
  return percent(correct, total);
}
