"use client";

import { useState } from "react";

import Image from "next/image";
import PayFlowLogoWithTittle from "../../../public/images/payflow_logo_with_title.svg";

import { ArrowRight, LogInIcon, PlusCircleIcon, PlusIcon, SearchIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { CompanyCard } from "@/components/CompanyCard/company-card";
import { AddCompanyDialog } from "@/components/AddCompanyDialog/add-company-dialog";

export default function LobbyPage() {
    const [totalCompany, setTotalCompany] = useState<number[] | undefined>([9]);
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
                <div className="flex flex-col gap-5">
                    <div className="w-full flex flex-row justify-between items-end">
                        {/* input and additional button here */}
                        <div className="flex flex-col gap-2">
                            <Label className="text-sm font-medium">Search Companies</Label>
                            <InputGroup>
                                <InputGroupInput placeholder="Search..." />
                                <InputGroupAddon>
                                    <SearchIcon />
                                </InputGroupAddon>
                            </InputGroup>
                        </div>
                        <div className="flex flex-row justify-between items-center gap-3">
                            <AddCompanyDialog />
                            <Button className="min-w-32 flex flex-row items-center gap-1.5 ring-1 ring-blue-500 bg-blue-500 text-white hover:bg-blue-600">
                                <LogInIcon />
                                <p className="text-sm">Join Existing Company</p>
                            </Button>
                        </div>
                    </div>
                    <div className="w-full grid grid-cols-3 gap-4">
                        {/* undefined state render */}
                        {totalCompany === undefined && (
                            <>
                                {Array.from({ length: 9 }).map((_, index) => (
                                    <Skeleton className="w-full h-[200px] bg-gray-300" key={index} />
                                ))}
                            </>
                        )}

                        {/* zero state render */}
                        {totalCompany?.length === 0 ? (
                            <Button className="w-full h-[200px] p-0 bg-transparent hover:bg-transparent">
                                <Card className="w-full h-full border-2 border-dashed border-border flex flex-col justify-center items-center gap-2 transition duration-300 ease-in-out hover:bg-border/30">
                                    <PlusCircleIcon className="size-16 text-muted-foreground/50" />
                                    <p className="text-center text-muted-foreground/50">Create New Company</p>
                                </Card>
                            </Button>
                        ) : (
                            <>
                                {/* render company card here */}
                                {Array.from({ length: 9 }).map((_, index) => (
                                    <CompanyCard
                                        key={index}
                                        companyKey="anjayy"
                                        companyName={`Company ${index + 1}`}
                                        companyRegion="Indonesia"
                                        companyAvatar=""
                                        totalEmployees={40}
                                        companyField="Technology"
                                    />
                                ))}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}