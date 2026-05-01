import userClient from "@/lib/axios/userClient";

import { ApiResponse } from "@/types/api";
import { GetOwnCompanyData } from "@/types/response";

export const getOwnCompany = async () => {
    const response = await userClient.get<ApiResponse<GetOwnCompanyData[]>>("/company");

    return response;
}