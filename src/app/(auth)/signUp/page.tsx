"use client";

import Image from "next/image";
import SignUpIllustration from "../../../../public/images/sign_up_illustration.svg";
import PayflowLogo from "../../../../public/images/payflow-logo.svg";

import {
  Card,
  CardHeader,
  CardFooter,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { InputGroup } from "@/components/InputGroup/input-group";
import { DatePicker } from "@/components/DatePicker/date-picker";

export default function SignUpPage() {
  return (
    <>
      <form className="w-full h-full rounded-none shadow-none flex flex-row justify-center items-center">
        <div className="w-full max-w-4/5 flex flex-col gap-6">
          <CardHeader>
            <div className="w-fit flex flex-row gap-1">
              <Image
                src={PayflowLogo}
                alt="payflow logo image"
                width={35}
                height={35}
              />
              <h3 className="text-lg font-semibold">payflow sign up</h3>
            </div>
            <CardTitle className="text-4xl font-bold leading-snug">
              because convenience doesn't come twice.
            </CardTitle>
            <CardDescription className="text-lg font-medium">
              create your account on PayFlow, please fill out with your data.
            </CardDescription>
          </CardHeader>
          <CardContent className="w-full bg-white p-0 flex flex-col gap-6">
            <div className="flex flex-row items-center justify-between gap-3">
              <InputGroup
                label="First name"
                htmlFor="first_name"
                type="text"
                placeholder="ex: Jhon"
              />
              <InputGroup
                label="Last name"
                htmlFor="last_name"
                type="text"
                placeholder="ex: Doe"
              />
            </div>
            <DatePicker
              label="Date of birth"
              htmlFor="date_of_birth"
              placeholder="Select your date of birth"
            />
            <InputGroup
              label="Email address"
              htmlFor="email_address"
              type="email"
              placeholder="ex: jhondoe@mail.com"
            />
            <InputGroup
              label="Password email"
              htmlFor="password_email"
              type="password"
              placeholder="ex: ********"
            />
          </CardContent>
          <CardFooter className="p-0 w-full">
            <Button
              size={"lg"}
              className="bg-linear-to-r/oklch from-blue-600 to-blue-900 w-full hover:brightness-90"
            >
              <p className="text-base font-medium text-white">
                register account
              </p>
            </Button>
          </CardFooter>
        </div>
      </form>
      <Card className="w-full h-full ring-0 border-0 shadow-none rounded-none">
        <Image
          src={SignUpIllustration}
          alt="sign_up_illustration"
          className="w-full h-full object-contain"
        />
      </Card>
    </>
  );
}
