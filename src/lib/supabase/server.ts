import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { supabaseAnonKey, supabaseUrl } from "@/lib/config";

/**
 * Server komponentlar uchun Supabase klienti (cookie asosidagi sessiya).
 * Faqat NEXT_PUBLIC_SUPABASE_URL / ANON_KEY sozlangan bo'lsa ishlaydi.
 * Service-role key bu yerda HECH QACHON ishlatilmaydi.
 */
export async function getSupabaseServerClient() {
  if (!supabaseUrl || !supabaseAnonKey) return null;
  const cookieStore = await cookies();
  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // Server komponentda cookie o'rnatib bo'lmaydi — sessiya middleware orqali.
        }
      },
    },
  });
}
