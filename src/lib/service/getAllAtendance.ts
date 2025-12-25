import { fetcher } from "../fetcher/fetcher";
import { GetAllAttendanceResponse } from "@/types/response";

export const getAllAttendance = async () => {
    const response = await fetcher<GetAllAttendanceResponse>("/attendance", {
        method: "GET"
    });

    return response;
}