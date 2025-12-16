"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ButtonOptionProps } from "@/types/types";

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
      <PopoverTrigger className="w-fit">
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
      <PopoverContent align={align}>{children}</PopoverContent>
    </Popover>
  );
}
