"use client";

import { useState, useEffect } from "react";

import Image from "next/image";
import PayFlowLogoWithTittle from "../../../public/images/payflow_logo_with_title.svg";

import { ArrowRight, LogInIcon, PlusCircleIcon, SearchIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { CompanyCard } from "@/components/CompanyCard/company-card";
import { AddCompanyDialog } from "@/components/AddCompanyDialog/add-company-dialog";
import { getOwnCompany } from "@/lib/services/employee/company/getOwnCompany";
import { GetOwnCompanyData } from "@/types/response";
import { JoinCompanyDialog } from "@/components/JoinCompanyDialog/join-company-dialog";

export default function LobbyPage() {
    const [totalCompany, setTotalCompany] = useState<GetOwnCompanyData[] | undefined>(undefined);

    useEffect(() => {
        // fetch own company data here and set totalCompany state
        async function fetchOwnCompanyData() {
            const response = await getOwnCompany();

            if (response.success === false) {
                console.error("Failed to fetch own company data:", response.message);

                if (response.status === 404) {
                    console.warn("No company found for the user. Redirecting to lobby:", response.message);
                    setTotalCompany([]);
                    return;
                }
                return;
            }

            if (response.data !== null) {
                setTotalCompany(response.data);
            }
        };

        fetchOwnCompanyData();
    }, [])
    console.log("Fetched own company data:", totalCompany?.map(company => company.company_field));
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
                            <JoinCompanyDialog />
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
                            <AddCompanyDialog trigger={
                                <Button className="w-full h-[200px] p-0 bg-transparent hover:bg-transparent">
                                    <Card className="w-full h-full border-2 border-dashed border-border flex flex-col justify-center items-center gap-2 transition duration-300 ease-in-out hover:bg-border/30">
                                        <PlusCircleIcon className="size-16 text-muted-foreground/50" />
                                        <p className="text-center text-muted-foreground/50">Create New Company</p>
                                    </Card>
                                </Button>
                            } />
                        ) : (
                            <>
                                {/* render company card here */}
                                {totalCompany?.map((company, index) => (
                                    <CompanyCard
                                        key={index}
                                        companyId={company.company_id}
                                        companyKey={company.company_key}
                                        companyName={company.company_name}
                                        companyAvatar={company.company_avatar}
                                        totalEmployees={company.total_employees}
                                        companyField={company.company_field}
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