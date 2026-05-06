import userClient from "@/lib/axios/userClient";

import { ApiResponse } from "@/types/api";
import { GetEmployeeInfoData, GetEmployeeInfoResponse } from "@/types/response";

export const getEmployeeInfo = async (companyId: number) => {
    try {
        const response = await userClient.get<ApiResponse<GetEmployeeInfoData>>(`/info?companyId=${companyId}`);

        return {
            success: response.data.success,
            message: response.data.message,
            data: response.data.data,
        }

    } catch (error: ApiResponse<GetEmployeeInfoResponse> | any) {
        return {
            success: false,
            message: "gagal mengambil info dashboard pegawai",
            data: null,
        }
    }
}