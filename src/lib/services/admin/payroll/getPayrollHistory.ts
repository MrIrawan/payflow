import { ApiResponse } from "@/types/api";
import adminClient from "@/lib/axios/adminClient";
import { PayrollHistoryItem } from "@/types/payroll";

export const getAdminPayrollHistory = async (month: number, year: number) => {
    const response = await adminClient.get<ApiResponse<PayrollHistoryItem[]>>("/admin/payroll/history", {
        params: { month, year }
    });

    return response;
};