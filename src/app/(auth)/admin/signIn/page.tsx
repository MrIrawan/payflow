"use client";

import Link from "next/link";
import Image from "next/image";
import PayFlowLogoWithTitle from "../../../../../public/images/payflow_logo_with_title.svg";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, Server, ArrowRight, Home } from "lucide-react";
import { FormComponent, FormContent, FormFooter } from "@/components/Form/Form";
import { InputGroup } from "@/components/InputGroup/input-group";
import { Separator } from "@/components/ui/separator";

export default function AdminLoginPage() {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Submit form admin jalan!");
        // Nanti integrasi axios adminClient di sini
    };

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
                <FormComponent asWrapper={false} className="flex flex-col gap-6">
                    <FormContent className="w-full flex flex-col gap-3">
                        <InputGroup
                            type="text"
                            label="Admin Username"
                            htmlFor="username"
                            requiredLabel
                            placeholder="Admin PayFlow"
                        />
                        <InputGroup
                            type="password"
                            label="Admin Password"
                            htmlFor="password"
                            requiredLabel
                            placeholder="********"
                        />
                    </FormContent>
                    <FormFooter className="w-full p-0 flex flex-col gap-4">
                        <Button className="w-full bg-blue-600 hover:bg-blue-800">Masuk</Button>
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