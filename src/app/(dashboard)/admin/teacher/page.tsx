import TeacherTable from "@/components/TeacherTable/teacher-table";

import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { SidebarTrigger } from "@/components/ui/sidebar";

import { DashboardBreadcrumb } from "@/components/DashboardBreadcrumb/dashboard-breadcrumb";
import { Separator } from "@/components/ui/separator";

export default function TeacherPage() {
    return (
        <section className="w-full p-6">
            <div className="w-full flex flex-col gap-6 items-center">
                <PageHeader />
                <div className="w-full flex flex-col gap-6">
                    <div className="flex flex-col gap-1.5">
                        <CardTitle className="text-4xl font-bold text-black">Lihat Data Guru</CardTitle>
                        <CardDescription className="text-lg font-medium max-w-xl">Analisa dan kelola data guru dengan lengkap dan cepat secara real-time dengan fitur manajemen data guru.</CardDescription>
                    </div>
                    <Separator />
                    <TeacherTable />
                    <Card className="w-full shadow-none p-3">
                    </Card>
                </div>
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