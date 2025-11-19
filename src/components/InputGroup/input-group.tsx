"use client";

import { cn } from "@/lib/utils";

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { InputGroupProps } from "@/types/types";

export function InputGroup({
  label,
  htmlFor,
  className,
  ...props
}: InputGroupProps) {
  return (
    <div className="w-full flex flex-col gap-2">
      <Label htmlFor={htmlFor}>{label}</Label>
      <Input
        id={htmlFor}
        name={htmlFor}
        className={cn(
          "focus-visible:ring-blue-100 focus-visible:border-blue-600 focus-visible:ring-[3px] aria-invalid:ring-red-100 aria-invalid:border-red-600 aria-invalid:ring-[3px] placeholder:text-sm placeholder:font-medium placeholder:text-muted-foreground font-normal text-black text-base selection:text-white selection:bg-blue-600",
          className
        )}
        {...props}
      />
    </div>
  );
}
