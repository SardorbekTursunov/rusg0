"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, UserPlus, User, AtSign, Mail, Lock } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import { Input, Label, FieldError } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/components/providers/auth-provider";
import { registerSchema, type RegisterInput } from "@/lib/validations/auth";
import { SIGNUP_NEEDS_CONFIRMATION } from "@/lib/store/types";

export default function RegisterPage() {
  const router = useRouter();
  const { status, signUp, demoMode } = useAuth();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({ resolver: zodResolver(registerSchema) });

  useEffect(() => {
    if (status === "authenticated") router.replace("/dashboard");
  }, [status, router]);

  const onSubmit = async (values: RegisterInput) => {
    setServerError(null);
    const err = await signUp({
      email: values.email,
      password: values.password,
      username: values.username,
      fullName: values.fullName,
    });
    if (err === SIGNUP_NEEDS_CONFIRMATION) {
      router.replace(`/verify?email=${encodeURIComponent(values.email.trim())}`);
      return;
    }
    if (err) {
      setServerError(err);
      return;
    }
    router.replace("/onboarding");
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
              <UserPlus size={22} className="text-primary" />
            </span>
            <h1 className="text-2xl font-extrabold text-ink">Hisob yarating</h1>
            <p className="mt-1.5 text-sm text-ink-soft">
              Bir necha soniyada — va o‘rganish boshlanadi
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
              <Label htmlFor="fullName">To‘liq ism</Label>
              <div className="relative">
                <User
                  size={16}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint"
                />
                <Input
                  id="fullName"
                  placeholder="Aziza Karimova"
                  autoComplete="name"
                  className="pl-10"
                  {...register("fullName")}
                />
              </div>
              <FieldError message={errors.fullName?.message} />
            </div>

            <div>
              <Label htmlFor="username">Username</Label>
              <div className="relative">
                <AtSign
                  size={16}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint"
                />
                <Input
                  id="username"
                  placeholder="aziza_k"
                  autoComplete="username"
                  className="pl-10"
                  {...register("username")}
                />
              </div>
              <FieldError message={errors.username?.message} />
            </div>

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
                  placeholder="ism@example.com"
                  autoComplete="email"
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
                  placeholder="Kamida 6 ta belgi"
                  autoComplete="new-password"
                  className="pl-10"
                  {...register("password")}
                />
              </div>
              <FieldError message={errors.password?.message} />
            </div>

            <div>
              <Label htmlFor="confirmPassword">Parolni tasdiqlang</Label>
              <div className="relative">
                <Lock
                  size={16}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint"
                />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Parolni qayta kiriting"
                  autoComplete="new-password"
                  className="pl-10"
                  {...register("confirmPassword")}
                />
              </div>
              <FieldError message={errors.confirmPassword?.message} />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : null}
              Ro‘yxatdan o‘tish
            </Button>
          </form>

          {demoMode && (
            <div className="mt-4 rounded-xl bg-accent-yellow-soft p-3 text-xs leading-relaxed text-[#8a6d00]">
              <strong>DEMO rejimi:</strong> ma’lumotlar brauzeringizda saqlanadi.
              Admin hisobi — <code className="font-bold">admin@rusgo.uz</code> /{" "}
              <code className="font-bold">admin1234</code>
            </div>
          )}

          <p className="mt-6 text-center text-sm text-ink-soft">
            Hisobingiz bormi?{" "}
            <Link href="/login" className="font-bold text-primary hover:underline">
              Kirish
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
