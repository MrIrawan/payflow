import userClient from "@/lib/axios/userClient";

import { ApiResponse } from "@/types/api";
import { GetEmployeeProfileResponse } from "@/types/response";
import { GetEmployeeProfileData } from "@/types/response";

export const getEmployeeProfile = async (companyId: number) => {
    try {
        const response = await userClient.get<ApiResponse<GetEmployeeProfileData>>(`/profile?companyId=${companyId}`);

        return {
            success: response.data.success,
            message: response.data.message,
            status: response.status,
            data: response.data.data
        };
    } catch (error: ApiResponse<GetEmployeeProfileResponse> | any) {
        return {
            success: false,
            message: error?.message,
            status: error?.status,
            data: null
        }
    }
}