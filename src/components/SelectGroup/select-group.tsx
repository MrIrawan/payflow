import { SelectGroupProps } from "@/types/types";
import { AttendanceBadge } from "../AttendaceBadge/attendance-badge";
import { Label } from "../ui/label";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectLabel,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "../ui/select";

export function SelectGroupComponent({ label, placeholder, items, onvaluechange }: SelectGroupProps) {
    return (
        <div className="w-full flex flex-col gap-2 items-start">
            <Label>{label}</Label>
            <Select onValueChange={onvaluechange}>
                <SelectTrigger className="w-full px-2">
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
        </div>
    )
}