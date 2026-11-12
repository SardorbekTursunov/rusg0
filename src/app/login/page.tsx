"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, LogIn, Mail, Lock, ShieldAlert } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import { Input, Label, FieldError } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/components/providers/auth-provider";
import { loginSchema, type LoginInput } from "@/lib/validations/auth";
import {
  checkLoginAllowed,
  registerLoginFailure,
  clearLoginFailures,
  formatLockTime,
} from "@/lib/auth/login-guard";

export default function LoginPage() {
  const router = useRouter();
  const { status, signIn, demoMode } = useAuth();
  const [serverError, setServerError] = useState<string | null>(null);
  const [lockSeconds, setLockSeconds] = useState<number | null>(null);
  const [attemptsLeft, setAttemptsLeft] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  useEffect(() => {
    if (status === "authenticated") router.replace("/dashboard");
  }, [status, router]);

  // Blok taymeri: har sekund sanaydi, nolga yetganda formani ochadi
  useEffect(() => {
    if (lockSeconds === null) return;
    if (lockSeconds <= 0) {
      setLockSeconds(null);
      setServerError(null);
      return;
    }
    const t = setTimeout(() => setLockSeconds((s) => (s === null ? null : s - 1)), 1000);
    return () => clearTimeout(t);
  }, [lockSeconds]);

  const onSubmit = async (values: LoginInput) => {
    setServerError(null);
    setAttemptsLeft(null);

    // 1) Blok tekshiruvi (server tomonda)
    const check = await checkLoginAllowed(values.email);
    if (!check.allowed) {
      setLockSeconds(check.remainingSeconds);
      setServerError(
        `Ko‘p marta xato kiritildi. Hisobingiz vaqtincha bloklandi (${formatLockTime(check.remainingSeconds)}).`,
      );
      return;
    }

    // 2) Odatiy login
    const err = await signIn(values.email, values.password);
    if (err) {
      // 3) Xato urinishni serverga yozamiz
      await registerLoginFailure(values.email);
      const after = await checkLoginAllowed(values.email);
      if (!after.allowed) {
        setLockSeconds(after.remainingSeconds);
        setServerError(
          `3 marta noto‘g‘ri parol kiritildi. Hisobingiz ${formatLockTime(after.remainingSeconds)} ga bloklandi.`,
        );
      } else {
        setAttemptsLeft(after.attemptsLeft);
        setServerError(
          after.attemptsLeft > 0
            ? `${err} Yana ${after.attemptsLeft} ta urinish qoldi.`
            : err,
        );
      }
      return;
    }

    // 4) Muvaffaqiyat — hisoblagichni tozalaymiz
    await clearLoginFailures(values.email);
    router.replace("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-4 py-10">
      <div className="w-full max-w-md animate-fade-up">
        <Link href="/" className="mb-6 flex justify-center">
          <Logo size={38} />
        </Link>

        <Card className="p-6 sm:p-8">
          <div className="mb-6 text-center">
            <span className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-soft">
              <LogIn size={22} className="text-primary" />
            </span>
            <h1 className="text-2xl font-extrabold text-ink">Xush kelibsiz!</h1>
            <p className="mt-1.5 text-sm text-ink-soft">
              Davom etish uchun hisobingizga kiring
            </p>
          </div>

          {lockSeconds !== null ? (
            <div
              role="alert"
              className="mb-4 flex items-start gap-3 rounded-xl border-l-4 border-error bg-error-soft px-4 py-3 text-sm font-semibold text-[#c62828]"
            >
              <ShieldAlert size={18} className="mt-0.5 shrink-0" />
              <span>
                Ko‘p marta xato kiritildi. Hisobingiz vaqtincha bloklandi.
                <span className="mt-1 block tabular-nums">
                  Qayta urinish mumkin bo‘ladi: {formatLockTime(lockSeconds)}
                </span>
              </span>
            </div>
          ) : (
            serverError && (
              <div
                role="alert"
                className="mb-4 rounded-xl border-l-4 border-error bg-error-soft px-4 py-3 text-sm font-semibold text-[#c62828]"
              >
                {serverError}
              </div>
            )
          )}

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail
                  size={16}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint"
                />
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="ism@example.com"
                  className="pl-10"
                  {...register("email")}
                />
              </div>
              <FieldError message={errors.email?.message} />
            </div>

            <div>
              <Label htmlFor="password">Parol</Label>
              <div className="relative">
                <Lock
                  size={16}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint"
                />
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="pl-10"
                  {...register("password")}
                />
              </div>
              <FieldError message={errors.password?.message} />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting || lockSeconds !== null}>
              {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : null}
              {lockSeconds !== null
                ? `Bloklangan — ${formatLockTime(lockSeconds)}`
                : "Kirish"}
            </Button>

            {lockSeconds === null && attemptsLeft !== null && attemptsLeft > 0 && (
              <p className="text-center text-xs font-semibold text-ink-soft">
                Ehtiyot bo‘ling: yana {attemptsLeft} ta urinish qoldi, undan keyin hisob 10
                daqiqaga bloklanadi.
              </p>
            )}
          </form>

          {demoMode && (
            <div className="mt-4 rounded-xl bg-accent-yellow-soft p-3 text-xs leading-relaxed text-[#8a6d00]">
              <strong>DEMO rejimi:</strong> admin hisobi —{" "}
              <code className="font-bold">admin@rusgo.uz</code> /{" "}
              <code className="font-bold">admin1234</code>
            </div>
          )}

          <p className="mt-6 text-center text-sm text-ink-soft">
            Hisobingiz yo‘qmi?{" "}
            <Link href="/register" className="font-bold text-primary hover:underline">
              Ro‘yxatdan o‘tish
            </Link>
          </p>
        </Card>

        <p className="mt-4 text-center text-sm text-ink-soft">
          <Link href="/" className="hover:text-ink">
            ← Bosh sahifaga qaytish
          </Link>
        </p>
      </div>
    </div>
  );
}
