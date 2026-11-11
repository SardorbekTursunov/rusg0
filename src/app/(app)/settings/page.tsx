"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Volume2,
  Bell,
  Heart,
  Target,
  Palette,
  Globe,
  LogOut,
  Loader2,
  Check,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "@/components/providers/auth-provider";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";
import { avatars } from "@/data/avatars";
import { getStore } from "@/lib/store";
import { playSound } from "@/lib/sound";
import { cn } from "@/lib/utils";
import type { Level } from "@/types";
import type { ProfilePatch } from "@/lib/store/types";

const GOALS = [
  { value: 20, label: "Erkin", desc: "20 XP / kun" },
  { value: 30, label: "Barqaror", desc: "30 XP / kun" },
  { value: 50, label: "Intensiv", desc: "50 XP / kun" },
];

const LEVELS: Level[] = ["A1", "A2", "B1", "B2"];

export default function SettingsPage() {
  const router = useRouter();
  const { profile, refresh, demoMode, signOut } = useAuth();
  const { toast } = useToast();

  const [saving, setSaving] = useState(false);
  const [avatarId, setAvatarId] = useState(profile?.avatarId ?? "av1");
  const [dailyGoal, setDailyGoal] = useState(profile?.dailyGoal ?? 30);
  const [sound, setSound] = useState(profile?.soundEnabled ?? true);
  const [notifications, setNotifications] = useState(profile?.notificationsEnabled ?? true);
  const [hearts, setHearts] = useState(profile?.heartsEnabled ?? true);
  const [currentLevel, setCurrentLevel] = useState<Level>(profile?.currentLevel ?? "A1");
  const [signingOut, setSigningOut] = useState(false);

  // Profil yuklanganda holatlarni sinxronlash
  useEffect(() => {
    if (!profile) return;
    setAvatarId(profile.avatarId);
    setDailyGoal(profile.dailyGoal);
    setSound(profile.soundEnabled);
    setNotifications(profile.notificationsEnabled);
    setHearts(profile.heartsEnabled);
    setCurrentLevel(profile.currentLevel);
  }, [profile]);

  async function save(patch: ProfilePatch) {
    setSaving(true);
    try {
      const err = await getStore().updateProfile(patch);
      if (err) {
        toast(err, "error");
      } else {
        await refresh();
        toast("Saqlandi", "success");
      }
    } catch {
      toast("Saqlashda xatolik", "error");
    } finally {
      setSaving(false);
    }
  }

  if (!profile) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 size={26} className="animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">Sozlamalar</h1>
        <p className="mt-1 text-sm text-ink-soft">
          Profilingiz, o‘rganish uslubingiz va ilova xatti-harakati.
        </p>
      </div>

      {/* Avatar */}
      <Card>
        <CardTitle className="mb-1 flex items-center gap-2">
          <Palette size={16} className="text-primary" />
          Avatar
        </CardTitle>
        <CardDescription className="mb-4">
          12 ta hayvoncha avatardan birini tanlang.
        </CardDescription>
        <div className="grid grid-cols-6 gap-3 sm:grid-cols-12">
          {avatars.map((a) => (
            <button
              key={a.id}
              type="button"
              aria-label={a.label}
              aria-pressed={avatarId === a.id}
              onClick={() => {
                setAvatarId(a.id);
                void save({ avatarId: a.id });
              }}
              className={cn(
                "relative flex aspect-square items-center justify-center rounded-full border-2 text-2xl transition-transform hover:scale-110",
                avatarId === a.id
                  ? "border-primary shadow-md"
                  : "border-transparent",
              )}
              style={{ backgroundColor: a.bg }}
            >
              {a.emoji}
              {avatarId === a.id && (
                <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-white">
                  <Check size={11} strokeWidth={3} />
                </span>
              )}
            </button>
          ))}
        </div>
      </Card>

      {/* Kunlik maqsad va daraja */}
      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <CardTitle className="mb-1 flex items-center gap-2">
            <Target size={16} className="text-primary" />
            Kunlik maqsad
          </CardTitle>
          <CardDescription className="mb-4">
            Har kuni necha XP to‘plashni xohlaysiz?
          </CardDescription>
          <div className="space-y-2.5">
            {GOALS.map((g) => (
              <button
                key={g.value}
                type="button"
                onClick={() => {
                  setDailyGoal(g.value);
                  void save({ dailyGoal: g.value });
                }}
                aria-pressed={dailyGoal === g.value}
                className={cn(
                  "flex w-full items-center justify-between rounded-xl border-2 px-4 py-3 text-left transition-colors",
                  dailyGoal === g.value
                    ? "border-primary bg-primary-soft"
                    : "border-line bg-white hover:border-ink-faint",
                )}
              >
                <span>
                  <span className="block text-sm font-extrabold text-ink">{g.label}</span>
                  <span className="block text-xs text-ink-soft">{g.desc}</span>
                </span>
                {dailyGoal === g.value && (
                  <Check size={18} className="text-primary" />
                )}
              </button>
            ))}
          </div>
        </Card>

        <Card>
          <CardTitle className="mb-1 flex items-center gap-2">
            <Globe size={16} className="text-accent-blue" />
            Joriy daraja
          </CardTitle>
          <CardDescription className="mb-4">
            O‘zingizga mos darajani tanlang (A1 boshlang‘ich).
          </CardDescription>
          <div className="grid grid-cols-4 gap-2">
            {LEVELS.map((l) => (
              <button
                key={l}
                type="button"
                disabled={l !== "A1"}
                onClick={() => {
                  setCurrentLevel(l);
                  void save({ currentLevel: l });
                }}
                aria-pressed={currentLevel === l}
                className={cn(
                  "rounded-xl border-2 py-3 text-sm font-extrabold transition-colors",
                  currentLevel === l
                    ? "border-primary bg-primary-soft text-primary-ink"
                    : "border-line bg-white text-ink-soft",
                  l !== "A1" && "cursor-not-allowed opacity-50",
                )}
                title={l !== "A1" ? "Tez orada ochiladi" : undefined}
              >
                {l}
              </button>
            ))}
          </div>
          <p className="mt-4 text-xs text-ink-soft">
            A2, B1, B2 darajalari keyingi bosqichlarda qo‘shiladi.
          </p>
        </Card>
      </div>

      {/* Toggles */}
      <Card>
        <CardTitle className="mb-4">Ilova xatlari</CardTitle>
        <div className="space-y-1">
          <ToggleRow
            icon={<Volume2 size={17} className="text-accent-blue" />}
            title="Ovoz effektlari"
            desc="To‘g‘ri/noto‘g‘ri javob tovushlari"
            checked={sound}
            onChange={(v) => {
              setSound(v);
              playSound("click", v);
              void save({ soundEnabled: v });
            }}
          />
          <ToggleRow
            icon={<Bell size={17} className="text-accent-yellow" />}
            title="Bildirishnomalar"
            desc="Kunlik eslatmalar (demo rejimida cheklangan)"
            checked={notifications}
            onChange={(v) => {
              setNotifications(v);
              void save({ notificationsEnabled: v });
            }}
          />
          <ToggleRow
            icon={<Heart size={17} className="text-error" />}
            title="Yuraklar tizimi"
            desc="O‘chirilsa — darslar cheksiz yurak bilan o‘ynaladi"
            checked={hearts}
            onChange={(v) => {
              setHearts(v);
              void save({ heartsEnabled: v });
            }}
          />
        </div>
      </Card>

      {/* Hisob */}
      <Card>
        <CardTitle className="mb-1">Hisob</CardTitle>
        <CardDescription className="mb-4">
          {profile.email} · @{profile.username}
          {demoMode && " · DEMO rejimi (ma’lumotlar brauzerda)"}
        </CardDescription>
        <div className="flex flex-wrap gap-3">
          <Button
            variant="secondary"
            onClick={async () => {
              setSigningOut(true);
              await signOut();
              router.replace("/");
            }}
            disabled={signingOut}
          >
            {signingOut ? <Loader2 size={16} className="animate-spin" /> : <LogOut size={16} />}
            Hisobdan chiqish
          </Button>
        </div>
        <div className="mt-4 flex items-center gap-2 rounded-xl bg-surface p-3 text-xs text-ink-soft">
          <Avatar avatarId={profile.avatarId} size="sm" />
          <span className="flex-1">
            Avatar, maqsad va bildirishnoma sozlamalari avtomatik saqlanadi.
          </span>
          {saving && <Loader2 size={14} className="animate-spin text-primary" />}
        </div>
      </Card>

      <div className="flex items-center justify-center gap-2 pb-6 text-xs text-ink-faint">
        <ShieldCheck size={14} /> RusGo — xavfsizlik: XP va admin huquqlari serverda tekshiriladi.
      </div>
    </div>
  );
}

function ToggleRow({
  icon,
  title,
  desc,
  checked,
  onChange,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl px-1 py-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-surface">
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <Label className="mb-0">{title}</Label>
        <span className="block text-xs text-ink-soft">{desc}</span>
      </span>
      <Switch checked={checked} onChange={onChange} label={title} />
    </div>
  );
}
