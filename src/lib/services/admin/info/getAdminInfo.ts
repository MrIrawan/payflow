import adminClient from "@/lib/axios/adminClient";

import { ApiResponse } from "@/types/api";
import { GetAdminInfoData } from "@/types/response";

export const getAdminInfo = async () => {
    const response = await adminClient.get<ApiResponse<GetAdminInfoData>>("/info");

    return response;
}