// ---------------------------------------------------------------------------
// RusGo — asosiy tip (type) definitsiyalari
// ---------------------------------------------------------------------------

export type Level = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
export type UserRole = "user" | "admin";

/** Kontent sifat nazorati holatlari */
export type ContentStatus = "draft" | "pending" | "verified" | "published" | "rejected";

/** Lug'at yozuvi turi */
export type VocabEntryType = "lemma" | "form" | "expression" | "collocation";

/** Lug'atning bir ma'nosi */
export interface VocabMeaning {
  uz: string; // o'zbekcha tarjima
  note?: string; // izoh (uslub, soha, cheklov)
}

/** Lug'at misoli */
export interface VocabExample {
  ru: string;
  uz: string;
}

/** So'z shakli (grammatik shakl) */
export interface VocabForm {
  form: string;
  label: string; // "ko'plik", "o'tgan zamon", "2-shaxs birlik"...
}

// --- Curriculum ------------------------------------------------------------

export interface Module {
  id: string; // masalan: "a1-m1"
  level: Level;
  orderIndex: number;
  title: string; // ruscha: "Знакомство"
  titleUz: string; // o'zbekcha: "Tanishuv"
  description: string; // o'zbekcha
}

export interface CompletionCriteria {
  minScore: number; // 0..100
}

export interface Lesson {
  id: string; // masalan: "a1-m1-l1"
  moduleId: string;
  orderIndex: number;
  title: string; // o'zbekcha sarlavha
  titleRu: string; // ruscha sarlavha
  description: string; // o'zbekcha tavsif
  xpReward: number;
  estimatedMinutes: number;

  // --- Kengaytirilgan kontent metama'lumotlari (ixtiyoriy, eski yozuvlar uchun) ---
  level?: Level;
  objectives?: string[]; // o'quv maqsadlari (o'zbekcha)
  grammarTopic?: string; // grammatika mavzusi
  grammarExplanation?: string; // o'zbekcha qisqa izoh
  vocabularyIds?: string[]; // darsga biriktirilgan lug'at
  examples?: VocabExample[]; // namunali gaplar
  readingText?: string | null; // o'qish matni (ruscha)
  readingTitle?: string | null;
  listeningText?: string | null; // tinglash matni (ruscha)
  prerequisites?: string[]; // oldingi dars IDlari
  completionCriteria?: CompletionCriteria;
  tags?: string[]; // mavzu teglari (kategoriya sluglari)
  status?: ContentStatus;
  published?: boolean;
  source?: string; // "handcrafted" | "seed-template-v1" ...
  exerciseCount?: number; // darsdagi mashqlar soni (katalog uchun)
}

export type QuestionType =
  | "multiple_choice"
  | "translation"
  | "word_matching"
  | "sentence_building"
  | "fill_blank"
  | "listening"
  | "true_false"
  | "word_selection";

interface BaseQuestion {
  id: string;
  lessonId: string;
  orderIndex: number;
  explanationUz: string; // xato tushuntirishi o'zbek tilida
}

/** Tanlov: berilgan savolga to'g'ri javobni tanlash */
export interface MultipleChoicePayload {
  prompt: string; // ruscha yoki o'zbekcha savol matni
  promptLang: "ru" | "uz";
  options: string[];
  correctIndex: number;
}

/** So'z tarjimasini yozib javob berish (matnli) */
export interface TranslationPayload {
  direction: "ru_to_uz" | "uz_to_ru";
  source: string; // tarjima qilinishi kerak bo'lgan matn
  accepted: string[]; // barcha to'g'ri variantlar (katta/kichik harf e'tiborsiz)
}

/** Juftliklarni moslash */
export interface WordMatchingPayload {
  pairs: { ru: string; uz: string }[];
}

/** So'zlardan gap tuzish */
export interface SentenceBuildingPayload {
  correct: string[]; // to'g'ri tartibdagi so'zlar
  distractors: string[]; // ortiqcha (notog'ri) so'zlar
}

/** Bo'sh joyni to'ldirish */
export interface FillBlankPayload {
  sentence: string; // "___" belgisi bilan (ruscha)
  options: string[];
  correctIndex: number;
}

