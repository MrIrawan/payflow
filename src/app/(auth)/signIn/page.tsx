"use client";

import Image from "next/image";
import SignInIllustration from "../../../../public/images/sign_in_illustration.svg";

import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import {
  FormComponent,
  FormContent,
  FormFooter,
  FormHeader,
} from "@/components/Form/Form";
import { InputGroup } from "@/components/InputGroup/input-group";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export default function SignInPage() {
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
          <InputGroup
            label="Full name"
            htmlFor="full_name"
            type="text"
            placeholder="ex: Jhon Doe"
            requiredLabel
          />
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
            type="submit"
          >
            <p className="text-base font-medium text-white">Sign in account</p>
          </Button>
        </FormFooter>
      </FormComponent>
      <Card className="w-full h-full ring-0 border-0 shadow-none rounded-none">
        <Image
          src={SignInIllustration}
          alt="sign in illustration"
          className="w-full h-full object-contain"
        />
      </Card>
    </>
  );
}
