"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Check,
  Lock,
  Play,
  Trophy,
  Clock,
  Zap,
  ChevronDown,
} from "lucide-react";
import { useStoreData } from "@/hooks/use-store-data";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import {
  LEVELS,
  catalogTotals,
  getModulesForLevel,
  isLessonUnlocked,
} from "@/data/curriculum";
import { cn } from "@/lib/utils";
import type { AppStore } from "@/lib/store";
import type { Level } from "@/types";

interface LearnData {
  lessons: { id: string; moduleId: string; title: string; titleRu: string; description: string; estimatedMinutes: number; xpReward: number; orderIndex: number }[];
  progress: { lessonId: string; completed: boolean; bestScore: number }[];
}

export default function LearnPage() {
  const { data, loading } = useStoreData<LearnData>(async (store: AppStore) => {
    const [lessons, progress] = await Promise.all([
      store.getLessons(),
      store.getLessonProgress(),
    ]);
    return { lessons, progress };
  }, []);

  const completed = useMemo(
    () => new Set((data?.progress ?? []).filter((p) => p.completed).map((p) => p.lessonId)),
    [data],
  );

  const [openLevel, setOpenLevel] = useState<Level | null>("A1");

  if (loading || !data) {
    return (
      <div className="space-y-5">
        <Skeleton className="h-9 w-56" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-72 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">O‘rganish yo‘li</h1>
        <p className="mt-1 text-sm text-ink-soft">
          Har bir dars oldingisini tugatgandan keyin ochiladi.
        </p>
      </div>

      <div className="space-y-4">
        {LEVELS.map((lvl) => {
          const modules = getModulesForLevel(lvl.id).filter((m) =>
            data.lessons.some((l) => l.moduleId === m.id),
          );
          const comingSoon = modules.length === 0;
          const isOpen = openLevel === lvl.id;
          const levelLessons = data.lessons.filter((l) =>
            modules.some((m) => m.id === l.moduleId),
          );
          const levelDone = levelLessons.filter((l) => completed.has(l.id)).length;
          const levelPct =
            levelLessons.length > 0 ? (levelDone / levelLessons.length) * 100 : 0;

          return (
            <section
              key={lvl.id}
              className={cn("card overflow-hidden", comingSoon && "opacity-90")}
            >
              <button
                type="button"
                onClick={() => setOpenLevel(isOpen ? null : lvl.id)}
                className="flex w-full items-center gap-4 p-5 text-left"
                aria-expanded={isOpen}
              >
                <span
                  className={cn(
                    "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-sm font-extrabold",
                    comingSoon
                      ? "bg-surface-2 text-ink-faint"
                      : "bg-primary text-white shadow-[0_3px_0_0_var(--color-primary-dark)]",
                  )}
                >
                  {lvl.id}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="text-base font-extrabold text-ink">{lvl.title}</span>
                    {comingSoon ? (
                      <Badge tone="gray">Tez orada</Badge>
                    ) : (
                      <Badge tone="green">
                        {levelDone}/{levelLessons.length} dars
                      </Badge>
                    )}
                  </span>
                  <span className="mt-0.5 block text-sm text-ink-soft">{lvl.subtitle}</span>
                  {!comingSoon && (
                    <span className="mt-2 block max-w-md">
                      <Progress
                        value={levelPct}
                        height="h-1.5"
                        ariaLabel={`${lvl.title} darajasi progressi`}
                      />
                    </span>
                  )}
                </span>
                <ChevronDown
                  size={20}
                  className={cn(
                    "shrink-0 text-ink-soft transition-transform",
                    isOpen && "rotate-180",
                  )}
                />
              </button>

              {isOpen && (
                <div className="border-t border-line bg-surface/60 p-5">
                  {comingSoon ? (
                    <p className="rounded-xl bg-white p-4 text-sm text-ink-soft">
                      Bu bosqich keyingi yangilanishda ochiladi. Hozircha A1 kursini
                      to‘liq o‘zlashtiring! 💪
                    </p>
                  ) : (
                    <div className="space-y-6">
                      {modules.map((mod) => {
                        const lessons = data.lessons
                          .filter((l) => l.moduleId === mod.id)
                          .sort((a, b) => a.orderIndex - b.orderIndex);
                        const modDone = lessons.filter((l) => completed.has(l.id)).length;
                        return (
                          <div key={mod.id}>
                            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                              <div>
                                <h3 className="flex items-center gap-2 text-base font-extrabold text-ink">
                                  {mod.title}
                                  <span className="text-sm font-semibold text-ink-soft">
                                    · {mod.titleUz}
                                  </span>
                                </h3>
                                <p className="text-sm text-ink-soft">{mod.description}</p>
                              </div>
                              <span className="text-xs font-bold text-ink-soft">
                                {modDone}/{lessons.length} dars
                              </span>
                            </div>
                            <Progress
                              value={(modDone / Math.max(1, lessons.length)) * 100}
                              height="h-2"
                              ariaLabel={`${mod.titleUz} progress`}
                            />

                            {/* Darslar — vertikal yo‘l */}
                            <ol className="relative mt-5 space-y-0">
                              {lessons.map((lesson, idx) => {
                                const done = completed.has(lesson.id);
                                const unlocked = isLessonUnlocked(lesson.id, completed);
                                const isCurrent =
                                  unlocked && !done &&
                                  lessons
                                    .slice(0, idx)
                                    .every((l) => completed.has(l.id));
                                return (
                                  <li key={lesson.id} className="relative flex gap-4 pb-6 last:pb-0">
                                    {/* Chiziq */}
                                    {idx < lessons.length - 1 && (
                                      <span
                                        aria-hidden="true"
                                        className={cn(
                                          "absolute left-[22px] top-11 h-[calc(100%-28px)] w-1 rounded-full",
                                          done ? "bg-primary" : "bg-line",
                                        )}
                                      />
                                    )}
                                    {/* Tugun */}
                                    <span
                                      className={cn(
                                        "relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-4 border-white text-sm font-extrabold shadow-sm",
                                        done && "bg-primary text-white",
                                        isCurrent &&
                                          "animate-bounce-in bg-accent-yellow text-ink ring-4 ring-accent-yellow-soft",
                                        !done && !isCurrent && "bg-surface-2 text-ink-faint",
                                      )}
                                    >
                                      {done ? (
                                        <Check size={18} />
                                      ) : unlocked ? (
                                        <Play size={16} />
                                      ) : (
                                        <Lock size={15} />
                                      )}
                                    </span>

                                    {/* Kartasi */}
                                    <div
                                      className={cn(
                                        "flex-1 rounded-2xl border bg-white p-4 transition-all",
                                        isCurrent && "border-accent-yellow shadow-md",
                                        !unlocked && "border-line bg-surface/60 opacity-75",
                                      )}
                                    >
                                      <div className="flex flex-wrap items-center justify-between gap-3">
                                        <div className="min-w-0">
                                          <p className="flex flex-wrap items-center gap-2 text-sm font-extrabold text-ink">
                                            {lesson.title}
                                            <span className="font-semibold text-ink-soft">
                                              · {lesson.titleRu}
                                            </span>
                                            {done && <Check size={14} className="text-primary" />}
                                          </p>
                                          <p className="mt-0.5 text-xs text-ink-soft">
                                            {lesson.description}
                                          </p>
                                          <div className="mt-2 flex flex-wrap gap-3 text-[11px] font-bold text-ink-soft">
                                            <span className="flex items-center gap-1">
                                              <Clock size={12} /> {lesson.estimatedMinutes} daqiqa
                                            </span>
                                            <span className="flex items-center gap-1 text-[#8a6d00]">
                                              <Zap size={12} /> +{lesson.xpReward} XP
                                            </span>
                                          </div>
                                        </div>

                                        {unlocked ? (
                                          <Link
                                            href={`/lesson/${lesson.id}`}
                                            className={cn(
                                              "btn-3d inline-flex h-10 items-center gap-1.5 rounded-full px-5 text-sm",
                                              isCurrent
                                                ? "bg-accent-yellow text-ink shadow-[0_4px_0_0_#e0ad00]"
                                                : "bg-primary text-white shadow-[0_4px_0_0_var(--color-primary-dark)]",
                                            )}
                                          >
                                            {done ? "Takrorlash" : isCurrent ? "Boshlash" : "Ochish"}
                                          </Link>
                                        ) : (
                                          <span className="flex items-center gap-1.5 rounded-full bg-surface-2 px-4 py-2 text-xs font-bold text-ink-faint">
                                            <Lock size={13} /> Yopiq
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  </li>
                                );
                              })}
                            </ol>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </section>
          );
        })}
      </div>

      {/* Pastki ma'lumot */}
      <div className="flex items-center gap-3 rounded-2xl bg-primary-soft p-4 text-sm text-primary-ink">
        <Trophy size={18} className="shrink-0" />
        <span>
          A1–C2 kurslarida jami <strong>{catalogTotals.lessons} ta dars</strong>,{" "}
          <strong>{catalogTotals.modules} ta modul</strong> va{" "}
          <strong>{catalogTotals.exercises.toLocaleString()} ta mashq</strong> bor.
          Har bir darsni tugatib XP to‘plang!
        </span>
      </div>
    </div>
  );
}
