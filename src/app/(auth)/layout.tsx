import React from "react";
import { redirect } from "next/navigation";

import { getCookie } from "@/utils/getCookie";

export default async function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const isAccessToken = await getCookie("accessToken");

  if (isAccessToken) {
    redirect("/employee")
  }
  return (
    <section className="w-full h-screen">
      <div className="container w-full mx-auto h-full flex flex-row items-center justify-between">
        {children}
      </div>
    </section>
  );
}
