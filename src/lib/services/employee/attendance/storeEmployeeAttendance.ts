import userClient from "@/lib/axios/userClient";
import { ApiResponse } from "@/types/api";
import { StoreEmployeeAttendanceRequest } from "@/types/request";
import { StoreEmployeeAttendanceData } from "@/types/response";

// StoreEmployeeAttendanceResponse tidak dipakai — dihapus dari import

export const storeEmployeeAttendance = async (data: StoreEmployeeAttendanceRequest) => {
    try {
        const response = await userClient.post<ApiResponse<StoreEmployeeAttendanceData>>("/attendance/store", data);

        return {
            success: true,
            message: response.data.message,
            data: response.data.data
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