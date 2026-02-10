import { fetcher } from "@/lib/fetcher/fetcher";
import { adminAuthValidator } from "@/lib/auth/adminAuthValidator";

import { UpdateAttendanceRequest } from "@/types/request";
import { UpdateAttendanceResponse } from "@/types/response";

export async function updateAttendanceData(identifier: string, data: UpdateAttendanceRequest) {
    const response = await fetcher<UpdateAttendanceResponse>(`/attendance/update/${identifier}`, {
        method: "PUT",
        body: JSON.stringify(data),
        credentials: "include",
    });

    if (!response.ok) {
        // if (adminAuthValidator(response.status)) return;

        return {
            isSuccess: false,
            message: response.message,
            status: response.status,
            raw: response.raw
        }
    }

    return {
        isSuccess: true,
        data: response.data
    }
}