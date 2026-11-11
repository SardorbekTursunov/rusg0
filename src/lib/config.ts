// ---------------------------------------------------------------------------
// RusGo — konfiguratsiya: Supabase mavjudmi yoki DEMO rejimi?
// ---------------------------------------------------------------------------

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** Supabase environment o'zgaruvchilari kiritilganmi? */
export const isSupabaseConfigured = Boolean(
  url && anonKey && url.startsWith("http") && anonKey.length > 20,
);

/** DEMO rejimi — Supabase sozlanmagan bo'lsa, ilova mahalliy namuna
 *  ma'lumotlar bilan to'liq ishlaydi (localStorage). */
export const isDemoMode = !isSupabaseConfigured;

export const supabaseUrl = url ?? "";
export const supabaseAnonKey = anonKey ?? "";

/** Demo rejim haqida xabar (setup ko'rsatmasi uchun) */
export const DEMO_NOTICE =
  "Supabase sozlanmagan — ilova DEMO rejimida ishmoqda. Ma'lumotlar brauzerda (localStorage) saqlanadi. Sozlash uchun .env.local faylini .env.example ko'rinishida to'ldiring.";
