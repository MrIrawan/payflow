import userClient from "@/lib/axios/userClient";

import { ApiResponse } from "@/types/api";
import { GetEmployeeAttendanceData } from "@/types/response";

export const getEmployeeAttendance = async () => {
    const response = await userClient.get<ApiResponse<GetEmployeeAttendanceData>>("/attendance");

    return response;
}