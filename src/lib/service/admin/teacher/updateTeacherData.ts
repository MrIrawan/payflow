import { fetcher } from "@/lib/fetcher/fetcher";
import { adminAuthValidator } from "@/lib/auth/adminAuthValidator";

import { UpdateTeacherDataRequest } from "@/types/request";
import { UpdateTeacherDataResponse } from "@/types/response";

export async function updateTeacherData(identifier: string, data: UpdateTeacherDataRequest) {
    const response = await fetcher<UpdateTeacherDataResponse>(`/update/t/${identifier}`, {
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
        data: response.data,
        status: response.status,
    }
}