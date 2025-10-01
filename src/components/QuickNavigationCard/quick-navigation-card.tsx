import Link from "next/link";

import { QuickNavigationCardProps } from "@/types/types";
import { Card } from "../ui/card";

export default function QuickNavigationCard({
  data,
}: {
  data: QuickNavigationCardProps[];
}) {
  return (
    <>
      {data.map((item, index) => (
        <Link href={item.link} key={index}>
          <Card className={`w-84 h-20 shadow-none py-0 p-3 flex-row gap-3 cursor-pointer border-none ring ring-border transition-all duration-200 hover:ring-2 hover:ring-${item.color}-300`}>
            <div className={`w-20 h-full bg-${item.color}-200 ring-2 ring-${item.color}-300 rounded-md flex items-center justify-center`}>
              <item.icon className={`w-6 h-6 text-${item.color}-500`} />
            </div>
            <div className="w-full h-full flex flex-col gap-0.5">
              <h2 className="text-sm font-semibold">{item.title}</h2>
              <p className="text-xs font-medium text-black/50">
                {item.description}
              </p>
            </div>
          </Card>
        </Link>
      ))}
    </>
  );
}
