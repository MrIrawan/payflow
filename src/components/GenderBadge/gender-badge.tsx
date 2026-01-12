import { cn } from "@/lib/utils";

export function GenderBadge({ placeholder }: {
    placeholder: string | number | null;
}) {
    const gender = String(placeholder).toLowerCase();

    return (
        // <Badge className={cn(genderBadgeVariant({ variant }))}>{placeholder}</Badge>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 text-sm font-medium rounded-full bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
            <span className={cn("w-2 h-2 rounded-full", gender === "male" ? "bg-blue-600" : "bg-pink-600")}></span>
            {placeholder}
        </span>
    )
}