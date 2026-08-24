import { useRouter } from "next/navigation";
import { useState } from "react";

import { CompanyCardProps } from "@/types/types";

import { Card } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

import { industryBadgeMap, InfoBadge } from "../InfoBadge/info-badge";

import { CopyIcon, EllipsisVerticalIcon, SettingsIcon } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "../Toaster/toaster";
import { switchCompanyService } from "@/lib/services/employee/company/switchCompany";
import { Spinner } from "../ui/spinner";


export function CompanyCard({ companyName, companyAvatar, totalEmployees, companyField, companyKey, companyId }: CompanyCardProps) {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const handleCompany = async (identifier: number) => {
        try {
            setIsLoading(true);
            const response = await switchCompanyService({ companyId: identifier });

            if (response.data.success === false) {
                console.error("Failed to switch company:", response.data.message);
                toast.custom(() => <Toaster variant="error" description="Failed to switch company. Please try again." title="Error" />);
                return;
            }

            toast.custom(() => <Toaster variant="success" description="Success to switch company." title="Success" />);
            router.push(`/employee/${companyId}`);
        } catch (error) {
            toast.custom(() => <Toaster variant="error" description="Something went wrong. Please try again." title="Error" />)
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Card
            className="w-full h-[200px] flex flex-col gap-3 transition duration-300 ease-in-out hover:bg-border/30 p-0 overflow-hidden group"
            onClick={() => handleCompany(companyId)}
        >
            <div className="w-full flex flex-row justify-between items-center px-4 pt-4 pb-0">
                <div className="w-full flex flex-row gap-2 items-start">
                    {/* company avatar */}
                    <Avatar className="w-12 h-12 rounded-md">
                        {companyAvatar && (<AvatarImage src={companyAvatar} alt={`${companyName} avatar`} />)}
                        <AvatarFallback className="bg-gray-500 rounded-md font-semibold text-lg text-white capitalize">{companyName.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    {/* company name and region */}
                    <div className="w-full flex flex-col gap-0 items-start">
                        <div className="w-full flex flex-row justify-between items-center">
                            {/* company name */}
                            <p className="text-base font-semibold capitalize">{companyName}</p>
                            {/* option toggle here */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <EllipsisVerticalIcon className="size-5 text-muted-foreground" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="min-w-56">
                                    <DropdownMenuItem className="group" onClick={() => {
                                        navigator.clipboard.writeText(companyKey);
                                        toast.custom(() => <Toaster variant="success" description="success to copy company key" title="company key copied!" />)
                                    }}>
                                        <CopyIcon className="size-4" />
                                        <p className="font-semibold text-xs text-muted-foreground group-hover:text-muted-foreground">Copy company key</p>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="group">
                                        <SettingsIcon className="size-4" />
                                        <p className="font-semibold text-xs text-muted-foreground group-hover:text-muted-foreground">Company settings</p>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <p className="text-sm text-muted-foreground capitalize">Company Status: <span className="text-green-600">Active</span></p>
                    </div>
                </div>
            </div>
            <div className="w-full flex flex-col items-center flex-wrap gap-3 px-4 py-0">
                <div className="w-full flex flex-row items-center flex-wrap gap-3">
                    {companyField.length > 2 ? (
                        <>
                            {companyField.slice(0, 2).map((field, index) => (
                                <InfoBadge key={index} label={field} className={industryBadgeMap[field].className} icon={industryBadgeMap[field].icon} />
                            ))}
                            <InfoBadge label={`+${companyField.length - 2} more`} />
                        </>
                    ) : (
                        <>
                            {companyField.map((field, index) => (
                                <InfoBadge key={index} label={field} className={industryBadgeMap[field].className} icon={industryBadgeMap[field].icon} />
                            ))}
                        </>
                    )}
                </div>
                <div className="w-full flex flex-row items-center justify-start">
                    <InfoBadge label={`${totalEmployees} Employees`} />
                </div>
            </div>
            <div className="w-full h-full bg-linear-to-r from-blue-500 to-blue-700 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all flex flex-row justify-center items-center">
                <p className="text-sm font-medium text-white capitalize">{isLoading
                    ? <span className="flex flex-row items-center gap-2">
                        Joining <Spinner />
                    </span>
                    : "join this company"}</p>
            </div>
        </Card>
    )
}
