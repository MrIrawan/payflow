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
      <div className="w-full h-fit flex items-center gap-3">
        <Card className="w-full h-56 shadow-none p-3 bg-image-male">
          <CardHeader className="p-0">
            <div className="flex items-center gap-2 w-full h-16">
            <div className="w-14 h-14 shadow-none ring-2 ring-blue-300 rounded-md flex items-center justify-center bg-blue-200">
              <MarsIcon className="w-8 h-8 text-blue-500" />
            </div>
            <div className="w-fit h-full flex flex-col gap-0.5">
              <CardTitle>
                <p className="text-base font-bold">Total guru laki-laki</p>
              </CardTitle>
              <CardDescription>
                <p className="text-4xl font-semibold text-black/50 max-w-sm">64</p>
              </CardDescription>
            </div>
          </div>
          </CardHeader>
          <CardFooter className="w-full p-0">
            <p className="text-lg font-medium text-black/50">90% dari total guru ber-jenis kelamin laki-laki</p>
          </CardFooter>
        </Card>
        <Card className="w-full h-56 shadow-none p-3 bg-image-female">
          <div className="flex items-center gap-2">
            <div className="w-14 h-14 shadow-none ring-2 ring-[#27687e] rounded-md flex items-center justify-center bg-[#27687e]/50">
              <VenusIcon className="w-8 h-8 text-[#27687e]/100" />
            </div>
          </div>
        </Card>
        <Card className="w-full h-56 shadow-none p-3 bg-image-total">
          <div className="flex items-center gap-2">
            <div className="w-14 h-14 shadow-none ring-2 ring-green-300 rounded-md flex items-center justify-center bg-green-200">
              <UserRoundIcon className="w-8 h-8 text-green-500" />
            </div>
          </div>
        </Card>
      </div>
      <div className="w-full h-1/2 bg-indigo-200"></div>
    </div>
  );
}
