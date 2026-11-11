# RusGo 🇷🇺 — Rus tilini oson o'rgan!

**RusGo** — o'zbek tilida interfeysga ega, o'yin elementlari bilan boyitilgan (gamified)
rus tili o'quv platformasi. Next.js (App Router) + TypeScript + Tailwind CSS + Supabase
asosida qurilgan.

> **DEMO rejimi:** Supabase sozlanmagan bo'lsa, ilova to'liq funksional DEMO rejimida
> ishlaydi (ma'lumotlar brauzer localStorage'ida saqlanadi) — qo'shimcha hech nima
> o'rnatish shart emas.

---

## ✨ Imkoniyatlar

### O'quv kontenti — A1 dan C2 gacha 500 dars

| Daraja | Darslar | Modullar | Mazmun |
|---|---|---|---|
| A1 | 80 | 16 | Alifbo, tanishuv, oila, maktab, kundalik hayot |
| A2 | 80 | 16 | Sayohat, xarid, sog'liq, ob-havo, bo'sh vaqt |
| B1 | 90 | 18 | Ish, ta'lim, shahar, madaniyat, munosabatlar |
| B2 | 90 | 18 | Biznes, fan, media, jamiyat, argumentatsiya |
| C1 | 80 | 16 | Akademik til, adabiyot, idiomalar, rasmiy uslub |
| C2 | 80 | 16 | Badiiy matn, nozik ma'nolar, deyarli ona tili |

- **100 modul × 5 aspekt darsi = 500 dars** (lug'at, grammatika, tinglash, o'qish, amaliyot)
- **6 943 ta mashq** — har bir darsda **11–14 ta**, 8 xil tur:
  `multiple_choice`, `translation`, `word_matching`, `sentence_building`,
  `fill_blank`, `listening`, `true_false`, `word_selection`
- Har bir darsda: **ID**, ruscha/o'zbekcha sarlavha, o'zbekcha izoh, **maqsadlar**,
  **lug'at IDlari**, **grammatika mavzusi va izohi**, **namuna gaplar**, **o'qish matni**,
  **tinglash matni**, **oldindan bilish shartlari**, **bajarish mezoni**, teglar,
  CEFR darajasi, davomiylik, XP va nashr holati
- Darslar ketma-ket ochiladi; A1 dan boshlab butun yo'l bo'ylab qulf ochiladi
- Har bir noto'g'ri javob uchun **o'zbekcha tushuntirish**

### Lug'at — 1 000 000+ yozuvga tayyor infratuzilma

- Seed holatida **366 ta qo'lda tekshirilgan yozuv** (soxta/qavatlangan yozuvlar yo'q)
- **40 ta mavzu-kategoriya**, bitta yozuv bir nechta kategoriyaga tegishli bo'lishi mumkin
- Boy yozuv modeli: ma'nolar, transliteratsiya, so'z turkumi, jins, ko'plik, infinitiv,
  grammatik shakllar, so'z oilasi, sinonim/antonimlar, misollar, CEFR, chastota reytingi,
  qiyinlik, audio, manba va **tekshiruv holati**
- Yozuv turlari: **lemma / forma / ibora / birikma** (collocation)
- **Kengaytirilgan qidiruv** — ruscha, o'zbekcha va transliteratsiya bo'yicha:
  - 250 ms debounce, avtoto'ldirish (autocomplete), natijalarda mos qismni ajratish
  - Daraja, kategoriya, so'z turkumi, yozuv turi, sevimli/o'rganilgan filtrlari
  - Saralash: chastota, alifbo, daraja, yangilik; sahifalash va sahifa hajmi
  - **PostgreSQL FTS (`tsvector` + GIN) va trigram (`pg_trgm`) indekslari**
  - Supabase rejimida barcha filtrlash/sahifalash **serverda** (`search_vocabulary` RPC);
    brauzerga butun jadval yuklanmaydi
- Talaffuz (Web Speech API), sevimli va o'rganilgan belgilash

### SRS — SM-2 asosidagi takrorlash, 8 rejim

`ease factor`, interval, repetitions va keyingi takrorlash sanasi har bir foydalanuvchi
uchun alohida saqlanadi. To'g'ri javob: ease +0.1, interval 1 → 3 → oldingi × ease.
Xato: ease −0.2 (min 1.3), repetitions 0, 10 daqiqadan keyin qayta.

