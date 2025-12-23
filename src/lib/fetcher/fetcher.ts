type FetcherConfig = RequestInit & {
  params?: Record<string, string | number>;
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

export async function fetcher<T>(
  endpoint: string,
  config?: FetcherConfig
): Promise<T> {
  // handle query params (?page=1&limit=10)
  const query = config?.params
    ? "?" +
    new URLSearchParams(
      Object.entries(config.params).map(([k, v]) => [k, String(v)])
    ).toString()
    : "";

  const response = await fetch(`${BASE_URL}${endpoint}${query}`, {
    headers: {
      "Content-Type": "application/json",
      ...(config?.headers || {}),
    },
    ...config,
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.message || "Fetch error");
  }

  return response.json();
}
