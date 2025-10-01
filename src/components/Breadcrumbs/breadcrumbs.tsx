import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
  BreadcrumbEllipsis,
} from "../ui/breadcrumb";

import { BreadcrumbsProps } from "@/types/types";

export default function Breadcrumbs({ items, currentPage }: BreadcrumbsProps) {
  return (
    <Breadcrumb className="w-full flex items-center">
      <div className="w-full px-2">
        <BreadcrumbList className="w-full">
          {items.map((item, index) => (
            <>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={"/"} className="font-medium">
                    home
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </>
          ))}
          <BreadcrumbItem>
            <BreadcrumbPage className="font-medium lowercase">
              {currentPage}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </div>
    </Breadcrumb>
  );
}
