"use client";

import { useMemo } from "react";
import Link from "next/link";
import {
  Zap,
  Flame,
  CalendarDays,
  Trophy,
  BookOpen,
  Target,
  ChevronRight,
  Crown,
  Languages,
} from "lucide-react";
import { useStoreData } from "@/hooks/use-store-data";
import { useAuth } from "@/components/providers/auth-provider";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { LEAGUE_LABELS, leagueForXp } from "@/lib/store/engine";
import { getLevelProgress, catalogTotals } from "@/data/curriculum";
import { cn, formatNumber, formatDateUz, todayKey } from "@/lib/utils";
import type { AppStore } from "@/lib/store";
import type { UserVocabState, XpEvent } from "@/types";

interface ProfileData {
  progress: { lessonId: string; completed: boolean; bestScore: number }[];
  xpEvents: XpEvent[];
  vocab: UserVocabState[];
  achievements: { achievement: { id: string; title: string }; unlockedAt: string | null }[];
  weekXp: number;
}

export default function ProfilePage() {
  const { profile } = useAuth();
  const { data, loading } = useStoreData<ProfileData>(
    async (store: AppStore) => {
      const [progress, xpEvents, vocab, achievements] = await Promise.all([
        store.getLessonProgress(),
        store.getXpEvents(100),
        store.getUserVocabulary(),
        store.getAchievementStates(),
      ]);
      const weekAgo = Date.now() - 7 * 86400000;
      return {
        progress,
        xpEvents,
        vocab,
        achievements,
        weekXp: xpEvents
          .filter((e) => new Date(e.createdAt).getTime() > weekAgo)
          .reduce((s, e) => s + e.amount, 0),
      };
    },
    [],
  );

  const stats = useMemo(() => {
    const completed = (data?.progress ?? []).filter((p) => p.completed);
    const todayXp = (data?.xpEvents ?? [])
      .filter((e) => e.createdAt.slice(0, 10) === todayKey())
      .reduce((s, e) => s + e.amount, 0);
    return {
      completed: completed.length,
      perfect: completed.filter((p) => p.bestScore === 100).length,
      todayXp,
      learnedWords: (data?.vocab ?? []).filter((v) => v.isLearned).length,
      unlockedAchievements: (data?.achievements ?? []).filter((a) => a.unlockedAt).length,
      weekXp: data?.weekXp ?? 0,
    };
  }, [data]);

  if (loading || !profile) {
    return (
      <div className="space-y-5">
        <Skeleton className="h-9 w-56" />
        <Skeleton className="h-52 w-full" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  const league = leagueForXp(profile.totalXp);
  const currentLevel = profile.currentLevel ?? "A1";
  const levelPct = getLevelProgress(currentLevel, new Set(
    (data?.progress ?? []).filter((p) => p.completed).map((p) => p.lessonId),
  ));

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">Profil</h1>
        <p className="mt-1 text-sm text-ink-soft">
          Statistikangiz va o‘rganish tarixingiz.
        </p>
      </div>

      {/* Karta boshi */}
      <Card className="overflow-hidden p-0">
        <div className="flex flex-col gap-5 bg-gradient-to-r from-primary to-[#4ab802] p-6 text-white sm:flex-row sm:items-center">
          <Avatar avatarId={profile.avatarId} size="xl" className="ring-4 ring-white/40" />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="truncate text-2xl font-extrabold">
                {profile.fullName || profile.username}
              </h2>
              {profile.role === "admin" && (
                <span className="rounded-full bg-white/25 px-2.5 py-0.5 text-xs font-extrabold">
                  Admin
                </span>
              )}
            </div>
            <p className="mt-0.5 text-sm font-semibold opacity-90">@{profile.username}</p>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-bold">
              <span className="rounded-full bg-white/20 px-3 py-1">
                {profile.email}
              </span>
              <span className="rounded-full bg-white/20 px-3 py-1">
                {profile.currentLevel} daraja
              </span>
              <span
                className="flex items-center gap-1 rounded-full px-3 py-1 text-white"
                style={{ backgroundColor: "rgba(0,0,0,0.25)" }}
              >
                <Crown size={12} /> {LEAGUE_LABELS[league]}
              </span>
            </div>
          </div>
          <Link href="/settings" className="shrink-0">
            <Button variant="secondary" className="w-full sm:w-auto">
              Sozlamalar <ChevronRight size={15} />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 p-5 sm:grid-cols-4">
          <Stat
            icon={<Zap size={16} className="text-accent-yellow" />}
            label="Jami XP"
            value={formatNumber(profile.totalXp)}
          />
          <Stat
            icon={<Flame size={16} className="text-error" />}
            label="Streak"
            value={`${profile.currentStreak} kun`}
          />
          <Stat
            icon={<BookOpen size={16} className="text-accent-blue" />}
            label="Tugallangan"
            value={`${stats.completed}/${catalogTotals.lessons}`}
          />
          <Stat
            icon={<Trophy size={16} className="text-primary" />}
            label="Yutuqlar"
            value={`${stats.unlockedAchievements}/12`}
          />
        </div>
      </Card>

      <div className="grid gap-5 lg:grid-cols-2">
        {/* Daraja progressi */}
        <Card>
          <CardTitle className="mb-3 flex items-center gap-2">
            <Target size={16} className="text-primary" />
            {currentLevel} kursi progressi
          </CardTitle>
          <div className="flex items-center justify-between text-sm">
            <span className="font-bold text-ink">{stats.completed}/{catalogTotals.lessons} dars</span>
            <span className="font-extrabold text-primary">{levelPct}%</span>
          </div>
          <Progress value={levelPct} className="mt-2" ariaLabel={`${currentLevel} progress`} />
          <div className="mt-4 grid grid-cols-2 gap-3">
            <MiniStat
              label="Mukammal darslar"
              value={String(stats.perfect)}
              sub="100% aniqlik"
            />
            <MiniStat
              label="So‘zlar yodda"
              value={String(stats.learnedWords)}
              sub="lug‘atdan"
            />
            <MiniStat
              label="Haftalik XP"
              value={formatNumber(stats.weekXp)}
              sub="so‘nggi 7 kun"
            />
            <MiniStat
              label="Bugungi XP"
              value={String(stats.todayXp)}
              sub={`maqsad ${profile.dailyGoal} XP`}
            />
          </div>
        </Card>

        {/* Streak taqvimi */}
        <Card>
          <CardTitle className="mb-3 flex items-center gap-2">
            <CalendarDays size={16} className="text-accent-blue" />
            Streak va rekord
          </CardTitle>
          <div className="flex items-center gap-4">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-error-soft">
              <Flame size={30} className="text-error" />
            </span>
            <div>
              <p className="text-3xl font-extrabold text-ink">
                {profile.currentStreak} kun
              </p>
              <p className="text-sm text-ink-soft">
                Eng uzun streak: {profile.longestStreak} kun
              </p>
            </div>
          </div>
          <div className="mt-4 rounded-xl bg-accent-yellow-soft p-3 text-xs font-semibold leading-relaxed text-[#8a6d00]">
            Har kuni kamida {profile.dailyGoal} XP to‘plang — streak uzilmaydi va
            reytingda yuqorilaysiz.
          </div>
          <div className="mt-4">
            <Link href="/leaderboard">
              <Button variant="secondary" className="w-full">
                <Trophy size={15} /> Haftalik reytingda ko‘rish
              </Button>
            </Link>
          </div>
        </Card>
      </div>

      {/* So‘nggi faoliyat */}
      <Card>
        <div className="mb-4 flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Languages size={16} className="text-accent-blue" />
            So‘nggi faoliyat
          </CardTitle>
          <Badge tone="gray">{(data?.xpEvents ?? []).length} ta yozuv</Badge>
        </div>
        {(data?.xpEvents ?? []).length === 0 ? (
          <p className="rounded-xl bg-surface p-4 text-sm text-ink-soft">
            Hozircha faoliyat yo‘q — birinchi darsni boshlang!
          </p>
        ) : (
          <ul className="space-y-2">
            {(data?.xpEvents ?? []).slice(0, 8).map((e) => (
              <li
                key={e.id}
                className="flex items-center gap-3 rounded-xl bg-surface px-4 py-3"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-yellow-soft">
                  <Zap size={14} className="text-[#8a6d00]" />
                </span>
                <span className="min-w-0 flex-1 truncate text-sm font-bold text-ink">
                  {e.label}
                </span>
                <span className="shrink-0 text-xs font-semibold text-ink-faint">
                  {formatDateUz(e.createdAt)}
                </span>
                <span
                  className={cn(
                    "shrink-0 text-sm font-extrabold",
                    e.amount >= 0 ? "text-primary" : "text-error",
                  )}
                >
                  {e.amount >= 0 ? "+" : ""}
                  {e.amount} XP
                </span>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}

function Stat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block truncate text-base font-extrabold text-ink">{value}</span>
        <span className="block truncate text-xs text-ink-soft">{label}</span>
      </span>
    </div>
  );
}

function MiniStat({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="rounded-xl bg-surface p-3">
      <p className="text-lg font-extrabold text-ink">{value}</p>
      <p className="text-xs font-bold text-ink-soft">{label}</p>
      <p className="text-[11px] text-ink-faint">{sub}</p>
    </div>
  );
}
