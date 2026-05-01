"use client";

import { useState } from "react";

import { Button } from "../ui/button"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog"

import { PlusIcon, PencilLine, PencilOff } from "lucide-react"

import { MultiSelectGroup } from "../MultiSelectGroup/multi-select-group";
import { InputGroup } from "../InputGroup/input-group";
import { FormComponent, FormContent, FormFooter } from "../Form/Form";

export function AddCompanyDialog() {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<string[]>([]);

    return (
        <Dialog defaultOpen={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="min-w-32 flex flex-row items-center gap-1.5 ring-1 ring-green-500 bg-green-500 text-white hover:bg-green-600">
                    <PlusIcon />
                    <p className="text-sm">Add Company</p>
                </Button>
            </DialogTrigger>
            <DialogContent onInteractOutside={(e) => {
                // Cegah dialog tutup ketika interact
                // dengan elemen portal di luar (ComboboxContent)
                e.preventDefault()
            }}>
                <DialogHeader>
                    <DialogTitle>Add New Company</DialogTitle>
                    <DialogDescription>
                        Fill in the details for the new company you want to add. Click save when you&apos;re done.
                    </DialogDescription>
                </DialogHeader>
                <div className="">
                    <FormComponent asWrapper={false} className="w-full flex flex-col gap-4">
                        <FormContent>
                            <InputGroup
                                label="Company Name & Avatar"
                                htmlFor="company_name"
                                requiredLabel
                                placeholder="Enter company name..."
                                type="text"
                            />
                            <InputGroup
                                label="Company Description"
                                htmlFor="company_description"
                                placeholder="Enter company description..."
                                requiredLabel
                                type="text"
                            />
                            <InputGroup
                                label="Total Employees"
                                htmlFor="total_employees"
                                placeholder="Enter total employees..."
                                requiredLabel
                                type="number"
                            />
                            <MultiSelectGroup
                                label="Company Field"
                                placeholder="Select company field..."
                                options={[
                                    { value: "technology", label: "Technology" },
                                    { value: "finance", label: "Finance" },
                                ]}
                                onChange={setSelected}
                                value={selected}
                                required
                            />
                        </FormContent>
                        <FormFooter className="w-full flex flex-row items-center justify-start gap-3 mt-4">
                            <Button variant="outline" className="ring ring-green-500 bg-green-100 text-green-600 w-28 h-8 p-0 flex flex-row items-center justify-center hover:bg-green-200 hover:text-green-600" onClick={() => setOpen(!open)}>
                                <PencilLine className="size-4" />
                                save
                            </Button>
                            <Button variant="outline" className="ring ring-red-500 bg-red-100 text-red-600 w-28 h-8 p-0 flex flex-row items-center justify-center hover:bg-red-200 hover:text-red-600" onClick={() => setOpen(!open)}>
                                <PencilOff className="size-4" />
                                Cancel
                            </Button>
                        </FormFooter>
                    </FormComponent>
                </div>
            </DialogContent>
        </Dialog>
    )
}