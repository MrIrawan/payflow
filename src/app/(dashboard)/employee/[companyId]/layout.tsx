import { SidebarProvider } from "@/components/ui/sidebar";
import { EmployeeLeftSidebar } from "@/components/EmployeeLeftSidebar/employee-left-sidebar";
import { EmployeeRightSidebar } from "@/components/EmployeeRightSidebar/employee-right-sidebar";

export default function EmployeePageLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <SidebarProvider>
            <EmployeeLeftSidebar />
            {children}
            <EmployeeRightSidebar />
        </SidebarProvider>
    )
}