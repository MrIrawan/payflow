import { ProfileCardProps } from "@/types/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

export default function ProfileCard({
  variant = "sidebar",
  avatar,
  name,
  email,
}: ProfileCardProps) {
  return (
    <>
      {variant === "sidebar" && <SidebarProfileCard name={name} email={email} avatar={avatar} />}
      {variant === "medium" && <MediumProfileCard name={name} email={email} avatar={avatar} />}
      {variant === "large" && <LargeProfileCard name={name} email={email} avatar={avatar} />}
    </>
  );
}

function SidebarProfileCard({
    avatar,
    name,
    email,
} : ProfileCardProps) {
  return (
    <Card className="shadow-none h-72 justify-between p-5 bg-linear-0/oklch from-[#78B285] to-white to-50%">
        <CardHeader className="w-full gap-3 p-0">
            <div className="w-14 h-14 rounded-md ring ring-border overflow-hidden">
                <Avatar className="w-full h-full rounded-none">
                    <AvatarFallback className="font-semibold w-full h-full rounded-none text-xl">PF</AvatarFallback>
                    <AvatarImage src={avatar}/>
                </Avatar>
            </div>
            <div className="w-full flex flex-col gap-0.5">
                <CardTitle className="text-xl font-bold capitalize">{name}</CardTitle>
                <CardDescription className="text-base font-semibold">{email}</CardDescription>
            </div>
        </CardHeader>
        <CardFooter className="w-full p-0 flex-col justify-center gap-3">
            <Button className="w-full">see your profile</Button>
            <Button className="w-full">see all analytics</Button>
        </CardFooter>
    </Card>
  );
}

function MediumProfileCard({
    avatar,
    name,
    email
} : ProfileCardProps) {
  return <></>;
}

function LargeProfileCard({
    avatar,
    name,
    email
} : ProfileCardProps) {
  return <></>;
}
