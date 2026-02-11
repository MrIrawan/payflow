import { fetcher } from "@/lib/fetcher/fetcher";

import { UserPayrollCalculationRequest } from "@/types/request";
import { UserPayrollCalculationResponse } from "@/types/response";

export const userPayrollCalculation = async (data: UserPayrollCalculationRequest) => {
    const response = await fetcher<UserPayrollCalculationResponse>("/calculate", {
        method: "POST",
        body: JSON.stringify(data),
        credentials: "include"
    });

    if (!response.ok) {
        return {
            isSuccess: false,
            message: response.message,
            status: response.status,
            raw: response.raw
        }
    }

    return {
        isSuccess: true,
        status: response.status,
        data: response.data
    }
}