import { SidebarProvider } from "@/components/ui/sidebar";

export default function EmployeePageLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <SidebarProvider>
            {children}
        </SidebarProvider>
    )
}