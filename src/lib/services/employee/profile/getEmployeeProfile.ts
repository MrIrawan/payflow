import userClient from "@/lib/axios/userClient";
import { ApiResponse } from "@/types/api";
import { GetEmployeeProfileData } from "@/types/response";

export const getEmployeeProfile = async (companyId: number) => {
    try {
        const response = await userClient.get<ApiResponse<GetEmployeeProfileData>>(
            `/profile?companyId=${companyId}`
        );

        return {
            success: response.data.success,
            message: response.data.message,
            status: response.status,
            data: response.data.data
        };
    } catch (error: unknown) {
        const err = error as Error & { status?: number };
        return {
            success: false,
            message: err?.message,
            status: err?.status,
            data: null
        };
    }
};