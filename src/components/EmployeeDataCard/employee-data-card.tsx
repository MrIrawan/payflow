import { AttendanceBadge } from "../AttendaceBadge/attendance-badge";
import { Card, CardTitle, CardDescription } from "../ui/card";

import { Calendar, FileText, TrendingUp, Wallet } from "lucide-react";

export function EmployeeDataCard() {
    return (
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Total Salary Card */}
            <Card className="w-full flex flex-col justify-between bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-5 text-white shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                        <Wallet className="w-6 h-6" />
                    </div>
                    <span className="text-xs bg-white/20 px-3 py-1 rounded-full">Bulan Ini</span>
                </div>
                <div className="flex flex-col gap-1">
                    <p className="text-sm text-blue-100 mb-1">Total Gaji</p>
                    <p className="text-3xl font-bold">Rp 4.500.000</p>
                    <div className="flex items-center gap-1 text-sm">
                        <TrendingUp className="w-4 h-4" />
                        <span>+5% dari bulan lalu</span>
                    </div>
                </div>
            </Card>

            {/* Total Workdays Card */}
            <Card className="w-full flex flex-col justify-between bg-white rounded-2xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-green-600" />
                    </div>
                    <AttendanceBadge placeholder="present" />
                </div>
                <div className="flex flex-col gap-1">
                    <p className="text-sm text-gray-600 mb-1">Total Hari Kerja</p>
                    <p className="text-3xl font-bold text-gray-900">22 Hari</p>
                    <p className="text-sm text-gray-500">Dari 23 hari kerja</p>
                </div>
            </Card>

            {/* Total Payslips Card */}
            <Card className="w-full flex flex-col justify-between bg-white rounded-2xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                        <FileText className="w-6 h-6 text-purple-600" />
                    </div>
                    <span className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium">Total</span>
                </div>
                <div className="flex flex-col gap-1">
                    <p className="text-sm text-gray-600 mb-1">Slip Gaji Diterima</p>
                    <p className="text-3xl font-bold text-gray-900">12 Slip</p>
                    <p className="text-sm text-gray-500">Sejak bergabung</p>
                </div>
            </Card>
        </div>
    )
}