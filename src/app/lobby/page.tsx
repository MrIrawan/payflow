"use client";

import Image from "next/image";
import PayFlowLogoWithTittle from "../../../public/images/payflow_logo_with_title.svg";

import { ArrowRight, SlashIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export default function LobbyPage() {
    return (
        <section className="w-full flex flex-col gap-0">
            <div className="w-full flex flex-row justify-between items-center py-3 px-5">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">
                                <Image
                                    src={PayFlowLogoWithTittle}
                                    alt="payflow-logo"
                                    width={150}
                                />
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="[&>svg]:size-5">
                            <ArrowRight />
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <BreadcrumbPage className="text-base font-medium">PayFlow Lobby</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <div></div>
            </div>
            <Separator />
            <div className="w-full container mx-auto py-10 px-5 flex flex-col gap-5">
                <div className="w-full flex flex-col gap-2">
                    <h1 className="text-4xl font-bold">Welcome to PayFlow Lobby</h1>
                    <p className="text-muted-foreground text-lg">
                        This is the main lobby for the PayFlow application.
                    </p>
                </div>
                <div className="w-full flex flex-col gap-3">
                    {/* input and additional button here */}

                    {/* companies card here */}

                </div>
            </div>
        </section>
    )
}