"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  ChevronDown,
  ChevronRight,
  HelpCircle,
  Loader2,
  Save,
  BookOpen,
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
import type { AppStore } from "@/lib/store";
import type { Lesson, Module, Question, QuestionType } from "@/types";

interface Data {
  modules: Module[];
  lessons: Lesson[];
}

const QUESTION_TYPES: QuestionType[] = [
  "multiple_choice",
  "translation",
  "word_matching",
  "sentence_building",
  "fill_blank",
  "listening",
  "true_false",
  "word_selection",
];

const emptyLesson = (moduleId: string, orderIndex: number): Lesson => ({
  id: uid("lesson"),
  moduleId,
  orderIndex,
  title: "",
  titleRu: "",
  description: "",
  xpReward: 15,
  estimatedMinutes: 5,
  level: "A1",
  objectives: [],
  grammarTopic: "",
  grammarExplanation: "",
  vocabularyIds: [],
  examples: [],
  readingTitle: "",
  readingText: "",
  listeningText: "",
  prerequisites: [],
  tags: [],
  completionCriteria: { minScore: 70 },
  status: "draft",
  published: false,
  source: "admin",
});

const LEVEL_OPTIONS = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;
const STATUS_OPTIONS = [
  { value: "draft", label: "Qoralama" },
  { value: "pending", label: "Tekshirish kutilmoqda" },
  { value: "verified", label: "Tekshirilgan" },
  { value: "published", label: "Nashr etilgan" },
  { value: "rejected", label: "Rad etilgan" },
] as const;

const STATUS_TONE: Record<
  string,
  "gray" | "yellow" | "green" | "blue" | "red"
> = {
  draft: "gray",
  pending: "yellow",
  verified: "green",
  published: "blue",
  rejected: "red",
};

function toLines(arr: string[] | undefined): string {
  return (arr ?? []).join("\n");
}

