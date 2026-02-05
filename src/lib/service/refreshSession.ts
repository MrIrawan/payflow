import { fetcher } from "../fetcher/fetcher";

export const refreshSession = async () => {
    const response = await fetcher("/refresh", {
        method: "POST",
        credentials: "include",
    });

    return response;
}