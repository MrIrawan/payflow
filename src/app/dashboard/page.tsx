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
      <div className="w-full h-80 bg-blue-200"></div>
      <div className="w-full h-1/2 bg-indigo-200"></div>
    </div>
  );
}
