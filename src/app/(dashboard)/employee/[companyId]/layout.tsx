import { EmployeeSidebar } from "@/components/EmployeeSidebar/employee-sidebar";
import { TotalEmployeesSidebar } from "@/components/TotalEmployeesSidebar/total-employees-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function EmployeePageLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <SidebarProvider>
            <EmployeeSidebar />
            {children}
            <TotalEmployeesSidebar />
        </SidebarProvider>
    )
}