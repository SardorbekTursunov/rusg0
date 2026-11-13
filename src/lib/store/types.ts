import type {
  Achievement,
  AuthSession,
  ContentReviewItem,
  ContentStatus,
  DailyQuest,
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

// --------------------------------------------------------------------------
// Yagona Store interfeysi — ikkala rejim (Supabase va DEMO/local) shuni
// bajaradi. UI faqat shu interfeysga bog'lanadi.
// --------------------------------------------------------------------------

export interface DailyQuestState {
  quest: DailyQuest;
  progress: number;
  completed: boolean;
}

export interface CompleteLessonInput {
  lessonId: string;
  correct: number;
  total: number;
}

export interface CompleteLessonResult {
  xpAwarded: number;
  bonusXp: number;
  alreadyCompleted: boolean;
  newAchievements: Achievement[];
  quests: DailyQuestState[];
  totalXp: number;
  currentStreak: number;
}

export interface ReviewWordResult {
  state: UserVocabState;
  xpAwarded: number; // sessiya davomida +5 XP (1 marta)
}

/** O'yin yakuni natijasi (record_game_result) */
export interface GameResult {
  xpAwarded: number;
  /** Kunlik 30 XP chekloviga yetilgani */
  capReached: boolean;
  totalXp: number;
  currentStreak: number;
}

export type GameSlug = "quiz" | "memory" | "truefalse" | "listen" | "letters";

export interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  completedLessons: number;
  totalXp: number;
  lessonsCount: number;
  questionsCount: number;
  vocabularyCount: number;
  modulesCount: number;
}

/** Admin: userlar ro'yxatidagi bir qator */
export interface AdminUserRow {
  userId: string;
  username: string;
  fullName: string;
  email: string;
  role: "user" | "admin";
  totalXp: number;
  currentStreak: number;
  createdAt: string;
}

export interface ReviewQueueItem {
  item: VocabularyItem;
  state: UserVocabState;
}

export interface MistakeReviewItem {
  question: Question;
  count: number;
}

export interface VocabularyFacets {
  categories: { slug: string; titleUz: string; count: number }[];
  partsOfSpeech: { value: string; count: number }[];
  entryTypes: { value: string; count: number }[];
}

export interface ImportVocabularyInput {
  jobId?: string;
  fileName: string;
  format: "csv" | "json";
  rows: unknown[];
  batchIndex: number;
  totalRows: number;
  defaultStatus: ContentStatus;
}

export interface ImportBatchResult {
  job: ImportJob;
  imported: number;
  updated: number;
  duplicates: number;
  errors: ImportRowError[];
}

export interface ContentCounts {
  vocabulary: Record<ContentStatus, number>;
  lessons: Record<ContentStatus, number>;
  pendingImports: number;
}

export interface ReviewQueue {
  dueWords: ReviewWordItem[];
  mistakes: MistakeReviewItem[];
}

export type ReviewWordItem = ReviewQueueItem;

export interface LeaderboardRow {
  userId: string;
  username: string;
  avatarId: string;
  weeklyXp: number;
  totalXp: number;
}

export type ProfilePatch = Partial<
  Pick<
    Profile,
    | "username"
    | "avatarId"
    | "dailyGoal"
    | "soundEnabled"
    | "notificationsEnabled"
    | "heartsEnabled"
    | "currentLevel"
    | "fullName"
  >
>;

export interface AppStore {
  // ---- Auth ------------------------------------------------------------
  signUp(input: {
    email: string;
    password: string;
    username: string;
    fullName: string;
  }): Promise<string | null>;
  signIn(email: string, password: string): Promise<string | null>;
  signOut(): Promise<void>;
  getSession(): Promise<AuthSession | null>;

  // ---- Profil ----------------------------------------------------------
  getProfile(): Promise<Profile | null>;
  updateProfile(patch: ProfilePatch): Promise<string | null>;
  completeOnboarding(data: OnboardingData): Promise<string | null>;

  // ---- Kontent (admin o'zgarishlari bilan) -----------------------------
  getModules(): Promise<Module[]>;
  getLessons(): Promise<Lesson[]>;
  getQuestions(lessonId: string): Promise<Question[]>;
  getVocabulary(): Promise<VocabularyItem[]>;