function fromLines(value: string): string[] {
  return value
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

function toCsvList(arr: string[] | undefined): string {
  return (arr ?? []).join(", ");
}

function fromCsvList(value: string): string[] {
  return value
    .split(/[,;\n]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export default function AdminLessonsPage() {
  const { toast } = useToast();
  const { data, loading, reload } = useStoreData<Data>(async (store: AppStore) => {
    const [modules, lessons] = await Promise.all([store.getModules(), store.getLessons()]);
    return { modules, lessons };
  }, []);

  const [openModule, setOpenModule] = useState<string | null>(null);
  const [lessonDraft, setLessonDraft] = useState<Lesson | null>(null);
  const [lessonOriginalId, setLessonOriginalId] = useState<string | null>(null);
  const [questionLessonId, setQuestionLessonId] = useState<string | null>(null);
  const [questionDraft, setQuestionDraft] = useState<Question | null>(null);
  const [questionOriginalId, setQuestionOriginalId] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionsTick, setQuestionsTick] = useState(0);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!openModule && data?.modules[0]) setOpenModule(data.modules[0].id);
  }, [data, openModule]);

  // Tanlangan darsning savollarini yuklash
  useEffect(() => {
    if (!questionLessonId) {
      setQuestions([]);
      return;
    }
    let cancelled = false;
    void getStore()
      .getQuestions(questionLessonId)
      .then((qs) => {
        if (!cancelled) setQuestions(qs);
      });
    return () => {
      cancelled = true;
    };
  }, [questionLessonId, questionsTick]);

  const lessonsByModule = useMemo(() => {
    const map = new Map<string, Lesson[]>();
    for (const l of data?.lessons ?? []) {
      const arr = map.get(l.moduleId) ?? [];
      arr.push(l);
      map.set(l.moduleId, arr);
    }
    for (const arr of map.values()) arr.sort((a, b) => a.orderIndex - b.orderIndex);
    return map;
  }, [data]);

  const saveLesson = useCallback(async () => {
    if (!lessonDraft) return;
    if (!lessonDraft.title.trim() || !lessonDraft.moduleId) {
      toast("Sarlavha va modul majburiy", "error");
      return;
    }
    setBusy(true);
    try {
      const err = await getStore().adminSaveLesson({
        ...lessonDraft,
        title: lessonDraft.title.trim(),
        titleRu: lessonDraft.titleRu.trim(),
        description: lessonDraft.description.trim(),
      });
      if (err) toast(err, "error");
      else {
        toast("Dars saqlandi", "success");
        setLessonDraft(null);
        setLessonOriginalId(null);
        reload();
      }
    } catch {
      toast("Saqlashda xatolik", "error");
    } finally {
      setBusy(false);
    }
  }, [lessonDraft, toast, reload]);

  const deleteLesson = useCallback(
    async (id: string) => {
      setBusy(true);
      try {
        const err = await getStore().adminDeleteLesson(id);
        if (err) toast(err, "error");
        else {
          toast("Dars o‘chirildi", "success");
          if (questionLessonId === id) setQuestionLessonId(null);
          reload();
        }
      } finally {
        setBusy(false);
      }
    },
    [toast, reload, questionLessonId],
  );

  const saveQuestion = useCallback(async () => {
    if (!questionDraft || !questionLessonId) return;
    setBusy(true);
    try {
      const err = await getStore().adminSaveQuestion({
        ...questionDraft,
        lessonId: questionLessonId,
        explanationUz: questionDraft.explanationUz.trim(),
      });
      if (err) toast(err, "error");
      else {
        toast("Savol saqlandi", "success");
        setQuestionDraft(null);
        setQuestionOriginalId(null);
        setQuestionsTick((t) => t + 1);
        reload();
      }
    } catch {
      toast("Saqlashda xatolik", "error");
    } finally {
      setBusy(false);
    }
  }, [questionDraft, questionLessonId, toast, reload]);

  const deleteQuestion = useCallback(
    async (id: string) => {
      setBusy(true);
      try {
        const err = await getStore().adminDeleteQuestion(id);
        if (err) toast(err, "error");
        else {
          toast("Savol o‘chirildi", "success");
          setQuestionsTick((t) => t + 1);
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
        <ListSkeleton count={3} />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <CardTitle className="flex items-center gap-2">
          <BookOpen size={16} className="text-primary" />
          {data.lessons.length} ta dars · {data.modules.length} ta modul
        </CardTitle>
        <Button
          size="sm"
          onClick={() => {
            setLessonOriginalId(null);
            setLessonDraft(emptyLesson(data.modules[0]?.id ?? "a1-m1", data.lessons.length + 1));
          }}
          disabled={data.modules.length === 0}
        >
          <Plus size={15} /> Yangi dars
        </Button>
      </div>

      {data.modules.map((m) => {
        const lessons = lessonsByModule.get(m.id) ?? [];
        const open = openModule === m.id;
        return (
          <Card key={m.id} className="p-0">
            <button
              type="button"
              onClick={() => setOpenModule(open ? null : m.id)}
              aria-expanded={open}
              className="flex w-full items-center gap-3 px-5 py-4 text-left"
            >
              {open ? (
                <ChevronDown size={17} className="text-ink-faint" />
              ) : (
                <ChevronRight size={17} className="text-ink-faint" />
              )}
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-extrabold text-ink">
                  {m.orderIndex}-modul · {m.title}
                </span>
                <span className="block truncate text-xs text-ink-soft">
                  {m.titleUz} — {lessons.length} ta dars
                </span>
              </span>
              <Badge tone={open ? "green" : "gray"}>{m.id}</Badge>
            </button>

            {open && (
              <div className="border-t border-line px-4 py-3">
                {lessons.length === 0 ? (
                  <p className="py-4 text-center text-sm text-ink-soft">
                    Bu modulda dars yo‘q.
                  </p>
                ) : (
                  <ul className="space-y-2">
                    {lessons.map((l) => (
                      <li key={l.id} className="rounded-xl bg-surface p-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm font-bold text-ink">
                              {l.orderIndex}. {l.title}
                            </span>
                            <span className="block truncate text-xs text-ink-soft">
                              {l.titleRu} · {l.xpReward} XP · {l.estimatedMinutes} daq
                            </span>
                          </span>
                          <Badge tone="blue" className="shrink-0">
                            {l.level ?? "A1"}
                          </Badge>
                          <Badge
                            tone={STATUS_TONE[l.status ?? "published"] ?? "gray"}
                            className="shrink-0"
                          >
                            {STATUS_OPTIONS.find((s) => s.value === (l.status ?? "published"))
                              ?.label ?? "Nashr etilgan"}
                          </Badge>
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() =>
                              setQuestionLessonId(questionLessonId === l.id ? null : l.id)
                            }
                          >
                            <HelpCircle size={14} /> Savollar
                          </Button>
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => {
                              setLessonOriginalId(l.id);
                              setLessonDraft({ ...l });
                            }}
                            aria-label={`${l.title} darsini tahrirlash`}
                            title="Tahrirlash"
                          >
                            <Pencil size={14} />
                          </Button>
                          <Button
                            size="sm"
                            variant="danger"
                            disabled={busy}
                            onClick={() => {
                              if (confirm(`«${l.title}» darsini o‘chirishni tasdiqlaysizmi?`))
                                void deleteLesson(l.id);
                            }}
                            aria-label={`${l.title} darsini o‘chirish`}
                            title="O‘chirish"
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>

                        {questionLessonId === l.id && (
                          <div className="mt-3 rounded-xl bg-white p-3 ring-1 ring-line">
                            <div className="mb-2 flex items-center justify-between">
                              <span className="text-xs font-extrabold text-ink-soft">
                                Savollar ({questions.length})
                              </span>
                              <Button
                                size="sm"
                                onClick={() => {
                                  setQuestionOriginalId(null);
                                  setQuestionDraft({
                                    id: uid("q"),
                                    lessonId: l.id,
                                    orderIndex: questions.length + 1,
                                    explanationUz: "",
                                    type: "multiple_choice",
                                    payload: {
                                      prompt: "",
                                      promptLang: "ru",
                                      options: ["", "", "", ""],
                                      correctIndex: 0,
                                    },
                                  });
                                }}
                              >
                                <Plus size={14} /> Yangi savol
                              </Button>
                            </div>
                            <ul className="space-y-1.5">
                              {questions.map((q, i) => (
                                <li
                                  key={q.id}
                                  className="flex items-center gap-2 rounded-lg bg-surface px-3 py-2"
                                >
                                  <span className="w-5 text-xs font-extrabold text-ink-faint">
                                    {i + 1}
                                  </span>
                                  <Badge tone="blue" className="shrink-0">
                                    {q.type}
                                  </Badge>
                                  <span className="min-w-0 flex-1 truncate text-xs text-ink-soft">
                                    {questionPreview(q)}
                                  </span>
                                  <button
                                    type="button"
                                    aria-label="Tahrirlash"
                                    className="rounded p-1 text-ink-soft hover:bg-surface-2"
                                    onClick={() => {
                                      setQuestionOriginalId(q.id);
                                      setQuestionDraft(structuredClone(q));
                                    }}
                                  >
                                    <Pencil size={13} />
                                  </button>
                                  <button
                                    type="button"
                                    aria-label="O‘chirish"
                                    className="rounded p-1 text-error hover:bg-error-soft"
                                    disabled={busy}
                                    onClick={() => {
                                      if (confirm("Savol o‘chirilsinmi?"))
                                        void deleteQuestion(q.id);
                                    }}
                                  >
                                    <Trash2 size={13} />
                                  </button>
                                </li>
                              ))}
                              {questions.length === 0 && (
                                <li className="py-2 text-center text-xs text-ink-soft">
                                  Savol yo‘q — «Yangi savol» bilan qo‘shing.
                                </li>
                              )}
                            </ul>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </Card>
        );
      })}

      {/* Dars tahriri */}
      <Modal
        open={Boolean(lessonDraft)}
        onClose={() => {
          setLessonDraft(null);
          setLessonOriginalId(null);
        }}
        title={lessonOriginalId ? "Darsni tahrirlash" : "Yangi dars"}
        className="max-w-2xl"
      >
        {lessonDraft && (
          <div className="space-y-3">
            <div>
              <Label>O‘zbekcha sarlavha *</Label>
              <Input
                value={lessonDraft.title}
                onChange={(e) => setLessonDraft({ ...lessonDraft, title: e.target.value })}
                placeholder="Masalan: Tanishuv va salomlashish"
              />
            </div>
            <div>
              <Label>Ruscha sarlavha</Label>
              <Input
                value={lessonDraft.titleRu}
                onChange={(e) => setLessonDraft({ ...lessonDraft, titleRu: e.target.value })}
                placeholder="Masalan: Знакомство"
              />
            </div>
            <div>
              <Label>Tavsif</Label>
              <Textarea
                rows={2}
                value={lessonDraft.description}
                onChange={(e) =>
                  setLessonDraft({ ...lessonDraft, description: e.target.value })
                }
                placeholder="Dars qo‘shiqida nima o‘rganiladi?"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>CEFR daraja</Label>
                <select
                  value={lessonDraft.level ?? "A1"}
                  onChange={(e) =>
                    setLessonDraft({
                      ...lessonDraft,
                      level: e.target.value as Lesson["level"],
                    })
                  }
                  className="h-11 w-full rounded-xl border-2 border-line bg-white px-3 text-sm text-ink focus:border-accent-blue focus:outline-none"
                >
                  {LEVEL_OPTIONS.map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label>Nashr holati</Label>
                <select
                  value={lessonDraft.status ?? "draft"}
                  onChange={(e) => {
                    const status = e.target.value as Lesson["status"];
                    setLessonDraft({
                      ...lessonDraft,
                      status,
                      published: status === "published",
                    });
                  }}
                  className="h-11 w-full rounded-xl border-2 border-line bg-white px-3 text-sm text-ink focus:border-accent-blue focus:outline-none"
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <Label>Modul</Label>
              <select
                value={lessonDraft.moduleId}
                onChange={(e) =>
                  setLessonDraft({ ...lessonDraft, moduleId: e.target.value })
                }
                className="h-11 w-full rounded-xl border-2 border-line bg-white px-3 text-sm text-ink focus:border-accent-blue focus:outline-none"
              >
                {data.modules.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.orderIndex}. {m.title} ({m.titleUz})
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <Label>XP</Label>
                <Input
                  type="number"
                  min={0}
                  value={lessonDraft.xpReward}
                  onChange={(e) =>
                    setLessonDraft({
                      ...lessonDraft,
                      xpReward: Math.max(0, Number(e.target.value) || 0),
                    })
                  }
                />
              </div>
              <div>
                <Label>Daqiqa</Label>
                <Input
                  type="number"
                  min={1}
                  value={lessonDraft.estimatedMinutes}
                  onChange={(e) =>
                    setLessonDraft({
                      ...lessonDraft,
                      estimatedMinutes: Math.max(1, Number(e.target.value) || 1),
                    })
                  }
                />
              </div>
              <div>
                <Label>Tartib</Label>
                <Input
                  type="number"
                  min={1}
                  value={lessonDraft.orderIndex}
                  onChange={(e) =>
                    setLessonDraft({
                      ...lessonDraft,
                      orderIndex: Math.max(1, Number(e.target.value) || 1),
                    })
                  }
                />
              </div>
            </div>

            <div>
              <Label>Maqsadlar (har bir qatorda)</Label>
              <Textarea
                rows={3}
                value={toLines(lessonDraft.objectives)}
                onChange={(e) =>
                  setLessonDraft({ ...lessonDraft, objectives: fromLines(e.target.value) })
                }
                placeholder={"Salomlashishni o‘rganish\nSavol berishni mashq qilish"}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Grammatika mavzusi</Label>
                <Input
                  value={lessonDraft.grammarTopic ?? ""}
                  onChange={(e) =>
                    setLessonDraft({ ...lessonDraft, grammarTopic: e.target.value })
                  }
                  placeholder="Masalan: Hozirgi zamon"
                />
              </div>
              <div>
                <Label>Minimal ball (%)</Label>
                <Input
                  type="number"
                  min={0}
                  max={100}
                  value={lessonDraft.completionCriteria?.minScore ?? 70}
                  onChange={(e) =>
                    setLessonDraft({
                      ...lessonDraft,
                      completionCriteria: {
                        ...lessonDraft.completionCriteria,
                        minScore: Math.min(100, Math.max(0, Number(e.target.value) || 0)),
                      },
                    })
                  }
                />
              </div>
            </div>
            <div>
              <Label>Grammatika izohi (o‘zbekcha)</Label>
              <Textarea
                rows={2}
                value={lessonDraft.grammarExplanation ?? ""}
                onChange={(e) =>
                  setLessonDraft({ ...lessonDraft, grammarExplanation: e.target.value })
                }
              />
            </div>
            <div>
              <Label>Lug‘at IDlari (vergul bilan)</Label>
              <Input
                value={toCsvList(lessonDraft.vocabularyIds)}
                onChange={(e) =>
                  setLessonDraft({
                    ...lessonDraft,
                    vocabularyIds: fromCsvList(e.target.value),
                  })
                }
                placeholder="v-1, v-2"
              />
            </div>
            <div>
              <Label>Namuna gaplar (har bir qatorda: ruscha | o‘zbekcha)</Label>
              <Textarea
                rows={3}
                value={(lessonDraft.examples ?? [])
                  .map((ex) => `${ex.ru} | ${ex.uz}`)
                  .join("\n")}
                onChange={(e) =>
                  setLessonDraft({
                    ...lessonDraft,
                    examples: e.target.value
                      .split("\n")
                      .map((line) => line.split("|").map((s) => s.trim()))
                      .filter((parts) => parts[0])
                      .map((parts) => ({ ru: parts[0], uz: parts[1] ?? "" })),
                  })
                }
                placeholder={"Привет! | Salom!\nКак дела? | Qalaysan?"}
              />
            </div>
            <div>
              <Label>O‘qish matni sarlavhasi</Label>
              <Input
                value={lessonDraft.readingTitle ?? ""}
                onChange={(e) =>
                  setLessonDraft({ ...lessonDraft, readingTitle: e.target.value })
                }
              />
            </div>
            <div>
              <Label>O‘qish matni (ruscha)</Label>
              <Textarea
                rows={4}
                value={lessonDraft.readingText ?? ""}
                onChange={(e) =>
                  setLessonDraft({ ...lessonDraft, readingText: e.target.value })
                }
              />
            </div>
            <div>
              <Label>Tinglash matni (ruscha)</Label>
              <Textarea
                rows={2}
                value={lessonDraft.listeningText ?? ""}
                onChange={(e) =>
                  setLessonDraft({ ...lessonDraft, listeningText: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Oldingi dars IDlari</Label>
                <Input
                  value={toCsvList(lessonDraft.prerequisites)}
                  onChange={(e) =>
                    setLessonDraft({
                      ...lessonDraft,
                      prerequisites: fromCsvList(e.target.value),
                    })
                  }
                  placeholder="a1-m1-l1, a1-m1-l2"
                />
              </div>
              <div>
                <Label>Teglar / kategoriyalar</Label>
                <Input
                  value={toCsvList(lessonDraft.tags)}
                  onChange={(e) =>
                    setLessonDraft({ ...lessonDraft, tags: fromCsvList(e.target.value) })
                  }
                  placeholder="family, everyday"
                />
              </div>
            </div>
            <div className="flex gap-3 pt-1">
              <Button
                variant="secondary"
                className="flex-1"
                onClick={() => {
                  setLessonDraft(null);
                  setLessonOriginalId(null);
                }}
              >
                Bekor qilish
              </Button>
              <Button className="flex-1" disabled={busy} onClick={() => void saveLesson()}>
                {busy ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
                Saqlash
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Savol tahriri */}
      <QuestionModal
        draft={questionDraft}
        isNew={!questionOriginalId}
        busy={busy}
        onChange={setQuestionDraft}
        onClose={() => {
          setQuestionDraft(null);
          setQuestionOriginalId(null);
        }}
        onSave={() => void saveQuestion()}
      />
    </div>
  );
}

function questionPreview(q: Question): string {
  const p = q.payload as unknown as Record<string, unknown>;
  const s = (v: unknown) => (typeof v === "string" ? v : "");
  const candidate = s(p.prompt) || s(p.source) || s(p.sentence) || s(p.speakText) || s(p.promptUz) || s(p.ruText);
  if (candidate) return candidate;
  if (Array.isArray(p.correct)) return (p.correct as string[]).join(" ");
  if (Array.isArray(p.pairs)) return (p.pairs as { ru: string }[]).map((x) => x.ru).join(", ");
  return "—";
}

// ---------------------------------------------------------------------------
// Savol tahrirlovchisi — payload turga mos qilib tahrirlanadi
// ---------------------------------------------------------------------------
function QuestionModal({
  draft,
  isNew,
  busy,
  onChange,
  onClose,
  onSave,
}: {
  draft: Question | null;
  isNew: boolean;
  busy: boolean;
  onChange: (q: Question | null) => void;
  onClose: () => void;
  onSave: () => void;
}) {
  const { toast } = useToast();

  if (!draft) return null;

  const setPayload = (patch: Record<string, unknown>) => {
    onChange({
      ...draft,
      payload: { ...draft.payload, ...patch },
    } as Question);
  };

  const setOptions = (value: string) => {
    setPayload({ options: value.split("\n").map((s) => s.trim()).filter(Boolean) });
  };

  const optionsValue = (Array.isArray((draft.payload as { options?: string[] }).options)
    ? (draft.payload as { options: string[] }).options.join("\n")
    : "");

  const validate = (): string | null => {
    const p = draft.payload as unknown as Record<string, unknown>;
    switch (draft.type) {
      case "multiple_choice":
      case "word_selection":
      case "fill_blank":
      case "listening": {
        const opts = p.options as string[] | undefined;
        if (!opts || opts.length < 2) return "Kamida 2 ta variant kiriting (har bir qatordan).";
        const ci = p.correctIndex as number | undefined;
        if (ci === undefined || ci < 0 || ci >= opts.length)
          return "To‘g‘ri variant indeksi variantlar chegarasida bo‘lsin.";
        if (draft.type === "fill_blank" && !(p.sentence as string)?.includes("___"))
          return "Gapda «___» bo‘sh joyi bo‘lsin.";
        if (draft.type === "multiple_choice" && !(p.prompt as string)?.trim())
          return "Savol matni majburiy.";
        if (draft.type === "listening" && !(p.speakText as string)?.trim())
          return "Ovozli matn majburiy.";
        if (draft.type === "word_selection" && !(p.promptUz as string)?.trim())
          return "O‘zbekcha ko‘rsatma majburiy.";
        return null;
      }
      case "translation": {
        if (!(p.source as string)?.trim()) return "Tarjima qilinadigan matn majburiy.";
        if (!(p.accepted as string[])?.length) return "Kamida 1 ta to‘g‘ri javob kiriting.";
        return null;
      }
      case "true_false": {
        if (!(p.ruText as string)?.trim()) return "Ruscha gap majburiy.";
        if (!(p.uzTranslation as string)?.trim()) return "O‘zbekcha tarjima majburiy.";
        return null;
      }
      case "word_matching": {
        const pairs = p.pairs as { ru: string; uz: string }[] | undefined;
        if (!pairs?.length) return "Kamida 1 ta juftlik kiriting.";
        if (pairs.some((x) => !x.ru.trim() || !x.uz.trim())) return "Bo‘sh juftlik yo‘q bo‘lsin.";
        return null;
      }
      case "sentence_building": {
        const correct = p.correct as string[] | undefined;
        if (!correct?.length) return "To‘g‘ri gapni kiriting (har bir so‘z qatordan).";
        return null;
      }
      default:
        return null;
    }
  };

  const handleSave = () => {
    const err = validate();
    if (err) {
      toast(err, "error");
      return;
    }
    onSave();
  };

  return (
    <Modal
      open
      onClose={onClose}
      title={isNew ? "Yangi savol" : "Savolni tahrirlash"}
      className="max-w-xl"
    >
      <div className="max-h-[70vh] space-y-3 overflow-y-auto pr-1">
        <div>
          <Label>Savol turi</Label>
          <select
            value={draft.type}
            onChange={(e) => {
              const type = e.target.value as QuestionType;
              onChange({ ...draft, type } as Question);
            }}
            className="h-11 w-full rounded-xl border-2 border-line bg-white px-3 text-sm text-ink focus:border-accent-blue focus:outline-none"
          >
            {QUESTION_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div>
          <Label>Tushuntirish (o‘zbekcha) *</Label>
          <Textarea
            rows={2}
            value={draft.explanationUz}
            onChange={(e) => onChange({ ...draft, explanationUz: e.target.value })}
            placeholder="Javob noto‘g‘ri bo‘lsa, nima uchun?"
          />
        </div>

        {(draft.type === "multiple_choice" ||
          draft.type === "word_selection" ||
          draft.type === "fill_blank" ||
          draft.type === "listening") && (
          <>
            {draft.type === "multiple_choice" && (
              <div>
                <Label>Savol matni *</Label>
                <Input
                  value={(draft.payload as { prompt?: string }).prompt ?? ""}
                  onChange={(e) => setPayload({ prompt: e.target.value })}
                />
              </div>
            )}
            {draft.type === "fill_blank" && (
              <div>
                <Label>Gap («___» bilan) *</Label>
                <Input
                  value={(draft.payload as { sentence?: string }).sentence ?? ""}
                  onChange={(e) => setPayload({ sentence: e.target.value })}
                  placeholder="Я ___ студент."
                />
              </div>
            )}
            {draft.type === "listening" && (
              <>
                <div>
                  <Label>Ovozli matn (ruscha) *</Label>
                  <Input
                    value={(draft.payload as { speakText?: string }).speakText ?? ""}
                    onChange={(e) => setPayload({ speakText: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Ko‘rsatma (o‘zbekcha) *</Label>
                  <Input
                    value={(draft.payload as { promptUz?: string }).promptUz ?? ""}
                    onChange={(e) => setPayload({ promptUz: e.target.value })}
                    placeholder="Eshitgan so‘zni tanlang"
                  />
                </div>
              </>
            )}
            {draft.type === "word_selection" && (
              <div>
                <Label>O‘zbekcha ko‘rsatma *</Label>
                <Input
                  value={(draft.payload as { promptUz?: string }).promptUz ?? ""}
                  onChange={(e) => setPayload({ promptUz: e.target.value })}
                  placeholder="«Kitob» degan so‘zni tanlang"
                />
              </div>
            )}
            <div>
              <Label>
                Variantlar * (har bir qatordan, {optionsValue.split("\n").filter(Boolean).length} ta)
              </Label>
              <Textarea rows={4} value={optionsValue} onChange={(e) => setOptions(e.target.value)} />
            </div>
            <div>
              <Label>To‘g‘ri variant raqami (0 dan boshlab)</Label>
              <Input
                type="number"
                min={0}
                value={(draft.payload as { correctIndex?: number }).correctIndex ?? 0}
                onChange={(e) =>
                  setPayload({ correctIndex: Math.max(0, Number(e.target.value) || 0) })
                }
              />
            </div>
          </>
        )}

        {draft.type === "translation" && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Yo‘nalish</Label>
                <select
                  value={(draft.payload as { direction?: string }).direction ?? "ru_to_uz"}
                  onChange={(e) => setPayload({ direction: e.target.value })}
                  className="h-11 w-full rounded-xl border-2 border-line bg-white px-3 text-sm text-ink focus:border-accent-blue focus:outline-none"
                >
                  <option value="ru_to_uz">RU → UZ</option>
                  <option value="uz_to_ru">UZ → RU</option>
                </select>
              </div>
              <div>
                <Label>Matn *</Label>
                <Input
                  value={(draft.payload as { source?: string }).source ?? ""}
                  onChange={(e) => setPayload({ source: e.target.value })}
                />
              </div>
            </div>
            <div>
              <Label>To‘g‘ri javoblar * (har bir qatordan)</Label>
              <Textarea
                rows={3}
                value={((draft.payload as { accepted?: string[] }).accepted ?? []).join("\n")}
                onChange={(e) =>
                  setPayload({
                    accepted: e.target.value.split("\n").map((s) => s.trim()).filter(Boolean),
                  })
                }
              />
            </div>
          </>
        )}

        {draft.type === "true_false" && (
          <>
            <div>
              <Label>Ruscha gap *</Label>
              <Input
                value={(draft.payload as { ruText?: string }).ruText ?? ""}
                onChange={(e) => setPayload({ ruText: e.target.value })}
              />
            </div>
            <div>
              <Label>O‘zbekcha tarjima *</Label>
              <Input
                value={(draft.payload as { uzTranslation?: string }).uzTranslation ?? ""}
                onChange={(e) => setPayload({ uzTranslation: e.target.value })}
              />
            </div>
            <div className="flex items-center gap-3">
              <Label className="mb-0">Natija:</Label>
              <Badge tone={(draft.payload as { isTrue?: boolean }).isTrue ? "green" : "red"}>
                {(draft.payload as { isTrue?: boolean }).isTrue ? "To‘g‘ri" : "Noto‘g‘ri"}
              </Badge>
              <Button
                size="sm"
                variant="secondary"
                onClick={() =>
                  setPayload({ isTrue: !(draft.payload as { isTrue?: boolean }).isTrue })
                }
              >
                Almashtirish
              </Button>
            </div>
          </>
        )}

        {draft.type === "word_matching" && <PairsEditor draft={draft} onChange={onChange} />}

        {draft.type === "sentence_building" && (
          <div className="space-y-3">
            <div>
              <Label>To‘g‘ri gap * (har bir so‘z qatordan)</Label>
              <Textarea
                rows={3}
                value={((draft.payload as { correct?: string[] }).correct ?? []).join("\n")}
                onChange={(e) =>
                  setPayload({
                    correct: e.target.value.split("\n").map((s) => s.trim()).filter(Boolean),
                  })
                }
              />
            </div>
            <div>
              <Label>Ortiqcha so‘zlar (ixtiyoriy)</Label>
              <Textarea
                rows={2}
                value={((draft.payload as { distractors?: string[] }).distractors ?? []).join("\n")}
                onChange={(e) =>
                  setPayload({
                    distractors: e.target.value.split("\n").map((s) => s.trim()).filter(Boolean),
                  })
                }
              />
            </div>
          </div>
        )}

        <div className="flex gap-3 pt-1">
          <Button variant="secondary" className="flex-1" onClick={onClose}>
            Bekor qilish
          </Button>
          <Button className="flex-1" disabled={busy} onClick={handleSave}>
            {busy ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
            Saqlash
          </Button>
        </div>
      </div>
    </Modal>
  );
}

function PairsEditor({
  draft,
  onChange,
}: {
  draft: Question;
  onChange: (q: Question | null) => void;
}) {
  const payload = draft.payload as unknown as { pairs?: { ru: string; uz: string }[] };
  const pairs = payload.pairs ?? [];

  const update = (next: { ru: string; uz: string }[]) => {
    onChange({ ...draft, payload: { ...payload, pairs: next } } as Question);
  };

  return (
    <div className="space-y-2">
      <Label>Juftliklar * (ruscha — o‘zbekcha)</Label>
      {pairs.map((p, i) => (
        <div key={i} className="flex gap-2">
          <Input
            value={p.ru}
            placeholder="Привет"
            aria-label={`${i + 1}-juftlik ruscha`}
            onChange={(e) => {
              const next = [...pairs];
              next[i] = { ...next[i], ru: e.target.value };
              update(next);
            }}
          />
          <Input
            value={p.uz}
            placeholder="Salom"
            aria-label={`${i + 1}-juftlik o‘zbekcha`}
            onChange={(e) => {
              const next = [...pairs];
              next[i] = { ...next[i], uz: e.target.value };
              update(next);
            }}
          />
          <button
            type="button"
            aria-label="Juftlikni o‘chirish"
            className="rounded-lg px-2 text-error hover:bg-error-soft"
            onClick={() => update(pairs.filter((_, j) => j !== i))}
          >
            <Trash2 size={15} />
          </button>
        </div>
      ))}
      <Button
        size="sm"
        variant="secondary"
        onClick={() => update([...pairs, { ru: "", uz: "" }])}
      >
        <Plus size={14} /> Juftlik qo‘shish
      </Button>
    </div>
  );
}
