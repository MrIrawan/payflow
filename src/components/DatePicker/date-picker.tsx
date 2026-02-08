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

export function DatePicker({
  label,
  htmlFor,
  placeholder,
  requiredLabel = false,
  value,
  onChange,
  errorMessage,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <Label htmlFor={htmlFor} className="text-sm font-medium gap-0.5">
          {label}
          {requiredLabel && (
            <span className="text-destructive ml-0.5">*</span>
          )}
        </Label>
      )}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild className="w-full">
          <Button
            type="button"
            variant="outline"
            id={htmlFor}
            className="w-full justify-between font-normal text-black focus-visible:ring-blue-100 focus-visible:border-blue-600 focus-visible:ring-[3px] aria-invalid:ring-red-100 aria-invalid:ring-[3px]"
            aria-invalid={errorMessage ? "true" : "false"}
          >
            {value ? value.toLocaleDateString() : placeholder}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            captionLayout="dropdown"
            className="min-w-[350px]"
            onSelect={(date) => {
              onChange?.(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>

      {errorMessage && (
        <p className="text-sm font-medium text-destructive">
          {String(errorMessage)}
        </p>
      )}
    </div>
  );
}
