"use client";

import Link from "next/link";
import { Users, Activity, CheckCircle2, Zap, BookOpen, HelpCircle, Library, Layers, BadgeCheck } from "lucide-react";
import { useStoreData } from "@/hooks/use-store-data";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { formatNumber } from "@/lib/utils";
import type { AppStore, AdminStats, ContentCounts } from "@/lib/store";

export default function AdminOverviewPage() {
  const { data, loading } = useStoreData<AdminStats>(
    async (store: AppStore) => store.adminStats(),
    [],
  );
  const { data: counts } = useStoreData<ContentCounts>(
    async (store: AppStore) => store.getContentCounts(),
    [],
  );

  if (loading || !data) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-28 w-full" />
        ))}
      </div>
    );
  }

  const userStats = [
    {
      icon: <Users size={18} className="text-accent-blue" />,
      label: "Foydalanuvchilar",
      value: formatNumber(data.totalUsers),
      sub: "jami hisoblar",
      tone: "bg-accent-blue-soft",
    },
    {
      icon: <Activity size={18} className="text-primary" />,
      label: "Faol (7 kun)",
      value: formatNumber(data.activeUsers),
      sub: "haftalik faol",
      tone: "bg-primary-soft",
    },
    {
      icon: <CheckCircle2 size={18} className="text-primary" />,
      label: "Tugallangan darslar",
      value: formatNumber(data.completedLessons),
      sub: "barcha foydalanuvchilar",
      tone: "bg-primary-soft",
    },
    {
      icon: <Zap size={18} className="text-[#8a6d00]" />,
      label: "Jami XP",
      value: formatNumber(data.totalXp),
      sub: "butun platforma",
      tone: "bg-accent-yellow-soft",
    },
  ];

  const contentStats = [
    {
      icon: <Layers size={18} className="text-[#6b46c1]" />,
      label: "Modullar",
      value: data.modulesCount,
      sub: "A1–C2 kurslari",
      tone: "bg-[#f0ebff]",
    },
    {
      icon: <BookOpen size={18} className="text-accent-blue" />,
      label: "Darslar",
      value: data.lessonsCount,
      sub: "mavjud darslar",
      tone: "bg-accent-blue-soft",
    },
    {
      icon: <HelpCircle size={18} className="text-primary" />,
      label: "Savollar",
      value: data.questionsCount,
      sub: "barcha turdagi savollar",
      tone: "bg-primary-soft",
    },
    {
      icon: <Library size={18} className="text-error" />,
      label: "So‘zlar",
      value: data.vocabularyCount,
      sub: "lug‘at bazasi",
      tone: "bg-error-soft",
    },
  ];

  return (
    <div className="space-y-6">
      <section>
        <div className="mb-3 flex items-center justify-between">
          <CardTitle>Foydalanuvchilar</CardTitle>
          <Badge tone="blue">Joriy ma’lumotlar</Badge>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {userStats.map((s) => (
            <Card key={s.label} className="flex items-center gap-3">
              <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${s.tone}`}>
                {s.icon}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-xl font-extrabold text-ink">
                  {s.value}
                </span>
                <span className="block truncate text-xs font-bold text-ink-soft">
                  {s.label}
                </span>
                <span className="block truncate text-[11px] text-ink-faint">{s.sub}</span>
              </span>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <CardTitle>Kontent</CardTitle>
          <Badge tone="green">Seed ma’lumotlari bilan</Badge>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {contentStats.map((s) => (
            <Card key={s.label} className="flex items-center gap-3">
              <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${s.tone}`}>
                {s.icon}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-xl font-extrabold text-ink">
                  {s.value}
                </span>
                <span className="block truncate text-xs font-bold text-ink-soft">
                  {s.label}
                </span>
                <span className="block truncate text-[11px] text-ink-faint">{s.sub}</span>
              </span>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <CardTitle className="flex items-center gap-2">
            <BadgeCheck size={18} className="text-primary" /> Kontent holati (sifat nazorati)
          </CardTitle>
          <Link href="/admin/reviews">
            <Button variant="secondary" className="h-9 rounded-full px-3 text-xs">
              Ko‘rib chiqish
            </Button>
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              label: "Tekshirish kutilmoqda",
              value: (counts?.vocabulary.pending ?? 0) + (counts?.lessons.pending ?? 0),
              sub: "lug‘at + darslar",
              tone: "bg-accent-yellow-soft",
            },
            {
              label: "Tekshirilgan",
              value: (counts?.vocabulary.verified ?? 0) + (counts?.lessons.verified ?? 0),
              sub: "o‘quvchiga ko‘rinadi",
              tone: "bg-primary-soft",
            },
            {
              label: "Nashr etilgan",
              value: (counts?.vocabulary.published ?? 0) + (counts?.lessons.published ?? 0),
              sub: "ommaviy kontent",
              tone: "bg-accent-blue-soft",
            },
            {
              label: "Rad etilgan / qoralama",
              value:
                (counts?.vocabulary.rejected ?? 0) +
                (counts?.lessons.rejected ?? 0) +
                (counts?.vocabulary.draft ?? 0) +
                (counts?.lessons.draft ?? 0),
              sub: "yashirilgan",
              tone: "bg-error-soft",
            },
          ].map((s) => (
            <Card key={s.label} className="flex items-center gap-3">
              <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${s.tone}`}>
                <BadgeCheck size={18} className="text-ink" />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-xl font-extrabold text-ink">
                  {formatNumber(s.value)}
                </span>
                <span className="block truncate text-xs font-bold text-ink-soft">{s.label}</span>
                <span className="block truncate text-[11px] text-ink-faint">{s.sub}</span>
              </span>
            </Card>
          ))}
        </div>
        <p className="mt-2 text-xs text-ink-faint">
          Import qilingan va AI tarjimalar avtomatik tekshirilmaydi — ular «pending»
          holatida boshlanadi. O‘quvchilar faqat verified va published kontentni ko‘radi.
        </p>
      </section>

      <Card className="bg-accent-yellow-soft">
        <CardTitle className="mb-2 text-[#8a6d00]">Xavfsizlik eslatmasi</CardTitle>
        <p className="text-sm leading-relaxed text-[#8a6d00]">
          Admin amallari (yozish/o‘chirish) store orqali tekshiriladi: DEMO rejimida
          hisob roli, Supabase rejimida esa RLS + RPC ichidagi rol tekshiruvi
          (is_admin()) orqali himoyalangan. Xuddi shu tekshiruv server tomonida
          takrorlanadi — UI’ga ishonib bo‘lmaydi.
        </p>
      </Card>
    </div>
  );
}
