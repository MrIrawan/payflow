"use client";

import { SelectGroupProps } from "@/types/types";
import { Label } from "../ui/label";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectLabel,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";

export function SelectGroupComponent({
    label,
    htmlFor,
    placeholder,
    items,
    requiredLabel = false,
    value,
    onChange,
    errorMessage,
}: SelectGroupProps) {
    return (
        <div className="w-full flex flex-col gap-2 items-start">
            {label && (
                <Label htmlFor={htmlFor} className="text-sm font-medium gap-0.5">
                    {label}
                    {requiredLabel && (
                        <span className="text-destructive ml-0.5">*</span>
                    )}
                </Label>
            )}

            <Select value={value} onValueChange={onChange}>
                <SelectTrigger
                    id={htmlFor}
                    className="w-full px-2 aria-invalid:ring-red-100 aria-invalid:border-red-600 aria-invalid:ring-[3px]"
                    aria-invalid={errorMessage ? "true" : "false"}
                >
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>

                <SelectContent position="popper">
                    <SelectGroup>
                        <SelectLabel className="font-medium">{label}</SelectLabel>
                        {items.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                                {item.displayText}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>

            {errorMessage && (
                <p className="text-sm font-medium text-destructive">
                    {String(errorMessage)}
                </p>
            )}
        </div>
    );
}
