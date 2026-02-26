import adminClient from "@/lib/axios/adminClient";

import { ApiResponse } from "@/types/api";
import { GetEmployeeByIdData } from "@/types/request";

export const getEmployeeById = async (identifier: string) => {
    const response = await adminClient.get<ApiResponse<GetEmployeeByIdData>>(`/teacher/${identifier}`);

    return response;
}