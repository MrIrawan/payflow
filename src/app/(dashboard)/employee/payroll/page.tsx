"use client";

import { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

import { DashboardBreadcrumb } from "@/components/DashboardBreadcrumb/dashboard-breadcrumb"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ArrowRightCircle, Calculator, Clock, Receipt } from "lucide-react"
import { UserPayrollCalculation } from "@/types/response";
import { UserPayrollCalculationRequest } from "@/types/request";
import { FormComponent, FormContent, FormFooter, FormHeader } from "@/components/Form/Form";
import { InputGroup } from "@/components/InputGroup/input-group";
import { SelectGroupComponent } from "@/components/SelectGroup/select-group";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Toaster } from "@/components/Toaster/toaster";
import { userPayrollCalculation } from "@/lib/service/user/payroll/userPayrollCalculation";
import { Spinner } from "@/components/ui/spinner";

export default function PayrollCalculatePage() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { register, handleSubmit, control, formState: { errors } } = useForm<UserPayrollCalculationRequest>();

    const onSubmit: SubmitHandler<UserPayrollCalculationRequest> = async (data) => {
        setIsLoading(true);

        try {
            const response = await userPayrollCalculation(data);

            if (!response.isSuccess) {
                toast.custom(() => <Toaster variant="error" title="kami gagal menghitung." description={response.message} />)
                console.log(response);
            } else {
                toast.custom(() => <Toaster variant="success" title="kami berhasil menghitung!" description="berhasil! perhitungan kalkulasi yang tepat dan cepat" />)
                console.log(response);
            }

        } catch (error) {
            toast.custom(() => <Toaster variant="error" title="gagal! kami gagal menghitung kalkulasi gaji anda." description="ada sesuatu yang terjadi sehingga kami tidak bisa memproses permintaan kamu." />)
        } finally {
            setIsLoading(false);
            console.log(data)
        }
    }

    return (
        <section className="w-full p-6">
            <div className="w-full flex flex-col gap-6">
                <div className="w-full flex flex-col gap-3">
                    <PageHeader />
                    <Separator />
                </div>
                <div className="w-full flex flex-row justify-between gap-4 h-[350px]">
                    {/* calc form here */}
                    <FormComponent asWrapper={false} className="w-3/6 bg-white p-4 rounded-2xl border border-blue-100 shadow-md flex flex-col gap-0 justify-between h-full" onSubmit={handleSubmit(onSubmit)}>
                        <FormHeader className="p-0">
                            <div className="flex items-center gap-2 text-blue-600 font-semibold">
                                <Calculator size={20} />
                                <h2>Input Parameter Gaji</h2>
                            </div>
                        </FormHeader>
                        <FormContent className="flex flex-col gap-2">
                            <InputGroup
                                label="Total Jam per-Minggu"
                                htmlFor="totalWeeklyHours"
                                type="number"
                                requiredLabel
                                aria-invalid={errors.totalWeeklyHours?.message ? "true" : "false"}
                                errorMsg={errors.totalWeeklyHours?.message}
                                {...register("totalWeeklyHours", {
                                    required: { value: true, message: "total jam/minggu wajib di isi." }
                                })}
                            />
                            <Controller
                                control={control}
                                name="month"
                                render={({ field, formState: { errors } }) => (
                                    <SelectGroupComponent
                                        label="Bulan"
                                        htmlFor="month"
                                        placeholder="Pilih bulan"
                                        items={[
                                            { value: "1", displayText: "Januari" },
                                            { value: "2", displayText: "Februari" },
                                            { value: "3", displayText: "Maret" },
                                            { value: "4", displayText: "April" },
                                            { value: "5", displayText: "Mei" },
                                            { value: "6", displayText: "Juni" },
                                            { value: "7", displayText: "Juli" },
                                            { value: "8", displayText: "Agustus" },
                                            { value: "9", displayText: "September" },
                                            { value: "10", displayText: "Oktober" },
                                            { value: "11", displayText: "November" },
                                            { value: "12", displayText: "Desember" },
                                        ]}
                                        onChange={field.onChange}
                                        value={field.value}
                                        errorMessage={errors.month?.message}
                                    />
                                )}
                                rules={{
                                    required: { value: true, message: "pilihan bulan wajib di isi." }
                                }}
                            />
                            <InputGroup
                                label="Tahun"
                                htmlFor="year"
                                type="number"
                                requiredLabel
                                errorMsg={errors.year?.message}
                                {...register("year", {
                                    required: { value: true, message: "tahun wajib di isi." }
                                })}
                            />
                        </FormContent>
                        <FormFooter>
                            <Button variant={"default"} className="bg-blue-700 w-full hover:bg-blue-800">
                                {isLoading ? (<Spinner />) : (
                                    <>
                                        <ArrowRightCircle className="text-white" />
                                        <p className="text-sm font-medium text-white">hitung kalkulasi</p>
                                    </>
                                )}
                            </Button>
                        </FormFooter>
                    </FormComponent>
                    {/* calc result here */}
                    <div className="w-full bg-white p-4 rounded-2xl border border-blue-100 shadow-md flex flex-col gap-0 justify-between h-[90%]">
                        <div className="flex flex-row justify-between items-start">
                            <div className="flex flex-col gap-0">
                                <h3 className="text-gray-500 font-medium mb-1">Estimasi Gaji Bersih</h3>
                                <div className="text-4xl font-bold text-gray-900 mb-8">
                                    Belum diketahui
                                </div>
                            </div>
                            <div className="opacity-5">
                                <Receipt size={120} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-4 bg-blue-50 rounded-xl">
                                <p className="text-sm text-blue-600 font-medium mb-1">Honor Mengajar</p>
                                <p className="text-xl font-bold text-blue-900">Belum diketahui</p>
                                <p className="text-xs text-blue-400 mt-1">25k × 4 JP × 4 Minggu</p>
                            </div>
                            <div className="p-4 bg-green-50 rounded-xl">
                                <p className="text-sm text-green-600 font-medium mb-1">Uang Transport</p>
                                <p className="text-xl font-bold text-green-900">Belum diketahui</p>
                                <p className="text-xs text-green-400 mt-1">45k × Total Kehadiran</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* history goes here */}
            </div>
        </section>
    )
}

function PageHeader() {
    return (
        <div className="h-fit w-full flex flex-row items-center gap-3">
            <SidebarTrigger className="[&_svg:not([class*='size-'])]:size-6 hover:bg-muted" />
            <DashboardBreadcrumb data={{
                page: "Payroll",
                link: [
                    { title: "Dashboard", href: "/employee" }
                ]
            }} />
        </div>
    )
}
