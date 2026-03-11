import { ApiResponse } from "@/types/api";
import adminClient from "@/lib/axios/adminClient";
import { AdminPayrollPreviewItem } from "@/types/payroll";

export const getAdminPayrollPreview = async (month: number, year: number) => {
    const response = await adminClient.get<ApiResponse<AdminPayrollPreviewItem[]>>("/admin/payroll/preview", {
        params: { month, year }
    });

    return response;
};