import { isSupabaseConfigured } from "@/lib/config";
import { createLocalStore } from "./local-store";
import { createSupabaseStore } from "./supabase-store";
import type { AppStore } from "./types";

let store: AppStore | null = null;

/**
 * Yagona store — Supabase sozlangan bo'lsa Supabase, aks holda DEMO rejim
 * (localStorage) ishlatiladi. Ikkala rejim ham bir xil interfeysni bajaradi.
 */
export function getStore(): AppStore {
  if (!store) {
    store = isSupabaseConfigured ? createSupabaseStore() : createLocalStore();
  }
  return store;
}

export type { AppStore };
export type {
  AdminStats,
  ContentCounts,
  ImportBatchResult,
  ImportVocabularyInput,
  VocabularyFacets,
} from "./types";
export { STORE_ERRORS } from "./types";
