import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const genderBadgeVariant = cva(
    "px-3 text-black bg-gray-200 border border-dashed border-muted-foreground",
    {
        variants: {
            variant: {
                defaultMale: "bg-blue-600 text-white border border-blue-600",
                defaultFemale: "bg-pink-600 text-white border border-pink-600",
                dashedMale: "bg-blue-100 text-blue-600 border border-dashed border-blue-600",
                dashedFemale: "bg-pink-100 text-pink-600 border border-dashed border-pink-600"
            }
        },
        defaultVariants: {
            variant: "defaultMale"
        }
    }
)

export function GenderBadge({ variant, placeholder }: {
    variant: "defaultMale" | "defaultFemale" | "dashedMale" | "dashedFemale";
    placeholder: string | number | null;
}) {
    return (
        <Badge className={cn(genderBadgeVariant({ variant }))}>{placeholder}</Badge>
    )
}