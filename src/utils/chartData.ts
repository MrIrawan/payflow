import { AttendanceChartData, RawAttendanceData } from "@/types/chart";

export const transformChartData = (
    rawData: RawAttendanceData[],
    selectedYear: string | number
): AttendanceChartData[] => {
    const targetYear = Number(selectedYear);
    const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agt", "Sep", "Okt", "Nov", "Des"];

    const chartData: AttendanceChartData[] = months.map((month) => ({
        month: month,
        present: 0,
        onLeave: 0,
        absent: 0,
    }));

    if (!rawData || rawData.length === 0) return chartData;

    rawData.forEach((record) => {
        const dateObj = new Date(record.attendance_date);
        const recordYear = dateObj.getFullYear();

        if (recordYear === targetYear) {
            const monthIndex = dateObj.getMonth();
            const status = record.attendance_status;

            if (status === "present") {
                chartData[monthIndex].present! += 1;
            } else if (status === "absent") {
                chartData[monthIndex].absent! += 1;
            }
        }
    });

    return chartData;
};