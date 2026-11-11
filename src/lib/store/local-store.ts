import type {
  Achievement,
  AuthSession,
  ContentReviewItem,
  ContentStatus,
  ImportJob,
  ImportRowError,
  Level,
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
import {
  getLessonById,
  loadQuestionsForLesson,
  modules as baseModules,
  lessons as baseLessons,
  catalogTotals,
} from "@/data/curriculum";
import { vocabulary as baseVocabulary } from "@/data/vocabulary";
import { dailyQuests } from "@/data/quests";
import { demoUsers, DEMO_ADMIN } from "@/data/demo-users";
import {
  applyReview,
  computeStreak,
  findUnlockedAchievements,
  type AchievementStats,
} from "@/lib/store/engine";
import {
  STORE_ERRORS,
  type AppStore,
  type CompleteLessonInput,
  type CompleteLessonResult,
  type DailyQuestState,
  type ProfilePatch,
  type ReviewQueue,
  type ReviewWordResult,
  type AdminStats,
  type VocabularyFacets,
  type ImportVocabularyInput,
  type ImportBatchResult,
  type ContentCounts,
} from "@/lib/store/types";
import {
  normalizeImportRow,
  vocabKey,
} from "@/lib/content-import";
import { categoryTitleUz, VOCAB_CATEGORIES } from "@/data/vocabulary/categories";
import { localDateKey, todayKey, uid, weekStartKey } from "@/lib/utils";

// --------------------------------------------------------------------------
// DEMO rejimi: brauzer localStorage da to'liq ishlaydigan store
// --------------------------------------------------------------------------

const DB_KEY = "rusgo:db:v1";

interface UserState {
  onboarded: boolean;
  lessonProgress: Record<string, LessonProgress>;
  xpEvents: XpEvent[];
  vocab: Record<string, UserVocabState>;
  achievements: Record<string, string>; // achievementId -> unlockedAt
  quests: Record<string, Record<string, { progress: number; completed: boolean }>>;
  mistakes: Record<string, MistakeState>;
  lastActiveDate: string | null;
}

interface LocalAccount {
  id: string;
  email: string;
  password: string;
  createdAt: string;
  profile: Profile;
  state: UserState;
}

interface ContentOverrides {
  lessonOverrides: Record<string, Lesson>;
  customLessons: Lesson[];
  deletedLessonIds: string[];
  questionOverrides: Record<string, Question>;
  customQuestions: Question[];
  deletedQuestionIds: string[];
  customVocabulary: VocabularyItem[];
  deletedVocabIds: string[];
  importJobs: ImportJob[];
  importErrors: Record<string, ImportRowError[]>;
}

interface LocalDb {
  accounts: LocalAccount[];
  sessionId: string | null;
  content: ContentOverrides;
}

function emptyState(): UserState {
  return {
    onboarded: false,
    lessonProgress: {},
    xpEvents: [],
    vocab: {},
    achievements: {},
    quests: {},
    mistakes: {},
    lastActiveDate: null,
  };
}

function emptyContent(): ContentOverrides {
  return {
    lessonOverrides: {},
    customLessons: [],
    deletedLessonIds: [],
    questionOverrides: {},
    customQuestions: [],
    deletedQuestionIds: [],
    customVocabulary: [],
    deletedVocabIds: [],
    importJobs: [],
    importErrors: {},
  };
}

// --------------------------------------------------------------------------
// Demo seed
// --------------------------------------------------------------------------

function makeProfile(p: Partial<Profile> & { id: string; username: string; fullName: string; email: string }): Profile {
  return {
    avatarId: "av1",
    role: "user",
    currentLevel: "A1",
    totalXp: 0,
    currentStreak: 0,
    longestStreak: 0,
    dailyGoal: 30,
    soundEnabled: true,
    notificationsEnabled: true,
    heartsEnabled: true,
    onboarding: null,
    createdAt: new Date().toISOString(),
    ...p,
  };
}

function spreadXpEvents(seedId: string, weeklyXp: number, totalXp: number): XpEvent[] {
  const events: XpEvent[] = [];
  const now = new Date();
  const weekStart = new Date(weekStartKey() + "T00:00:00");
  const todayIdx = Math.max(
    0,
    Math.round((new Date(localDateKey() + "T00:00:00").getTime() - weekStart.getTime()) / 86400000),
  );
  const days = todayIdx + 1;
  const perDay = Math.floor(weeklyXp / days);
  for (let d = 0; d < days; d++) {
    const date = new Date(weekStart.getTime() + d * 86400000);
    if (date > now) break;
    const amount = d === days - 1 ? weeklyXp - perDay * (days - 1) : perDay;
    if (amount <= 0) continue;
    events.push({
      id: `${seedId}_w${d}`,
      amount,
      source: "lesson",
      label: "Dars (demo)",
      createdAt: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12, 30).toISOString(),
    });
  }
  const older = totalXp - weeklyXp;
  if (older > 0) {
    const d = new Date(now.getTime() - 25 * 86400000);
    events.push({
      id: `${seedId}_old`,
      amount: older,
      source: "lesson",
      label: "Darslar (demo)",
      createdAt: d.toISOString(),
    });
  }
  return events;
}

function seedDb(): LocalDb {
  const accounts: LocalAccount[] = [];

  // Namuna foydalanuvchilar (reyting uchun)
  for (const u of demoUsers) {
    accounts.push({
      id: u.id,
      email: u.email,
      password: "demo1234",
      createdAt: new Date(Date.now() - 40 * 86400000).toISOString(),
      profile: makeProfile({
        id: u.id,
        username: u.username,
        fullName: u.fullName,
        email: u.email,
        avatarId: u.avatarId,
        totalXp: u.totalXp,
        currentStreak: u.currentStreak,
        longestStreak: u.currentStreak + 3,
        dailyGoal: 30,
        currentLevel: "A1",
      }),
      state: {
        ...emptyState(),
        onboarded: true,
        xpEvents: spreadXpEvents(u.id, u.weeklyXp, u.totalXp),
        lastActiveDate: todayKey(),
      },
    });
  }

  // Admin hisobi (demo rejimida xavfsiz kirish uchun — README da yozilgan)
  accounts.push({
    id: DEMO_ADMIN.id,
    email: DEMO_ADMIN.email,
    password: DEMO_ADMIN.password,
    createdAt: new Date(Date.now() - 60 * 86400000).toISOString(),
    profile: makeProfile({
      id: DEMO_ADMIN.id,
      username: DEMO_ADMIN.username,
      fullName: DEMO_ADMIN.fullName,
      email: DEMO_ADMIN.email,
      avatarId: "av12",
      role: "admin",
      totalXp: 0,
      dailyGoal: 20,
    }),
    state: emptyState(),
  });

  return { accounts, sessionId: null, content: emptyContent() };
}

