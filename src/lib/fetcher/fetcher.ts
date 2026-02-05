type FetcherConfig = RequestInit & {
  params?: Record<string, string | number>;
};

type FetcherResult<T> =
  | { ok: true; status: number; data: T }
  | { ok: false; status: number; message: string; raw?: unknown };

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

// ======================
// 🔐 refresh lock
// ======================
let isRefreshing = false;
let refreshPromise: Promise<boolean> | null = null;

/**
 * low-level request helper
 */
async function doRequest(
  endpoint: string,
  config?: FetcherConfig
): Promise<Response> {
  const query = config?.params
    ? "?" +
    new URLSearchParams(
      Object.entries(config.params).map(([k, v]) => [k, String(v)])
    ).toString()
    : "";

  return fetch(`${BASE_URL}${endpoint}${query}`, {
    credentials: "include", // 🔑 HTTPOnly cookie
    headers: {
      "Content-Type": "application/json",
      ...(config?.headers || {}),
    },
    ...config,
  });
}

/**
 * refresh session (server-side supabase)
 */
async function refreshSession(): Promise<boolean> {
  try {
    const res = await doRequest("/refresh", { method: "POST" });
    return res.ok;
  } catch {
    return false;
  }
}

export async function fetcher<T>(
  endpoint: string,
  config?: FetcherConfig
): Promise<FetcherResult<T>> {
  try {
    // =====================
    // 1️⃣ request pertama
    // =====================
    let response = await doRequest(endpoint, config);
    let body = await response.json().catch(() => null);

    // =====================
    // 2️⃣ bukan 401 → normal flow
    // =====================
    if (response.status !== 401) {
      if (!response.ok) {
        return {
          ok: false,
          status: response.status,
          message:
            typeof body?.message === "string"
              ? body.message
              : leadingError(response.status),
          raw: body,
        };
      }

      return {
        ok: true,
        status: response.status,
        data: body as T,
      };
    }

    // =====================
    // ⛔ jangan refresh ulang /refresh
    // =====================
    if (endpoint === "/refresh") {
      handleLogout();
      return {
        ok: false,
        status: 401,
        message: "Unauthenticated",
      };
    }

    // =====================
    // 3️⃣ handle 401 → refresh (LOCKED)
    // =====================
    if (!isRefreshing) {
      isRefreshing = true;
      refreshPromise = refreshSession().finally(() => {
        isRefreshing = false;
      });
    }

    const refreshed = await refreshPromise;

    if (!refreshed) {
      handleLogout();
      return {
        ok: false,
        status: 401,
        message: "Session expired",
      };
    }

    // =====================
    // 4️⃣ retry request awal
    // =====================
    response = await doRequest(endpoint, config);
    body = await response.json().catch(() => null);

    if (!response.ok) {
      return {
        ok: false,
        status: response.status,
        message:
          typeof body?.message === "string"
            ? body.message
            : "Request failed after refresh",
        raw: body,
      };
    }

    return {
      ok: true,
      status: response.status,
      data: body as T,
    };
  } catch (err) {
    return {
      ok: false,
      status: 0,
      message: "Network error",
      raw: err,
    };
  }
}

/**
 * helper message (optional tapi rapi)
 */
function leadingError(status: number) {
  if (status === 403) return "Forbidden";
  if (status === 404) return "Not found";
  if (status >= 500) return "Server error";
  return "Request failed";
}

function handleLogout() {
  // optional: clear client state
  // zustand.reset()
  // queryClient.clear()

  window.location.href = "/signIn";
}