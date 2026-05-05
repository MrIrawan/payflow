import userClient from "@/lib/axios/userClient";

import { ApiResponse } from "@/types/api";
import { JoinCompanyRequest } from "@/types/request";
import { JoinCompanyData } from "@/types/response";

export const joinCompany = async (companyKey: JoinCompanyRequest) => {
    const response = await userClient.post<ApiResponse<JoinCompanyData>>("/company/join", companyKey);

    return response;
}