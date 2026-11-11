/** Oddiy WebAudio effektlar (qo'shimcha kutubxonasiz) */
let ctx: AudioContext | null = null;

function ensureContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  try {
    const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    if (!ctx) ctx = new Ctor();
    if (ctx.state === "suspended") void ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}

function tone(frequency: number, startAt: number, duration = 0.16, gainValue = 0.12) {
  const ac = ensureContext();
  if (!ac) return;
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.type = "sine";
  osc.frequency.value = frequency;
  const t = ac.currentTime + startAt;
  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.exponentialRampToValueAtTime(gainValue, t + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);
  osc.connect(gain);
  gain.connect(ac.destination);
  osc.start(t);
  osc.stop(t + duration + 0.05);
}

export type SoundKind = "correct" | "wrong" | "complete" | "click";

export function playSound(kind: SoundKind, enabled = true): void {
  if (!enabled) return;
  try {
    switch (kind) {
      case "correct":
        tone(659, 0, 0.14);
        tone(880, 0.1, 0.18);
        break;
      case "wrong":
        tone(311, 0, 0.16, 0.1);
        tone(220, 0.12, 0.22, 0.1);
        break;
      case "complete":
        tone(523, 0, 0.16);
        tone(659, 0.13, 0.16);
        tone(784, 0.26, 0.3);
        break;
      case "click":
        tone(523, 0, 0.07, 0.07);
        break;
    }
  } catch {
    /* ovoz ixtiyoriy */
  }
}
