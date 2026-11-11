"use client";

import Link from "next/link";
import { useMemo } from "react";
import {
  Zap,
  Flame,
  Target,
  Play,
  Trophy,
  CheckCircle2,
  ChevronRight,
  Lightbulb,
  Star,
  BookOpen,
  CalendarDays,
} from "lucide-react";
import { useAuth } from "@/components/providers/auth-provider";
import { useStoreData } from "@/hooks/use-store-data";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardTitle } from "@/components/ui/card";
import { Skeleton, ListSkeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
  getRecommendedLessonId,
  getModuleById,
  getLevelProgress,
  catalogTotals,
} from "@/data/curriculum";
import { LEAGUE_LABELS, LEAGUE_COLORS, leagueForXp } from "@/lib/store/engine";
import { cn, formatNumber, localDateKey, todayKey, weekStartKey } from "@/lib/utils";
import type { AppStore } from "@/lib/store";

interface DashData {
  progress: { lessonId: string; completed: boolean; bestScore: number }[];
  quests: { quest: { id: string; title: string; description: string; targetValue: number; xpReward: number; questType: string }; progress: number; completed: boolean }[];
  xpEvents: { amount: number; createdAt: string; label: string }[];
  achievements: { achievement: { id: string; title: string; description: string; icon: string }; unlockedAt: string | null }[];
  leaderboard: { userId: string; username: string; avatarId: string; weeklyXp: number; totalXp: number; isCurrentUser?: boolean }[];
  lessons: { id: string; moduleId: string; title: string; description: string; estimatedMinutes: number; xpReward: number; orderIndex: number }[];
}

const TIPS = [
  "Har kuni bir xil vaqtda o‘rganing — streak osonlik bilan o‘saydi.",
  "Xato qilishdan qo‘rqmang: har bir xato uchun tushuntirish beriladi.",
  "Takrorlash bo‘limi esda qolishni kuchaytiradi — har kuni 5 daqiqa.",
  "Ovozni tinglang va takrorlang — talaffuz shu tarzda o‘saydi.",
  "Kunlik maqsadni erta bajarib, kunning oxirida dam oling.",
];

