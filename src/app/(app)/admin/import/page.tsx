"use client";

import { useMemo, useRef, useState } from "react";
import {
  Upload,
  FileSpreadsheet,
  FileJson,
  Download,
  Play,
  RotateCcw,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  Loader2,
  ChevronDown,
  ClipboardList,
  X,
} from "lucide-react";
import { useStoreData } from "@/hooks/use-store-data";
import { Card, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/toast";
import { getStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import {
  normalizeImportRow,
  parseCsv,
  vocabularyToCsv,
  VOCAB_IMPORT_HEADER,
  VOCAB_IMPORT_SAMPLE_CSV,
  VOCAB_IMPORT_SAMPLE_JSON,
  VOCAB_IMPORT_TEMPLATE_JSON,
} from "@/lib/content-import";
import type { AppStore } from "@/lib/store";
import type { ContentStatus, ImportJob, ImportRowError } from "@/types";

type Format = "csv" | "json";

interface ParsedFile {
  name: string;
  format: Format;
  rows: unknown[];
  errors: ImportRowError[];
}

interface RunState {
  jobId: string | null;
  processed: number;
  total: number;
  imported: number;
  updated: number;
  duplicates: number;
  errors: ImportRowError[];
  active: boolean;
}

const EMPTY_RUN: RunState = {
  jobId: null,
  processed: 0,
  total: 0,
  imported: 0,
  updated: 0,
  duplicates: 0,
  errors: [],
  active: false,
};

const STATUS_OPTIONS: { value: ContentStatus; label: string }[] = [
  { value: "pending", label: "Kutilmoqda (tavsiya etiladi)" },
  { value: "draft", label: "Qoralama" },
  { value: "verified", label: "Tekshirilgan" },
  { value: "published", label: "Nashr etilgan" },
];

function download(filename: string, content: string, mime = "text/csv;charset=utf-8") {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function errorsToCsv(errors: ImportRowError[]): string {
  const esc = (s: string) => (/[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s);
  return [
    "row,message,raw",
    ...errors.map((e) => [e.row, e.message, e.raw ?? ""].map((x) => esc(String(x))).join(",")),
  ].join("\n");
}

export default function AdminImportPage() {
  const { toast } = useToast();
  const [parsed, setParsed] = useState<ParsedFile | null>(null);
  const [defaultStatus, setDefaultStatus] = useState<ContentStatus>("pending");
  const [batchSize, setBatchSize] = useState(100);
  const [run, setRun] = useState<RunState>(EMPTY_RUN);
  const [showErrors, setShowErrors] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  const [jobErrors, setJobErrors] = useState<Record<string, ImportRowError[]>>({});
  const cancelRef = useRef(false);

  const { data: jobs, loading: jobsLoading, reload: reloadJobs } = useStoreData<ImportJob[]>(
    async (store: AppStore) => store.getImportJobs(),
    [],
  );

  const validation = useMemo(() => {
    if (!parsed) return { valid: [] as unknown[], errors: [] as ImportRowError[] };
    const valid: unknown[] = [];
    const errors: ImportRowError[] = [...parsed.errors];
    parsed.rows.forEach((row, i) => {
      const res = normalizeImportRow(row, i + 2, defaultStatus);
      if (res.error) errors.push(res.error);
      else valid.push(row);
    });
    return { valid, errors };
  }, [parsed, defaultStatus]);

  const progressPct =
    run.total > 0 ? Math.round((run.processed / run.total) * 100) : 0;

  async function handleFile(file: File) {
    const name = file.name;
    const format: Format = name.toLowerCase().endsWith(".json") ? "json" : "csv";
    try {
      const text = await file.text();
      if (format === "csv") {
        const { rows, errors } = parseCsv(text);
        setParsed({ name, format, rows, errors });
        toast(`${rows.length} qator o‘qildi`, "success");
      } else {
        const raw = JSON.parse(text) as unknown;
        const rows = Array.isArray(raw)
          ? raw
          : Array.isArray((raw as { rows?: unknown[] }).rows)
            ? ((raw as { rows: unknown[] }).rows)
            : Array.isArray((raw as { items?: unknown[] }).items)
              ? ((raw as { items: unknown[] }).items)
              : null;
        if (!rows) {
          toast("JSON massiv yoki { rows: [...] } bo‘lishi kerak", "error");
          return;
        }
        setParsed({ name, format, rows, errors: [] });
        toast(`${rows.length} obyekt o‘qildi`, "success");
      }
      setRun(EMPTY_RUN);
    } catch (e) {
      toast(e instanceof Error ? e.message : "Faylni o‘qib bo‘lmadi", "error");
    }
  }

  async function runImport(rows: unknown[], resumeJobId?: string) {
    if (rows.length === 0 || run.active) return;
    cancelRef.current = false;
    const total = resumeJobId
      ? Math.max(
          jobs?.find((j) => j.id === resumeJobId)?.totalRows ?? rows.length,
          rows.length,
        )
      : rows.length;
    let jobId = resumeJobId ?? null;
    let processed = 0;
    let imported = 0;
    let updated = 0;
    let duplicates = 0;
    const errors: ImportRowError[] = [];

    setRun({ ...EMPTY_RUN, active: true, total, jobId });
    setShowErrors(false);

    try {
      for (let i = 0; i < rows.length; i += batchSize) {
        if (cancelRef.current) break;
        const batch = rows.slice(i, i + batchSize);
        const res = await getStore().importVocabularyBatch({
          jobId: jobId ?? undefined,
          fileName: parsed?.name ?? "import",
          format: parsed?.format ?? "csv",
          rows: batch,
          batchIndex: Math.floor(i / batchSize),
          totalRows: total,
          defaultStatus,
        });
        jobId = res.job.id;
        try {
          localStorage.setItem(`rusgo:import:${jobId}`, JSON.stringify(rows));
        } catch {
          /* saqlash imkoni bo'lmasa — davom etamiz */
        }
        processed += batch.length;
        imported += res.imported;
        updated += res.updated;
        duplicates += res.duplicates;
        errors.push(...res.errors);
        setRun({
          jobId,
          processed,
          total,
          imported,
          updated,
          duplicates,
          errors: [...errors],
          active: true,
        });
      }
      const cancelled = cancelRef.current;
      toast(
        cancelled
          ? `To‘xtatildi: ${processed}/${total} qator qayta ishlandi`
          : `Import tugadi: ${imported} yangi, ${updated} yangilandi, ${duplicates} dublikat`,
        cancelled ? "error" : "success",
      );
      reloadJobs();
    } catch (e) {
      toast(e instanceof Error ? e.message : "Importda xatolik", "error");
    } finally {
      setRun((r) => ({ ...r, active: false }));
      setShowErrors(true);
    }
  }

  async function resumeJob(job: ImportJob) {
    const saved = localStorage.getItem(`rusgo:import:${job.id}`);
    if (!saved) {
      toast("Bu ish uchun saqlangan qatorlar topilmadi", "error");
      return;
    }
    try {
      const rows = JSON.parse(saved) as unknown[];
      await runImport(rows, job.id);
    } catch {
      toast("Saqlangan qatorlarni o‘qib bo‘lmadi", "error");
    }
  }

  async function toggleJobErrors(job: ImportJob) {
    if (expandedJob === job.id) {
      setExpandedJob(null);
      return;
    }
    setExpandedJob(job.id);
    if (!jobErrors[job.id]) {
      try {
        const errs = await getStore().getImportErrors(job.id);
        setJobErrors((m) => ({ ...m, [job.id]: errs }));
      } catch {
        setJobErrors((m) => ({ ...m, [job.id]: [] }));
      }
    }
  }

  async function removeJob(job: ImportJob) {
    await getStore().deleteImportJob(job.id);
    localStorage.removeItem(`rusgo:import:${job.id}`);
    toast("Import ishi o‘chirildi", "success");
    reloadJobs();
  }

  async function exportData(format: "csv" | "json") {
    setExporting(true);
    try {
      const items = await getStore().exportVocabulary({ sort: "frequency" });
      if (items.length === 0) {
        toast("Eksport uchun yozuv yo‘q", "error");
        return;
      }
      if (format === "csv") {
        download(`rusgo-vocabulary-${Date.now()}.csv`, vocabularyToCsv(items));
      } else {
        download(
          `rusgo-vocabulary-${Date.now()}.json`,
          JSON.stringify(items, null, 2),
          "application/json",
        );
      }
      toast(`${items.length} yozuv eksport qilindi`, "success");
    } catch (e) {
      toast(e instanceof Error ? e.message : "Eksportda xatolik", "error");
    } finally {
      setExporting(false);
    }
  }

  return (
    <div className="space-y-4">
      <Card className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Upload size={18} className="text-primary" /> Ommaviy import
          </CardTitle>
          <p className="mt-1 text-sm text-ink-soft">
            CSV yoki JSON orqali lug‘atni bo‘laklab yuklang. Har bir qator tekshiriladi,
            dublikatlar aniqlanadi va xatolar alohida saqlanadi.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            className="h-9 rounded-full px-3 text-xs"
            onClick={() => download("rusgo-vocabulary-template.csv", VOCAB_IMPORT_SAMPLE_CSV)}
          >
            <Download size={14} /> CSV shablon
          </Button>
          <Button
            variant="secondary"
            className="h-9 rounded-full px-3 text-xs"
            onClick={() =>
              download(
                "rusgo-vocabulary-template.json",
                VOCAB_IMPORT_SAMPLE_JSON,
                "application/json",
              )
            }
          >
            <Download size={14} /> JSON shablon
          </Button>
        </div>
      </Card>

      {/* 1. Fayl tanlash */}
      {!parsed ? (
        <Card className="p-6">
          <label className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-line bg-surface px-6 py-12 text-center transition-colors hover:border-primary hover:bg-primary-soft/40">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm">
              <Upload size={24} className="text-primary" />
            </span>
            <span className="text-base font-extrabold text-ink">
              CSV yoki JSON faylni tanlang
            </span>
            <span className="max-w-md text-xs text-ink-soft">
              Ustunlar: {VOCAB_IMPORT_HEADER.join(", ")}. Majburiy: russianWord,
              uzbekTranslation. Fayl hajmi cheklanmagan — qatorlar 100 tadan bo‘lib
              yuboriladi.
            </span>
            <input
              type="file"
              accept=".csv,.json,text/csv,application/json"
              className="sr-only"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) void handleFile(file);
                e.target.value = "";
              }}
            />
          </label>
        </Card>
      ) : (
        <Card className="space-y-4 p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
                {parsed.format === "csv" ? (
                  <FileSpreadsheet size={18} />
                ) : (
                  <FileJson size={18} />
                )}
              </span>
              <div>
                <p className="text-sm font-extrabold text-ink">{parsed.name}</p>
                <p className="text-xs text-ink-soft">
                  {parsed.rows.length} qator · {parsed.format.toUpperCase()}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge tone="green">
                <CheckCircle2 size={12} /> {validation.valid.length} yaroqli
              </Badge>
              <Badge tone="red">
                <AlertTriangle size={12} /> {validation.errors.length} xato
              </Badge>
              <Button
                variant="ghost"
                className="h-8 rounded-full px-2 text-xs"
                onClick={() => {
                  setParsed(null);
                  setRun(EMPTY_RUN);
                }}
              >
                <X size={13} /> O‘zgartirish
              </Button>
            </div>
          </div>

          <div className="max-h-56 overflow-auto rounded-xl border border-line">
            <table className="w-full text-left text-xs">
              <thead className="sticky top-0 bg-surface-2 text-[11px] uppercase text-ink-soft">
                <tr>
                  <th className="px-2 py-1.5">#</th>
                  <th className="px-2 py-1.5">russianWord</th>
                  <th className="px-2 py-1.5">uzbekTranslation</th>
                  <th className="px-2 py-1.5">level</th>
                  <th className="px-2 py-1.5">partOfSpeech</th>
                </tr>
              </thead>
              <tbody>
                {parsed.rows.slice(0, 8).map((row, i) => {
                  const r = (row ?? {}) as Record<string, unknown>;
                  return (
                    <tr key={i} className="border-t border-line">
                      <td className="px-2 py-1.5 text-ink-faint">{i + 2}</td>
                      <td className="px-2 py-1.5 font-bold text-ink">
                        {String(r.russianWord ?? r.russian_word ?? r.ru ?? "—")}
                      </td>
                      <td className="px-2 py-1.5 text-ink-soft">
                        {String(
                          r.uzbekTranslation ?? r.uzbek_translation ?? r.uz ?? "—",
                        )}
                      </td>
                      <td className="px-2 py-1.5">{String(r.level ?? "A1")}</td>
                      <td className="px-2 py-1.5">
                        {String(r.partOfSpeech ?? r.part_of_speech ?? r.pos ?? "ot")}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <label className="block">
              <span className="mb-1 block text-[11px] font-extrabold uppercase tracking-wide text-ink-faint">
                Boshlang‘ich holat
              </span>
              <select
                value={defaultStatus}
                onChange={(e) => setDefaultStatus(e.target.value as ContentStatus)}
                className="w-full rounded-lg border border-line bg-white px-2.5 py-2 text-xs font-bold"
              >
                {STATUS_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-1 block text-[11px] font-extrabold uppercase tracking-wide text-ink-faint">
                Bo‘lak hajmi
              </span>
              <select
                value={batchSize}
                onChange={(e) => setBatchSize(Number(e.target.value))}
                className="w-full rounded-lg border border-line bg-white px-2.5 py-2 text-xs font-bold"
              >
                {[25, 50, 100, 250, 500].map((n) => (
                  <option key={n} value={n}>
                    {n} qator
                  </option>
                ))}
              </select>
            </label>
            <div className="flex items-end gap-2">
              <Button
                className="h-10 flex-1"
                disabled={run.active || validation.valid.length === 0}
                onClick={() => runImport(parsed.rows)}
              >
                {run.active ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Play size={16} />
                )}
                Importni boshlash
              </Button>
              {run.active && (
                <Button
                  variant="danger"
                  className="h-10"
                  onClick={() => {
                    cancelRef.current = true;
                  }}
                >
                  To‘xtatish
                </Button>
              )}
            </div>
          </div>

          <p className="text-[11px] text-ink-faint">
            «Kutilmoqda» holatidagi yozuvlar o‘quvchilarga ko‘rinmaydi — ular sifat
            nazorati bo‘limida tasdiqlanishi kerak. Dublikatlar ruscha so‘z + so‘z
            turkumi bo‘yicha aniqlanadi; tekshirilgan yozuvlar avtomatik
            o‘zgartirilmaydi.
          </p>
        </Card>
      )}

      {/* 2. Progress */}
      {run.total > 0 && (
        <Card className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <CardTitle className="flex items-center gap-2 text-base">
              {run.active ? (
                <Loader2 size={16} className="animate-spin text-primary" />
              ) : (
                <CheckCircle2 size={16} className="text-primary" />
              )}
              {run.active ? "Import davom etmoqda…" : "Import natijasi"}
            </CardTitle>
            <span className="text-xs font-extrabold text-ink-soft">
              {run.processed}/{run.total} · {progressPct}%
            </span>
          </div>
          <Progress value={progressPct} ariaLabel="Import progressi" striped={run.active} />
          <div className="flex flex-wrap gap-2 text-xs">
            <Badge tone="green">{run.imported} yangi</Badge>
            <Badge tone="blue">{run.updated} yangilandi</Badge>
            <Badge tone="yellow">{run.duplicates} dublikat</Badge>
            <Badge tone="red">{run.errors.length} xato</Badge>
            {run.jobId && (
              <span className="text-ink-faint">Job: {run.jobId.slice(0, 8)}…</span>
            )}
          </div>
          {run.errors.length > 0 && (
            <div>
              <button
                type="button"
                onClick={() => setShowErrors((v) => !v)}
                className="inline-flex items-center gap-1 text-xs font-extrabold text-ink-soft hover:text-ink"
              >
                <ChevronDown
                  size={14}
                  className={cn("transition-transform", showErrors && "rotate-180")}
                />
                Xatolarni ko‘rish
              </button>
              {showErrors && (
                <div className="mt-2 max-h-48 overflow-auto rounded-xl border border-line">
                  <table className="w-full text-left text-[11px]">
                    <thead className="bg-surface-2 text-ink-soft">
                      <tr>
                        <th className="px-2 py-1">Qator</th>
                        <th className="px-2 py-1">Xato</th>
                      </tr>
                    </thead>
                    <tbody>
                      {run.errors.slice(0, 100).map((e, i) => (
                        <tr key={i} className="border-t border-line">
                          <td className="px-2 py-1 font-bold">{e.row}</td>
                          <td className="px-2 py-1 text-ink-soft">{e.message}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              <Button
                variant="secondary"
                className="mt-2 h-8 rounded-full px-3 text-[11px]"
                onClick={() => download("import-errors.csv", errorsToCsv(run.errors))}
              >
                <Download size={13} /> Xatolarni CSV yuklab olish
              </Button>
            </div>
          )}
        </Card>
      )}

      {/* 3. Import ishlari */}
      <Card className="space-y-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base">
            <ClipboardList size={16} className="text-primary" /> Import tarixi
          </CardTitle>
          <Button
            variant="ghost"
            className="h-8 rounded-full px-3 text-xs"
            onClick={reloadJobs}
          >
            <RotateCcw size={13} /> Yangilash
          </Button>
        </div>

        {jobsLoading && !jobs ? (
          <Skeleton className="h-20 w-full" />
        ) : (jobs?.length ?? 0) === 0 ? (
          <p className="py-6 text-center text-sm text-ink-soft">
            Hozircha import ishlari yo‘q.
          </p>
        ) : (
          <div className="space-y-2">
            {jobs!.map((job) => {
              const pct =
                job.totalRows > 0
                  ? Math.round((job.processedRows / job.totalRows) * 100)
                  : 0;
              const canResume =
                job.status === "running" &&
                typeof window !== "undefined" &&
                Boolean(localStorage.getItem(`rusgo:import:${job.id}`));
              const errs = jobErrors[job.id];
              return (
                <div key={job.id} className="rounded-xl border border-line p-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-extrabold text-ink">
                        {job.fileName || "Import"} · {job.format.toUpperCase()}
                      </p>
                      <p className="text-[11px] text-ink-faint">
                        {new Date(job.createdAt).toLocaleString("uz-UZ")} ·{" "}
                        {job.processedRows}/{job.totalRows} qator · {job.imported} yangi ·{" "}
                        {job.updated} yangilandi · {job.duplicates} dublikat ·{" "}
                        {job.failed} xato
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5">
                      <Badge
                        tone={
                          job.status === "completed"
                            ? "green"
                            : job.status === "running"
                              ? "blue"
                              : job.status === "partial"
                                ? "yellow"
                                : "red"
                        }
                      >
                        {job.status === "completed"
                          ? "Tugadi"
                          : job.status === "running"
                            ? "Davom etmoqda"
                            : job.status === "partial"
                              ? "Qisman"
                              : job.status === "queued"
                                ? "Navbatda"
                                : "Xato"}
                      </Badge>
                      <Button
                        variant="secondary"
                        className="h-8 rounded-full px-2.5 text-[11px]"
                        onClick={() => toggleJobErrors(job)}
                      >
                        Xatolar
                      </Button>
                      {canResume && (
                        <Button
                          className="h-8 rounded-full px-2.5 text-[11px]"
                          onClick={() => resumeJob(job)}
                        >
                          <Play size={12} /> Davom etish
                        </Button>
                      )}
                      {job.failed > 0 && (
                        <Button
                          variant="secondary"
                          className="h-8 rounded-full px-2.5 text-[11px]"
                          onClick={() =>
                            download(
                              `import-errors-${job.id.slice(0, 8)}.csv`,
                              errorsToCsv(errs ?? []),
                            )
                          }
                          disabled={!errs || errs.length === 0}
                        >
                          <Download size={12} /> CSV
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        className="h-8 rounded-full px-2 text-[11px]"
                        onClick={() => removeJob(job)}
                        aria-label="Import ishini o‘chirish"
                      >
                        <Trash2 size={13} />
                      </Button>
                    </div>
                  </div>
                  <div className="mt-2">
                    <Progress value={pct} height="h-1.5" ariaLabel="Import holati" />
                  </div>
                  {expandedJob === job.id && (
                    <div className="mt-2 max-h-40 overflow-auto rounded-lg border border-line">
                      {!errs ? (
                        <p className="p-2 text-[11px] text-ink-faint">Yuklanmoqda…</p>
                      ) : errs.length === 0 ? (
                        <p className="p-2 text-[11px] text-ink-faint">Xatolar yo‘q.</p>
                      ) : (
                        <table className="w-full text-left text-[11px]">
                          <thead className="bg-surface-2 text-ink-soft">
                            <tr>
                              <th className="px-2 py-1">Qator</th>
                              <th className="px-2 py-1">Xato</th>
                            </tr>
                          </thead>
                          <tbody>
                            {errs.slice(0, 200).map((e, i) => (
                              <tr key={i} className="border-t border-line">
                                <td className="px-2 py-1 font-bold">{e.row}</td>
                                <td className="px-2 py-1 text-ink-soft">{e.message}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </Card>

      {/* 4. Eksport */}
      <Card className="space-y-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Download size={16} className="text-primary" /> Eksport
        </CardTitle>
        <p className="text-xs text-ink-soft">
          Tekshirilgan va nashr etilgan lug‘atni CSV yoki JSON formatida yuklab oling.
          Katta bazalar uchun server tomonda filtrlangan eksport RPC ishlatiladi.
        </p>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="secondary"
            disabled={exporting}
            onClick={() => exportData("csv")}
          >
            {exporting ? <Loader2 size={15} className="animate-spin" /> : <Download size={15} />}
            CSV eksport
          </Button>
          <Button
            variant="secondary"
            disabled={exporting}
            onClick={() => exportData("json")}
          >
            <FileJson size={15} /> JSON eksport
          </Button>
          <Button
            variant="ghost"
            onClick={() =>
              download(
                "rusgo-vocabulary-template.json",
                VOCAB_IMPORT_TEMPLATE_JSON,
                "application/json",
              )
            }
          >
            <Download size={15} /> Bo‘sh shablon
          </Button>
        </div>
      </Card>
    </div>
  );
}
