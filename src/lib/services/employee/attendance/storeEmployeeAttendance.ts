import userClient from "@/lib/axios/userClient";

import { ApiResponse } from "@/types/api";
import { StoreEmployeeAttendanceRequest } from "@/types/request";
import { StoreEmployeeAttendanceData, StoreEmployeeAttendanceResponse } from "@/types/response";

export const storeEmployeeAttendance = async (data: StoreEmployeeAttendanceRequest) => {
    try {
        const response = await userClient.post<ApiResponse<StoreEmployeeAttendanceData>>("/attendance/store", data);

        return {
            success: true,
            message: response.data.message,
            data: response.data.data
        };
    } catch (error: ApiResponse<StoreEmployeeAttendanceResponse> | any) {
        return {
            success: false,
            message: error.message,
            status: error.status,
            data: null
        }
    }
};