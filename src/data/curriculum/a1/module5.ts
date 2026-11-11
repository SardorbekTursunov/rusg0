import type { ModuleContent } from "@/types";

// A1 — 5-modul: Ежедневная жизнь (Kundalik hayot)
// Barcha ruscha matnlar lingvistik jihatdan to'g'ri. Tushuntirishlar o'zbek tilida.

export const module5: ModuleContent = {
  module: {
    id: "a1-m5",
    level: "A1",
    orderIndex: 5,
    title: "Ежедневная жизнь",
    titleUz: "Kundalik hayot",
    description: "Kun tartibi, vaqt, hozirgi zamon fe'llari va kundalik suhbat.",
  },
  lessons: [
    {
      id: "a1-m5-l1",
      moduleId: "a1-m5",
      orderIndex: 1,
      title: "Kun tartibi",
      titleRu: "Распорядок дня",
      description: "Ertalab, kunduz, kech va tun davomidagi kundalik ishlar.",
      xpReward: 10,
      estimatedMinutes: 5,
    },
    {
      id: "a1-m5-l2",
      moduleId: "a1-m5",
      orderIndex: 2,
      title: "Vaqt",
      titleRu: "Время",
      description: "Soatga qarab vaqt aytish va kun bo'yi ishlatiladigan vaqt so'zlari.",
      xpReward: 10,
      estimatedMinutes: 5,
    },
    {
      id: "a1-m5-l3",
      moduleId: "a1-m5",
      orderIndex: 3,
      title: "Hozirgi zamon fe'llari",
      titleRu: "Глаголы настоящего времени",
      description: "Hozirgi zamonda gap tuzish va fe'l shakllari bilan tanishish.",
      xpReward: 10,
      estimatedMinutes: 6,
    },
    {
      id: "a1-m5-l4",
      moduleId: "a1-m5",
      orderIndex: 4,
      title: "Kundalik faoliyat",
      titleRu: "Повседневная деятельность",
      description: "Uy, maktab va ko'chadagi kundalik faoliyatlar haqida gapirish.",
      xpReward: 10,
      estimatedMinutes: 5,
    },
    {
      id: "a1-m5-l5",
      moduleId: "a1-m5",
      orderIndex: 5,
      title: "Kundalik suhbat",
      titleRu: "Повседневный разговор",
      description: "Kun tartibi haqida to'liq dialogni tushunish va davom ettirish.",
      xpReward: 10,
      estimatedMinutes: 6,
    },
  ],
  questions: [
    // ------------------------------------------------------------------
    // a1-m5-l1 — Kun tartibi (12 ta savol)
    // ------------------------------------------------------------------
    {
      id: "a1-m5-l1-q01",
      lessonId: "a1-m5-l1",
      orderIndex: 1,
      type: "multiple_choice",
      explanationUz:
        "«Завтракать» — «nonushta qilish». «Я завтракаю» = «Men nonushta qilaman», bu ertalabki ovqatlanish.",
      payload: {
        prompt: "«Завтракаю» — bu qanday harakat?",
        promptLang: "uz",
        options: ["Nonushta qilaman", "Tushlik qilaman", "Kechqurun ovqatlanaman", "Uxlayman"],
        correctIndex: 0,
      },
    },
    {
      id: "a1-m5-l1-q02",
      lessonId: "a1-m5-l1",
      orderIndex: 2,
      type: "translation",
      explanationUz:
        "«Я встаю в семь утра» — «Men ertalab yettida turaman». Vaqt ko'rsatilganda «в» qo'shiladi: «в семь» = yetti da.",
      payload: {
        direction: "ru_to_uz",
        source: "Я встаю в семь утра.",
        accepted: ["men ertalab yettida turaman", "men ertalab yettida uyg'onaman", "men yettida turaman"],
      },
    },
    {
      id: "a1-m5-l1-q03",
      lessonId: "a1-m5-l1",
      orderIndex: 3,
      type: "word_selection",
      explanationUz:
        "«Обедать» — «tushlik qilish», «обедаю» = men tushlik qilaman. «завтракаю» — nonushta qilaman, «ужинаю» — kechqurun ovqatlanaman.",
      payload: {
        promptUz: "Tushlik qilaman",
        options: ["обедаю", "ужинаю", "завтракаю", "работаю"],
        correctIndex: 0,
      },
    },
    {
      id: "a1-m5-l1-q04",
      lessonId: "a1-m5-l1",
      orderIndex: 4,
      type: "fill_blank",
      explanationUz:
        "«Я» — birinchi shaxs birlik, fe'l -у (ю) qo'shimchasini oladi: «я встаю». «встаёшь» — «ты» (sening) uchun.",
      payload: {
        sentence: "Я ___ в семь утра.",
        options: ["встаёшь", "встаю", "встаём", "встают"],
        correctIndex: 1,
      },
    },
    {
      id: "a1-m5-l1-q05",
      lessonId: "a1-m5-l1",
      orderIndex: 5,
      type: "listening",
      explanationUz:
        "«Утром» — ertalab, «иду в школу» — maktabga boraman. «Завтракаю» — nonushta qilaman.",
      payload: {
        speakText: "Утром я завтракаю и иду в школу.",
        promptUz: "Esiting va to'g'ri tarjimani tanlang.",
        options: [
          "Ertalab tushlik qilaman va dam olaman",
          "Ertalab nonushta qilaman va maktabga boraman",
          "Kechqurun nonushta qilaman va uyga boraman",
          "Tunda maktabga boraman",
        ],
        correctIndex: 1,
      },
    },
    {
      id: "a1-m5-l1-q06",
      lessonId: "a1-m5-l1",
      orderIndex: 6,
      type: "word_matching",
      explanationUz:
        "Kun vaqtlari: «утром» — ertalab, «вечером» — kechqurun. «обедаю» — tushlik qilaman, «сплю» — uxlayman.",
      payload: {
        pairs: [
          { ru: "утром", uz: "ertalab" },
          { ru: "вечером", uz: "kechqurun" },
          { ru: "обедаю", uz: "tushlik qilaman" },
          { ru: "сплю", uz: "uxlayman" },
        ],
      },
    },
    {
      id: "a1-m5-l1-q07",
      lessonId: "a1-m5-l1",
      orderIndex: 7,
      type: "sentence_building",
      explanationUz:
        "«Я встаю в семь утра» — «Men ertalab yettida turaman». «утра» — «утро» so'zining kelishik (genitiv) shakli.",
      payload: {
        correct: ["Я", "встаю", "в", "семь", "утра", "."],
        distractors: ["ужинаю", "обедаю", "ночью"],
      },
    },
    {
      id: "a1-m5-l1-q08",
      lessonId: "a1-m5-l1",
      orderIndex: 8,
      type: "true_false",
      explanationUz:
        "«Обед» — tushlik (12:00–15:00), shuning uchun «обедаю днём» = «Men tushlik qilaman» to'g'ri tarjima.",
      payload: {
        ruText: "Я обедаю днём.",
        uzTranslation: "Men tushlik qilaman.",
        isTrue: true,
      },
    },
    {
      id: "a1-m5-l1-q09",
      lessonId: "a1-m5-l1",
      orderIndex: 9,
      type: "multiple_choice",
      explanationUz:
        "«Ужинать» — «kechqurun ovqatlanish» (18:00–21:00). «Я ужинаю» = «Men kechqurun ovqatlanaman».",
      payload: {
        prompt: "«Ужинаю» — bu qachon bajariladigan harakat?",
        promptLang: "uz",
        options: ["Ertalab", "Tushda", "Kechqurun", "Kechasi"],
        correctIndex: 2,
      },
    },
    {
      id: "a1-m5-l1-q10",
      lessonId: "a1-m5-l1",
      orderIndex: 10,
      type: "translation",
      explanationUz:
        "«Men kechqurun ovqatlanaman» — «Я ужинаю». «ужинать» fe'li kechki ovqatlanishni bildiradi.",
      payload: {
        direction: "uz_to_ru",
        source: "Men kechqurun ovqatlanaman.",
        accepted: ["я ужинаю", "вечером я ужинаю"],
      },
    },
    {
      id: "a1-m5-l1-q11",
      lessonId: "a1-m5-l1",
      orderIndex: 11,
      type: "listening",
      explanationUz:
        "«Ночью» — tunida («ночь» so'zidan). «Я сплю ночью» = «Men tunida uxlayman».",
      payload: {
        speakText: "Я сплю ночью.",
        promptUz: "Esiting va to'g'ri tarjimani tanlang.",
        options: [
          "Men kunduzi uxlayman",
          "Men kechqurun ovqatlanaman",
          "Men tunida uxlayman",
          "Men ertalab turaman",
        ],
        correctIndex: 2,
      },
    },
    {
      id: "a1-m5-l1-q12",
      lessonId: "a1-m5-l1",
      orderIndex: 12,
      type: "multiple_choice",
      explanationUz:
        "«Вечером» — kechqurun, kun oxiri. «утром» — ertalab, «днём» — kunduzi, «ночью» — tunida.",
      payload: {
        prompt: "«Вечером я читаю книгу» gapidagi «вечером» nimani bildiradi?",
        promptLang: "uz",
        options: [
          "Vaqtni — kechqurun",
          "Joyni — kutubxonada",
          "Og'irlikni — og'ir kitobni",
          "Shaxsni — do'stim",
        ],
        correctIndex: 0,
      },
    },

    // ------------------------------------------------------------------
    // a1-m5-l2 — Vaqt (12 ta savol)
    // ------------------------------------------------------------------
    {
      id: "a1-m5-l2-q01",
      lessonId: "a1-m5-l2",
      orderIndex: 1,
      type: "multiple_choice",
      explanationUz:
        "«Сколько времени?» — «Hozir soat necha?» degan savol. Javob: «Сейчас три часа» (Hozir uch soat).",
      payload: {
        prompt: "«Сколько времени?» — bu qanday savol?",
        promptLang: "uz",
        options: [
          "Kun qaysi hafta kuni",
          "Soat necha bo'lgani",
          "Yil necha oyga bo'lingan",
          "Necha pul ketdi",
        ],
        correctIndex: 1,
      },
    },
    {
      id: "a1-m5-l2-q02",
      lessonId: "a1-m5-l2",
      orderIndex: 2,
      type: "translation",
      explanationUz:
        "«Сколько сейчас времени?» — vaqt so'ratish savoli. «Сколько» — «qancha», «сейчас» — «hozir».",
      payload: {
        direction: "ru_to_uz",
        source: "Сколько сейчас времени?",
        accepted: [
          "hozir qancha vaqt",
          "hozir qancha vaqt bo'ldi",
          "hozir soat nechada",
          "hozir soat necha bo'ldi",
        ],
      },
    },
    {
      id: "a1-m5-l2-q03",
      lessonId: "a1-m5-l2",
      orderIndex: 3,
      type: "fill_blank",
      explanationUz:
        "Soat aytganda sonlardan keyin «час» genitiv shaklini oladi: «три часа» (uch soat). «трёх» — kelishik shakli, bu yerda kerak emas.",
      payload: {
        sentence: "Сейчас ___ часа.",
        options: ["трёх", "три", "третьих", "тридцать"],
        correctIndex: 1,
      },
    },
    {
      id: "a1-m5-l2-q04",
      lessonId: "a1-m5-l2",
      orderIndex: 4,
      type: "word_selection",
      explanationUz:
        "«Час» — soat (vaqt birligi). «минута» — daqiqa, «секунда» — soniya, «день» — kun (kunning 24 soati).",
      payload: {
        promptUz: "Soat (vaqt birligi)",
        options: ["минута", "секунда", "час", "день"],
        correctIndex: 2,
      },
    },
    {
      id: "a1-m5-l2-q05",
      lessonId: "a1-m5-l2",
      orderIndex: 5,
      type: "multiple_choice",
      explanationUz:
        "«Полчаса» — «yarim soat» (30 daqiqa). «пол» prefiksi «yarim» degan ma'noni beradi: «полчаса назад» — yarim soat oldin.",
      payload: {
        prompt: "«Полчаса» so'zi nima degani?",
        promptLang: "uz",
        options: ["Bir soat", "Uch soat", "O'n daqiqa", "Yarim soat"],
        correctIndex: 3,
      },
    },
    {
      id: "a1-m5-l2-q06",
      lessonId: "a1-m5-l2",
      orderIndex: 6,
      type: "sentence_building",
      explanationUz:
        "«Я обедаю в два часа» — «Men soat ikkida tushlik qilaman». Soat bilan «в» + son + «часа» ishlatiladi.",
      payload: {
        correct: ["Я", "обедаю", "в", "два", "часа", "."],
        distractors: ["ночью", "семь", "сплю"],
      },
    },
    {
      id: "a1-m5-l2-q07",
      lessonId: "a1-m5-l2",
      orderIndex: 7,
      type: "listening",
      explanationUz:
        "«Сейчас три часа» — «Hozir uch soat». Sonlardan keyin «час» genitiv shaklini oladi: «три часа», «пять часов».",
      payload: {
        speakText: "Сейчас три часа.",
        promptUz: "Esiting va to'g'ri vaqtni tanlang.",
        options: [
          "Hozir o'n daqiqa",
          "Hozir uch yarim soat",
          "Hozir uch soat",
          "Hozir to'rt soat",
        ],
        correctIndex: 2,
      },
    },
    {
      id: "a1-m5-l2-q08",
      lessonId: "a1-m5-l2",
      orderIndex: 8,
      type: "true_false",
      explanationUz:
        "«Я ужинаю вечером» — «Men kechqurun ovqatlanaman». Berilgan tarjima boshqa harakatni (nonushta) bildiradi, shuning uchun u noto'g'ri.",
      payload: {
        ruText: "Я ужинаю вечером.",
        uzTranslation: "Men ertalab nonushta qilaman.",
        isTrue: false,
      },
    },
    {
      id: "a1-m5-l2-q09",
      lessonId: "a1-m5-l2",
      orderIndex: 9,
      type: "word_matching",
      explanationUz:
        "Kun so'zlari: «сегодня» — bugun, «завтра» — ertaga, «вчера» — kecha. «в три часа» — uch soatda.",
      payload: {
        pairs: [
          { ru: "сегодня", uz: "bugun" },
          { ru: "завтра", uz: "ertaga" },
          { ru: "вчера", uz: "kecha" },
          { ru: "в три часа", uz: "uch soatda" },
        ],
      },
    },
    {
      id: "a1-m5-l2-q10",
      lessonId: "a1-m5-l2",
      orderIndex: 10,
      type: "translation",
      explanationUz:
        "«Ertaga biz maktabga boramiz» — «Завтра мы идём в школу». «завтра» — ertaga, «идём» — boramiz (birinchi shaxs ko'plik).",
      payload: {
        direction: "uz_to_ru",
        source: "Ertaga biz maktabga boramiz.",
        accepted: ["завтра мы идём в школу", "завтра мы идем в школу", "завтра мы идём в школу?"],
      },
    },
    {
      id: "a1-m5-l2-q11",
      lessonId: "a1-m5-l2",
      orderIndex: 11,
      type: "fill_blank",
      explanationUz:
        "Soat ko'rsatilganda «в» qo'shiladi: «в девять часов» (soat to'qqizda). «на» vaqt bilan ishlatilmaydi.",
      payload: {
        sentence: "Урок начинается ___ девять часов.",
        options: ["на", "до", "в", "с"],
        correctIndex: 2,
      },
    },
    {
      id: "a1-m5-l2-q12",
      lessonId: "a1-m5-l2",
      orderIndex: 12,
      type: "multiple_choice",
      explanationUz:
        "«Вчера» — kecha (o'tgan kun), «сегодня» — bugun, «завтра» — ertaga. Bu uch so'z kundalik suhbatda eng ko'p ishlatiladi.",
      payload: {
        prompt: "«Вчера» so'zi qachon bildiradi?",
        promptLang: "uz",
        options: ["Kecha — o'tgan kun", "Ertaga — keyingi kun", "Bugun — joriy kun", "Har doim"],
        correctIndex: 0,
      },
    },

    // ------------------------------------------------------------------
    // a1-m5-l3 — Hozirgi zamon fe'llari (11 ta savol)
    // ------------------------------------------------------------------
    {
      id: "a1-m5-l3-q01",
      lessonId: "a1-m5-l3",
      orderIndex: 1,
      type: "multiple_choice",
      explanationUz:
        "«Она» — u (ayol kishi), fe'l -ет qo'shimchasini oladi: «она читает». «я читаю» esa «men o'qiyman».",
      payload: {
        prompt: "«Она читает» — bu qaysi shaxs uchun aytiladi?",
        promptLang: "uz",
        options: ["Men", "U (ayol kishi)", "Biz", "Ular"],
        correctIndex: 1,
      },
    },
    {
      id: "a1-m5-l3-q02",
      lessonId: "a1-m5-l3",
      orderIndex: 2,
      type: "translation",
      explanationUz:
        "«Они помогают маме» — «Ular mamaga yordam beradi». «помогать» doim dativ (кому? — kimga) bilan ishlatiladi.",
      payload: {
        direction: "ru_to_uz",
        source: "Они помогают маме.",
        accepted: [
          "ular mamaga yordam beradi",
          "ular mamaga yordam beradilar",
          "ular onasiga yordam beradi",
        ],
      },
    },
    {
      id: "a1-m5-l3-q03",
      lessonId: "a1-m5-l3",
      orderIndex: 3,
      type: "fill_blank",
      explanationUz:
        "«ты» bilan fe'l -ешь qo'shimchasini oladi: «ты пишешь» (sens yozasan). «пишет» — 3-shaxs (он/она) uchun.",
      payload: {
        sentence: "Ты ___ письмо.",
        options: ["пишешь", "пишет", "пишем", "пишут"],
        correctIndex: 0,
      },
    },
    {
      id: "a1-m5-l3-q04",
      lessonId: "a1-m5-l3",
      orderIndex: 4,
      type: "word_selection",
      explanationUz:
        "«Он играет» — u (erkak) o'ynaydi. -ет qo'shimchasi 3-shaxs birlikka xos: «он играет».",
      payload: {
        promptUz: "U o'ynaydi (erkak kishi)",
        options: ["играем", "играю", "играет", "играют"],
        correctIndex: 2,
      },
    },
    {
      id: "a1-m5-l3-q05",
      lessonId: "a1-m5-l3",
      orderIndex: 5,
      type: "sentence_building",
      explanationUz:
        "«Мы хотим читать» — «Biz o'qishni xohlaymiz». «хотим» dan keyin fe'lning asosiy (infinitiv) shakli turadi.",
      payload: {
        correct: ["Мы", "хотим", "читать", "."],
        distractors: ["пишешь", "они", "ученик"],
      },
    },
    {
      id: "a1-m5-l3-q06",
      lessonId: "a1-m5-l3",
      orderIndex: 6,
      type: "listening",
      explanationUz:
        "«Он играет в футбол» — «U futbol o'ynaydi». «играет» — 3-shaxs birlik shakli (он/она).",
      payload: {
        speakText: "Он играет в футбол.",
        promptUz: "Esiting va to'g'ri tarjimani tanlang.",
        options: [
          "U futbol to'pini ko'radi",
          "U futbol o'ynaydi",
          "U futbolchi",
          "U futbol o'ynashni o'rgatadi",
        ],
        correctIndex: 1,
      },
    },
    {
      id: "a1-m5-l3-q07",
      lessonId: "a1-m5-l3",
      orderIndex: 7,
      type: "true_false",
      explanationUz:
        "«Я читаю» — birinchi shaxs birlik: men o'qiyman. «читает» bo'lganda «u o'qiydi» bo'lardi.",
      payload: {
        ruText: "Я читаю книгу.",
        uzTranslation: "Men kitob o'qiyman.",
        isTrue: true,
      },
    },
    {
      id: "a1-m5-l3-q08",
      lessonId: "a1-m5-l3",
      orderIndex: 8,
      type: "multiple_choice",
      explanationUz:
        "Birinchi shaxs birlik: «я читаю» (men o'qiyman). «читаешь» — «ты» uchun, «читаем» — «мы» uchun.",
      payload: {
        prompt: "«Читать» fe'lining birinchi shaxs birlik shakli qaysi?",
        promptLang: "uz",
        options: ["читаешь", "читает", "читаю", "читаем"],
        correctIndex: 2,
      },
    },
    {
      id: "a1-m5-l3-q09",
      lessonId: "a1-m5-l3",
      orderIndex: 9,
      type: "translation",
      explanationUz:
        "«Ular maktabga boradilar» — «Они идут в школу». «идут» — 3-shaxs ko'plik shakli (они идут).",
      payload: {
        direction: "uz_to_ru",
        source: "Ular maktabga boradilar.",
        accepted: ["они идут в школу", "они идут в школу?"],
      },
    },
    {
      id: "a1-m5-l3-q10",
      lessonId: "a1-m5-l3",
      orderIndex: 10,
      type: "word_matching",
      explanationUz:
        "Hozirgi zamon shakllari: «читаю» — men o'qiyman, «пишешь» — sen yozasan, «делает» — u qiladi, «идут» — ular boradilar.",
      payload: {
        pairs: [
          { ru: "читаю", uz: "o'qiyman" },
          { ru: "пишешь", uz: "yozasan" },
          { ru: "делает", uz: "qiladi" },
          { ru: "идут", uz: "boradilar" },
        ],
      },
    },
    {
      id: "a1-m5-l3-q11",
      lessonId: "a1-m5-l3",
      orderIndex: 11,
      type: "fill_blank",
      explanationUz:
        "«она» bilan fe'l -ет qo'shimchasini oladi: «она готовит обед» (u ovqat pishiradi). «готовлю» — birinchi shaxs (я) shakli.",
      payload: {
        sentence: "Она ___ обед.",
        options: ["готовим", "готовят", "готовлю", "готовит"],
        correctIndex: 3,
      },
    },

    // ------------------------------------------------------------------
    // a1-m5-l4 — Kundalik faoliyat (12 ta savol)
    // ------------------------------------------------------------------
    {
      id: "a1-m5-l4-q01",
      lessonId: "a1-m5-l4",
      orderIndex: 1,
      type: "multiple_choice",
      explanationUz:
        "«Домашняя работа» — uy vazifasi (dars topshirig'i). «Делаю домашнюю работу» — men uy vazifasini bajarayman.",
      payload: {
        prompt: "«Делаю домашнюю работу» — bu qanday harakat?",
        promptLang: "uz",
        options: [
          "Maktabga boraman",
          "Uy vazifasini bajaraman",
          "Kitob o'qiyman",
          "Nonushta qilaman",
        ],
        correctIndex: 1,
      },
    },
    {
      id: "a1-m5-l4-q02",
      lessonId: "a1-m5-l4",
      orderIndex: 2,
      type: "translation",
      explanationUz:
        "«Я помогаю маме» — «Men mamamga yordam beraman». «помогать» dativ (кому? — kimga) bilan ishlatiladi: «маме» — mamaga.",
      payload: {
        direction: "ru_to_uz",
        source: "Я помогаю маме.",
        accepted: [
          "men mamaga yordam beraman",
          "mamamga yordam beraman",
          "men onamga yordam beraman",
        ],
      },
    },
    {
      id: "a1-m5-l4-q03",
      lessonId: "a1-m5-l4",
      orderIndex: 3,
      type: "word_matching",
      explanationUz:
        "Kundalik faoliyatlar: «гуляю» — sayr qilaman, «помогаю» — yordam beraman, «смотрю телевизор» — televizor ko'raman.",
      payload: {
        pairs: [
          { ru: "гуляю", uz: "sayr qilaman" },
          { ru: "помогаю", uz: "yordam beraman" },
          { ru: "смотрю телевизор", uz: "televizor ko'raman" },
          { ru: "играю", uz: "o'ynayman" },
        ],
      },
    },
    {
      id: "a1-m5-l4-q04",
      lessonId: "a1-m5-l4",
      orderIndex: 4,
      type: "fill_blank",
      explanationUz:
        "«Я» bilan fe'l birinchi shaxs birlik shaklini oladi: «я играю» (men o'ynayman). «во дворе» — hovlida.",
      payload: {
        sentence: "После уроков я ___ во дворе.",
        options: ["играет", "играем", "играю", "играют"],
        correctIndex: 2,
      },
    },
    {
      id: "a1-m5-l4-q05",
      lessonId: "a1-m5-l4",
      orderIndex: 5,
      type: "listening",
      explanationUz:
        "«Вечером» — kechqurun. «Я смотрю телевизор вечером» — «Men kechqurun televizor ko'raman».",
      payload: {
        speakText: "Я смотрю телевизор вечером.",
        promptUz: "Esiting va to'g'ri tarjimani tanlang.",
        options: [
          "Men ertalab televizor ko'raman",
          "Men tunida televizor ko'raman",
          "Men kechqurun televizor ko'raman",
          "Men dars qilaman",
        ],
        correctIndex: 2,
      },
    },
    {
      id: "a1-m5-l4-q06",
      lessonId: "a1-m5-l4",
      orderIndex: 6,
      type: "sentence_building",
      explanationUz:
        "«Я гуляю с другом» — «Men do'stim bilan sayr qilaman». «с» + kim = bilan (hamrohlik ma'nosi).",
      payload: {
        correct: ["Я", "гуляю", "с", "другом", "."],
        distractors: ["дома", "смотрю", "вечером"],
      },
    },
    {
      id: "a1-m5-l4-q07",
      lessonId: "a1-m5-l4",
      orderIndex: 7,
      type: "true_false",
      explanationUz:
        "«на кухне» — oshxonada, «помогаю маме» — mamamga yordam beraman. Tarjima to'g'ri.",
      payload: {
        ruText: "Я помогаю маме на кухне.",
        uzTranslation: "Men oshxonada mamamga yordam beraman.",
        isTrue: true,
      },
    },
    {
      id: "a1-m5-l4-q08",
      lessonId: "a1-m5-l4",
      orderIndex: 8,
      type: "multiple_choice",
      explanationUz:
        "«Гулять» — tashqarida sayr qilish, ochiq havoda yurish. «Я гуляю» — men sayr qilaman.",
      payload: {
        prompt: "«Гуляю» so'zi qaysi ma'noda ishlatiladi?",
        promptLang: "uz",
        options: ["Ovqatlanaman", "Uxlayman", "Yozaman", "Sayr qilaman"],
        correctIndex: 3,
      },
    },
    {
      id: "a1-m5-l4-q09",
      lessonId: "a1-m5-l4",
      orderIndex: 9,
      type: "translation",
      explanationUz:
        "«Men televizor ko'raman» — «Я смотрю телевизор». «смотреть» — ko'rish, birinchi shaxs shakli «смотрю».",
      payload: {
        direction: "uz_to_ru",
        source: "Men televizor ko'raman.",
        accepted: ["я смотрю телевизор", "я смотрю телевизор?"],
      },
    },
    {
      id: "a1-m5-l4-q10",
      lessonId: "a1-m5-l4",
      orderIndex: 10,
      type: "word_selection",
      explanationUz:
        "«Помогаю» — men yordam beraman («помогать» fe'li). «гуляю» — sayr qilaman, «читаю» — o'qiyman, «играю» — o'ynayman.",
      payload: {
        promptUz: "Yordam beraman",
        options: ["гуляю", "читаю", "помогаю", "играю"],
        correctIndex: 2,
      },
    },
    {
      id: "a1-m5-l4-q11",
      lessonId: "a1-m5-l4",
      orderIndex: 11,
      type: "true_false",
      explanationUz:
        "«днём» — kunduzi, «ночью» — tunida. Berilgan tarjima «ночью» ma'nosini bildiradi, shuning uchun u noto'g'ri.",
      payload: {
        ruText: "Я играю в футбол днём.",
        uzTranslation: "Men tunda futbol o'ynayman.",
        isTrue: false,
      },
    },
    {
      id: "a1-m5-l4-q12",
      lessonId: "a1-m5-l4",
      orderIndex: 12,
      type: "listening",
      explanationUz:
        "«После уроков» — darslardan keyin, «помогаю маме» — mamamga yordam beraman.",
      payload: {
        speakText: "После уроков я помогаю маме.",
        promptUz: "Esiting va to'g'ri tarjimani tanlang.",
        options: [
          "Darslardan keyin mamamga yordam beraman",
          "Darslardan keyin futbol o'ynayman",
          "Ertalab mamamga yordam beraman",
          "Darslardan keyin uxlayman",
        ],
        correctIndex: 0,
      },
    },

    // ------------------------------------------------------------------
    // a1-m5-l5 — Kundalik suhbat (12 ta savol)
    // ------------------------------------------------------------------
    {
      id: "a1-m5-l5-q01",
      lessonId: "a1-m5-l5",
      orderIndex: 1,
      type: "multiple_choice",
      explanationUz:
        "«Я встаю в семь» — men yettida turaman, «завтракаю» — nonushta qilaman. Demak, javob ertalabki tartib haqida.",
      payload: {
        prompt: "«— Что ты делаешь утром? — Я встаю в семь и завтракаю.» Bu javob nima haqida?",
        promptLang: "uz",
        options: [
          "Maktab darslari haqida",
          "Ertalabki tartib: uyg'onish va nonushta haqida",
          "Kechki ovqat haqida",
          "Dam olish haqida",
        ],
        correctIndex: 1,
      },
    },
    {
      id: "a1-m5-l5-q02",
      lessonId: "a1-m5-l5",
      orderIndex: 2,
      type: "translation",
      explanationUz:
        "«Потом» — «keyin». «Потом иду в школу» — «(Keyin) men maktabga boraman», «иду» — boraman.",
      payload: {
        direction: "ru_to_uz",
        source: "Потом я иду в школу.",
        accepted: ["keyin men maktabga boraman", "keyin maktabga boraman", "so'ng men maktabga boraman"],
      },
    },
    {
      id: "a1-m5-l5-q03",
      lessonId: "a1-m5-l5",
      orderIndex: 3,
      type: "fill_blank",
      explanationUz:
        "Javob beruvchi o'zi haqida gapiradi: «я иду» — men boraman. «идёт» — u (он/она) boradi.",
      payload: {
        sentence: "— А потом? — Потом ___ в школу.",
        options: ["идёт", "идём", "иду", "идут"],
        correctIndex: 2,
      },
    },
    {
      id: "a1-m5-l5-q04",
      lessonId: "a1-m5-l5",
      orderIndex: 4,
      type: "listening",
      explanationUz:
        "«Я встаю в семь» — men yettida turaman, «завтракаю» — nonushta qilaman. Ikkala harakat «и» (va) so'zi bilan bog'langan.",
      payload: {
        speakText: "Я встаю в семь и завтракаю.",
        promptUz: "Esiting va to'g'ri tarjimani tanlang.",
        options: [
          "Men ertalab turaman va tushlik qilaman",
          "Men kechqurun turaman va nonushta qilaman",
          "Men o'nda turaman va maktabga boraman",
          "Men yettida turaman va nonushta qilaman",
        ],
        correctIndex: 3,
      },
    },
    {
      id: "a1-m5-l5-q05",
      lessonId: "a1-m5-l5",
      orderIndex: 5,
      type: "word_matching",
      explanationUz:
        "Dialog iboralari: «Что ты делаешь утром?» — Ertalab nima qilasan?, «А потом?» — Keyin-chi?, «домашняя работа» — uy vazifasi.",
      payload: {
        pairs: [
          { ru: "Что ты делаешь утром?", uz: "Ertalab nima qilasan?" },
          { ru: "А потом?", uz: "Keyin-chi?" },
          { ru: "Потом иду в школу", uz: "Keyin maktabga boraman" },
          { ru: "домашняя работа", uz: "uy vazifasi" },
        ],
      },
    },
    {
      id: "a1-m5-l5-q06",
      lessonId: "a1-m5-l5",
      orderIndex: 6,
      type: "sentence_building",
      explanationUz:
        "«Вечером я делаю домашнюю работу» — «Men kechqurun uy vazifasini bajaraman». «домашнюю работу» — otning to'ldiruvchi (vinitiv) shakli.",
      payload: {
        correct: ["Вечером", "я", "делаю", "домашнюю", "работу", "."],
        distractors: ["утром", "завтракаю", "школу"],
      },
    },
    {
      id: "a1-m5-l5-q07",
      lessonId: "a1-m5-l5",
      orderIndex: 7,
      type: "multiple_choice",
      explanationUz:
        "«А потом?» — «Keyin-chi? / So'ng nima?» degan savol. U suhbatda keyingi qadamni so'raydi.",
      payload: {
        prompt: "«— А потом?» — bu savol nimani so'raydi?",
        promptLang: "uz",
        options: ["Vaqtni (soat necha)", "Joyni (qayerda)", "Keyingi harakatni", "Ismni"],
        correctIndex: 2,
      },
    },
    {
      id: "a1-m5-l5-q08",
      lessonId: "a1-m5-l5",
      orderIndex: 8,
      type: "translation",
      explanationUz:
        "«Men kechqurun uy vazifasini bajaraman» — «Вечером я делаю домашнюю работу». «делаю» — bajarayman («делать» fe'li).",
      payload: {
        direction: "uz_to_ru",
        source: "Men kechqurun uy vazifasini bajaraman.",
        accepted: ["вечером я делаю домашнюю работу", "я делаю домашнюю работу вечером"],
      },
    },
    {
      id: "a1-m5-l5-q09",
      lessonId: "a1-m5-l5",
      orderIndex: 9,
      type: "true_false",
      explanationUz:
        "«Я встаю в семь» — men yettida turaman, «завтракаю» — nonushta qilaman. Tarjima dialogda aynan shunday aytilgan.",
      payload: {
        ruText: "Я встаю в семь и завтракаю.",
        uzTranslation: "Men yettida turaman va nonushta qilaman.",
        isTrue: true,
      },
    },
    {
      id: "a1-m5-l5-q10",
      lessonId: "a1-m5-l5",
      orderIndex: 10,
      type: "word_selection",
      explanationUz:
        "«Потом» — keyin (keyingi harakat). «сейчас» — hozir, «вчера» — kecha, «всегда» — har doim.",
      payload: {
        promptUz: "Keyin (keyingi qadam)",
        options: ["сейчас", "потом", "вчера", "всегда"],
        correctIndex: 1,
      },
    },
    {
      id: "a1-m5-l5-q11",
      lessonId: "a1-m5-l5",
      orderIndex: 11,
      type: "listening",
      explanationUz:
        "«Вечером» — kechqurun, «помогаю маме» — mamamga yordam beraman. «Вечером я помогаю маме» = «Men kechqurun mamamga yordam beraman».",
      payload: {
        speakText: "Вечером я помогаю маме.",
        promptUz: "Esiting va to'g'ri tarjimani tanlang.",
        options: [
          "Ertalab mamamga yordam beraman",
          "Kechqurun mamamga yordam beraman",
          "Kechqurun futbol o'ynayman",
          "Tunda maktabga boraman",
        ],
        correctIndex: 1,
      },
    },
    {
      id: "a1-m5-l5-q12",
      lessonId: "a1-m5-l5",
      orderIndex: 12,
      type: "fill_blank",
      explanationUz:
        "«Я» bilan fe'l -у (ю) qo'shimchasini oladi: «я делаю» (men bajarayman). «делает» — 3-shaxs (он/она) uchun.",
      payload: {
        sentence: "— Что ты делаешь вечером? — Я ___ домашнюю работу.",
        options: ["делает", "делаем", "делаю", "делают"],
        correctIndex: 2,
      },
    },
  ],
};