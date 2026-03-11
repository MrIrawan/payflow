import { ApiResponse } from "@/types/api";
import userClient from "@/lib/axios/userClient";
import { UserLivePayrollData } from "@/types/payroll";

export const getUserLivePayroll = async (teacher_id: string, month: number, year: number) => {
    const response = await userClient.get<ApiResponse<UserLivePayrollData>>("/user/payroll/live", {
        params: { teacher_id, month, year }
    });

    return response;
};