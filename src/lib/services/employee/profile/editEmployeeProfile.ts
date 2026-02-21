import userClient from "@/lib/axios/userClient";

import { ApiResponse } from "@/types/api";
import { EditEmployeeProfileRequest } from "@/types/request";
import { EditEmployeeProfileData } from "@/types/response";

export const editEmployeeProfile = async (data: EditEmployeeProfileRequest) => {
    const response = await userClient.put<ApiResponse<EditEmployeeProfileData>>("/profile/edit", data);

    return response;
}