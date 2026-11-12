/**
 * seed.sql ni SQL Editor'ga sig'adigan kichik bo'laklarga ajratadi.
 *
 *   npx tsx scripts/split-seed.ts
 *
 * Natija: supabase/seed-parts/seed-part-01.sql ... (har biri begin/commit bilan)
 * Har bir bo'lak to'liq mustaqil — ketma-ket bajarsa natija bir xil.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// UTF-8 BOM — Windows PowerShell Get-Content faylni to'g'ri o'qishi uchun
const BOM = "\uFEFF";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const src = readFileSync(join(__dirname, "..", "supabase", "seed.sql"), "utf8");

// --- Statementlarga ajratish (';' tashqarisida, '' qochishlarni hisobga olib) ---
const statements: string[] = [];
let buf = "";
let inQuote = false;
for (let i = 0; i < src.length; i++) {
  const ch = src[i];
  if (inQuote) {
    buf += ch;
    if (ch === "'") {
      if (src[i + 1] === "'") {
        buf += "'";
        i++;
      } else {
        inQuote = false;
      }
    }
    continue;
  }
  if (ch === "'") {
    inQuote = true;
    buf += ch;
    continue;
  }
  // SQL kommentariyasi: -- dan qator oxirigacha (apostroflarni hisobga olmaydi)
  if (ch === "-" && src[i + 1] === "-") {
    const nl = src.indexOf("\n", i);
    const end = nl === -1 ? src.length : nl;
    buf += src.slice(i, end);
    i = end - 1;
    continue;
  }
  if (ch === ";") {
    const s = buf.trim();
    if (s && s !== "begin" && s !== "commit") statements.push(s);
    buf = "";
    continue;
  }
  buf += ch;
}
const tail = buf.trim();
if (tail && tail !== "begin" && tail !== "commit") statements.push(tail);

// --- ~600 KB bo'laklarga yig'ish ---
const TARGET = 600 * 1024;
const outDir = join(__dirname, "..", "supabase", "seed-parts");
mkdirSync(outDir, { recursive: true });

let part = 1;
let cur: string[] = [];
let curSize = 0;
const flush = () => {
  if (cur.length === 0) return;
  const name = `seed-part-${String(part).padStart(2, "0")}.sql`;
  const body = `-- RusGo seed ${part}-bo'lak (avtomatik bo'lingan)\nbegin;\n\n${cur.join(
    ";\n\n",
  )};\n\ncommit;\n`;
  writeFileSync(join(outDir, name), BOM + body, "utf8");
  console.log(`${name}: ${(curSize / 1024).toFixed(0)} KB, ${cur.length} statement`);
  part++;
  cur = [];
  curSize = 0;
};

for (const s of statements) {
  const size = Buffer.byteLength(s, "utf8") + 3;
  if (curSize + size > TARGET && cur.length > 0) flush();
  cur.push(s);
  curSize += size;
}
flush();

console.log(`\nJami ${part - 1} bo'lak → supabase/seed-parts/`);
