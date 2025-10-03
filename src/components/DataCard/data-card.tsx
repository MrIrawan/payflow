import Link from "next/link";

import { cn } from "@/lib/utils";

import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from "../ui/card";
import { Button } from "../ui/button";

import { DataCardProps } from "@/types/types";

export default function DataCard({
  title,
  description,
  link,
  button,
  className,
  titleStyle,
  descriptionStyle,
  buttonStyle,
}: DataCardProps) {
  return (
    <Card
      className={cn("w-full h-56 flex flex-col justify-end gap-3", className)}
    >
      <CardContent className="w-full min-h-1/2 p-0 flex flex-col gap-3">
        <CardTitle className={cn("font-bold text-6xl", titleStyle)}>
          {title}
        </CardTitle>
        <CardDescription
          className={cn(
            "font-medium text-sm max-w-1/2 leading-relaxed",
            descriptionStyle
          )}
        >
          {description}
        </CardDescription>
        {button === true ? (
          <CardFooter className="w-full h-fit p-0 items-start">
            <Link href={link}>
              <Button
                asChild
                className={cn(
                  "px-6 py-1.5 rounded-full flex items-center",
                  buttonStyle
                )}
              >
                <p className="text-sm font-medium">lihat selengkapnya</p>
              </Button>
            </Link>
          </CardFooter>
        ) : (
          ""
        )}
      </CardContent>
    </Card>
  );
}
