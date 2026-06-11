import { Card } from "../ui/card";

import { Calendar, FileText, TrendingUp, Wallet } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

export function EmployeeDataCard({ presentCount, payslipsCount, salary }: {
    presentCount: number;
    payslipsCount: number;
    salary: number
}) {

    const formattedRupiah = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(salary);

    return (
        <div className="flex flex-col gap-3 lg:flex-row lg:items-stretch lg:justify-between">

            {/* Total Salary Card */}
            <Card className="w-full flex flex-col justify-between bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-5 text-white shadow-lg hover:shadow-xl transition-shadow border-none">
                <div className="flex items-start justify-between">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                        <Wallet className="w-6 h-6" />
                    </div>
                    <span className="text-xs bg-white/20 px-3 py-1 rounded-full">Bulan Ini</span>
                </div>
                <div className="flex flex-col gap-1">
                    <p className="text-sm text-blue-100 mb-1">Estimasi Gaji</p>
                    <p className="text-3xl font-bold">{!formattedRupiah ? 0 : formattedRupiah}</p>
                    <div className="flex items-center gap-1 text-sm text-blue-100">
                        <TrendingUp className="w-4 h-4" />
                        <span>+5% dari bulan lalu</span>
                    </div>
                </div>
            </Card>

            {/* Total Workdays Card */}
            <Card className="w-full flex flex-col justify-between bg-white rounded-2xl p-5 border border-blue-100 shadow-sm hover:shadow-md hover:bg-blue-50/30 transition-all">
                <div className="flex items-start justify-between">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-blue-500" />
                    </div>
                    <span className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-medium">Bulan Ini</span>
                </div>
                <div className="flex flex-col gap-1">
                    <p className="text-sm text-blue-600 mb-1">Total Hari Kerja</p>
                    <p className="text-3xl font-bold text-blue-900">{presentCount} Hari</p>
                    <p className="text-sm text-blue-400">Dari 23 hari kerja</p>
                </div>
            </Card>

            {/* Total Payslips Card */}
            <Card className="w-full flex flex-col justify-between bg-white rounded-2xl p-5 border border-blue-100 shadow-sm hover:shadow-md hover:bg-blue-50/30 transition-all">
                <div className="flex items-start justify-between">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                        <FileText className="w-6 h-6 text-blue-500" />
                    </div>
                    <span className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-medium">Total</span>
                </div>
                <div className="flex flex-col gap-1">
                    <p className="text-sm text-blue-600 mb-1">Slip Gaji Diterima</p>
                    <p className="text-3xl font-bold text-blue-900">{payslipsCount} Slip</p>
                    <p className="text-sm text-blue-400">Sejak bergabung</p>
                </div>
            </Card>

        </div>
    )
}