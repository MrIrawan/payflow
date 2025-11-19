import React from "react";

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <section className="w-full h-screen">
      <div className="container w-full mx-auto h-full flex flex-row items-center justify-between">
        {children}
      </div>
    </section>
  );
}
