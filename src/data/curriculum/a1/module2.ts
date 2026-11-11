import type { ModuleContent } from "@/types";

// A1 — 2-modul: Алфавит (Alifbo)
// Barcha ruscha matnlar lingvistik jihatdan to'g'ri. Tushuntirishlar o'zbek tilida.

export const module2: ModuleContent = {
  module: {
    id: "a1-m2",
    level: "A1",
    orderIndex: 2,
    title: "Алфавит",
    titleUz: "Alifbo",
    description: "Rus alifbosi: 33 ta kirill harfi, unli va undoshlar, talaffuz va o'qish mashqlari.",
  },
  lessons: [
    {
      id: "a1-m2-l1",
      moduleId: "a1-m2",
      orderIndex: 1,
      title: "Rus alifbosi",
      titleRu: "Русский алфавит",
      description: "33 ta harfli kirill alifbosi bilan tanishish.",
      xpReward: 10,
      estimatedMinutes: 5,
    },
    {
      id: "a1-m2-l2",
      moduleId: "a1-m2",
      orderIndex: 2,
      title: "Unli harflar",
      titleRu: "Гласные буквы",
      description: "Unli harflar va urg'u tushmagan «о» ning «а» bo'lishi qoidasi.",
      xpReward: 10,
      estimatedMinutes: 5,
    },
    {
      id: "a1-m2-l3",
      moduleId: "a1-m2",
      orderIndex: 3,
      title: "Undosh harflar",
      titleRu: "Согласные буквы",
      description: "Qattik va yumshoq undoshlar, «ъ» va «ь» belgilarining vazifasi.",
      xpReward: 10,
      estimatedMinutes: 6,
    },
    {
      id: "a1-m2-l4",
      moduleId: "a1-m2",
      orderIndex: 4,
      title: "Harflar talaffuzi",
      titleRu: "Произношение букв",
      description: "ч, щ, ж, ш, ц harflarining talaffuzi va o'zbekcha mosliklar.",
      xpReward: 10,
      estimatedMinutes: 6,
    },
    {
      id: "a1-m2-l5",
      moduleId: "a1-m2",
      orderIndex: 5,
      title: "O'qish mashqlari",
      titleRu: "Упражнения на чтение",
      description: "So'zlarni bo'g'inlarga ajratib o'qish: мама, папа, дом, школа.",
      xpReward: 10,
      estimatedMinutes: 5,
    },
  ],
  questions: [
    // ------------------------------------------------------------------
    // a1-m2-l1 — Rus alifbosi (12 ta savol)
    // ------------------------------------------------------------------
    {
      id: "a1-m2-l1-q01",
      lessonId: "a1-m2-l1",
      orderIndex: 1,
      type: "multiple_choice",
      explanationUz:
        "Rus alifbosi — kirill yozuvi: 10 ta unli harf (а, о, у, ы, э, и, е, ё, ю, я), 21 ta undosh harf va 2 ta belgi (ъ, ь) — jami 33 ta harf.",
      payload: {
        prompt: "Rus alifbisida nechta harf bor?",
        promptLang: "uz",
        options: ["26", "33", "30", "36"],
        correctIndex: 1,
      },
    },
    {
      id: "a1-m2-l1-q02",
      lessonId: "a1-m2-l1",
      orderIndex: 2,
      type: "translation",
      explanationUz:
        "«Алфавит» — barcha harflarning tartibli ro'yxati, ya'ni alifbo. O'zbekcha aynan «alifbo» deb tarjima qilinadi.",
      payload: {
        direction: "ru_to_uz",
        source: "Алфавит",
        accepted: ["alifbo", "harf to'plami"],
      },
    },
    {
      id: "a1-m2-l1-q03",
      lessonId: "a1-m2-l1",
      orderIndex: 3,
      type: "word_matching",
      explanationUz:
        "«буква» — harf, «алфавит» — alifbo; «гласная» — unli harf, «согласная» — undosh harf.",
      payload: {
        pairs: [
          { ru: "буква", uz: "harf" },
          { ru: "алфавит", uz: "alifbo" },
          { ru: "гласная буква", uz: "unli harf" },
          { ru: "согласная буква", uz: "undosh harf" },
        ],
      },
    },
    {
      id: "a1-m2-l1-q04",
      lessonId: "a1-m2-l1",
      orderIndex: 4,
      type: "multiple_choice",
      explanationUz:
        "Rus harflari kirill yozuviga tegishli (а, б, в...). Lotin yozuvi (a, b, c) esa o'zbek va ingliz tilida ishlatiladi.",
      payload: {
        prompt: "Quyidagilardan qaysi biri kirill alifbosiga tegishli?",
        promptLang: "uz",
        options: ["а, б, в", "a, b, c", "alif, ba, ta", "あ, い, う"],
        correctIndex: 0,
      },
    },
    {
      id: "a1-m2-l1-q05",
      lessonId: "a1-m2-l1",
      orderIndex: 5,
      type: "true_false",
      explanationUz:
        "To'g'ri: 10 unli + 21 undosh + 2 belgi (ъ, ь) = 33 ta harf. Rus alifbosi shu tartibda yoziladi.",
      payload: {
        ruText: "Русский алфавит состоит из 33 букв.",
        uzTranslation: "Rus alifbosi 33 ta harfdan iborat.",
        isTrue: true,
      },
    },
    {
      id: "a1-m2-l1-q06",
      lessonId: "a1-m2-l1",
      orderIndex: 6,
      type: "fill_blank",
      explanationUz:
        "«В русском алфавите 33 буквы» — rus alifbisida 33 ta harf bor. Kirill yozuvi lotin yozuvidan butunlay farq qiladi.",
      payload: {
        sentence: "В русском алфавите ___ буквы.",
        options: ["30", "28", "33", "26"],
        correctIndex: 2,
      },
    },
    {
      id: "a1-m2-l1-q07",
      lessonId: "a1-m2-l1",
      orderIndex: 7,
      type: "listening",
      explanationUz:
        "«Русский алфавит» — «Rus alifbosi». «русский» — ruscha, «алфавит» — alifbo degan ma'noni bildiradi.",
      payload: {
        speakText: "Русский алфавит.",
        promptUz: "Esiting va to'g'ri tarjimani tanlang.",
        options: ["Rus tili", "Rus harflari", "Rus alifbosi", "O'zbek alifbosi"],
        correctIndex: 2,
      },
    },
    {
      id: "a1-m2-l1-q08",
      lessonId: "a1-m2-l1",
      orderIndex: 8,
      type: "word_selection",
      explanationUz:
        "«Буква» — harf. «Слово» — so'z, «брат» — aka-uka, «дом» — uy (boshqa so'zlar).",
      payload: {
        promptUz: "Harf",
        options: ["буква", "слово", "брат", "дом"],
        correctIndex: 0,
      },
    },
    {
      id: "a1-m2-l1-q09",
      lessonId: "a1-m2-l1",
      orderIndex: 9,
      type: "sentence_building",
      explanationUz:
        "«Это русский алфавит» — «Bu rus alifbosi». «русский» sifati «алфавит» so'zidan oldin turadi.",
      payload: {
        correct: ["Это", "русский", "алфавит", "."],
        distractors: ["буква", "казахский", "она"],
      },
    },
    {
      id: "a1-m2-l1-q10",
      lessonId: "a1-m2-l1",
      orderIndex: 10,
      type: "translation",
      explanationUz:
        "«Bu rus alifbosi» — «Это русский алфавит». «это» — bu (ko'rsatma so'zi), «русский» — ruscha/rus.",
      payload: {
        direction: "uz_to_ru",
        source: "Bu rus alifbosi.",
        accepted: ["это русский алфавит", "это русский алфавит?"],
      },
    },
    {
      id: "a1-m2-l1-q11",
      lessonId: "a1-m2-l1",
      orderIndex: 11,
      type: "multiple_choice",
      explanationUz:
        "«Буква» — harf. «Слово» — so'z, «предложение» — gap, «цифра» — raqam deganlarini bilib oling.",
      payload: {
        prompt: "«Буква» so'zi nima degani?",
        promptLang: "uz",
        options: ["So'z", "Harf", "Gap", "Raqam"],
        correctIndex: 1,
      },
    },
    {
      id: "a1-m2-l1-q12",
      lessonId: "a1-m2-l1",
      orderIndex: 12,
      type: "listening",
      explanationUz:
        "Bu rus alifbosining birinchi harflari: а, б, в, г, д. Raqamlar esa boshqacha yoziladi: 1, 2, 3...",
      payload: {
        speakText: "А, Б, В, Г, Д.",
        promptUz: "Esiting va to'g'ri javobni tanlang.",
        options: [
          "Bu raqamlar",
          "Bu o'zbek harflari",
          "Bu rus harflari",
          "Bu lotin harflari",
        ],
        correctIndex: 2,
      },
    },

    // ------------------------------------------------------------------
    // a1-m2-l2 — Unli harflar (12 ta savol)
    // ------------------------------------------------------------------
    {
      id: "a1-m2-l2-q01",
      lessonId: "a1-m2-l2",
      orderIndex: 1,
      type: "multiple_choice",
      explanationUz:
        "Unli harf — og'izni ochib ovoz chiqaradigan harf: а, о, у, ы, э, и. «б», «т», «с» esa undosh harflar.",
      payload: {
        prompt: "Quyidagilardan qaysi biri unli harf?",
        promptLang: "uz",
        options: ["б", "о", "т", "с"],
        correctIndex: 1,
      },
    },
    {
      id: "a1-m2-l2-q02",
      lessonId: "a1-m2-l2",
      orderIndex: 2,
      type: "word_selection",
      explanationUz:
        "«Гласная» — unli harf (а, о, у, ы, э, и). «Согласная» — undosh harf, «слово» — so'z.",
      payload: {
        promptUz: "Unli harf",
        options: ["гласная", "слово", "буква", "согласная"],
        correctIndex: 0,
      },
    },
    {
      id: "a1-m2-l2-q03",
      lessonId: "a1-m2-l2",
      orderIndex: 3,
      type: "fill_blank",
      explanationUz:
        "Urg'u tushmagan «о» odatda «а» kabi o'qiladi: «молоко» → [малако]. Bu rus tilidagi asosiy talaffuz qoidalaridan biri.",
      payload: {
        sentence: "В слове «молоко» буква «о» читается как ___.",
        options: ["о", "у", "э", "а"],
        correctIndex: 3,
      },
    },
    {
      id: "a1-m2-l2-q04",
      lessonId: "a1-m2-l2",
      orderIndex: 4,
      type: "translation",
      explanationUz:
        "«Unli harf» — «гласная буква». «гласная» — unli, «согласная» esa undosh harf deyiladi.",
      payload: {
        direction: "uz_to_ru",
        source: "Unli harf",
        accepted: ["гласная буква", "гласная"],
      },
    },
    {
      id: "a1-m2-l2-q05",
      lessonId: "a1-m2-l2",
      orderIndex: 5,
      type: "true_false",
      explanationUz:
        "«ы» — unli harf, u og'iz orqasida ovoz chiqaradi, shuning uchun «undosh harf» degan tarjima noto'g'ri.",
      payload: {
        ruText: "Буква «ы» — гласная.",
        uzTranslation: "«ы» harfi undosh harf.",
        isTrue: false,
      },
    },
    {
      id: "a1-m2-l2-q06",
      lessonId: "a1-m2-l2",
      orderIndex: 6,
      type: "listening",
      explanationUz:
        "Bu uchta unli harf: а, о, у. Ular og'izni ochib ovoz chiqaradi, undosh harflar esa lab, til va tomoq orqali chiqadi.",
      payload: {
        speakText: "А, О, У.",
        promptUz: "Esiting va to'g'ri javobni tanlang.",
        options: [
          "Bu raqamlar",
          "Bu unli harflar",
          "Bu undosh harflar",
          "Bu so'zlar",
        ],
        correctIndex: 1,
      },
    },
    {
      id: "a1-m2-l2-q07",
      lessonId: "a1-m2-l2",
      orderIndex: 7,
      type: "multiple_choice",
      explanationUz:
        "Urg'u tushmagan «о» «а» kabi o'qiladi: «молодой» → [маладой]. Urg'u tushgan «о» esa «о» bo'lib qoladi.",
      payload: {
        prompt: "«Молодой» so'zidagi urg'u tushmagan «о» qanday o'qiladi?",
        promptLang: "uz",
        options: ["«о» kabi", "«ы» kabi", "«и» kabi", "«а» kabi"],
        correctIndex: 3,
      },
    },
    {
      id: "a1-m2-l2-q08",
      lessonId: "a1-m2-l2",
      orderIndex: 8,
      type: "sentence_building",
      explanationUz:
        "«Мы учим русский алфавит» — «Biz rus alifbosini o'rganmoqdamiz». «учим» — o'rganmoqdamiz (biz shakli).",
      payload: {
        correct: ["Мы", "учим", "русский", "алфавит", "."],
        distractors: ["буква", "говорят", "она"],
      },
    },
    {
      id: "a1-m2-l2-q09",
      lessonId: "a1-m2-l2",
      orderIndex: 9,
      type: "word_matching",
      explanationUz:
        "«гласная» — unli; «мама» — ona; «да» — ha; «нет» — yo'q. Bu so'zlar keyingi o'qish mashqlari uchun asos bo'ladi.",
      payload: {
        pairs: [
          { ru: "гласная", uz: "unli" },
          { ru: "мама", uz: "ona" },
          { ru: "да", uz: "ha" },
          { ru: "нет", uz: "yo'q" },
        ],
      },
    },
    {
      id: "a1-m2-l2-q10",
      lessonId: "a1-m2-l2",
      orderIndex: 10,
      type: "fill_blank",
      explanationUz:
        "«мама» = м + а + м + а: «а» — unli, «м» — undosh. Har bir so'z unli va undosh harflardan iborat bo'ladi.",
      payload: {
        sentence: "Слова «мама» и «папа» состоят из ___ и согласных букв.",
        options: ["твёрдых", "мягких", "гласных", "ударных"],
        correctIndex: 2,
      },
    },
    {
      id: "a1-m2-l2-q11",
      lessonId: "a1-m2-l2",
      orderIndex: 11,
      type: "translation",
      explanationUz:
        "«Мама» — ona, «папа» — ota. «и» — va (ulash so'zi), shu sababli «Мама и папа» = «Ona va ota».",
      payload: {
        direction: "ru_to_uz",
        source: "Мама и папа.",
        accepted: ["ona va ota", "ona va otam"],
      },
    },
    {
      id: "a1-m2-l2-q12",
      lessonId: "a1-m2-l2",
      orderIndex: 12,
      type: "true_false",
      explanationUz:
        "To'g'ri: bu to'rtala unli harf. Ular oldida «й» kabi tovush eshitiladi: «я» — [йа], «ё» — [йо], «ю» — [йу].",
      payload: {
        ruText: "Буквы «е», «ё», «ю», «я» — тоже гласные.",
        uzTranslation: "«е», «ё», «ю», «я» harflari ham unli harflar.",
        isTrue: true,
      },
    },

    // ------------------------------------------------------------------
    // a1-m2-l3 — Undosh harflar (12 ta savol)
    // ------------------------------------------------------------------
    {
      id: "a1-m2-l3-q01",
      lessonId: "a1-m2-l3",
      orderIndex: 1,
      type: "multiple_choice",
      explanationUz:
        "21 ta undosh harf bor (б, в, г, д... ш, щ). Qolgan 10 ta unli harf va 2 ta belgi (ъ, ь) bilan jami 33 ta harf.",
      payload: {
        prompt: "Rus tilida nechta undosh harf bor?",
        promptLang: "uz",
        options: ["10", "21", "22", "20"],
        correctIndex: 1,
      },
    },
    {
      id: "a1-m2-l3-q02",
      lessonId: "a1-m2-l3",
      orderIndex: 2,
      type: "word_matching",
      explanationUz:
        "«согласная» — undosh; «мягкий знак ь» — yumshoq belgi, «твёрдый знак ъ» — qattik belgi. «мать» so'zi ь bilan yoziladi.",
      payload: {
        pairs: [
          { ru: "согласная буква", uz: "undosh harf" },
          { ru: "мягкий знак ь", uz: "yumshoq belgi" },
          { ru: "твёрдый знак ъ", uz: "qattik belgi" },
          { ru: "мать", uz: "ona" },
        ],
      },
    },
    {
      id: "a1-m2-l3-q03",
      lessonId: "a1-m2-l3",
      orderIndex: 3,
      type: "fill_blank",
      explanationUz:
        "«ь» — yumshoq belgi: u undoshni yumshoqtiradi va so'z oxirida turadi (мать, дочь). «ъ» esa qattik belgi.",
      payload: {
        sentence: "Слова «мать» и «дочь» пишутся с буквой ___.",
        options: ["ъ", "о", "и", "ь"],
        correctIndex: 3,
      },
    },
    {
      id: "a1-m2-l3-q04",
      lessonId: "a1-m2-l3",
      orderIndex: 4,
      type: "multiple_choice",
      explanationUz:
        "«ь» undoshni yumshoqtiradi (мать → [м'ать]) va so'z ma'nosini o'zgartirmaydi. So'z bo'g'ini ajratish uchun esa «ъ» ishlatiladi.",
      payload: {
        prompt: "«Мать» so'zidagi «ь» nima uchun yoziladi?",
        promptLang: "uz",
        options: [
          "Undoshni yumshoqtirish uchun",
          "Unlini uzaytirish uchun",
          "Urg'u uchun",
          "So'zni ajratish uchun",
        ],
        correctIndex: 0,
      },
    },
    {
      id: "a1-m2-l3-q05",
      lessonId: "a1-m2-l3",
      orderIndex: 5,
      type: "true_false",
      explanationUz:
        "To'g'ri: «ъ» — твёрдый знак (qattik belgi). U so'z bo'g'ini ajratib turadi, masalan «подъезд».",
      payload: {
        ruText: "Буква «ъ» — твёрдый знак.",
        uzTranslation: "«ъ» harfi qattik belgi.",
        isTrue: true,
      },
    },
    {
      id: "a1-m2-l3-q06",
      lessonId: "a1-m2-l3",
      orderIndex: 6,
      type: "true_false",
      explanationUz:
        "Bu noto'g'ri: «ь» ovozni o'zgartirmaydi, uni faqat yumshoqtiradi. Masalan: «мать» — [м'ать], ma'no o'zgarmaydi.",
      payload: {
        ruText: "Буква «ь» меняет звук полностью.",
        uzTranslation: "«ь» harfi ovozni butunlay o'zgartiradi.",
        isTrue: false,
      },
    },
    {
      id: "a1-m2-l3-q07",
      lessonId: "a1-m2-l3",
      orderIndex: 7,
      type: "listening",
      explanationUz:
        "«мать» — ona, «брат» — aka-uka. «мать» so'zida yumshoq belgi «ь» bor, «брат» esa qattik undoshlar bilan tugaydi.",
      payload: {
        speakText: "Мать и брат.",
        promptUz: "Esiting va to'g'ri tarjimani tanlang.",
        options: [
          "Ota va ona",
          "Ona va aka-uka",
          "Do'st va dushman",
          "O'qituvchi va talaba",
        ],
        correctIndex: 1,
      },
    },
    {
      id: "a1-m2-l3-q08",
      lessonId: "a1-m2-l3",
      orderIndex: 8,
      type: "word_selection",
      explanationUz:
        "«ъ» — твёрдый знак (qattik belgi), «ь» — мягкий знак (yumshoq belgi). «ё» va «э» esa unli harflar.",
      payload: {
        promptUz: "Qattik belgi",
        options: ["ь", "ё", "ъ", "э"],
        correctIndex: 2,
      },
    },
    {
      id: "a1-m2-l3-q09",
      lessonId: "a1-m2-l3",
      orderIndex: 9,
      type: "sentence_building",
      explanationUz:
        "«У меня есть брат и сестра» — «Mening aka-ukam va opa-singlim bor». «есть» — bor (bo'lish fe'li).",
      payload: {
        correct: ["У", "меня", "есть", "брат", "и", "сестра", "."],
        distractors: ["мать", "дом", "школа"],
      },
    },
    {
      id: "a1-m2-l3-q10",
      lessonId: "a1-m2-l3",
      orderIndex: 10,
      type: "multiple_choice",
      explanationUz:
        "«щ» doim yumshoq o'qiladi. «ж» va «ш» doim qattik, «ц» ham doim qattik o'qiladi.",
      payload: {
        prompt: "Quyidagi qaysi harf doim yumshoq o'qiladi?",
        promptLang: "uz",
        options: ["ц", "ш", "щ", "ж"],
        correctIndex: 2,
      },
    },
    {
      id: "a1-m2-l3-q11",
      lessonId: "a1-m2-l3",
      orderIndex: 11,
      type: "translation",
      explanationUz:
        "«Yumshoq belgi» — «мягкий знак» (ь). U undoshni yumshoqtiradi: мать, дочь, ночь.",
      payload: {
        direction: "uz_to_ru",
        source: "Yumshoq belgi",
        accepted: ["мягкий знак"],
      },
    },
    {
      id: "a1-m2-l3-q12",
      lessonId: "a1-m2-l3",
      orderIndex: 12,
      type: "fill_blank",
      explanationUz:
        "«подъезд» so'zida qattik belgi «ъ» bor: u «под» va «езд» qismlarini ajratib turadi.",
      payload: {
        sentence: "В слове «подъезд» есть буква ___.",
        options: ["ь", "ы", "э", "ъ"],
        correctIndex: 3,
      },
    },

    // ------------------------------------------------------------------
    // a1-m2-l4 — Harflar talaffuzi (12 ta savol)
    // ------------------------------------------------------------------
    {
      id: "a1-m2-l4-q01",
      lessonId: "a1-m2-l4",
      orderIndex: 1,
      type: "multiple_choice",
      explanationUz:
        "«ч» doim «ch» tovushida o'qiladi: «чай» — choy. Bu o'zbek tilidagi «ch» bilan deyarli bir xil.",
      payload: {
        prompt: "«чай» so'zidagi «ч» qaysi o'zbekcha tovushga yaqin?",
        promptLang: "uz",
        options: ["sh (shar)", "ch (choy)", "j (juk)", "ts (tsirk)"],
        correctIndex: 1,
      },
    },
    {
      id: "a1-m2-l4-q02",
      lessonId: "a1-m2-l4",
      orderIndex: 2,
      type: "multiple_choice",
      explanationUz:
        "«ж» — «j» tovushiga yaqin: «жук» — juk (kuya). «ш» esa «sh» (shar) kabi o'qiladi.",
      payload: {
        prompt: "«ж» harfi qaysi o'zbekcha tovushga yaqin?",
        promptLang: "uz",
        options: ["sh", "ch", "ts", "j"],
        correctIndex: 3,
      },
    },
    {
      id: "a1-m2-l4-q03",
      lessonId: "a1-m2-l4",
      orderIndex: 3,
      type: "word_selection",
      explanationUz:
        "«чай» — choy; «ч» = ch tovushi. «чашка» — chashka, «шар» — shar, «цех» — sex (boshqa so'zlar).",
      payload: {
        promptUz: "Choy",
        options: ["шар", "чай", "цех", "чашка"],
        correctIndex: 1,
      },
    },
    {
      id: "a1-m2-l4-q04",
      lessonId: "a1-m2-l4",
      orderIndex: 4,
      type: "listening",
      explanationUz:
        "«шар» — «sh» tovushi bilan o'qiladi: shar (shinchoq). «чай» esa «ch» (choy) deb o'qiladi.",
      payload: {
        speakText: "Шар.",
        promptUz: "Esiting va to'g'ri tarjimani tanlang.",
        options: ["Shar (shinchoq)", "Choy", "Kuya", "Tepsi"],
        correctIndex: 0,
      },
    },
    {
      id: "a1-m2-l4-q05",
      lessonId: "a1-m2-l4",
      orderIndex: 5,
      type: "fill_blank",
      explanationUz:
        "«щ» — doim yumshoq «sh'» tovushi: «щи» o'zbekchada «shi» ga yaqin. «ш» esa qattiq «sh» («шар» — shar) bo'ladi.",
      payload: {
        sentence: "Буква «щ» читается как «___».",
        options: ["ch", "ts", "j", "sh'"],
        correctIndex: 3,
      },
    },
    {
      id: "a1-m2-l4-q06",
      lessonId: "a1-m2-l4",
      orderIndex: 6,
      type: "translation",
      explanationUz:
        "«Цирк» — sirk. «ц» harfi «ts» tovushida o'qiladi: tsirk, o'zbek tilida esa «sirk» bo'ladi.",
      payload: {
        direction: "ru_to_uz",
        source: "Цирк",
        accepted: ["sirk"],
      },
    },
    {
      id: "a1-m2-l4-q07",
      lessonId: "a1-m2-l4",
      orderIndex: 7,
      type: "true_false",
      explanationUz:
        "To'g'ri: «ж» va «ш» doim qattik o'qiladi, ularning yumshoq jufti yo'q. «ч» va «щ» esa doim yumshoq.",
      payload: {
        ruText: "Буквы «ж» и «ш» всегда твёрдые.",
        uzTranslation: "«ж» va «ш» harflari doim qattik o'qiladi.",
        isTrue: true,
      },
    },
    {
      id: "a1-m2-l4-q08",
      lessonId: "a1-m2-l4",
      orderIndex: 8,
      type: "true_false",
      explanationUz:
        "Bu noto'g'ri: «ы» og'iz orqasida (o'zbek «ı» ga yaqin), «и» esa tilda oldinda (o'zbek «i» ga yaqin) o'qiladi.",
      payload: {
        ruText: "Буква «ы» — это то же самое, что «и».",
        uzTranslation: "«ы» va «и» — bir xil tovush.",
        isTrue: false,
      },
    },
    {
      id: "a1-m2-l4-q09",
      lessonId: "a1-m2-l4",
      orderIndex: 9,
      type: "word_matching",
      explanationUz:
        "«чай» — choy (ch), «шар» — shinchoq (sh), «жук» — kuya (j), «цирк» — sirk (ts).",
      payload: {
        pairs: [
          { ru: "чай", uz: "choy" },
          { ru: "шар", uz: "shinchoq" },
          { ru: "жук", uz: "kuya" },
          { ru: "цирк", uz: "sirk" },
        ],
      },
    },
    {
      id: "a1-m2-l4-q10",
      lessonId: "a1-m2-l4",
      orderIndex: 10,
      type: "multiple_choice",
      explanationUz:
        "«ы» — og'iz orqasida chiqariladigan unli tovush, o'zbek «ı» ga yaqin. «и» esa tilda oldinda, «i» ga yaqin o'qiladi.",
      payload: {
        prompt: "«ы» harfi qanday o'qiladi?",
        promptLang: "uz",
        options: [
          "Og'iz orqasida (o'zbek «ı» ga yaqin)",
          "Tilda oldinda («i» ga yaqin)",
          "Lab bilan («u» ga yaqin)",
          "Og'iz ochib («a» ga yaqin)",
        ],
        correctIndex: 0,
      },
    },
    {
      id: "a1-m2-l4-q11",
      lessonId: "a1-m2-l4",
      orderIndex: 11,
      type: "sentence_building",
      explanationUz:
        "«Она пьёт чай» — «U choy ichmoqda». «пьёт» — ichmoqda (3-shaxs), «чай» — choy.",
      payload: {
        correct: ["Она", "пьёт", "чай", "."],
        distractors: ["жук", "шар", "вижу"],
      },
    },
    {
      id: "a1-m2-l4-q12",
      lessonId: "a1-m2-l4",
      orderIndex: 12,
      type: "listening",
      explanationUz:
        "«Цирк» — «ts» tovushi bilan o'qiladi: tsirk → sirk. «чай» esa «ch» (choy), «шар» esa «sh» (shar) bo'ladi.",
      payload: {
        speakText: "Цирк.",
        promptUz: "Esiting va to'g'ri tarjimani tanlang.",
        options: ["Choy", "Shar", "Sirk", "Kuya"],
        correctIndex: 2,
      },
    },

    // ------------------------------------------------------------------
    // a1-m2-l5 — O'qish mashqlari (12 ta savol)
    // ------------------------------------------------------------------
    {
      id: "a1-m2-l5-q01",
      lessonId: "a1-m2-l5",
      orderIndex: 1,
      type: "multiple_choice",
      explanationUz:
        "«мама» = ма-ма, ya'ni 2 ta bo'g'in. Har bir unli harf yangi bo'g'in boshlaydi.",
      payload: {
        prompt: "«Мама» so'zi nechta bo'g'inga bo'linadi?",
        promptLang: "uz",
        options: ["1", "3", "2", "4"],
        correctIndex: 2,
      },
    },
    {
      id: "a1-m2-l5-q02",
      lessonId: "a1-m2-l5",
      orderIndex: 2,
      type: "fill_blank",
      explanationUz:
        "«мама» — ма-ма: ikkala bo'g'inda ham «а» bor. Bo'g'inlar soni unli harflar soniga teng.",
      payload: {
        sentence: "Слово «мама» состоит из слогов: ма-___.",
        options: ["мо", "ме", "му", "ма"],
        correctIndex: 3,
      },
    },
    {
      id: "a1-m2-l5-q03",
      lessonId: "a1-m2-l5",
      orderIndex: 3,
      type: "word_selection",
      explanationUz:
        "«дом» — uy; «кот» — mushuk; «брат» — aka-uka; «школа» — maktab.",
      payload: {
        promptUz: "Uy",
        options: ["дом", "кот", "брат", "школа"],
        correctIndex: 0,
      },
    },
    {
      id: "a1-m2-l5-q04",
      lessonId: "a1-m2-l5",
      orderIndex: 4,
      type: "translation",
      explanationUz:
        "«брат» — aka-uka, «сестра» — opa-singil. «и» — va (ulash so'zi), shuning uchun ikkala so'z birlashadi.",
      payload: {
        direction: "ru_to_uz",
        source: "Брат и сестра.",
        accepted: ["aka-uka va opa-singil", "aka va opa-singil"],
      },
    },
    {
      id: "a1-m2-l5-q05",
      lessonId: "a1-m2-l5",
      orderIndex: 5,
      type: "listening",
      explanationUz:
        "«мама» — ona, «папа» — ota. Bu so'zlar bo'g'inlarga ajratib o'qiladi: ма-ма, па-па.",
      payload: {
        speakText: "Мама и папа.",
        promptUz: "Esiting va to'g'ri tarjimani tanlang.",
        options: [
          "Aka va opa",
          "O'qituvchi va talaba",
          "Ona va ota",
          "Uy va maktab",
        ],
        correctIndex: 2,
      },
    },
    {
      id: "a1-m2-l5-q06",
      lessonId: "a1-m2-l5",
      orderIndex: 6,
      type: "true_false",
      explanationUz:
        "To'g'ri: «школа» ikki bo'g'inga bo'linadi — шко-ла. Birinchi bo'g'inning oxirida unli «о» turadi.",
      payload: {
        ruText: "Слово «школа» читается как шко-ла.",
        uzTranslation: "«школа» so'zi «шко-ла» deb o'qiladi.",
        isTrue: true,
      },
    },
    {
      id: "a1-m2-l5-q07",
      lessonId: "a1-m2-l5",
      orderIndex: 7,
      type: "sentence_building",
      explanationUz:
        "«Это мой брат» — «Bu menim aka-ukam». «мой» — menim (erkak jins uchun), «моя» — menim (ayol jins uchun).",
      payload: {
        correct: ["Это", "мой", "брат", "."],
        distractors: ["сестра", "есть", "большой"],
      },
    },
    {
      id: "a1-m2-l5-q08",
      lessonId: "a1-m2-l5",
      orderIndex: 8,
      type: "multiple_choice",
      explanationUz:
        "«учитель» = у-чи-тель, ya'ni 3 ta bo'g'in. Har bir unli harf (у, и, е) yangi bo'g'in boshlaydi.",
      payload: {
        prompt: "«Учитель» so'zi nechta bo'g'inga bo'linadi?",
        promptLang: "uz",
        options: ["4", "2", "5", "3"],
        correctIndex: 3,
      },
    },
    {
      id: "a1-m2-l5-q09",
      lessonId: "a1-m2-l5",
      orderIndex: 9,
      type: "fill_blank",
      explanationUz:
        "«школа» = шко-ла: birinchi bo'g'in — «шко», ikkinchisi — «ла». Bo'g'inlar unli harflarga qarab ajraladi.",
      payload: {
        sentence: "Первый слог в слове «школа»: ___.",
        options: ["шко", "ло", "ша", "ко"],
        correctIndex: 0,
      },
    },
    {
      id: "a1-m2-l5-q10",
      lessonId: "a1-m2-l5",
      orderIndex: 10,
      type: "word_matching",
      explanationUz:
        "«мама» — ona, «папа» — ota, «дом» — uy, «школа» — maktab. Bu so'zlarni bo'g'inlarga ajratib o'qing.",
      payload: {
        pairs: [
          { ru: "мама", uz: "ona" },
          { ru: "папа", uz: "ota" },
          { ru: "дом", uz: "uy" },
          { ru: "школа", uz: "maktab" },
        ],
      },
    },
    {
      id: "a1-m2-l5-q11",
      lessonId: "a1-m2-l5",
      orderIndex: 11,
      type: "translation",
      explanationUz:
        "«Bu menim aka-ukam» — «Это мой брат». «брат» — aka-uka, «сестра» — opa-singil.",
      payload: {
        direction: "uz_to_ru",
        source: "Bu menim aka-ukam.",
        accepted: ["это мой брат", "это мой брат?"],
      },
    },
    {
      id: "a1-m2-l5-q12",
      lessonId: "a1-m2-l5",
      orderIndex: 12,
      type: "true_false",
      explanationUz:
        "To'g'ri: с-е-с-т-р-а — 6 ta harf, «с» so'zda ikki marta takrorlanadi.",
      payload: {
        ruText: "Слово «сестра» состоит из шести букв.",
        uzTranslation: "«сестра» so'zi olti harfdan iborat.",
        isTrue: true,
      },
    },
  ],
};
