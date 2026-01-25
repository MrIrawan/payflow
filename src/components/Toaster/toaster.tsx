import { cn } from "@/lib/utils";

import { Ban, Check, Info } from "lucide-react";
import { CardDescription, CardTitle } from "../ui/card";
import { ToasterVariants } from "@/types/types";

const toasterVariants = {
    success: {
        background: "bg-green-50 ring-2 ring-green-300/30",
        backgroundIcon: "bg-green-300/70",
        iconColor: "text-green-500",
        title: "text-green-500/70",
        Icon: Check
    },

    info: {
        background: "bg-blue-50 ring-2 ring-blue-300/30",
        backgroundIcon: "bg-blue-300/70",
        iconColor: "text-blue-500",
        title: "text-blue-500/70",
        Icon: Info
    },

    error: {
        background: "bg-red-50 ring-2 ring-red-300/30",
        backgroundIcon: "bg-red-300/70",
        iconColor: "text-red-500",
        title: "text-red-500/70",
        Icon: Ban
    },
}

export function Toaster({ title, description, variant = "success" }: {
    title: string | undefined;
    description: string | undefined;
    variant?: "success" | "info" | "error";
}) {
    const Icon = toasterVariants[variant].Icon;

    return (
        <div className={cn("min-w-[350px] p-3 rounded-md h-fit", toasterVariants[variant].background)}>
            <div className="flex items-start gap-3">
                <span className={cn("w-fit h-fit p-2.5 rounded-full flex flex-row justify-center items-center", toasterVariants[variant].backgroundIcon)}>
                    <Icon className={cn("size-5", toasterVariants[variant].iconColor)} />
                </span>
                <div className="flex flex-col gap-0.5">
                    <CardTitle className={cn("font-semibold text-sm capitalize", toasterVariants[variant].title)}>{title}</CardTitle>
                    <CardDescription className="text-xs font-medium text-black">{description}</CardDescription>
                </div>
            </div>
        </div>
    )
}