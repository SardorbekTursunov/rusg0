"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, LogIn, Mail, Lock } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import { Input, Label, FieldError } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/components/providers/auth-provider";
import { loginSchema, type LoginInput } from "@/lib/validations/auth";

export default function LoginPage() {
  const router = useRouter();
  const { status, signIn, demoMode } = useAuth();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  useEffect(() => {
    if (status === "authenticated") router.replace("/dashboard");
  }, [status, router]);

  const onSubmit = async (values: LoginInput) => {
    setServerError(null);
    const err = await signIn(values.email, values.password);
    if (err) {
      setServerError(err);
      return;
    }
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

          {serverError && (
            <div
              role="alert"
              className="mb-4 rounded-xl border-l-4 border-error bg-error-soft px-4 py-3 text-sm font-semibold text-[#c62828]"
            >
              {serverError}
            </div>
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

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : null}
              Kirish
            </Button>
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
