import { fetcher } from "../fetcher/fetcher";
import { GetTeahersByGenderResponse } from "@/types/response";

export const getMaleTeachers = async () => {
    const response = await fetcher<GetTeahersByGenderResponse>("/teacher/gender/male", {
        method: "GET"
    })

    return response;
}