type FetcherConfig = RequestInit & {
  params?: Record<string, string | number>;
};

type FetcherResult<T> =
  | { ok: true; status: number; data: T }
  | { ok: false; status: number; message: string; raw?: unknown };

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

export async function fetcher<T>(
  endpoint: string,
  config?: FetcherConfig
): Promise<FetcherResult<T>> {
  const query = config?.params
    ? "?" +
    new URLSearchParams(
      Object.entries(config.params).map(([k, v]) => [k, String(v)])
    ).toString()
    : "";

  try {
    const response = await fetch(`${BASE_URL}${endpoint}${query}`, {
      headers: {
        "Content-Type": "application/json",
        ...(config?.headers || {}),
      },
      ...config,
    });

    const body = await response.json().catch(() => null);

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
  } catch (err) {
    return {
      ok: false,
      status: 0,
      message: "Network error",
      raw: err,
    };
  }
}
