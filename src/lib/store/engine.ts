import type { Achievement, UserVocabState } from "@/types";
import { achievements } from "@/data/achievements";
import { daysBetween, localDateKey } from "@/lib/utils";

// --------------------------------------------------------------------------
// Streak (ketma-ket kunlar) hisobi — foydalanuvchining mahalliy kuni bo'yicha
// --------------------------------------------------------------------------

export interface StreakResult {
  current: number;
  longest: number;
  changed: boolean;
}

export function computeStreak(
  current: number,
  longest: number,
  lastActiveDate: string | null,
  today: string = localDateKey(),
): StreakResult {
  if (!lastActiveDate) {
    // Birinchi faoliyat
    return { current: 1, longest: Math.max(1, longest), changed: true };
  }
  if (lastActiveDate === today) {
    // Bugun allaqachon faol edi — o'zgarmaydi
    return { current, longest, changed: false };
  }
  const gap = daysBetween(lastActiveDate, today);
  if (gap === 1) {
    const next = current + 1;
    return { current: next, longest: Math.max(next, longest), changed: true };
  }
  // Streak uzildi
  return { current: 1, longest: Math.max(current, longest), changed: true };
}

// --------------------------------------------------------------------------
// Spaced repetition (SM-2 soddalashtirilgan) — takrorlash navbati
// --------------------------------------------------------------------------

export interface ReviewResult {
  state: UserVocabState;
  intervalDays: number;
}

/**
 * SM-2 ga asoslangan takrorlash:
 *  - to'g'ri javob: easiness +0.1, repetitions +1, interval 1 → 3 → oldingi*ease
 *  - xato: easiness −0.2 (min 1.3), repetitions 0, 10 daqiqadan keyin qayta
 */
export function applyReview(
  prev: UserVocabState,
  correct: boolean,
  now: Date = new Date(),
): ReviewResult {
  const wrongCount = correct ? prev.wrongCount : prev.wrongCount + 1;
  const reviewCount = prev.reviewCount + 1;

  let ease = prev.ease ?? 2.5;
  let repetitions = prev.repetitions ?? 0;
  let intervalDays: number;
  let masteryLevel: number;

  if (correct) {
    ease = Math.min(2.8, ease + 0.1);
    repetitions += 1;
    if (repetitions <= 1) intervalDays = 1;
    else if (repetitions === 2) intervalDays = 3;
    else intervalDays = Math.max(1, Math.round(Math.max(prev.intervalDays ?? 1, 1) * ease));
    masteryLevel = Math.min(5, Math.max(1, Math.ceil(intervalDays / 3)));
  } else {
    ease = Math.max(1.3, ease - 0.2);
    repetitions = 0;
    intervalDays = 0;
    masteryLevel = Math.max(0, prev.masteryLevel - 1);
  }

  const nextReviewAt = new Date(
    now.getTime() + (intervalDays === 0 ? 10 * 60000 : intervalDays * 86400000),
  );
  const isLearned = correct && masteryLevel >= 2 ? true : prev.isLearned;

  return {
    state: {
      ...prev,
      masteryLevel,
      reviewCount,
      wrongCount,
      nextReviewAt: nextReviewAt.toISOString(),
      lastReviewedAt: now.toISOString(),
      isLearned,
      ease,
      intervalDays,
      repetitions,
      correctCount: (prev.correctCount ?? 0) + (correct ? 1 : 0),
      firstLearnedAt:
        !prev.isLearned && isLearned ? now.toISOString() : prev.firstLearnedAt ?? null,
    },
    intervalDays,
  };
}

// --------------------------------------------------------------------------
// Yutuqlarni tekshirish
// --------------------------------------------------------------------------

export interface AchievementStats {
  lessonsCompleted: number;
  perfectLessons: number;
  totalXp: number;
  streak: number;
  wordsLearned: number;
}

/** Berilgan statistika asosida ochilishi kerak bo'lgan yutuqlar (yangi ochilganlar) */
export function findUnlockedAchievements(
  stats: AchievementStats,
  alreadyUnlocked: Set<string>,
): Achievement[] {
  const result: Achievement[] = [];
  for (const a of achievements) {
    if (alreadyUnlocked.has(a.id)) continue;
    let value = 0;
    switch (a.conditionType) {
      case "lessons_completed":
        value = stats.lessonsCompleted;
        break;
      case "perfect_lessons":
        value = stats.perfectLessons;
        break;
      case "total_xp":
        value = stats.totalXp;
        break;
      case "streak":
        value = stats.streak;
        break;
      case "words_learned":
        value = stats.wordsLearned;
        break;
    }
    if (value >= a.conditionValue) result.push(a);
  }
  return result;
}

/** Yutuq progressi (0..1) — UI uchun */
export function achievementProgress(
  a: Achievement,
  stats: AchievementStats,
): number {
  let value = 0;
  switch (a.conditionType) {
    case "lessons_completed":
      value = stats.lessonsCompleted;
      break;
    case "perfect_lessons":
      value = stats.perfectLessons;
      break;
    case "total_xp":
      value = stats.totalXp;
      break;
    case "streak":
      value = stats.streak;
      break;
    case "words_learned":
      value = stats.wordsLearned;
      break;
  }
  return Math.min(100, Math.round((value / a.conditionValue) * 100));
}

// --------------------------------------------------------------------------
// Liga (reyting ligasi)
// --------------------------------------------------------------------------

import type { League } from "@/types";

export function leagueForXp(totalXp: number): League {
  if (totalXp >= 700) return "diamond";
  if (totalXp >= 300) return "gold";
  if (totalXp >= 100) return "silver";
  return "bronze";
}

export const LEAGUE_LABELS: Record<League, string> = {
  bronze: "Bronza",
  silver: "Kumush",
  gold: "Oltin",
  diamond: "Almaz",
};

export const LEAGUE_COLORS: Record<League, string> = {
  bronze: "#CD7F32",
  silver: "#9FB3C8",
  gold: "#FFC800",
  diamond: "#1CB0F6",
};
