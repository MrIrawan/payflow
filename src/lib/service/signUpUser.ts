import { fetcher } from "../fetcher/fetcher";
import { SignUpRequest } from "@/types/request";
import { SignUpResponse } from "@/types/response";

export const signUpUser = async (data: SignUpRequest) => {
  const response = fetcher<SignUpResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
    credentials: "include"
  })

  return response
}