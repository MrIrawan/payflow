import userClient from "@/lib/axios/userClient";

import { ApiResponse } from "@/types/api";
import { GetOwnCompanyData, GetOwnCompanyResponse } from "@/types/response";

export const getOwnCompany = async () => {
    try {
        const response = await userClient.get<ApiResponse<GetOwnCompanyData[]>>("/company");

        return {
            success: response.data.success,
            message: response.data.message,
            data: response.data.data
        }
    } catch (error: ApiResponse<GetOwnCompanyResponse> | any) {
        return {
            success: false,
            message: error.message || "gagal mengambil data perusahaan.",
            status: error.status || 500,
            data: null
        }
    }
}