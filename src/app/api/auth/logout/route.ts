import { NextResponse } from "next/server";
import { clearAuthCookies } from "@/shared/auth/tokens";

export async function POST() {
  await clearAuthCookies();
  return NextResponse.json({ ok: true });
}
