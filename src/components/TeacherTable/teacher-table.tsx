"use client";

import { useState, useEffect } from "react";

import { getAllTeachers } from "@/lib/service/getAllTeachers";
import { GetAllTeachersResponseData } from "@/types/response";

import { DataTable } from "../DataTable/data-table";

export default function TeacherTable() {
    const [data, setData] = useState<GetAllTeachersResponseData | null>(null);

    useEffect(() => {
        async function getAllTeachersData() {
            try {
                const response = await getAllTeachers();
                setData(response.data)
            } catch (error) {
                console.error("Get all teachers error:", error);
            }
        }

        getAllTeachersData();
    }, [])

    console.log(data)
    return (
        <></>
    )
}