import { fetcher } from "../fetcher/fetcher";
import { SignInRequest } from "@/types/request";
import { SignInResponse } from "@/types/response";

export const signInUser = async (data: SignInRequest) => {
  const response = await fetcher<SignInResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
    credentials: "include"
  })

  return response;
}