/** Tinglab javob berish */
export interface ListeningPayload {
  speakText: string; // ovozli o'qiladigan matn (ruscha)
  options: string[];
  correctIndex: number;
  promptUz: string; // o'zbekcha ko'rsatma
}

/** To'g'ri / noto'g'ri */
export interface TrueFalsePayload {
  ruText: string; // ruscha gap
  uzTranslation: string; // o'zbekcha tarjima (yoki noto'g'ri variant)
  isTrue: boolean;
}

/** O'zbekcha tarjimaga mos rus so'zini tanlash */
export interface WordSelectionPayload {
  promptUz: string;
  options: string[]; // ruscha so'zlar
  correctIndex: number;
}

export type Question =
  | (BaseQuestion & { type: "multiple_choice"; payload: MultipleChoicePayload })
  | (BaseQuestion & { type: "translation"; payload: TranslationPayload })
  | (BaseQuestion & { type: "word_matching"; payload: WordMatchingPayload })
  | (BaseQuestion & { type: "sentence_building"; payload: SentenceBuildingPayload })
  | (BaseQuestion & { type: "fill_blank"; payload: FillBlankPayload })
  | (BaseQuestion & { type: "listening"; payload: ListeningPayload })
  | (BaseQuestion & { type: "true_false"; payload: TrueFalsePayload })
  | (BaseQuestion & { type: "word_selection"; payload: WordSelectionPayload });

/** Bitta modulning to'liq kontenti (ma'lumotlar fayli uchun) */
export interface ModuleContent {
  module: Module;
  lessons: Lesson[];
  questions: Question[];
}

// --- Vocabulary ------------------------------------------------------------

export interface VocabularyItem {
  id: string;
  russianWord: string;
  uzbekTranslation: string;
  transliteration: string;
  partOfSpeech: string; // o'zbekcha: "ot", "fe'l", "sifat"...
  exampleRu: string;
  exampleUz: string;
  audioUrl: string | null; // bo'sh bo'lsa Web Speech API (TTS) ishlatiladi
  level: Level;
  topic: string; // masalan: "Tanishuv", "Oila", "Maktab"

  // --- Kengaytirilgan lug'at maydonlari (ixtiyoriy) ---
  entryType?: VocabEntryType; // lemma | form | expression | collocation
  meanings?: VocabMeaning[]; // bir nechta ma'no
  examples?: VocabExample[]; // bir nechta misol
  gender?: "m" | "f" | "n" | null; // ot jinsi
  plural?: string | null; // ko'plik shakli
  infinitive?: string | null; // fe'lning infinitivi (shakllar uchun)
  forms?: VocabForm[]; // grammatik shakllar
  synonyms?: string[];
  antonyms?: string[];
  wordFamily?: string[]; // bir ildizli so'zlar
  categories?: string[]; // kategoriya sluglari (bir nechta)
  frequencyRank?: number | null; // 1 — eng ko'p ishlatiladigan
  difficulty?: number; // 1..5
  source?: string; // manba havolasi yoki "RusGo seed"
  status?: ContentStatus; // sifat nazorati holati
  verifiedAt?: string | null;
}

/** Lug'at qidiruv parametrlari */
export interface VocabularyQuery {
  query?: string;
  level?: Level | "all";
  category?: string; // slug yoki "all"
  partOfSpeech?: string; // "all" yoki aniq tur
  entryType?: VocabEntryType | "all";
  onlyFavorites?: boolean;
  onlyLearned?: boolean;
  sort?: "frequency" | "alphabet" | "level" | "recent";
  page?: number;
  pageSize?: number;
}

export interface VocabularySearchResult {
  items: VocabularyItem[];
  total: number;
  page: number;
  pageSize: number;
  levelCounts: Record<string, number>;
}

