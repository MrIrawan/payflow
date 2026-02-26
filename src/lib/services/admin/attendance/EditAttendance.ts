import adminClient from "@/lib/axios/adminClient";

import { ApiResponse } from "@/types/api";
import { EditAttendanceData } from "@/types/response";
import { EditAttendanceRequest } from "@/types/request";

export const editAttendance = async (data: EditAttendanceRequest, identifier: string) => {
    const response = await adminClient.put<ApiResponse<EditAttendanceData>>(`/attendance/update/${identifier}`, data);

    return response;
}