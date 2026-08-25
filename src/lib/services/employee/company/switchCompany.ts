import userClient from "@/lib/axios/userClient";

import { ApiResponse } from "@/types/api";
import { SwitchCompanyRequest } from "@/types/request";
import { SwitchCompanyData } from "@/types/response";

export const switchCompanyService = async (companyId: SwitchCompanyRequest) => {
    const response = await userClient.post<ApiResponse<SwitchCompanyData>>("/company/switch", companyId);

    return response;
}