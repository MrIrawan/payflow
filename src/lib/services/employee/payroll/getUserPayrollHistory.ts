import { ApiResponse } from "@/types/api";
import userClient from "@/lib/axios/userClient";
import { PayrollHistoryItem } from "@/types/payroll";

export const getUserPayrollHistory = async (teacher_id: string, year: number) => {
    const response = await userClient.get<ApiResponse<PayrollHistoryItem[]>>("/user/payroll/history", {
        params: { teacher_id, year }
    });

    return response;
};