  // ---- Lug'at qidiruvi (server-side pagination) ------------------------
  searchVocabulary(query: VocabularyQuery): Promise<VocabularySearchResult>;
  getVocabularyFacets(): Promise<VocabularyFacets>;
  getVocabularySuggestions(query: string, limit?: number): Promise<string[]>;
  getVocabularyByIds(ids: string[]): Promise<VocabularyItem[]>;

  // ---- Ommaviy import ---------------------------------------------------
  importVocabularyBatch(input: ImportVocabularyInput): Promise<ImportBatchResult>;
  getImportJobs(): Promise<ImportJob[]>;
  getImportErrors(jobId: string): Promise<ImportRowError[]>;
  deleteImportJob(jobId: string): Promise<void>;
  exportVocabulary(query: VocabularyQuery): Promise<VocabularyItem[]>;

  // ---- Sifat nazorati ---------------------------------------------------
  getContentReviews(status?: ContentStatus | "all"): Promise<ContentReviewItem[]>;
  setContentStatus(
    kind: "vocabulary" | "lesson",
    id: string,
    status: ContentStatus,
  ): Promise<string | null>;
  getContentCounts(): Promise<ContentCounts>;

  // ---- Progress --------------------------------------------------------
  getLessonProgress(): Promise<LessonProgress[]>;
  completeLesson(input: CompleteLessonInput): Promise<CompleteLessonResult>;
  recordGameResult(game: GameSlug, correct: number, total: number): Promise<GameResult>;
  getXpEvents(limit?: number): Promise<XpEvent[]>;

  // ---- Kunlik vazifalar ------------------------------------------------
  getDailyQuests(): Promise<DailyQuestState[]>;

  // ---- Lug'at ----------------------------------------------------------
  getUserVocabulary(): Promise<UserVocabState[]>;
  setVocabularyFavorite(id: string, favorite: boolean): Promise<void>;
  setVocabularyLearned(id: string, learned: boolean): Promise<void>;
  reviewWord(id: string, correct: boolean): Promise<ReviewWordResult>;

  // ---- Takrorlash ------------------------------------------------------
  getReviewQueue(): Promise<ReviewQueue>;
  getMistakes(): Promise<MistakeState[]>;
  recordMistake(questionId: string, lessonId: string): Promise<void>;
  clearMistake(questionId: string): Promise<void>;

  // ---- Yutuqlar --------------------------------------------------------
  getAchievementStates(): Promise<
    { achievement: Achievement; unlockedAt: string | null }[]
  >;

  // ---- Reyting ---------------------------------------------------------
  getLeaderboard(): Promise<LeaderboardRow[]>;

  // ---- Admin -----------------------------------------------------------
  adminStats(): Promise<AdminStats>;
  adminSaveLesson(lesson: Lesson): Promise<string | null>;
  adminDeleteLesson(lessonId: string): Promise<string | null>;
  adminSaveQuestion(question: Question): Promise<string | null>;
  adminDeleteQuestion(questionId: string): Promise<string | null>;
  adminSaveVocabulary(item: VocabularyItem): Promise<string | null>;
  adminDeleteVocabulary(id: string): Promise<string | null>;
  adminIsAdmin(): Promise<boolean>;
  adminListUsers(): Promise<AdminUserRow[]>;
  adminSetRole(userId: string, role: "user" | "admin"): Promise<string | null>;
  adminGrantAchievement(userId: string, achievementId: string): Promise<string | null>;
  adminResetPassword(userId: string, newPassword: string): Promise<string | null>;
}

/** Xato xabarlari — o'zbek tilida */
export const STORE_ERRORS = {
  noSession: "Avval tizimga kiring.",
  notFound: "Ma'lumot topilmadi.",
  emailInUse: "Bu email allaqachon ro'yxatdan o'tgan.",
  invalidLogin: "Email yoki parol noto‘g‘ri.",
  weakPassword: "Parol kamida 6 ta belgidan iborat bo‘lsin.",
  usernameTaken: "Bu username allaqachon band.",
  usernameShort: "Username kamida 3 ta belgidan iborat bo‘lsin.",
  xpDedup: "Bu dars uchun XP allaqachon berilgan.",
  emailNotConfirmed: "Emailingiz hali tasdiqlanmagan. Pochtangizga kelgan kod bilan tasdiqlang.",
} as const;

/** signUp natijasi: sessiya ochilmadi → email tasdiqlash talab qilinadi (qarang /verify) */
export const SIGNUP_NEEDS_CONFIRMATION = "__signup_needs_confirmation__";
