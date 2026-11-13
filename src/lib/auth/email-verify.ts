"use client";

import { getSupabaseBrowserClient } from "@/lib/supabase/client";

/**
 * Email tasdiqlash (6 xonali kod) klient yordamchisi.
 * Supabase Auth'nin OTP mexanizmi bilan ishlaydi:
 *   - verifyOtp(type: "signup")  → kodni tasdiqlash + sessiya ochish
 *   - resend(type: "signup")     → kodni qayta yuborish
 * Xat shablonida {{ .Token }} ishlatilishi shart (Dashboard → Emails → Templates).
 */

/** Kodni tasdiqlash. null — muvaffaqiyat, aks holda o'zbekcha xato xabari */
export async function verifySignupCode(email: string, token: string): Promise<string | null> {
  const sb = getSupabaseBrowserClient();
  if (!sb) return "Supabase sozlanmagan.";
  const { error } = await sb.auth.verifyOtp({
    email: email.trim().toLowerCase(),
    token: token.trim(),
    type: "signup",
  });
  if (!error) return null;
  const msg = error.message.toLowerCase();
  if (msg.includes("expired")) return "Kod eskirgan. „Qayta yuborish“ tugmasini bosing.";
  if (msg.includes("invalid") || msg.includes("token"))
    return "Kod noto‘g‘ri. Pochtadagi kodni diqqat bilan kiriting.";
  if (msg.includes("attempts") || msg.includes("rate"))
    return "Juda ko‘p urinish. Bir necha daqiqa kutib turing.";
  return error.message;
}

/** Kodni qayta yuborish. null — muvaffaqiyat, aks holda o'zbekcha xato xabari */
export async function resendSignupCode(email: string): Promise<string | null> {
  const sb = getSupabaseBrowserClient();
  if (!sb) return "Supabase sozlanmagan.";
  const { error } = await sb.auth.resend({
    type: "signup",
    email: email.trim().toLowerCase(),
  });
  if (!error) return null;
  const msg = error.message.toLowerCase();
  if (msg.includes("rate") || msg.includes("60") || msg.includes("seconds"))
    return "Jud tez so‘roq. 1 daqiqa kutib turing va qayta bosing.";
  if (msg.includes("already confirmed"))
    return "Bu email allaqachon tasdiqlangan — login sahifasidan kiring.";
  return error.message;
}
