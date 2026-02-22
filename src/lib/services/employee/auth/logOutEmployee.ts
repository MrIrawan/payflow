import userClient from "@/lib/axios/userClient";

import { ApiResponse } from "@/types/api";
import { LogOutEmployeeResponse } from "@/types/response";

export const logOutEmployee = async () => {
    const response = await userClient.post<ApiResponse<LogOutEmployeeResponse>>("/auth/logout");

    return response;
}