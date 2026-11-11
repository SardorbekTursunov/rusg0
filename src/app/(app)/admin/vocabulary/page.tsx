"use client";

import { useCallback, useMemo, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Loader2,
  Save,
  Search,
  Library,
} from "lucide-react";
import { useStoreData } from "@/hooks/use-store-data";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { Input, Label, Textarea } from "@/components/ui/input";
import { Skeleton, ListSkeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/toast";
import { getStore } from "@/lib/store";
import { uid } from "@/lib/utils";
import { vocabularyTopics } from "@/data/vocabulary";
import { VOCAB_CATEGORIES, categoryTitleUz } from "@/data/vocabulary/categories";
import type { AppStore } from "@/lib/store";
import type { ContentStatus, Level, VocabularyItem } from "@/types";

const LEVELS: Level[] = ["A1", "A2", "B1", "B2", "C1", "C2"];

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

const emptyItem = (): VocabularyItem => ({
  id: uid("v"),
  russianWord: "",
  uzbekTranslation: "",
  transliteration: "",
  partOfSpeech: "ot",
  exampleRu: "",
  exampleUz: "",
  audioUrl: null,
  level: "A1",
  topic: vocabularyTopics[0] ?? "Tanishuv",
  entryType: "lemma",
  categories: [],
  status: "pending",
  source: "admin",
  meanings: [],
  examples: [],
});

export default function AdminVocabularyPage() {
  const { toast } = useToast();
  const { data, loading, reload } = useStoreData<VocabularyItem[]>(
    async (store: AppStore) => store.getVocabulary(),
    [],
  );

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<ContentStatus | "all">("all");
  const [draft, setDraft] = useState<VocabularyItem | null>(null);
  const [isNew, setIsNew] = useState(true);
  const [busy, setBusy] = useState(false);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const list = (data ?? []).filter(
      (v) => statusFilter === "all" || (v.status ?? "verified") === statusFilter,
    );
    if (!q) return list;
    return list.filter(
      (v) =>
        v.russianWord.toLowerCase().includes(q) ||
        v.uzbekTranslation.toLowerCase().includes(q) ||
        v.topic.toLowerCase().includes(q) ||
        v.transliteration.toLowerCase().includes(q),
    );
  }, [data, search, statusFilter]);

  const save = useCallback(async () => {
    if (!draft) return;
    if (!draft.russianWord.trim() || !draft.uzbekTranslation.trim()) {
      toast("Ruscha so‘z va o‘zbekcha tarjima majburiy", "error");
      return;
    }
    setBusy(true);
    try {
      const err = await getStore().adminSaveVocabulary({
        ...draft,
        russianWord: draft.russianWord.trim(),
        uzbekTranslation: draft.uzbekTranslation.trim(),
        transliteration: draft.transliteration.trim(),
        exampleRu: draft.exampleRu.trim(),
        exampleUz: draft.exampleUz.trim(),
        topic: draft.topic.trim() || "Boshqa",
        status: draft.status ?? "pending",
        verifiedAt:
          draft.status === "verified" || draft.status === "published"
            ? new Date().toISOString()
            : null,
      });
      if (err) toast(err, "error");
      else {
        toast("So‘z saqlandi", "success");
        setDraft(null);
        reload();
      }
    } catch {
      toast("Saqlashda xatolik", "error");
    } finally {
      setBusy(false);
    }
  }, [draft, toast, reload]);

  const remove = useCallback(
    async (item: VocabularyItem) => {
      setBusy(true);
      try {
        const err = await getStore().adminDeleteVocabulary(item.id);
        if (err) toast(err, "error");
        else {
          toast("So‘z o‘chirildi", "success");
          reload();
        }
      } finally {
        setBusy(false);
      }
    },
    [toast, reload],
  );

  if (loading || !data) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-64" />
        <ListSkeleton count={4} />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <CardTitle className="flex items-center gap-2">
          <Library size={16} className="text-error" />
          {data.length} ta so‘z
        </CardTitle>
        <div className="flex flex-1 items-center justify-end gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as ContentStatus | "all")}
            className="h-10 rounded-xl border-2 border-line bg-white px-2 text-xs font-bold text-ink"
            aria-label="Holat bo‘yicha filtr"
          >
            <option value="all">Barcha holatlar</option>
            {Object.entries(STATUS_META).map(([value, meta]) => (
              <option key={value} value={value}>
                {meta.label}
              </option>
            ))}
          </select>
          <div className="relative w-full max-w-xs">
            <Search
              size={15}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint"
            />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Qidirish…"
              aria-label="So‘zlardan qidirish"
              className="pl-9"
            />
          </div>
          <Button
            size="sm"
            onClick={() => {
              setIsNew(true);
              setDraft(emptyItem());
            }}
          >
            <Plus size={15} /> Yangi so‘z
          </Button>
        </div>
      </div>

      <Card className="p-0">
        {filtered.length === 0 ? (
          <p className="py-10 text-center text-sm text-ink-soft">So‘z topilmadi.</p>
        ) : (
          <ul className="max-h-[65vh] divide-y divide-line overflow-y-auto">
            {filtered.map((v) => (
              <li key={v.id} className="flex items-center gap-3 px-5 py-3">
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-extrabold text-ink">
                    {v.russianWord}
                    <span className="ml-2 text-xs font-semibold text-ink-faint">
                      {v.transliteration}
                    </span>
                  </span>
                  <span className="block truncate text-xs text-ink-soft">
                    {v.uzbekTranslation} · {v.topic} · {v.level}
                  </span>
                </span>
                <Badge tone="gray" className="hidden sm:inline-flex">
                  {v.partOfSpeech}
                </Badge>
                <Badge
                  tone={STATUS_META[v.status ?? "verified"]?.tone ?? "gray"}
                  className="hidden sm:inline-flex"
                >
                  {STATUS_META[v.status ?? "verified"]?.label ?? "Tekshirilgan"}
                </Badge>
                <button
                  type="button"
                  aria-label="Tahrirlash"
                  className="rounded-lg p-2 text-ink-soft hover:bg-surface-2"
                  onClick={() => {
                    setIsNew(false);
                    setDraft({ ...v });
                  }}
                >
                  <Pencil size={15} />
                </button>
                <button
                  type="button"
                  aria-label="O‘chirish"
                  className="rounded-lg p-2 text-error hover:bg-error-soft"
                  disabled={busy}
                  onClick={() => {
                    if (confirm(`«${v.russianWord}» so‘zi o‘chirilsinmi?`)) void remove(v);
                  }}
                >
                  <Trash2 size={15} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </Card>

      <Modal
        open={Boolean(draft)}
        onClose={() => setDraft(null)}
        title={isNew ? "Yangi so‘z" : "So‘zni tahrirlash"}
        className="max-w-lg"
      >
        {draft && (
          <div className="max-h-[70vh] space-y-3 overflow-y-auto pr-1">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Ruscha so‘z *</Label>
                <Input
                  value={draft.russianWord}
                  onChange={(e) => setDraft({ ...draft, russianWord: e.target.value })}
                  placeholder="книга"
                />
              </div>
              <div>
                <Label>O‘zbekcha tarjima *</Label>
                <Input
                  value={draft.uzbekTranslation}
                  onChange={(e) => setDraft({ ...draft, uzbekTranslation: e.target.value })}
                  placeholder="kitob"
                />
              </div>
            </div>
            <div>
              <Label>Transliteratsiya</Label>
              <Input
                value={draft.transliteration}
                onChange={(e) => setDraft({ ...draft, transliteration: e.target.value })}
                placeholder="kniga"
              />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <Label>So‘z turi</Label>
                <Input
                  value={draft.partOfSpeech}
                  onChange={(e) => setDraft({ ...draft, partOfSpeech: e.target.value })}
                  placeholder="ot"
                />
              </div>
              <div>
                <Label>Daraja</Label>
                <select
                  value={draft.level}
                  onChange={(e) =>
                    setDraft({ ...draft, level: e.target.value as Level })
                  }
                  className="h-11 w-full rounded-xl border-2 border-line bg-white px-3 text-sm text-ink focus:border-accent-blue focus:outline-none"
                >
                  {LEVELS.map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label>Mavzu</Label>
                <Input
                  value={draft.topic}
                  onChange={(e) => setDraft({ ...draft, topic: e.target.value })}
                  placeholder="Tanishuv"
                  list="vocab-topics"
                />
                <datalist id="vocab-topics">
                  {vocabularyTopics.map((t) => (
                    <option key={t} value={t} />
                  ))}
                </datalist>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Holat (sifat nazorati)</Label>
                <select
                  value={draft.status ?? "pending"}
                  onChange={(e) =>
                    setDraft({ ...draft, status: e.target.value as ContentStatus })
                  }
                  className="h-11 w-full rounded-xl border-2 border-line bg-white px-3 text-sm text-ink focus:border-accent-blue focus:outline-none"
                >
                  {Object.entries(STATUS_META).map(([value, meta]) => (
                    <option key={value} value={value}>
                      {meta.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label>Yozuv turi</Label>
                <select
                  value={draft.entryType ?? "lemma"}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      entryType: e.target.value as VocabularyItem["entryType"],
                    })
                  }
                  className="h-11 w-full rounded-xl border-2 border-line bg-white px-3 text-sm text-ink focus:border-accent-blue focus:outline-none"
                >
                  <option value="lemma">Lemma</option>
                  <option value="expression">Ibora</option>
                  <option value="collocation">Birikma</option>
                  <option value="form">Shakl</option>
                </select>
              </div>
            </div>
            <div>
              <Label>Kategoriyalar (vergul bilan, 40 tadan)</Label>
              <Input
                value={(draft.categories ?? []).join(", ")}
                onChange={(e) =>
                  setDraft({
                    ...draft,
                    categories: e.target.value
                      .split(/[,;\n]/)
                      .map((s) => s.trim())
                      .filter(Boolean),
                  })
                }
                placeholder="family, everyday"
                list="vocab-categories"
              />
              <datalist id="vocab-categories">
                {VOCAB_CATEGORIES.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.titleUz}
                  </option>
                ))}
              </datalist>
              {(draft.categories ?? []).length > 0 && (
                <p className="mt-1 text-[11px] text-ink-faint">
                  {(draft.categories ?? []).map((c) => categoryTitleUz(c)).join(" · ")}
                </p>
              )}
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <Label>Jinsi</Label>
                <select
                  value={draft.gender ?? ""}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      gender: (e.target.value || null) as VocabularyItem["gender"],
                    })
                  }
                  className="h-11 w-full rounded-xl border-2 border-line bg-white px-3 text-sm text-ink focus:border-accent-blue focus:outline-none"
                >
                  <option value="">—</option>
                  <option value="m">Mujskoy</option>
                  <option value="f">Jenskiy</option>
                  <option value="n">Sredniy</option>
                </select>
              </div>
              <div>
                <Label>Ko‘plik</Label>
                <Input
                  value={draft.plural ?? ""}
                  onChange={(e) => setDraft({ ...draft, plural: e.target.value })}
                  placeholder="книги"
                />
              </div>
              <div>
                <Label>Chastota (#)</Label>
                <Input
                  type="number"
                  min={1}
                  value={draft.frequencyRank ?? ""}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      frequencyRank: e.target.value
                        ? Math.max(1, Number(e.target.value))
                        : null,
                    })
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Sinonimlar</Label>
                <Input
                  value={(draft.synonyms ?? []).join(", ")}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      synonyms: e.target.value
                        .split(/[,;\n]/)
                        .map((s) => s.trim())
                        .filter(Boolean),
                    })
                  }
                />
              </div>
              <div>
                <Label>Antonimlar</Label>
                <Input
                  value={(draft.antonyms ?? []).join(", ")}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      antonyms: e.target.value
                        .split(/[,;\n]/)
                        .map((s) => s.trim())
                        .filter(Boolean),
                    })
                  }
                />
              </div>
            </div>
            <div>
              <Label>Namuna (ruscha)</Label>
              <Textarea
                rows={2}
                value={draft.exampleRu}
                onChange={(e) => setDraft({ ...draft, exampleRu: e.target.value })}
                placeholder="Это моя книга."
              />
            </div>
            <div>
              <Label>Namuna (o‘zbekcha)</Label>
              <Textarea
                rows={2}
                value={draft.exampleUz}
                onChange={(e) => setDraft({ ...draft, exampleUz: e.target.value })}
                placeholder="Bu mening kitobim."
              />
            </div>
            <div className="flex gap-3 pt-1">
              <Button
                variant="secondary"
                className="flex-1"
                onClick={() => setDraft(null)}
              >
                Bekor qilish
              </Button>
              <Button className="flex-1" disabled={busy} onClick={() => void save()}>
                {busy ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
                Saqlash
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
