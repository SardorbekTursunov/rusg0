"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Lug'at "Tinglash" rejimi — ro'yxatdagi so'zlarni ketma-ket o'qiydi:
 * avval ruscha (ru-RU ovoz), qisqa pauza, keyin o'zbekcha tarjimasi
 * (ruscha ovoz bilan — o'zbekcha TTS brauzerlarda mavjud emas, lotin
 * yozuvi ruscha fonetikaga yaqin o'qiladi).
 *
 * Web Speech API orqali — to'liq tekin, API-kalit kerak emas.
 */

export interface PlayerItem {
  id: string;
  russianWord: string;
  uzbekTranslation: string;
}

const RU_LANG = "ru-RU";
/** O'rganish uchun sekin talaffuz */
const RU_RATE = 0.7;
/** Ruscha so'zdan keyingi pauza (ms) — tarjima ko'rsatiladi */
const GAP_RU_TO_UZ = 700;
/** O'zbekchadan keyingi pauza (ms) — keyingi so'zgacha */
const GAP_UZ_TO_NEXT = 900;

function getSynth(): SpeechSynthesis | null {
  if (typeof window === "undefined") return null;
  return "speechSynthesis" in window ? window.speechSynthesis : null;
}

export interface VocabPlayerApi {
  ttsSupported: boolean;
  playing: boolean;
  paused: boolean;
  /** Hozir o'qilayotgan yozuv id si (highlight uchun) */
  currentId: string | null;
  /** O'qilayotgan o'rin: 1-based; umumiy soni */
  index: number;
  total: number;
  /** Ruscha yoki o'zbekcha o'qilayotgani */
  phase: "ru" | "uz" | null;
  play: (items: PlayerItem[]) => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  /** Ro'yxat o'zgarsa (filtr/sahifa) — o'ynatishni to'xtatish */
  stopIfListChanged: (idsKey: string) => void;
}

export function useVocabPlayer(): VocabPlayerApi {
  const [ttsSupported, setTtsSupported] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [index, setIndex] = useState(0);
  const [total, setTotal] = useState(0);
  const [phase, setPhase] = useState<"ru" | "uz" | null>(null);

  const itemsRef = useRef<PlayerItem[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeRef = useRef(false);
  const idsKeyRef = useRef<string>("");
  /** Rekursiv chaqiruv ref orqali — react-hooks/immutability qoidasi uchun */
  const speakItemRef = useRef<(i: number) => void>(() => {});

  useEffect(() => {
    setTtsSupported(Boolean(getSynth()));
    return () => {
      activeRef.current = false;
      if (timerRef.current) clearTimeout(timerRef.current);
      getSynth()?.cancel();
    };
  }, []);

  const stop = useCallback(() => {
    activeRef.current = false;
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    const synth = getSynth();
    if (synth) {
      // Pauzada cancel ba'zi brauzerlarda "ilinib qoladi" — avval resume
      try {
        synth.resume();
      } catch {
        /* e'tiborsiz */
      }
      synth.cancel();
    }
    setPlaying(false);
    setPaused(false);
    setCurrentId(null);
    setIndex(0);
    setTotal(0);
    setPhase(null);
  }, []);

  const speakItem = useCallback(
    (i: number) => {
      const synth = getSynth();
      if (!synth || !activeRef.current) return;
      const items = itemsRef.current;
      if (i >= items.length) {
        stop();
        return;
      }
      const item = items[i];
      setCurrentId(item.id);
      setIndex(i + 1);

      const speakUz = () => {
        if (!activeRef.current) return;
        setPhase("uz");
        // O'zbekcha lotin matnni ruscha ovoz o'qiydi;
        // o'zbekcha apostrof belgilari (oʻ, gʻ) rus ovozida yaxshi o'qilmaydi — tozalaymiz
        const cleaned = item.uzbekTranslation.replace(/[ʻʼ'‘’]/g, "");
        const u = new SpeechSynthesisUtterance(cleaned);
        u.lang = RU_LANG;
        u.rate = RU_RATE;
        u.onend = () => {
          if (!activeRef.current) return;
          setPhase(null);
          timerRef.current = setTimeout(() => speakItemRef.current(i + 1), GAP_UZ_TO_NEXT);
        };
        u.onerror = () => {
          if (!activeRef.current) return;
          setPhase(null);
          timerRef.current = setTimeout(() => speakItemRef.current(i + 1), GAP_UZ_TO_NEXT);
        };
        synth.speak(u);
      };

      setPhase("ru");
      const ru = new SpeechSynthesisUtterance(item.russianWord);
      ru.lang = RU_LANG;
      ru.rate = RU_RATE;
      ru.onend = () => {
        if (!activeRef.current) return;
        timerRef.current = setTimeout(speakUz, GAP_RU_TO_UZ);
      };
      ru.onerror = () => {
        if (!activeRef.current) return;
        timerRef.current = setTimeout(speakUz, GAP_RU_TO_UZ);
      };
      synth.speak(ru);
    },
    [stop],
  );

  const play = useCallback(
    (items: PlayerItem[]) => {
      const synth = getSynth();
      if (!synth || items.length === 0) return;
      stop();
      itemsRef.current = items;
      activeRef.current = true;
      setPlaying(true);
      setPaused(false);
      setTotal(items.length);
      // Chrome'da birinchi speak oldidan kichik kechikish barqarorroq
      timerRef.current = setTimeout(() => speakItem(0), 250);
    },
    [speakItem, stop],
  );

  // Rekursiv havolani yangilash
  useEffect(() => {
    speakItemRef.current = speakItem;
  }, [speakItem]);

  const pause = useCallback(() => {
    const synth = getSynth();
    if (!synth || !activeRef.current) return;
    synth.pause();
    setPaused(true);
  }, []);

  const resume = useCallback(() => {
    const synth = getSynth();
    if (!synth) return;
    synth.resume();
    setPaused(false);
  }, []);

  const stopIfListChanged = useCallback(
    (idsKey: string) => {
      if (activeRef.current && idsKeyRef.current && idsKeyRef.current !== idsKey) {
        stop();
      }
      idsKeyRef.current = idsKey;
    },
    [stop],
  );

  return {
    ttsSupported,
    playing,
    paused,
    currentId,
    index,
    total,
    phase,
    play,
    pause,
    resume,
    stop,
    stopIfListChanged,
  };
}
