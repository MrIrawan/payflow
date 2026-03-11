import userClient from "@/lib/axios/userClient";

import { ApiResponse } from "@/types/api";
import { GetEmployeeInfoData } from "@/types/response";

export const getEmployeeInfo = async () => {
    const response = await userClient.get<ApiResponse<GetEmployeeInfoData>>("/info");

    return response;
}