/** Ommaviy import ishi */
export interface ImportJob {
  id: string;
  fileName: string;
  format: "csv" | "json";
  totalRows: number;
  processedRows: number;
  imported: number;
  updated: number;
  duplicates: number;
  failed: number;
  status: "queued" | "running" | "completed" | "failed" | "partial";
  createdAt: string;
  finishedAt: string | null;
  defaultStatus: ContentStatus;
  createdBy: string | null;
}

export interface ImportRowError {
  row: number;
  message: string;
  raw?: string;
}

/** Admin sifat nazorati ro'yxati elementi */
export interface ContentReviewItem {
  kind: "vocabulary" | "lesson";
  id: string;
  title: string;
  subtitle: string;
  level: Level;
  status: ContentStatus;
  updatedAt: string;
  details?: string;
}

// --- Foydalanuvchi va progress --------------------------------------------

export interface OnboardingData {
  level: string; // "beginner" | "elementary" | "intermediate" | "advanced"
  purpose: string; // "school" | "work" | "travel" | "daily" | "self"
  dailyMinutes: number; // 5 | 10 | 15 | 20
  completedAt: string; // ISO sana
}

export interface Profile {
  id: string;
  username: string;
  fullName: string;
  email: string;
  avatarId: string; // "av1".."av12" — oldindan belgilangan avatarlar
  role: UserRole;
  currentLevel: Level;
  totalXp: number;
  currentStreak: number;
  longestStreak: number;
  dailyGoal: number; // 20 | 30 | 50
  soundEnabled: boolean;
  notificationsEnabled: boolean;
  heartsEnabled: boolean;
  onboarding: OnboardingData | null;
  createdAt: string;
}

export interface LessonProgress {
  lessonId: string;
  completed: boolean;
  bestScore: number; // 0..100 foiz
  correctCount: number;
  totalQuestions: number;
  xpEarned: number;
  completedAt: string;
}

export interface UserVocabState {
  vocabularyId: string;
  isFavorite: boolean;
  isLearned: boolean;
  reviewCount: number;
  nextReviewAt: string | null; // ISO
  masteryLevel: number; // 0..5
  wrongCount: number; // ko'p xato qilingan so'zlar ko'proq takrorlanadi
  lastReviewedAt: string | null;

  // --- SM-2 tafsilotlari (ixtiyoriy) ---
  correctCount?: number;
  firstLearnedAt?: string | null;
  ease?: number; // SM-2 easiness factor (1.3..2.8)
  intervalDays?: number; // joriy interval
  repetitions?: number; // ketma-ket to'g'ri javoblar
}

export interface XpEvent {
  id: string;
  amount: number;
  source: "lesson" | "perfect_bonus" | "quest" | "review" | "achievement";
  label: string; // o'zbekcha ko'rsatish uchun
  createdAt: string; // ISO
}

export interface MistakeState {
  questionId: string;
  lessonId: string;
  count: number; // necha marta xato qilingan
  lastAt: string;
}

export interface Achievement {
  id: string;
  title: string; // o'zbekcha
  description: string; // o'zbekcha
  icon: string; // lucide-react ikonkasi nomi
  xpReward: number;
  conditionType:
    | "lessons_completed"
    | "total_xp"
    | "streak"
    | "words_learned"
    | "perfect_lessons";
  conditionValue: number;
}

export interface UserAchievement {
  achievementId: string;
  unlockedAt: string;
}

export interface DailyQuest {
  id: string;
  title: string;
  description: string;
  questType: "lessons" | "words" | "reviews";
  targetValue: number;
  xpReward: number;
}

export interface UserQuestProgress {
  questId: string;
  date: string; // YYYY-MM-DD (foydalanuvchining mahalliy kuni)
  progress: number;
  completed: boolean;
}

// --- Reyting ----------------------------------------------------------------

export interface LeaderboardEntry {
  userId: string;
  username: string;
  avatarId: string;
  weeklyXp: number;
  totalXp: number;
  rank: number;
  isCurrentUser: boolean;
}

export type League = "bronze" | "silver" | "gold" | "diamond";

// --- Auth (ikkala rejim uchun yagona interfeys) ----------------------------

export interface AuthUser {
  id: string;
  email: string;
}

export interface AuthSession {
  user: AuthUser;
}
