import { fetcher } from "../fetcher/fetcher";
import { GetAllTeachersResponse } from "@/types/response";

export const getAllTeachers = async () => {
    const response = await fetcher<GetAllTeachersResponse>("/teachers", {
        method: "GET"
    })

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
    }
}