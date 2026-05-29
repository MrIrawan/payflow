import userClient from "@/lib/axios/userClient";
import { ApiResponse } from "@/types/api";
import { GetEmployeeAttendanceData } from "@/types/response";

// GetEmployeeAttendanceResponse tidak dipakai — dihapus dari import

export const getEmployeeAttendance = async () => {
    try {
        const response = await userClient.get<ApiResponse<GetEmployeeAttendanceData[]>>("/attendance");

        return {
            success: true,
            message: response.data.message,
            data: response.data.data
        };
    } catch (error: unknown) {
        // Ganti "any" dengan "unknown" lalu cast ke Error
        const err = error as Error & { status?: number };
        return {
            success: false,
            status: err.status,
            message: err.message,
            data: null
        };
    }
};