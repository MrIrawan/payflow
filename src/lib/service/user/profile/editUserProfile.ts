import { fetcher } from "@/lib/fetcher/fetcher";
import { EditUserProfileRequest } from "@/types/request";

export async function editUserProfile(data: EditUserProfileRequest) {
    const response = await fetcher("/profile/edit", {
        method: "PUT",
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