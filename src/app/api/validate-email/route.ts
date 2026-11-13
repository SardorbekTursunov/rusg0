import { promises as dns } from "node:dns";

/**
 * Email tekshiruvi (ro'yxatdan o'tishda, kod kutmasdan darhol javob):
 *   1. Format to'g'riligi
 *   2. Domain'da pochta serveri bormi (DNS MX so'rovi)
 *   3. Vaqtinchalik pochtalar taqiqlangan
 *   4. Mashhur domain yozuv xatolari uchun tavsiya (gmail.con → gmail.com)
 *
 * BU TEKSHIRUV email MUVUJUDLIGINI 100% kafolatlamaydi — o'sha ishni
 * tasdiqlash kodi bajaradi. Bu faqat tez, aniq xatolarni erta ushlaydi.
 */

export const runtime = "nodejs";

interface ValidationResult {
  ok: boolean;
  message?: string;
  suggestion?: string;
}

// Mashhur domain xatolari → to'g'ri variant
const DOMAIN_TYPOS: Record<string, string> = {
  "gmail.con": "gmail.com",
  "gmail.co": "gmail.com",
  "gmail.cm": "gmail.com",
  "gmail.comm": "gmail.com",
  "gmail.om": "gmail.com",
  "gmai.com": "gmail.com",
  "gmial.com": "gmail.com",
  "gamil.com": "gmail.com",
  "gmaill.com": "gmail.com",
  "googlemail.con": "gmail.com",
  "hotmial.com": "hotmail.com",
  "hotmai.com": "hotmail.com",
  "hotmai.co": "hotmail.com",
  "hotmail.con": "hotmail.com",
  "outlok.com": "outlook.com",
  "outllok.com": "outlook.com",
  "outlook.con": "outlook.com",
  "yaho.com": "yahoo.com",
  "yahooo.com": "yahoo.com",
  "yahoo.con": "yahoo.com",
  "mail.con": "mail.ru",
  "mail.rı": "mail.ru",
  "mailr.ru": "mail.ru",
  "yandex.ry": "yandex.ru",
  "yandx.ru": "yandex.ru",
};

// Mashhur vaqtinchalik pochta xizmatlari (to'liq ro'yxat emas — eng keng tarqalganlari)
const DISPOSABLE_DOMAINS = new Set([
  "mailinator.com", "10minutemail.com", "guerrillamail.com", "guerrillamail.net",
  "yopmail.com", "yopmail.net", "tempmail.com", "temp-mail.org", "temp-mail.io",
  "tempmail.net", "tempmailo.com", "throwawaymail.com", "getnada.com", "nada.email",
  "dispostable.com", "maildrop.cc", "sharklasers.com", "grr.la", "spam4.me",
  "trashmail.com", "trashmail.net", "fakeinbox.com", "mailnesia.com",
  "mytemp.email", "tempinbox.com", "discard.email", "spamgourmet.com",
  "mohmal.com", "emailondeck.com", "mailcatch.com", "tempr.email",
  "1secmail.com", "1secmail.org", "1secmail.net", "mvrht.net", "moakt.com",
  "tmailor.com", "linshiyouxiang.net", "instantemailaddress.com",
  "internxt.com", " mailsac.com", "mailsac.com", "inboxbear.com",
  "mail-temp.com", "luxusmail.org", "burnermail.io", "harakirimail.com",
]);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

async function hasMailServer(domain: string): Promise<boolean> {
  try {
    const mx = await dns.resolveMx(domain);
    if (Array.isArray(mx) && mx.length > 0) return true;
  } catch {
    // MX yo'q — A yozuvini ham tekshiramiz (ba'zi serverlar A orqali ishlaydi)
    try {
      const a = await dns.resolve4(domain);
      if (Array.isArray(a) && a.length > 0) return true;
    } catch {
      return false;
    }
  }
  return true;
}

export async function POST(request: Request): Promise<Response> {
  let body: { email?: string };
  try {
    body = (await request.json()) as { email?: string };
  } catch {
    return Response.json({ ok: false, message: "Noto'g'ri so'rov." } satisfies ValidationResult, { status: 400 });
  }

  const raw = (body.email ?? "").trim().toLowerCase();

  // 1) Format
  if (!EMAIL_RE.test(raw)) {
    return Response.json(
      { ok: false, message: "Email formati noto'g'ri. Masalan: ism@example.com" } satisfies ValidationResult,
      { status: 200 },
    );
  }

  const domain = raw.split("@")[1];

  // 2) Yozuv xatolari (tezkor tekshiruv — DNS oldin)
  const correct = DOMAIN_TYPOS[domain];
  if (correct) {
    return Response.json(
      {
        ok: false,
        message: `Siz «${correct}» deb yozmoqchimisiz? «${domain}» mavjud emas.`,
        suggestion: correct,
      } satisfies ValidationResult,
      { status: 200 },
    );
  }

  // 3) Vaqtinchalik pochtalar
  if (DISPOSABLE_DOMAINS.has(domain)) {
    return Response.json(
      {
        ok: false,
        message: "Vaqtinchalik (vaqtli) pochta xizmatlari bilan ro'yxatdan o'tish taqiqlangan. Haqiqiy pochtangizni kiriting.",
      } satisfies ValidationResult,
      { status: 200 },
    );
  }

  // 4) Domain'da pochta serveri bormi? (DNS so'rovi)
  const alive = await hasMailServer(domain);
  if (!alive) {
    return Response.json(
      {
        ok: false,
        message: `«${domain}» domaini mavjud emas yoki pochta qabul qilmaydi. Emailni tekshirib qayta kiriting.`,
      } satisfies ValidationResult,
      { status: 200 },
    );
  }

  return Response.json({ ok: true } satisfies ValidationResult, { status: 200 });
}
