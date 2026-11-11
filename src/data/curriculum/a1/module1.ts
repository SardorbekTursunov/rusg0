import type { ModuleContent } from "@/types";

// A1 — 1-modul: Знакомство (Tanishuv)
// Barcha ruscha matnlar lingvistik jihatdan to'g'ri. Tushuntirishlar o'zbek tilida.

export const module1: ModuleContent = {
  module: {
    id: "a1-m1",
    level: "A1",
    orderIndex: 1,
    title: "Знакомство",
    titleUz: "Tanishuv",
    description: "Salomlashish, tanishuv va oddiy suhbat iboralari.",
  },
  lessons: [
    {
      id: "a1-m1-l1",
      moduleId: "a1-m1",
      orderIndex: 1,
      title: "Salomlashish",
      titleRu: "Приветствия",
      description: "Kundalik va rasmiy salomlashish iboralari.",
      xpReward: 10,
      estimatedMinutes: 5,
    },
    {
      id: "a1-m1-l2",
      moduleId: "a1-m1",
      orderIndex: 2,
      title: "Tanishuv",
      titleRu: "Знакомство",
      description: "O'zini tanishtirish va ism so'rash.",
      xpReward: 10,
      estimatedMinutes: 5,
    },
    {
      id: "a1-m1-l3",
      moduleId: "a1-m1",
      orderIndex: 3,
      title: "Ism va yosh",
      titleRu: "Имя и возраст",
      description: "Yoshni aytish va so'rash.",
      xpReward: 10,
      estimatedMinutes: 5,
    },
    {
      id: "a1-m1-l4",
      moduleId: "a1-m1",
      orderIndex: 4,
      title: "Qayerdan ekanlik",
      titleRu: "Откуда ты",
      description: "Qayerdaligingiz va qayerdan ekanligingiz haqida gapirish.",
      xpReward: 10,
      estimatedMinutes: 5,
    },
    {
      id: "a1-m1-l5",
      moduleId: "a1-m1",
      orderIndex: 5,
      title: "Oddiy dialog",
      titleRu: "Простой диалог",
      description: "Tanishuv bo'yicha to'liq dialogni tushunish.",
      xpReward: 10,
      estimatedMinutes: 6,
    },
  ],
  questions: [
    // ------------------------------------------------------------------
    // a1-m1-l1 — Salomlashish (12 ta savol)
    // ------------------------------------------------------------------
    {
      id: "a1-m1-l1-q01",
      lessonId: "a1-m1-l1",
      orderIndex: 1,
      type: "multiple_choice",
      explanationUz:
        "«Привет» — yaqin odamlar uchun kundalik, norasmiy «Salom» so'zi. «Здравствуйте» esa rasmiy variant.",
      payload: {
        prompt: "«Привет» so'zining tarjimasini top.",
        promptLang: "uz",
        options: ["Xayr", "Salom", "Rahmat", "Iltimos"],
        correctIndex: 1,
      },
    },
    {
      id: "a1-m1-l1-q02",
      lessonId: "a1-m1-l1",
      orderIndex: 2,
      type: "translation",
      explanationUz:
        "«Здравствуйте» — «Здравие» (salomatlik) so'zidan kelgan rasmiy salom. O'zbekchada «Assalomu alaykum» deb tarjima qilinadi.",
      payload: {
        direction: "ru_to_uz",
        source: "Здравствуйте",
        accepted: ["assalomu alaykum", "salom"],
      },
    },
    {
      id: "a1-m1-l1-q03",
      lessonId: "a1-m1-l1",
      orderIndex: 3,
      type: "listening",
      explanationUz:
        "«Доброе утро» — ertalabki salomlashish (06:00–11:00). «утро» — tong, ertalab.",
      payload: {
        speakText: "Доброе утро!",
        promptUz: "Esiting va to'g'ri tarjimani tanlang.",
        options: ["Xayrli tun", "Xayrli tong", "Xayrli kech", "Xayrli kun"],
        correctIndex: 1,
      },
    },
    {
      id: "a1-m1-l1-q04",
      lessonId: "a1-m1-l1",
      orderIndex: 4,
      type: "word_selection",
      explanationUz:
        "«До свидания» — xayrlashuvdagi asosiy ibora («ko'rishguncha» degan ma'noda). Kundalik qisqa varianti — «Пока».",
      payload: {
        promptUz: "Xayr (kundalik xayrlashuv)",
        options: ["До свидания", "Привет", "Спасибо", "Пожалуйста"],
        correctIndex: 0,
      },
    },
    {
      id: "a1-m1-l1-q05",
      lessonId: "a1-m1-l1",
      orderIndex: 5,
      type: "true_false",
      explanationUz:
        "«До svdания!» — to'g'ri tarjima: xayrlashuvda aytiladi va «Xayr!» degan ma'noni bildiradi.",
      payload: {
        ruText: "До свидания!",
        uzTranslation: "Xayr!",
        isTrue: true,
      },
    },
    {
      id: "a1-m1-l1-q06",
      lessonId: "a1-m1-l1",
      orderIndex: 6,
      type: "sentence_building",
      explanationUz:
        "«Привет, как дела?» — eng ko'p ishlatiladigan salom: «Salom! Qalaysiz?». So'zlar o'z tartibida joylashadi.",
      payload: {
        correct: ["Привет", ",", "как", "дела", "?"],
        distractors: ["спасибо", "до", "свидания"],
      },
    },
    {
      id: "a1-m1-l1-q07",
      lessonId: "a1-m1-l1",
      orderIndex: 7,
      type: "fill_blank",
      explanationUz:
        "«Меня зовут...» — «Mening ismim...» degan tayyor ibora. «зовут» fe'li «deb atashadi» ma'nosini beradi.",
      payload: {
        sentence: "Здравствуйте, меня ___ Анна.",
        options: ["зовут", "зовёшь", "зовете", "зовутся"],
        correctIndex: 0,
      },
    },
    {
      id: "a1-m1-l1-q08",
      lessonId: "a1-m1-l1",
      orderIndex: 8,
      type: "multiple_choice",
      explanationUz:
        "«Как дела?» — hol so'rash iborasi. Javoban «Хорошо» (Yaxshi) yoki «Плохо» (Yomon) deyiladi.",
      payload: {
        prompt: "«Как дела?» qaysi ma'noda ishlatiladi?",
        promptLang: "uz",
        options: ["Rahmat so'rash", "Hol so'rash", "Xayr aytish", "Kechirish so'rash"],
        correctIndex: 1,
      },
    },
    {
      id: "a1-m1-l1-q09",
      lessonId: "a1-m1-l1",
      orderIndex: 9,
      type: "translation",
      explanationUz:
        "«Xayr!» — xayrlashuv so'zi. Rus tilida eng ko'p «До свидания» (norasmiy variant — «Пока») ishlatiladi.",
      payload: {
        direction: "uz_to_ru",
        source: "Xayr!",
        accepted: ["до свидания", "пока", "до свиданья"],
      },
    },
    {
      id: "a1-m1-l1-q10",
      lessonId: "a1-m1-l1",
      orderIndex: 10,
      type: "word_matching",
      explanationUz:
        "Salomlashish iboralari: «Привет» — Salom, «До свидания» — Xayr, «Доброе утро» — Xayrli tong, «Спокойной ночи» — Xayrli tun.",
      payload: {
        pairs: [
          { ru: "Привет", uz: "Salom" },
          { ru: "До свидания", uz: "Xayr" },
          { ru: "Доброе утро", uz: "Xayrli tong" },
          { ru: "Спокойной ночи", uz: "Xayrli tun" },
        ],
      },
    },
    {
      id: "a1-m1-l1-q11",
      lessonId: "a1-m1-l1",
      orderIndex: 11,
      type: "listening",
      explanationUz:
        "«Привет! Как дела?» — «Salom! Qalaysiz?». «Как дела» so'zma-so'z «qanday ishlar» demakdir.",
      payload: {
        speakText: "Привет! Как дела?",
        promptUz: "Esiting va to'g'ri tarjimani tanlang.",
        options: [
          "Salom! Qalaysiz?",
          "Xayr! Rahmat!",
          "Kechirasiz, kim?",
          "Xayrli tong!",
        ],
        correctIndex: 0,
      },
    },
    {
      id: "a1-m1-l1-q12",
      lessonId: "a1-m1-l1",
      orderIndex: 12,
      type: "multiple_choice",
      explanationUz:
        "«Спасибо» — «Rahmat». Javob varianti — «Пожалуйста» (Iltimos / Arzimaydi).",
      payload: {
        prompt: "«Спасибо» so'zi nima degani?",
        promptLang: "uz",
        options: ["Iltimos", "Rahmat", "Kechirasiz", "Ha"],
        correctIndex: 1,
      },
    },

    // ------------------------------------------------------------------
    // a1-m1-l2 — Tanishuv (12 ta savol)
    // ------------------------------------------------------------------
    {
      id: "a1-m1-l2-q01",
      lessonId: "a1-m1-l2",
      orderIndex: 1,
      type: "multiple_choice",
      explanationUz:
        "«Меня зовут Азиз» — «Mening ismim Aziz». Bu tanishuvdagi eng ko'p ishlatiladigan ibora.",
      payload: {
        prompt: "«Меня зовут Азиз» degan gapning to'g'ri tarjimasini tanlang.",
        promptLang: "uz",
        options: [
          "Mening ismim Aziz",
          "Bu menim do'stim Aziz",
          "Men talabaman Aziz",
          "Aziz xursand",
        ],
        correctIndex: 0,
      },
    },
    {
      id: "a1-m1-l2-q02",
      lessonId: "a1-m1-l2",
      orderIndex: 2,
      type: "translation",
      explanationUz:
        "«Приятно познакомиться» — tanishuvdan keyin aytiladigan xushmuomala ibora: «Tanishganimdan xursandman».",
      payload: {
        direction: "ru_to_uz",
        source: "Приятно познакомиться!",
        accepted: [
          "tanishganimdan xursandman",
          "tanishganimizdan xursandman",
          "tanishganimiz yoqimli",
        ],
      },
    },
    {
      id: "a1-m1-l2-q03",
      lessonId: "a1-m1-l2",
      orderIndex: 3,
      type: "multiple_choice",
      explanationUz:
        "«Как вас зовут?» — rasmiy ravishda ism so'ratadigan savol («siz» shakli). Kundalik varianti — «Как тебя зовут?».",
      payload: {
        prompt: "«Как вас зовут?» — bu qanday savol?",
        promptLang: "uz",
        options: ["Ismingiz nima?", "Qayerdasiz?", "Nechaga to'ldingiz?", "Qalaysiz?"],
        correctIndex: 0,
      },
    },
    {
      id: "a1-m1-l2-q04",
      lessonId: "a1-m1-l2",
      orderIndex: 4,
      type: "fill_blank",
      explanationUz:
        "«Меня зовут Лейла» — «Leylaning ismi...» / «Meni Leyla deb atashadi». «зовут» doim 3-shaxs ko'plikda turadi.",
      payload: {
        sentence: "Меня ___ Лейла.",
        options: ["зовут", "зовёшь", "зовете", "зову"],
        correctIndex: 0,
      },
    },
    {
      id: "a1-m1-l2-q05",
      lessonId: "a1-m1-l2",
      orderIndex: 5,
      type: "word_selection",
      explanationUz:
        "«Знакомство» — «tanishuv». «Знакомиться» fe'li — «tanishmoq».",
      payload: {
        promptUz: "Tanishuv",
        options: ["знакомство", "привет", "друг", "урок"],
        correctIndex: 0,
      },
    },
    {
      id: "a1-m1-l2-q06",
      lessonId: "a1-m1-l2",
      orderIndex: 6,
      type: "listening",
      explanationUz:
        "«Меня зовут Ойбек» — «Mening ismim Oybek». «Меня» — meni (kelishik shakli), «зовут» — deb ataydilar.",
      payload: {
        speakText: "Меня зовут Ойбек.",
        promptUz: "Esiting va to'g'ri javobni tanlang.",
        options: [
          "Mening ismim Oybek",
          "Bu Oybek do'stim",
          "Oybek hozir keladi",
          "Oybek o'qituvchi",
        ],
        correctIndex: 0,
      },
    },
    {
      id: "a1-m1-l2-q07",
      lessonId: "a1-m1-l2",
      orderIndex: 7,
      type: "true_false",
      explanationUz:
        "«Я ученик» — «Men o'quvchiman». «Ученик» — maktab o'quvchisi, «студент» — talaba.",
      payload: {
        ruText: "Я ученик.",
        uzTranslation: "Men o'quvchiman.",
        isTrue: true,
      },
    },
    {
      id: "a1-m1-l2-q08",
      lessonId: "a1-m1-l2",
      orderIndex: 8,
      type: "word_matching",
      explanationUz:
        "Tanishuv iboralari: «Меня зовут» — Mening ismim, «Как вас зовут» — Ismingiz nima, «Ученик» — O'quvchi, «Друг» — Do'stim.",
      payload: {
        pairs: [
          { ru: "Меня зовут", uz: "Mening ismim" },
          { ru: "Как вас зовут", uz: "Ismingiz nima" },
          { ru: "Ученик", uz: "O'quvchi" },
          { ru: "Друг", uz: "Do'stim" },
        ],
      },
    },
    {
      id: "a1-m1-l2-q09",
      lessonId: "a1-m1-l2",
      orderIndex: 9,
      type: "translation",
      explanationUz:
        "«Как вас зовут?» — rasmiy shakl. «siz» bilan murojaat qilinadi, chunki bu hurmatli savol.",
      payload: {
        direction: "uz_to_ru",
        source: "Ismingiz nima?",
        accepted: ["как вас зовут", "как вас зовут?"],
      },
    },
    {
      id: "a1-m1-l2-q10",
      lessonId: "a1-m1-l2",
      orderIndex: 10,
      type: "sentence_building",
      explanationUz:
        "«Это мой друг» — «Bu menim do'stim». «мой» — menim (erkak jins uchun).",
      payload: {
        correct: ["Это", "мой", "друг", "."],
        distractors: ["учитель", "ваш", "сестра"],
      },
    },
    {
      id: "a1-m1-l2-q11",
      lessonId: "a1-m1-l2",
      orderIndex: 11,
      type: "multiple_choice",
      explanationUz:
        "«Приятно познакомиться» — yangi odam bilan ilk bor tanishganda aytiladi.",
      payload: {
        prompt: "«Приятно познакомиться» iborasi qachon aytiladi?",
        promptLang: "uz",
        options: [
          "Yangi odam bilan tanishganda",
          "Xayrlashganda",
          "Rahmat aytganda",
          "Kechirasiz so'raganda",
        ],
        correctIndex: 0,
      },
    },
    {
      id: "a1-m1-l2-q12",
      lessonId: "a1-m1-l2",
      orderIndex: 12,
      type: "fill_blank",
      explanationUz:
        "«Это мой друг» — «мой» (menim) ot qoshida turadi. «моя» ayol jinsidagi narsalar uchun: «моя мама».",
      payload: {
        sentence: "Это ___ друг.",
        options: ["мой", "моя", "мои", "его"],
        correctIndex: 0,
      },
    },

    // ------------------------------------------------------------------
    // a1-m1-l3 — Ism va yosh (11 ta savol)
    // ------------------------------------------------------------------
    {
      id: "a1-m1-l3-q01",
      lessonId: "a1-m1-l3",
      orderIndex: 1,
      type: "multiple_choice",
      explanationUz:
        "«Мне 12 лет» — so'zma-so'z «menga 12 yosh», o'zbek tilida «Mening yoshim 12» deyiladi.",
      payload: {
        prompt: "«Мне 12 лет» ning to'g'ri tarjimasini tanlang.",
        promptLang: "uz",
        options: [
          "Mening yoshim 12",
          "Mening do'stim 12",
          "Mening sinfim 12",
          "Mening uchun 12",
        ],
        correctIndex: 0,
      },
    },
    {
      id: "a1-m1-l3-q02",
      lessonId: "a1-m1-l3",
      orderIndex: 2,
      type: "translation",
      explanationUz:
        "«Сколько тебе лет?» — yosh so'ratish savoli. «сколько» — nechta, necha.",
      payload: {
        direction: "uz_to_ru",
        source: "Yoshing nechaga to'ladi?",
        accepted: ["сколько тебе лет", "сколько тебе лет?"],
      },
    },
    {
      id: "a1-m1-l3-q03",
      lessonId: "a1-m1-l3",
      orderIndex: 3,
      type: "fill_blank",
      explanationUz:
        "Rus tilida 5–20 gacha sonlardan keyin doim «лет» ishlatiladi: «Ему пять лет» (Unga 5 yosh).",
      payload: {
        sentence: "Ему пять ___.",
        options: ["лет", "год", "года", "лета"],
        correctIndex: 0,
      },
    },
    {
      id: "a1-m1-l3-q04",
      lessonId: "a1-m1-l3",
      orderIndex: 4,
      type: "listening",
      explanationUz:
        "«Мне десять лет» — «Mening yoshim 10». «десять» — o'n. Eshitilgan sonni aniq tinglang.",
      payload: {
        speakText: "Мне десять лет.",
        promptUz: "Esiting va yoshni to'g'ri tanlang.",
        options: ["Mening yoshim 10", "Mening yoshim 11", "Mening yoshim 20", "Mening yoshim 7"],
        correctIndex: 0,
      },
    },
    {
      id: "a1-m1-l3-q05",
      lessonId: "a1-m1-l3",
      orderIndex: 5,
      type: "word_selection",
      explanationUz:
        "«Возраст» — yosh (umumiy). «Год» — yil (vaqt birligi).",
      payload: {
        promptUz: "Yosh (son)",
        options: ["возраст", "год", "время", "день"],
        correctIndex: 0,
      },
    },
    {
      id: "a1-m1-l3-q06",
      lessonId: "a1-m1-l3",
      orderIndex: 6,
      type: "multiple_choice",
      explanationUz:
        "«Сколько тебе лет?» — shaxsning yoshini so'raydi. Javob: «Мне двадцать лет» (Mening yoshim 20).",
      payload: {
        prompt: "«Сколько тебе лет?» savoli nimani so'raydi?",
        promptLang: "uz",
        options: ["Yoshni", "Ismni", "Manzilni", "Vaqtni"],
        correctIndex: 0,
      },
    },
    {
      id: "a1-m1-l3-q07",
      lessonId: "a1-m1-l3",
      orderIndex: 7,
      type: "true_false",
      explanationUz:
        "«Мне пять лет» — «Mening yoshim besh». Rus tilida yosh «мне» (menga) bilan aytiladi.",
      payload: {
        ruText: "Мне пять лет.",
        uzTranslation: "Mening yoshim besh.",
        isTrue: true,
      },
    },
    {
      id: "a1-m1-l3-q08",
      lessonId: "a1-m1-l3",
      orderIndex: 8,
      type: "sentence_building",
      explanationUz:
        "«Мне семь лет» — «Mening yoshim yetti». Tartib: «мне» + son + «лет».",
      payload: {
        correct: ["Мне", "семь", "лет", "."],
        distractors: ["год", "ему", "она"],
      },
    },
    {
      id: "a1-m1-l3-q09",
      lessonId: "a1-m1-l3",
      orderIndex: 9,
      type: "translation",
      explanationUz:
        "«Сколько тебе лет?» — yosh so'ratishning eng tabiiy shakli (kundalik muloqotda).",
      payload: {
        direction: "ru_to_uz",
        source: "Сколько тебе лет?",
        accepted: ["yoshing nechaga to'ladi", "yoshing necha", "yoshing nechaga to'ldi"],
      },
    },
    {
      id: "a1-m1-l3-q10",
      lessonId: "a1-m1-l3",
      orderIndex: 10,
      type: "word_matching",
      explanationUz:
        "Yosh bilan bog'liq iboralar: «Мне 10 лет» — Mening yoshim 10, «год» — Yil, «день» — Kun.",
      payload: {
        pairs: [
          { ru: "Мне 10 лет", uz: "Mening yoshim 10" },
          { ru: "Сколько лет", uz: "Nechcha yosh" },
          { ru: "год", uz: "Yil" },
          { ru: "день", uz: "Kun" },
        ],
      },
    },
    {
      id: "a1-m1-l3-q11",
      lessonId: "a1-m1-l3",
      orderIndex: 11,
      type: "multiple_choice",
      explanationUz:
        "«Год» — yil. «Я родился в две тысячи двенадцатом году» — Men 2012-yilda tug'ilganman.",
      payload: {
        prompt: "«Год» so'zi nima degani?",
        promptLang: "uz",
        options: ["Oy", "Yil", "Kun", "Hafta"],
        correctIndex: 1,
      },
    },

    // ------------------------------------------------------------------
    // a1-m1-l4 — Qayerdan ekanlik (12 ta savol)
    // ------------------------------------------------------------------
    {
      id: "a1-m1-l4-q01",
      lessonId: "a1-m1-l4",
      orderIndex: 1,
      type: "multiple_choice",
      explanationUz:
        "«Откуда ты?» — «Qayerdansan?». «Откуда» — qayerdan (kelishik ma'nosi).",
      payload: {
        prompt: "«Откуда ты?» nimani so'raydi?",
        promptLang: "uz",
        options: ["Manzilni (qayerdan)", "Yoshni", "Ismni", "Ishni"],
        correctIndex: 0,
      },
    },
    {
      id: "a1-m1-l4-q02",
      lessonId: "a1-m1-l4",
      orderIndex: 2,
      type: "translation",
      explanationUz:
        "«Я из Узбекистана» — «Men O'zbekistondaman». «из» — … dan, kelishik qo'shimchasi.",
      payload: {
        direction: "ru_to_uz",
        source: "Я из Узбекистана.",
        accepted: ["men o'zbekistondaman", "men o'zbekistondanman"],
      },
    },
    {
      id: "a1-m1-l4-q03",
      lessonId: "a1-m1-l4",
      orderIndex: 3,
      type: "fill_blank",
      explanationUz:
        "«Я из Узбекистана» — «из» + joy nomi = … dan. «Я в Ташкенте» — «в» = … da (yashash joyi).",
      payload: {
        sentence: "Я ___ Узбекистана.",
        options: ["из", "в", "на", "до"],
        correctIndex: 0,
      },
    },
    {
      id: "a1-m1-l4-q04",
      lessonId: "a1-m1-l4",
      orderIndex: 4,
      type: "listening",
      explanationUz:
        "«Я живу в Ташкенте» — «Men Toshkentda yashayman». «живу» — yashayman.",
      payload: {
        speakText: "Я живу в Ташкенте.",
        promptUz: "Esiting va to'g'ri tarjimani tanlang.",
        options: [
          "Men Toshkentda yashayman",
          "Men Toshkentdanman",
          "Men Samarqandda yashayman",
          "Toshkent juda katta",
        ],
        correctIndex: 0,
      },
    },
    {
      id: "a1-m1-l4-q05",
      lessonId: "a1-m1-l4",
      orderIndex: 5,
      type: "word_selection",
      explanationUz:
        "«Откуда» — qayerdan. «Где» — qayerda. «Куда» — qayerga. «Когда» — qachon.",
      payload: {
        promptUz: "Qayerdan?",
        options: ["откуда", "где", "куда", "когда"],
        correctIndex: 0,
      },
    },
    {
      id: "a1-m1-l4-q06",
      lessonId: "a1-m1-l4",
      orderIndex: 6,
      type: "sentence_building",
      explanationUz:
        "«Я живу в Москве» — «Men Moskvada yashayman». «в» + joy = … da.",
      payload: {
        correct: ["Я", "живу", "в", "Москве", "."],
        distractors: ["из", "он", "на"],
      },
    },
    {
      id: "a1-m1-l4-q07",
      lessonId: "a1-m1-l4",
      orderIndex: 7,
      type: "true_false",
      explanationUz:
        "«Мы из России» — «Biz Rossiyadanmiz». «из» qo'shimchasi «dan» ma'nosini beradi.",
      payload: {
        ruText: "Мы из России.",
        uzTranslation: "Biz Rossiyadanmiz.",
        isTrue: true,
      },
    },
    {
      id: "a1-m1-l4-q08",
      lessonId: "a1-m1-l4",
      orderIndex: 8,
      type: "multiple_choice",
      explanationUz:
        "«Где ты живёшь?» — «Qayerda yashaysan?» (joy so'raladi). «Откуда ты?» esa qayerdan ekanligingizni so'raydi.",
      payload: {
        prompt: "«Где ты живёшь?» ning to'g'ri tarjimasini tanlang.",
        promptLang: "uz",
        options: ["Qayerda yashaysan?", "Qayerdansan?", "Qachon yashaysan?", "Kim yashaydi?"],
        correctIndex: 0,
      },
    },
    {
      id: "a1-m1-l4-q09",
      lessonId: "a1-m1-l4",
      orderIndex: 9,
      type: "word_matching",
      explanationUz:
        "Manzil iboralari: «Откуда ты» — Qayerdansan, «живу» — yashayman, «город» — shahar.",
      payload: {
        pairs: [
          { ru: "Откуда ты?", uz: "Qayerdansan?" },
          { ru: "Я из Узбекистана", uz: "Men O'zbekistondaman" },
          { ru: "живу", uz: "yashayman" },
          { ru: "город", uz: "shahar" },
        ],
      },
    },
    {
      id: "a1-m1-l4-q10",
      lessonId: "a1-m1-l4",
      orderIndex: 10,
      type: "translation",
      explanationUz:
        "«Я живу в Москве» — «Men Moskvada yashayman». «Москве» — «Москва» so'zining kelishik shakli.",
      payload: {
        direction: "uz_to_ru",
        source: "Men Moskvada yashayman.",
        accepted: ["я живу в москве", "я живу в москве?"],
      },
    },
    {
      id: "a1-m1-l4-q11",
      lessonId: "a1-m1-l4",
      orderIndex: 11,
      type: "listening",
      explanationUz:
        "«Откуда ты?» — «Qayerdansan?». «Где ты живёшь?» esa «Qayerda yashaysan?» bo'lardi.",
      payload: {
        speakText: "Откуда ты?",
        promptUz: "Esiting va to'g'ri savolni tanlang.",
        options: ["Qayerdansan?", "Qayerda yashaysan?", "Qachon kelding?", "Kim borsan?"],
        correctIndex: 0,
      },
    },
    {
      id: "a1-m1-l4-q12",
      lessonId: "a1-m1-l4",
      orderIndex: 12,
      type: "multiple_choice",
      explanationUz:
        "«в» + joy (в Ташкенте) — «…da» (yashash, bo'lish joyi) ma'nosini bildiradi.",
      payload: {
        prompt: "«Я живу в Ташкенте» gapidagi «в» nimani bildiradi?",
        promptLang: "uz",
        options: ["Joyni (Toshkentda)", "Vaqtni (soatda)", "Sababni", "Og'irlikni"],
        correctIndex: 0,
      },
    },

    // ------------------------------------------------------------------
    // a1-m1-l5 — Oddiy dialog (12 ta savol)
    // ------------------------------------------------------------------
    {
      id: "a1-m1-l5-q01",
      lessonId: "a1-m1-l5",
      orderIndex: 1,
      type: "multiple_choice",
      explanationUz:
        "Dialogda Dilshod O'zbekistondan, Mariya esa Rossiyadan ekanligi aytilgan.",
      payload: {
        prompt: "Ushbu dialogda qaysi ikki mamlakat tilga olinadi?",
        promptLang: "uz",
        options: [
          "O'zbekiston va Rossiya",
          "Qozog'iston va Turkiya",
          "Xitoy va Yaponiya",
          "Hindiston va Pokiston",
        ],
        correctIndex: 0,
      },
    },
    {
      id: "a1-m1-l5-q02",
      lessonId: "a1-m1-l5",
      orderIndex: 2,
      type: "translation",
      explanationUz:
        "«Приятно познакомиться!» — tanishuv oxirida aytiladigan ibora.",
      payload: {
        direction: "ru_to_uz",
        source: "Приятно познакомиться!",
        accepted: [
          "tanishganimdan xursandman",
          "tanishganimizdan xursandman",
          "tanishganimiz yoqimli",
        ],
      },
    },
    {
      id: "a1-m1-l5-q03",
      lessonId: "a1-m1-l5",
      orderIndex: 3,
      type: "fill_blank",
      explanationUz:
        "«Как тебя зовут?» so'rog'iga «Меня зовут Дилшод» deb javob beriladi.",
      payload: {
        sentence: "— Как тебя зовут? — ___ Дилшод.",
        options: ["Меня зовут", "Тебя зовут", "Я зову", "Он зовёт"],
        correctIndex: 0,
      },
    },
    {
      id: "a1-m1-l5-q04",
      lessonId: "a1-m1-l5",
      orderIndex: 4,
      type: "listening",
      explanationUz:
        "«Привет! Как тебя зовут?» — «Salom! Isming nima?» (kundalik shakl).",
      payload: {
        speakText: "Привет! Как тебя зовут?",
        promptUz: "Esiting va to'g'ri tarjimani tanlang.",
        options: [
          "Salom! Isming nima?",
          "Salom! Qayerdansan?",
          "Xayr! Isming nima?",
          "Salom! Qalaysiz?",
        ],
        correctIndex: 0,
      },
    },
    {
      id: "a1-m1-l5-q05",
      lessonId: "a1-m1-l5",
      orderIndex: 5,
      type: "word_selection",
      explanationUz: "«Друг» — do'stim. «враг» — dushman, «брат» — aka/uka, «учитель» — o'qituvchi.",
      payload: {
        promptUz: "Do'stim",
        options: ["друг", "враг", "брат", "учитель"],
        correctIndex: 0,
      },
    },
    {
      id: "a1-m1-l5-q06",
      lessonId: "a1-m1-l5",
      orderIndex: 6,
      type: "true_false",
      explanationUz:
        "Dialogda «Я из России» — Mariya aytgan gap. Demak, Mariya Rossiyadan.",
      payload: {
        ruText: "Мария из России.",
        uzTranslation: "Mariya Rossiyadan.",
        isTrue: true,
      },
    },
    {
      id: "a1-m1-l5-q07",
      lessonId: "a1-m1-l5",
      orderIndex: 7,
      type: "sentence_building",
      explanationUz:
        "«Приятно познакомиться» — tanishganda aytiladigan ibora. «спасибо» (rahmat) bu yerda ortiqcha.",
      payload: {
        correct: ["Приятно", "познакомиться", "."],
        distractors: ["спасибо", "до", "свидания"],
      },
    },
    {
      id: "a1-m1-l5-q08",
      lessonId: "a1-m1-l5",
      orderIndex: 8,
      type: "word_matching",
      explanationUz:
        "Asosiy suhbat iboralari: Привет — Salom, Как дела — Qalaysiz, До свидания — Xayr, Спасибо — Rahmat.",
      payload: {
        pairs: [
          { ru: "Привет", uz: "Salom" },
          { ru: "Как дела", uz: "Qalaysiz" },
          { ru: "До свидания", uz: "Xayr" },
          { ru: "Спасибо", uz: "Rahmat" },
        ],
      },
    },
    {
      id: "a1-m1-l5-q09",
      lessonId: "a1-m1-l5",
      orderIndex: 9,
      type: "translation",
      explanationUz: "«Qayerdansan?» — «Откуда ты?». Bu tanishuvdagi keyingi tabiiy savol.",
      payload: {
        direction: "uz_to_ru",
        source: "Qayerdansan?",
        accepted: ["откуда ты", "откуда ты?"],
      },
    },
    {
      id: "a1-m1-l5-q10",
      lessonId: "a1-m1-l5",
      orderIndex: 10,
      type: "multiple_choice",
      explanationUz:
        "«А тебя?» — hamkor savol: «Seningizniki-chi?» / «A sening-chi?». Suhbat davom etadi.",
      payload: {
        prompt: "«А тебя?» — bu qanday savol?",
        promptLang: "uz",
        options: [
          "Hamkor savol («Sening-chi?»)",
          "Rasmiy savol",
          "Rad javobi",
          "Tanqidiy savol",
        ],
        correctIndex: 0,
      },
    },
    {
      id: "a1-m1-l5-q11",
      lessonId: "a1-m1-l5",
      orderIndex: 11,
      type: "listening",
      explanationUz:
        "«Меня зовут Дилшод» — «Mening ismim Dilshod». «зовут» — deb ataydilar.",
      payload: {
        speakText: "Меня зовут Дилшод.",
        promptUz: "Esiting va to'g'ri javobni tanlang.",
        options: [
          "Mening ismim Dilshod",
          "Bu menim do'stim Dilshod",
          "Dilshod hozir keladi",
          "Dilshod o'qituvchi",
        ],
        correctIndex: 0,
      },
    },
    {
      id: "a1-m1-l5-q12",
      lessonId: "a1-m1-l5",
      orderIndex: 12,
      type: "fill_blank",
      explanationUz:
        "«Я из России, а ты?» — «Rossiyadanman, a sen?». «из» — … dan.",
      payload: {
        sentence: "— Откуда ты? — Я ___ России, а ты?",
        options: ["из", "в", "с", "к"],
        correctIndex: 0,
      },
    },
  ],
};