// --------------------------------------------------------------------------
// Persist qilish
// --------------------------------------------------------------------------

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function loadDb(): LocalDb | null {
  if (!isBrowser()) return null;
  try {
    const raw = window.localStorage.getItem(DB_KEY);
    if (!raw) {
      const fresh = seedDb();
      window.localStorage.setItem(DB_KEY, JSON.stringify(fresh));
      return fresh;
    }
    const parsed = JSON.parse(raw) as LocalDb;
    if (!parsed.accounts || !parsed.content) throw new Error("corrupt");
    // Eski versiyalarni to'ldirish
    if (!parsed.content.lessonOverrides) parsed.content = emptyContent();
    if (!parsed.content.importJobs) parsed.content.importJobs = [];
    if (!parsed.content.importErrors) parsed.content.importErrors = {};
    for (const acc of parsed.accounts) {
      if (!acc.state) acc.state = emptyState();
      if (!acc.state.quests) acc.state.quests = {};
      if (!acc.state.mistakes) acc.state.mistakes = {};
      if (!acc.state.vocab) acc.state.vocab = {};
      if (!acc.state.achievements) acc.state.achievements = {};
      if (!acc.state.xpEvents) acc.state.xpEvents = [];
      if (!acc.state.lessonProgress) acc.state.lessonProgress = {};
      if (acc.profile.soundEnabled === undefined) {
        acc.profile = { ...acc.profile, soundEnabled: true, notificationsEnabled: true, heartsEnabled: true };
      }
    }
    return parsed;
  } catch {
    const fresh = seedDb();
    window.localStorage.setItem(DB_KEY, JSON.stringify(fresh));
    return fresh;
  }
}

function saveDb(db: LocalDb): void {
  if (!isBrowser()) return;
  window.localStorage.setItem(DB_KEY, JSON.stringify(db));
}

// --------------------------------------------------------------------------
// Yordamchilar
// --------------------------------------------------------------------------

function currentAccount(db: LocalDb): LocalAccount | null {
  if (!db.sessionId) return null;
  return db.accounts.find((a) => a.id === db.sessionId) ?? null;
}

function addXp(acc: LocalAccount, amount: number, source: XpEvent["source"], label: string): void {
  if (amount <= 0) return;
  acc.state.xpEvents.unshift({
    id: uid("xp"),
    amount,
    source,
    label,
    createdAt: new Date().toISOString(),
  });
  acc.profile.totalXp += amount;
}

function statsOf(acc: LocalAccount): AchievementStats {
  const progress = Object.values(acc.state.lessonProgress);
  return {
    lessonsCompleted: progress.filter((p) => p.completed).length,
    perfectLessons: progress.filter((p) => p.completed && p.bestScore === 100).length,
    totalXp: acc.profile.totalXp,
    streak: acc.profile.currentStreak,
    wordsLearned: Object.values(acc.state.vocab).filter((v) => v.isLearned).length,
  };
}

function unlockAchievements(acc: LocalAccount): Achievement[] {
  const unlocked: Achievement[] = [];
  for (let i = 0; i < 10; i++) {
    const stats = statsOf(acc);
    const found = findUnlockedAchievements(stats, new Set(Object.keys(acc.state.achievements)));
    if (found.length === 0) break;
    for (const a of found) {
      acc.state.achievements[a.id] = new Date().toISOString();
      addXp(acc, a.xpReward, "achievement", `Yutuq: ${a.title}`);
      unlocked.push(a);
    }
  }
  return unlocked;
}

function bumpQuest(
  acc: LocalAccount,
  questType: "lessons" | "words" | "reviews",
  amount: number,
): void {
  if (amount <= 0) return;
  const date = todayKey();
  const day = acc.state.quests[date] ?? {};
  for (const quest of dailyQuests) {
    if (quest.questType !== questType) continue;
    const cur = day[quest.id] ?? { progress: 0, completed: false };
    if (cur.completed) continue;
    const progress = Math.min(quest.targetValue, cur.progress + amount);
    const completed = progress >= quest.targetValue;
    day[quest.id] = { progress, completed };
    if (completed && !cur.completed) {
      addXp(acc, quest.xpReward, "quest", `Vazifa: ${quest.title}`);
    }
  }
  acc.state.quests[date] = day;
}

function applyActivity(acc: LocalAccount): void {
  const res = computeStreak(
    acc.profile.currentStreak,
    acc.profile.longestStreak,
    acc.state.lastActiveDate,
  );
  acc.profile.currentStreak = res.current;
  if (res.longest > acc.profile.longestStreak) acc.profile.longestStreak = res.longest;
  acc.state.lastActiveDate = todayKey();
}

// --------------------------------------------------------------------------
// Kontent merge (bazaviy + admin o'zgarishlari)
// --------------------------------------------------------------------------

function effectiveLessons(c: ContentOverrides): Lesson[] {
  const deleted = new Set(c.deletedLessonIds);
  const byId = new Map<string, Lesson>();
  for (const l of baseLessons) if (!deleted.has(l.id)) byId.set(l.id, l);
  for (const [id, l] of Object.entries(c.lessonOverrides)) if (byId.has(id)) byId.set(id, l);
  for (const l of c.customLessons) if (!deleted.has(l.id)) byId.set(l.id, l);
  return Array.from(byId.values());
}

/** O'quvchiga ko'rinadigan darslar: faqat nashr etilgan va published */
function isVisibleLesson(l: Lesson): boolean {
  return (l.status ?? "published") === "published" && l.published !== false;
}

