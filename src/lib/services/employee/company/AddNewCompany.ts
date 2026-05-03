import userClient from "@/lib/axios/userClient";

import { ApiResponse } from "@/types/api";

import { AddNewCompanyRequest } from "@/types/request";
import { AddNewCompanyData } from "@/types/response";

export const addNewCompany = async (companyData: AddNewCompanyRequest) => {
    const response = await userClient.post<ApiResponse<AddNewCompanyData>>("/company/add", companyData);

    return response;
}