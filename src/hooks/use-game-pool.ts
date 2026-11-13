"use client";

import { useMemo } from "react";
import { useStoreData } from "@/hooks/use-store-data";
import { toGameWord, shuffle, type GameWord } from "@/lib/games";

/**
 * O'yinlar uchun lug'at hovuzi — bir marta yuklanadi, o'yinlar
 * undan pickN() bilan o'z raundlarini tanlaydi.
 */
export function useGamePool(): {
  pool: GameWord[] | null;
  loading: boolean;
  error: string | null;
} {
  const { data, loading, error } = useStoreData((store) => store.getVocabulary(), []);
  const pool = useMemo(() => {
    if (!data) return null;
    const playable = data.filter((w) => w.russianWord && w.uzbekTranslation);
    return shuffle(playable.map(toGameWord));
  }, [data]);
  return { pool, loading, error };
}
