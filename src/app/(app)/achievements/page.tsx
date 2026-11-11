"use client";

import { useMemo } from "react";
import {
  Trophy,
  Lock,
  Zap,
  Star,
  Flag,
  BookOpen,
  GraduationCap,
  Flame,
  CalendarCheck,
  Target,
  Crown,
  Award,
  Sparkles,
  Rocket,
  Languages,
  BookMarked,
} from "lucide-react";
import { useStoreData } from "@/hooks/use-store-data";
import { useAuth } from "@/components/providers/auth-provider";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { achievementProgress } from "@/lib/store/engine";
import { cn, formatNumber, formatDateUz } from "@/lib/utils";
import type { AppStore } from "@/lib/store";
import type { Achievement, UserVocabState } from "@/types";

interface AchData {
  states: { achievement: Achievement; unlockedAt: string | null }[];
  progress: { lessonId: string; completed: boolean; bestScore: number }[];
  vocab: UserVocabState[];
}

/** Lucide ikonka xaritasi — achievement.icon nomidan */
const ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Flag,
  BookOpen,
  GraduationCap,
  Zap,
  Flame,
  Target,
  Star,
  Trophy,
  CalendarCheck,
  Crown,
  Award,
  Sparkles,
  Rocket,
  Languages,
  BookMarked,
};

const ICON_TONES = [
  "bg-primary-soft text-primary",
  "bg-accent-blue-soft text-accent-blue",
  "bg-accent-yellow-soft text-[#8a6d00]",
  "bg-error-soft text-error",
  "bg-[#f0ebff] text-[#6b46c1]",
];

export default function AchievementsPage() {
  const { profile } = useAuth();
  const { data, loading } = useStoreData<AchData>(
    async (store: AppStore) => {
      const [states, progress, vocab] = await Promise.all([
        store.getAchievementStates(),
        store.getLessonProgress(),
        store.getUserVocabulary(),
      ]);
      return { states, progress, vocab };
    },
    [],
  );

  const stats = useMemo(() => {
    const completed = (data?.progress ?? []).filter((p) => p.completed);
    return {
      lessonsCompleted: completed.length,
      perfectLessons: completed.filter((p) => p.bestScore === 100).length,
      totalXp: profile?.totalXp ?? 0,
      streak: profile?.currentStreak ?? 0,
      wordsLearned: (data?.vocab ?? []).filter((v) => v.isLearned).length,
    };
  }, [data, profile]);

  if (loading || !profile || !data) {
    return (
      <div className="space-y-5">
        <Skeleton className="h-9 w-56" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-40 w-full" />
          ))}
        </div>
      </div>
    );
  }

  const unlocked = data.states.filter((s) => s.unlockedAt);
  const nextXp = unlocked.reduce((s, a) => s + a.achievement.xpReward, 0);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">Yutuqlar</h1>
          <p className="mt-1 text-sm text-ink-soft">
            Maqsadlarga erishib, yorqin rozetlar yig‘ing — har biri XP beradi.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge tone="yellow">
            <Trophy size={13} /> {unlocked.length}/{data.states.length} ochilgan
          </Badge>
          <Badge tone="green">
            <Zap size={13} /> +{formatNumber(nextXp)} XP olindi
          </Badge>
        </div>
      </div>

      {/* Umumiy progress */}
      <Card className="flex items-center gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent-yellow-soft">
          <Award size={24} className="text-[#8a6d00]" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between text-sm">
            <span className="font-extrabold text-ink">Yutuqlar jamg‘armasi</span>
            <span className="font-extrabold text-primary">
              {Math.round((unlocked.length / data.states.length) * 100)}%
            </span>
          </div>
          <Progress
            value={(unlocked.length / data.states.length) * 100}
            className="mt-2"
            color="yellow"
            ariaLabel="Yutuqlar progressi"
          />
        </div>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.states.map((s, idx) => {
          const a = s.achievement;
          const isUnlocked = Boolean(s.unlockedAt);
          const pct = achievementProgress(a, stats);
          const Icon = ICONS[a.icon] ?? Trophy;
          const tone = ICON_TONES[idx % ICON_TONES.length];
          return (
            <Card
              key={a.id}
              className={cn(
                "relative flex flex-col gap-3 p-5",
                isUnlocked
                  ? "ring-1 ring-primary/40"
                  : "bg-surface opacity-95",
              )}
            >
              {!isUnlocked && (
                <span className="absolute right-4 top-4 text-ink-faint" aria-label="Yopiq">
                  <Lock size={15} />
                </span>
              )}
              <div className="flex items-start gap-3">
                <span
                  className={cn(
                    "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl",
                    isUnlocked ? tone : "bg-surface-2 text-ink-faint",
                  )}
                >
                  <Icon size={21} />
                </span>
                <div className="min-w-0">
                  <h2 className="text-sm font-extrabold text-ink">{a.title}</h2>
                  <p className="mt-0.5 text-xs leading-relaxed text-ink-soft">
                    {a.description}
                  </p>
                </div>
              </div>

              <div className="mt-auto space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold">
                  <span className="text-ink-soft">
                    {isUnlocked ? "Ochilgan" : `${pct}%`}
                  </span>
                  <span className="flex items-center gap-1 text-[#8a6d00]">
                    <Zap size={11} /> +{a.xpReward} XP
                  </span>
                </div>
                <Progress
                  value={isUnlocked ? 100 : pct}
                  height="h-2"
                  color={isUnlocked ? "primary" : "yellow"}
                  ariaLabel={a.title}
                />
                {isUnlocked && s.unlockedAt && (
                  <p className="text-[11px] font-semibold text-primary">
                    {formatDateUz(s.unlockedAt)} kuni ochilgan
                  </p>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
