"use client";

import { cn } from "@/lib/utils";

import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ButtonOptionProps } from "@/types/types";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { GridIcon, TableIcon } from "lucide-react";

export function ButtonOption({
  children,
  variant = "outline",
  size = "default",
  placeholder,
  Icon,
  align = "end",
  ...props
}: ButtonOptionProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={variant} size={size} className={cn(props.className)}>
          {Icon ? (
            <>
              <Icon />
              <p>{placeholder}</p>
            </>
          ) : (
            <p>{placeholder}</p>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align={align} className="w-fit">
        {children}
      </PopoverContent>
    </Popover>
  );
}

export function SelectOption() {
  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="hahahah" />
      </SelectTrigger>
      <SelectContent>
        <div className="w-40 h-40"></div>
      </SelectContent>
    </Select>
  );
}