async function effectiveQuestions(
  c: ContentOverrides,
  lessonId: string,
): Promise<Question[]> {
  const deleted = new Set(c.deletedQuestionIds);
  const byId = new Map<string, Question>();
  const baseQuestions = await loadQuestionsForLesson(lessonId);
  for (const q of baseQuestions) {
    if (q.lessonId !== lessonId || deleted.has(q.id)) continue;
    byId.set(q.id, q);
  }
  for (const [id, q] of Object.entries(c.questionOverrides)) {
    if (q.lessonId === lessonId && byId.has(id)) byId.set(id, q);
  }
  for (const q of c.customQuestions) {
    if (q.lessonId === lessonId && !deleted.has(q.id)) byId.set(q.id, q);
  }
  return Array.from(byId.values()).sort((a, b) => a.orderIndex - b.orderIndex);
}

function effectiveVocabulary(c: ContentOverrides): VocabularyItem[] {
  const deleted = new Set(c.deletedVocabIds);
  const byId = new Map<string, VocabularyItem>();
  for (const v of baseVocabulary) if (!deleted.has(v.id)) byId.set(v.id, v);
  for (const v of c.customVocabulary) if (!deleted.has(v.id)) byId.set(v.id, v);
  return Array.from(byId.values());
}

// --------------------------------------------------------------------------
// Lug'at qidiruvi (demo rejimida brauzer ichida filtrlanadi; Supabase rejimida
// xuddi shu parametrlar SQL RPC orqali serverda bajariladi)
// --------------------------------------------------------------------------

function isVisibleVocab(v: VocabularyItem): boolean {
  return v.status === "verified" || v.status === "published";
}

function vocabHaystack(v: VocabularyItem): string {
  return [
    v.russianWord,
    v.uzbekTranslation,
    v.transliteration,
    ...(v.meanings ?? []).map((m) => m.uz),
    ...(v.synonyms ?? []),
    ...(v.antonyms ?? []),
    ...(v.categories ?? []).map((c) => categoryTitleUz(c)),
    v.topic,
  ]
    .join(" ")
    .toLowerCase();
}

function filterVocabList(
  items: VocabularyItem[],
  query: VocabularyQuery,
  states: Record<string, UserVocabState>,
  visibleOnly: boolean,
): VocabularyItem[] {
  const q = (query.query ?? "").trim().toLowerCase();
  const level = query.level ?? "all";
  const category = query.category ?? "all";
  const pos = query.partOfSpeech ?? "all";
  const type = query.entryType ?? "all";
  return items.filter((v) => {
    if (visibleOnly && !isVisibleVocab(v)) return false;
    if (level !== "all" && v.level !== level) return false;
    if (category !== "all" && !(v.categories ?? []).includes(category)) return false;
    if (pos !== "all" && v.partOfSpeech !== pos) return false;
    if (type !== "all" && (v.entryType ?? "lemma") !== type) return false;
    if (query.onlyFavorites && !states[v.id]?.isFavorite) return false;
    if (query.onlyLearned && !states[v.id]?.isLearned) return false;
    if (!q) return true;
    return vocabHaystack(v).includes(q);
  });
}

function sortVocabList(items: VocabularyItem[], sort: VocabularyQuery["sort"]): VocabularyItem[] {
  const sorted = [...items];
  switch (sort) {
    case "alphabet":
      return sorted.sort((a, b) => a.russianWord.localeCompare(b.russianWord, "ru"));
    case "level":
      return sorted.sort(
        (a, b) =>
          LEVEL_INDEX_LOCAL[a.level] - LEVEL_INDEX_LOCAL[b.level] ||
          a.russianWord.localeCompare(b.russianWord, "ru"),
      );
    case "recent": {
      const time = (v: VocabularyItem) =>
        v.verifiedAt ? new Date(v.verifiedAt).getTime() : 0;
      return sorted.sort((a, b) => time(b) - time(a));
    }
    default:
      return sorted.sort((a, b) => {
        const fa = a.frequencyRank ?? Number.MAX_SAFE_INTEGER;
        const fb = b.frequencyRank ?? Number.MAX_SAFE_INTEGER;
        return fa - fb || a.russianWord.localeCompare(b.russianWord, "ru");
      });
  }
}

const LEVEL_INDEX_LOCAL: Record<Level, number> = {
  A1: 1, A2: 2, B1: 3, B2: 4, C1: 5, C2: 6,
};

function paginate<T>(items: T[], page: number, pageSize: number): T[] {
  const safePage = Math.max(1, Math.floor(page || 1));
  const safeSize = Math.max(1, Math.floor(pageSize || 24));
  const start = (safePage - 1) * safeSize;
  return items.slice(start, start + safeSize);
}

// --------------------------------------------------------------------------
// Store implementatsiyasi
// --------------------------------------------------------------------------

