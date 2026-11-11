"use client";

import { useMemo, useState } from "react";
import {
  BadgeCheck,
  CheckCircle2,
  XCircle,
  Send,
  RotateCcw,
  Search,
  Loader2,
  BookOpen,
  Library,
  Filter,
} from "lucide-react";
import { useStoreData } from "@/hooks/use-store-data";
import { Card, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/toast";
import { getStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import type { AppStore, ContentCounts } from "@/lib/store";
import type { ContentReviewItem, ContentStatus } from "@/types";

const STATUS_META: Record<
  ContentStatus,
  { label: string; tone: "gray" | "yellow" | "green" | "blue" | "red" }
> = {
  draft: { label: "Qoralama", tone: "gray" },
  pending: { label: "Kutilmoqda", tone: "yellow" },
  verified: { label: "Tekshirilgan", tone: "green" },
  published: { label: "Nashr etilgan", tone: "blue" },
  rejected: { label: "Rad etilgan", tone: "red" },
};

const STATUS_TABS: (ContentStatus | "all")[] = [
  "pending",
  "draft",
  "rejected",
  "verified",
  "published",
  "all",
];

export default function AdminReviewsPage() {
  const { toast } = useToast();
  const [status, setStatus] = useState<ContentStatus | "all">("pending");
  const [kind, setKind] = useState<"all" | "vocabulary" | "lesson">("all");
  const [search, setSearch] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);

  const { data, loading, reload } = useStoreData<ContentReviewItem[]>(
    async (store: AppStore) => store.getContentReviews(status),
    [status],
  );
  const { data: counts, reload: reloadCounts } = useStoreData<ContentCounts>(
    async (store: AppStore) => store.getContentCounts(),
    [],
  );

  const items = useMemo(() => {
    const q = search.trim().toLowerCase();
    return (data ?? []).filter((r) => {
      if (kind !== "all" && r.kind !== kind) return false;
      if (!q) return true;
      return `${r.title} ${r.subtitle} ${r.details}`.toLowerCase().includes(q);
    });
  }, [data, kind, search]);

  async function change(item: ContentReviewItem, next: ContentStatus) {
    setBusyId(item.id);
    try {
      const err = await getStore().setContentStatus(item.kind, item.id, next);
      if (err) {
        toast(err, "error");
        return;
      }
      toast(`«${item.title}» → ${STATUS_META[next].label}`, "success");
      reload();
      reloadCounts();
    } catch {
      toast("Holatni o‘zgartirishda xatolik", "error");
    } finally {
      setBusyId(null);
    }
  }

  const totalPending =
    (counts?.vocabulary.pending ?? 0) + (counts?.lessons.pending ?? 0);

  return (
    <div className="space-y-4">
      <Card className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <CardTitle className="flex items-center gap-2">
            <BadgeCheck size={18} className="text-primary" /> Sifat nazorati
          </CardTitle>
          <p className="mt-1 text-sm text-ink-soft">
            Tekshirilmagan kontent o‘quvchilarga ko‘rinmaydi. Tasdiqlash → verified,
            nashr qilish → published.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 text-xs font-bold">
          <Badge tone="yellow">{totalPending} kutilmoqda</Badge>
          <Badge tone="green">{counts?.vocabulary.verified ?? 0} so‘z verified</Badge>
          <Badge tone="blue">{counts?.lessons.published ?? 0} dars published</Badge>
        </div>
      </Card>

      <div className="flex flex-wrap items-center gap-1.5">
        {STATUS_TABS.map((s) => {
          const active = status === s;
          const label =
            s === "all"
              ? "Barchasi"
              : `${STATUS_META[s].label}${
                  s === "pending" && totalPending > 0 ? ` (${totalPending})` : ""
                }`;
          return (
            <button
              key={s}
              type="button"
              onClick={() => setStatus(s)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-extrabold transition-colors",
                active
                  ? "border-primary bg-primary-soft text-primary-ink"
                  : "border-line bg-white text-ink-soft hover:bg-surface",
              )}
            >
              {label}
            </button>
          );
        })}
        <span className="mx-1 h-5 w-px bg-line" />
        {(["all", "vocabulary", "lesson"] as const).map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setKind(k)}
            className={cn(
              "inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-extrabold transition-colors",
              kind === k
                ? "border-accent-blue bg-accent-blue-soft text-accent-blue"
                : "border-line bg-white text-ink-soft hover:bg-surface",
            )}
          >
            <Filter size={12} />
            {k === "all" ? "Hammasi" : k === "vocabulary" ? "Lug‘at" : "Darslar"}
          </button>
        ))}
      </div>

      <Card className="flex items-center gap-2 p-3">
        <Search size={16} className="shrink-0 text-ink-soft" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Sarlavha yoki izoh bo‘yicha qidirish…"
          className="h-9 border-0 bg-transparent px-0 focus:ring-0"
          aria-label="Kontent qidirish"
        />
        <span className="shrink-0 text-xs font-bold text-ink-soft">
          {items.length} ta yozuv
        </span>
      </Card>

      {loading && !data ? (
        <div className="space-y-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-20 w-full" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <Card className="p-10 text-center">
          <CheckCircle2 size={30} className="mx-auto text-primary" />
          <p className="mt-3 text-base font-extrabold text-ink">
            Bu holatda kontent yo‘q
          </p>
          <p className="mt-1 text-sm text-ink-soft">
            Boshqa holatni tanlang yoki import orqali yangi kontent qo‘shing.
          </p>
        </Card>
      ) : (
        <div className="space-y-2">
          {items.map((item) => {
            const meta = STATUS_META[item.status];
            const busy = busyId === item.id;
            return (
              <Card key={`${item.kind}-${item.id}`} className="p-3.5">
                <div className="flex flex-wrap items-start gap-3">
                  <span
                    className={cn(
                      "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
                      item.kind === "vocabulary"
                        ? "bg-error-soft text-error"
                        : "bg-accent-blue-soft text-accent-blue",
                    )}
                  >
                    {item.kind === "vocabulary" ? (
                      <Library size={17} />
                    ) : (
                      <BookOpen size={17} />
                    )}
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="truncate text-sm font-extrabold text-ink">
                        {item.title}
                      </p>
                      <Badge tone={meta.tone}>{meta.label}</Badge>
                      <Badge tone="gray">{item.level}</Badge>
                      <span className="text-[11px] font-bold text-ink-faint">
                        {item.kind === "vocabulary" ? "lug‘at" : "dars"}
                      </span>
                    </div>
                    <p className="mt-0.5 truncate text-xs text-ink-soft">
                      {item.subtitle}
                    </p>
                    <p className="mt-0.5 truncate text-[11px] text-ink-faint">
                      {item.details} · {item.id}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5">
                    {item.status !== "verified" && (
                      <Button
                        variant="secondary"
                        disabled={busy}
                        onClick={() => change(item, "verified")}
                        className="h-8 rounded-full px-2.5 text-[11px]"
                      >
                        {busy ? (
                          <Loader2 size={13} className="animate-spin" />
                        ) : (
                          <CheckCircle2 size={13} />
                        )}
                        Tasdiqlash
                      </Button>
                    )}
                    {item.status !== "published" && (
                      <Button
                        disabled={busy}
                        onClick={() => change(item, "published")}
                        className="h-8 rounded-full px-2.5 text-[11px]"
                      >
                        <Send size={13} /> Nashr etish
                      </Button>
                    )}
                    {item.status !== "rejected" && (
                      <Button
                        variant="danger"
                        disabled={busy}
                        onClick={() => change(item, "rejected")}
                        className="h-8 rounded-full px-2.5 text-[11px]"
                      >
                        <XCircle size={13} /> Rad etish
                      </Button>
                    )}
                    {(item.status === "published" ||
                      item.status === "rejected" ||
                      item.status === "verified") && (
                      <Button
                        variant="ghost"
                        disabled={busy}
                        onClick={() => change(item, "draft")}
                        className="h-8 rounded-full px-2.5 text-[11px]"
                      >
                        <RotateCcw size={13} /> Qoralamaga
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      <p className="text-[11px] text-ink-faint">
        Eslatma: import qilingan yozuvlar standart holatda «pending» bo‘ladi.
        Avtomatik tarjimalar hech qachon o‘z-o‘zidan tasdiqlanmaydi. Supabase rejimida
        barcha holat o‘zgarishlari <code>content_reviews</code> jurnalida saqlanadi.
      </p>
    </div>
  );
}
