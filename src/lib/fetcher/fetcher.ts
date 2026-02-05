type FetcherConfig = RequestInit & {
  params?: Record<string, string | number>;
};

type FetcherResult<T> =
  | { ok: true; status: number; data: T }
  | { ok: false; status: number; message: string; raw?: unknown };

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

/**
 * low-level request helper (biar bisa dipakai ulang saat retry)
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
    credentials: "include", // 🔑 WAJIB untuk HTTPOnly cookie
    headers: {
      "Content-Type": "application/json",
      ...(config?.headers || {}),
    },
    ...config,
  });
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
    // 2️⃣ kalau bukan 401
    // =====================
    if (response.status !== 401) {
      if (!response.ok) {
        return {
          ok: false,
          status: response.status,
          message:
            typeof body?.message === "string"
              ? body.message
              : "Request failed",
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
    // 3️⃣ handle 401 → refresh
    // =====================
    const refreshResponse = await doRequest("/refresh", {
      method: "POST",
    });

    if (!refreshResponse.ok) {
      // refresh token invalid / expired
      return {
        ok: false,
        status: 401,
        message: "Unauthenticated",
        raw: await refreshResponse.json().catch(() => null),
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
