import QuickNavigationCard from "@/components/QuickNavigationCard/quick-navigation-card";
import { quickNavigationData } from "../../../public/data/static-quick-navigation";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { MarsIcon, UserRoundIcon, VenusIcon } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="w-full h-full flex flex-col gap-3 px-3">
      <div className="w-full min-h-3/12 bg-green-200">
        <Card className="w-full h-full rounded-none py-0 shadow-none border-none gap-2 justify-around">
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
              <QuickNavigationCard data={quickNavigationData}/>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="w-full h-80 flex items-center gap-3">
        <Card className="w-full h-full shadow-none p-3">
          <div className="flex items-start justify-between p-2">
          <CardTitle>
            <p className="text-xl font-semibold">Jumlah guru laki-laki</p>
          </CardTitle>

          <CardDescription className="w-16 h-16 shadow-none ring-2 ring-blue-300 rounded-md flex items-center justify-center bg-blue-200">
            <MarsIcon className="w-8 h-8 text-blue-500"/>
          </CardDescription>
          </div>
        </Card>
        <Card className="w-full h-full shadow-none p-3">
          <div className="flex items-start justify-between p-2">
          <CardTitle>
            <p className="text-xl font-semibold">Jumlah guru laki-laki</p>
          </CardTitle>

          <CardDescription className="w-16 h-16 shadow-none ring-2 ring-pink-300 rounded-md flex items-center justify-center bg-pink-200">
            <VenusIcon className="w-8 h-8 text-pink-500"/>
          </CardDescription>
          </div>
        </Card>
        <Card className="w-full h-full shadow-none p-3">
          <div className="flex items-start justify-between p-2">
          <CardTitle>
            <p className="text-xl font-semibold">Jumlah guru laki-laki</p>
          </CardTitle>

          <CardDescription className="w-16 h-16 shadow-none ring-2 ring-green-300 rounded-md flex items-center justify-center bg-green-200">
            <UserRoundIcon className="w-8 h-8 text-green-500"/>
          </CardDescription>
          </div>
        </Card>
      </div>
      <div className="w-full h-1/2 bg-indigo-200"></div>
    </div>
  );
}
