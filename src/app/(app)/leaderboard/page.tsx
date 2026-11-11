"use client";

import { useMemo } from "react";
import { Trophy, Zap, Medal, Crown } from "lucide-react";
import { useStoreData } from "@/hooks/use-store-data";
import { useAuth } from "@/components/providers/auth-provider";
import { Avatar } from "@/components/ui/avatar";
import { Card, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton, ListSkeleton } from "@/components/ui/skeleton";
import { LEAGUE_LABELS, LEAGUE_COLORS, leagueForXp } from "@/lib/store/engine";
import { cn, formatNumber, weekStartKey } from "@/lib/utils";
import type { AppStore } from "@/lib/store";
import type { LeaderboardRow } from "@/lib/store/types";

const MONTHS = [
  "yanvar", "fevral", "mart", "aprel", "may", "iyun",
  "iyul", "avgust", "sentabr", "oktabr", "noyabr", "dekabr",
];

export default function LeaderboardPage() {
  const { profile } = useAuth();
  const { data, loading } = useStoreData<LeaderboardRow[]>(
    async (store: AppStore) => store.getLeaderboard(),
    [],
  );

  const myLeague = leagueForXp(profile?.totalXp ?? 0);

  const rows = useMemo(() => {
    const list = [...(data ?? [])];
    // Joriy foydalanuvchini belgilash (store buni qaytarmasligi mumkin)
    return list.map((r) => ({
      ...r,
      isCurrentUser: profile ? r.userId === profile.id : false,
    }));
  }, [data, profile]);

  const myRank = rows.findIndex((r) => r.isCurrentUser) + 1;
  const weekStart = new Date(weekStartKey() + "T00:00:00");
  const weekLabel = `${weekStart.getDate()}-${MONTHS[weekStart.getMonth()]}`;

  if (loading || !profile) {
    return (
      <div className="space-y-5">
        <Skeleton className="h-9 w-56" />
        <Skeleton className="h-28 w-full" />
        <ListSkeleton count={5} />
      </div>
    );
  }

  const podium = rows.slice(0, 3);
  const rest = rows.slice(3);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">Haftalik reyting</h1>
          <p className="mt-1 text-sm text-ink-soft">
            {weekLabel} — hafta boshidan XP bo‘yicha reyting.
          </p>
        </div>
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-extrabold text-white"
          style={{ backgroundColor: LEAGUE_COLORS[myLeague] }}
        >
          <Medal size={15} /> {LEAGUE_LABELS[myLeague]} liga
        </span>
      </div>

      {/* Sizning o'rningiz */}
      <Card className="flex flex-wrap items-center justify-between gap-4 bg-gradient-to-r from-primary-soft to-white">
        <div className="flex items-center gap-3">
          <span
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-xl font-extrabold text-primary shadow-sm"
            aria-hidden="true"
          >
            {myRank > 0 ? `#${myRank}` : "—"}
          </span>
          <div>
            <p className="text-sm font-extrabold text-ink">
              Sizning o‘rningiz: {myRank > 0 ? `${myRank}-o‘rin` : "reytingda yo‘qsiz"}
            </p>
            <p className="text-xs text-ink-soft">
              Bu hafta {formatNumber(profile.totalXp)} XP jami · eng yuqori XP bilan
              reytingga chiqing.
            </p>
          </div>
        </div>
        <Badge tone="yellow">
          <Zap size={13} /> {profile.totalXp} XP
        </Badge>
      </Card>

      {/* Podium */}
      {podium.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-3">
          {podium.map((u, i) => {
            const place = i + 1;
            const medalColors = ["#FFC800", "#9FB3C8", "#CD7F32"];
            return (
              <Card
                key={u.userId}
                className={cn(
                  "relative text-center",
                  u.isCurrentUser && "ring-2 ring-primary",
                  place === 1 && "sm:order-2 sm:-mt-2",
                  place === 2 && "sm:order-1",
                  place === 3 && "sm:order-3",
                )}
              >
                {place === 1 && (
                  <Crown
                    size={20}
                    className="absolute left-1/2 top-3 -translate-x-1/2 text-accent-yellow"
                  />
                )}
                <div className="mt-4 flex flex-col items-center gap-2">
                  <Avatar avatarId={u.avatarId} size="lg" />
                  <p className="truncate text-sm font-extrabold text-ink">{u.username}</p>
                  <span
                    className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-extrabold text-white"
                    style={{ backgroundColor: medalColors[i] }}
                  >
                    {place}
                  </span>
                  <p className="flex items-center gap-1 text-sm font-extrabold text-primary">
                    <Zap size={14} /> {formatNumber(u.weeklyXp)} XP
                  </p>
                  {u.isCurrentUser && <Badge tone="green">Siz</Badge>}
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Qolgan ishtirokchilar */}
      <Card className="p-0">
        {rest.length === 0 && podium.length === 0 ? (
          <div className="py-10 text-center">
            <Trophy size={30} className="mx-auto text-accent-yellow" />
            <p className="mt-3 text-sm font-bold text-ink-soft">
              Hozircha reytingda boshqa ishtirokchi yo‘q — birinchi bo‘ling!
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-line">
            {rest.map((u, i) => (
              <li
                key={u.userId}
                className={cn(
                  "flex items-center gap-3 px-5 py-3.5",
                  u.isCurrentUser && "bg-primary-soft",
                )}
              >
                <span
                  className={cn(
                    "w-6 text-center text-sm font-extrabold",
                    u.isCurrentUser ? "text-primary" : "text-ink-faint",
                  )}
                >
                  {i + 4}
                </span>
                <Avatar avatarId={u.avatarId} size="sm" />
                <span className="min-w-0 flex-1 truncate text-sm font-bold text-ink">
                  {u.username}
                  {u.isCurrentUser && (
                    <span className="ml-2 text-xs font-extrabold text-primary">(siz)</span>
                  )}
                </span>
                <span
                  className="rounded-full px-2 py-0.5 text-[10px] font-extrabold text-white"
                  style={{
                    backgroundColor: LEAGUE_COLORS[leagueForXp(u.totalXp)],
                  }}
                >
                  {LEAGUE_LABELS[leagueForXp(u.totalXp)]}
                </span>
                <span className="w-20 text-right text-xs font-extrabold text-ink-soft">
                  {formatNumber(u.weeklyXp)} XP
                </span>
              </li>
            ))}
            {rows.length === 1 && (
              <li className="px-5 py-6 text-center text-sm text-ink-soft">
                Boshqa ishtirokchilar qo‘shilganda reyting to‘ladi.
              </li>
            )}
          </ul>
        )}
      </Card>

      <CardTitle className="px-1 text-sm text-ink-soft">
        Liga chegaralari: Bronza 0 · Kumush 100 · Oltin 300 · Almaz 700 XP
      </CardTitle>
    </div>
  );
}