| Rejim | Tavsif |
|---|---|
| Kartochka | Ko'rib, o'zingiz baholaysiz |
| RU → UZ | Ruscha so'zdan o'zbekcha tarjimani tanlash |
| UZ → RU | O'zbekchadan ruscha so'zni tanlash |
| Tinglash | TTS talaffuzini eshitib tarjimani tanlash |
| Imlo | Ruscha so'zni yozish (ё/е va tinish belgilariga tolerant) |
| Gap to'ldirish | Misol gapdagi bo'sh joyni to'ldirish |
| Test | Aralash yo'nalishdagi tez test |
| Aralash | Har bir kartada tasodifiy rejim |

### Ommaviy import va eksport

- **CSV va JSON** fayllardan lug'at yuklash (`.csv`, `.json`)
- **Shablonlar**: to'liq ustunlar ro'yxati va namuna qatorlar (admin panelda yuklab olinadi)
- Har bir qator **validatsiya** qilinadi: majburiy maydonlar, daraja, kategoriya,
  jins, chastota, qiyinlik, dublikatlar
- **Bo'laklab (batch) yuborish**: 25 / 50 / 100 / 250 / 500 qator
- **Jonli progress**, import tarixi, har bir ish bo'yicha **xatolar jadvali**
- **Davom ettirish (resume)** — uzilgan import uchun brauzerda saqlangan qatorlar
- **Qayta urinish** va xatolarni **CSV** ko'rinishida yuklab olish
- Import qilingan yozuvlar standart holatda **`pending`** — avtomatik tasdiqlanmaydi
- **Eksport**: tekshirilgan/nashr etilgan lug'atni CSV yoki JSON ko'rinishida yuklab olish

### Kontent sifat nazorati (QC)

- Holatlar: **draft → pending → verified → published** (va `rejected`)
- **O'quvchilar faqat `verified` va `published` kontentni ko'radi** (RLS + store filtri)
- Import qilingan va AI tarjimalar **hech qachon avtomatik verified bo'lmaydi**
- Admin ko'rib chiqish sahifasi (`/admin/reviews`): tasdiqlash, nashr etish,
  rad etish, qoralamaga qaytarish; holat bo'yicha tablar va qidiruv
- Supabase rejimida o'zgarishlar `content_reviews` jurnalida saqlanadi

### Admin panel

- Umumiy statistika + kontent holati kesimi (`getContentCounts`)
- **Darslar CMS**: CEFR, holat/nashr, modul, tartib, XP, davomiylik, maqsadlar,
  grammatika, lug'at IDlari, namunalar, o'qish/tinglash matni, oldingi darslar,
  teglar, minimal ball; savollarni tahrirlash/o'chirish
- **Lug'at CMS**: boy maydonlar, kategoriyalar, jins/ko'plik, chastota,
  sinonim/antonim, holat va yozuv turi
- **Import** va **Sifat nazorati** bo'limlari

### O'yin elementlari (gamification)

- **XP tizimi** — dars uchun XP, mukammal darsga +5 bonus
- **Streak** — kunlik ketma-ket o'rganish (mahalliy sana bo'yicha)
- **Yuraklar** — xatolar yuraklarni sarflaydi (sozlamada o'chirsa bo'ladi)
- **Kunlik maqsad** — 20 / 30 / 50 XP
- **Kunlik vazifalar** — 3 ta vazifa, bajarilsa +20 XP
- **12 ta yutuq** — shart bajarilsa avtomatik ochiladi
- **Haftalik reyting** — 4 liga (Bronza / Kumush / Oltin / Almaz)
- **12 ta avatar** — emoji hayvonchalar

### Texnik jihatdan

- **Ikki rejimli data qatlam** — bitta `AppStore` interfeysi:
  - **DEMO**: localStorage + seed demo foydalanuvchilar
  - **Supabase**: RLS himoyalangan jadvallar + RPC (XP mantiqi **server tomonida**)
- **Katta hajmdagi kontent**: dars katalogi statik, mashqlar daraja bo'yicha
  **lazy** yuklanadi; lug'at qidiruvi server tomonda sahifalanadi
- **Xavfsizlik**: XP hisobi, streak, vazifalar va yutuqlar faqat SQL funksiyalarida
  (`SECURITY DEFINER`); profilda `role`, `total_xp` ustunlari client tomonidan
  o'zgartirib bo'lmaydi (trigger bilan himoyalangan)
- **To'liq o'zbekcha interfeys**, Inter shrifti, dizayn tokenlari (RusGo brendi)
- Skeleton yuklanishlari, toast bildirishnomalari, modal, keyboard-friendly

