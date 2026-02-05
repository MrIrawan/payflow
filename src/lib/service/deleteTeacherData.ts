import { fetcher } from "../fetcher/fetcher";
import { DeleteTeacherDataResponse } from "@/types/response";

export const deleteTeacherData = async (identifier: string) => {
    const response = await fetcher<DeleteTeacherDataResponse>(`/delete/t/${identifier}`, {
        method: "DELETE",
        credentials: "include",
    });

    if (!response.ok) {
        return {
            isSuccess: false,
            status: response.status,
            message: response.message,
            raw: response.raw
        }
    }

    return {
        isSuccess: true,
        ...response.data
    }
}