"use client";

import { cn } from "@/lib/utils";

import Image from "next/image";
import PayflowLogo from "../../../public/images/payflow-logo.svg";

import { CardHeader, CardContent, CardFooter } from "../ui/card";
import {
  FormComponentProps,
  FormContentProps,
  FormFooterPops,
  FormHeaderProps,
} from "@/types/types";
import { Button } from "../ui/button";

export function FormComponent({
  asWrapper = true,
  children,
  className,
  ...props
}: FormComponentProps) {
  return (
    <>
      {asWrapper ? (
        <form
          className={cn(
            "w-full h-full rounded-none shadow-none flex flex-row justify-center items-center",
            className
          )}
          {...props}
        >
          <div className="w-full max-w-4/5 flex flex-col gap-6">{children}</div>
        </form>
      ) : (
        <form
          className={cn(
            "w-full h-full rounded-none shadow-none flex flex-col gap-6",
            className
          )}
          {...props}
        >
          {children}
        </form>
      )}
    </>
  );
}

function FormHeader({
  logo,
  logoTitle,
  className,
  children,
  ...props
}: FormHeaderProps) {
  return (
    <CardHeader className={cn(className)} {...props}>
      {logo ? (
        <div className="w-fit flex flex-row gap-1">
          <Image
            src={PayflowLogo}
            alt="payflow logo image"
            width={35}
            height={35}
          />
          <h3 className="text-lg font-semibold">
            {logoTitle ? logoTitle : "logo title here"}
          </h3>
        </div>
      ) : (
        ""
      )}
      {children}
    </CardHeader>
  );
}

function FormContent({ children, className, ...props }: FormContentProps) {
  return (
    <CardContent
      className={cn("w-full bg-white p-0 flex flex-col gap-6", className)}
      {...props}
    >
      {children}
    </CardContent>
  );
}

function FormFooter({
  children,
  className,
  button = false,
  ...props
}: FormFooterPops) {
  return (
    <CardFooter className={cn("p-0 w-full", className)}>
      {button ? (
        <Button
          size={"lg"}
          className="bg-linear-to-r/oklch from-blue-600 to-blue-900 w-full hover:brightness-90 focus-visible:ring-blue-100 focus-visible:border-blue-600 focus-visible:ring-[3px]"
        >
          <p className="text-base font-medium text-white">register account</p>
        </Button>
      ) : (
        <>{children}</>
      )}
    </CardFooter>
  );
}

export { FormHeader, FormContent, FormFooter };
