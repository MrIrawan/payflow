import { Avatar, AvatarFallback } from "../ui/avatar";
import { Card, CardDescription, CardTitle } from "../ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator } from "../ui/dropdown-menu";
import { Button } from "../ui/button";

import { ChevronsUpDown, Plus } from "lucide-react";

export function CompanyContextDropDown() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Card className="w-full h-fit rounded-md shadow-none border-none flex flex-row justify-start items-center gap-2 p-2 hover:bg-glass-secondary/5 duration-300 transition-colors">
                    <Avatar className="rounded-sm w-9 h-9">
                        <AvatarFallback className="rounded-sm">AV</AvatarFallback>
                    </Avatar>
                    <div className="w-full flex flex-col">
                        <CardTitle className="text-sm font-semibold">PayFlow</CardTitle>
                        <CardDescription className="text-xs font-mono">Payroll Web App</CardDescription>
                    </div>
                    <ChevronsUpDown />
                </Card>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" align="start" className="min-w-[250px] flex flex-col justify-between h-fit">
                <DropdownMenuGroup>
                    <DropdownMenuLabel className="text-glass-secondary text-xs font-mono font-semibold">Companies</DropdownMenuLabel>
                    <div className="w-full h-fit flex flex-col gap-1.5">
                        <DropdownMenuItem className="p-0 group">
                            <Card className="w-full shadow-none border-none p-1.5 h-fit rounded-sm group-hover:bg-glass-secondary/5 duration-300 transition-colors flex flex-row justify-start items-center gap-2.5">
                                <Avatar className="rounded-sm">
                                    <AvatarFallback className="rounded-sm">AV</AvatarFallback>
                                </Avatar>
                                <CardTitle className="font-sans text-sm font-normal">PayFlow</CardTitle>
                            </Card>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="p-0 group">
                            <Card className="w-full shadow-none border-none p-1.5 h-fit rounded-sm group-hover:bg-glass-secondary/5 duration-300 transition-colors flex flex-row justify-start items-center gap-2.5">
                                <Avatar className="rounded-sm">
                                    <AvatarFallback className="rounded-sm">AV</AvatarFallback>
                                </Avatar>
                                <CardTitle className="font-sans text-sm font-normal">PayFlow</CardTitle>
                            </Card>
                        </DropdownMenuItem>
                    </div>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem className="p-0">
                        <Button variant={"default"} className="w-full shadow-none bg-glass-surface border-none p-1.5 h-fit rounded-sm hover:bg-glass-secondary/5 duration-300 transition-colors flex flex-row justify-start items-center gap-2.5">
                            <div className="size-7 border-2 border-glass-tertiary/80 bg-glass-tertiary/20 rounded-sm flex flex-row justify-center items-center">
                                <Plus className="text-glass-tertiary/80 size-6" />
                            </div>
                            <CardTitle className="font-sans text-sm font-normal text-black">Add new company</CardTitle>
                        </Button>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}