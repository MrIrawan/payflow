import adminClient from "@/lib/axios/adminClient";

import { ApiResponse } from "@/types/api";
import { GetAllAttendances } from "@/types/response";

export const getAllAttendances = async () => {
    const response = await adminClient.get<ApiResponse<GetAllAttendances[]>>("/attendance");
}