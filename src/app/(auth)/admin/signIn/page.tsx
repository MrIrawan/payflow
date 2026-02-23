"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { SignInAdminRequest } from "@/types/request";
import { signInAdmin } from "@/lib/services/admin/auth/signInAdmin";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import PayFlowLogoWithTitle from "../../../../../public/images/payflow_logo_with_title.svg";

import { toast } from "sonner";
import { Toaster } from "@/components/Toaster/toaster";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";

import { FormComponent, FormContent, FormFooter } from "@/components/Form/Form";
import { InputGroup } from "@/components/InputGroup/input-group";

export default function AdminLoginPage() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm<SignInAdminRequest>();
    const router = useRouter();

    const onSubmit: SubmitHandler<SignInAdminRequest> = async (data) => {
        setIsLoading(true);

        try {
            const response = await signInAdmin(data);

            if (response.data.success === false) {
                toast.custom(() => <Toaster variant="error" title="gagal masuk sebagai admin" description={`${response.data.message || "anda gagal dalam masuk sebagai admin."}`} />);
                return;
            }

            toast.custom(() => <Toaster variant="success" title="berhasil masuk sebagai admin" description="anda berhasil masuk sebagai admin, nikmati keseluruhan fitur penggajian." />);
            router.push("/admin");
        } catch (error) {
            toast.custom(() => <Toaster variant="error" title="kami tidak bisa memproses" description="terjadi suatu error sehingga kami tidak bisa memproses." />);
            console.error(error);
            return;
        } finally {
            setIsLoading(false);
            reset();
        }
    }

    return (
        <Card className="w-full shadow-xl border-0 ring-1 ring-gray-200/50 p-6">
            <CardHeader className="flex flex-col gap-1 p-0">
                {/* Logo untuk tampilan mobile (muncul saat layar kecil) */}
                <div className="flex lg:hidden items-center">
                    <Image
                        src={PayFlowLogoWithTitle}
                        alt="PayFlow Logo"
                        className="w-56"
                    />
                </div>

                <CardTitle className="text-2xl font-bold text-gray-900">
                    Login Admin
                </CardTitle>
                <CardDescription className="text-base">
                    Masukkan username dan kredensial admin Anda.
                </CardDescription>
            </CardHeader>

            <CardContent className="p-0">
                <FormComponent asWrapper={false} className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
                    <FormContent className="w-full flex flex-col gap-3">
                        <InputGroup
                            type="text"
                            label="Admin Username"
                            htmlFor="username"
                            requiredLabel
                            placeholder="Admin PayFlow"
                            aria-invalid={errors.username ? "true" : "false"}
                            errorMsg={errors.username?.message}
                            {...register("username", {
                                required: {
                                    value: true,
                                    message: "admin username wajib di isi."
                                }
                            })}
                        />
                        <InputGroup
                            type="password"
                            label="Admin Password"
                            htmlFor="password"
                            requiredLabel
                            placeholder="********"
                            aria-invalid={errors.password ? "true" : "false"}
                            errorMsg={errors.password?.message}
                            {...register("password", {
                                required: {
                                    value: true,
                                    message: "admin password wajib di isi."
                                }
                            })}
                        />
                    </FormContent>
                    <FormFooter className="w-full p-0 flex flex-col gap-4">
                        <Button className="w-full bg-blue-600 hover:bg-blue-800">{isLoading ? (<Spinner />) : "Masuk"}</Button>
                        <div className="w-full flex flex-row gap-3 items-center justify-center overflow-hidden">
                            <Separator className="w-fit" />
                            <p className="text-sm text-muted-foreground font-medium">Atau</p>
                            <Separator className="w-fit" />
                        </div>
                        <Link href={"/"} className="w-full">
                            <Button variant={"outline"} className="w-full border-border text-muted-foreground hover:text-muted-foreground">Kembali ke beranda</Button>
                        </Link>
                    </FormFooter>
                </FormComponent>
            </CardContent>
        </Card>
    );
}