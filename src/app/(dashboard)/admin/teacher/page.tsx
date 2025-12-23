import { DashboardBreadcrumb } from "@/components/DashboardBreadcrumb/dashboard-breadcrumb";
import TeacherTable from "@/components/TeacherTable/teacher-table";
import { Card } from "@/components/ui/card";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function TeacherPage() {
    return (
        <section className="w-full p-6">
            <div className="w-full flex flex-col gap-6 items-center">
                <PageHeader />
                <Card className="w-full shadow-none p-3">
                    <TeacherTable />
                </Card>
            </div>
        </section>
    )
}

function PageHeader() {
    return (
        <div className="h-fit w-full flex flex-row items-center gap-3">
            <SidebarTrigger className="[&_svg:not([class*='size-'])]:size-6 hover:bg-muted" />
            <DashboardBreadcrumb data={{
                page: "Data guru",
                link: [
                    {
                        title: "Dashboard",
                        href: "/admin"
                    }
                ]
            }} />
        </div>
    )
}