import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const attendanceBadgeVariant = cva(
    "px-3 text-black bg-gray-200 border border-dashed border-muted-foreground",
    {
        variants: {
            variant: {
                defaultPresent: "bg-green-600 text-white border border-green-600",
                defaultAbsent: "bg-red-600 text-white border border-red-600",
                defaultOnLeave: "bg-indigo-600 text-white border border-indigo-600",
                dashedPresent: "bg-green-100 text-green-600 border border-dashed border-green-600",
                dashedAbsent: "bg-red-100 text-red-600 border border-dashed border-red-600",
                dashedOnLeave: "bg-indigo-100 text-indigo-600 border border-dashed border-indigo-600"
            }
        },
        defaultVariants: {
            variant: "defaultPresent"
        }
    }
)

export function AttndanceBadge({ variant, placeholder }: {
    variant: "defaultPresent" | "defaultAbsent" | "defaultOnLeave" | "dashedPresent" | "dashedAbsent" | "dashedOnLeave";
    placeholder: string | number | null;
}) {
    return (
        <Badge className={cn(attendanceBadgeVariant({ variant }))}>{placeholder}</Badge>
    )
}