"use client";

import { useState } from "react";

import Image from "next/image";
import SignInIllustration from "../../../../public/images/sign_in_illustration.svg";

import { useForm, SubmitHandler } from "react-hook-form";
import { SignInRequest } from "@/types/request";

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
import Link from "next/link";

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<SignInRequest>();

  const onSubmitForm: SubmitHandler<SignInRequest> = async (data) => {
    setIsLoading(true);
    if (isValid) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );

        if (!response.ok)
          throw new Error("failed to sign in, something went wrong");

        console.log(await response.json());
      } catch (err) {
        console.error(err);
        throw err;
      } finally {
        setIsLoading(false);
      }

      reset();
    }
  };
  return (
    <>
      <FormComponent onSubmit={handleSubmit(onSubmitForm)}>
        <FormHeader logo logoTitle="PayFlow Sign In">
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
            htmlFor="username"
            type="text"
            placeholder="ex: Jhon Doe"
            {...register("username", {
              minLength: { value: 3, message: "username at least 3 length" },
            })}
            aria-invalid={errors.username ? true : false}
            errorMsg={errors.username?.message}
          />
          <InputGroup
            label="Email address"
            htmlFor="email_address"
            type="email"
            placeholder="ex: jhondoe@mail.com"
            requiredLabel
            {...register("email_address", {
              required: { value: true, message: "email address is required" },
              minLength: {
                value: 3,
                message: "email address at least 3 length",
              },
            })}
            aria-invalid={errors.email_address ? true : false}
            errorMsg={errors.email_address?.message}
          />
          <InputGroup
            label="Password email"
            htmlFor="password_email"
            type="password"
            placeholder="ex: ********"
            requiredLabel
            {...register("password_email", {
              required: { value: true, message: "password email is required" },
              minLength: {
                value: 8,
                message: "password email at least 8 length",
              },
            })}
            aria-invalid={errors.password_email ? true : false}
            errorMsg={errors.password_email?.message}
          />
        </FormContent>
        <FormFooter>
          <Button
            size={"lg"}
            className="bg-linear-to-r/oklch from-blue-600 to-blue-900 w-full hover:brightness-90 focus-visible:ring-blue-100 focus-visible:border-blue-600 focus-visible:ring-[3px] disabled:brightness-90 disabled:opacity-100"
            type="submit"
          >
            {isLoading ? (
              <Spinner />
            ) : (
              <p className="text-base font-medium text-white">
                Sign in account
              </p>
            )}
          </Button>
        </FormFooter>
        <div className="w-full">
          <p className="text-sm font-normal text-black text-center">
            Don't have an account yet?{" "}
            <Link href={"/signUp"} className="text-blue-600 hover:underline">
              Sign Up here.
            </Link>
          </p>
        </div>
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
