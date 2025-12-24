"use client";

import { useState, useEffect } from "react";

import { getAllTeachers } from "@/lib/service/getAllTeachers";
import { GetAllTeachers } from "@/types/response";

import { DataTable } from "../DataTable/data-table";
import { TableColumn } from "@/types/table";
import { Card } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

import { filterByKeys } from "@/utils/filterByKeys";
import { useDebounce } from "@/hooks/use-debounce";

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
    const [searchQuery, setSearchQuery] = useState<string>("");

    const debouncedSearch = useDebounce(searchQuery, 400);

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



    const filteredData = filterByKeys(data, debouncedSearch, ["nama_lengkap"])

    console.log(filteredData)

    return (
        <div className="w-full flex flex-col gap-6 p-3">
            <Card className="w-full flex flex-row items-end justify-between p-0 shadow-none border-none">
                <div className="flex flex-row gap-2.5 items-end">
                    <div className="flex flex-col gap-2">
                        <Label className="font-semibold">Search Teacher</Label>
                        <Input
                            type="text"
                            placeholder="teacher neame here..."
                            className="min-w-[300px]"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </Card>
            <DataTable
                columns={teacherColumns}
                data={filteredData}
            />
        </div>
    )
}