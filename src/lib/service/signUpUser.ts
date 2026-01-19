import { fetcher } from "../fetcher/fetcher";
import { SignUpRequest } from "@/types/request";
import { SignUpResponse } from "@/types/response";

export const signUpUser = async (data: SignUpRequest) => {
  const response = await fetcher<SignUpResponse>("/auth/register", {
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