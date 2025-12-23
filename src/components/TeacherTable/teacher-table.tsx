"use client";

import { useState, useEffect } from "react";

import { getAllTeachers } from "@/lib/service/getAllTeachers";
import { GetAllTeachers, GetAllTeachersResponse } from "@/types/response";

import { DataTable } from "../DataTable/data-table";
import { TableColumn } from "@/types/table";

const teacherColumns: TableColumn<GetAllTeachers>[] = [
    { header: "Full Name", accessor: "nama_lengkap" },
    { header: "Date of Birth", accessor: "date_of_birth" },
    { header: "Gender", accessor: "jenis_kelamin" },
    { header: "Company", accessor: "company" },
    { header: "Job Title", accessor: "job_title" },
    { header: "Home Address", accessor: "home_address" },
    { header: "Net Salary", accessor: "net_salary" },
];


export default function TeacherTable() {
    const [data, setData] = useState<GetAllTeachers[]>([]);

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

    return (
        <DataTable
            columns={teacherColumns}
            data={data}
        />
    )
}