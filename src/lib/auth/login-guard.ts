"use client";

import { getSupabaseBrowserClient } from "@/lib/supabase/client";

/**
 * Login limit klient yordamchisi.
 * Bazadagi `login_attempts` jadvali va 3 ta RPC funksiya bilan ishlaydi:
 *   - check_login_allowed      → bloklanganmi? (login dan oldin)
 *   - register_login_failure   → parol xato bo'lsa
 *   - clear_login_failures     → muvaffaqiyatli kirganda tozalash
 * QAT'IY REJIM: 3 marta xato → 10 daqiqa blok (har keyingi blok 2 barobar).
 * Blok serverda saqlanadi — brauzerni tozalash yordam bermaydi.
 */

export const MAX_ATTEMPTS = 3;

export interface LoginCheckResult {
  allowed: boolean;
  remainingSeconds: number;
  attemptsLeft: number;
}

const FALLBACK: LoginCheckResult = {
  allowed: true,
  remainingSeconds: 0,
  attemptsLeft: MAX_ATTEMPTS,
};

/** Hisob bloklanganmi? (parolni tekshirishdan OLDIN chaqiriladi) */
export async function checkLoginAllowed(email: string): Promise<LoginCheckResult> {
  const sb = getSupabaseBrowserClient();
  if (!sb) return FALLBACK;
  try {
    const { data, error } = await sb.rpc("check_login_allowed", { p_email: email });
    if (error || !data || data.length === 0) return FALLBACK;
    const row = data[0];
    return {
      allowed: Boolean(row.allowed),
      remainingSeconds: Math.max(0, Number(row.remaining_seconds ?? 0)),
      attemptsLeft: Math.max(0, Number(row.attempts_left ?? MAX_ATTEMPTS)),
    };
  } catch {
    return FALLBACK;
  }
}

/** Parol xato bo'lganda chaqiriladi (hisoblagichni oshiradi / blok qo'yadi) */
export async function registerLoginFailure(email: string): Promise<void> {
  const sb = getSupabaseBrowserClient();
  if (!sb) return;
  try {
    await sb.rpc("register_login_failure", { p_email: email });
  } catch {
    // limit tizimi ishlamasa — login oddiy ishlashda davom etadi
  }
}

/** Muvaffaqiyatli kirganda chaqiriladi (hisoblagichni nolga tushiradi) */
export async function clearLoginFailures(email: string): Promise<void> {
  const sb = getSupabaseBrowserClient();
  if (!sb) return;
  try {
    await sb.rpc("clear_login_failures", { p_email: email });
  } catch {
    // e'tiborsiz o'tkazamiz
  }
}

/** Sekundni "9:41" ko'rinishga keltirish */
export function formatLockTime(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}
