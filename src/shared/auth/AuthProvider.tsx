"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { apiFetch } from "@/shared/api/fetcher";
import type { AuthUser, LoginPayload } from "./types";

type AuthState = {
  user: AuthUser | null;
  status: "loading" | "authenticated" | "anonymous";
  login: (payload: LoginPayload) => Promise<{ ok: boolean; error?: string }>;
  logout: () => Promise<void>;
  refresh: () => Promise<boolean>;
};

const AuthContext = createContext<AuthState | null>(null);

const REFRESH_LEEWAY_SECONDS = 120;
const MIN_REFRESH_INTERVAL_MS = 5 * 60 * 1000;

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [status, setStatus] = useState<AuthState["status"]>("loading");

  const accessExpRef = useRef<number | null>(null);
  const lastRefreshAtRef = useRef<number>(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const loadMe = useCallback(async (): Promise<AuthUser | null> => {
    const res = await apiFetch("/api/auth/me");
    if (!res.ok) return null;
    return (await res.json()) as AuthUser;
  }, []);

  const refresh = useCallback(async (): Promise<boolean> => {
    const now = Date.now();
    if (now - lastRefreshAtRef.current < MIN_REFRESH_INTERVAL_MS) return true;

    const res = await fetch("/api/auth/refresh", {
      method: "POST",
      credentials: "same-origin",
    });
    if (!res.ok) return false;

    const data = (await res.json().catch(() => null)) as
      | { accessExp?: number | null }
      | null;
    accessExpRef.current = data?.accessExp ?? null;
    lastRefreshAtRef.current = now;
    return true;
  }, []);

  const scheduleRefresh = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    const exp = accessExpRef.current;
    if (!exp) return;

    const nowSec = Math.floor(Date.now() / 1000);
    const fireInSec = Math.max(30, exp - nowSec - REFRESH_LEEWAY_SECONDS);
    timerRef.current = setTimeout(() => {
      if (document.visibilityState === "visible") void refresh();
    }, fireInSec * 1000);
  }, [refresh]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const me = await loadMe();
      if (cancelled) return;
      if (me) {
        setUser(me);
        setStatus("authenticated");
      } else {
        setStatus("anonymous");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [loadMe]);

  useEffect(() => {
    if (status !== "authenticated") return;
    scheduleRefresh();

    const onVisibility = () => {
      if (document.visibilityState !== "visible") return;
      const exp = accessExpRef.current;
      const nowSec = Math.floor(Date.now() / 1000);
      if (exp && exp - nowSec < REFRESH_LEEWAY_SECONDS) {
        void refresh().then(scheduleRefresh);
      } else {
        scheduleRefresh();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [status, refresh, scheduleRefresh]);

  const login = useCallback<AuthState["login"]>(
    async (payload) => {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => null)) as
        | { accessExp?: number | null; detail?: string }
        | null;

      if (!res.ok) {
        return { ok: false, error: data?.detail ?? "Login failed" };
      }

      accessExpRef.current = data?.accessExp ?? null;
      lastRefreshAtRef.current = Date.now();

      const me = await loadMe();
      setUser(me);
      setStatus(me ? "authenticated" : "anonymous");
      return { ok: !!me };
    },
    [loadMe],
  );

  const logout = useCallback<AuthState["logout"]>(async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "same-origin",
    });
    accessExpRef.current = null;
    setUser(null);
    setStatus("anonymous");
  }, []);

  return (
    <AuthContext.Provider value={{ user, status, login, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
