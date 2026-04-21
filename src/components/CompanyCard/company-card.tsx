import { CompanyCardProps } from "@/types/types";

import { Card } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

import { InfoBadge } from "../InfoBadge/info-badge";

import { CopyIcon, EllipsisVerticalIcon, SettingsIcon } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "../Toaster/toaster";

export function CompanyCard({ companyName, companyRegion, companyAvatar, totalEmployees, companyField, companyKey }: CompanyCardProps) {
    return (
        <Card className="w-full h-[180px] flex flex-col gap-4 transition duration-300 ease-in-out hover:bg-border/30 p-4">
            <div className="w-full flex flex-row justify-between items-center">
                <div className="w-full flex flex-row gap-2 items-start">
                    {/* company avatar */}
                    <Avatar className="w-12 h-12 rounded-md">
                        {companyAvatar && (<AvatarImage src={companyAvatar} alt={`${companyName} avatar`} />)}
                        <AvatarFallback className="bg-gray-500 rounded-md font-semibold text-lg text-white uppercase">{companyName.slice(0, 1)}</AvatarFallback>
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
                        <p className="text-sm text-muted-foreground capitalize">Region: {companyRegion}</p>
                    </div>
                </div>
            </div>
            <div className="w-full flex flex-row items-center flex-wrap gap-3">
                <InfoBadge label="Active" className="bg-green-100 ring ring-green-400 text-green-600" />
                <InfoBadge label={companyField} />
                <InfoBadge label={`${totalEmployees} Employees`} />
            </div>
        </Card>
    )
}