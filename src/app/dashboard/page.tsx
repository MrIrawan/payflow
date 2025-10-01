import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  UserRoundIcon,
  CalendarCheck2Icon,
  HandCoinsIcon,
  AlarmClockIcon,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="w-full h-full flex flex-col gap-3 p-3">
      <div className="w-full min-h-3/12 bg-green-200">
        <Card className="w-full h-full rounded-none py-0 shadow-none border-none gap-2 justify-evenly">
          <CardHeader className="px-0 flex flex-col gap-2">
            <CardDescription>
              <p className="text-lg font-bold text-black/50">
                PayFLow solusi mudah untuk mengelola sistem penggajian
              </p>
            </CardDescription>
            <CardTitle>
              <h2 className="text-4xl font-bold capitalize">
                bagaimana hari anda? Farrel Irawan 👋
              </h2>
            </CardTitle>
          </CardHeader>
          <CardContent className="px-0 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <Card className="w-84 h-20 shadow-none py-0 p-3 flex-row gap-3 cursor-pointer border-none ring ring-border transition-all duration-200 hover:ring-2 hover:ring-blue-300">
                <div className="w-20 h-full bg-blue-200 ring-2 ring-blue-300 rounded-md flex items-center justify-center">
                    <UserRoundIcon className="w-6 h-6 text-blue-500" />
                </div>
                <div className="w-full h-full flex flex-col gap-0.5">
                  <h2 className="text-sm font-semibold">Data diri anda</h2>
                  <p className="text-xs font-medium text-black/50">
                    kelola data diri anda dengan mudah di PayFLow.
                  </p>
                </div>
              </Card>
              <Card className="w-84 h-20 shadow-none py-0 p-3 flex-row gap-3 cursor-pointer border-none ring ring-border transition-all duration-200 hover:ring-2 hover:ring-green-300">
                <div className="w-20 h-full bg-green-200 ring-2 ring-green-300 rounded-md flex items-center justify-center">
                    <CalendarCheck2Icon className="w-6 h-6 text-green-500" />
                </div>
                <div className="w-full h-full flex flex-col gap-0.5">
                  <h2 className="text-sm font-semibold">Absensi anda</h2>
                  <p className="text-xs font-medium text-black/50">
                    dapatkan satistik absensi anda di waktu kapanpun
                  </p>
                </div>
              </Card>
              <Card className="w-84 h-20 shadow-none py-0 p-3 flex-row gap-3 cursor-pointer border-none ring ring-border transition-all duration-200 hover:ring-2 hover:ring-yellow-300">
                <div className="w-20 h-full bg-yellow-200 ring-2 ring-yellow-300 rounded-md flex items-center justify-center">
                    <HandCoinsIcon className="w-6 h-6 text-yellow-500" />
                </div>
                <div className="w-full h-full flex flex-col gap-0.5">
                  <h2 className="text-sm font-semibold">Info gaji anda</h2>
                  <p className="text-xs font-medium text-black/50">
                    lihat informasi gaji anda kapanpun dimanapun
                  </p>
                </div>
              </Card>
              <Card className="w-84 h-20 shadow-none py-0 p-3 flex-row gap-3 cursor-pointer border-none ring ring-border transition-all duration-200 hover:ring-2 hover:ring-orange-300">
                <div className="w-20 h-full bg-orange-200 ring-2 ring-orange-300 rounded-md flex items-center justify-center">
                    <AlarmClockIcon className="w-6 h-6 text-orange-500" />
                </div>
                <div className="w-full h-full flex flex-col gap-0.5">
                  <h2 className="text-sm font-semibold">Jam ajar & mapel</h2>
                  <p className="text-xs font-medium text-black/50">
                    atur mapel dan jam ajar sesuai yang anda mau
                  </p>
                </div>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="w-full h-80 bg-blue-200"></div>
      <div className="w-full h-1/2 bg-indigo-200"></div>
    </div>
  );
}
