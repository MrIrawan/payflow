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
          <Card className={`w-84 h-20 shadow-none py-0 p-3 flex-row gap-3 cursor-pointer border-none ring ring-border rounded-xl transition-all duration-200 hover:ring-2 hover:ring-[#31572c] hover:bg-[#ecf39e]/20`}>
            <div className={`w-20 h-full bg-[#ecf39e] ring-2 ring-[#31572c] rounded-md flex items-center justify-center`}>
              <item.icon className={`w-6 h-6 text-[#31572c]`} />
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
