import type { Level } from "../../src/types";

// ---------------------------------------------------------------------------
// RusGo — 500 darslik kurikulum rejasi
// Har bir modul 5 ta darsdan iborat: yangi so'zlar, tinglash, grammatika,
// o'qish va amaliyot. Modul mavzulari takrorlanmaydi.
// ---------------------------------------------------------------------------

export interface ModulePlan {
  titleRu: string;
  titleUz: string;
  description: string;
  grammar: string[];
  categories: string[];
}

export const MODULE_PLANS: Record<Exclude<Level, "A1"> | "A1_GENERATED", ModulePlan[]> = {
  // A1 — mavjud 5 ta qo'lda yozilgan moduldan keyingi 11 ta modul (55 dars)
  A1_GENERATED: [
    { titleRu: "Числа", titleUz: "Raqamlar", description: "1–100 gacha sanash, tartib sonlar va narxlarni aytish.", grammar: ["Количественные числительные", "Порядковые числительные", "Числа в ценах и возрасте"], categories: ["numbers", "shopping"] },
    { titleRu: "Еда", titleUz: "Ovqat", description: "Ovqat nomlari, sevimli taomlar va oddiy buyurtmalar.", grammar: ["Глаголы «есть» и «пить»", "Отрицание с глаголами", "Винительный падеж еды"], categories: ["food", "restaurants"] },
    { titleRu: "Цвета", titleUz: "Ranglar", description: "Ranglar, kiyim va narsalarni tasvirlash.", grammar: ["Согласование прилагательных", "Вопросы «какой? какая? какое?»", "Порядок слов в описании"], categories: ["colors", "clothing"] },
    { titleRu: "Дни и месяцы", titleUz: "Kunlar va oylar", description: "Hafta kunlari, oylar, sanalar va bayramlar.", grammar: ["Предлоги «в» и «на» со временем", "Названия месяцев", "Порядковые числительные в датах"], categories: ["time"] },
    { titleRu: "Время", titleUz: "Vaqt", description: "Soatni aytish, kun rejasi va uchrashuv vaqti.", grammar: ["Вопрос «который час?»", "Предлоги времени", "Время суток"], categories: ["time", "everyday"] },
    { titleRu: "Основные глаголы", titleUz: "Asosiy fe'llar", description: "Har kuni ishlatiladigan fe'llar va ularning shakllari.", grammar: ["I и II спряжение", "Настоящее время", "Инфинитив после «хочу»"], categories: ["everyday", "work"] },
    { titleRu: "Настоящее время", titleUz: "Hozirgi zamon", description: "Hozirgi zamonda gapirish va savol berish.", grammar: ["Личные окончания глаголов", "Вопросительные предложения", "Отрицание «не»"], categories: ["everyday", "communication"] },
    { titleRu: "Род существительных", titleUz: "Ot jinsi", description: "Rus tilida otlarning jinsi va uning amaliy ahamiyati.", grammar: ["Мужской, женский, средний род", "Окончания -а/-я, -о/-е, -ь", "Местоимения он, она, оно"], categories: ["everyday", "family"] },
    { titleRu: "Прилагательные", titleUz: "Sifatlar", description: "Narsalarni sifatlash va antonimlarni qo'llash.", grammar: ["Полные прилагательные", "Антонимы", "Согласование с существительными"], categories: ["personality", "colors"] },
    { titleRu: "Простые диалоги", titleUz: "Oddiy dialoglar", description: "Do'konda, ko'chada va uyda oddiy suhbatlar.", grammar: ["Вопросительные слова", "Интонация вопроса", "Вежливые формулы"], categories: ["communication", "everyday"] },
    { titleRu: "Произношение", titleUz: "Talaffuz", description: "Rus talaffuzining asosiy qoidalari va mashqlari.", grammar: ["Ударение", "Редукция гласных", "Твёрдые и мягкие согласные"], categories: ["communication"] },
  ],

  A2: [
    { titleRu: "Прошедшее время", titleUz: "O'tgan zamon", description: "O'tgan zamonda hikoya qilish va savol berish.", grammar: ["Прошедшее время глаголов", "Род в прошедшем времени", "Вопросы о прошлом"], categories: ["everyday", "work"] },
    { titleRu: "Будущее время", titleUz: "Kelasi zamon", description: "Rejalar, bashoratlar va kelasi zamondagi gaplar.", grammar: ["Будущее простое", "Будущее сложное", "Выражение планов"], categories: ["everyday", "travel"] },
    { titleRu: "Распорядок дня", titleUz: "Kun tartibi", description: "Kun rejimi, odatlar va vaqtni taqsimlash.", grammar: ["Возвратные глаголы", "Наречия частоты", "Предлоги времени"], categories: ["everyday"] },
    { titleRu: "Покупки", titleUz: "Xarid", description: "Do'konda muloqot, narx va o'lchamlar.", grammar: ["Количественные слова", "Родительный падеж", "Вежливые просьбы"], categories: ["shopping", "clothing"] },
    { titleRu: "Транспорт", titleUz: "Transport", description: "Transport turlari, chiptalar va yo'l vaqti.", grammar: ["Предложный падеж «на транспорте»", "Куда? Откуда?", "Предлоги направления"], categories: ["transport", "travel"] },
    { titleRu: "Направления", titleUz: "Yo'nalishlar", description: "Yo'l so'rash va yo'nalishni tushuntirish.", grammar: ["Императив", "Предлоги места", "Наречия направления"], categories: ["transport", "geography"] },
    { titleRu: "Здоровье", titleUz: "Salomatlik", description: "Shifokorga murojaat va sog'liq haqida suhbat.", grammar: ["«У меня болит…»", "Советы с «нужно»", "Модальные конструкции"], categories: ["health", "medicine"] },
    { titleRu: "Погода", titleUz: "Ob-havo", description: "Ob-havo, fasllar va iqlim haqida gapirish.", grammar: ["Безличные предложения", "Степени сравнения", "Наречия «тепло/холодно»"], categories: ["weather", "nature"] },
    { titleRu: "Город", titleUz: "Shahar", description: "Shahar joylari, yo'l va jamoat joylari.", grammar: ["Предложный падеж места", "Где? Куда?", "Указательные местоимения"], categories: ["society", "transport"] },
    { titleRu: "Ресторан", titleUz: "Restoran", description: "Restoranda buyurtma berish va hisobni so'rash.", grammar: ["Вежливые просьбы", "Счёт и заказ", "Винительный падеж блюд"], categories: ["restaurants", "food"] },
    { titleRu: "Модальные выражения", titleUz: "Modal iboralar", description: "Ruxsat, zarurat va imkoniyatni ifodalash.", grammar: ["Можно, нельзя, нужно", "«Хотеть» + инфинитив", "«Должен» + инфинитив"], categories: ["communication", "everyday"] },
    { titleRu: "Падежи: введение", titleUz: "Kelishiklar: kirish", description: "Kelishik tizimiga birinchi qadam.", grammar: ["Именительный и винительный", "Родительный падеж", "Одушевлённые и неодушевлённые"], categories: ["education"] },
    { titleRu: "Предлоги", titleUz: "Predloglar", description: "Joy, vaqt va yo'nalish predloglari.", grammar: ["Предлоги места", "Предлоги направления", "Предлоги времени"], categories: ["everyday", "geography"] },
    { titleRu: "Неправильные глаголы", titleUz: "Noto'g'ri fe'llar", description: "Eng ko'p ishlatiladigan istisno fe'llar.", grammar: ["Есть, пить, идти, ехать", "Спряжение исключений", "Употребление в речи"], categories: ["everyday"] },
    { titleRu: "Дружба и общение", titleUz: "Do'stlik va muloqot", description: "Do'stlar bilan suhbat va takliflar.", grammar: ["Обращения", "Приглашения", "Ответы согласием и отказом"], categories: ["relationships", "communication"] },
    { titleRu: "Путешествие по России", titleUz: "Rossiya bo'ylab sayohat", description: "Shaharlar, diqqatga sazovor joylar va marshrut.", grammar: ["Страны и города", "Календарь поездки", "Описание маршрута"], categories: ["travel", "geography"] },
  ],

  B1: [
    { titleRu: "Падежи I: именительный и винительный", titleUz: "Kelishiklar I: bosh va tushum", description: "Bosh va tushum kelishigining vazifalari.", grammar: ["Функции именительного", "Винительный одушевлённых", "Винительный неодушевлённых"], categories: ["education"] },
    { titleRu: "Падежи II: родительный", titleUz: "Kelishiklar II: qaratqich", description: "Qaratqich kelishigi, egalik va yo'qlik.", grammar: ["Родительный падеж", "Количество и отсутствие", "Предлоги с родительным"], categories: ["education", "family"] },
    { titleRu: "Падежи III: дательный", titleUz: "Kelishiklar III: jo'nalish", description: "Jo'nalish kelishigi va «kimga?» savoli.", grammar: ["Дательный падеж", "Кому? Чему?", "Глаголы с дательным"], categories: ["communication"] },
    { titleRu: "Падежи IV: творительный", titleUz: "Kelishiklar IV: vosita", description: "Vosita kelishigi va birgalik ma'nosi.", grammar: ["Творительный падеж", "С кем? Чем?", "Профессия с «быть»"], categories: ["work"] },
    { titleRu: "Падежи V: предложный", titleUz: "Kelishiklar V: o'rin-payt", description: "O'rin-payt kelishigi va predloglar.", grammar: ["Предложный падеж", "О чём? Где?", "Предлоги «в», «на», «о»"], categories: ["travel"] },
    { titleRu: "Падежи VI: повторение", titleUz: "Kelishiklar VI: takrorlash", description: "Olti kelishikni umumlashtirish va mashq qilish.", grammar: ["Все падежи", "Склонение прилагательных", "Типичные ошибки"], categories: ["education"] },
    { titleRu: "Виды глагола", titleUz: "Fe'l turlari", description: "Fe'lning tugallangan va tugallanmagan turlari.", grammar: ["Совершенный и несовершенный вид", "Времена с видами", "Пары глаголов"], categories: ["work"] },
    { titleRu: "Глаголы движения", titleUz: "Harakat fe'llari", description: "«Идти/ехать» va harakat prefikslari.", grammar: ["Идти и ехать", "Приставки движения", "Направление и способ"], categories: ["travel", "transport"] },
    { titleRu: "Сложные предложения", titleUz: "Murakkab gaplar", description: "Bog'lovchilar va ergash gaplar.", grammar: ["Союзы", "Придаточные причины", "Придаточные времени"], categories: ["communication"] },
    { titleRu: "Работа и карьера", titleUz: "Ish va karyera", description: "Ish suhbati, vazifalar va karyera rejalari.", grammar: ["Деловая лексика", "Резюме", "Формы вежливости"], categories: ["work", "business"] },
    { titleRu: "Образование и наука", titleUz: "Ta'lim va fan", description: "O'qish, tadqiqot va akademik muloqot.", grammar: ["Академическая лексика", "Аргументация", "Ссылки на источники"], categories: ["education", "science"] },
    { titleRu: "Путешествия и туризм", titleUz: "Sayohat va turizm", description: "Mehmonxona, ekskursiya va marshrut.", grammar: ["Бронирование", "Описание мест", "Сравнения"], categories: ["travel"] },
    { titleRu: "Социальные разговоры", titleUz: "Ijtimoiy suhbatlar", description: "Suhbat boshlash va fikr almashish.", grammar: ["Светская беседа", "Согласие и несогласие", "Переспрос"], categories: ["communication", "society"] },
    { titleRu: "Мнение и аргумент", titleUz: "Fikr va dalil", description: "O'z fikrini asoslash va e'tiroz bildirish.", grammar: ["«Я считаю, что…»", "Контраргументы", "Вводные слова"], categories: ["communication", "personality"] },
    { titleRu: "Чтение и анализ", titleUz: "O'qish va tahlil", description: "Matnni tushunish va asosiy fikrni ajratish.", grammar: ["Работа с текстом", "Главная мысль", "Контекстные слова"], categories: ["literature", "education"] },
    { titleRu: "Письмо и абзац", titleUz: "Yozuv va abzats", description: "Matn tuzilishi va yozma nutq.", grammar: ["Структура абзаца", "Связки текста", "Официальное письмо"], categories: ["communication", "education"] },
    { titleRu: "Здоровый образ жизни", titleUz: "Sog'lom turmush", description: "Sport, odatlar va sog'liq maslahatlari.", grammar: ["Спорт и привычки", "Советы", "Модальные глаголы"], categories: ["health", "sports"] },
    { titleRu: "Планы и мечты", titleUz: "Rejalar va orzular", description: "Kelajak rejalari va shartli gaplar.", grammar: ["Условные конструкции", "Будущие планы", "Выражение надежды"], categories: ["emotions", "everyday"] },
  ],

  B2: [
    { titleRu: "Продвинутая грамматика", titleUz: "Ilg'or grammatika", description: "Murakkab zamon va nisbat shakllari.", grammar: ["Сложные времена", "Активный и пассивный залог", "Согласование времён"], categories: ["education"] },
    { titleRu: "Причастия", titleUz: "Sifatdosh", description: "Rus tilidagi sifatdoshlar va ularning qo'llanishi.", grammar: ["Действительные причастия", "Страдательные причастия", "Причастный оборот"], categories: ["science"] },
    { titleRu: "Деепричастия", titleUz: "Ravishdosh", description: "Harakatning ikkinchi darajali ifodasi.", grammar: ["Деепричастия несовершенного вида", "Деепричастия совершенного вида", "Деепричастный оборот"], categories: ["literature"] },
    { titleRu: "Сложные конструкции", titleUz: "Murakkab konstruksiyalar", description: "Ergash gaplar va murakkab bog'lanishlar.", grammar: ["Придаточные определительные", "Уступительные", "Придаточные цели"], categories: ["science"] },
    { titleRu: "Формальное общение", titleUz: "Rasmiy muloqot", description: "Rasmiy uslub va xizmat yozishmalari.", grammar: ["Официальный стиль", "Обращения", "Формулы вежливости"], categories: ["work", "communication"] },
    { titleRu: "Дебаты", titleUz: "Munozara", description: "Dalillar keltirish va qarshi dalillarni rad etish.", grammar: ["Аргумент и контраргумент", "Риторические вопросы", "Структура выступления"], categories: ["communication", "society"] },
    { titleRu: "Язык СМИ", titleUz: "OAV tili", description: "Yangiliklar, sarlavhalar va media tili.", grammar: ["Заголовки", "Новостной стиль", "Пассив в новостях"], categories: ["communication", "politics"] },
    { titleRu: "Профессиональная лексика", titleUz: "Kasbiy lug'at", description: "Biznes va kasbiy muloqot tili.", grammar: ["Бизнес-термины", "Переговоры", "Презентация"], categories: ["business", "work"] },
    { titleRu: "Продвинутое аудирование", titleUz: "Ilg'or tinglash", description: "Tez nutq, intervyu va ma'ruza tinglash.", grammar: ["Быстрая речь", "Интервью", "Ключевые слова"], categories: ["communication"] },
    { titleRu: "Аргументативное письмо", titleUz: "Dalilli yozuv", description: "Insho va dalilga asoslangan matn.", grammar: ["Эссе", "Структура аргумента", "Логические связки"], categories: ["education"] },
    { titleRu: "Экономика и финансы", titleUz: "Iqtisodiyot va moliya", description: "Iqtisodiy tushunchalar va moliyaviy hisobotlar.", grammar: ["Экономические термины", "Отчёты", "Числа и проценты"], categories: ["finance", "business"] },
    { titleRu: "Наука и техника", titleUz: "Fan va texnika", description: "Ilmiy-texnik matnlar va jarayonlar tavsifi.", grammar: ["Технический язык", "Описание процессов", "Пассивные конструкции"], categories: ["technology", "science"] },
    { titleRu: "Экология и климат", titleUz: "Ekologiya va iqlim", description: "Atrof-muhit muammolari va yechimlar.", grammar: ["Экологическая лексика", "Проблема и решение", "Причина и следствие"], categories: ["ecology", "environment"] },
    { titleRu: "Право и общество", titleUz: "Huquq va jamiyat", description: "Huquqiy tushunchalar va fuqarolik jamiyati.", grammar: ["Юридическая лексика", "Права и обязанности", "Формальные конструкции"], categories: ["politics", "society"] },
    { titleRu: "Психология и эмоции", titleUz: "Psixologiya va hislar", description: "His-tuyg'ular va psixologik holatlar tili.", grammar: ["Психологическая лексика", "Описание чувств", "Сравнения"], categories: ["emotions", "personality"] },
    { titleRu: "Культура и искусство", titleUz: "Madaniyat va san'at", description: "San'at asarlari va madaniy hodisalar.", grammar: ["Искусствоведческая лексика", "Рецензия", "Оценка и вкус"], categories: ["culture", "art"] },
    { titleRu: "Литература и чтение", titleUz: "Adabiyot va o'qish", description: "Badiiy matn va adabiy tahlil.", grammar: ["Литературный анализ", "Персонажи", "Средства выразительности"], categories: ["literature"] },
    { titleRu: "Публичные выступления", titleUz: "Ommaviy nutq", description: "Nutq tuzish va auditoriya bilan ishlash.", grammar: ["Структура речи", "Работа с аудиторией", "Риторические приёмы"], categories: ["communication"] },
  ],

  C1: [
    { titleRu: "Академический русский", titleUz: "Akademik rus tili", description: "Ilmiy uslub, atamalar va akademik matn.", grammar: ["Научный стиль", "Термины", "Безличные конструкции"], categories: ["science", "education"] },
    { titleRu: "Профессиональная коммуникация", titleUz: "Kasbiy muloqot", description: "Ish muhitida rasmiy muloqot.", grammar: ["Деловой этикет", "Презентация", "Аргументация"], categories: ["work", "business"] },
    { titleRu: "Идиомы и фразеология", titleUz: "Idiomalar va frazeologiya", description: "Ko'chma ma'noli iboralar va ularning qo'llanishi.", grammar: ["Фразеологизмы", "Образные выражения", "Стилистические ограничения"], categories: ["expressions", "culture"] },
    { titleRu: "Стилистика", titleUz: "Uslubiyat", description: "Rasmiy, so'zlashuv va badiiy uslublar.", grammar: ["Официальный стиль", "Разговорный стиль", "Художественный стиль"], categories: ["literature", "communication"] },
    { titleRu: "Сложные тексты", titleUz: "Murakkab matnlar", description: "Analitik o'qish va chuqur tushunish.", grammar: ["Аналитическое чтение", "Аргументация", "Авторская позиция"], categories: ["literature", "science"] },
    { titleRu: "Продвинутая речь", titleUz: "Ilg'or nutq", description: "Erkin diskussiya va fikrni qayta ifodalash.", grammar: ["Дискуссия", "Перефразирование", "Идиоматика в речи"], categories: ["communication"] },
    { titleRu: "Формальное письмо", titleUz: "Rasmiy yozuv", description: "Ariza, xat va hisobot yozish.", grammar: ["Заявление", "Письмо", "Отчёт"], categories: ["work", "communication"] },
    { titleRu: "Нюансы грамматики", titleUz: "Grammatika nozikliklari", description: "Vaqt, nisbat va modallik nozikliklari.", grammar: ["Вид и время", "Модальность", "Сложные союзы"], categories: ["education"] },
    { titleRu: "Научная статья", titleUz: "Ilmiy maqola", description: "Ilmiy maqola tuzilishi va yozilishi.", grammar: ["Структура статьи", "Ссылки и выводы", "Академическая лексика"], categories: ["science"] },
    { titleRu: "Деловая переписка", titleUz: "Ish yozishmalari", description: "Rasmiy xatlar va elektron pochta.", grammar: ["Переписка", "Тон и вежливость", "Сокращения"], categories: ["business", "work"] },
    { titleRu: "Медицина и здоровье", titleUz: "Tibbiyot va salomatlik", description: "Tibbiy matnlar va konsultatsiya tili.", grammar: ["Медицинская лексика", "Консультация", "Инструкции"], categories: ["medicine", "health"] },
    { titleRu: "Технологии и инновации", titleUz: "Texnologiya va innovatsiyalar", description: "Texnik matnlar va innovatsion lug'at.", grammar: ["Технические тексты", "Инновации", "Описание функций"], categories: ["technology", "science"] },
    { titleRu: "Философия и общество", titleUz: "Falsafa va jamiyat", description: "Mavhum tushunchalar va ijtimoiy tahlil.", grammar: ["Философская лексика", "Абстрактные понятия", "Рассуждение"], categories: ["society", "science"] },
    { titleRu: "История и культура", titleUz: "Tarix va madaniyat", description: "Tarixiy matnlar va madaniy kontekst.", grammar: ["Исторический текст", "Хронология", "Причинно-следственные связи"], categories: ["history", "culture"] },
    { titleRu: "Политика и право", titleUz: "Siyosat va huquq", description: "Siyosiy diskurs va huquqiy matnlar.", grammar: ["Политический дискурс", "Право", "Формальные формулировки"], categories: ["politics"] },
    { titleRu: "Современная литература", titleUz: "Zamonaviy adabiyot", description: "Zamonaviy nasr va she'riyat tili.", grammar: ["Проза и поэзия", "Интерпретация", "Стилистические средства"], categories: ["literature"] },
  ],

  C2: [
    { titleRu: "Близкое к носителю понимание", titleUz: "Ona tilida so'zlashuvchiga yaqin tushunish", description: "Tez va implitsit nutqni tushunish.", grammar: ["Скорость и интонация", "Имплицитный смысл", "Подтекст"], categories: ["communication"] },
    { titleRu: "Литературный язык", titleUz: "Adabiy til", description: "Klassik nasr va she'riy til.", grammar: ["Классическая проза", "Поэтический язык", "Устаревшая лексика"], categories: ["literature"] },
    { titleRu: "Идиоматика", titleUz: "Idiomatika", description: "Kam uchraydigan idiomalar va qanotli iboralar.", grammar: ["Редкие идиомы", "Крылатые выражения", "Культурный контекст"], categories: ["expressions"] },
    { titleRu: "Риторика", titleUz: "Ritorika", description: "Notiqlik san'ati va ta'sirchan nutq.", grammar: ["Фигуры речи", "Убеждение", "Композиция речи"], categories: ["communication", "literature"] },
    { titleRu: "Специализированная лексика", titleUz: "Ixtisoslashgan lug'at", description: "Tor soha atamalari va aniqlik.", grammar: ["Терминология", "Точность", "Профессиональные клише"], categories: ["science", "medicine"] },
    { titleRu: "Сложное письмо", titleUz: "Murakkab yozuv", description: "Esseistik uslub va murakkab matn.", grammar: ["Эссе и эссеистика", "Стиль", "Композиция"], categories: ["literature", "education"] },
    { titleRu: "Критическое чтение", titleUz: "Tanqidiy o'qish", description: "Matnni tanqidiy tahlil qilish.", grammar: ["Критика текста", "Авторская позиция", "Аргументы и допущения"], categories: ["literature"] },
    { titleRu: "Продвинутая коммуникация", titleUz: "Ilg'or muloqot", description: "Diplomatik va yuqori darajadagi muloqot.", grammar: ["Переговоры высокого уровня", "Дипломатия", "Эвфемизмы"], categories: ["communication", "politics"] },
    { titleRu: "Поэзия", titleUz: "She'riyat", description: "Ritm, qofiya va poetik obrazlar.", grammar: ["Ритм и рифма", "Образы", "Поэтический синтаксис"], categories: ["literature", "art"] },
    { titleRu: "Драматургия", titleUz: "Dramaturgiya", description: "Pyesa tili, dialog va konflikt.", grammar: ["Диалог в пьесе", "Конфликт", "Ремарки"], categories: ["literature", "art"] },
    { titleRu: "Публицистика", titleUz: "Publitsistika", description: "Ocherk, polemika va jamoatchilik fikri.", grammar: ["Очерк", "Полемика", "Экспрессивные средства"], categories: ["communication", "society"] },
    { titleRu: "Юридический язык", titleUz: "Yuridik til", description: "Qonun va shartnomalar tili.", grammar: ["Законы и договоры", "Точные формулировки", "Двусмысленность"], categories: ["politics", "society"] },
    { titleRu: "Экономический дискурс", titleUz: "Iqtisodiy diskurs", description: "Iqtisodiy tahlil va prognozlar tili.", grammar: ["Аналитика", "Прогнозы", "Статистические формулировки"], categories: ["finance", "business"] },
    { titleRu: "Научный дискурс", titleUz: "Ilmiy diskurs", description: "Gipoteza, isbot va ilmiy bahs.", grammar: ["Гипотезы", "Доказательства", "Научная полемика"], categories: ["science"] },
    { titleRu: "Культурные коды", titleUz: "Madaniy kodlar", description: "Ramzlar, an'analar va intertekst.", grammar: ["Символы и традиции", "Интертекст", "Аллюзии"], categories: ["culture", "history"] },
    { titleRu: "Языковая игра", titleUz: "Til o'yini", description: "So'z o'yini, ironiya va nozik hazil.", grammar: ["Каламбур", "Ирония и сарказм", "Двусмысленность"], categories: ["literature", "expressions"] },
  ],
};
