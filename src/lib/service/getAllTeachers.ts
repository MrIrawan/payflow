import { fetcher } from "../fetcher/fetcher";
import { GetAllTeachersResponse } from "@/types/response";

export const getAllTeachers = async () => {
    const response = fetcher<GetAllTeachersResponse>("/teachers", {
        method: "GET"
    })

    return response;
}