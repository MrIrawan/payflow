import userClient from "@/lib/axios/userClient";

import { ApiResponse } from "@/types/api";
import { SignInEmployeeRequest } from "@/types/request";
import { SignInResponse } from "@/types/response";

export const signInEmployee = async (data: SignInEmployeeRequest) => {
    const response = userClient.post<ApiResponse<SignInResponse>>("/auth/login", data);

    return response;
}