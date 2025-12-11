import { cn } from "@/lib/utils";

import { DataCardProps } from "@/types/types";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

export function DataCard({ children, className, ...props }: DataCardProps) {
  return (
    <Card className={cn(className)} {...props}>
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
    <CardHeader className={cn(className)} {...props}>
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