---

## 🚀 O'rnatish va ishga tushirish

```bash
# 1) Bog'liqliklarni o'rnatish
npm install

# 2) DEMO rejimida ishga tushirish (Supabase shart emas)
npm run dev
# → http://localhost:3000
```

### DEMO rejimidagi tayyor hisoblar

| Rol | Email | Parol |
|---|---|---|
| Admin | `admin@rusgo.uz` | `admin1234` |
| Oddiy foydalanuvchi | `dilnoza@demo.rusgo` | `demo1234` |

> Birinchi kirishingizda **onboarding** (4 qadam) ko'rsatiladi.

### Supabase rejimini sozlash

```bash
# 1) .env.local yarating
cp .env.example .env.local
# qiymatlarni Supabase dashboard → Project Settings → API dan to'ldiring:
#   NEXT_PUBLIC_SUPABASE_URL=...
#   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
#   SUPABASE_SERVICE_ROLE_KEY=...   (server uchun, brauzerga uzatilmaydi)

# 2) Migratsiyalarni tartib bilan qo'llang (Supabase SQL Editor yoki CLI):
#    supabase/migrations/0001_schema.sql            → asosiy sxema + RLS + RPC
#    supabase/migrations/0002_content_expansion.sql → 500 dars, FTS/trigram, import, QC, SM-2

# 3) Kontentni yuklang (idempotent)
#    supabase/seed.sql

# 4) Kontent yangilansa qayta generatsiya qiling
npm run generate-curriculum   # 500 dars + mashqlar JSON
npm run generate-seed         # supabase/seed.sql
npm run validate:content      # sifat tekshiruvi
```

`npm run dev` → ilova avtomatik ravishda Supabase rejimiga o'tadi.

### Admin rolini berish (Supabase rejimi)

```sql
update public.profiles set role = 'admin' where id = '<user-uuid>';
```

---

## 🛠️ Buyruqlar

| Buyruq | Vazifa |
|---|---|
| `npm run dev` | Lokal ishlab chiqish serveri |
| `npm run build` | Ishlab chiqarish buildi |
| `npm start` | Ishlab chiqarish serveri |
| `npm run lint` | ESLint tekshiruvi |
| `npm run typecheck` | TypeScript tekshiruvi (`tsc --noEmit`) |
| `npm run generate-curriculum` | 500 darslik katalog + mashqlar JSON |
| `npm run generate-seed` | `supabase/seed.sql` ni qayta generatsiya qilish |
| `npm run validate:content` | Lug'at va kurikulum sifat tekshiruvi |

---

## 📁 Loyiha tuzilishi

```
rusgo/
├── supabase/
│   ├── migrations/0001_schema.sql            # asosiy sxema + RLS + RPC
│   ├── migrations/0002_content_expansion.sql # CEFR, FTS, import, QC, SM-2
│   └── seed.sql                              # avtomatik generatsiya
├── scripts/
│   ├── content/curriculum-plan.ts   # 100 modul rejasi (A1–C2)
│   ├── generate-curriculum.ts       # 500 dars + 6 943 mashq generatori
│   ├── generate-seed.ts             # TS/JSON kontent → SQL seed
│   ├── validate-content.ts          # lug'at tekshiruvi
│   └── validate-curriculum.ts       # kurikulum tekshiruvi
└── src/
    ├── app/
    │   ├── page.tsx                 # landing
    │   ├── login/ register/         # autentifikatsiya
    │   ├── onboarding/              # 4 qadamli yo'naltirish
    │   └── (app)/                   # himoyalangan bo'lim (AppShell)
    │       ├── dashboard/           # maqsad, vazifalar, haftalik grafik
    │       ├── learn/               # 6 daraja, 100 modul, 500 dars
    │       ├── lesson/[lessonId]/   # dars player (8 tur, yuraklar, natija)
    │       ├── vocabulary/          # kengaytirilgan qidiruv + SRS holati
    │       ├── review/              # 8 rejimli SM-2 takrorlash
    │       ├── leaderboard/         # haftalik reyting + ligalar
    │       ├── achievements/        # yutuqlar + progress
    │       ├── profile/             # statistika + faoliyat tarixi
    │       ├── settings/            # avatar, maqsad, toggle'lar
    │       └── admin/               # umumiy, darslar, lug'at, import, QC
    ├── components/                  # ui primitives, layout, lesson, landing
    ├── data/
    │   ├── curriculum/              # 25 qo'lda + 475 generatsiya dars
    │   │   └── generated/           # catalog.json + questions-a1..c2.json
    │   └── vocabulary/              # 366 tekshirilgan yozuv, 40 kategoriya
    ├── hooks/                       # use-store-data, use-speech (TTS/STT)
    ├── lib/
    │   ├── store/                   # AppStore + local-store + supabase-store
    │   ├── supabase/                # browser/server klientlar
    │   └── content-import.ts        # CSV parser, normalizatsiya, shablonlar
    └── types/index.ts               # barcha tip definitsiyalari
```

