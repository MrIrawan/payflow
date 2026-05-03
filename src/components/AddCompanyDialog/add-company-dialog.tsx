"use client";

import { useState } from "react";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { AddNewCompanyRequest } from "@/types/request";
import { addNewCompany } from "@/lib/services/employee/company/AddNewCompany";

import { Button } from "../ui/button"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog"

import { PlusIcon, PencilLine, PencilOff } from "lucide-react"

import { MultiSelectGroup } from "../MultiSelectGroup/multi-select-group";
import { InputGroup } from "../InputGroup/input-group";
import { FormComponent, FormContent, FormFooter } from "../Form/Form";
import { toast } from "sonner";
import { Toaster } from "../Toaster/toaster";
import { Spinner } from "../ui/spinner";

export function AddCompanyDialog({ trigger }: { trigger?: React.ReactNode }) {
    const [open, setOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { register, handleSubmit, control, reset, formState: { errors } } = useForm<AddNewCompanyRequest>();

    // submit handler for the form
    const onSubmit: SubmitHandler<AddNewCompanyRequest> = async (data) => {
        setIsLoading(true);
        try {
            const result = await addNewCompany(data);

            if (!result.data.success) {
                console.error("Failed to add new company:", result.data.message);
                toast.custom(() => <Toaster variant='error' title='failed to add new company.' description={`${result.data.message || "we cant process your request to add company"}`} />)
            }

            if (result.data.success) {
                toast.custom(() => <Toaster variant='success' title='company added successfully.' description='the new company has been added to your account.' />)
                reset();
                setOpen(!open);
            }
        } catch (error) {
            console.error("Error adding new company:", error);
            toast.custom(() => <Toaster variant='error' title='failed to add new company.' description={`${error || "we cant process your request to add company"}`} />)
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog defaultOpen={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger || (
                    <Button className="min-w-32 flex flex-row items-center gap-1.5 ring-1 ring-green-500 bg-green-500 text-white hover:bg-green-600">
                        <PlusIcon />
                        <p className="text-sm">Add Company</p>
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Company</DialogTitle>
                    <DialogDescription>
                        Fill in the details for the new company you want to add. Click save when you&apos;re done.
                    </DialogDescription>
                </DialogHeader>
                <div className="">
                    <FormComponent asWrapper={false} className="w-full flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                        <FormContent>
                            <InputGroup
                                label="Company Name & Avatar"
                                htmlFor="company_name"
                                requiredLabel
                                placeholder="Enter company name..."
                                type="text"
                                aria-invalid={!!errors.company_name}
                                errorMsg={errors.company_name?.message}
                                {...register("company_name", { required: "Company name is required" })}
                            />
                            <InputGroup
                                label="Company Description"
                                htmlFor="company_description"
                                placeholder="Enter company description..."
                                requiredLabel
                                type="text"
                                aria-invalid={!!errors.company_description}
                                errorMsg={errors.company_description?.message}
                                {...register("company_description", { required: "Company description is required" })}
                            />
                            <InputGroup
                                label="Total Employees"
                                htmlFor="total_employees"
                                placeholder="Enter total employees..."
                                requiredLabel
                                type="number"
                                aria-invalid={!!errors.total_employees}
                                errorMsg={errors.total_employees?.message}
                                {...register("total_employees", { required: "Total employees is required", valueAsNumber: true })}
                            />
                            <Controller
                                control={control}
                                name="company_field"
                                render={({ field }) => (
                                    <MultiSelectGroup
                                        label="Company Field"
                                        placeholder="Select company field..."
                                        options={[
                                            { label: "Technology", value: "Technology" },
                                            { label: "IT", value: "IT" },
                                            { label: "Software", value: "Software" },
                                            { label: "Telecommunications", value: "Telecommunications" },
                                            { label: "Gaming", value: "Gaming" },
                                            { label: "Media", value: "Media" },

                                            // ── Finance & Business
                                            { label: "Finance", value: "Finance" },
                                            { label: "Banking", value: "Banking" },
                                            { label: "Insurance", value: "Insurance" },
                                            { label: "Investment", value: "Investment" },
                                            { label: "Consulting", value: "Consulting" },
                                            { label: "Legal", value: "Legal" },

                                            // ── Healthcare & Science
                                            { label: "Healthcare", value: "Healthcare" },
                                            { label: "Pharmaceutical", value: "Pharmaceutical" },
                                            { label: "Biotechnology", value: "Biotechnology" },
                                            { label: "Research", value: "Research" },

                                            // ── Education
                                            { label: "Education", value: "Education" },

                                            // ── Retail & Consumer
                                            { label: "Retail", value: "Retail" },
                                            { label: "E-Commerce", value: "E-Commerce" },
                                            { label: "Food & Beverage", value: "Food & Beverage" },
                                            { label: "Agriculture", value: "Agriculture" },

                                            // ── Industry & Energy
                                            { label: "Manufacturing", value: "Manufacturing" },
                                            { label: "Construction", value: "Construction" },
                                            { label: "Energy", value: "Energy" },
                                            { label: "Mining", value: "Mining" },

                                            // ── Logistics & Transportation
                                            { label: "Logistics", value: "Logistics" },
                                            { label: "Automotive", value: "Automotive" },
                                            { label: "Aviation", value: "Aviation" },
                                            { label: "Maritime", value: "Maritime" },

                                            // ── Property & Hospitality
                                            { label: "Real Estate", value: "Real Estate" },
                                            { label: "Hospitality", value: "Hospitality" },
                                            { label: "Tourism", value: "Tourism" },

                                            // ── Creative & Services
                                            { label: "Creative", value: "Creative" },
                                            { label: "Entertainment", value: "Entertainment" },
                                            { label: "Non-Profit", value: "Non-Profit" },
                                            { label: "Government", value: "Government" },
                                            { label: "Environment", value: "Environment" },
                                        ]}
                                        onChange={field.onChange}
                                        value={field.value}
                                        required
                                        error={errors.company_field?.message}
                                    />
                                )}
                                rules={{ required: { value: true, message: "Company field is required." } }}
                            />
                        </FormContent>
                        <FormFooter className="w-full flex flex-row items-center justify-start gap-3 mt-4">
                            <Button variant="outline" className="ring ring-green-500 bg-green-100 text-green-600 w-28 h-8 p-0 flex flex-row items-center justify-center hover:bg-green-200 hover:text-green-600">
                                {isLoading ? (
                                    <>
                                        <Spinner className="size-4" />
                                        saving...
                                    </>
                                ) : (
                                    <>
                                        <PencilLine className="size-4" />
                                        save
                                    </>
                                )}
                            </Button>
                            <Button variant="outline" className="ring ring-red-500 bg-red-100 text-red-600 w-28 h-8 p-0 flex flex-row items-center justify-center hover:bg-red-200 hover:text-red-600">
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