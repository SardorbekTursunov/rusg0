"use client";

import { motion } from "framer-motion";
import {
  Gamepad2,
  Languages,
  Target,
  BarChart3,
  Route,
  Check,
  PlayCircle,
  Trophy,
  Quote,
  Star,
} from "lucide-react";

const fade = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.45 },
};

// --------------------------------------------------------------------------
// Xususiyatlar
// --------------------------------------------------------------------------

const features = [
  {
    icon: Gamepad2,
    title: "O‘yin orqali o‘rganish",
    text: "Yuraklar, XP, streak va yutuqlar — darslar o‘yin kabi qiziqarli.",
    color: "bg-primary-soft text-primary",
  },
  {
    icon: Languages,
    title: "O‘zbek tilida tushuntirish",
    text: "Har bir xato uchun grammatika va lug‘atni o‘zbekcha tushuntiramiz.",
    color: "bg-accent-blue-soft text-[#0a7ba8]",
  },
  {
    icon: Target,
    title: "Kunlik maqsadlar",
    text: "Kuniga 20–50 XP maqsad qo‘ying va har kuni natijani kuzating.",
    color: "bg-accent-yellow-soft text-[#8a6d00]",
  },
  {
    icon: BarChart3,
    title: "O‘rganish statistikasi",
    text: "Haftalik grafik, aniqlik foizi va rivojlanish dinamikasi bitta joyda.",
    color: "bg-[#f0ebff] text-[#6b46c1]",
  },
];

