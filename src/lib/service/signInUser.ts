import { fetchAPI } from "../api/api";
import { SignInRequest } from "@/types/request";
import { SignInResponse } from "@/types/response";

export async function signInUser(signInData: SignInRequest) {
  const response = await fetchAPI<SignInResponse>(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/login`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signInData),
      timeout: 10000,
      retries: 2,
      credentials: "include",
      onError: (error) => console.error("Auth error:", error.message),
    }
  );

  return response;
}
