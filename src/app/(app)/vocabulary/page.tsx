"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Volume2,
  Heart,
  CheckCircle2,
  BookOpen,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  X,
  Loader2,
  Filter,
} from "lucide-react";
import { useStoreData } from "@/hooks/use-store-data";
import { useSpeech } from "@/hooks/use-speech";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ListSkeleton } from "@/components/ui/skeleton";
import { categoryTitleUz, LEVEL_META } from "@/data/vocabulary/categories";
import { cn } from "@/lib/utils";
import { getStore } from "@/lib/store";
import { useToast } from "@/components/ui/toast";
import type { AppStore, VocabularyFacets } from "@/lib/store";
import type {
  Level,
  UserVocabState,
  VocabEntryType,
  VocabularyItem,
  VocabularySearchResult,
} from "@/types";

interface VocabData {
  result: VocabularySearchResult;
  states: Record<string, UserVocabState>;
  facets: VocabularyFacets;
}

const PAGE_SIZE_OPTIONS = [24, 48, 96];
const LEVEL_OPTIONS: (Level | "all")[] = ["all", "A1", "A2", "B1", "B2", "C1", "C2"];

function Highlight({ text, query }: { text: string; query: string }) {
  const q = query.trim();
  if (!q) return <>{text}</>;
  const lower = text.toLowerCase();
  const idx = lower.indexOf(q.toLowerCase());
  if (idx < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="rounded bg-accent-yellow-soft px-0.5 text-ink">
        {text.slice(idx, idx + q.length)}
      </mark>
      {text.slice(idx + q.length)}
    </>
  );
}

