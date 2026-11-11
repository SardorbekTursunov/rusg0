import type { ModuleContent } from "@/types";

// A1 — 4-modul: Школа (Maktab)
// Barcha ruscha matnlar lingvistik jihatdan to'g'ri. Tushuntirishlar o'zbek tilida.

export const module4: ModuleContent = {
  module: {
    id: "a1-m4",
    level: "A1",
    orderIndex: 4,
    title: "Школа",
    titleUz: "Maktab",
    description: "Maktab buyumlari, fanlar, o'qituvchi bilan muloqot, dars jadvali va maktab haqida suhbat.",
  },
  lessons: [
    {
      id: "a1-m4-l1",
      moduleId: "a1-m4",
      orderIndex: 1,
      title: "Maktab buyumlari",
      titleRu: "Школьные принадлежности",
      description: "Ruchka, daftar, kitob va maktab buyumlarining ruscha nomlari.",
      xpReward: 10,
      estimatedMinutes: 5,
    },
    {
      id: "a1-m4-l2",
      moduleId: "a1-m4",
      orderIndex: 2,
      title: "Fanlar",
      titleRu: "Школьные предметы",
      description: "Maktabdagi fanlar va ularning ruscha nomlari.",
      xpReward: 10,
      estimatedMinutes: 5,
    },
    {
      id: "a1-m4-l3",
      moduleId: "a1-m4",
      orderIndex: 3,
      title: "O'qituvchi va o'quvchi",
      titleRu: "Учитель и ученик",
      description: "O'qituvchi va o'quvchi rollari, ular haqida gapirish va asosiy fe'llar.",
      xpReward: 10,
      estimatedMinutes: 6,
    },
    {
      id: "a1-m4-l4",
      moduleId: "a1-m4",
      orderIndex: 4,
      title: "Dars jadvali",
      titleRu: "Расписание уроков",
      description: "Uroklar vaqti, raqamlar, xonalar va tanaffus haqida gapirish.",
      xpReward: 10,
      estimatedMinutes: 5,
    },
    {
      id: "a1-m4-l5",
      moduleId: "a1-m4",
      orderIndex: 5,
      title: "Maktab haqida suhbat",
      titleRu: "Разговор о школе",
      description: "Sevimli fan, sinf va darslar vaqti haqida to'liq dialogni tushunish.",
      xpReward: 10,
      estimatedMinutes: 6,
    },
  ],
  questions: [
    // ------------------------------------------------------------------
    // a1-m4-l1 — Maktab buyumlari (12 ta savol)
    // ------------------------------------------------------------------
    {
      id: "a1-m4-l1-q01",
      lessonId: "a1-m4-l1",
      orderIndex: 1,
      type: "multiple_choice",
      explanationUz:
        "«Тетрадь» — daftar. Maktabda har bir fan uchun alohida tetradan foydalaniladi.",
      payload: {
        prompt: "«Тетрадь» so'zining to'g'ri tarjimasini tanlang.",
        promptLang: "uz",
        options: ["Kitob", "Daftar", "Ruchka", "Sumka"],
        correctIndex: 1,
      },
    },
    {
      id: "a1-m4-l1-q02",
      lessonId: "a1-m4-l1",
      orderIndex: 2,
      type: "translation",
      explanationUz:
        "«Карандаш» — karandash. «Кара» qismi «qora» degan ma'noni bildiradi, chunki karandash qora chizadi.",
      payload: {
        direction: "ru_to_uz",
        source: "Карандаш",
        accepted: ["karandash"],
      },
    },
    {
      id: "a1-m4-l1-q03",
      lessonId: "a1-m4-l1",
      orderIndex: 3,
      type: "listening",
      explanationUz:
        "«Это ручка.» — «Bu ruchka (qalam)». «Ручка» — ruchka, yozish uchun asosiy maktab buyumi.",
      payload: {
        speakText: "Это ручка.",
        promptUz: "Esiting va to'g'ri tarjimani tanlang.",
        options: ["Bu daftar.", "Bu ruchka.", "Bu kitob.", "Bu sumka."],
        correctIndex: 1,
      },
    },
    {
      id: "a1-m4-l1-q04",
      lessonId: "a1-m4-l1",
      orderIndex: 4,
      type: "word_selection",
      explanationUz:
        "«Тетрадь» — daftar. «Книга» — kitob, «доска» — dosha, «линейка» — chizg'ich.",
      payload: {
        promptUz: "Daftar",
        options: ["книга", "доска", "тетрадь", "резинка"],
        correctIndex: 2,
      },
    },
    {
      id: "a1-m4-l1-q05",
      lessonId: "a1-m4-l1",
      orderIndex: 5,
      type: "true_false",
      explanationUz:
        "«Линейка» — chizg'ich: u maktab buyumlaridan biri, shuning uchun tarjima to'g'ri.",
      payload: {
        ruText: "Линейка — это школьная принадлежность.",
        uzTranslation: "Lineyka — bu maktab buyumi.",
        isTrue: true,
      },
    },
    {
      id: "a1-m4-l1-q06",
      lessonId: "a1-m4-l1",
      orderIndex: 6,
      type: "sentence_building",
      explanationUz:
        "«Это моя тетрадь.» — «Bu menim daftarim». «моя» (menim) ayol jinsidagi ot qoshida turadi: тетрадь — ayol jinsida.",
      payload: {
        correct: ["Это", "моя", "тетрадь", "."],
        distractors: ["учитель", "линейка", "сумка"],
      },
    },
    {
      id: "a1-m4-l1-q07",
      lessonId: "a1-m4-l1",
      orderIndex: 7,
      type: "fill_blank",
      explanationUz:
        "«Писать на доске» — «dosha ustida yozmoq». «на» + joy → predlogniy (joylashuv) padişa: «на доске».",
      payload: {
        sentence: "Учитель пишет на ___.",
        options: ["доска", "доску", "доске", "доской"],
        correctIndex: 2,
      },
    },
    {
      id: "a1-m4-l1-q08",
      lessonId: "a1-m4-l1",
      orderIndex: 8,
      type: "multiple_choice",
      explanationUz:
        "«Резинка» — kauchuk: u ruchka bilan yozilgan xatoni o'chirish uchun ishlatiladi.",
      payload: {
        prompt: "«Резинка» nimani bildiradi?",
        promptLang: "uz",
        options: ["Qalam", "Daftar", "Kauchuk (yozuvni o'chirish)", "Chizg'ich"],
        correctIndex: 2,
      },
    },
    {
      id: "a1-m4-l1-q09",
      lessonId: "a1-m4-l1",
      orderIndex: 9,
      type: "translation",
      explanationUz:
        "«Maktab sumkasi» — «школьная сумка». «школьная» — maktabga tegishli sifat (ot + -ная).",
      payload: {
        direction: "uz_to_ru",
        source: "Maktab sumkasi",
        accepted: ["школьная сумка", "сумка"],
      },
    },
    {
      id: "a1-m4-l1-q10",
      lessonId: "a1-m4-l1",
      orderIndex: 10,
      type: "word_matching",
      explanationUz:
        "Maktab buyumlari: тетрадь — daftar, карандаш — karandash, линейка — chizg'ich, резинка — kauchuk.",
      payload: {
        pairs: [
          { ru: "Тетрадь", uz: "Daftar" },
          { ru: "Карандаш", uz: "Karandash" },
          { ru: "Линейка", uz: "Chizg'ich" },
          { ru: "Резинка", uz: "Kauchuk" },
        ],
      },
    },
    {
      id: "a1-m4-l1-q11",
      lessonId: "a1-m4-l1",
      orderIndex: 11,
      type: "listening",
      explanationUz:
        "«Где моя тетрадь?» — «Mening daftarim qayerda?». «где» — qayerda (joy so'rovi).",
      payload: {
        speakText: "Где моя тетрадь?",
        promptUz: "Esiting va to'g'ri savolni tanlang.",
        options: [
          "Mening kitobim qayerda?",
          "Mening ruchkam qayerda?",
          "Mening sumkam qayerda?",
          "Mening daftarim qayerda?",
        ],
        correctIndex: 3,
      },
    },
    {
      id: "a1-m4-l1-q12",
      lessonId: "a1-m4-l1",
      orderIndex: 12,
      type: "true_false",
      explanationUz:
        "«Мел» — doshaga yozish uchun kichik oq toshcha, kitob emas. Shuning uchun tarjima noto'g'ri.",
      payload: {
        ruText: "Мел — это школьная принадлежность.",
        uzTranslation: "Mel — bu kitob.",
        isTrue: false,
      },
    },

    // ------------------------------------------------------------------
    // a1-m4-l2 — Fanlar (12 ta savol)
    // ------------------------------------------------------------------
    {
      id: "a1-m4-l2-q01",
      lessonId: "a1-m4-l2",
      orderIndex: 1,
      type: "word_selection",
      explanationUz:
        "«Математика» — matematika. Bu fan raqamlar, tenglamalar va hisoblash bilan bog'liq.",
      payload: {
        promptUz: "Matematika",
        options: ["география", "математика", "музыка", "химия"],
        correctIndex: 1,
      },
    },
    {
      id: "a1-m4-l2-q02",
      lessonId: "a1-m4-l2",
      orderIndex: 2,
      type: "translation",
      explanationUz:
        "«История» — tarix (fan nomi). «История» so'zi o'zbekchaga ham xuddi shunday o'xshaydi.",
      payload: {
        direction: "ru_to_uz",
        source: "История",
        accepted: ["tarix", "tarix fani"],
      },
    },
    {
      id: "a1-m4-l2-q03",
      lessonId: "a1-m4-l2",
      orderIndex: 3,
      type: "multiple_choice",
      explanationUz:
        "«Физкультура» — jismoniy tarbiya darsi. «физика» (fizika) bilan adashtirmang: ular boshqa fanlar.",
      payload: {
        prompt: "«Физкультура» — bu qaysi fan?",
        promptLang: "uz",
        options: ["Kimyo", "Jismoniy tarbiya", "Biologiya", "Musiqa"],
        correctIndex: 1,
      },
    },
    {
      id: "a1-m4-l2-q04",
      lessonId: "a1-m4-l2",
      orderIndex: 4,
      type: "listening",
      explanationUz:
        "«У нас сегодня урок географии» — «Bugun bizda geografiya darsi bor». «урок географии» — geografiya darsi (родительный падеж).",
      payload: {
        speakText: "У нас сегодня урок географии.",
        promptUz: "Esiting va to'g'ri tarjimani tanlang.",
        options: [
          "Bugun bizda tarix darsi bor.",
          "Ertaga bizda geografiya darsi bor.",
          "Bugun bizda geografiya darsi bor.",
          "Bugun bizda kimyo darsi bor.",
        ],
        correctIndex: 2,
      },
    },
    {
      id: "a1-m4-l2-q05",
      lessonId: "a1-m4-l2",
      orderIndex: 5,
      type: "fill_blank",
      explanationUz:
        "«урок музыки» — musiqa darsi. «урок» so'zidan keyin ot roditelniy (egenlik) padişasida turadi: музыки.",
      payload: {
        sentence: "Я люблю урок ___.",
        options: ["музыка", "музыку", "музыки", "музыкой"],
        correctIndex: 2,
      },
    },
    {
      id: "a1-m4-l2-q06",
      lessonId: "a1-m4-l2",
      orderIndex: 6,
      type: "sentence_building",
      explanationUz:
        "«Я люблю урок математики.» — «Men matematika darsini yaxshi ko'raman». «урок» dan keyin fan nomi egenlik padişasida: математики.",
      payload: {
        correct: ["Я", "люблю", "урок", "математики", "."],
        distractors: ["не", "сумка", "учитель"],
      },
    },
    {
      id: "a1-m4-l2-q07",
      lessonId: "a1-m4-l2",
      orderIndex: 7,
      type: "translation",
      explanationUz:
        "«Bugun kimyo darsi bor» — «Сегодня урок химии». «химии» — «химия» so'zining egenlik shakli.",
      payload: {
        direction: "uz_to_ru",
        source: "Bugun kimyo darsi bor.",
        accepted: ["сегодня урок химии", "сегодня урок химии?"],
      },
    },
    {
      id: "a1-m4-l2-q08",
      lessonId: "a1-m4-l2",
      orderIndex: 8,
      type: "true_false",
      explanationUz:
        "«На уроке музыки мы поём» — «Musiqa darsida kuylaymiz». Musiqa darsida qo'shiq aytishadi, tarjima to'g'ri.",
      payload: {
        ruText: "На уроке музыки мы поём.",
        uzTranslation: "Musiqa darsida kuylaymiz.",
        isTrue: true,
      },
    },
    {
      id: "a1-m4-l2-q09",
      lessonId: "a1-m4-l2",
      orderIndex: 9,
      type: "word_matching",
      explanationUz:
        "Fan nomlari: «русский язык» — rus tili, «биология» — biologiya, «химия» — kimyo, «физкультура» — jismoniy tarbiya.",
      payload: {
        pairs: [
          { ru: "Русский язык", uz: "Rus tili" },
          { ru: "Биология", uz: "Biologiya" },
          { ru: "Химия", uz: "Kimyo" },
          { ru: "Физкультура", uz: "Jismoniy tarbiya" },
        ],
      },
    },
    {
      id: "a1-m4-l2-q10",
      lessonId: "a1-m4-l2",
      orderIndex: 10,
      type: "multiple_choice",
      explanationUz:
        "«Английский язык» — ingliz tili. «английский» — Angliyaga tegishli sifat, bu yerda til nomini bildiradi.",
      payload: {
        prompt: "«Английский язык» nima degani?",
        promptLang: "uz",
        options: ["Ingliz tili", "Fransuz tili", "Nemis tili", "Rus tili"],
        correctIndex: 0,
      },
    },
    {
      id: "a1-m4-l2-q11",
      lessonId: "a1-m4-l2",
      orderIndex: 11,
      type: "listening",
      explanationUz:
        "«Математика — мой любимый предмет» — «Matematika — menim sevimli fanim». «любимый» — sevimli.",
      payload: {
        speakText: "Математика — мой любимый предмет.",
        promptUz: "Esiting va to'g'ri tarjimani tanlang.",
        options: [
          "Matematika — menim sevimli fanim.",
          "Matematika — ertangi darsi.",
          "Men matematikani tushunmayman.",
          "Matematika — maktab nomi.",
        ],
        correctIndex: 0,
      },
    },
    {
      id: "a1-m4-l2-q12",
      lessonId: "a1-m4-l2",
      orderIndex: 12,
      type: "true_false",
      explanationUz:
        "«Физика» — maktab fanlaridan biri, musiqa darsi emas. Ikkala ham to'g'ri: fan ham, tarjima ham.",
      payload: {
        ruText: "Физика — это школьный предмет.",
        uzTranslation: "Fizika — bu maktab fanlaridan biri.",
        isTrue: true,
      },
    },

    // ------------------------------------------------------------------
    // a1-m4-l3 — O'qituvchi va o'quvchi (11 ta savol)
    // ------------------------------------------------------------------
    {
      id: "a1-m4-l3-q01",
      lessonId: "a1-m4-l3",
      orderIndex: 1,
      type: "multiple_choice",
      explanationUz:
        "«Учительница» — ayol o'qituvchi. «учитель» — erkak yoki umumiy o'qituvchi, «-ница» qo'shimchasi ayol jinsini bildiradi.",
      payload: {
        prompt: "«Учительница» — bu kim?",
        promptLang: "uz",
        options: ["O'quvchi", "Ayol o'qituvchi", "Direktor", "Sinf mudiri"],
        correctIndex: 1,
      },
    },
    {
      id: "a1-m4-l3-q02",
      lessonId: "a1-m4-l3",
      orderIndex: 2,
      type: "translation",
      explanationUz:
        "«Ученики» — o'quvchilar (ko'plik). Yagona shakli — «ученик» (o'quvchi), «ученица» — qiz o'quvchi.",
      payload: {
        direction: "ru_to_uz",
        source: "Ученики",
        accepted: ["o'quvchilar"],
      },
    },
    {
      id: "a1-m4-l3-q03",
      lessonId: "a1-m4-l3",
      orderIndex: 3,
      type: "word_selection",
      explanationUz:
        "«Задание» — vazifa, topshiriq. «урок» — dars, «кабинет» — xona, «доска» — dosha.",
      payload: {
        promptUz: "Vazifa (topshiriq)",
        options: ["урок", "кабинет", "доска", "задание"],
        correctIndex: 3,
      },
    },
    {
      id: "a1-m4-l3-q04",
      lessonId: "a1-m4-l3",
      orderIndex: 4,
      type: "listening",
      explanationUz:
        "«Учитель спрашивает ученика» — «O'qituvchi o'quvchidan so'raydi». «спрашивать» — so'ramoq, savol bermoq.",
      payload: {
        speakText: "Учитель спрашивает ученика.",
        promptUz: "Esiting va to'g'ri tarjimani tanlang.",
        options: [
          "O'quvchi o'qituvchiga javob beradi.",
          "O'qituvchi o'quvchidan so'raydi.",
          "O'qituvchi daftarni o'qiydi.",
          "O'quvchi ruchka bilan yozadi.",
        ],
        correctIndex: 1,
      },
    },
    {
      id: "a1-m4-l3-q05",
      lessonId: "a1-m4-l3",
      orderIndex: 5,
      type: "fill_blank",
      explanationUz:
        "«Ученик отвечает» — o'quvchi javob beradi. Fe'l gapdagi otga qarab uchinchi shaxsda turadi: ученик → отвечает.",
      payload: {
        sentence: "На уроке ученик ___ на вопросы учителя.",
        options: ["отвечаете", "отвечает", "отвечают", "отвечал"],
        correctIndex: 1,
      },
    },
    {
      id: "a1-m4-l3-q06",
      lessonId: "a1-m4-l3",
      orderIndex: 6,
      type: "sentence_building",
      explanationUz:
        "«Учитель спрашивает ученика» — «O'qituvchi o'quvchidan so'raydi». «спрашивать» kishilik boshi bilan ishlatiladi: спрашивает кого? — ученика.",
      payload: {
        correct: ["Учитель", "спрашивает", "ученика", "."],
        distractors: ["отвечает", "книга", "вчера"],
      },
    },
    {
      id: "a1-m4-l3-q07",
      lessonId: "a1-m4-l3",
      orderIndex: 7,
      type: "translation",
      explanationUz:
        "«O'quvchi javob beradi» — «Ученик отвечает». «отвечать на вопросы» — savollarga javob bermoq.",
      payload: {
        direction: "uz_to_ru",
        source: "O'quvchi javob beradi.",
        accepted: ["ученик отвечает", "ученик отвечает?"],
      },
    },
    {
      id: "a1-m4-l3-q08",
      lessonId: "a1-m4-l3",
      orderIndex: 8,
      type: "true_false",
      explanationUz:
        "«Управляет» — boshqaradi, «преподаёт» (o'qitadi) esa dars beradi. Bu ikki xil harakat, shuning uchun tarjima noto'g'ri.",
      payload: {
        ruText: "Директор управляет школой.",
        uzTranslation: "Direktor maktabni o'qitadi.",
        isTrue: false,
      },
    },
    {
      id: "a1-m4-l3-q09",
      lessonId: "a1-m4-l3",
      orderIndex: 9,
      type: "word_matching",
      explanationUz:
        "Maktab odamlari: «учитель» — o'qituvchi, «ученик» — o'quvchi, «директор» — direktor, «класс» — sinf.",
      payload: {
        pairs: [
          { ru: "Учитель", uz: "O'qituvchi" },
          { ru: "Ученик", uz: "O'quvchi" },
          { ru: "Директор", uz: "Direktor" },
          { ru: "Класс", uz: "Sinf" },
        ],
      },
    },
    {
      id: "a1-m4-l3-q10",
      lessonId: "a1-m4-l3",
      orderIndex: 10,
      type: "multiple_choice",
      explanationUz:
        "O'qituvchi savol beradi, o'quvchi javob beradi. «отвечать» — javob bermoq, aynan o'quvchi buni bajaradi.",
      payload: {
        prompt: "O'qituvchining savollariga kim javob beradi?",
        promptLang: "uz",
        options: ["Dosha", "Daftar", "O'quvchi", "Kabinet"],
        correctIndex: 2,
      },
    },
    {
      id: "a1-m4-l3-q11",
      lessonId: "a1-m4-l3",
      orderIndex: 11,
      type: "listening",
      explanationUz:
        "«Мой учитель очень добрый» — «Mening o'qituvchim juda mehribon». «добрый» — mehribon, yaxshi yurakli.",
      payload: {
        speakText: "Мой учитель очень добрый.",
        promptUz: "Esiting va to'g'ri tarjimani tanlang.",
        options: [
          "Mening sinfim juda katta.",
          "Mening o'quvchim juda tez yuguradi.",
          "Mening kitobim juda qalin.",
          "Mening o'qituvchim juda mehribon.",
        ],
        correctIndex: 3,
      },
    },

    // ------------------------------------------------------------------
    // a1-m4-l4 — Dars jadvali (11 ta savol)
    // ------------------------------------------------------------------
    {
      id: "a1-m4-l4-q01",
      lessonId: "a1-m4-l4",
      orderIndex: 1,
      type: "multiple_choice",
      explanationUz:
        "«Переменка» — tanaffus: uroklar orasidagi dam olish vaqti. «перемена» so'zidan kelgan.",
      payload: {
        prompt: "«Переменка» nimani bildiradi?",
        promptLang: "uz",
        options: ["Dars", "Sinf", "Tanaffus", "Uy vazifasi"],
        correctIndex: 2,
      },
    },
    {
      id: "a1-m4-l4-q02",
      lessonId: "a1-m4-l4",
      orderIndex: 2,
      type: "translation",
      explanationUz:
        "«Первый урок начинается в восемь» — «Birinchi dars sakkizda boshlanadi». «в восемь» — sakkizda (soat ma'nosi).",
      payload: {
        direction: "ru_to_uz",
        source: "Первый урок начинается в восемь.",
        accepted: [
          "birinchi dars sakkizda boshlanadi",
          "birinchi dars sakkizda boshlanadi?",
        ],
      },
    },
    {
      id: "a1-m4-l4-q03",
      lessonId: "a1-m4-l4",
      orderIndex: 3,
      type: "fill_blank",
      explanationUz:
        "«Сейчас перемена» — «Hozir tanaffus». «сейчас» dan keyin ot nominativ (asosiy) padişasida turadi.",
      payload: {
        sentence: "Сейчас ___.",
        options: ["переменка", "переменки", "переменке", "переменку"],
        correctIndex: 0,
      },
    },
    {
      id: "a1-m4-l4-q04",
      lessonId: "a1-m4-l4",
      orderIndex: 4,
      type: "listening",
      explanationUz:
        "«Урок номер три начинается в десять» — «Uchinchi dars o'nida boshlanadi». «номер три» — uchinchi raqam.",
      payload: {
        speakText: "Урок номер три начинается в десять.",
        promptUz: "Esiting va qaysi dars qachon boshlanishini tanlang.",
        options: [
          "Ikkinchi dars o'nda boshlanadi.",
          "Birinchi dars o'n beshda boshlanadi.",
          "Uchinchi dars o'nida boshlanadi.",
          "Uchinchi dars sakkizda boshlanadi.",
        ],
        correctIndex: 2,
      },
    },
    {
      id: "a1-m4-l4-q05",
      lessonId: "a1-m4-l4",
      orderIndex: 5,
      type: "word_selection",
      explanationUz:
        "«Завтра» — ertaga. «сегодня» — bugun, «вчера» — kecha, «утром» — ertalab.",
      payload: {
        promptUz: "Ertaga",
        options: ["сегодня", "вчера", "завтра", "утром"],
        correctIndex: 2,
      },
    },
    {
      id: "a1-m4-l4-q06",
      lessonId: "a1-m4-l4",
      orderIndex: 6,
      type: "sentence_building",
      explanationUz:
        "«Какой урок у тебя сейчас?» — «Hozir qaysi darsing?». Savol belgisi alohida token sifatida turadi.",
      payload: {
        correct: ["Какой", "урок", "у", "тебя", "сейчас", "?"],
        distractors: ["вчера", "учитель", "дома"],
      },
    },
    {
      id: "a1-m4-l4-q07",
      lessonId: "a1-m4-l4",
      orderIndex: 7,
      type: "true_false",
      explanationUz:
        "«У нас сегодня пять уроков» — «Bugun bizda besh dars bor». «пять» — besh, tarjima to'g'ri.",
      payload: {
        ruText: "У нас сегодня пять уроков.",
        uzTranslation: "Bugun bizda besh dars bor.",
        isTrue: true,
      },
    },
    {
      id: "a1-m4-l4-q08",
      lessonId: "a1-m4-l4",
      orderIndex: 8,
      type: "translation",
      explanationUz:
        "«Darslar soat to'qqizda boshlanadi» — «Уроки начинаются в девять». «в девять» — to'qqizda (dars vaqti).",
      payload: {
        direction: "uz_to_ru",
        source: "Darslar soat to'qqizda boshlanadi.",
        accepted: ["уроки начинаются в девять", "уроки начинаются в девять?"],
      },
    },
    {
      id: "a1-m4-l4-q09",
      lessonId: "a1-m4-l4",
      orderIndex: 9,
      type: "word_matching",
      explanationUz:
        "Dars jadvali so'zlari: «урок» — dars, «переменка» — tanaffus, «кабинет» — xona, «номер» — raqam.",
      payload: {
        pairs: [
          { ru: "Урок", uz: "Dars" },
          { ru: "Переменка", uz: "Tanaffus" },
          { ru: "Кабинет", uz: "Xona" },
          { ru: "Номер", uz: "Raqam" },
        ],
      },
    },
    {
      id: "a1-m4-l4-q10",
      lessonId: "a1-m4-l4",
      orderIndex: 10,
      type: "multiple_choice",
      explanationUz:
        "«В кабинете номер пять» — «beshinchi xonada». «в» + kabinet → «в кабинете» (joylashuv padişasi), «номер пять» — raqam besh.",
      payload: {
        prompt: "«В кабинете номер пять» bu nimani bildiradi?",
        promptLang: "uz",
        options: ["5-darsda", "5-xonada", "5-sinfda", "5-kunda"],
        correctIndex: 1,
      },
    },
    {
      id: "a1-m4-l4-q11",
      lessonId: "a1-m4-l4",
      orderIndex: 11,
      type: "listening",
      explanationUz:
        "«Завтра у нас урок географии» — «Ertaga bizda geografiya darsi bor». «завтра» — ertaga, «сегодня» — bugun.",
      payload: {
        speakText: "Завтра у нас урок географии.",
        promptUz: "Esiting va to'g'ri tarjimani tanlang.",
        options: [
          "Ertaga bizda tarix darsi bor.",
          "Ertaga bizda geografiya darsi bor.",
          "Bugun bizda geografiya darsi bor.",
          "Ertaga bizda musiqa darsi bor.",
        ],
        correctIndex: 1,
      },
    },

    // ------------------------------------------------------------------
    // a1-m4-l5 — Maktab haqida suhbat (12 ta savol)
    // ------------------------------------------------------------------
    {
      id: "a1-m4-l5-q01",
      lessonId: "a1-m4-l5",
      orderIndex: 1,
      type: "multiple_choice",
      explanationUz:
        "Dialogda Alina «Мне больше всего нравится музыка» deydi, ya'ni unga musiqa darsi eng yoqadi.",
      payload: {
        prompt: "Ushbu dialogda qizga (Alinaga) qaysi fan eng ko'proq yoqadi?",
        promptLang: "uz",
        options: ["Matematika", "Geografiya", "Musiqa", "Fizika"],
        correctIndex: 2,
      },
    },
    {
      id: "a1-m4-l5-q02",
      lessonId: "a1-m4-l5",
      orderIndex: 2,
      type: "translation",
      explanationUz:
        "«В каком ты классе?» — «Qaysi sinfdasan?». Maktab haqida suhbatda bu eng tabiiy savol.",
      payload: {
        direction: "ru_to_uz",
        source: "В каком ты классе?",
        accepted: ["qaysi sinfdasan", "qaysi sinfdasan?"],
      },
    },
    {
      id: "a1-m4-l5-q03",
      lessonId: "a1-m4-l5",
      orderIndex: 3,
      type: "listening",
      explanationUz:
        "«У нас уроки начинаются в восемь утра» — «Bizda darslar ertalab sakkizda boshlanadi». «в восемь» — sakkizda.",
      payload: {
        speakText: "У нас уроки начинаются в восемь утра.",
        promptUz: "Esiting va to'g'ri tarjimani tanlang.",
        options: [
          "Darslar kechqurun oltida boshlanadi.",
          "Darslar ertalab sakkizda boshlanadi.",
          "Darslar ertalab oltida boshlanadi.",
          "Darslar kechqurun sakkizda boshlanadi.",
        ],
        correctIndex: 1,
      },
    },
    {
      id: "a1-m4-l5-q04",
      lessonId: "a1-m4-l5",
      orderIndex: 4,
      type: "fill_blank",
      explanationUz:
        "«Мне нравится математика» — «Menga matematika yoqadi». «нравится» dan keyin ot nominativ padişasida turadi.",
      payload: {
        sentence: "— Какой урок тебе нравится? — Мне нравится ___.",
        options: ["математики", "математику", "математика", "математике"],
        correctIndex: 2,
      },
    },
    {
      id: "a1-m4-l5-q05",
      lessonId: "a1-m4-l5",
      orderIndex: 5,
      type: "true_false",
      explanationUz:
        "Dialogda «Уроки начинаются в восемь утра» aytilgan, tarjima ham shu ma'noni beradi — to'g'ri.",
      payload: {
        ruText: "Уроки начинаются в восемь утра.",
        uzTranslation: "Darslar ertalab sakkizda boshlanadi.",
        isTrue: true,
      },
    },
    {
      id: "a1-m4-l5-q06",
      lessonId: "a1-m4-l5",
      orderIndex: 6,
      type: "sentence_building",
      explanationUz:
        "«Школа мне очень нравится» — «Maktab menga juda yoqadi». «нравится» 3-shaxsda: maktab (ot) → нравится.",
      payload: {
        correct: ["Школа", "мне", "очень", "нравится", "."],
        distractors: ["завтра", "кабинет", "семь"],
      },
    },
    {
      id: "a1-m4-l5-q07",
      lessonId: "a1-m4-l5",
      orderIndex: 7,
      type: "word_selection",
      explanationUz:
        "«Любимый предмет» — sevimli fan. «любимый» — sevgan, eng yoqqan narsa.",
      payload: {
        promptUz: "Sevimli fan",
        options: ["школьная тетрадь", "любимый предмет", "первый урок", "переменка"],
        correctIndex: 1,
      },
    },
    {
      id: "a1-m4-l5-q08",
      lessonId: "a1-m4-l5",
      orderIndex: 8,
      type: "word_matching",
      explanationUz:
        "Maktab suhbati iboralari: «Мне нравится» — Menga yoqadi, «В каком классе» — Qaysi sinfdasan, «уроки начинаются» — darslar boshlanadi.",
      payload: {
        pairs: [
          { ru: "Мне нравится", uz: "Menga yoqadi" },
          { ru: "В каком классе", uz: "Qaysi sinfdasan" },
          { ru: "Уроки начинаются", uz: "Darslar boshlanadi" },
          { ru: "Любимый предмет", uz: "Sevimli fan" },
        ],
      },
    },
    {
      id: "a1-m4-l5-q09",
      lessonId: "a1-m4-l5",
      orderIndex: 9,
      type: "translation",
      explanationUz:
        "«Menga matematika yoqadi» — «Мне нравится математика». «мне» (menga) — kim yoqishi bildiriladi.",
      payload: {
        direction: "uz_to_ru",
        source: "Menga matematika yoqadi.",
        accepted: ["мне нравится математика", "мне нравится математика?"],
      },
    },
    {
      id: "a1-m4-l5-q10",
      lessonId: "a1-m4-l5",
      orderIndex: 10,
      type: "multiple_choice",
      explanationUz:
        "Dialogda «У нас уроки начинаются в восемь утра» deyilgan, ya'ni darslar sakkizda boshlanadi.",
      payload: {
        prompt: "Ushbu dialogda darslar qachon boshlanadi?",
        promptLang: "uz",
        options: ["Ikkida", "To'qqizda", "Oltida", "Sakkizda"],
        correctIndex: 3,
      },
    },
    {
      id: "a1-m4-l5-q11",
      lessonId: "a1-m4-l5",
      orderIndex: 11,
      type: "listening",
      explanationUz:
        "«Мне больше нравится музыка» — «Menga ko'proq musiqa yoqadi». «больше» — ko'proq (solishtirish darajasi).",
      payload: {
        speakText: "Мне больше нравится музыка.",
        promptUz: "Esiting va to'g'ri tarjimani tanlang.",
        options: [
          "Menga ko'proq matematika yoqadi.",
          "Menga kamroq musiqa yoqadi.",
          "Menga ko'proq musiqa yoqadi.",
          "Menga ko'proq tarix yoqadi.",
        ],
        correctIndex: 2,
      },
    },
    {
      id: "a1-m4-l5-q12",
      lessonId: "a1-m4-l5",
      orderIndex: 12,
      type: "true_false",
      explanationUz:
        "Dialogda darslar ikkida (в два дня) tugaydi, sakkizda emas. Sakkizda ular boshlanadi, shuning uchun tarjima noto'g'ri.",
      payload: {
        ruText: "Уроки заканчиваются в восемь утра.",
        uzTranslation: "Darslar ertalab sakkizda tugaydi.",
        isTrue: false,
      },
    },
  ],
};
