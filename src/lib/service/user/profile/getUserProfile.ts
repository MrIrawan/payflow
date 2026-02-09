import { fetcher } from "@/lib/fetcher/fetcher";
import { userAuthValidator } from "@/lib/auth/userAuthValidator";

export async function getUserProfile() {
    const response = await fetcher("/profile", {
        method: "GET",
        credentials: "include"
    });

    if (!response.ok) {
        if (userAuthValidator(response.status)) return;

        return {
            isSuccess: false,
            message: response.message,
            status: response.status,
            raw: response.raw
        }
    }

    return {
        isSuccess: true,
        data: response.data,
        status: response.status
    }
}