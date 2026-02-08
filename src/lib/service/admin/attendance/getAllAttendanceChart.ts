import { fetcher } from "@/lib/fetcher/fetcher";
import { adminAuthValidator } from "@/lib/auth/adminAuthValidator";

import { GetAllAttendanceChartResponse } from "@/types/response";

export async function getAllAttendanceChart() {
    const response = await fetcher<GetAllAttendanceChartResponse>("/attendance/chart", {
        method: "GET",
        credentials: "include"
    });

    if (!response.ok) {
        if (adminAuthValidator(response.status)) return;

        return {
            isSuccess: false,
            message: response.message,
            status: response.status,
            raw: response.raw
        }
    }

    return {
        isSuccess: true,
        status: response.status,
        data: response.data
    }
}