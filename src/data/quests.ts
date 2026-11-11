import type { DailyQuest } from "@/types";

/** Kunlik vazifalar — har kuni yangilanadi, bajarilsa +20 XP */
export const dailyQuests: DailyQuest[] = [
  {
    id: "quest_lessons",
    title: "2 ta darsni tugat",
    description: "Bugun 2 ta darsni yakunlang.",
    questType: "lessons",
    targetValue: 2,
    xpReward: 20,
  },
  {
    id: "quest_words",
    title: "5 ta so'z o'rgan",
    description: "Lug'atdan 5 ta so'zni o'rgangan qilib belgilang.",
    questType: "words",
    targetValue: 5,
    xpReward: 20,
  },
  {
    id: "quest_reviews",
    title: "10 ta so'zni takrorla",
    description: "Takrorlash bo'limida 10 ta so'zni ko'ring.",
    questType: "reviews",
    targetValue: 10,
    xpReward: 20,
  },
];

/** Kunlik XP maqsadlari (sozlamalarda tanlanadi) */
export const DAILY_GOALS = [20, 30, 50] as const;

/** Yurak (hearts) tizimi */
export const MAX_HEARTS = 5;
