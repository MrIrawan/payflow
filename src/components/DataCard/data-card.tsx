import { cn } from "@/lib/utils";

import { DataCardProps } from "@/types/types";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

export function DataCard({ children, className, ...props }: DataCardProps) {
  return (
    <Card
      className={cn(
        "shadow-none w-full h-[250px] flex flex-col gap-0 items-start p-4",
        className
      )}
      {...props}
    >
      {children}
    </Card>
  );
}

export function DataCardHeader({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <CardHeader
      className={cn(
        "w-full flex flex-row items-center gap-3 justify-start p-0",
        className
      )}
      {...props}
    >
      {children}
    </CardHeader>
  );
}

export function DataCardBody({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <CardContent className={cn(className)} {...props}>
      {children}
    </CardContent>
  );
}

export function DataCardFooter({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <CardFooter className={cn(className)} {...props}>
      {children}
    </CardFooter>
  );
}
