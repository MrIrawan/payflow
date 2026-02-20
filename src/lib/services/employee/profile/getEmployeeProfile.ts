import userClient from "@/lib/axios/userClient";

import { ApiResponse } from "@/types/api";
import { GetEmployeeProfileResponse } from "@/types/response";
import { GetEmployeeProfileData } from "@/types/response";

export const getEmployeeProfile = async () => {
    const response = await userClient.get<ApiResponse<GetEmployeeProfileData>>("/profile");

    return response;
}