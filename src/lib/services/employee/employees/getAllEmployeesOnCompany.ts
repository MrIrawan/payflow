import userClient from "@/lib/axios/userClient";
import { ApiResponse } from "@/types/api";
import { GetAllEmployeesOnCompanyData } from "@/types/response";

// GetAllEmployeesOnCompanyResponse tidak dipakai — dihapus dari import

export const getAllEmployeesOnCompany = async (companyId: number) => {
    try {
        const response = await userClient.get<ApiResponse<GetAllEmployeesOnCompanyData>>(
            `/employees?companyId=${companyId}`
        );

        console.log(response);

        return {
            success: true,
            message: response.data.message,
            data: response.data
        };
    } catch (error: unknown) {
        const err = error as Error & { status?: number };
        return {
            success: false,
            message: err.message,
            status: err.status,
            data: null
        };
    }
};