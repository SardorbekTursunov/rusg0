"use client";

import type {
  Achievement,
  AuthSession,
  ContentReviewItem,
  ContentStatus,
  ImportJob,
  ImportRowError,
  Lesson,
  LessonProgress,
  MistakeState,
  Module,
  OnboardingData,
  Profile,
  Question,
  UserVocabState,
  VocabularyItem,
  VocabularyQuery,
  VocabularySearchResult,
  XpEvent,
} from "@/types";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { achievements as baseAchievements } from "@/data/achievements";
import { dailyQuests } from "@/data/quests";
import { categoryTitleUz } from "@/data/vocabulary/categories";
import { normalizeImportRow, vocabKey } from "@/lib/content-import";
import {
  STORE_ERRORS,
  SIGNUP_NEEDS_CONFIRMATION,
  type AppStore,
  type AdminUserRow,
  type CompleteLessonInput,
  type CompleteLessonResult,
  type DailyQuestState,
  type GameResult,
  type GameSlug,
  type ProfilePatch,
  type ReviewQueue,
  type ReviewWordResult,
  type AdminStats,
  type VocabularyFacets,
  type ImportVocabularyInput,
  type ImportBatchResult,
  type ContentCounts,
} from "@/lib/store/types";

// --------------------------------------------------------------------------
// Supabase rejimi: barcha yozuvlar RLS + server tomonidagi RPC orqali.
// XP, streak, vazifalar va yutuqlar faqat SQL funksiyalarida hisoblanadi.
// ---------------------------------------------------------------------------

type Row = Record<string, unknown>;

function toVocabulary(row: Row): VocabularyItem {
  return {
    id: String(row.id),
    russianWord: String(row.russian_word),
    uzbekTranslation: String(row.uzbek_translation),
    transliteration: String(row.transliteration ?? ""),
    partOfSpeech: String(row.part_of_speech ?? ""),
    exampleRu: String(row.example_ru ?? ""),
    exampleUz: String(row.example_uz ?? ""),
    audioUrl: (row.audio_url as string | null) ?? null,
    level: row.level as VocabularyItem["level"],
    topic: String(row.topic ?? ""),
    entryType: (row.entry_type as VocabularyItem["entryType"]) ?? "lemma",
    meanings: (row.meanings as VocabularyItem["meanings"]) ?? undefined,
    examples: (row.examples as VocabularyItem["examples"]) ?? undefined,
    gender: (row.gender as VocabularyItem["gender"]) ?? null,
    plural: (row.plural as string | null) ?? null,
    infinitive: (row.infinitive as string | null) ?? null,
    forms: (row.forms as VocabularyItem["forms"]) ?? undefined,
    synonyms: (row.synonyms as string[]) ?? [],
    antonyms: (row.antonyms as string[]) ?? [],
    wordFamily: (row.word_family as string[]) ?? [],
    categories: (row.categories as string[]) ?? [],
    frequencyRank: row.frequency_rank === null ? null : Number(row.frequency_rank),
    difficulty: row.difficulty === null ? undefined : Number(row.difficulty),
    source: row.source ? String(row.source) : undefined,
    status: (row.status as ContentStatus) ?? "verified",
    verifiedAt: row.verified_at ? String(row.verified_at) : null,
  };
}

function emptyStatusCount(): Record<ContentStatus, number> {
  return { draft: 0, pending: 0, verified: 0, published: 0, rejected: 0 };
}

function jobFromRow(row: Row): ImportJob {
  return {
    id: String(row.id ?? ""),
    fileName: String(row.file_name ?? ""),
    format: (row.format as ImportJob["format"]) ?? "csv",
    totalRows: Number(row.total_rows ?? 0),
    processedRows: Number(row.processed_rows ?? 0),
    imported: Number(row.imported ?? 0),
    updated: Number(row.updated ?? 0),
    duplicates: Number(row.duplicates ?? 0),
    failed: Number(row.failed ?? 0),
    status: (row.status as ImportJob["status"]) ?? "running",
    createdAt: String(row.created_at ?? ""),
    finishedAt: row.finished_at ? String(row.finished_at) : null,
    defaultStatus: (row.default_status as ContentStatus) ?? "pending",
    createdBy: row.created_by ? String(row.created_by) : null,
  };
}

function toLesson(row: Row): Lesson {
  return {
    id: String(row.id),
    moduleId: String(row.module_id),
    orderIndex: Number(row.order_index),
    title: String(row.title),
    titleRu: String(row.title_ru ?? ""),
    description: String(row.description ?? ""),
    xpReward: Number(row.xp_reward ?? 10),
    estimatedMinutes: Number(row.estimated_minutes ?? 5),
    level: (row.level as Lesson["level"]) ?? undefined,
    objectives: (row.objectives as string[]) ?? [],
    grammarTopic: row.grammar_topic ? String(row.grammar_topic) : undefined,
    grammarExplanation: row.grammar_explanation
      ? String(row.grammar_explanation)
      : undefined,
    vocabularyIds: (row.vocabulary_ids as string[]) ?? [],
    examples: (row.examples as Lesson["examples"]) ?? [],
    readingText: row.reading_text ? String(row.reading_text) : null,
    readingTitle: row.reading_title ? String(row.reading_title) : null,
    listeningText: row.listening_text ? String(row.listening_text) : null,
    prerequisites: (row.prerequisites as string[]) ?? [],
    completionCriteria: (row.completion_criteria as Lesson["completionCriteria"]) ?? {
      minScore: 70,
    },
    tags: (row.tags as string[]) ?? [],
    status: (row.status as ContentStatus) ?? "published",
    published: row.published === undefined ? true : Boolean(row.published),
    source: row.source ? String(row.source) : undefined,
    exerciseCount: row.exercise_count === null ? undefined : Number(row.exercise_count),
  };
}

