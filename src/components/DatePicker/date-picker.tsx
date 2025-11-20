// DatePicker.tsx (tidak lagi mem-manage state internal untuk tanggal; mendukung controlled)
"use client";

import { useState } from "react";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DatePickerProps } from "@/types/types";

/**
 * Props extended:
 * - value: Date | undefined  (controlled value)
 * - onChange: (date?: Date) => void
 */
export function DatePicker({
  label,
  htmlFor,
  placeholder,
  value,
  onchange,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  // local fallback if parent doesn't control it
  const [local, setLocal] = useState<Date | undefined>(undefined);
  const selected = value ?? local;

  return (
    <div className="flex flex-col gap-2 w-full">
      {label && <Label htmlFor={htmlFor}>{label}</Label>}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild className="w-full">
          <Button
            variant="outline"
            id={htmlFor}
            className="w-full justify-between font-normal text-black"
          >
            {selected ? selected.toLocaleDateString() : placeholder}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={selected}
            captionLayout="dropdown"
            className="min-w-[350px]"
            onSelect={(d) => {
              // propagate to parent if exists else update local state
              if (onchange) onchange(d ?? undefined);
              else setLocal(d ?? undefined);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
