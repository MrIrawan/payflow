"use client";

import { DashboardBreadcrumbProps } from "@/types/types"

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { ArrowRightIcon } from "lucide-react";

export function DashboardBreadcrumb({ data }: DashboardBreadcrumbProps) {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                {data.link === undefined ? (
                    <BreadcrumbItem>
                        {data.page && (
                            <BreadcrumbPage>
                                <p className="text-base font-medium text-muted-foreground">{data.page}</p>
                            </BreadcrumbPage>
                        )}
                    </BreadcrumbItem>
                ) : (
                    <>
                        {
                            Array.isArray(data.link) && data.link.map((href, index) => (
                                <div key={index} className="flex flex-wrap gap-1.5">
                                    <BreadcrumbItem>
                                        <BreadcrumbLink href={href.href}>
                                            <p className="text-base font-medium text-muted-foreground">{href.title}</p>
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator className="[&>svg]:size-5">
                                        <ArrowRightIcon />
                                    </BreadcrumbSeparator>
                                </div>
                            ))
                        }
                        <BreadcrumbItem>
                            {data.page && (
                                <BreadcrumbPage>
                                    <p className="text-base font-medium text-muted-foreground">{data.page}</p>
                                </BreadcrumbPage>
                            )}
                        </BreadcrumbItem>
                    </>
                )}

            </BreadcrumbList>
        </Breadcrumb>
    )
}