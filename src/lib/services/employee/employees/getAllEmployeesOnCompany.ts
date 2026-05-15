import userClient from "@/lib/axios/userClient";

import { ApiResponse } from "@/types/api";
import { GetAllEmployeesData, GetAllEmployeesResponse } from "@/types/response";

export const getAllEmployeesOnCompany = async (companyId: number) => {
    try {
        const response = await userClient.get<ApiResponse<GetAllEmployeesData[]>>(`/employees?companyId=${companyId}`);

        return {
            success: true,
            message: response.data.message,
            data: response.data
        }
    } catch (error: ApiResponse<GetAllEmployeesResponse> | any) {
        return {
            success: false,
            message: error.message,
            status: error.status,
            data: null
        }
    }
}