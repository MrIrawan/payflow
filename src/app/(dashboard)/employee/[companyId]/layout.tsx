import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { EmployeeLeftSidebar } from "@/components/EmployeeLeftSidebar/employee-left-sidebar";
import { EmployeeRightSidebar } from "@/components/EmployeeRightSidebar/employee-right-sidebar";
import { Separator } from "@base-ui/react";

export default function EmployeePageLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <SidebarProvider>
            <EmployeeLeftSidebar />
            {/* <SidebarInset>
                <div className="w-full h-16 bg-glass-surface"></div>
                <Separator className={"min-w-36 border border-red-200"} />
            </SidebarInset> */}
            {children}
            {/* <EmployeeRightSidebar /> */}
        </SidebarProvider>
    )
}