import { DashboardBreadcrumb } from "@/components/DashboardBreadcrumb/dashboard-breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

export default function EmployeePage() {
    return (
        <>
            <section className="w-full p-6">
                <div className="w-full flex flex-col gap-6">
                    <div className="flex flex-col gap-3">
                        <PageHeader />
                        <Separator />
                    </div>
                </div>
            </section>
        </>
    )
}

function PageHeader() {
    return (
        <div className="h-fit w-full flex flex-row items-center gap-3">
            <SidebarTrigger className="[&_svg:not([class*='size-'])]:size-6 hover:bg-muted" />
            <DashboardBreadcrumb data={{ page: "Dashboard" }} />
        </div>
    )
}