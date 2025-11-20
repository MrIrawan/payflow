"use client";

import Image from "next/image";
import SignUpIllustration from "../../../../public/images/sign_up_illustration.svg";
import PayflowLogo from "../../../../public/images/payflow-logo.svg";

import { useForm, SubmitHandler, Control } from "react-hook-form";
import { SignUpData } from "@/types/types";

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
import { RadioOptions } from "@/components/RadioOptions/radio-options";
import {
  FormComponent,
  FormContent,
  FormFooter,
  FormHeader,
} from "@/components/Form/Form";

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid, isLoading },
  } = useForm<SignUpData>();
  return (
    <>
      <FormComponent>
        <FormHeader logo>
          <CardTitle className="text-4xl font-bold leading-snug">
            because convenience doesn't come twice.
          </CardTitle>
          <CardDescription className="text-lg font-medium">
            create your account on PayFlow, please fill out with your data.
          </CardDescription>
        </FormHeader>
        <FormContent>
          <div className="flex flex-row items-center justify-between gap-3">
            <InputGroup
              label="First name"
              htmlFor="first_name"
              type="text"
              placeholder="ex: Jhon"
              requiredLabel
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
            requiredLabel
          />
          <RadioOptions label="Choose your gender" requiredLabel />
          <InputGroup
            label="Email address"
            htmlFor="email_address"
            type="email"
            placeholder="ex: jhondoe@mail.com"
            requiredLabel
          />
          <InputGroup
            label="Password email"
            htmlFor="password_email"
            type="password"
            placeholder="ex: ********"
            requiredLabel
          />
        </FormContent>
        <FormFooter>
          <Button
            size={"lg"}
            className="bg-linear-to-r/oklch from-blue-600 to-blue-900 w-full hover:brightness-90 focus-visible:ring-blue-100 focus-visible:border-blue-600 focus-visible:ring-[3px]"
          >
            <p className="text-base font-medium text-white">register account</p>
          </Button>
        </FormFooter>
      </FormComponent>
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
