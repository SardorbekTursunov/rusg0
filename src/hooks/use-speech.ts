"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { normalizeAnswer } from "@/lib/utils";

/**
 * Web Speech API — matnni ovozli o'qish (TTS) va gapirishni tanish (STT).
 * Brauzer qo'llab-quvvatlamasa — xavfsiz fallback.
 */

// --- Minimal tiplar (standart DOM lib da SpeechRecognition yo'q) -------------
interface RecoAlternative {
  transcript: string;
}
interface RecoResult {
  length: number;
  [index: number]: RecoAlternative | undefined;
}
interface RecoEvent {
  results: RecoResult[];
}
interface RecoErrorEvent {
  error: string;
}
interface Reco {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  onresult: ((e: RecoEvent) => void) | null;
  onerror: ((e: RecoErrorEvent) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  abort: () => void;
}
type RecoCtor = new () => Reco;

declare global {
  interface Window {
    SpeechRecognition?: RecoCtor;
    webkitSpeechRecognition?: RecoCtor;
  }
}

function getSpeechSynthesis(): SpeechSynthesis | null {
  if (typeof window === "undefined") return null;
  return "speechSynthesis" in window ? window.speechSynthesis : null;
}

function getRecognition(): Reco | null {
  if (typeof window === "undefined") return null;
  const Ctor = window.SpeechRecognition ?? window.webkitSpeechRecognition;
  return Ctor ? new Ctor() : null;
}

/** Ikki satr o'xshashligi (0..1) — Levenshtein asosida */
export function similarity(a: string, b: string): number {
  const s = normalizeAnswer(a);
  const t = normalizeAnswer(b);
  if (s === t) return 1;
  if (s.length === 0 || t.length === 0) return 0;
  const m = s.length;
  const n = t.length;
  const dp: number[] = Array.from({ length: n + 1 }, (_, i) => i);
  for (let i = 1; i <= m; i++) {
    let prev = dp[0];
    dp[0] = i;
    for (let j = 1; j <= n; j++) {
      const tmp = dp[j];
      dp[j] = Math.min(dp[j] + 1, dp[j - 1] + 1, prev + (s[i - 1] === t[j - 1] ? 0 : 1));
      prev = tmp;
    }
  }
  return 1 - dp[n] / Math.max(m, n);
}

export interface SpeechApi {
  ttsSupported: boolean;
  sttSupported: boolean;
  speaking: boolean;
  listening: boolean;
  speak: (text: string, lang?: string, rate?: number) => void;
  stop: () => void;
  /** Gapirishni tanish; yaxshi o'xshashlik = true */
  listen: (expected: string, lang?: string) => Promise<{
    ok: boolean;
    transcript: string;
    score: number;
    error?: string;
  }>;
}

export function useSpeech(): SpeechApi {
  const [speaking, setSpeaking] = useState(false);
  const [listening, setListening] = useState(false);
  const [ttsSupported, setTtsSupported] = useState(false);
  const [sttSupported, setSttSupported] = useState(false);
  const recRef = useRef<Reco | null>(null);
  const listeningRef = useRef(false);

  useEffect(() => {
    setTtsSupported(Boolean(getSpeechSynthesis()));
    setSttSupported(Boolean(getRecognition()));
    return () => {
      getSpeechSynthesis()?.cancel();
    };
  }, []);

  const speak = useCallback((text: string, lang = "ru-RU", rate = 0.9) => {
    const synth = getSpeechSynthesis();
    if (!synth) return;
    synth.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang;
    u.rate = rate;
    u.onstart = () => setSpeaking(true);
    u.onend = () => setSpeaking(false);
    u.onerror = () => setSpeaking(false);
    synth.speak(u);
  }, []);

  const stop = useCallback(() => {
    getSpeechSynthesis()?.cancel();
    setSpeaking(false);
    try {
      recRef.current?.abort();
    } catch {
      /* e'tiborsiz */
    }
    listeningRef.current = false;
    setListening(false);
  }, []);

  const listen = useCallback(
    (expected: string, lang = "ru-RU") =>
      new Promise<{ ok: boolean; transcript: string; score: number; error?: string }>(
        (resolve) => {
          const rec = getRecognition();
          if (!rec) {
            resolve({
              ok: false,
              transcript: "",
              score: 0,
              error: "Bu brauzerda ovozni tanish qo‘llab-quvvatlanmaydi.",
            });
            return;
          }
          rec.lang = lang;
          rec.interimResults = false;
          rec.maxAlternatives = 3;
          recRef.current = rec;
          listeningRef.current = true;
          setListening(true);

          const finish = (result: {
            ok: boolean;
            transcript: string;
            score: number;
            error?: string;
          }) => {
            listeningRef.current = false;
            setListening(false);
            recRef.current = null;
            resolve(result);
          };

          rec.onresult = (event: RecoEvent) => {
            const first = event.results?.[0];
            const alternatives: string[] = [];
            if (first) {
              for (let i = 0; i < first.length; i++) {
                alternatives.push(first[i]?.transcript ?? "");
              }
            }
            const best = alternatives.reduce(
              (acc, t) => Math.max(acc, similarity(t, expected)),
              0,
            );
            finish({
              ok: best >= 0.6,
              transcript: alternatives[0] ?? "",
              score: Math.round(best * 100),
            });
          };
          rec.onerror = (event: RecoErrorEvent) => {
            finish({
              ok: false,
              transcript: "",
              score: 0,
              error:
                event.error === "not-allowed"
                  ? "Mikrofonga ruxsat berilmadi."
                  : "Ovozni tushunib bo‘lmadi, qayta urinib ko‘ring.",
            });
          };
          rec.onend = () => {
            if (listeningRef.current) {
              listeningRef.current = false;
              setListening(false);
            }
          };
          try {
            rec.start();
          } catch {
            finish({
              ok: false,
              transcript: "",
              score: 0,
              error: "Mikrofon allaqachon ochiq.",
            });
          }
        },
      ),
    [],
  );

  return { ttsSupported, sttSupported, speaking, listening, speak, stop, listen };
}
