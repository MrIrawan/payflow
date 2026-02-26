import adminClient from "@/lib/axios/adminClient";

import { ApiResponse } from "@/types/api";
import { DeleteEmployeeResponse } from "@/types/response";

export const deleteEmployee = async (identifier: string) => {
    const response = await adminClient.delete<ApiResponse<DeleteEmployeeResponse>>(`/delete/t/${identifier}`);

    return response;
}