---

## 🗄️ Ma'lumotlar modeli (asosiy jadvallar)

| Jadval | Vazifa |
|---|---|
| `modules`, `lessons` | 100 modul, 500 dars; CEFR, holat, nashr, o'qish/tinglash |
| `lesson_exercises` | 6 943 mashq (`payload` jsonb + qidiruv ustunlari) |
| `lesson_vocabulary` | Dars ↔ lug'at bog'lanishlari |
| `vocabulary` | Boy lug'at yozuvi + `search_vector` (FTS) |
| `vocabulary_categories`, `vocabulary_entry_categories` | 40 kategoriya, ko'p-kategoriyali bog'lanish |
| `vocabulary_meanings`, `vocabulary_examples`, `vocabulary_forms` | Normallashtirilgan ma'no/misol/shakl |
| `user_vocabulary` (+ `user_vocabulary_progress` view) | SM-2 holati, sevimli/o'rganilgan |
| `content_import_jobs`, `content_import_errors` | Import tarixi va qator xatolari |
| `content_reviews` | QC holat o'zgarishlari jurnali |
| `lesson_progress`, `xp_events`, `mistakes` | O'quv progressi va xatolar |

Qidiruv RPC'lari: `search_vocabulary`, `vocabulary_facets`,
`vocabulary_suggestions`, `export_vocabulary`.

---

## 🔒 Xavfsizlik modeli

1. **XP — faqat serverda.** `complete_lesson`, `review_word`, `learn_vocab`,
   `bump_mistake` RPC funksiyalari `SECURITY DEFINER` — XP, streak, vazifa va
   yutuqlar faqat SQL ichida hisoblanadi.
2. **RLS.** Har bir jadval faqat egasiga o'qish/yozish huquqiga ega;
   kontent jadvallarini faqat `is_admin()` bo'lgan foydalanuvchi yozadi.
   O'quvchi lug'atda faqat `verified`/`published`, darslarda faqat nashr etilgan
   yozuvlarni ko'radi.
3. **Profil trigger'i.** Client `update` da `role`, `total_xp`, `current_streak`
   kabi ustunlarni o'zgartira olmaydi.
4. **Service role key** faqat server tomonida, hech qachon `NEXT_PUBLIC_*` emas.
5. **Import** va **QC** jadvallari faqat admin uchun.

---

## ✅ Tekshiruvlar

```bash
npm run lint              # ✓ 0 xato
npm run typecheck         # ✓ 0 xato
npm run build             # ✓ 19 route
npm run validate:content  # ✓ 366 lug'at + 500 dars + 6 943 mashq
```

---

## 📝 Eslatmalar

- **DEMO rejimi asosiy test yo'nalishi** — Supabase env qiymatlari kiritilmasa ham
  barcha funksiyalar ochiq ishlaydi.
- Supabase rejimi kod darajasida to'liq yozilgan; jonli test uchun haqiqiy project
  kerak (env qiymatlarsiz tekshirib bo'lmaydi).
- Seed'dagi **366 ta lug'at yozuvi** — haqiqiy, qo'lda tekshirilgan kontent.
  Sxema va qidiruv 1 000 000+ yozuvga mo'ljallangan; kontent import paneli orqali
  bosqichma-bosqich to'ldiriladi. Hech qanday soxta hisob yoki tarjima ko'rsatilmaydi.
- Generatsiya qilingan 475 dars `source: "seed-template-v1"`, 25 tasi
  `source: "handcrafted"`. Sifat nazoratidan keyin ularni tahrirlash mumkin.
- Ovozli gapirishni tanish (STT) faqat Chrome/Edge kabi qo'llab-quvvatlaydigan
  brauzerlarda ishlaydi; qo'llab-quvvatlanmasa xavfsiz tarzda o'chiriladi.
