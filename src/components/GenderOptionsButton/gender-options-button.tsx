"use client";

import { useState } from "react";

import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "../ui/popover";
import {
    CardDescription,
    CardTitle
} from "../ui/card";
import { Button } from "../ui/button";

import { PlusCircleIcon } from "lucide-react";

export function GenderOptionsButton() {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    console.log(isOpen)

    return (
        <Popover onOpenChange={setIsOpen} defaultOpen={isOpen}>
            <PopoverTrigger className="w-fit h-fit px-4 py-2 border border-dashed flex flex-row items-center gap-2 rounded-md">
                <PlusCircleIcon className="size-4" />
                <p className="text-sm font-medium text-black">gender</p>
            </PopoverTrigger>
            <PopoverContent className="flex flex-col gap-3">
                <div className="flex flex-col gap-1.5">
                    <CardTitle>Gender filter</CardTitle>
                    <CardDescription>select gender options between "male" or "female".</CardDescription>
                </div>
                <div className="flex flex-col gap-2 items-start">
                    <Button
                        variant={"default"}
                        onClick={() => setIsOpen(!isOpen)}
                        className="w-fit h-fit px-4 py-1 flex flex-row items-center gap-2 rounded-md"
                    >
                        <p className="text-xs font-medium">male</p>
                    </Button>
                    <Button
                        variant={"default"}
                        onClick={() => setIsOpen(!isOpen)}
                        className="w-fit h-fit px-4 py-1 flex flex-row items-center gap-2 rounded-md"
                    >
                        <p className="text-xs font-medium">female</p>
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    )
}