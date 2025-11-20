"use client";

import { RadioOptionsProps } from "@/types/types";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

export function RadioOptions({
  label,
  optionsNumber,
  requiredLabel = false,
}: RadioOptionsProps) {
  return (
    <div className="w-full flex flex-col gap-2">
      {label && (
        <Label className="text-sm font-medium gap-0.5">
          {label}{" "}
          <span className="text-destructive">{requiredLabel ? "*" : ""}</span>
        </Label>
      )}
      <RadioGroup className="flex flex-row gap-3 py-1 h-9">
        <div className="flex flex-row gap-2 items-center">
          <RadioGroupItem
            value="male"
            id="male"
            className="focus-visible:ring-blue-100 focus-visible:border-blue-600 focus-visible:ring-[3px]"
          />
          <Label htmlFor="male" className="text-sm font-medium">
            male
          </Label>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <RadioGroupItem
            value="female"
            id="female"
            className="focus-visible:ring-blue-100 focus-visible:border-blue-600 focus-visible:ring-[3px]"
          />
          <Label htmlFor="female" className="text-sm font-medium">
            female
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
}
