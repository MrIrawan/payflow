import userClient from "@/lib/axios/userClient";

import { ApiResponse } from "@/types/api";
import { GetEmployeeAttendanceData, GetEmployeeAttendanceResponse } from "@/types/response";

export const getEmployeeAttendance = async () => {
    try {
        const response = await userClient.get<ApiResponse<GetEmployeeAttendanceData[]>>("/attendance");

        return {
            success: true,
            message: response.data.message,
            data: response.data.data
        };
    } catch (error: ApiResponse<GetEmployeeAttendanceResponse> | any) {
        return {
            success: false,
            status: error.status,
            message: error.message,
            data: null
        }
    }
}