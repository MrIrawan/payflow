import adminClient from "@/lib/axios/adminClient";

import { ApiResponse } from "@/types/api";
import { SignInAdminRequest } from "@/types/request";
import { SignInAdminResponse } from "@/types/response";

export const signInAdmin = async (data: SignInAdminRequest) => {
    const response = await adminClient.post<ApiResponse<SignInAdminResponse>>("/auth/signIn", data);

    return response;
}