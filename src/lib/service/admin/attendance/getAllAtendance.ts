import { fetcher } from "../../../fetcher/fetcher";

import { GetAllAttendanceResponse } from "@/types/response";

export const getAllAttendance = async () => {
    const response = await fetcher<GetAllAttendanceResponse>("/attendance", {
        method: "GET",
        credentials: "include",
    });

    if (!response.ok) {
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