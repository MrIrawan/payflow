import { getCookie } from "@/utils/getCookie";
import { redirect } from "next/navigation";

import { EmployeeSidebar } from "@/components/EmployeeSidebar/employee-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default async function EmployeePageLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const isRefreshToken = await getCookie("refreshToken");

    if (!isRefreshToken) {
        redirect("/signIn");
    }

    return (
        <SidebarProvider>
            <EmployeeSidebar />
            {children}
        </SidebarProvider>
    )
}