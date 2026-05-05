"use client";

import { useState } from "react";

import { useForm, SubmitHandler } from "react-hook-form";

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { LogInIcon } from "lucide-react"
import { InputGroup } from "../InputGroup/input-group"
import { FormComponent, FormContent, FormFooter } from "../Form/Form";
import { Spinner } from "../ui/spinner";
import { toast } from "sonner";
import { Toaster } from "../Toaster/toaster";
import { joinCompany } from "@/lib/services/employee/company/joinCompany";

export function JoinCompanyDialog() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);

    const { register, handleSubmit, formState: { errors }, reset } = useForm<{ company_key: string }>();

    const onSubmit: SubmitHandler<{ company_key: string }> = async (data) => {
        setIsLoading(true);

        const response = await joinCompany({ company_key: data.company_key });

        if (response.success === false) {
            toast.custom(() => <Toaster variant='error' title='Failed to Join Company' description={response?.message || "we cant process your request to join company"} />)
            console.error("Failed to join company:", response.message);

            setIsLoading(false);
            reset();
            return;
        }

        if (response.success === true) {
            toast.custom(() => <Toaster variant='success' title='Successfully Joined Company' description={response?.message || "you have successfully joined the company"} />)
            setIsLoading(false);
            reset();
            setOpen(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="min-w-32 flex flex-row items-center gap-1.5 ring-1 ring-blue-500 bg-blue-500 text-white hover:bg-blue-600">
                    <LogInIcon />
                    <p className="text-sm">Join Existing Company</p>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Join an Existing Company</DialogTitle>
                    <DialogDescription className="text-sm">
                        Enter the unique code provided by your company administrator to join your company's PayFlow account.
                    </DialogDescription>
                </DialogHeader>
                <FormComponent asWrapper={false} onSubmit={handleSubmit(onSubmit)} className="p-0">
                    <FormContent className="p-0">
                        <InputGroup
                            label="Company Key"
                            requiredLabel
                            type="text"
                            htmlFor="company_key"
                            placeholder="Ex: P4YFL0W"
                            aria-invalid={errors.company_key ? "true" : "false"}
                            errorMsg={errors.company_key?.message}
                            {...register("company_key", {
                                required: "Company key is required",
                                minLength: { value: 3, message: "Company key must be at least 3 characters" },
                                maxLength: { value: 6, message: "Company key must be at most 6 characters" },
                            })}
                        />
                    </FormContent>
                    <FormFooter>
                        <DialogFooter className="sm:justify-start">
                            <Button className="bg-blue-600 hover:bg-blue-700 w-40">
                                {isLoading ? (
                                    <>
                                        <Spinner />
                                        <span>Joining...</span>
                                    </>
                                ) : (
                                    <>
                                        <LogInIcon />
                                        <span>Join Company</span>
                                    </>
                                )}
                            </Button>
                        </DialogFooter>
                    </FormFooter>
                </FormComponent>
            </DialogContent>
        </Dialog>
    )
}
