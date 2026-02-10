import { EmployeeSidebar } from "@/components/EmployeeSidebar/employee-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function EmployeePageLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <SidebarProvider>
            <EmployeeSidebar />
            {children}
        </SidebarProvider>
    )
}