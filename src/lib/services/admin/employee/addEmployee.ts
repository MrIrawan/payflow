import adminClient from "@/lib/axios/adminClient";

import { ApiResponse } from "@/types/api";
import { AddEmployeeData } from "@/types/response";
import { AddEmployeeRequest } from "@/types/request";

export const addEmployee = async (data: AddEmployeeRequest) => {
    const response = await adminClient.post<ApiResponse<AddEmployeeData>>("/store/teacher", data);

    return response;
}