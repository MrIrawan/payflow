import { ApiResponse } from "@/types/api";
import adminClient from "@/lib/axios/adminClient";
import { GeneratePayrollRequest } from "@/types/payroll";

export const generateAdminPayroll = async (data: GeneratePayrollRequest) => {
    // Karena response datanya biasanya kosong/null dan hanya butuh success & message
    const response = await adminClient.post<ApiResponse<null>>("/admin/payroll/generate", data);

    return response;
};