import { getCookie } from "@/utils/getCookie";

import { EmployeeSidebar } from "@/components/EmployeeSidebar/employee-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { redirect } from "next/navigation";

export default async function EmployeePageLayout({ children }: Readonly<{ children: React.ReactNode }>) {

    const refreshToken = await getCookie("refreshToken");

    if (!refreshToken) {
        redirect("/signIn");
    }

    return (
        <SidebarProvider>
            <EmployeeSidebar />
            {children}
        </SidebarProvider>
    )
}