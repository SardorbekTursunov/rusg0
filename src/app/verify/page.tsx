"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2, MailCheck, RefreshCw, ShieldCheck } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/components/providers/auth-provider";
import { verifySignupCode, resendSignupCode } from "@/lib/auth/email-verify";

function VerifyForm() {
  const router = useRouter();
  const { status, refresh } = useAuth();
  const searchParams = useSearchParams();
  const urlEmail = searchParams.get("email") ?? "";

  const [email, setEmail] = useState(urlEmail);
  const [code, setCode] = useState("");
  const [serverError, setServerError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [resendIn, setResendIn] = useState(0);
  const navigatedRef = useRef(false);

  // Allaqachon tizimda bo'lsa (tasdiqlangan) — dashboard'ga
  useEffect(() => {
    if (status === "authenticated" && !navigatedRef.current) {
      navigatedRef.current = true;
      router.replace("/dashboard");
    }
  }, [status, router]);

  // "Qayta yuborish" taymeri
  useEffect(() => {
    if (resendIn <= 0) return;
    const t = setTimeout(() => setResendIn((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [resendIn]);

  const onVerify = async () => {
    setServerError(null);
    setInfo(null);
    if (!email.trim()) {
      setServerError("Avval emailingizni kiriting.");
      return;
    }
    if (!/^\d{6,8}$/.test(code.trim())) {
      setServerError("Kod noto‘g‘ri. Pochtadagi kodni to‘liq kiriting.");
      return;
    }
    const err = await verifySignupCode(email, code);
    if (err) {
      setServerError(err);
      return;
    }
    // Muvaffaqiyat — sessiya ochiladi
    navigatedRef.current = true;
    await refresh();
    router.replace("/onboarding");
  };

  const onResend = async () => {
    setServerError(null);
    setInfo(null);
    if (!email.trim()) {
      setServerError("Avval emailingizni kiriting.");
      return;
    }
    const err = await resendSignupCode(email);
    if (err) {
      setServerError(err);
      return;
    }
    setInfo("Yangi kod pochtangizga yuborildi. Spam papkani ham tekshirib ko‘ring.");
    setResendIn(60);
  };

  const busy = false; // verifyOtp tez; animatsiya uchun alohida state kerak emas

  return (
    <Card className="p-6 sm:p-8">
      <div className="mb-6 text-center">
        <span className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-soft">
          <MailCheck size={22} className="text-primary" />
        </span>
        <h1 className="text-2xl font-extrabold text-ink">Emailni tasdiqlang</h1>
        <p className="mt-1.5 text-sm text-ink-soft">
          Pochtangizga yuborilgan <strong>tasdiqlash kodi</strong>ni kiriting
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
      {info && (
        <div className="mb-4 rounded-xl border-l-4 border-[#2e7d32] bg-[#e8f5e9] px-4 py-3 text-sm font-semibold text-[#1b5e20]">
          {info}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="ism@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            readOnly={urlEmail !== ""}
          />
        </div>

        <div>
          <Label htmlFor="code">Tasdiqlash kodi</Label>
          <Input
            id="code"
            inputMode="numeric"
            autoComplete="one-time-code"
            placeholder="••••••"
            maxLength={8}
            className="text-center text-2xl font-extrabold tracking-[0.4em]"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 8))}
            onKeyDown={(e) => {
              if (e.key === "Enter") void onVerify();
            }}
          />
        </div>

        <Button type="button" onClick={() => void onVerify()} className="w-full" disabled={busy}>
          <ShieldCheck size={16} />
          Tasdiqlash
        </Button>

        <Button
          type="button"
          variant="secondary"
          onClick={() => void onResend()}
          className="w-full"
          disabled={resendIn > 0 || busy}
        >
          {resendIn > 0 ? <RefreshCw size={16} className="opacity-60" /> : <RefreshCw size={16} />}
          {resendIn > 0 ? `Qayta yuborish (${resendIn}s)` : "Kodni qayta yuborish"}
        </Button>
      </div>

      <p className="mt-6 text-center text-sm text-ink-soft">
        Hisobingiz bormi va tasdiqlanganmi?{" "}
        <Link href="/login" className="font-bold text-primary hover:underline">
          Kirish
        </Link>
      </p>
    </Card>
  );
}

function VerifyLoading() {
  return (
    <Card className="p-10 text-center">
      <Loader2 size={26} className="mx-auto animate-spin text-primary" />
    </Card>
  );
}

export default function VerifyPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-4 py-10">
      <div className="w-full max-w-md animate-fade-up">
        <Link href="/" className="mb-6 flex justify-center">
          <Logo size={38} />
        </Link>
        <Suspense fallback={<VerifyLoading />}>
          <VerifyForm />
        </Suspense>
        <p className="mt-4 text-center text-sm text-ink-soft">
          <Link href="/" className="hover:text-ink">
            ← Bosh sahifaga qaytish
          </Link>
        </p>
      </div>
    </div>
  );
}
