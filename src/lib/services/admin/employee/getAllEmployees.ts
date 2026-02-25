import adminClient from "@/lib/axios/adminClient";

import { ApiResponse } from "@/types/api";
import { GetAllEmployeesData } from "@/types/response";

export const getAllEmployees = async () => {
    const response = await adminClient.get<ApiResponse<GetAllEmployeesData[]>>("/teachers");

    return response;
}