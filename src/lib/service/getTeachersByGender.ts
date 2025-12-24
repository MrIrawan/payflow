import { fetcher } from "../fetcher/fetcher";
import { GetTeahersByGenderResponse } from "@/types/response";

export const getTeachersByGender = async (identifier: string) => {
    const response = await fetcher<GetTeahersByGenderResponse>(`/teacher/gender/${identifier}`, {
        method: "GET"
    });

    return response;
}