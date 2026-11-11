import type { ModuleContent } from "@/types";

// A1 — 3-modul: Семья (Oila)
// Barcha ruscha matnlar lingvistik jihatdan to'g'ri. Tushuntirishlar o'zbek tilida.

export const module3: ModuleContent = {
  module: {
    id: "a1-m3",
    level: "A1",
    orderIndex: 3,
    title: "Семья",
    titleUz: "Oila",
    description:
      "Oila a'zolari, oila haqida gapirish, egalik olmoshlari va oilaviy dialoglar.",
  },
  lessons: [
    {
      id: "a1-m3-l1",
      moduleId: "a1-m3",
      orderIndex: 1,
      title: "Oila a'zolari",
      titleRu: "Члены семьи",
      description:
        "Mama, papa, aka-uka, opa-singil, buvimona va boshqa oila a'zolari.",
      xpReward: 10,
      estimatedMinutes: 5,
    },
    {
      id: "a1-m3-l2",
      moduleId: "a1-m3",
      orderIndex: 2,
      title: "Mening oilam",
      titleRu: "Моя семья",
      description:
        "Oila haqida gapirish, «В моей семье...» va «У меня есть...» iboralari.",
      xpReward: 10,
      estimatedMinutes: 5,
    },
    {
      id: "a1-m3-l3",
      moduleId: "a1-m3",
      orderIndex: 3,
      title: "Egalik olmoshlari",
      titleRu: "Притяжательные местоимения",
      description:
        "мой, твой, его, её, наш, ваш, их so'zlari va ularning jinsga moslanishi.",
      xpReward: 10,
      estimatedMinutes: 6,
    },
    {
      id: "a1-m3-l4",
      moduleId: "a1-m3",
      orderIndex: 4,
      title: "Oddiy gaplar",
      titleRu: "Простые предложения",
      description: "Oila haqida oddiy gaplar tuzish va ularni to'g'ri yozish.",
      xpReward: 10,
      estimatedMinutes: 5,
    },
    {
      id: "a1-m3-l5",
      moduleId: "a1-m3",
      orderIndex: 5,
      title: "Oila haqida dialog",
      titleRu: "Диалог о семье",
      description:
        "Oila a'zolarini tanishtirish va oila haqida to'liq dialogni tushunish.",
      xpReward: 10,
      estimatedMinutes: 6,
    },
  ],
  questions: [
    // ------------------------------------------------------------------
    // a1-m3-l1 — Oila a'zolari (12 ta savol)
    // ------------------------------------------------------------------
    {
      id: "a1-m3-l1-q01",
      lessonId: "a1-m3-l1",
      orderIndex: 1,
      type: "word_selection",
      explanationUz:
        "«Сестра» — opa yoki singil. «брат» esa aka yoki ukadir, o'zbekchada ikkalasi ham uchalik bo'ladi.",
      payload: {
        promptUz: "Singil (opa)",
        options: ["сестра", "брат", "мама", "дочка"],
        correctIndex: 0,
      },
    },
    {
      id: "a1-m3-l1-q02",
      lessonId: "a1-m3-l1",
      orderIndex: 2,
      type: "translation",
      explanationUz:
        "«Бабушка» — buvimona (ota-onamizning onasi). «Моя» kichik harfli yoziladi va «mening» degan ma'noni beradi.",
      payload: {
        direction: "ru_to_uz",
        source: "Моя бабушка.",
        accepted: ["mening buvimomam", "buvimomam", "mening buvimona"],
      },
    },
    {
      id: "a1-m3-l1-q03",
      lessonId: "a1-m3-l1",
      orderIndex: 3,
      type: "multiple_choice",
      explanationUz:
        "«Папа» — dada yoki ota. «Мама» — ona, «брат» — aka/uka, «сестра» — opa/singil.",
      payload: {
        prompt: "«Папа» so'zi nima degani?",
        promptLang: "uz",
        options: ["Ota (dada)", "Aka", "O'g'il", "Singil"],
        correctIndex: 0,
      },
    },
    {
      id: "a1-m3-l1-q04",
      lessonId: "a1-m3-l1",
      orderIndex: 4,
      type: "word_matching",
      explanationUz:
        "Asosiy oila a'zolari: мама — ona, папа — dada, брат — aka/uka, сестра — opa/singil.",
      payload: {
        pairs: [
          { ru: "Мама", uz: "Ona" },
          { ru: "Папа", uz: "Dada" },
          { ru: "Брат", uz: "Aka" },
          { ru: "Сестра", uz: "Opa" },
        ],
      },
    },
    {
      id: "a1-m3-l1-q05",
      lessonId: "a1-m3-l1",
      orderIndex: 5,
      type: "listening",
      explanationUz:
        "«Это моя сестра» — «Bu menim singlim (opam)». «сестра» ayol jinsli bo'lgani uchun «моя» ishlatiladi.",
      payload: {
        speakText: "Это моя сестра.",
        promptUz: "Esiting va to'g'ri tarjimani tanlang.",
        options: [
          "Bu menim ukam",
          "Bu menim qizim",
          "Bu menim buvim",
          "Bu menim singlim",
        ],
        correctIndex: 3,
      },
    },
    {
      id: "a1-m3-l1-q06",
      lessonId: "a1-m3-l1",
      orderIndex: 6,
      type: "fill_blank",
      explanationUz:
        "«брат» — erkak jinsli ot, shuning uchun unga «мой» (menim) olmoshi mos keladi. «сестра» uchun «моя» bo'lardi.",
      payload: {
        sentence: "Это мой ___.",
        options: ["сестра", "мама", "брат", "бабушка"],
        correctIndex: 2,
      },
    },
    {
      id: "a1-m3-l1-q07",
      lessonId: "a1-m3-l1",
      orderIndex: 7,
      type: "sentence_building",
      explanationUz:
        "«Это моя мама» — «Bu menim onam». «мама» ayol jinsli bo'lgani uchun «моя» olmoshi olinadi.",
      payload: {
        correct: ["Это", "моя", "мама", "."],
        distractors: ["папа", "мой", "брат"],
      },
    },
    {
      id: "a1-m3-l1-q08",
      lessonId: "a1-m3-l1",
      orderIndex: 8,
      type: "translation",
      explanationUz:
        "«Bu menim ukam» — «Это мой брат». «мой» (menim) erkak jinsli «брат» so'ziga mos keladi.",
      payload: {
        direction: "uz_to_ru",
        source: "Bu menim ukam.",
        accepted: ["это мой брат", "мой брат", "это мой брат?"],
      },
    },
    {
      id: "a1-m3-l1-q09",
      lessonId: "a1-m3-l1",
      orderIndex: 9,
      type: "true_false",
      explanationUz:
        "«У меня есть...» — «Mening ... bor» degan tayyor ibora, u egallik (meniki) bildiradi.",
      payload: {
        ruText: "У меня есть брат и сестра.",
        uzTranslation: "Mening ukam va singlim bor.",
        isTrue: true,
      },
    },
    {
      id: "a1-m3-l1-q10",
      lessonId: "a1-m3-l1",
      orderIndex: 10,
      type: "multiple_choice",
      explanationUz:
        "«Дедушка» — buvimoza (katta otamiz), «бабушка» — buvimona. Bu ikkita so'zni adashtirmang.",
      payload: {
        prompt: "«Дедушка» — bu kim?",
        promptLang: "uz",
        options: ["Buvimona", "Buvimoza", "Ona", "O'g'il"],
        correctIndex: 1,
      },
    },
    {
      id: "a1-m3-l1-q11",
      lessonId: "a1-m3-l1",
      orderIndex: 11,
      type: "word_selection",
      explanationUz:
        "«Дочка» — qizim (o'z qizimiz). «Сын» — o'g'lim, «жена» — turmush o'roq (ayol).",
      payload: {
        promptUz: "Qizim",
        options: ["сын", "дочка", "сестра", "жена"],
        correctIndex: 1,
      },
    },
    {
      id: "a1-m3-l1-q12",
      lessonId: "a1-m3-l1",
      orderIndex: 12,
      type: "true_false",
      explanationUz:
        "«Дедушка» — buvimoza, ya'ni buvayoning eri. U «брат» (aka/uka) yoki «сестра» (singil) emas.",
      payload: {
        ruText: "Дедушка — это отец папы.",
        uzTranslation: "Buvimoza — dadamning akasi.",
        isTrue: false,
      },
    },

    // ------------------------------------------------------------------
    // a1-m3-l2 — Mening oilam (11 ta savol)
    // ------------------------------------------------------------------
    {
      id: "a1-m3-l2-q01",
      lessonId: "a1-m3-l2",
      orderIndex: 1,
      type: "multiple_choice",
      explanationUz:
        "«В моей семье пять человек» — «Mening oilamda besh kishi». «человек» bu yerda son bilan birga «kishi» degan ma'noni beradi.",
      payload: {
        prompt: "«В моей семье пять человек» ning to'g'ri tarjimasini tanlang.",
        promptLang: "uz",
        options: [
          "Mening oilamda besh yosh",
          "Mening oilamda besh kishi",
          "Besh kishi meni kutmoqda",
          "Mening oilam beshinchi",
        ],
        correctIndex: 1,
      },
    },
    {
      id: "a1-m3-l2-q02",
      lessonId: "a1-m3-l2",
      orderIndex: 2,
      type: "fill_blank",
      explanationUz:
        "Sonlardan keyin «человек» doim oddiy shaklda turadi: «пять человек» (besh kishi). Boshqa shakllar bu yerda ishlatilmaydi.",
      payload: {
        sentence: "В моей семье ___ человек.",
        options: ["пять", "пяти", "пятью", "пятые"],
        correctIndex: 0,
      },
    },
    {
      id: "a1-m3-l2-q03",
      lessonId: "a1-m3-l2",
      orderIndex: 3,
      type: "translation",
      explanationUz:
        "«У меня есть...» — «...bor» degan tayyor ibora. «два брата» — «ikki ukam»: rus tilida «два» dan keyin ot ko'maklashuv shaklida turadi.",
      payload: {
        direction: "ru_to_uz",
        source: "У меня есть два брата.",
        accepted: [
          "mening ikki ukam bor",
          "ikka ukam bor",
          "mening 2 ukam bor",
          "ikki ukam bor",
        ],
      },
    },
    {
      id: "a1-m3-l2-q04",
      lessonId: "a1-m3-l2",
      orderIndex: 4,
      type: "word_matching",
      explanationUz:
        "Oila haqida gapirish iboralari: «У меня есть...» — ... bor, «В моей семье» — Mening oilamda, «Моя мама» — Mening onam, «Нас пятеро» — Biz beshmiz.",
      payload: {
        pairs: [
          { ru: "У меня есть брат", uz: "Mening ukam bor" },
          { ru: "В моей семье", uz: "Mening oilamda" },
          { ru: "Моя мама", uz: "Mening onam" },
          { ru: "Нас пятеро", uz: "Biz beshmiz" },
        ],
      },
    },
    {
      id: "a1-m3-l2-q05",
      lessonId: "a1-m3-l2",
      orderIndex: 5,
      type: "listening",
      explanationUz:
        "«четыре» — to'rt, «человек» — kishi. «В моей семье четыре человека» — «Mening oilamda to'rt kishi».",
      payload: {
        speakText: "В моей семье четыре человека.",
        promptUz: "Esiting va to'g'ri tarjimani tanlang.",
        options: [
          "Mening oilamda besh kishi",
          "Mening oilamda besh yosh",
          "Mening oilamda olti kishi",
          "Mening oilamda to'rt kishi",
        ],
        correctIndex: 3,
      },
    },
    {
      id: "a1-m3-l2-q06",
      lessonId: "a1-m3-l2",
      orderIndex: 6,
      type: "sentence_building",
      explanationUz:
        "«В моей семье пять человек» — «Mening oilamda besh kishi». «моей» — «моя» so'zining kelishik shakli («в» dan keyin).",
      payload: {
        correct: ["В", "моей", "семье", "пять", "человек", "."],
        distractors: ["моя", "три", "дома"],
      },
    },
    {
      id: "a1-m3-l2-q07",
      lessonId: "a1-m3-l2",
      orderIndex: 7,
      type: "word_selection",
      explanationUz:
        "«Моя семья» — mening oilam. «семья» ayol jinsli bo'lgani uchun «моя» olmoshi olinadi.",
      payload: {
        promptUz: "Mening oilam",
        options: ["твоя семья", "моя семья", "их семья", "наша семья"],
        correctIndex: 1,
      },
    },
    {
      id: "a1-m3-l2-q08",
      lessonId: "a1-m3-l2",
      orderIndex: 8,
      type: "multiple_choice",
      explanationUz:
        "«учительница» — ayol o'qituvchi. «Моя мама — учительница» — «Mening onam o'qituvchi».",
      payload: {
        prompt: "«Моя мама — учительница» degan gap ma'nosi qaysi?",
        promptLang: "uz",
        options: [
          "Mening onam o'qituvchi",
          "Mening opam talaba",
          "Mening dadam o'qituvchi",
          "Mening singlim o'qituvchi",
        ],
        correctIndex: 0,
      },
    },
    {
      id: "a1-m3-l2-q09",
      lessonId: "a1-m3-l2",
      orderIndex: 9,
      type: "true_false",
      explanationUz:
        "«три» — uch, «шесть» — olti. Tarjimadagi son gapdagi songa mos kelmagani uchun noto'g'ri.",
      payload: {
        ruText: "В моей семье три человека.",
        uzTranslation: "Mening oilamda olti kishi bor.",
        isTrue: false,
      },
    },
    {
      id: "a1-m3-l2-q10",
      lessonId: "a1-m3-l2",
      orderIndex: 10,
      type: "translation",
      explanationUz:
        "«Mening oilamda ... kishi bor» — «В моей семье ... человек». «bor» bu yerda «человек» bilan ifodalanadi.",
      payload: {
        direction: "uz_to_ru",
        source: "Mening oilamda besh kishi bor.",
        accepted: [
          "в моей семье пять человек",
          "в нашей семье пять человек",
          "в моей семье пять человек?",
        ],
      },
    },
    {
      id: "a1-m3-l2-q11",
      lessonId: "a1-m3-l2",
      orderIndex: 11,
      type: "fill_blank",
      explanationUz:
        "«учительница» — ayol o'qituvchi, «учитель» — erkak o'qituvchi. «мама» ayol bo'lgani uchun jins moslashuviga e'tibor bering.",
      payload: {
        sentence: "Моя мама — ___.",
        options: ["учительницы", "учитель", "ученица", "учительница"],
        correctIndex: 3,
      },
    },

    // ------------------------------------------------------------------
    // a1-m3-l3 — Egalik olmoshlari (12 ta savol)
    // ------------------------------------------------------------------
    {
      id: "a1-m3-l3-q01",
      lessonId: "a1-m3-l3",
      orderIndex: 1,
      type: "multiple_choice",
      explanationUz:
        "«mening» — «мой» (erkak), «моя» (ayol), «моё» (neitr), «мои» (ko'plik). Olmosh formasi ot jinsiga qarab tanlanadi.",
      payload: {
        prompt: "«Mening» so'ziga mos rus egalik olmoshi qaysi?",
        promptLang: "uz",
        options: [
          "мой / моя / моё / мои",
          "твой / твоя / твоё",
          "его / её",
          "наш / ваш",
        ],
        correctIndex: 0,
      },
    },
    {
      id: "a1-m3-l3-q02",
      lessonId: "a1-m3-l3",
      orderIndex: 2,
      type: "fill_blank",
      explanationUz:
        "«сестра» — ayol jinsli ot, uchun «моя» olmoshi olinadi. «мой» erkak (брат), «моё» neitr (окно) uchun.",
      payload: {
        sentence: "Это ___ сестра.",
        options: ["мой", "моё", "мои", "моя"],
        correctIndex: 3,
      },
    },
    {
      id: "a1-m3-l3-q03",
      lessonId: "a1-m3-l3",
      orderIndex: 3,
      type: "fill_blank",
      explanationUz:
        "«брат» — erkak jinsli ot, uchun «мой» (menim) ishlatiladi: «Это мой брат». «моя» ayol jins uchun.",
      payload: {
        sentence: "Это ___ брат.",
        options: ["моя", "моё", "мой", "наши"],
        correctIndex: 2,
      },
    },
    {
      id: "a1-m3-l3-q04",
      lessonId: "a1-m3-l3",
      orderIndex: 4,
      type: "translation",
      explanationUz:
        "«окно» — deraza va neitr jinsli; shuning uchun unga «моё» (menim) olmoshi olinadi.",
      payload: {
        direction: "ru_to_uz",
        source: "Это моё окно.",
        accepted: ["bu menim derazam", "mening derazam", "bu menim deraza"],
      },
    },
    {
      id: "a1-m3-l3-q05",
      lessonId: "a1-m3-l3",
      orderIndex: 5,
      type: "word_matching",
      explanationUz:
        "Egalik olmoshlari: «мой» — menim, «твой» — sening, «наш» — bizning, «их» — ularning (ko'plik egasi).",
      payload: {
        pairs: [
          { ru: "мой", uz: "menim" },
          { ru: "твой", uz: "sening" },
          { ru: "наш", uz: "bizning" },
          { ru: "их", uz: "ularning" },
        ],
      },
    },
    {
      id: "a1-m3-l3-q06",
      lessonId: "a1-m3-l3",
      orderIndex: 6,
      type: "word_selection",
      explanationUz:
        "«твой» — sening (2-shaxs). «мой» — menim, «наш» — bizning, «его» — uning (erkak).",
      payload: {
        promptUz: "Sening",
        options: ["мой", "твой", "наш", "его"],
        correctIndex: 1,
      },
    },
    {
      id: "a1-m3-l3-q07",
      lessonId: "a1-m3-l3",
      orderIndex: 7,
      type: "listening",
      explanationUz:
        "«её» — uning (ayol shaxs nikidagi olmosh), «мама» — ona. «Это её мама» — «Bu uning onasi».",
      payload: {
        speakText: "Это её мама.",
        promptUz: "Esiting va to'g'ri tarjimani tanlang.",
        options: [
          "Bu uning opasi",
          "Bu uning qizi",
          "Bu uning buvisi",
          "Bu uning onasi",
        ],
        correctIndex: 3,
      },
    },
    {
      id: "a1-m3-l3-q08",
      lessonId: "a1-m3-l3",
      orderIndex: 8,
      type: "sentence_building",
      explanationUz:
        "«Это наш дом» — «Bu bizning uyingiz». «наш» — bizning; ko'plik shakli «наши» bo'ladi.",
      payload: {
        correct: ["Это", "наш", "дом", "."],
        distractors: ["мой", "её", "книга"],
      },
    },
    {
      id: "a1-m3-l3-q09",
      lessonId: "a1-m3-l3",
      orderIndex: 9,
      type: "multiple_choice",
      explanationUz:
        "«его» — uning (erkak: брат, папа), «её» — uning (ayol: мама, сестра). O'zbekchada ikkalasi ham «uning» bo'ladi.",
      payload: {
        prompt: "«его» va «её» farqi nimada?",
        promptLang: "uz",
        options: [
          "Иkkalasi bir xil",
          "«его» ko'plik uchun",
          "«её» erkak uchun",
          "«его» — erkak uchun, «её» — ayol uchun",
        ],
        correctIndex: 3,
      },
    },
    {
      id: "a1-m3-l3-q10",
      lessonId: "a1-m3-l3",
      orderIndex: 10,
      type: "translation",
      explanationUz:
        "«sizning» — «ваш». «книга» ayol jinsli bo'lgani uchun «ваша» shakli olinadi: «это ваша книга».",
      payload: {
        direction: "uz_to_ru",
        source: "Bu sizning kitobingiz.",
        accepted: ["это ваша книга", "ваша книга", "это ваша книга?"],
      },
    },
    {
      id: "a1-m3-l3-q11",
      lessonId: "a1-m3-l3",
      orderIndex: 11,
      type: "true_false",
      explanationUz:
        "«их» — ularning (ko'plik egasi). «семья» — oila va ayol jinsli ot, tarjima to'g'ri.",
      payload: {
        ruText: "Это их семья.",
        uzTranslation: "Bu ularning oilasi.",
        isTrue: true,
      },
    },
    {
      id: "a1-m3-l3-q12",
      lessonId: "a1-m3-l3",
      orderIndex: 12,
      type: "true_false",
      explanationUz:
        "«твоя» — sening (2-shaxs), «моя» — menim (1-shaxs). Tarjimada 1-shaxs olmoshi ishlatilgani uchun noto'g'ri.",
      payload: {
        ruText: "Это твоя комната.",
        uzTranslation: "Bu mening xonam.",
        isTrue: false,
      },
    },

    // ------------------------------------------------------------------
    // a1-m3-l4 — Oddiy gaplar (11 ta savol)
    // ------------------------------------------------------------------
    {
      id: "a1-m3-l4-q01",
      lessonId: "a1-m3-l4",
      orderIndex: 1,
      type: "sentence_building",
      explanationUz:
        "«У меня есть брат» — «Mening ukam bor». «есть» (bor) rus tilida mavjudlikni bildiradi.",
      payload: {
        correct: ["У", "меня", "есть", "брат", "."],
        distractors: ["нет", "сестра", "вы"],
      },
    },
    {
      id: "a1-m3-l4-q02",
      lessonId: "a1-m3-l4",
      orderIndex: 2,
      type: "fill_blank",
      explanationUz:
        "«У меня есть...» — tayyor ibora («mening ... bor»). «имеет» bu yerda ishlatilmaydi, u faqat uchinchi shaxsda turadi.",
      payload: {
        sentence: "У меня ___ сестра.",
        options: ["есть", "имеет", "имя", "был"],
        correctIndex: 0,
      },
    },
    {
      id: "a1-m3-l4-q03",
      lessonId: "a1-m3-l4",
      orderIndex: 3,
      type: "translation",
      explanationUz:
        "«живёт» — yashaydi, «в Ташкенте» — Toshkentda. Gap tartibi: egalik olmoshi + ot + fe'l.",
      payload: {
        direction: "ru_to_uz",
        source: "Моя сестра живёт в Ташкенте.",
        accepted: [
          "mening singlim toshkentda yashaydi",
          "singlim toshkentda yashaydi",
          "mening opam toshkentda yashaydi",
        ],
      },
    },
    {
      id: "a1-m3-l4-q04",
      lessonId: "a1-m3-l4",
      orderIndex: 4,
      type: "multiple_choice",
      explanationUz:
        "«мама» — ayol jinsli ot, uchun «моя» olmoshi olinadi: «Это моя мама». «мой» va «моё» bu yerda noto'g'ri.",
      payload: {
        prompt: "Qaysi gap to'g'ri yozilgan?",
        promptLang: "uz",
        options: [
          "Это моё мама",
          "Это моя мама",
          "Это мой мама",
          "Это мои мама",
        ],
        correctIndex: 1,
      },
    },
    {
      id: "a1-m3-l4-q05",
      lessonId: "a1-m3-l4",
      orderIndex: 5,
      type: "listening",
      explanationUz:
        "«Мой папа — врач» — «Menim dadam shifokor». «врач» — shifokor kasbi, «учитель» — o'qituvchi kasbi.",
      payload: {
        speakText: "Мой папа — врач.",
        promptUz: "Esiting va to'g'ri tarjimani tanlang.",
        options: [
          "Menim dadam shifokor",
          "Menim dadam o'qituvchi",
          "Menim ukam shifokor",
          "Menim onam talaba",
        ],
        correctIndex: 0,
      },
    },
    {
      id: "a1-m3-l4-q06",
      lessonId: "a1-m3-l4",
      orderIndex: 6,
      type: "word_selection",
      explanationUz:
        "«есть» (bor) mavjudlikni bildiradi: «У меня есть брат». «нет» — yo'q, «был» — bo'lgan.",
      payload: {
        promptUz: "Mening ukam bor",
        options: ["нет", "есть", "был", "будет"],
        correctIndex: 1,
      },
    },
    {
      id: "a1-m3-l4-q07",
      lessonId: "a1-m3-l4",
      orderIndex: 7,
      type: "word_matching",
      explanationUz:
        "Gap elementlari: «В моей семье» — Mening oilamda, «Моя сестра» — Mening singlim, «живёт» — yashaydi, «работает» — ishlaydi.",
      payload: {
        pairs: [
          { ru: "В моей семье", uz: "Mening oilamda" },
          { ru: "Моя сестра", uz: "Mening singlim" },
          { ru: "живёт", uz: "yashaydi" },
          { ru: "работает", uz: "ishlaydi" },
        ],
      },
    },
    {
      id: "a1-m3-l4-q08",
      lessonId: "a1-m3-l4",
      orderIndex: 8,
      type: "translation",
      explanationUz:
        "«Mening oilamda ... kishi bor» — «В моей семье ... человек». «шесть» — olti, «человек» sonlardan keyin ham bir xil qoladi.",
      payload: {
        direction: "uz_to_ru",
        source: "Mening oilamda olti kishi bor.",
        accepted: [
          "в моей семье шесть человек",
          "в нашей семье шесть человек",
          "в моей семье шесть человек?",
        ],
      },
    },
    {
      id: "a1-m3-l4-q09",
      lessonId: "a1-m3-l4",
      orderIndex: 9,
      type: "true_false",
      explanationUz:
        "«учится в школе» — maktabda o'qiydi. «учиться» fe'li uchinchi shaxs birlikda «учится» bo'ladi.",
      payload: {
        ruText: "Мой брат учится в школе.",
        uzTranslation: "Mening ukam maktabda o'qiydi.",
        isTrue: true,
      },
    },
    {
      id: "a1-m3-l4-q10",
      lessonId: "a1-m3-l4",
      orderIndex: 10,
      type: "fill_blank",
      explanationUz:
        "«учится» — o'qimoq (3-shaxs, birlik): «Моя сестра учится в школе». «учит» esa «o'rgatadi» degan boshqa ma'noni beradi.",
      payload: {
        sentence: "Моя сестра ___ в школе.",
        options: ["учит", "учим", "учат", "учится"],
        correctIndex: 3,
      },
    },
    {
      id: "a1-m3-l4-q11",
      lessonId: "a1-m3-l4",
      orderIndex: 11,
      type: "multiple_choice",
      explanationUz:
        "«нет» — yo'q; u dan keyin ot ko'maklashuv shaklida turadi: «нет сестры» — «singlim yo'q».",
      payload: {
        prompt: "«В моей семье нет сестры» ning to'g'ri tarjimasini tanlang.",
        promptLang: "uz",
        options: [
          "Mening oilamda singlim bor",
          "Mening opam katta",
          "Mening oilamda singlim yo'q",
          "Oilmam juda kichik",
        ],
        correctIndex: 2,
      },
    },

    // ------------------------------------------------------------------
    // a1-m3-l5 — Oila haqida dialog (11 ta savol)
    // ------------------------------------------------------------------
    {
      id: "a1-m3-l5-q01",
      lessonId: "a1-m3-l5",
      orderIndex: 1,
      type: "multiple_choice",
      explanationUz:
        "«пять» — besh. Oila a'zolari: папа, мама, брат, сестра va suhbatdoshning o'zi — jami besh kishi.",
      payload: {
        prompt:
          "— У тебя большая семья? — Да, в моей семье пять человек: папа, мама, брат, сестра и я. Oilada nechta kishi bor?",
        promptLang: "uz",
        options: ["To'rt", "Besh", "Olti", "Uch"],
        correctIndex: 1,
      },
    },
    {
      id: "a1-m3-l5-q02",
      lessonId: "a1-m3-l5",
      orderIndex: 2,
      type: "fill_blank",
      explanationUz:
        "«Сколько вас в семье?» — oilada nechtasizlar? Javobda son oddiy shaklda turadi: «пять человек».",
      payload: {
        sentence: "— Сколько вас в семье? — В моей семье ___ человек.",
        options: ["пять", "пяти", "пятью", "пятый"],
        correctIndex: 0,
      },
    },
    {
      id: "a1-m3-l5-q03",
      lessonId: "a1-m3-l5",
      orderIndex: 3,
      type: "translation",
      explanationUz:
        "«Мой папа — врач» — «Menim dadam shifokor». «—» belgisi «bu ...» degan ma'noni bildiradi (ravish).",
      payload: {
        direction: "ru_to_uz",
        source: "Мой папа — врач.",
        accepted: [
          "mening dadam shifokor",
          "mening otam shifokor",
          "dadam shifokor",
        ],
      },
    },
    {
      id: "a1-m3-l5-q04",
      lessonId: "a1-m3-l5",
      orderIndex: 4,
      type: "listening",
      explanationUz:
        "«пять человек» — besh kishi. Bu yerda «лет» (yosh) emas, «человек» (kishi) ishlatiladi.",
      payload: {
        speakText: "В моей семье пять человек.",
        promptUz: "Esiting va to'g'ri tarjimani tanlang.",
        options: [
          "Mening oilamda besh yosh",
          "Mening ukam besh yoshda",
          "Mening oilamda besh kishi",
          "Besh kishi kelmoqda",
        ],
        correctIndex: 2,
      },
    },
    {
      id: "a1-m3-l5-q05",
      lessonId: "a1-m3-l5",
      orderIndex: 5,
      type: "word_matching",
      explanationUz:
        "«родители» — ota-onalar, «врач» — shifokor, «учительница» — ayol o'qituvchi, «студент» — talaba.",
      payload: {
        pairs: [
          { ru: "родители", uz: "Ota-onalar" },
          { ru: "врач", uz: "Shifokor" },
          { ru: "учительница", uz: "O'qituvchi" },
          { ru: "студент", uz: "Talaba" },
        ],
      },
    },
    {
      id: "a1-m3-l5-q06",
      lessonId: "a1-m3-l5",
      orderIndex: 6,
      type: "sentence_building",
      explanationUz:
        "«Моя мама — учительница» — «Mening onam o'qituvchi». Ravish (—) alohida belgi sifatida qo'yiladi.",
      payload: {
        correct: ["Моя", "мама", "—", "учительница", "."],
        distractors: ["папа", "врач", "мой"],
      },
    },
    {
      id: "a1-m3-l5-q07",
      lessonId: "a1-m3-l5",
      orderIndex: 7,
      type: "true_false",
      explanationUz:
        "«старше» — kattaroq («старый» so'zining taqqoslash darajasi), «студент» — talaba. Tarjima to'g'ri.",
      payload: {
        ruText: "Брат старше, он студент.",
        uzTranslation: "Ukam kattaroq, u talaba.",
        isTrue: true,
      },
    },
    {
      id: "a1-m3-l5-q08",
      lessonId: "a1-m3-l5",
      orderIndex: 8,
      type: "word_selection",
      explanationUz:
        "«Родители» — ota-onalar (ota va ona birgalikda). «родственники» — qarindoshlar, «родина» — Vatan.",
      payload: {
        promptUz: "Ota-onalar",
        options: ["родственники", "родина", "родители", "родной"],
        correctIndex: 2,
      },
    },
    {
      id: "a1-m3-l5-q09",
      lessonId: "a1-m3-l5",
      orderIndex: 9,
      type: "translation",
      explanationUz:
        "«Sening oilang kattami?» — «У тебя большая семья?». «большой» — katta, savol gapida oxirida «?» qo'yiladi.",
      payload: {
        direction: "uz_to_ru",
        source: "Sening oilang kattami?",
        accepted: [
          "у тебя большая семья",
          "у тебя большая семья?",
          "у вас большая семья",
        ],
      },
    },
    {
      id: "a1-m3-l5-q10",
      lessonId: "a1-m3-l5",
      orderIndex: 10,
      type: "true_false",
      explanationUz:
        "«учитель» — o'qituvchi, «студент» — talaba. So'zlar turlicha bo'lgani uchun tarjima noto'g'ri.",
      payload: {
        ruText: "Мой папа — учитель.",
        uzTranslation: "Mening dadam talaba.",
        isTrue: false,
      },
    },
    {
      id: "a1-m3-l5-q11",
      lessonId: "a1-m3-l5",
      orderIndex: 11,
      type: "multiple_choice",
      explanationUz:
        "«врач» — shifokor, bu papaning kasbi. Onaning kasbi esa «учительница» (o'qituvchi).",
      payload: {
        prompt:
          "— Мой папа — врач, а моя мама — учительница. Dialogga ko'ra kim shifokor?",
        promptLang: "uz",
        options: ["Ona", "Singil", "Ota", "Aka"],
        correctIndex: 2,
      },
    },
  ],
};
