import { fetcher } from "../fetcher/fetcher";

import { StoreTeacherDataRequest } from "@/types/request";
import { StoreTeacherDataResponse } from "@/types/response";

export async function storeTeacherData(teacherData: StoreTeacherDataRequest) {
    const response = await fetcher<StoreTeacherDataResponse>("/store/teacher", {
        method: "POST",
        body: JSON.stringify(teacherData),
    });

    if (!response.ok) {
        return {
            isSuccess: false,
            message: response.message,
            status: response.status,
            raw: response.raw,
        }
    }

    return {
        isSuccess: true,
        status: response.status,
        data: response.data,
    }
}