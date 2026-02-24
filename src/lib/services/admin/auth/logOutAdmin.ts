import adminClient from "@/lib/axios/adminClient";

import { ApiResponse } from "@/types/api";
import { LogOutAdminResponse } from "@/types/response";

export const logOutAdmin = async () => {
    const response = await adminClient.post<ApiResponse<LogOutAdminResponse>>("/auth/logout");

    return response;
}