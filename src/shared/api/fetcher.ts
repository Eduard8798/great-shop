let refreshInFlight: Promise<Response> | null = null;

function refreshOnce(): Promise<Response> {
  if (!refreshInFlight) {
    refreshInFlight = fetch("/api/auth/refresh", {
      method: "POST",
      credentials: "same-origin",
    }).finally(() => {
      refreshInFlight = null;
    });
  }
  return refreshInFlight;
}

export async function apiFetch(
  input: RequestInfo | URL,
  init: RequestInit = {},
): Promise<Response> {
  const opts: RequestInit = { ...init, credentials: "same-origin" };

  const first = await fetch(input, opts);
  if (first.status !== 401) return first;

  const refreshed = await refreshOnce();
  if (!refreshed.ok) return first;

  return fetch(input, opts);
}
