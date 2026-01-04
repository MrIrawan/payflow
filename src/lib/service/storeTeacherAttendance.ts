import { fetcher } from "../fetcher/fetcher";
import { StoreAttendanceRequest } from "@/types/request";
import { StoreAttendanceResponse } from "@/types/response";

export async function storeTeacherAttendance(data: StoreAttendanceRequest) {
    const response = await fetcher<StoreAttendanceResponse>("/attendance/store", {
        method: "POST",
        body: JSON.stringify(data),
    });

    return response;
}