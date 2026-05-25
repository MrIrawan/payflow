import userClient from "@/lib/axios/userClient";

import { ApiResponse } from "@/types/api";
import { GetAllEmployeesOnCompanyData, GetAllEmployeesOnCompanyResponse } from "@/types/response";

export const getAllEmployeesOnCompany = async (companyId: number) => {
    try {
        const response = await userClient.get<ApiResponse<GetAllEmployeesOnCompanyData>>(`/employees?companyId=${companyId}`);

        console.log(response)

        return {
            success: true,
            message: response.data.message,
            data: response.data
        }
    } catch (error: ApiResponse<GetAllEmployeesOnCompanyResponse> | any) {
        return {
            success: false,
            message: error.message,
            status: error.status,
            data: null
        }
    }
}