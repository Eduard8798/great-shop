import "server-only";
import { cookies } from "next/headers";
import type { AccessClaims, TokenPair } from "./types";

const ACCESS_COOKIE = "gs_access";
const REFRESH_COOKIE = "gs_refresh";

const baseCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

export function decodeAccessExp(access: string): number | null {
  const parts = access.split(".");
  if (parts.length !== 3) return null;
  try {
    const payload = JSON.parse(
      Buffer.from(parts[1], "base64url").toString("utf8"),
    ) as AccessClaims;
    return typeof payload.exp === "number" ? payload.exp : null;
  } catch {
    return null;
  }
}

export async function setAuthCookies({ access, refresh }: TokenPair) {
  const store = await cookies();
  const accessExp = decodeAccessExp(access);
  const accessMaxAge = accessExp
    ? Math.max(60, accessExp - Math.floor(Date.now() / 1000))
    : 60 * 60;

  store.set(ACCESS_COOKIE, access, { ...baseCookieOptions, maxAge: accessMaxAge });
  store.set(REFRESH_COOKIE, refresh, { ...baseCookieOptions, maxAge: 60 * 60 * 24 });
}

export async function clearAuthCookies() {
  const store = await cookies();
  store.delete(ACCESS_COOKIE);
  store.delete(REFRESH_COOKIE);
}

export async function getAccessToken(): Promise<string | null> {
  const store = await cookies();
  return store.get(ACCESS_COOKIE)?.value ?? null;
}

export async function getRefreshToken(): Promise<string | null> {
  const store = await cookies();
  return store.get(REFRESH_COOKIE)?.value ?? null;
}

export { ACCESS_COOKIE, REFRESH_COOKIE };
