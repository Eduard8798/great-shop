import { NextResponse } from "next/server";
import { djangoFetch, UpstreamUnreachableError } from "@/shared/api/server";
import { getAccessToken } from "@/shared/auth/tokens";

export async function GET() {
  const access = await getAccessToken();
  if (!access) {
    return NextResponse.json({ detail: "Not authenticated" }, { status: 401 });
  }

  let upstream: Response;
  try {
    upstream = await djangoFetch("/users/current-user/", { access });
  } catch (err) {
    if (err instanceof UpstreamUnreachableError) {
      return NextResponse.json(
        { detail: "Authentication service is unavailable" },
        { status: 503 },
      );
    }
    throw err;
  }
  const data = await upstream.json().catch(() => null);

  if (!upstream.ok) {
    return NextResponse.json(
      data ?? { detail: "Failed to load profile" },
      { status: upstream.status },
    );
  }

  return NextResponse.json(data);
}