export default function DashboardPage() {
  const { profile } = useAuth();

  const { data, loading } = useStoreData<DashData>(async (store: AppStore) => {
    const [progress, quests, xpEvents, achievements, leaderboard, lessons] =
      await Promise.all([
        store.getLessonProgress(),
        store.getDailyQuests(),
        store.getXpEvents(200),
        store.getAchievementStates(),
        store.getLeaderboard(),
        store.getLessons(),
      ]);
    return { progress, quests, xpEvents, achievements, leaderboard, lessons };
  }, []);

  const completed = useMemo(
    () => new Set((data?.progress ?? []).filter((p) => p.completed).map((p) => p.lessonId)),
    [data],
  );

  const recommendedId = useMemo(() => getRecommendedLessonId(completed), [completed]);
  const recommended = data?.lessons.find((l) => l.id === recommendedId);

  // Haftalik XP (dushanba → yakshanba)
  const weekly = useMemo(() => {
    const days: { key: string; label: string; xp: number }[] = [];
    const labels = ["Du", "Se", "Ch", "Pa", "Ju", "Sh", "Ya"];
    const start = new Date(weekStartKey() + "T00:00:00");
    for (let i = 0; i < 7; i++) {
      const d = new Date(start.getTime() + i * 86400000);
      const key = localDateKey(d);
      const xp = (data?.xpEvents ?? [])
        .filter((e) => e.createdAt.slice(0, 10) === key)
        .reduce((s, e) => s + e.amount, 0);
      days.push({ key, label: labels[i], xp });
    }
    return days;
  }, [data]);

  const maxWeekXp = Math.max(30, ...weekly.map((d) => d.xp));
  const todayXp = weekly.find((d) => d.key === todayKey())?.xp ?? 0;
  const dailyGoal = profile?.dailyGoal ?? 30;
  const dailyPct = Math.min(100, Math.round((todayXp / dailyGoal) * 100));

  const recentAchievements = (data?.achievements ?? [])
    .filter((a) => a.unlockedAt)
    .sort((a, b) => String(b.unlockedAt).localeCompare(String(a.unlockedAt)))
    .slice(0, 3);

  const topLeaderboard = (data?.leaderboard ?? []).slice(0, 5);
  const myRank = (data?.leaderboard ?? []).findIndex((u) => u.isCurrentUser) + 1;

  if (loading || !profile) {
    return (
      <div className="space-y-5">
        <Skeleton className="h-9 w-64" />
        <div className="grid gap-5 xl:grid-cols-[1fr_320px]">
          <div className="space-y-5">
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-56 w-full" />
          </div>
          <div className="space-y-5">
            <Skeleton className="h-44 w-full" />
            <Skeleton className="h-52 w-full" />
          </div>
        </div>
      </div>
    );
  }

  const currentModule = recommended ? getModuleById(recommended.moduleId) : null;
  const currentLevel = currentModule?.level ?? profile.currentLevel ?? "A1";
  const levelPct = getLevelProgress(currentLevel, completed);
  const previewModuleId = currentModule?.id ?? "a1-m1";
  const previewLessons = (data?.lessons ?? [])
    .filter((l) => l.moduleId === previewModuleId)
    .sort((a, b) => a.orderIndex - b.orderIndex);

  return (
    <div className="space-y-5">
      {/* Sarlavha */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">
            Salom, {profile.username}! 👋
          </h1>
          <p className="mt-1 text-sm text-ink-soft">
            Bugun {todayXp} XP to‘pladingiz — maqsad {dailyGoal} XP
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 rounded-full bg-error-soft px-3 py-1.5 text-sm font-extrabold text-error">
            <Flame size={16} /> {profile.currentStreak} kun
          </span>
          <span className="flex items-center gap-1.5 rounded-full bg-accent-yellow-soft px-3 py-1.5 text-sm font-extrabold text-[#8a6d00]">
            <Zap size={16} /> {formatNumber(profile.totalXp)} XP
          </span>
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1fr_320px]">
        {/* Asosiy ustun */}
        <div className="space-y-5">
          {/* Davom ettirish kartasi */}
          <Card className="overflow-hidden p-0">
            <div className="flex flex-col gap-4 bg-gradient-to-r from-primary to-[#4ab802] p-5 text-white sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-wide opacity-90">
                  {currentModule ? `${currentModule.title} · ${currentModule.titleUz}` : `${currentLevel} kursi`}
                </p>
                <h2 className="mt-1 truncate text-xl font-extrabold">
                  {recommended ? recommended.title : "Barcha darslar tugallandi! 🎉"}
                </h2>
                <p className="mt-1 text-sm opacity-90">
                  {recommended
                    ? `${recommended.description} · ${recommended.estimatedMinutes} daqiqa`
                    : "Barcha darajalardagi darslarni yakunladingiz."}
                </p>
              </div>
              {recommended && (
                <Link href={`/lesson/${recommended.id}`} className="shrink-0">
                  <Button variant="secondary" className="w-full sm:w-auto">
                    <Play size={16} className="text-primary" /> Davom etish
                  </Button>
                </Link>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4 p-5 sm:grid-cols-3">
              <Metric
                icon={<Target size={16} className="text-primary" />}
                label={`${currentLevel} progress`}
                value={`${levelPct}%`}
              />
              <Metric
                icon={<BookOpen size={16} className="text-accent-blue" />}
                label="Tugallangan darslar"
                value={`${completed.size}/${catalogTotals.lessons}`}
              />
              <Metric
                icon={<Trophy size={16} className="text-accent-yellow" />}
                label="Reytingdagi o‘rningiz"
                value={myRank > 0 ? `#${myRank}` : "—"}
              />
            </div>
          </Card>

          {/* Haftalik grafik */}
          <Card>
            <div className="mb-4 flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <CalendarDays size={16} className="text-accent-blue" />
                Haftalik o‘rganish
              </CardTitle>
              <span className="text-xs font-bold text-ink-soft">
                Jami {weekly.reduce((s, d) => s + d.xp, 0)} XP
              </span>
            </div>
            <div className="flex h-36 items-end justify-between gap-2 sm:gap-4">
              {weekly.map((d) => (
                <div key={d.key} className="flex flex-1 flex-col items-center gap-2">
                  <span className="text-[11px] font-bold text-ink-soft">
                    {d.xp > 0 ? d.xp : ""}
                  </span>
                  <div
                    className={cn(
                      "w-full max-w-10 rounded-lg transition-all",
                      d.xp > 0 ? "bg-primary" : "bg-surface-2",
                      d.key === todayKey() && d.xp > 0 && "ring-2 ring-primary-ink/30",
                    )}
                    style={{
                      height: `${Math.max(6, (d.xp / maxWeekXp) * 100)}%`,
                    }}
                    role="img"
                    aria-label={`${d.label}: ${d.xp} XP`}
                  />
                  <span
                    className={cn(
                      "text-xs font-bold",
                      d.key === todayKey() ? "text-primary" : "text-ink-faint",
                    )}
                  >
                    {d.label}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* O‘rganish yo‘li preview */}
          <Card>
            <div className="mb-4 flex items-center justify-between">
              <CardTitle>O‘rganish yo‘li</CardTitle>
              <Link
                href="/learn"
                className="flex items-center gap-1 text-sm font-bold text-primary hover:underline"
              >
                Barchasi <ChevronRight size={15} />
              </Link>
            </div>
            <LearningPathPreview
              completed={completed}
              recommendedId={recommendedId}
              lessons={previewLessons}
              moduleTitle={currentModule?.titleUz ?? "1-modul"}
            />
          </Card>

          {/* So‘nggi yutuqlar */}
          <Card>
            <div className="mb-4 flex items-center justify-between">
              <CardTitle>So‘nggi yutuqlar</CardTitle>
              <Link
                href="/achievements"
                className="flex items-center gap-1 text-sm font-bold text-primary hover:underline"
              >
                Barchasi <ChevronRight size={15} />
              </Link>
            </div>
            {recentAchievements.length === 0 ? (
              <p className="rounded-xl bg-surface p-4 text-sm text-ink-soft">
                Hali yutuq yo‘q — birinchi darsni tugating va ochilin!
              </p>
            ) : (
              <div className="grid gap-3 sm:grid-cols-3">
                {recentAchievements.map((a) => (
                  <div
                    key={a.achievement.id}
                    className="flex items-center gap-3 rounded-xl bg-primary-soft p-3"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white">
                      <Star size={16} className="fill-accent-yellow text-accent-yellow" />
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-ink">
                        {a.achievement.title}
                      </p>
                      <p className="text-xs text-ink-soft">Ochilgan</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* O‘ng ustun */}
        <div className="space-y-5">
          {/* Kunlik maqsad */}
          <Card>
            <CardTitle className="mb-3 flex items-center gap-2">
              <Target size={16} className="text-primary" />
              Kunlik maqsad
            </CardTitle>
            <div className="flex items-center justify-between text-sm">
              <span className="font-bold text-ink">{todayXp} / {dailyGoal} XP</span>
              <span className="font-bold text-primary">{dailyPct}%</span>
            </div>
            <Progress value={dailyPct} className="mt-2" height="h-3.5" ariaLabel="Kunlik maqsad" />
            {dailyPct >= 100 ? (
              <p className="mt-3 flex items-center gap-1.5 text-sm font-bold text-primary">
                <CheckCircle2 size={15} /> Maqsad bajarildi!
              </p>
            ) : (
              <p className="mt-3 text-xs text-ink-soft">
                Yana {Math.max(0, dailyGoal - todayXp)} XP — kunlik maqsadga yetasiz.
              </p>
            )}
          </Card>

          {/* Kunlik vazifalar */}
          <Card>
            <CardTitle className="mb-3">Kunlik vazifalar</CardTitle>
            <div className="space-y-3">
              {(data?.quests ?? []).map((q) => (
                <div key={q.quest.id} className="rounded-xl bg-surface p-3">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-bold text-ink">{q.quest.title}</p>
                    <Badge tone={q.completed ? "green" : "yellow"}>
                      +{q.quest.xpReward} XP
                    </Badge>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <Progress
                      value={Math.min(100, (q.progress / q.quest.targetValue) * 100)}
                      height="h-2"
                      ariaLabel={q.quest.title}
                    />
                    <span className="text-xs font-bold text-ink-soft">
                      {q.progress}/{q.quest.targetValue}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Reyting preview */}
          <Card>
            <div className="mb-3 flex items-center justify-between">
              <CardTitle>Haftalik reyting</CardTitle>
              <span
                className="rounded-full px-2 py-0.5 text-[11px] font-extrabold text-white"
                style={{
                  backgroundColor: LEAGUE_COLORS[leagueForXp(profile.totalXp)],
                }}
              >
                {LEAGUE_LABELS[leagueForXp(profile.totalXp)]}
              </span>
            </div>
            <div className="space-y-2">
              {topLeaderboard.map((u, i) => (
                <Link
                  key={u.userId}
                  href="/leaderboard"
                  className={cn(
                    "flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-surface",
                    u.isCurrentUser && "bg-primary-soft",
                  )}
                >
                  <span
                    className={cn(
                      "w-5 text-center text-sm font-extrabold",
                      i === 0 ? "text-accent-yellow" : "text-ink-faint",
                    )}
                  >
                    {i + 1}
                  </span>
                  <Avatar avatarId={u.avatarId} size="sm" />
                  <span className="min-w-0 flex-1 truncate text-sm font-bold text-ink">
                    {u.username}
                  </span>
                  <span className="text-xs font-extrabold text-ink-soft">
                    {u.weeklyXp} XP
                  </span>
                </Link>
              ))}
              {topLeaderboard.length === 0 && (
                <ListSkeleton count={2} />
              )}
            </div>
          </Card>

          {/* Maslahatlar */}
          <Card className="bg-accent-yellow-soft">
            <CardTitle className="mb-2 flex items-center gap-2 text-[#8a6d00]">
              <Lightbulb size={16} />
              O‘rganish maslahati
            </CardTitle>
            <p className="text-sm leading-relaxed text-[#8a6d00]">
              {TIPS[new Date().getDate() % TIPS.length]}
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Metric({
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
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface">
        {icon}
      </span>
      <span>
        <span className="block text-sm font-extrabold text-ink">{value}</span>
        <span className="block text-xs text-ink-soft">{label}</span>
      </span>
    </div>
  );
}

function LearningPathPreview({
  completed,
  recommendedId,
  lessons,
  moduleTitle,
}: {
  completed: Set<string>;
  recommendedId: string | null;
  lessons: { id: string; orderIndex: number }[];
  moduleTitle: string;
}) {
  const nodes = lessons.slice(0, 5);
  return (
    <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:gap-2">
      {nodes.map((lesson, i) => {
        const done = completed.has(lesson.id);
        const current = lesson.id === recommendedId;
        return (
          <div key={lesson.id} className="flex items-center gap-1 sm:gap-2">
            {i > 0 && (
              <span
                aria-hidden="true"
                className={cn(
                  "h-1 w-4 rounded-full sm:w-8",
                  done || current ? "bg-primary" : "bg-surface-2",
                )}
              />
            )}
            <span
              className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold",
                done && "bg-primary text-white",
                current && "scale-110 bg-white text-primary ring-4 ring-primary-soft",
                !done && !current && "bg-surface-2 text-ink-faint",
              )}
              title={`${moduleTitle} · ${lesson.orderIndex}-dars`}
            >
              {done ? <CheckCircle2 size={17} /> : lesson.orderIndex}
            </span>
          </div>
        );
      })}
      <span className="ml-2 shrink-0 text-xs font-bold text-ink-soft">{moduleTitle}</span>
    </div>
  );
}
