import { fetcher } from "../fetcher/fetcher";
import { GetTeahersByGenderResponse } from "@/types/response";

export const getFemaleTeachers = async () => {
    const response = await fetcher<GetTeahersByGenderResponse>("/teacher/gender/female", {
        method: "GET"
    })

    return response;
}