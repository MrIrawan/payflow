import { fetcher } from "../../../fetcher/fetcher"

export const deleteAttendanceData = async (identifier: string) => {
    const response = await fetcher(`/attendance/delete/${identifier}`, {
        method: "DELETE",
        credentials: "include",
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
        data: response.data
    }
}