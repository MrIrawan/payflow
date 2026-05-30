import userClient from "@/lib/axios/userClient";
import { ApiResponse } from "@/types/api";
import { GetOwnCompanyData } from "@/types/response";

// GetOwnCompanyResponse tidak dipakai — dihapus dari import

export const getOwnCompany = async () => {
    try {
        const response = await userClient.get<ApiResponse<GetOwnCompanyData[]>>("/company");

        return {
            success: response.data.success,
            message: response.data.message,
            data: response.data.data
        };
    } catch (error: unknown) {
        const err = error as Error & { status?: number };
        return {
            success: false,
            message: err.message || "gagal mengambil data perusahaan.",
            status: err.status || 500,
            data: null
        };
    }
};