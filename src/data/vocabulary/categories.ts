// ---------------------------------------------------------------------------
// RusGo — lug'at kategoriyalari (40 ta mavzu)
// Slug — barqaror identifikator (DB, URL, filtrlar uchun)
// ---------------------------------------------------------------------------

export interface VocabCategory {
  slug: string;
  titleUz: string;
  titleRu: string;
}

export const VOCAB_CATEGORIES: VocabCategory[] = [
  { slug: "everyday", titleUz: "Kundalik hayot", titleRu: "Повседневная жизнь" },
  { slug: "family", titleUz: "Oila", titleRu: "Семья" },
  { slug: "education", titleUz: "Ta'lim", titleRu: "Образование" },
  { slug: "school", titleUz: "Maktab", titleRu: "Школа" },
  { slug: "work", titleUz: "Ish va karyera", titleRu: "Работа и карьера" },
  { slug: "business", titleUz: "Biznes", titleRu: "Бизнес" },
  { slug: "finance", titleUz: "Moliya", titleRu: "Финансы" },
  { slug: "technology", titleUz: "Texnologiya", titleRu: "Технологии" },
  { slug: "internet", titleUz: "Internet", titleRu: "Интернет" },
  { slug: "science", titleUz: "Fan", titleRu: "Наука" },
  { slug: "medicine", titleUz: "Tibbiyot", titleRu: "Медицина" },
  { slug: "health", titleUz: "Salomatlik", titleRu: "Здоровье" },
  { slug: "sports", titleUz: "Sport", titleRu: "Спорт" },
  { slug: "food", titleUz: "Ovqat", titleRu: "Еда" },
  { slug: "restaurants", titleUz: "Restoranlar", titleRu: "Рестораны" },
  { slug: "travel", titleUz: "Sayohat", titleRu: "Путешествия" },
  { slug: "transport", titleUz: "Transport", titleRu: "Транспорт" },
  { slug: "nature", titleUz: "Tabiat", titleRu: "Природа" },
  { slug: "ecology", titleUz: "Ekologiya", titleRu: "Экология" },
  { slug: "environment", titleUz: "Atrof-muhit", titleRu: "Окружающая среда" },
  { slug: "politics", titleUz: "Siyosat", titleRu: "Политика" },
  { slug: "society", titleUz: "Jamiyat", titleRu: "Общество" },
  { slug: "culture", titleUz: "Madaniyat", titleRu: "Культура" },
  { slug: "art", titleUz: "San'at", titleRu: "Искусство" },
  { slug: "literature", titleUz: "Adabiyot", titleRu: "Литература" },
  { slug: "history", titleUz: "Tarix", titleRu: "История" },
  { slug: "geography", titleUz: "Geografiya", titleRu: "География" },
  { slug: "emotions", titleUz: "His-tuyg'ular", titleRu: "Эмоции" },
  { slug: "personality", titleUz: "Shaxsiyat", titleRu: "Личность" },
  { slug: "relationships", titleUz: "Munosabatlar", titleRu: "Отношения" },
  { slug: "communication", titleUz: "Muloqot", titleRu: "Общение" },
  { slug: "shopping", titleUz: "Xarid", titleRu: "Покупки" },
  { slug: "clothing", titleUz: "Kiyim", titleRu: "Одежда" },
  { slug: "home", titleUz: "Uy", titleRu: "Дом" },
  { slug: "weather", titleUz: "Ob-havo", titleRu: "Погода" },
  { slug: "time", titleUz: "Vaqt", titleRu: "Время" },
  { slug: "numbers", titleUz: "Raqamlar", titleRu: "Числа" },
  { slug: "colors", titleUz: "Ranglar", titleRu: "Цвета" },
  { slug: "animals", titleUz: "Hayvonlar", titleRu: "Животные" },
  { slug: "expressions", titleUz: "Ilg'or iboralar", titleRu: "Продвинутые выражения" },
];

const map = new Map(VOCAB_CATEGORIES.map((c) => [c.slug, c]));

export function getCategory(slug: string): VocabCategory | undefined {
  return map.get(slug);
}

export function categoryTitleUz(slug: string): string {
  return map.get(slug)?.titleUz ?? slug;
}

/** Eski (A1) seed mavzu nomlarini yangi slug'larga bog'lash */
export const TOPIC_TO_CATEGORY: Record<string, string> = {
  Tanishuv: "communication",
  Oila: "family",
  Maktab: "school",
  Fanlar: "education",
  Raqamlar: "numbers",
  Sifatlar: "personality",
  Vaqt: "time",
  "Kun tartibi": "everyday",
  "Oziq-ovqat": "food",
  Shahar: "society",
  "Fe'llar": "everyday",
};

export const LEVEL_ORDER = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;

/** CEFR darajalar uchun ko'rsatkichlar */
export const LEVEL_META: Record<
  string,
  { label: string; titleUz: string; subtitle: string; color: string }
> = {
  A1: {
    label: "A1",
    titleUz: "Boshlang'ich",
    subtitle: "Alifbo, salomlashish, birinchi gaplar",
    color: "#58CC02",
  },
  A2: {
    label: "A2",
    titleUz: "Elementar",
    subtitle: "Kundalik suhbatlar, o'tgan va kelasi zamon",
    color: "#1CB0F6",
  },
  B1: {
    label: "B1",
    titleUz: "O'rta",
    subtitle: "Olti kelishik, fe'l turlari, erkin muloqot",
    color: "#FFC800",
  },
  B2: {
    label: "B2",
    titleUz: "Yuqori o'rta",
    subtitle: "Murakkab gaplar, rasmiy muloqot, munozara",
    color: "#FF9600",
  },
  C1: {
    label: "C1",
    titleUz: "Ilg'or",
    subtitle: "Akademik til, idiomalar, uslubiyat",
    color: "#CE82FF",
  },
  C2: {
    label: "C2",
    titleUz: "Mukammal",
    subtitle: "Adabiy til, ritorika, erkin tushunish",
    color: "#FF4B4B",
  },
};
