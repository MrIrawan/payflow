import { fetcher } from "../../../fetcher/fetcher";
import { adminAuthValidator } from "@/lib/auth/adminAuthValidator";

import { GetAllAttendanceResponse } from "@/types/response";

export const getAllAttendance = async () => {
    const response = await fetcher<GetAllAttendanceResponse>("/attendance", {
        method: "GET",
        credentials: "include",
    });

    if (!response.ok) {
        // if (adminAuthValidator(response.status)) return;

        return {
            isSuccess: false,
            message: response.message,
            status: response.status
        }
    }

    return {
        isSuccess: true,
        status: response.status,
        message: response.data.message,
        data: response.data,
    };
}