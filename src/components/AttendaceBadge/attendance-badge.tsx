import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

export function AttendanceBadge({ placeholder }: {
    placeholder: string;
}) {
    const attendanceStatus = String(placeholder).toLowerCase();

    return (
        <Badge
            className={cn(`px-3 py-1 text-sm font-medium rounded-full ${attendanceStatus === "present" ?
                "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300" :
                attendanceStatus === "absent" ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300" : "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
                }`)}
        >
            {placeholder}
        </Badge>
    )
}