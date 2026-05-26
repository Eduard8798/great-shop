import "server-only";

const API_URL = process.env.DJANGO_API_URL ?? "http://localhost:8080/api";

export function apiUrl(path: string): string {
  const trimmed = path.startsWith("/") ? path : `/${path}`;
  return `${API_URL.replace(/\/$/, "")}${trimmed}`;
}

export class UpstreamUnreachableError extends Error {
  constructor(public readonly cause: unknown) {
    super("Upstream API unreachable");
  }
}

export async function djangoFetch(
  path: string,
  init: RequestInit & { access?: string | null } = {},
): Promise<Response> {
  const { access, headers, ...rest } = init;
  const finalHeaders: HeadersInit = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(headers ?? {}),
    ...(access ? { Authorization: `Bearer ${access}` } : {}),
  };
  try {
    return await fetch(apiUrl(path), {
      ...rest,
      headers: finalHeaders,
      cache: "no-store",
    });
  } catch (err) {
    throw new UpstreamUnreachableError(err);
  }
}
