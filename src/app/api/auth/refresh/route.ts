import { NextResponse } from "next/server";
import { djangoFetch, UpstreamUnreachableError } from "@/shared/api/server";
import {
  clearAuthCookies,
  decodeAccessExp,
  getRefreshToken,
  setAuthCookies,
} from "@/shared/auth/tokens";
import type { TokenPair } from "@/shared/auth/types";

export async function POST() {
  const refresh = await getRefreshToken();
  if (!refresh) {
    return NextResponse.json({ detail: "No refresh token" }, { status: 401 });
  }

  let upstream: Response;
  try {
    upstream = await djangoFetch("/token/refresh/", {
      method: "POST",
      body: JSON.stringify({ refresh }),
    });
  } catch (err) {
    if (err instanceof UpstreamUnreachableError) {
      return NextResponse.json(
        { detail: "Authentication service is unavailable" },
        { status: 503 },
      );
    }
    throw err;
  }

  const data = (await upstream.json().catch(() => null)) as
    | Partial<TokenPair>
    | Record<string, unknown>
    | null;

  if (!upstream.ok || !data || typeof data !== "object" || !("access" in data)) {
    if (upstream.status === 401) await clearAuthCookies();
    return NextResponse.json(
      data ?? { detail: "Refresh failed" },
      { status: upstream.status },
    );
  }

  const next: TokenPair = {
    access: (data as TokenPair).access,
    refresh: (data as Partial<TokenPair>).refresh ?? refresh,
  };
  await setAuthCookies(next);

  return NextResponse.json({ ok: true, accessExp: decodeAccessExp(next.access) });
}
