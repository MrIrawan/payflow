import { Badge } from "../ui/badge";

import { cn } from "@/lib/utils";

export function GenderBadge({ placeholder, size = "md" }: {
    placeholder: string | number | null;
    size?: "sm" | "md";
}) {
    const gender = String(placeholder).toLowerCase();

    return (
        <>
            {size === "md" && (
                <Badge className={cn("w-fit h-fit inline-flex items-center gap-1.5 px-2.5 py-0.5 text-sm font-medium rounded-full bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200")}>
                    <span className={cn("w-2 h-2 rounded-full", gender === "male" ? "bg-blue-600" : "bg-pink-600")}></span>
                    {placeholder}
                </Badge>
            )}
            {size === "sm" && (
                <Badge className={cn("w-fit h-fit inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-medium rounded-sm bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200")}>
                    <span className={cn("w-2 h-2 rounded-full", gender === "male" ? "bg-blue-600" : "bg-pink-600")}></span>
                    {placeholder}
                </Badge>
            )}
        </>
    )
}