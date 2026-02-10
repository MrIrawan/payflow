import { fetcher } from "@/lib/fetcher/fetcher";

import { GetTeacherByIdResponse } from "@/types/response";

export async function getTeacherById(identifier: string) {
    const response = await fetcher<GetTeacherByIdResponse>(`/teacher/${identifier}`, {
        method: "GET",
        credentials: "include",
    });

    if (!response.ok) {

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