export function createLocalStore(): AppStore {
  return {
    async signUp({ email, password, username, fullName }) {
      const db = loadDb();
      if (!db) return STORE_ERRORS.noSession;
      const mail = email.trim().toLowerCase();
      if (password.length < 6) return STORE_ERRORS.weakPassword;
      if (username.trim().length < 3) return STORE_ERRORS.usernameShort;
      if (db.accounts.some((a) => a.email.toLowerCase() === mail)) return STORE_ERRORS.emailInUse;
      if (db.accounts.some((a) => a.profile.username.toLowerCase() === username.trim().toLowerCase()))
        return STORE_ERRORS.usernameTaken;

      const id = uid("user");
      const profile = makeProfile({
        id,
        username: username.trim(),
        fullName: fullName.trim(),
        email: mail,
        avatarId: "av4",
      });
      db.accounts.push({
        id,
        email: mail,
        password,
        createdAt: new Date().toISOString(),
        profile,
        state: emptyState(),
      });
      db.sessionId = id;
      saveDb(db);
      return null;
    },

    async signIn(email, password) {
      const db = loadDb();
      if (!db) return STORE_ERRORS.noSession;
      const mail = email.trim().toLowerCase();
      const acc = db.accounts.find(
        (a) => a.email.toLowerCase() === mail && a.password === password,
      );
      if (!acc) return STORE_ERRORS.invalidLogin;
      db.sessionId = acc.id;
      saveDb(db);
      return null;
    },

    async signOut() {
      const db = loadDb();
      if (!db) return;
      db.sessionId = null;
      saveDb(db);
    },

    async getSession(): Promise<AuthSession | null> {
      const db = loadDb();
      if (!db) return null;
      const acc = currentAccount(db);
      return acc ? { user: { id: acc.id, email: acc.email } } : null;
    },

    async getProfile(): Promise<Profile | null> {
      const db = loadDb();
      if (!db) return null;
      return currentAccount(db)?.profile ?? null;
    },

    async updateProfile(patch: ProfilePatch): Promise<string | null> {
      const db = loadDb();
      if (!db) return STORE_ERRORS.noSession;
      const acc = currentAccount(db);
      if (!acc) return STORE_ERRORS.noSession;
      if (patch.username !== undefined) {
        const u = patch.username.trim();
        if (u.length < 3) return STORE_ERRORS.usernameShort;
        if (
          db.accounts.some(
            (a) => a.id !== acc.id && a.profile.username.toLowerCase() === u.toLowerCase(),
          )
        )
          return STORE_ERRORS.usernameTaken;
        patch = { ...patch, username: u };
      }
      acc.profile = { ...acc.profile, ...patch };
      saveDb(db);
      return null;
    },

    async completeOnboarding(data: OnboardingData): Promise<string | null> {
      const db = loadDb();
      if (!db) return STORE_ERRORS.noSession;
      const acc = currentAccount(db);
      if (!acc) return STORE_ERRORS.noSession;
      const levelMap: Record<string, Level> = {
        none: "A1",
        basic: "A1",
        medium: "A2",
        advanced: "B2",
      };
      acc.profile = {
        ...acc.profile,
        onboarding: data,
        currentLevel: levelMap[data.level] ?? "A1",
      };
      acc.state.onboarded = true;
      saveDb(db);
      return null;
    },

    async getModules(): Promise<Module[]> {
      return baseModules;
    },

    async getLessons(): Promise<Lesson[]> {
      const db = loadDb();
      const acc = db ? currentAccount(db) : null;
      const isAdmin = acc?.profile.role === "admin";
      if (!db) return baseLessons.filter(isVisibleLesson);
      const all = effectiveLessons(db.content);
      return isAdmin ? all : all.filter(isVisibleLesson);
    },

    async getQuestions(lessonId: string): Promise<Question[]> {
      const db = loadDb();
      if (!db) return loadQuestionsForLesson(lessonId);
      return effectiveQuestions(db.content, lessonId);
    },

    async getVocabulary(): Promise<VocabularyItem[]> {
      const db = loadDb();
      if (!db) return baseVocabulary;
      return effectiveVocabulary(db.content);
    },

    async searchVocabulary(query: VocabularyQuery): Promise<VocabularySearchResult> {
      const db = loadDb();
      const items = db ? effectiveVocabulary(db.content) : baseVocabulary;
      const acc = db ? currentAccount(db) : null;
      const states = acc?.state.vocab ?? {};
      const page = Math.max(1, query.page ?? 1);
      const pageSize = Math.max(1, query.pageSize ?? 24);
      const filtered = sortVocabList(
        filterVocabList(items, query, states, true),
        query.sort,
      );
      const levelCounts: Record<string, number> = {};
      for (const v of filtered) levelCounts[v.level] = (levelCounts[v.level] ?? 0) + 1;
      return {
        items: paginate(filtered, page, pageSize),
        total: filtered.length,
        page,
        pageSize,
        levelCounts,
      };
    },

    async getVocabularyFacets(): Promise<VocabularyFacets> {
      const db = loadDb();
      const items = (db ? effectiveVocabulary(db.content) : baseVocabulary).filter(
        isVisibleVocab,
      );
      const catCounts = new Map<string, number>();
      const posCounts = new Map<string, number>();
      const typeCounts = new Map<string, number>();
      for (const v of items) {
        for (const c of v.categories ?? []) {
          catCounts.set(c, (catCounts.get(c) ?? 0) + 1);
        }
        posCounts.set(v.partOfSpeech, (posCounts.get(v.partOfSpeech) ?? 0) + 1);
        const t = v.entryType ?? "lemma";
        typeCounts.set(t, (typeCounts.get(t) ?? 0) + 1);
      }
      return {
        categories: VOCAB_CATEGORIES.map((c) => ({
          slug: c.slug,
          titleUz: c.titleUz,
          count: catCounts.get(c.slug) ?? 0,
        })).sort((a, b) => b.count - a.count),
        partsOfSpeech: Array.from(posCounts.entries())
          .map(([value, count]) => ({ value, count }))
          .sort((a, b) => b.count - a.count),
        entryTypes: Array.from(typeCounts.entries())
          .map(([value, count]) => ({ value, count }))
          .sort((a, b) => b.count - a.count),
      };
    },

    async getVocabularySuggestions(query: string, limit = 8): Promise<string[]> {
      const q = query.trim().toLowerCase();
      if (q.length < 1) return [];
      const db = loadDb();
      const items = (db ? effectiveVocabulary(db.content) : baseVocabulary).filter(
        isVisibleVocab,
      );
      const out: string[] = [];
      const seen = new Set<string>();
      const push = (s: string) => {
        const key = s.toLowerCase();
        if (seen.has(key) || out.length >= limit) return;
        seen.add(key);
        out.push(s);
      };
      for (const v of items) {
        if (v.russianWord.toLowerCase().startsWith(q)) push(v.russianWord);
      }
      for (const v of items) {
        if (v.uzbekTranslation.toLowerCase().startsWith(q)) push(v.uzbekTranslation);
      }
      for (const v of items) {
        if (v.russianWord.toLowerCase().includes(q)) push(v.russianWord);
      }
      return out;
    },

    async getVocabularyByIds(ids: string[]): Promise<VocabularyItem[]> {
      const db = loadDb();
      const items = db ? effectiveVocabulary(db.content) : baseVocabulary;
      const byId = new Map(items.map((v) => [v.id, v]));
      return ids.map((id) => byId.get(id)).filter((v): v is VocabularyItem => Boolean(v));
    },

    async importVocabularyBatch(input: ImportVocabularyInput): Promise<ImportBatchResult> {
      const db = loadDb();
      if (!db) throw new Error(STORE_ERRORS.noSession);
      const acc = currentAccount(db);
      if (!acc || acc.profile.role !== "admin") throw new Error("Ruxsat yo'q.");

      let job = input.jobId
        ? db.content.importJobs.find((j) => j.id === input.jobId)
        : undefined;
      if (!job) {
        job = {
          id: input.jobId ?? `job-${Date.now()}-${Math.floor(Math.random() * 9999)}`,
          fileName: input.fileName,
          format: input.format,
          totalRows: input.totalRows,
          processedRows: 0,
          imported: 0,
          updated: 0,
          duplicates: 0,
          failed: 0,
          status: "running",
          createdAt: new Date().toISOString(),
          finishedAt: null,
          defaultStatus: input.defaultStatus,
          createdBy: acc.id,
        };
        db.content.importJobs.unshift(job);
        db.content.importErrors[job.id] = [];
      }

      const existing = new Map<string, VocabularyItem>();
      for (const v of effectiveVocabulary(db.content)) existing.set(vocabKey(v), v);
      const seenInBatch = new Set<string>();
      const errors: ImportRowError[] = [];
      let imported = 0;
      let updated = 0;
      let duplicates = 0;

      input.rows.forEach((raw, i) => {
        const rowNumber = job!.processedRows + i + 2;
        const res = normalizeImportRow(raw, rowNumber, input.defaultStatus);
        if (res.error || !res.item) {
          if (res.error) errors.push(res.error);
          return;
        }
        const item = res.item;
        const key = vocabKey(item);
        if (seenInBatch.has(key)) {
          duplicates++;
          errors.push({
            row: rowNumber,
            message: `Dublikat (shu import ichida): ${item.russianWord}.`,
            raw: item.russianWord,
          });
          return;
        }
        seenInBatch.add(key);
        const prev = existing.get(key);
        if (prev) {
          // Tekshirilgan bazaviy yozuvni avtomatik bosib yozmaymiz.
          if (prev.id.startsWith("imp-") || prev.status === "pending" || prev.status === "draft") {
            const idx = db.content.customVocabulary.findIndex((v) => v.id === prev.id);
            const merged: VocabularyItem = {
              ...item,
              id: prev.id,
              status: input.defaultStatus,
            };
            if (idx >= 0) db.content.customVocabulary[idx] = merged;
            else db.content.customVocabulary.push(merged);
            existing.set(key, merged);
            updated++;
          } else {
            duplicates++;
            errors.push({
              row: rowNumber,
              message: `Allaqachon mavjud: «${item.russianWord}» (${prev.status}).`,
              raw: item.russianWord,
            });
          }
          return;
        }
        db.content.customVocabulary.push(item);
        existing.set(key, item);
        imported++;
      });

      job.processedRows = Math.min(
        job.totalRows,
        job.processedRows + input.rows.length,
      );
      job.imported += imported;
      job.updated += updated;
      job.duplicates += duplicates;
      job.failed += errors.length;
      db.content.importErrors[job.id] = [
        ...(db.content.importErrors[job.id] ?? []),
        ...errors,
      ];
      if (job.processedRows >= job.totalRows) {
        job.status = job.failed > 0 ? "partial" : "completed";
        job.finishedAt = new Date().toISOString();
      }
      saveDb(db);
      return { job: { ...job }, imported, updated, duplicates, errors };
    },

    async getImportJobs(): Promise<ImportJob[]> {
      const db = loadDb();
      if (!db) return [];
      return [...db.content.importJobs].sort((a, b) =>
        b.createdAt.localeCompare(a.createdAt),
      );
    },

    async getImportErrors(jobId: string): Promise<ImportRowError[]> {
      const db = loadDb();
      if (!db) return [];
      return db.content.importErrors[jobId] ?? [];
    },

    async deleteImportJob(jobId: string): Promise<void> {
      const db = loadDb();
      if (!db) return;
      const acc = currentAccount(db);
      if (!acc || acc.profile.role !== "admin") return;
      db.content.importJobs = db.content.importJobs.filter((j) => j.id !== jobId);
      delete db.content.importErrors[jobId];
      saveDb(db);
    },

    async exportVocabulary(query: VocabularyQuery): Promise<VocabularyItem[]> {
      const db = loadDb();
      const items = db ? effectiveVocabulary(db.content) : baseVocabulary;
      const acc = db ? currentAccount(db) : null;
      return sortVocabList(
        filterVocabList(items, query, acc?.state.vocab ?? {}, false),
        query.sort,
      );
    },

    async getContentReviews(
      status: ContentStatus | "all" = "all",
    ): Promise<ContentReviewItem[]> {
      const db = loadDb();
      const vocabItems = db ? effectiveVocabulary(db.content) : baseVocabulary;
      const lessonItems = db ? effectiveLessons(db.content) : baseLessons;
      const reviews: ContentReviewItem[] = [];

      for (const v of vocabItems) {
        const st = v.status ?? "verified";
        if (status !== "all" && st !== status) continue;
        reviews.push({
          kind: "vocabulary",
          id: v.id,
          title: v.russianWord,
          subtitle: v.uzbekTranslation,
          level: v.level,
          status: st,
          updatedAt: v.verifiedAt ?? "",
          details: [
            v.partOfSpeech,
            (v.categories ?? []).map(categoryTitleUz).join(", "),
            v.source ?? "",
          ]
            .filter(Boolean)
            .join(" · "),
        });
      }
      for (const l of lessonItems) {
        const st = l.status ?? "published";
        if (status !== "all" && st !== status) continue;
        reviews.push({
          kind: "lesson",
          id: l.id,
          title: `${l.titleRu} — ${l.title}`,
          subtitle: l.description,
          level: l.level ?? "A1",
          status: st,
          updatedAt: "",
          details: `${l.moduleId} · ${l.exerciseCount ?? 0} mashq · ${l.source ?? ""}`,
        });
      }

      const priority: Record<ContentStatus, number> = {
        pending: 0,
        draft: 1,
        rejected: 2,
        verified: 3,
        published: 4,
      };
      return reviews.sort(
        (a, b) =>
          priority[a.status] - priority[b.status] ||
          b.updatedAt.localeCompare(a.updatedAt),
      );
    },

    async setContentStatus(
      kind: "vocabulary" | "lesson",
      id: string,
      status: ContentStatus,
    ): Promise<string | null> {
      const db = loadDb();
      if (!db) return STORE_ERRORS.noSession;
      const acc = currentAccount(db);
      if (!acc || acc.profile.role !== "admin") return "Ruxsat yo'q.";

      if (kind === "vocabulary") {
        const item = effectiveVocabulary(db.content).find((v) => v.id === id);
        if (!item) return STORE_ERRORS.notFound;
        const next: VocabularyItem = {
          ...item,
          status,
          verifiedAt:
            status === "verified" || status === "published"
              ? new Date().toISOString()
              : item.verifiedAt ?? null,
        };
        const idx = db.content.customVocabulary.findIndex((v) => v.id === id);
        if (idx >= 0) db.content.customVocabulary[idx] = next;
        else db.content.customVocabulary.push(next);
      } else {
        const lesson = effectiveLessons(db.content).find((l) => l.id === id);
        if (!lesson) return STORE_ERRORS.notFound;
        const next: Lesson = {
          ...lesson,
          status,
          published: status === "published",
        };
        if (baseLessons.some((l) => l.id === id)) {
          db.content.lessonOverrides[id] = next;
        } else {
          const idx = db.content.customLessons.findIndex((l) => l.id === id);
          if (idx >= 0) db.content.customLessons[idx] = next;
          else db.content.customLessons.push(next);
        }
      }
      saveDb(db);
      return null;
    },

    async getContentCounts(): Promise<ContentCounts> {
      const db = loadDb();
      const vocabItems = db ? effectiveVocabulary(db.content) : baseVocabulary;
      const lessonItems = db ? effectiveLessons(db.content) : baseLessons;
      const empty = (): Record<ContentStatus, number> => ({
        draft: 0,
        pending: 0,
        verified: 0,
        published: 0,
        rejected: 0,
      });
      const vocabulary = empty();
      for (const v of vocabItems) vocabulary[v.status ?? "verified"]++;
      const lessonsCount = empty();
      for (const l of lessonItems) lessonsCount[l.status ?? "published"]++;
      return {
        vocabulary,
        lessons: lessonsCount,
        pendingImports: db
          ? db.content.importJobs.filter((j) => j.status === "running").length
          : 0,
      };
    },

    async getLessonProgress(): Promise<LessonProgress[]> {
      const db = loadDb();
      if (!db) return [];
      const acc = currentAccount(db);
      if (!acc) return [];
      return Object.values(acc.state.lessonProgress);
    },

    async completeLesson(input: CompleteLessonInput): Promise<CompleteLessonResult> {
      const db = loadDb();
      if (!db) throw new Error(STORE_ERRORS.noSession);
      const acc = currentAccount(db);
      if (!acc) throw new Error(STORE_ERRORS.noSession);

      const lesson =
        effectiveLessons(db.content).find((l) => l.id === input.lessonId) ??
        getLessonById(input.lessonId);
      if (!lesson) throw new Error(STORE_ERRORS.notFound);

      const prev = acc.state.lessonProgress[input.lessonId];
      const alreadyCompleted = Boolean(prev?.completed);
      const score =
        input.total > 0 ? Math.round((input.correct / input.total) * 100) : 0;

      let xpAwarded = 0;
      let bonusXp = 0;

      if (!alreadyCompleted) {
        xpAwarded = lesson.xpReward;
        if (score === 100) bonusXp = 5;
        addXp(acc, xpAwarded, "lesson", `Dars: ${lesson.title}`);
        if (bonusXp > 0) addXp(acc, bonusXp, "perfect_bonus", "Mukammal dars (+5)");
      }

      acc.state.lessonProgress[input.lessonId] = {
        lessonId: input.lessonId,
        completed: true,
        bestScore: Math.max(prev?.bestScore ?? 0, score),
        correctCount: Math.max(prev?.correctCount ?? 0, input.correct),
        totalQuestions: input.total,
        xpEarned: (prev?.xpEarned ?? 0) + xpAwarded + bonusXp,
        completedAt: new Date().toISOString(),
      };

      applyActivity(acc);
      bumpQuest(acc, "lessons", 1);
      const newAchievements = unlockAchievements(acc);

      saveDb(db);

      return {
        xpAwarded,
        bonusXp,
        alreadyCompleted,
        newAchievements,
        quests: await this.getDailyQuests(),
        totalXp: acc.profile.totalXp,
        currentStreak: acc.profile.currentStreak,
      };
    },

    async getXpEvents(limit = 50) {
      const db = loadDb();
      if (!db) return [];
      const acc = currentAccount(db);
      if (!acc) return [];
      return acc.state.xpEvents.slice(0, limit);
    },

    async getDailyQuests(): Promise<DailyQuestState[]> {
      const db = loadDb();
      if (!db) return dailyQuests.map((q) => ({ quest: q, progress: 0, completed: false }));
      const acc = currentAccount(db);
      const day = acc?.state.quests[todayKey()] ?? {};
      return dailyQuests.map((q) => ({
        quest: q,
        progress: day[q.id]?.progress ?? 0,
        completed: day[q.id]?.completed ?? false,
      }));
    },

    async getUserVocabulary(): Promise<UserVocabState[]> {
      const db = loadDb();
      if (!db) return [];
      const acc = currentAccount(db);
      if (!acc) return [];
      return Object.values(acc.state.vocab);
    },

    async setVocabularyFavorite(id, favorite) {
      const db = loadDb();
      if (!db) return;
      const acc = currentAccount(db);
      if (!acc) return;
      const cur = acc.state.vocab[id] ?? {
        vocabularyId: id,
        isFavorite: false,
        isLearned: false,
        reviewCount: 0,
        nextReviewAt: null,
        masteryLevel: 0,
        wrongCount: 0,
        lastReviewedAt: null,
      };
      acc.state.vocab[id] = { ...cur, isFavorite: favorite };
      saveDb(db);
    },

    async setVocabularyLearned(id, learned) {
      const db = loadDb();
      if (!db) return;
      const acc = currentAccount(db);
      if (!acc) return;
      const cur = acc.state.vocab[id] ?? {
        vocabularyId: id,
        isFavorite: false,
        isLearned: false,
        reviewCount: 0,
        nextReviewAt: null,
        masteryLevel: 0,
        wrongCount: 0,
        lastReviewedAt: null,
      };
      const wasLearned = cur.isLearned;
      acc.state.vocab[id] = {
        ...cur,
        isLearned: learned,
        masteryLevel: learned ? Math.max(cur.masteryLevel, 3) : cur.masteryLevel,
        nextReviewAt: learned
          ? cur.nextReviewAt ?? new Date(Date.now() + 86400000).toISOString()
          : cur.nextReviewAt,
      };
      if (learned && !wasLearned) {
        bumpQuest(acc, "words", 1);
        applyActivity(acc);
        unlockAchievements(acc);
      }
      saveDb(db);
    },

    async reviewWord(id, correct): Promise<ReviewWordResult> {
      const db = loadDb();
      if (!db) throw new Error(STORE_ERRORS.noSession);
      const acc = currentAccount(db);
      if (!acc) throw new Error(STORE_ERRORS.noSession);

      const cur = acc.state.vocab[id] ?? {
        vocabularyId: id,
        isFavorite: false,
        isLearned: false,
        reviewCount: 0,
        nextReviewAt: null,
        masteryLevel: 0,
        wrongCount: 0,
        lastReviewedAt: null,
      };
      const { state } = applyReview(cur, correct);
      acc.state.vocab[id] = state;

      // Xato → takrorlash navbatidagi xatolar ro'yxatiga qaytadi
      if (!correct) {
        const lessonId = "";
        acc.state.mistakes[`vocab_${id}`] = {
          questionId: `vocab_${id}`,
          lessonId,
          count: (acc.state.mistakes[`vocab_${id}`]?.count ?? 0) + 1,
          lastAt: new Date().toISOString(),
        };
      }

      bumpQuest(acc, "reviews", 1);
      applyActivity(acc);

      // Kunlik sessiya uchun +5 XP (birinchi takrorlashda)
      const date = todayKey();
      const hasReviewXp = acc.state.xpEvents.some(
        (e) => e.source === "review" && e.createdAt.slice(0, 10) === date,
      );
      let xpAwarded = 0;
      if (!hasReviewXp) {
        xpAwarded = 5;
        addXp(acc, 5, "review", "Takrorlash sessiyasi");
      }
      unlockAchievements(acc);
      saveDb(db);
      return { state, xpAwarded };
    },

    async getReviewQueue(): Promise<ReviewQueue> {
      const db = loadDb();
      if (!db) return { dueWords: [], mistakes: [] };
      const acc = currentAccount(db);
      if (!acc) return { dueWords: [], mistakes: [] };

      const allVocab = effectiveVocabulary(db.content);
      const vocabList =
        acc.profile.role === "admin" ? allVocab : allVocab.filter(isVisibleVocab);
      const now = Date.now();
      const dueWords = Object.values(acc.state.vocab)
        .filter((v) => v.nextReviewAt && new Date(v.nextReviewAt).getTime() <= now)
        .map((v) => {
          const item = vocabList.find((x) => x.id === v.vocabularyId);
          return item ? { item, state: v } : null;
        })
        .filter((x): x is NonNullable<typeof x> => x !== null)
        .sort((a, b) => b.state.wrongCount - a.state.wrongCount);

      // Hech qachon ko'rgan so'zlarni ham qo'shish (yangi takrorlash)
      const seenIds = new Set(dueWords.map((d) => d.state.vocabularyId));
      const fresh = Object.values(acc.state.vocab)
        .filter((v) => v.isLearned && !seenIds.has(v.vocabularyId) && v.nextReviewAt)
        .map((v) => {
          const item = vocabList.find((x) => x.id === v.vocabularyId);
          return item ? { item, state: v } : null;
        })
        .filter((x): x is NonNullable<typeof x> => x !== null)
        .slice(0, 10);

      const lessonIds = new Set(effectiveLessons(db.content).map((l) => l.id));
      const mistakes = (
        await Promise.all(
          Object.values(acc.state.mistakes)
            .filter((m) => m.lessonId && lessonIds.has(m.lessonId))
            .sort((a, b) => b.count - a.count)
            .map(async (m) => {
              const q = (await effectiveQuestions(db.content, m.lessonId)).find(
                (x) => x.id === m.questionId,
              );
              return q ? { question: q, count: m.count } : null;
            }),
        )
      ).filter((x): x is NonNullable<typeof x> => x !== null);

      return { dueWords: [...dueWords, ...fresh], mistakes };
    },

    async getMistakes(): Promise<MistakeState[]> {
      const db = loadDb();
      if (!db) return [];
      const acc = currentAccount(db);
      if (!acc) return [];
      return Object.values(acc.state.mistakes).sort((a, b) => b.count - a.count);
    },

    async recordMistake(questionId, lessonId) {
      const db = loadDb();
      if (!db) return;
      const acc = currentAccount(db);
      if (!acc) return;
      const cur = acc.state.mistakes[questionId];
      acc.state.mistakes[questionId] = {
        questionId,
        lessonId,
        count: (cur?.count ?? 0) + 1,
        lastAt: new Date().toISOString(),
      };
      saveDb(db);
    },

    async clearMistake(questionId) {
      const db = loadDb();
      if (!db) return;
      const acc = currentAccount(db);
      if (!acc) return;
      delete acc.state.mistakes[questionId];
      saveDb(db);
    },

    async getAchievementStates() {
      const db = loadDb();
      const { achievements } = await import("@/data/achievements");
      const acc = db ? currentAccount(db) : null;
      return achievements.map((a) => ({
        achievement: a,
        unlockedAt: acc?.state.achievements[a.id] ?? null,
      }));
    },

    async getLeaderboard() {
      const db = loadDb();
      if (!db) return [];
      const weekStart = new Date(weekStartKey() + "T00:00:00").getTime();
      return db.accounts
        .filter((a) => a.profile.role !== "admin")
        .map((a) => ({
          userId: a.id,
          username: a.profile.username,
          avatarId: a.profile.avatarId,
          weeklyXp: a.state.xpEvents
            .filter((e) => new Date(e.createdAt).getTime() >= weekStart)
            .reduce((s, e) => s + e.amount, 0),
          totalXp: a.profile.totalXp,
        }))
        .sort((a, b) => b.weeklyXp - a.weeklyXp || b.totalXp - a.totalXp);
    },

    async adminStats(): Promise<AdminStats> {
      const db = loadDb();
      if (!db) {
        return {
          totalUsers: 0,
          activeUsers: 0,
          completedLessons: 0,
          totalXp: 0,
          lessonsCount: baseLessons.length,
          questionsCount: catalogTotals.exercises,
          vocabularyCount: baseVocabulary.length,
          modulesCount: baseModules.length,
        };
      }
      const weekAgo = Date.now() - 7 * 86400000;
      let completedLessons = 0;
      let activeUsers = 0;
      let totalXp = 0;
      for (const acc of db.accounts) {
        completedLessons += Object.values(acc.state.lessonProgress).filter(
          (p) => p.completed,
        ).length;
        totalXp += acc.profile.totalXp;
        const active =
          acc.state.xpEvents.some((e) => new Date(e.createdAt).getTime() >= weekAgo) ||
          (acc.state.lastActiveDate !== null &&
            new Date(acc.state.lastActiveDate + "T00:00:00").getTime() >= weekAgo);
        if (active) activeUsers++;
      }
      return {
        totalUsers: db.accounts.length,
        activeUsers,
        completedLessons,
        totalXp,
        lessonsCount: effectiveLessons(db.content).length,
        questionsCount:
          catalogTotals.exercises +
          db.content.customQuestions.length -
          db.content.deletedQuestionIds.length,
        vocabularyCount: effectiveVocabulary(db.content).length,
        modulesCount: baseModules.length,
      };
    },

    async adminIsAdmin() {
      const db = loadDb();
      if (!db) return false;
      return currentAccount(db)?.profile.role === "admin";
    },

    async adminSaveLesson(lesson) {
      const db = loadDb();
      if (!db) return STORE_ERRORS.noSession;
      const acc = currentAccount(db);
      if (!acc || acc.profile.role !== "admin") return "Ruxsat yo'q.";
      const exists = baseLessons.some((l) => l.id === lesson.id);
      if (exists) {
        db.content.lessonOverrides[lesson.id] = lesson;
      } else {
        const idx = db.content.customLessons.findIndex((l) => l.id === lesson.id);
        if (idx >= 0) db.content.customLessons[idx] = lesson;
        else db.content.customLessons.push(lesson);
      }
      saveDb(db);
      return null;
    },

    async adminDeleteLesson(lessonId) {
      const db = loadDb();
      if (!db) return STORE_ERRORS.noSession;
      const acc = currentAccount(db);
      if (!acc || acc.profile.role !== "admin") return "Ruxsat yo'q.";
      if (!db.content.deletedLessonIds.includes(lessonId))
        db.content.deletedLessonIds.push(lessonId);
      db.content.customLessons = db.content.customLessons.filter((l) => l.id !== lessonId);
      delete db.content.lessonOverrides[lessonId];
      saveDb(db);
      return null;
    },

    async adminSaveQuestion(question) {
      const db = loadDb();
      if (!db) return STORE_ERRORS.noSession;
      const acc = currentAccount(db);
      if (!acc || acc.profile.role !== "admin") return "Ruxsat yo'q.";
      const baseQuestions = await loadQuestionsForLesson(question.lessonId);
      const exists = baseQuestions.some((q) => q.id === question.id);
      if (exists) {
        db.content.questionOverrides[question.id] = question;
      } else {
        const idx = db.content.customQuestions.findIndex((q) => q.id === question.id);
        if (idx >= 0) db.content.customQuestions[idx] = question;
        else db.content.customQuestions.push(question);
      }
      saveDb(db);
      return null;
    },

    async adminDeleteQuestion(questionId) {
      const db = loadDb();
      if (!db) return STORE_ERRORS.noSession;
      const acc = currentAccount(db);
      if (!acc || acc.profile.role !== "admin") return "Ruxsat yo'q.";
      if (!db.content.deletedQuestionIds.includes(questionId))
        db.content.deletedQuestionIds.push(questionId);
      db.content.customQuestions = db.content.customQuestions.filter(
        (q) => q.id !== questionId,
      );
      delete db.content.questionOverrides[questionId];
      saveDb(db);
      return null;
    },

    async adminSaveVocabulary(item) {
      const db = loadDb();
      if (!db) return STORE_ERRORS.noSession;
      const acc = currentAccount(db);
      if (!acc || acc.profile.role !== "admin") return "Ruxsat yo'q.";
      const idx = db.content.customVocabulary.findIndex((v) => v.id === item.id);
      const isBase = baseVocabulary.some((v) => v.id === item.id);
      if (isBase) {
        // Bazaviy so'zni tahrirlash → custom ro'yxatida saqlash (merge ustuvor)
        const cIdx = db.content.customVocabulary.findIndex((v) => v.id === item.id);
        if (cIdx >= 0) db.content.customVocabulary[cIdx] = item;
        else db.content.customVocabulary.push(item);
      } else if (idx >= 0) {
        db.content.customVocabulary[idx] = item;
      } else {
        db.content.customVocabulary.push(item);
      }
      saveDb(db);
      return null;
    },

    async adminDeleteVocabulary(id) {
      const db = loadDb();
      if (!db) return STORE_ERRORS.noSession;
      const acc = currentAccount(db);
      if (!acc || acc.profile.role !== "admin") return "Ruxsat yo'q.";
      if (!db.content.deletedVocabIds.includes(id)) db.content.deletedVocabIds.push(id);
      db.content.customVocabulary = db.content.customVocabulary.filter((v) => v.id !== id);
      saveDb(db);
      return null;
    },
  };
}
