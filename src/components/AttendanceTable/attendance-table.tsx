"use client";

import { DataTable } from "../DataTable/data-table";
import { GetAllAttendances } from "@/types/response";
import { Column } from "@/types/table";
import { AttendanceBadge } from "../AttendaceBadge/attendance-badge";

const tableColumn: Column<GetAllAttendances>[] = [
    { header: "ID Absen", accessor: "attendance_id", cell: (value: string) => value.slice(0, 8) },
    { header: "ID Perusahaan", accessor: "company_id" },
    { header: "ID Pegawai", accessor: "employee_id", cell: (value: string) => value.slice(0, 8) },
    { header: "Tanggal Absensi", accessor: "attendance_date", cell: (value) => new Date(value).toLocaleDateString("id-ID", { month: "long", day: "numeric", year: "numeric" }) },
    { header: "Waktu Check-in", accessor: "checkin_time" },
    { header: "Waktu Check-out", accessor: "checkout_time" },
    { header: "Status Absensi", accessor: "status", cell: (value) => <AttendanceBadge placeholder={value} /> },
]

export function AttendanceTable({ attendanceData }: { attendanceData: GetAllAttendances[] }) {
    // const [searchQuery, setSearchQuery] = useState<string>("");
    // const debounceSearch = useDebounce(searchQuery, 400);
    // const filteredData = filterByKeys(attendanceData || [], debounceSearch, ["teacher_name"]);

    return (
        <div className="w-full flex flex-col gap-0 p-3">
            <DataTable
                columns={tableColumn}
                data={attendanceData}
                wrapper={false}
            />
        </div>
    )
}