"use client";

import { RadioOptionsProps } from "@/types/types";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

export function RadioOptions({ label, optionsNumber }: RadioOptionsProps) {
  return (
    <div className="w-full flex flex-col gap-2">
      <Label>{label}</Label>
      <RadioGroup className="flex flex-row gap-3 py-1 h-9">
        <div className="flex flex-row gap-2 items-center">
          <RadioGroupItem value="male" id="male" />
          <Label htmlFor="male" className="text-sm font-medium">
            male
          </Label>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <RadioGroupItem value="female" id="female" />
          <Label htmlFor="female" className="text-sm font-medium">
            female
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
}
