"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  Briefcase,
  Plane,
  MessageCircle,
  Heart,
  School,
  Sparkles,
  Clock,
  ArrowLeft,
  Loader2,
  Check,
} from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/components/providers/auth-provider";
import type { OnboardingData } from "@/types";
import { cn } from "@/lib/utils";

const steps = [
  { key: "level", title: "Rus tilini qay darajada bilasan?" },
  { key: "purpose", title: "Rus tilini nima uchun o‘rganmoqchisan?" },
  { key: "time", title: "Kuniga qancha vaqt ajratasan?" },
  { key: "plan", title: "O‘quv rejangiz tayyor!" },
] as const;

const levelOptions = [
  { value: "none", label: "Umuman bilmayman", hint: "Alifboldan boshlaymiz", icon: School },
  { value: "basic", label: "Boshlang‘ich", hint: "Bir necha so‘z bilaman", icon: GraduationCap },
  { value: "medium", label: "O‘rtacha", hint: "Oddiy gaplar tuzaman", icon: Sparkles },
  { value: "advanced", label: "Yaxshi bilaman", hint: "Erkin suhbatlashaman", icon: Heart },
];

const purposeOptions = [
  { value: "school", label: "Maktab uchun", icon: School },
  { value: "work", label: "Ish uchun", icon: Briefcase },
  { value: "travel", label: "Sayohat uchun", icon: Plane },
  { value: "daily", label: "Kundalik suhbat uchun", icon: MessageCircle },
  { value: "self", label: "O‘zim uchun", icon: Heart },
];

const timeOptions = [
  { value: 5, label: "5 daqiqa", hint: "Yengil boshlash" },
  { value: 10, label: "10 daqiqa", hint: "Tavsiya etiladi" },
  { value: 15, label: "15 daqiqa", hint: "Barqaror sur’at" },
  { value: 20, label: "20 daqiqa", hint: "Tez natija" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const { status, profile, refresh } = useAuth();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<OnboardingData>({
    level: "",
    purpose: "",
    dailyMinutes: 0,
    completedAt: "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (status === "anonymous") router.replace("/login");
    if (status === "authenticated" && profile?.onboarding) router.replace("/dashboard");
  }, [status, profile, router]);

  const choose = (patch: Partial<OnboardingData>) => {
    setData((d) => ({ ...d, ...patch }));
    setTimeout(() => setStep((s) => s + 1), 160);
  };

  const finish = async () => {
    setSaving(true);
    const store = (await import("@/lib/store")).getStore();
    const finalData: OnboardingData = { ...data, completedAt: new Date().toISOString() };
    const err = await store.completeOnboarding(finalData);
    setSaving(false);
    if (err) return;
    await refresh();
    router.replace("/dashboard");
  };

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <header className="mx-auto flex w-full max-w-2xl items-center justify-between px-4 py-6">
        <Logo size={32} />
        <span className="text-sm font-bold text-ink-soft">
          {step + 1}/{steps.length}
        </span>
      </header>

      <div className="mx-auto w-full max-w-2xl px-4">
        <Progress
          value={((step + 1) / steps.length) * 100}
          height="h-2.5"
          ariaLabel="Onboarding jarayoni"
        />
      </div>

      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.25 }}
          >
            <h1 className="text-center text-2xl font-extrabold text-ink sm:text-3xl">
              {steps[step].title}
            </h1>

            {step === 0 && (
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {levelOptions.map((o) => (
                  <OptionCard
                    key={o.value}
                    selected={data.level === o.value}
                    onClick={() => choose({ level: o.value })}
                    icon={<o.icon size={20} />}
                    label={o.label}
                    hint={o.hint}
                  />
                ))}
              </div>
            )}

            {step === 1 && (
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {purposeOptions.map((o) => (
                  <OptionCard
                    key={o.value}
                    selected={data.purpose === o.value}
                    onClick={() => choose({ purpose: o.value })}
                    icon={<o.icon size={20} />}
                    label={o.label}
                  />
                ))}
              </div>
            )}

            {step === 2 && (
              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {timeOptions.map((o) => (
                  <OptionCard
                    key={o.value}
                    selected={data.dailyMinutes === o.value}
                    onClick={() => choose({ dailyMinutes: o.value })}
                    icon={<Clock size={20} />}
                    label={o.label}
                    hint={o.hint}
                    center
                  />
                ))}
              </div>
            )}

            {step === 3 && (
              <div className="mt-8 text-center">
                <motion.span
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", bounce: 0.6, duration: 0.6 }}
                  className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary text-white"
                >
                  <Check size={40} />
                </motion.span>

                <div className="card mx-auto mt-6 max-w-sm p-5 text-left">
                  <p className="text-xs font-bold uppercase tracking-wide text-ink-faint">
                    Sizning rejangiz
                  </p>
                  <ul className="mt-3 space-y-2.5 text-sm">
                    <Row
                      label="Daraja"
                      value={
                        levelOptions.find((l) => l.value === data.level)?.label ?? "—"
                      }
                    />
                    <Row
                      label="Maqsad"
                      value={
                        purposeOptions.find((p) => p.value === data.purpose)?.label ?? "—"
                      }
                    />
                    <Row label="Kunlik vaqt" value={`${data.dailyMinutes} daqiqa`} />
                    <Row label="Birinchi bosqich" value="A1 — Знакомство" />
                  </ul>
                </div>

                <Button
                  size="lg"
                  className="mt-6"
                  onClick={finish}
                  disabled={saving}
                >
                  {saving ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Sparkles size={16} />
                  )}
                  O‘rganishni boshlash
                </Button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {step > 0 && step < 3 && (
          <div className="mt-8 flex justify-center">
            <Button variant="ghost" onClick={() => setStep((s) => s - 1)}>
              <ArrowLeft size={16} /> Orqaga
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}

function OptionCard({
  selected,
  onClick,
  icon,
  label,
  hint,
  center = false,
}: {
  selected: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  hint?: string;
  center?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "card flex items-center gap-3.5 p-4 text-left transition-all hover:-translate-y-0.5 hover:shadow-md",
        center && "flex-col justify-center text-center",
        selected && "border-primary ring-2 ring-primary",
      )}
    >
      <span
        className={cn(
          "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
          selected ? "bg-primary text-white" : "bg-primary-soft text-primary-ink",
        )}
      >
        {icon}
      </span>
      <span>
        <span className="block text-sm font-bold text-ink">{label}</span>
        {hint && <span className="mt-0.5 block text-xs text-ink-soft">{hint}</span>}
      </span>
      {selected && (
        <Check size={18} className={cn("ml-auto text-primary", center && "ml-0 mt-1")} />
      )}
    </button>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <li className="flex items-center justify-between gap-3">
      <span className="text-ink-soft">{label}</span>
      <span className="flex items-center gap-1.5 font-bold text-ink">
        <Check size={14} className="text-primary" />
        {value}
      </span>
    </li>
  );
}
