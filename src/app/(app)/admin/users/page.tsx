"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  Users,
  Crown,
  BadgeCheck,
  KeyRound,
  Lock,
  Check,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useStoreData } from "@/hooks/use-store-data";
import { getStore } from "@/lib/store";
import { formatNumber } from "@/lib/utils";
import { achievements } from "@/data/achievements";
import type { AdminUserRow } from "@/lib/store/types";

/**
 * Admin: Foydalanuvchilar — ro'yxat (email bilan), rol berish/olish,
 * yutuq berish, parolni yangilash (parollarni ko'rish mumkin emas — hash).
 */
export default function AdminUsersPage() {
  const { data: isAdmin, loading: adminLoading } = useStoreData(
    (store) => store.adminIsAdmin(),
    [],
  );
  const { data: users, loading: usersLoading, reload } = useStoreData(
    (store) => store.adminListUsers(),
    [],
  );

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [achId, setAchId] = useState(achievements[0]?.id ?? "");
  const [newPass, setNewPass] = useState("");
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  if (adminLoading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-6">
        <Skeleton className="h-10 w-52" />
        <div className="mt-4 space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-14 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="mx-auto max-w-lg px-4 py-10">
        <Card className="p-8 text-center">
          <Lock size={28} className="mx-auto text-ink-soft" />
          <h1 className="mt-3 text-xl font-extrabold text-ink">Ruxsat yo&apos;q</h1>
          <p className="mt-1 text-sm text-ink-soft">Bu sahifa faqat adminlar uchun.</p>
        </Card>
      </div>
    );
  }

  const act = async (fn: () => Promise<string | null>, okText: string) => {
    setBusy(true);
    setMsg(null);
    const err = await fn();
    setBusy(false);
    if (err) setMsg({ ok: false, text: err });
    else {
      setMsg({ ok: true, text: okText });
      reload();
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:py-8">
      <Link href="/admin" className="mb-4 inline-flex items-center gap-1.5 text-sm font-bold text-ink-soft hover:text-ink">
        <ArrowLeft size={16} />
        Admin panel
      </Link>

      <div className="mb-5 flex items-center gap-2">
        <Users size={24} className="text-primary" />
        <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">Foydalanuvchilar</h1>
        <span className="ml-2 rounded-full bg-primary-soft px-2.5 py-0.5 text-xs font-bold text-ink">
          {users?.length ?? 0}
        </span>
      </div>

      <div className="mb-4 rounded-xl border-l-4 border-[#8a6d00] bg-[#fff7e0] px-4 py-2.5 text-xs text-ink">
        🔒 Parollar hash holda saqlanadi — <strong>ko&apos;rsatish mumkin emas</strong> (Google/Instagram ham shunday).
        Userning parolini o&apos;zgartirish kerak bo&apos;lsa — qatorda <strong>&quot;Parol&quot;</strong> tugmasini bering.
      </div>

      {msg && (
        <div
          className={`mb-4 rounded-xl border-l-4 px-4 py-3 text-sm font-semibold ${
            msg.ok
              ? "border-[#2e7d32] bg-[#e8f5e9] text-[#1b5e20]"
              : "border-error bg-[#ffecec] text-[#c62828]"
          }`}
        >
          {msg.ok ? <Check size={14} className="mr-1 inline" /> : null}
          {msg.text}
        </div>
      )}

      {usersLoading || !users ? (
        <div className="space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      ) : users.length === 0 ? (
        <Card className="p-8 text-center text-sm text-ink-soft">Hozircha foydalanuvchilar yo&apos;q.</Card>
      ) : (
        <div className="space-y-2">
          {users.map((u) => (
            <UserRow
              key={u.userId}
              u={u}
              expanded={expandedId === u.userId}
              onToggle={() => setExpandedId(expandedId === u.userId ? null : u.userId)}
              achId={achId}
              setAchId={setAchId}
              newPass={newPass}
              setNewPass={setNewPass}
              busy={busy}
              onSetRole={(role) =>
                act(
                  () => getStore().adminSetRole(u.userId, role),
                  role === "admin" ? `${u.username} endi admin 👑` : `${u.username} oddiy user qilindi`,
                )
              }
              onGrant={() =>
                act(
                  () => getStore().adminGrantAchievement(u.userId, achId),
                  `Yutuq berildi: ${achievements.find((a) => a.id === achId)?.title ?? achId} 🏅`,
                )
              }
              onReset={() =>
                act(
                  () => getStore().adminResetPassword(u.userId, newPass),
                  `${u.username}ning paroli yangilandi 🔑`,
                )
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}

function UserRow({
  u,
  expanded,
  onToggle,
  achId,
  setAchId,
  newPass,
  setNewPass,
  busy,
  onSetRole,
  onGrant,
  onReset,
}: {
  u: AdminUserRow;
  expanded: boolean;
  onToggle: () => void;
  achId: string;
  setAchId: (v: string) => void;
  newPass: string;
  setNewPass: (v: string) => void;
  busy: boolean;
  onSetRole: (role: "user" | "admin") => void;
  onGrant: () => void;
  onReset: () => void;
}) {
  const isSelf = false; // server o'zini o'zgartirishni rad etadi (xato xabari bilan)
  return (
    <Card className="p-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-ink">{u.username}</span>
            {u.role === "admin" && (
              <span className="inline-flex items-center gap-1 rounded-full bg-[#fff7e0] px-2 py-0.5 text-[11px] font-bold text-[#8a6d00]">
                <Crown size={11} />
                admin
              </span>
            )}
          </div>
          <p className="truncate text-sm text-ink-soft">
            {u.email}
            {u.fullName ? ` · ${u.fullName}` : ""}
          </p>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <span className="font-bold text-ink tabular-nums">
            ⚡ {formatNumber(u.totalXp)}
          </span>
          <span className="font-bold text-ink tabular-nums">
            🔥 {u.currentStreak}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="secondary"
            disabled={busy || isSelf}
            onClick={() => onSetRole(u.role === "admin" ? "user" : "admin")}
          >
            <Crown size={14} />
            {u.role === "admin" ? "Adminlikni olib tashlash" : "Admin qilish"}
          </Button>
          <Button size="sm" variant="ghost" onClick={onToggle}>
            {expanded ? "Yopish" : "Boshqarish"}
          </Button>
        </div>
      </div>

      {expanded && (
        <div className="mt-4 grid gap-3 border-t border-line pt-4 sm:grid-cols-2">
          {/* Yutuq berish */}
          <div className="rounded-xl bg-surface p-3">
            <p className="mb-2 flex items-center gap-1.5 text-xs font-extrabold text-ink">
              <BadgeCheck size={13} className="text-primary" />
              Yutuq berish
            </p>
            <select
              className="w-full rounded-lg border-2 border-line bg-white px-2 py-2 text-sm font-semibold text-ink"
              value={achId}
              onChange={(e) => setAchId(e.target.value)}
            >
              {achievements.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.title} (+{a.xpReward} XP)
                </option>
              ))}
            </select>
            <Button size="sm" className="mt-2 w-full" disabled={busy} onClick={onGrant}>
              Berish
            </Button>
          </div>

          {/* Parol yangilash */}
          <div className="rounded-xl bg-surface p-3">
            <p className="mb-2 flex items-center gap-1.5 text-xs font-extrabold text-ink">
              <KeyRound size={13} className="text-primary" />
              Parolni yangilash
            </p>
            <input
              type="text"
              className="w-full rounded-lg border-2 border-line bg-white px-2 py-2 text-sm font-semibold text-ink"
              placeholder="Yangi parol (min 6 belgi)"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
            />
            <Button size="sm" className="mt-2 w-full" disabled={busy || newPass.length < 6} onClick={onReset}>
              Yangilash
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}
