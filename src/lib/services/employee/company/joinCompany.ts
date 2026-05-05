import userClient from "@/lib/axios/userClient";

import { ApiResponse } from "@/types/api";
import { JoinCompanyRequest } from "@/types/request";
import { JoinCompanyData } from "@/types/response";

export const joinCompany = async (companyKey: JoinCompanyRequest) => {
    try {
        const response = await userClient.post<ApiResponse<JoinCompanyData>>("/company/join", companyKey);

        return {
            success: true,
            message: response.data.message,
            data: response.data.data,
            status: response.status,
        }
    } catch (error: ApiResponse<JoinCompanyData> | any) {
        return {
            success: false,
            message: error.message as string,
            status: error.response?.status as number | undefined,
        }
    }
}