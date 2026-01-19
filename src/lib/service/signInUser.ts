import { fetcher } from "../fetcher/fetcher";
import { SignInRequest } from "@/types/request";
import { SignInResponse } from "@/types/response";

export const signInUser = async (data: SignInRequest) => {
  const response = await fetcher<SignInResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
    credentials: "include"
  })

  if (!response.ok) {
    return {
      isSuccess: false,
      message: response.message,
      status: response.status,
      raw: response.raw,
    }
  }

  return {
    isSuccess: true,
    status: response.status,
    data: response.data,
  }
}