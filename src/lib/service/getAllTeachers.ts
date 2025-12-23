import { fetchAPI } from "../api/api";
import { GetAllTeachersResponse } from "@/types/response";

export const getAllTeachers = async () => {
    const response = await fetchAPI<GetAllTeachersResponse>(`${process.env.NEXT_PUBLIC_BASE_API_URL}/teachers`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        timeout: 10000,
        retries: 2,
        credentials: "include",
        onError: (error) => console.error("Get teacher data error:", error.message),
    }
    )

    return response;
}