export function Features() {
  return (
    <section id="kurslar" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
      <motion.div {...fade} className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          Nima uchun RusGo?
        </h2>
        <p className="mt-4 text-lg text-ink-soft">
          Oddiy, qiziqarli va samarali — nol darajadan B2 gacha.
        </p>
      </motion.div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            {...fade}
            transition={{ duration: 0.45, delay: i * 0.07 }}
            className="card flex flex-col p-6 transition-shadow hover:shadow-lg"
          >
            <span
              className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${f.color}`}
            >
              <f.icon size={22} />
            </span>
            <h3 className="text-base font-bold text-ink">{f.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{f.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// --------------------------------------------------------------------------
// O‘rganish yo‘li preview
// --------------------------------------------------------------------------

const pathItems = [
  { level: "A1", title: "Boshlang‘ich", items: ["Знакомство", "Алфавит", "Семья", "Школа", "Жизнь"], state: "active" },
  { level: "A2", title: "Elementar", items: ["Kundalik nutq", "Sayohat"], state: "soon" },
  { level: "B1", title: "O‘rta", items: ["Hikoya qilish", "Ish va o‘qish"], state: "soon" },
  { level: "B2", title: "Yuqori", items: ["Erkin muloqot"], state: "soon" },
];

export function PathPreview() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div {...fade} className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            O‘rganish yo‘lingiz
          </h2>
          <p className="mt-4 text-lg text-ink-soft">
            Har bir modul avvalgi dars tugagach ochiladi — bosqichma-bosqich.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {pathItems.map((lvl, i) => (
            <motion.div
              key={lvl.level}
              {...fade}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className={`card relative overflow-hidden p-6 ${
                lvl.state === "active" ? "ring-2 ring-primary" : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-extrabold ${
                    lvl.state === "active"
                      ? "bg-primary text-white"
                      : "bg-surface-2 text-ink-soft"
                  }`}
                >
                  {lvl.level}
                </span>
                <span className="text-sm font-bold text-ink">{lvl.title}</span>
              </div>

              <ul className="mt-5 space-y-2.5">
                {lvl.items.map((m, idx) => (
                  <li key={m} className="flex items-center gap-2.5 text-sm">
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
                        lvl.state === "active"
                          ? "bg-primary-soft text-primary-ink"
                          : "bg-surface-2 text-ink-faint"
                      }`}
                    >
                      {lvl.state === "active" ? <Check size={12} /> : idx + 1}
                    </span>
                    <span
                      className={
                        lvl.state === "active" ? "font-semibold text-ink" : "text-ink-soft"
                      }
                    >
                      {m}
                    </span>
                  </li>
                ))}
                {lvl.state === "soon" && (
                  <li className="pt-1 text-xs font-bold text-ink-faint">Tez orada</li>
                )}
              </ul>

              {lvl.state === "active" && (
                <span className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white shadow-[0_3px_0_0_var(--color-primary-dark)]">
                  <Route size={15} />
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --------------------------------------------------------------------------
// Qanday ishlaydi
// --------------------------------------------------------------------------

const steps = [
  {
    icon: PlayCircle,
    title: "Ro‘yxatdan o‘ting",
    text: "Bir necha soniyada hisob yarating va maqsadingizni tanlang.",
  },
  {
    icon: Route,
    title: "Kunlik darsni bajaring",
    text: "Har kuni 10 daqiqa: yangi so‘zlar, grammatika va mashqlar.",
  },
  {
    icon: Trophy,
    title: "Natijalarni ko‘ring",
    text: "XP to‘plang, streakni saqlang, reytingda yuqoriga chiqing.",
  },
];

export function HowItWorks() {
  return (
    <section id="qanday-ishlaydi" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
      <motion.div {...fade} className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          Qanday ishlaydi?
        </h2>
        <p className="mt-4 text-lg text-ink-soft">Uch qadam — va siz yo‘ldasiz.</p>
      </motion.div>

      <div className="relative mt-12 grid gap-8 md:grid-cols-3">
        <div
          aria-hidden="true"
          className="absolute left-[16%] right-[16%] top-9 hidden h-0.5 border-t-2 border-dashed border-line md:block"
        />
        {steps.map((s, i) => (
          <motion.div key={s.title} {...fade} transition={{ duration: 0.45, delay: i * 0.1 }} className="relative text-center">
            <span className="relative z-10 mx-auto flex h-18 w-18 items-center justify-center rounded-full bg-white ring-4 ring-primary-soft">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white">
                <s.icon size={24} />
              </span>
            </span>
            <div className="mx-auto mt-4 flex h-6 w-6 items-center justify-center rounded-full bg-accent-yellow text-xs font-extrabold text-ink">
              {i + 1}
            </div>
            <h3 className="mt-3 text-lg font-bold text-ink">{s.title}</h3>
            <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-ink-soft">
              {s.text}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// --------------------------------------------------------------------------
// Fikrlar (namuna kontent — aniq ko‘rsatilgan)
// --------------------------------------------------------------------------

const testimonials = [
  {
    name: "Aziza K.",
    role: "8-sinf o‘quvchisi",
    text: "Darslar juda qiziqarli. O‘zbekcha tushuntirishlar tufayli grammatikani birinchi marta tushundim!",
    avatar: "🦊",
  },
  {
    name: "Jasur E.",
    role: "Talaba",
    text: "Har kuni 10 daqiqa qilaman, bir oyda 300+ XP to‘pladim. Streak ushlab turish juda motivatsiya beradi.",
    avatar: "🐯",
  },
  {
    name: "Malika T.",
    role: "O‘qituvchi yordamchisi",
    text: "Tinglash mashqlari ajoyib — rus tilini eshitib o‘rganish juda oson bo‘ldi.",
    avatar: "🦄",
  },
];

export function Testimonials() {
  return (
    <section id="biz-haqimizda" className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div {...fade} className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            O‘quvchilarimiz fikri
          </h2>
          <p className="mt-3 inline-block rounded-full bg-surface-2 px-3 py-1 text-xs font-bold text-ink-soft">
            Namuna (demo) ma’lumotlar
          </p>
        </motion.div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              {...fade}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="card flex flex-col p-6"
            >
              <Quote size={22} className="text-primary" />
              <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">
                “{t.text}”
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-line pt-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-surface text-lg">
                  {t.avatar}
                </span>
                <div>
                  <p className="text-sm font-bold text-ink">{t.name}</p>
                  <p className="text-xs text-ink-soft">{t.role}</p>
                </div>
                <span className="ml-auto flex gap-0.5" aria-label="5 yulduz">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} size={13} className="fill-accent-yellow text-accent-yellow" />
                  ))}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
