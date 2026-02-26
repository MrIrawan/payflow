import adminClient from "@/lib/axios/adminClient";

import { ApiResponse } from "@/types/api";
import { EditEmployeeData } from "@/types/response";
import { EditEmployeeRequest } from "@/types/request";

export const editEmployee = async (data: EditEmployeeRequest, identifier: string) => {
    const response = await adminClient.put<ApiResponse<EditEmployeeData>>(`/update/t/${identifier}`, data);

    return response;
}