export default function VocabularyPage() {
  const { toast } = useToast();
  const { speak, speaking, ttsSupported } = useSpeech();

  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState<Level | "all">("all");
  const [category, setCategory] = useState("all");
  const [partOfSpeech, setPartOfSpeech] = useState("all");
  const [entryType, setEntryType] = useState<VocabEntryType | "all">("all");
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [onlyLearned, setOnlyLearned] = useState(false);
  const [sort, setSort] = useState<"frequency" | "alphabet" | "level" | "recent">(
    "frequency",
  );
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(24);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showFilters, setShowFilters] = useState(true);

  // Debounced qidiruv
  useEffect(() => {
    const t = setTimeout(() => {
      setQuery(searchInput);
      setPage(1);
    }, 300);
    return () => clearTimeout(t);
  }, [searchInput]);

  // Avtoto'ldirish
  useEffect(() => {
    if (searchInput.trim().length < 2) {
      setSuggestions([]);
      return;
    }
    let cancelled = false;
    const t = setTimeout(async () => {
      try {
        const items = await getStore().getVocabularySuggestions(searchInput, 8);
        if (!cancelled) setSuggestions(items);
      } catch {
        if (!cancelled) setSuggestions([]);
      }
    }, 200);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [searchInput]);

  const { data, loading, error, reload } = useStoreData<VocabData>(
    async (store: AppStore) => {
      const [result, userStates, facets] = await Promise.all([
        store.searchVocabulary({
          query,
          level,
          category,
          partOfSpeech,
          entryType,
          onlyFavorites,
          onlyLearned,
          sort,
          page,
          pageSize,
        }),
        store.getUserVocabulary(),
        store.getVocabularyFacets(),
      ]);
      const map: Record<string, UserVocabState> = {};
      for (const s of userStates) map[s.vocabularyId] = s;
      return { result, states: map, facets };
    },
    [
      query,
      level,
      category,
      partOfSpeech,
      entryType,
      onlyFavorites,
      onlyLearned,
      sort,
      page,
      pageSize,
    ],
  );

  const totalPages = data ? Math.max(1, Math.ceil(data.result.total / data.result.pageSize)) : 1;

  const learnedCount = useMemo(
    () => (data ? Object.values(data.states).filter((s) => s.isLearned).length : 0),
    [data],
  );

  const activeFilters =
    (level !== "all" ? 1 : 0) +
    (category !== "all" ? 1 : 0) +
    (partOfSpeech !== "all" ? 1 : 0) +
    (entryType !== "all" ? 1 : 0) +
    (onlyFavorites ? 1 : 0) +
    (onlyLearned ? 1 : 0);

  function resetFilters() {
    setLevel("all");
    setCategory("all");
    setPartOfSpeech("all");
    setEntryType("all");
    setOnlyFavorites(false);
    setOnlyLearned(false);
    setSort("frequency");
    setPage(1);
  }

  async function toggleFavorite(v: VocabularyItem) {
    const cur = data?.states[v.id]?.isFavorite ?? false;
    setBusyId(v.id);
    try {
      await getStore().setVocabularyFavorite(v.id, !cur);
      reload();
    } catch {
      toast("Saqlashda xatolik", "error");
    } finally {
      setBusyId(null);
    }
  }

  async function toggleLearned(v: VocabularyItem) {
    const cur = data?.states[v.id]?.isLearned ?? false;
    setBusyId(v.id);
    try {
      await getStore().setVocabularyLearned(v.id, !cur);
      toast(
        !cur ? `«${v.russianWord}» o‘rganildi deb belgilandi` : "Belgi olib tashlandi",
        "success",
      );
      reload();
    } catch {
      toast("Saqlashda xatolik", "error");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">Lug‘at</h1>
          <p className="mt-1 text-sm text-ink-soft">
            Ruscha–o‘zbekcha izohli lug‘at: qidiruv, filtrlar va shaxsiy takrorlash.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-ink-soft">
          <Badge tone="green">
            <BookOpen size={12} className="mr-1" /> {data?.result.total ?? 0} ta yozuv
          </Badge>
          <Badge tone="blue">
            <CheckCircle2 size={12} className="mr-1" /> {learnedCount} o‘rganilgan
          </Badge>
        </div>
      </div>

      {/* Qidiruv */}
      <Card className="p-4">
        <div className="relative">
          <div className="flex items-center gap-2 rounded-xl border border-line bg-surface px-3">
            <Search size={18} className="shrink-0 text-ink-soft" />
            <Input
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
              placeholder="Ruscha, o‘zbekcha yoki transliteratsiya bo‘yicha qidiring…"
              className="h-11 border-0 bg-transparent px-0 focus:ring-0"
              aria-label="Lug‘atdan qidirish"
            />
            {searchInput && (
              <button
                type="button"
                onClick={() => setSearchInput("")}
                className="rounded-full p-1 text-ink-faint hover:bg-surface-2"
                aria-label="Qidiruvni tozalash"
              >
                <X size={15} />
              </button>
            )}
          </div>

          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute left-0 right-0 top-full z-30 mt-1 overflow-hidden rounded-xl border border-line bg-white shadow-lg">
              {suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    setSearchInput(s);
                    setShowSuggestions(false);
                  }}
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-surface"
                >
                  <Sparkles size={13} className="text-primary" />
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            onClick={() => setShowFilters((v) => !v)}
            className="h-9 rounded-full px-3 text-xs"
          >
            <Filter size={14} /> Filtrlar
            {activeFilters > 0 && (
              <span className="ml-1 rounded-full bg-primary px-1.5 text-[10px] font-extrabold text-white">
                {activeFilters}
              </span>
            )}
          </Button>
          <button
            type="button"
            onClick={() => {
              setOnlyFavorites((v) => !v);
              setPage(1);
            }}
            className={cn(
              "inline-flex h-9 items-center gap-1.5 rounded-full border px-3 text-xs font-bold transition-colors",
              onlyFavorites
                ? "border-error bg-error-soft text-error"
                : "border-line bg-white text-ink-soft hover:bg-surface",
            )}
          >
            <Heart size={14} className={onlyFavorites ? "fill-error" : ""} /> Sevimlilar
          </button>
          <button
            type="button"
            onClick={() => {
              setOnlyLearned((v) => !v);
              setPage(1);
            }}
            className={cn(
              "inline-flex h-9 items-center gap-1.5 rounded-full border px-3 text-xs font-bold transition-colors",
              onlyLearned
                ? "border-primary bg-primary-soft text-primary-ink"
                : "border-line bg-white text-ink-soft hover:bg-surface",
            )}
          >
            <CheckCircle2 size={14} /> O‘rganilgan
          </button>
          {activeFilters > 0 && (
            <button
              type="button"
              onClick={resetFilters}
              className="text-xs font-bold text-ink-faint hover:text-ink"
            >
              Tozalash
            </button>
          )}
          <span className="ml-auto text-xs font-bold text-ink-soft">
            {loading ? "Qidirilmoqda…" : `${data?.result.total ?? 0} natija`}
          </span>
        </div>

        {showFilters && (
          <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
            <FilterSelect
              label="Daraja"
              value={level}
              onChange={(v) => {
                setLevel(v as Level | "all");
                setPage(1);
              }}
              options={LEVEL_OPTIONS.map((l) => ({
                value: l,
                label: l === "all" ? "Barcha darajalar" : l,
              }))}
            />
            <FilterSelect
              label="Kategoriya"
              value={category}
              onChange={(v) => {
                setCategory(v);
                setPage(1);
              }}
              options={[
                { value: "all", label: "Barcha kategoriyalar" },
                ...(data?.facets.categories ?? []).map((c) => ({
                  value: c.slug,
                  label: `${c.titleUz} (${c.count})`,
                })),
              ]}
            />
            <FilterSelect
              label="So‘z turkumi"
              value={partOfSpeech}
              onChange={(v) => {
                setPartOfSpeech(v);
                setPage(1);
              }}
              options={[
                { value: "all", label: "Barcha turlar" },
                ...(data?.facets.partsOfSpeech ?? []).map((p) => ({
                  value: p.value,
                  label: `${p.value} (${p.count})`,
                })),
              ]}
            />
            <FilterSelect
              label="Yozuv turi"
              value={entryType}
              onChange={(v) => {
                setEntryType(v as VocabEntryType | "all");
                setPage(1);
              }}
              options={[
                { value: "all", label: "Barcha turlar" },
                { value: "lemma", label: "Lemma" },
                { value: "expression", label: "Ibora" },
                { value: "collocation", label: "Birikma" },
                { value: "form", label: "Shakl" },
              ]}
            />
            <FilterSelect
              label="Tartiblash"
              value={sort}
              onChange={(v) => {
                setSort(v as typeof sort);
                setPage(1);
              }}
              options={[
                { value: "frequency", label: "Chastota bo‘yicha" },
                { value: "alphabet", label: "Alifbo bo‘yicha" },
                { value: "level", label: "Daraja bo‘yicha" },
                { value: "recent", label: "Yangi qo‘shilgan" },
              ]}
            />
          </div>
        )}
      </Card>

      {error && (
        <Card className="border-error bg-error-soft p-4 text-sm font-bold text-error">
          {error}
        </Card>
      )}

      {loading && !data ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <ListSkeleton count={6} />
        </div>
      ) : (data?.result.items.length ?? 0) === 0 ? (
        <Card className="p-10 text-center">
          <Search size={30} className="mx-auto text-ink-faint" />
          <p className="mt-3 text-base font-extrabold text-ink">So‘z topilmadi</p>
          <p className="mt-1 text-sm text-ink-soft">
            Qidiruvni o‘zgartiring yoki filtrlarni tozalang.
          </p>
          {activeFilters > 0 && (
            <Button variant="secondary" onClick={resetFilters} className="mt-4">
              Filtrlarni tozalash
            </Button>
          )}
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {data?.result.items.map((v) => {
            const state = data.states[v.id];
            const isFavorite = state?.isFavorite ?? false;
            const isLearned = state?.isLearned ?? false;
            const expanded = expandedId === v.id;
            return (
              <Card key={v.id} className="flex flex-col p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h3 className="truncate text-lg font-extrabold text-ink">
                        <Highlight text={v.russianWord} query={query} />
                      </h3>
                      <button
                        type="button"
                        onClick={() => speak(v.russianWord)}
                        disabled={!ttsSupported}
                        className={cn(
                          "rounded-full p-1.5 text-accent-blue transition-colors hover:bg-accent-blue-soft disabled:opacity-40",
                          speaking && "animate-pulse",
                        )}
                        aria-label={`${v.russianWord} talaffuzini eshitish`}
                        title={ttsSupported ? "Talaffuzni eshitish" : "TTS mavjud emas"}
                      >
                        <Volume2 size={16} />
                      </button>
                    </div>
                    <p className="text-xs font-semibold text-ink-faint">
                      <Highlight text={v.transliteration} query={query} />
                      {v.partOfSpeech ? ` · ${v.partOfSpeech}` : ""}
                    </p>
                  </div>
                  <span
                    className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-extrabold text-white"
                    style={{ backgroundColor: LEVEL_META[v.level].color }}
                  >
                    {v.level}
                  </span>
                </div>

                <p className="mt-2 text-base font-extrabold text-primary-ink">
                  <Highlight text={v.uzbekTranslation} query={query} />
                </p>

                <div className="mt-2 flex flex-wrap gap-1">
                  {(v.categories ?? []).slice(0, 3).map((c) => (
                    <span
                      key={c}
                      className="rounded-full bg-surface-2 px-2 py-0.5 text-[10px] font-bold text-ink-soft"
                    >
                      {categoryTitleUz(c)}
                    </span>
                  ))}
                  {v.entryType && v.entryType !== "lemma" && (
                    <span className="rounded-full bg-accent-blue-soft px-2 py-0.5 text-[10px] font-bold text-accent-blue">
                      {v.entryType === "expression"
                        ? "ibora"
                        : v.entryType === "collocation"
                          ? "birikma"
                          : "shakl"}
                    </span>
                  )}
                </div>

                {v.exampleRu && (
                  <div className="mt-3 rounded-xl bg-surface p-2.5">
                    <p className="text-sm font-semibold text-ink">{v.exampleRu}</p>
                    <p className="mt-0.5 text-xs text-ink-soft">{v.exampleUz}</p>
                  </div>
                )}

                <div className="mt-auto flex items-center gap-1 pt-3">
                  <button
                    type="button"
                    onClick={() => toggleFavorite(v)}
                    disabled={busyId === v.id}
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full px-2.5 py-1.5 text-xs font-bold transition-colors",
                      isFavorite
                        ? "bg-error-soft text-error"
                        : "text-ink-soft hover:bg-surface",
                    )}
                    aria-label={isFavorite ? "Sevimlilardan olib tashlash" : "Sevimlilarga qo‘shish"}
                  >
                    <Heart size={14} className={isFavorite ? "fill-error" : ""} />
                    {isFavorite ? "Sevimli" : "Saqlash"}
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleLearned(v)}
                    disabled={busyId === v.id}
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full px-2.5 py-1.5 text-xs font-bold transition-colors",
                      isLearned
                        ? "bg-primary-soft text-primary-ink"
                        : "text-ink-soft hover:bg-surface",
                    )}
                    aria-label={isLearned ? "O‘rganilgan belgisini olib tashlash" : "O‘rganildi deb belgilash"}
                  >
                    {busyId === v.id ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : (
                      <CheckCircle2 size={14} />
                    )}
                    {isLearned ? "O‘rganilgan" : "O‘rganildi"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setExpandedId(expanded ? null : v.id)}
                    className="ml-auto inline-flex items-center gap-1 rounded-full px-2 py-1.5 text-xs font-bold text-ink-soft hover:bg-surface"
                    aria-expanded={expanded}
                  >
                    Batafsil
                    <ChevronDown
                      size={14}
                      className={cn("transition-transform", expanded && "rotate-180")}
                    />
                  </button>
                </div>

                {expanded && (
                  <div className="mt-3 space-y-2 border-t border-line pt-3 text-xs text-ink-soft">
                    {(v.meanings ?? []).length > 1 && (
                      <div>
                        <span className="font-extrabold text-ink">Ma’nolari: </span>
                        {(v.meanings ?? []).map((m) => m.uz).join("; ")}
                      </div>
                    )}
                    {(v.examples ?? []).length > 1 && (
                      <div className="space-y-1">
                        <span className="font-extrabold text-ink">Misollar: </span>
                        {(v.examples ?? []).map((ex, i) => (
                          <p key={i}>
                            {ex.ru} — {ex.uz}
                          </p>
                        ))}
                      </div>
                    )}
                    {v.synonyms && v.synonyms.length > 0 && (
                      <p>
                        <span className="font-extrabold text-ink">Sinonimlar: </span>
                        {v.synonyms.join(", ")}
                      </p>
                    )}
                    {v.antonyms && v.antonyms.length > 0 && (
                      <p>
                        <span className="font-extrabold text-ink">Antonimlar: </span>
                        {v.antonyms.join(", ")}
                      </p>
                    )}
                    {v.forms && v.forms.length > 0 && (
                      <p>
                        <span className="font-extrabold text-ink">Shakllari: </span>
                        {v.forms.map((f) => `${f.form} (${f.label})`).join("; ")}
                      </p>
                    )}
                    {v.gender && (
                      <p>
                        <span className="font-extrabold text-ink">Jinsi: </span>
                        {v.gender === "m" ? "mujskoy" : v.gender === "f" ? "jenskiy" : "sredniy"}
                      </p>
                    )}
                    <p className="text-[11px] text-ink-faint">
                      Holat: {v.status ?? "verified"} · Manba: {v.source ?? "RusGo seed"}
                      {v.frequencyRank ? ` · Chastota: #${v.frequencyRank}` : ""}
                    </p>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {data && data.result.total > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line bg-white p-3">
          <div className="flex items-center gap-2 text-xs font-bold text-ink-soft">
            <span>
              {data.result.total} tadan{" "}
              {(page - 1) * pageSize + 1}–
              {Math.min(page * pageSize, data.result.total)} ko‘rsatilmoqda
            </span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPage(1);
              }}
              className="rounded-lg border border-line bg-white px-2 py-1 text-xs font-bold"
              aria-label="Sahifa hajmi"
            >
              {PAGE_SIZE_OPTIONS.map((n) => (
                <option key={n} value={n}>
                  {n} / sahifa
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="h-9 rounded-full px-2"
              aria-label="Oldingi sahifa"
            >
              <ChevronLeft size={16} />
            </Button>
            <span className="px-2 text-xs font-extrabold text-ink">
              {page} / {totalPages}
            </span>
            <Button
              variant="ghost"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="h-9 rounded-full px-2"
              aria-label="Keyingi sahifa"
            >
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      )}

      <p className="text-center text-[11px] text-ink-faint">
        Faqat tekshirilgan (verified) va nashr etilgan (published) yozuvlar ko‘rsatiladi.
        Katta hajmdagi lug‘at uchun server-side pagination va PostgreSQL full-text/trigram
        indekslari qo‘llanadi.
      </p>
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-[11px] font-extrabold uppercase tracking-wide text-ink-faint">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-line bg-white px-2.5 py-2 text-xs font-bold text-ink"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
