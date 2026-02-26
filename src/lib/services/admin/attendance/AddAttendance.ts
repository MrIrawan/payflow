import adminClient from "@/lib/axios/adminClient";

import { ApiResponse } from "@/types/api";
import { AddAttendanceRequest } from "@/types/request";
import { AddAttendanceData } from "@/types/response";

export const addAttendance = async (data: AddAttendanceRequest) => {
    const response = await adminClient.post<ApiResponse<AddAttendanceData>>("/attendance/store", data);

    return response;
}