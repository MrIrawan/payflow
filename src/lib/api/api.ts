// Custom error class for API errors
export class APIError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: unknown
  ) {
    super(message);
    this.name = "APIError";
  }
}

// Configuration interface for fetch wrapper
export interface FetchConfig extends RequestInit {
  timeout?: number; // timeout in ms (default: 30000)
  retries?: number; // number of retries (default: 0)
  onRequest?: (config: FetchConfig) => void | Promise<void>; // request interceptor
  onResponse?: (response: Response) => void | Promise<void>; // response interceptor
  onError?: (error: APIError) => void | Promise<void>; // error interceptor
}

/**
 * Fetch wrapper for type-safe API requests
 * @template T - The expected response type
 * @param apiUrl - The API endpoint URL
 * @param config - Fetch configuration with customization options
 * @returns Promise with typed response data
 */
export async function fetchAPI<T>(
  apiUrl: string | URL,
  config: FetchConfig = {}
): Promise<T> {
  const {
    timeout = 30000,
    retries = 0,
    onRequest,
    onResponse,
    onError,
    ...fetchOptions
  } = config;

  let lastError: APIError | null = null;

  // Retry loop
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      // Call request interceptor
      if (onRequest) {
        await onRequest(config);
      }

      // Create abort controller for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      try {
        const response = await fetch(apiUrl, {
          ...fetchOptions,
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        // Call response interceptor
        if (onResponse) {
          await onResponse(response);
        }

        // Handle non-ok responses
        if (!response.ok) {
          let errorData: unknown;
          try {
            errorData = await response.json();
          } catch {
            errorData = null;
          }

          const error = new APIError(
            `HTTP error! status: ${response.status}`,
            response.status,
            errorData
          );

          // Call error interceptor
          if (onError) {
            await onError(error);
          }

          throw error;
        }

        // Parse response
        const data = await response.json();
        return data as T;
      } catch (error) {
        clearTimeout(timeoutId);

        if (error instanceof TypeError && error.message.includes("fetch")) {
          throw new APIError("Network error: Failed to fetch", 0, error);
        }

        if (
          error instanceof DOMException &&
          error.name === "AbortError"
        ) {
          throw new APIError(`Request timeout after ${timeout}ms`, 408);
        }

        throw error;
      }
    } catch (error) {
      lastError =
        error instanceof APIError
          ? error
          : new APIError(
              error instanceof Error ? error.message : "Unknown error",
              0,
              error
            );

      // If no retries left or not a retriable error, throw
      if (attempt === retries) {
        throw lastError;
      }

      // Exponential backoff: wait before retrying
      const delay = Math.pow(2, attempt) * 1000;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw lastError || new APIError("Unknown error occurred", 0);
}
