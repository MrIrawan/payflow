import userClient from "@/lib/axios/userClient";

import { ApiResponse } from "@/types/api";
import { StoreEmployeeAttendanceRequest } from "@/types/request";
import { StoreEmployeeAttendanceData } from "@/types/response";

export const storeEmployeeAttendance = async (data: StoreEmployeeAttendanceRequest) => {
    const response = await userClient.post<ApiResponse<StoreEmployeeAttendanceData>>("/attendance/store", data);

    return response;
};