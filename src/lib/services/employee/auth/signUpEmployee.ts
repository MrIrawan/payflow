import userClient from "../../../axios/userClient";

import { ApiResponse } from "@/types/api";
import { SignUpEmployeeRequest } from "@/types/request";
import { SignUpResponse } from "@/types/response";

export const signUpEmployee = async (data: SignUpEmployeeRequest) => {
    const response = await userClient.post<ApiResponse<SignUpResponse>>("/auth/register", data);

    return response;
}