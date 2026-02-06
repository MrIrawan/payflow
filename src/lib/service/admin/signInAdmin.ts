import { fetcher } from "@/lib/fetcher/fetcher";
import { adminAuthValidator } from "@/lib/auth/adminAuthValidator";

import { AdminSignInRequest } from "@/types/request";
import { AdminSignInResponse } from "@/types/response";

export async function signInAdmin(data: AdminSignInRequest) {
    const response = await fetcher<AdminSignInResponse>("/admin/signIn", {
        method: "POST",
        body: JSON.stringify(data),
        credentials: "include",
    });

    if (!response.ok) {
        if (adminAuthValidator(response.status)) return;

        return {
            isSuccess: false,
            message: response.message,
            raw: response.raw
        }
    }

    return {
        isSuccess: true,
        message: response.data.message,
        success: response.data.success
    }
}