function vocabToRow(v: VocabularyItem): Row {
  return {
    id: v.id,
    russian_word: v.russianWord,
    uzbek_translation: v.uzbekTranslation,
    transliteration: v.transliteration,
    part_of_speech: v.partOfSpeech,
    example_ru: v.exampleRu,
    example_uz: v.exampleUz,
    audio_url: v.audioUrl,
    level: v.level,
    topic: v.topic,
    entry_type: v.entryType ?? "lemma",
    meanings: v.meanings ?? [{ uz: v.uzbekTranslation }],
    examples: v.examples ?? [],
    gender: v.gender ?? null,
    plural: v.plural ?? null,
    infinitive: v.infinitive ?? null,
    forms: v.forms ?? [],
    synonyms: v.synonyms ?? [],
    antonyms: v.antonyms ?? [],
    word_family: v.wordFamily ?? [],
    categories: v.categories ?? [],
    frequency_rank: v.frequencyRank ?? null,
    difficulty: v.difficulty ?? null,
    source: v.source ?? null,
    status: v.status ?? "pending",
    verified_at: v.verifiedAt ?? null,
  };
}

function toProfile(row: Row): Profile {
  return {
    id: String(row.id),
    username: String(row.username),
    fullName: String(row.full_name ?? ""),
    email: "",
    avatarId: String(row.avatar_id ?? "av1"),
    role: row.role === "admin" ? "admin" : "user",
    currentLevel: (row.current_level as Profile["currentLevel"]) ?? "A1",
    totalXp: Number(row.total_xp ?? 0),
    currentStreak: Number(row.current_streak ?? 0),
    longestStreak: Number(row.longest_streak ?? 0),
    dailyGoal: Number(row.daily_goal ?? 30),
    soundEnabled: row.sound_enabled !== false,
    notificationsEnabled: row.notifications_enabled !== false,
    heartsEnabled: row.hearts_enabled !== false,
    onboarding: (row.onboarding as Profile["onboarding"]) ?? null,
    createdAt: String(row.created_at ?? new Date().toISOString()),
  };
}

