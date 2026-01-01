import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

const attendanceBadgeVariant = {
    present: "bg-green-600 text-white border border-green-600",
    absent: "bg-red-600 text-white border border-red-600",
    onLeave: "bg-indigo-600 text-white border border-indigo-600",
}

export function AttendanceBadge({ variant, placeholder }: {
    variant: string;
    placeholder: string;
}) {
    return (
        <Badge
            className={cn(variant === "present" ? attendanceBadgeVariant.present : (variant === "absent" ? attendanceBadgeVariant.absent : attendanceBadgeVariant.onLeave))}
        >
            {placeholder}
        </Badge>
    )
}