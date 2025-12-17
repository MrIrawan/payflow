import { SignUpRequest } from "@/types/request";
import { fetchAPI } from "../api/api";
import { SignUpResponse } from "@/types/response";

export async function signUpUser(signUpData: SignUpRequest) {
  const response = await fetchAPI<SignUpResponse>(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/register`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signUpData),
      timeout: 10000,
      retries: 2,
      onError: (error) => console.error("Auth error:", error.message),
    }
  );

  return response;
}
