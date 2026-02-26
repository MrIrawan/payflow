import adminClient from "@/lib/axios/adminClient";

import { ApiResponse } from "@/types/api";
import { DeleteAttendanceResponse } from "@/types/response";

export const deleteAttendance = async (identifier: string) => {
    const response = await adminClient.delete<ApiResponse<DeleteAttendanceResponse>>(`/attendance/delete/${identifier}`);

    return response;
}