export function createSupabaseStore(): AppStore {
  const sb = () => {
    const client = getSupabaseBrowserClient();
    if (!client) throw new Error("Supabase sozlanmagan.");
    return client;
  };

  async function uid(): Promise<string> {
    const { data } = await sb().auth.getSession();
    const id = data.session?.user.id;
    if (!id) throw new Error(STORE_ERRORS.noSession);
    return id;
  }

  return {
    async signUp({ email, password, username, fullName }) {
      const sbc = sb();
      const { data: taken } = await sbc
        .from("profiles")
        .select("id")
        .ilike("username", username.trim());
      if (taken && taken.length > 0) return STORE_ERRORS.usernameTaken;
      const { data, error } = await sbc.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
        options: { data: { username: username.trim(), full_name: fullName.trim() } },
      });
      if (error) {
        if (error.message.toLowerCase().includes("already")) return STORE_ERRORS.emailInUse;
        return error.message;
      }
      // Email tasdiqlash yoqilgan bo'lsa: user yaratildi, lekin sessiya YO'Q
      // → foydalanuvchi pochtadagi kod bilan tasdiqlashi kerak (/verify)
      if (data.user && !data.session) return SIGNUP_NEEDS_CONFIRMATION;
      return null;
    },

    async signIn(email, password) {
      const { error } = await sb().auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });
      if (error) {
        if (error.message.toLowerCase().includes("not confirmed"))
          return STORE_ERRORS.emailNotConfirmed;
        return STORE_ERRORS.invalidLogin;
      }
      return null;
    },

    async signOut() {
      await sb().auth.signOut();
    },

    async getSession(): Promise<AuthSession | null> {
      const { data } = await sb().auth.getSession();
      const u = data.session?.user;
      return u ? { user: { id: u.id, email: u.email ?? "" } } : null;
    },

    async getProfile(): Promise<Profile | null> {
      const id = await uid().catch(() => null);
      if (!id) return null;
      const { data } = await sb().from("profiles").select("*").eq("id", id).single();
      return data ? toProfile(data as Row) : null;
    },

    async updateProfile(patch: ProfilePatch): Promise<string | null> {
      const id = await uid();
      if (patch.username !== undefined) {
        const { data: taken } = await sb()
          .from("profiles")
          .select("id")
          .ilike("username", patch.username.trim());
        const rows = (taken ?? []) as { id: string }[];
        if (rows.some((t) => t.id !== id)) return STORE_ERRORS.usernameTaken;
      }
      const payload: Row = {};
      if (patch.username !== undefined) payload.username = patch.username.trim();
      if (patch.fullName !== undefined) payload.full_name = patch.fullName.trim();
      if (patch.avatarId !== undefined) payload.avatar_id = patch.avatarId;
      if (patch.dailyGoal !== undefined) payload.daily_goal = patch.dailyGoal;
      if (patch.soundEnabled !== undefined) payload.sound_enabled = patch.soundEnabled;
      if (patch.notificationsEnabled !== undefined)
        payload.notifications_enabled = patch.notificationsEnabled;
      if (patch.heartsEnabled !== undefined) payload.hearts_enabled = patch.heartsEnabled;
      if (patch.currentLevel !== undefined) payload.current_level = patch.currentLevel;
      const { error } = await sb().from("profiles").update(payload).eq("id", id);
      return error ? error.message : null;
    },

    async completeOnboarding(data: OnboardingData): Promise<string | null> {
      const id = await uid();
      const levelMap: Record<string, string> = { none: "A1", basic: "A1", medium: "A2", advanced: "B2" };
      const { error } = await sb()
        .from("profiles")
        .update({
          onboarding: data,
          current_level: levelMap[data.level] ?? "A1",
        })
        .eq("id", id);
      return error ? error.message : null;
    },

    async getModules(): Promise<Module[]> {
      const { data } = await sb()
        .from("modules")
        .select("*")
        .order("level")
        .order("order_index");
      return ((data ?? []) as Row[]).map((m) => ({
        id: String(m.id),
        level: m.level as Module["level"],
        orderIndex: Number(m.order_index),
        title: String(m.title),
        titleUz: String(m.title_uz ?? m.title),
        description: String(m.description ?? ""),
      }));
    },

    async getLessons(): Promise<Lesson[]> {
      const { data } = await sb().from("lessons").select("*").order("order_index");
      return ((data ?? []) as Row[]).map(toLesson);
    },

    async getQuestions(lessonId: string): Promise<Question[]> {
      const { data } = await sb()
        .from("lesson_exercises")
        .select("*")
        .eq("lesson_id", lessonId)
        .order("order_index");
      return ((data ?? []) as Row[]).map((q) => ({
        id: String(q.id),
        lessonId: String(q.lesson_id),
        orderIndex: Number(q.order_index),
        type: q.exercise_type as Question["type"],
        explanationUz: String(q.explanation_uz ?? ""),
        payload: q.payload as Question["payload"],
      })) as Question[];
    },

    async getVocabulary(): Promise<VocabularyItem[]> {
      const { data } = await sb().from("vocabulary").select("*").order("id");
      return ((data ?? []) as Row[]).map(toVocabulary);
    },

    async searchVocabulary(query: VocabularyQuery): Promise<VocabularySearchResult> {
      const { data, error } = await sb().rpc("search_vocabulary", {
        p_query: query.query ?? "",
        p_level: query.level && query.level !== "all" ? query.level : null,
        p_category: query.category && query.category !== "all" ? query.category : null,
        p_pos: query.partOfSpeech && query.partOfSpeech !== "all" ? query.partOfSpeech : null,
        p_entry_type:
          query.entryType && query.entryType !== "all" ? query.entryType : null,
        p_favorites: query.onlyFavorites ?? false,
        p_learned: query.onlyLearned ?? false,
        p_sort: query.sort ?? "frequency",
        p_page: query.page ?? 1,
        p_page_size: query.pageSize ?? 24,
      });
      if (error) throw new Error(error.message);
      const res = (data ?? {}) as Row;
      return {
        items: ((res.items as Row[]) ?? []).map(toVocabulary),
        total: Number(res.total ?? 0),
        page: Number(res.page ?? query.page ?? 1),
        pageSize: Number(res.page_size ?? query.pageSize ?? 24),
        levelCounts: (res.level_counts as Record<string, number>) ?? {},
      };
    },

    async getVocabularyFacets(): Promise<VocabularyFacets> {
      const { data, error } = await sb().rpc("vocabulary_facets");
      if (error) throw new Error(error.message);
      const res = (data ?? {}) as Row;
      return {
        categories: (res.categories as VocabularyFacets["categories"]) ?? [],
        partsOfSpeech: (res.parts_of_speech as VocabularyFacets["partsOfSpeech"]) ?? [],
        entryTypes: (res.entry_types as VocabularyFacets["entryTypes"]) ?? [],
      };
    },

    async getVocabularySuggestions(query: string, limit = 8): Promise<string[]> {
      if (!query.trim()) return [];
      const { data } = await sb().rpc("vocabulary_suggestions", {
        p_query: query.trim(),
        p_limit: limit,
      });
      if (!data) return [];
      const res = data as Row;
      return (res.suggestions as string[]) ?? [];
    },

    async getVocabularyByIds(ids: string[]): Promise<VocabularyItem[]> {
      if (ids.length === 0) return [];
      const { data } = await sb().from("vocabulary").select("*").in("id", ids);
      const rows = ((data ?? []) as Row[]).map(toVocabulary);
      const byId = new Map(rows.map((v) => [v.id, v]));
      return ids.map((id) => byId.get(id)).filter((v): v is VocabularyItem => Boolean(v));
    },

    async importVocabularyBatch(input: ImportVocabularyInput): Promise<ImportBatchResult> {
      const sbc = sb();
      let jobId = input.jobId;
      let job: ImportJob;
      if (!jobId) {
        const { data, error } = await sbc
          .from("content_import_jobs")
          .insert({
            file_name: input.fileName,
            format: input.format,
            total_rows: input.totalRows,
            processed_rows: 0,
            imported: 0,
            updated: 0,
            duplicates: 0,
            failed: 0,
            status: "running",
            default_status: input.defaultStatus,
          })
          .select("*")
          .single();
        if (error || !data) throw new Error(error?.message ?? "Import ishini yaratib bo'lmadi.");
        jobId = String((data as Row).id);
        job = jobFromRow(data as Row);
      } else {
        const { data } = await sbc
          .from("content_import_jobs")
          .select("*")
          .eq("id", jobId)
          .single();
        job = jobFromRow((data ?? {}) as Row);
      }

      const items: VocabularyItem[] = [];
      const errors: ImportRowError[] = [];
      input.rows.forEach((raw, i) => {
        const res = normalizeImportRow(raw, (job.processedRows ?? 0) + i + 2, input.defaultStatus);
        if (res.error) errors.push(res.error);
        else if (res.item) items.push(res.item);
      });

      const existing = new Map<string, Row>();
      const words = Array.from(new Set(items.map((i) => i.russianWord)));
      if (words.length > 0) {
        const { data } = await sbc
          .from("vocabulary")
          .select("id,russian_word,part_of_speech,status")
          .in("russian_word", words);
        for (const row of (data ?? []) as Row[])
          existing.set(
            `${String(row.russian_word).toLowerCase()}|${String(row.part_of_speech).toLowerCase()}`,
            row,
          );
      }

      const toUpsert: Row[] = [];
      let imported = 0;
      let updated = 0;
      let duplicates = 0;
      for (const item of items) {
        const key = vocabKey(item);
        const prev = existing.get(key);
        if (prev) {
          const prevId = String(prev.id);
          const prevStatus = String(prev.status ?? "");
          if (prevId.startsWith("imp-") || prevStatus === "pending" || prevStatus === "draft") {
            toUpsert.push({ ...vocabToRow(item), id: prevId });
            updated++;
          } else {
            duplicates++;
            errors.push({
              row: 0,
              message: `Allaqachon mavjud: «${item.russianWord}» (${prevStatus}).`,
              raw: item.russianWord,
            });
          }
          continue;
        }
        toUpsert.push(vocabToRow(item));
        imported++;
      }

      if (toUpsert.length > 0) {
        const { error } = await sbc.from("vocabulary").upsert(toUpsert, { onConflict: "id" });
        if (error) throw new Error(error.message);
      }
      if (errors.length > 0) {
        await sbc.from("content_import_errors").insert(
          errors.map((e) => ({
            job_id: jobId,
            row_number: e.row,
            message: e.message,
            raw: e.raw ?? null,
          })),
        );
      }

      const processed = Math.min(
        job.totalRows ?? input.totalRows,
        (job.processedRows ?? 0) + input.rows.length,
      );
      const failed = (job.failed ?? 0) + errors.length;
      const status: ImportJob["status"] =
        processed >= (job.totalRows ?? input.totalRows)
          ? failed > 0
            ? "partial"
            : "completed"
          : "running";
      const { data: updatedJob } = await sbc
        .from("content_import_jobs")
        .update({
          processed_rows: processed,
          imported: (job.imported ?? 0) + imported,
          updated: (job.updated ?? 0) + updated,
          duplicates: (job.duplicates ?? 0) + duplicates,
          failed,
          status,
          finished_at: status === "running" ? null : new Date().toISOString(),
        })
        .eq("id", jobId)
        .select("*")
        .single();

      return {
        job: jobFromRow((updatedJob ?? {}) as Row),
        imported,
        updated,
        duplicates,
        errors,
      };
    },

    async getImportJobs(): Promise<ImportJob[]> {
      const { data } = await sb()
        .from("content_import_jobs")
        .select("*")
        .order("created_at", { ascending: false });
      return ((data ?? []) as Row[]).map(jobFromRow);
    },

    async getImportErrors(jobId: string): Promise<ImportRowError[]> {
      const { data } = await sb()
        .from("content_import_errors")
        .select("row_number,message,raw")
        .eq("job_id", jobId)
        .order("row_number");
      return ((data ?? []) as Row[]).map((r) => ({
        row: Number(r.row_number ?? 0),
        message: String(r.message ?? ""),
        raw: r.raw ? String(r.raw) : undefined,
      }));
    },

    async deleteImportJob(jobId: string): Promise<void> {
      await sb().from("content_import_jobs").delete().eq("id", jobId);
    },

    async exportVocabulary(query: VocabularyQuery): Promise<VocabularyItem[]> {
      const { data, error } = await sb().rpc("export_vocabulary", {
        p_query: query.query ?? "",
        p_level: query.level && query.level !== "all" ? query.level : null,
        p_category: query.category && query.category !== "all" ? query.category : null,
        p_pos: query.partOfSpeech && query.partOfSpeech !== "all" ? query.partOfSpeech : null,
        p_limit: 5000,
      });
      if (error) throw new Error(error.message);
      return (((data ?? {}) as Row).items as Row[] ?? []).map(toVocabulary);
    },

    async getContentReviews(
      status: ContentStatus | "all" = "all",
    ): Promise<ContentReviewItem[]> {
      const vocabQuery = sb().from("vocabulary").select("*").order("id").limit(500);
      const lessonQuery = sb().from("lessons").select("*").order("id").limit(500);
      if (status !== "all") {
        vocabQuery.eq("status", status);
        lessonQuery.eq("status", status);
      }
      const [vocabRes, lessonRes] = await Promise.all([vocabQuery, lessonQuery]);
      const out: ContentReviewItem[] = [];
      for (const v of (vocabRes.data ?? []) as Row[]) {
        const item = toVocabulary(v);
        out.push({
          kind: "vocabulary",
          id: item.id,
          title: item.russianWord,
          subtitle: item.uzbekTranslation,
          level: item.level,
          status: item.status ?? "verified",
          updatedAt: String(v.verified_at ?? ""),
          details: [item.partOfSpeech, (item.categories ?? []).map(categoryTitleUz).join(", ")]
            .filter(Boolean)
            .join(" · "),
        });
      }
      for (const l of (lessonRes.data ?? []) as Row[]) {
        const lesson = toLesson(l);
        out.push({
          kind: "lesson",
          id: lesson.id,
          title: `${lesson.titleRu} — ${lesson.title}`,
          subtitle: lesson.description,
          level: lesson.level ?? "A1",
          status: lesson.status ?? "published",
          updatedAt: "",
          details: `${lesson.moduleId} · ${lesson.exerciseCount ?? 0} mashq`,
        });
      }
      const priority: Record<ContentStatus, number> = {
        pending: 0,
        draft: 1,
        rejected: 2,
        verified: 3,
        published: 4,
      };
      return out.sort((a, b) => priority[a.status] - priority[b.status]);
    },

    async setContentStatus(
      kind: "vocabulary" | "lesson",
      id: string,
      status: ContentStatus,
    ): Promise<string | null> {
      if (kind === "vocabulary") {
        const { error } = await sb()
          .from("vocabulary")
          .update({
            status,
            verified_at:
              status === "verified" || status === "published"
                ? new Date().toISOString()
                : null,
          })
          .eq("id", id);
        return error ? error.message : null;
      }
      const { error } = await sb()
        .from("lessons")
        .update({ status, published: status === "published" })
        .eq("id", id);
      return error ? error.message : null;
    },

    async getContentCounts(): Promise<ContentCounts> {
      const statuses: ContentStatus[] = [
        "draft",
        "pending",
        "verified",
        "published",
        "rejected",
      ];
      const vocabulary = emptyStatusCount();
      const lessons = emptyStatusCount();
      await Promise.all([
        ...statuses.map(async (s) => {
          const { count } = await sb()
            .from("vocabulary")
            .select("id", { count: "exact", head: true })
            .eq("status", s);
          vocabulary[s] = count ?? 0;
        }),
        ...statuses.map(async (s) => {
          const { count } = await sb()
            .from("lessons")
            .select("id", { count: "exact", head: true })
            .eq("status", s);
          lessons[s] = count ?? 0;
        }),
      ]);
      const { count: pendingImports } = await sb()
        .from("content_import_jobs")
        .select("id", { count: "exact", head: true })
        .eq("status", "running");
      return { vocabulary, lessons, pendingImports: pendingImports ?? 0 };
    },

    async getLessonProgress(): Promise<LessonProgress[]> {
      const id = await uid().catch(() => null);
      if (!id) return [];
      const { data } = await sb()
        .from("lesson_progress")
        .select("*")
        .eq("user_id", id);
      return ((data ?? []) as Row[]).map((p) => ({
        lessonId: String(p.lesson_id),
        completed: Boolean(p.completed),
        bestScore: Number(p.best_score ?? 0),
        correctCount: Number(p.correct_count ?? 0),
        totalQuestions: Number(p.total_questions ?? 0),
        xpEarned: Number(p.xp_earned ?? 0),
        completedAt: String(p.completed_at ?? ""),
      }));
    },

    async completeLesson(input: CompleteLessonInput): Promise<CompleteLessonResult> {
      const { data, error } = await sb().rpc("complete_lesson", {
        p_lesson_id: input.lessonId,
        p_correct: input.correct,
        p_total: input.total,
      });
      if (error) throw new Error(error.message);
      const row = (data ?? {}) as Row;
      const newAchievements = ((row.new_achievements as string[]) ?? [])
        .map((aid) => baseAchievements.find((a) => a.id === aid))
        .filter((a): a is Achievement => Boolean(a));
      return {
        xpAwarded: Number(row.xp_awarded ?? 0),
        bonusXp: Number(row.bonus_xp ?? 0),
        alreadyCompleted: Boolean(row.already_completed),
        newAchievements,
        quests: await this.getDailyQuests(),
        totalXp: Number(row.total_xp ?? 0),
        currentStreak: Number(row.current_streak ?? 0),
      };
    },

    async recordGameResult(game: GameSlug, correct: number, total: number): Promise<GameResult> {
      const { data, error } = await sb().rpc("record_game_result", {
        p_game: game,
        p_correct: correct,
        p_total: total,
      });
      if (error) throw new Error(error.message);
      const row = (data ?? {}) as Row;
      return {
        xpAwarded: Number(row.xp_awarded ?? 0),
        capReached: Boolean(row.cap_reached),
        totalXp: Number(row.total_xp ?? 0),
        currentStreak: Number(row.current_streak ?? 0),
      };
    },

    async getXpEvents(limit = 50): Promise<XpEvent[]> {
      const id = await uid().catch(() => null);
      if (!id) return [];
      const { data } = await sb()
        .from("xp_events")
        .select("*")
        .eq("user_id", id)
        .order("created_at", { ascending: false })
        .limit(limit);
      return ((data ?? []) as Row[]).map((e) => ({
        id: String(e.id),
        amount: Number(e.amount),
        source: e.source as XpEvent["source"],
        label: String(e.label ?? ""),
        createdAt: String(e.created_at),
      }));
    },

    async getDailyQuests(): Promise<DailyQuestState[]> {
      const id = await uid().catch(() => null);
      const today = new Date().toISOString().slice(0, 10);
      if (!id) return dailyQuests.map((q) => ({ quest: q, progress: 0, completed: false }));
      const { data } = await sb()
        .from("user_daily_quests")
        .select("quest_id, progress, completed")
        .eq("user_id", id)
        .eq("date", today);
      const rows = (data ?? []) as { quest_id: string; progress: number; completed: boolean }[];
      const map = new Map(rows.map((r) => [String(r.quest_id), r]));
      return dailyQuests.map((q) => {
        const r = map.get(q.id);
        return {
          quest: q,
          progress: Number(r?.progress ?? 0),
          completed: Boolean(r?.completed),
        };
      });
    },

    async getUserVocabulary(): Promise<UserVocabState[]> {
      const id = await uid().catch(() => null);
      if (!id) return [];
      const { data } = await sb()
        .from("user_vocabulary")
        .select("*")
        .eq("user_id", id);
      return ((data ?? []) as Row[]).map((v) => ({
        vocabularyId: String(v.vocabulary_id),
        isFavorite: Boolean(v.is_favorite),
        isLearned: Boolean(v.is_learned),
        reviewCount: Number(v.review_count ?? 0),
        nextReviewAt: (v.next_review_at as string | null) ?? null,
        masteryLevel: Number(v.mastery_level ?? 0),
        wrongCount: Number(v.wrong_count ?? 0),
        lastReviewedAt: (v.last_reviewed_at as string | null) ?? null,
        ease: Number(v.ease_factor ?? 2.5),
        intervalDays: Number(v.interval_days ?? 0),
        repetitions: Number(v.repetitions ?? 0),
      }));
    },

    async setVocabularyFavorite(id, favorite) {
      const userId = await uid();
      await sb()
        .from("user_vocabulary")
        .upsert(
          { user_id: userId, vocabulary_id: id, is_favorite: favorite },
          { onConflict: "user_id,vocabulary_id" },
        );
    },

    async setVocabularyLearned(id, learned) {
      const sbc = sb();
      const userId = await uid();
      const { data: existing } = await sbc
        .from("user_vocabulary")
        .select("*")
        .eq("user_id", userId)
        .eq("vocabulary_id", id)
        .maybeSingle();
      if (learned && existing && !existing.is_learned) {
        await sbc.rpc("learn_vocab", { p_vocab_id: id, p_learned: true });
        return;
      }
      await sbc.from("user_vocabulary").upsert(
        {
          user_id: userId,
          vocabulary_id: id,
          is_learned: learned,
          mastery_level: existing?.mastery_level ?? (learned ? 3 : 0),
          next_review_at: existing?.next_review_at ?? (learned ? new Date(Date.now() + 86400000).toISOString() : null),
        },
        { onConflict: "user_id,vocabulary_id" },
      );
    },

    async reviewWord(id, correct): Promise<ReviewWordResult> {
      const { data, error } = await sb().rpc("review_word", {
        p_vocab_id: id,
        p_correct: correct,
      });
      if (error) throw new Error(error.message);
      const row = (data ?? {}) as Row;
      const v = (row.state ?? {}) as Row;
      return {
        xpAwarded: Number(row.xp_awarded ?? 0),
        state: {
          vocabularyId: id,
          isFavorite: Boolean(v.is_favorite),
          isLearned: Boolean(v.is_learned),
          reviewCount: Number(v.review_count ?? 0),
          nextReviewAt: (v.next_review_at as string | null) ?? null,
          masteryLevel: Number(v.mastery_level ?? 0),
          wrongCount: Number(v.wrong_count ?? 0),
          lastReviewedAt: (v.last_reviewed_at as string | null) ?? null,
          ease: Number(v.ease_factor ?? 2.5),
          intervalDays: Number(v.interval_days ?? 0),
          repetitions: Number(v.repetitions ?? 0),
        },
      };
    },

    async getReviewQueue(): Promise<ReviewQueue> {
      const sbc = sb();
      const id = await uid().catch(() => null);
      if (!id) return { dueWords: [], mistakes: [] };
      const [uvRes, lessonsRes, mistakesRes] = await Promise.all([
        sbc
          .from("user_vocabulary")
          .select("*")
          .eq("user_id", id)
          .lte("next_review_at", new Date().toISOString())
          .order("wrong_count", { ascending: false })
          .limit(200),
        sbc.from("lessons").select("id"),
        sbc.from("mistakes").select("*").eq("user_id", id).order("count", { ascending: false }),
      ]);
      const dueIds = Array.from(
        new Set(((uvRes.data ?? []) as Row[]).map((uv) => String(uv.vocabulary_id))),
      );
      const vocabRes = dueIds.length
        ? await sbc
            .from("vocabulary")
            .select("*")
            .in("id", dueIds)
            .in("status", ["verified", "published"])
        : { data: [] as Row[] };
      const vocabMap = new Map(
        ((vocabRes.data ?? []) as Row[]).map((v) => [String(v.id), v]),
      );
      const dueWords = ((uvRes.data ?? []) as Row[])
        .map((uv) => {
          const raw = vocabMap.get(String(uv.vocabulary_id));
          if (!raw) return null;
          return {
            item: {
              id: String(raw.id),
              russianWord: String(raw.russian_word),
              uzbekTranslation: String(raw.uzbek_translation),
              transliteration: String(raw.transliteration ?? ""),
              partOfSpeech: String(raw.part_of_speech ?? ""),
              exampleRu: String(raw.example_ru ?? ""),
              exampleUz: String(raw.example_uz ?? ""),
              audioUrl: (raw.audio_url as string | null) ?? null,
              level: raw.level as VocabularyItem["level"],
              topic: String(raw.topic ?? ""),
            },
            state: {
              vocabularyId: String(uv.vocabulary_id),
              isFavorite: Boolean(uv.is_favorite),
              isLearned: Boolean(uv.is_learned),
              reviewCount: Number(uv.review_count ?? 0),
              nextReviewAt: (uv.next_review_at as string | null) ?? null,
              masteryLevel: Number(uv.mastery_level ?? 0),
              wrongCount: Number(uv.wrong_count ?? 0),
              lastReviewedAt: (uv.last_reviewed_at as string | null) ?? null,
              ease: Number(uv.ease_factor ?? 2.5),
              intervalDays: Number(uv.interval_days ?? 0),
              repetitions: Number(uv.repetitions ?? 0),
            },
          };
        })
        .filter((x): x is NonNullable<typeof x> => x !== null);

      const lessonIds = new Set(((lessonsRes.data ?? []) as Row[]).map((l) => String(l.id)));
      const { data: questions } = await sbc
        .from("lesson_exercises")
        .select("*")
        .in("id", ((mistakesRes.data ?? []) as Row[]).map((m) => String(m.question_id)));
      const qMap = new Map(((questions ?? []) as Row[]).map((q) => [String(q.id), q]));
      const mistakes = ((mistakesRes.data ?? []) as Row[])
        .filter((m) => lessonIds.has(String(m.lesson_id)))
        .map((m) => {
          const raw = qMap.get(String(m.question_id));
          if (!raw) return null;
          return {
            question: {
              id: String(raw.id),
              lessonId: String(raw.lesson_id),
              orderIndex: Number(raw.order_index),
              type: raw.exercise_type as Question["type"],
              explanationUz: String(raw.explanation_uz ?? ""),
              payload: raw.payload as Question["payload"],
            } as Question,
            count: Number(m.count ?? 1),
          };
        })
        .filter((x): x is NonNullable<typeof x> => x !== null);

      return { dueWords, mistakes };
    },

    async getMistakes(): Promise<MistakeState[]> {
      const id = await uid().catch(() => null);
      if (!id) return [];
      const { data } = await sb()
        .from("mistakes")
        .select("*")
        .eq("user_id", id)
        .order("count", { ascending: false });
      return ((data ?? []) as Row[]).map((m) => ({
        questionId: String(m.question_id),
        lessonId: String(m.lesson_id),
        count: Number(m.count ?? 0),
        lastAt: String(m.last_at ?? m.updated_at ?? ""),
      }));
    },

    async recordMistake(questionId, lessonId) {
      const id = await uid().catch(() => null);
      if (!id) return;
      // Xato qaydini server tomonida oshirish (RPC orqali, xavfsiz)
      await sb().rpc("bump_mistake", {
        p_question_id: questionId,
        p_lesson_id: lessonId,
      });
    },

    async clearMistake(questionId) {
      const id = await uid().catch(() => null);
      if (!id) return;
      await sb().from("mistakes").delete().eq("user_id", id).eq("question_id", questionId);
    },

    async getAchievementStates() {
      const id = await uid().catch(() => null);
      const { data } = id
        ? await sb().from("user_achievements").select("*").eq("user_id", id)
        : { data: [] as Row[] };
      const map = new Map(
        ((data ?? []) as Row[]).map((u) => [
          String(u.achievement_id),
          String(u.unlocked_at),
        ]),
      );
      return baseAchievements.map((a) => ({
        achievement: a,
        unlockedAt: map.get(a.id) ?? null,
      }));
    },

    async getLeaderboard() {
      const me = await uid().catch(() => null);
      const { data } = await sb()
        .from("public_leaderboard")
        .select("*")
        .order("weekly_xp", { ascending: false });
      return ((data ?? []) as Row[]).map((r, i) => ({
        userId: String(r.id),
        username: String(r.username),
        avatarId: String(r.avatar_id ?? "av1"),
        weeklyXp: Number(r.weekly_xp ?? 0),
        totalXp: Number(r.total_xp ?? 0),
        rank: i + 1,
        isCurrentUser: String(r.id) === me,
      }));
    },

    async adminStats(): Promise<AdminStats> {
      const sbc = sb();
      const [users, lessons, questions, vocab, modules, completed, xp] = await Promise.all([
        sbc.from("profiles").select("id", { count: "exact", head: true }),
        sbc.from("lessons").select("id", { count: "exact", head: true }),
        sbc.from("lesson_exercises").select("id", { count: "exact", head: true }),
        sbc.from("vocabulary").select("id", { count: "exact", head: true }),
        sbc.from("modules").select("id", { count: "exact", head: true }),
        sbc.from("lesson_progress").select("id", { count: "exact", head: true }).eq("completed", true),
        sbc.from("profiles").select("total_xp"),
      ]);
      const totalXp = ((xp.data ?? []) as Row[]).reduce((s, r) => s + Number(r.total_xp ?? 0), 0);
      const weekAgo = new Date(Date.now() - 7 * 86400000).toISOString();
      const { data: active } = await sbc
        .from("xp_events")
        .select("user_id")
        .gte("created_at", weekAgo);
      const activeUsers = new Set(
        ((active ?? []) as { user_id: string }[]).map((a) => String(a.user_id)),
      ).size;
      return {
        totalUsers: users.count ?? 0,
        activeUsers,
        completedLessons: completed.count ?? 0,
        totalXp,
        lessonsCount: lessons.count ?? 0,
        questionsCount: questions.count ?? 0,
        vocabularyCount: vocab.count ?? 0,
        modulesCount: modules.count ?? 0,
      };
    },

    async adminIsAdmin() {
      const id = await uid().catch(() => null);
      if (!id) return false;
      const { data } = await sb().from("profiles").select("role").eq("id", id).single();
      return data?.role === "admin";
    },

    async adminListUsers(): Promise<AdminUserRow[]> {
      const { data, error } = await sb().rpc("admin_list_users", { p_limit: 500 });
      if (error) throw new Error(error.message);
      return ((data ?? []) as Row[]).map((r) => ({
        userId: String(r.user_id),
        username: String(r.username ?? ""),
        fullName: String(r.full_name ?? ""),
        email: String(r.email ?? ""),
        role: r.role === "admin" ? "admin" : "user",
        totalXp: Number(r.total_xp ?? 0),
        currentStreak: Number(r.current_streak ?? 0),
        createdAt: String(r.created_at ?? ""),
      }));
    },

    async adminSetRole(userId, role) {
      const { error } = await sb().rpc("admin_set_role", {
        p_user_id: userId,
        p_role: role,
      });
      if (error) return error.message;
      return null;
    },

    async adminGrantAchievement(userId, achievementId) {
      const { error } = await sb().rpc("admin_grant_achievement", {
        p_user_id: userId,
        p_achievement_id: achievementId,
      });
      if (error) return error.message;
      return null;
    },

    async adminResetPassword(userId, newPassword) {
      const { error } = await sb().rpc("admin_reset_password", {
        p_user_id: userId,
        p_new_password: newPassword,
      });
      if (error) return error.message;
      return null;
    },

    async adminSaveLesson(lesson) {
      const { error } = await sb().from("lessons").upsert(
        {
          id: lesson.id,
          module_id: lesson.moduleId,
          order_index: lesson.orderIndex,
          title: lesson.title,
          title_ru: lesson.titleRu,
          description: lesson.description,
          xp_reward: lesson.xpReward,
          estimated_minutes: lesson.estimatedMinutes,
          level: lesson.level ?? "A1",
          objectives: lesson.objectives ?? [],
          grammar_topic: lesson.grammarTopic ?? null,
          grammar_explanation: lesson.grammarExplanation ?? null,
          vocabulary_ids: lesson.vocabularyIds ?? [],
          examples: lesson.examples ?? [],
          reading_text: lesson.readingText ?? null,
          reading_title: lesson.readingTitle ?? null,
          listening_text: lesson.listeningText ?? null,
          prerequisites: lesson.prerequisites ?? [],
          completion_criteria: lesson.completionCriteria ?? { minScore: 70 },
          tags: lesson.tags ?? [],
          status: lesson.status ?? "published",
          published: lesson.published ?? true,
          source: lesson.source ?? "admin",
          exercise_count: lesson.exerciseCount ?? 0,
        },
        { onConflict: "id" },
      );
      return error ? error.message : null;
    },

    async adminDeleteLesson(lessonId) {
      const { error } = await sb().from("lessons").delete().eq("id", lessonId);
      return error ? error.message : null;
    },

    async adminSaveQuestion(question) {
      const { error } = await sb().from("lesson_exercises").upsert(
        {
          id: question.id,
          lesson_id: question.lessonId,
          exercise_type: question.type,
          explanation_uz: question.explanationUz,
          payload: question.payload,
          order_index: question.orderIndex,
          question_text: String(
            (question.payload as unknown as Row).prompt ??
              (question.payload as unknown as Row).promptUz ??
              (question.payload as unknown as Row).source ??
              "",
          ),
          options: (question.payload as unknown as Row).options ?? null,
          correct_answer: (question.payload as unknown as Row).correctIndex ?? null,
        },
        { onConflict: "id" },
      );
      return error ? error.message : null;
    },

    async adminDeleteQuestion(questionId) {
      const { error } = await sb().from("lesson_exercises").delete().eq("id", questionId);
      return error ? error.message : null;
    },

    async adminSaveVocabulary(item) {
      const { error } = await sb()
        .from("vocabulary")
        .upsert(vocabToRow(item), { onConflict: "id" });
      return error ? error.message : null;
    },

    async adminDeleteVocabulary(id) {
      const { error } = await sb().from("vocabulary").delete().eq("id", id);
      return error ? error.message : null;
    },
  };
}
