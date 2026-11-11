"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { AuthSession, Profile } from "@/types";
import { getStore } from "@/lib/store";
import { isDemoMode } from "@/lib/config";

export type AuthStatus = "loading" | "authenticated" | "anonymous";

interface SignUpInput {
  email: string;
  password: string;
  username: string;
  fullName: string;
}

interface AuthContextValue {
  status: AuthStatus;
  session: AuthSession | null;
  profile: Profile | null;
  demoMode: boolean;
  /** Ma'lumotlarni qayta yuklash (dars tugagach, sozlama o'zgarishida) */
  refresh: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<string | null>;
  signUp: (input: SignUpInput) => Promise<string | null>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>("loading");
  const [session, setSession] = useState<AuthSession | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  const refresh = useCallback(async () => {
    const store = getStore();
    try {
      const s = await store.getSession();
      setSession(s);
      if (s) {
        const p = await store.getProfile();
        setProfile(p);
        setStatus(p ? "authenticated" : "anonymous");
      } else {
        setProfile(null);
        setStatus("anonymous");
      }
    } catch {
      setSession(null);
      setProfile(null);
      setStatus("anonymous");
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const signIn = useCallback(
    async (email: string, password: string) => {
      const err = await getStore().signIn(email, password);
      if (!err) await refresh();
      return err;
    },
    [refresh],
  );

  const signUp = useCallback(
    async (input: SignUpInput) => {
      const err = await getStore().signUp(input);
      if (!err) await refresh();
      return err;
    },
    [refresh],
  );

  const signOut = useCallback(async () => {
    await getStore().signOut();
    setSession(null);
    setProfile(null);
    setStatus("anonymous");
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ status, session, profile, demoMode: isDemoMode, refresh, signIn, signUp, signOut }),
    [status, session, profile, refresh, signIn, signUp, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth AuthProvider ichida ishlatilishi kerak.");
  return ctx;
}
