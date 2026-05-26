import { NextResponse } from "next/server";
import { djangoFetch, UpstreamUnreachableError } from "@/shared/api/server";
import { setAuthCookies, decodeAccessExp } from "@/shared/auth/tokens";
import type { LoginPayload, TokenPair } from "@/shared/auth/types";

export async function POST(request: Request) {
  let body: Partial<LoginPayload>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ detail: "Invalid JSON" }, { status: 400 });
  }

  const email_or_phone = body.email_or_phone?.trim();
  const password = body.password;

  if (!email_or_phone || !password) {
    return NextResponse.json(
      { detail: "email_or_phone and password are required" },
      { status: 400 },
    );
  }

  let upstream: Response;
  try {
    upstream = await djangoFetch("/login/", {
      method: "POST",
      body: JSON.stringify({ email_or_phone, password }),
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

  const data = (await upstream.json().catch(() => null)) as TokenPair | Record<string, unknown> | null;

  if (!upstream.ok || !data || typeof data !== "object" || !("access" in data)) {
    return NextResponse.json(
      data ?? { detail: "Login failed" },
      { status: upstream.status },
    );
  }

  const tokens = data as TokenPair;
  await setAuthCookies(tokens);

  const accessExp = decodeAccessExp(tokens.access);
  return NextResponse.json({ ok: true, accessExp });
}
