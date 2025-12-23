"use client";

import { useState } from "react";

import Link from "next/link";
import Image from "next/image";
import SignUpIllustration from "../../../../public/images/sign_up_illustration.svg";

import { useForm, SubmitHandler, Control, Controller } from "react-hook-form";
import { SignUpRequest } from "@/types/request";

import { Card, CardTitle, CardDescription } from "@/components/ui/card";
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
import { Spinner } from "@/components/ui/spinner";
import { signUpUser } from "@/lib/service/signUpUser";

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid },
  } = useForm<SignUpRequest>();

  const onSubmitForm: SubmitHandler<SignUpRequest> = async (data) => {
    setIsLoading(true);
    if (isValid) {
      const response = signUpUser(data).finally(() => {
        setIsLoading(false)
        reset()
      }).then((result) => console.log(result));
    }
  };

  return (
    <>
      <FormComponent onSubmit={handleSubmit(onSubmitForm)}>
        <FormHeader logo logoTitle="PayFlow Sign Up">
          <CardTitle className="text-4xl font-bold leading-snug">
            because convenience doesn't come twice.
          </CardTitle>
          <CardDescription className="text-lg font-medium">
            create your account on PayFlow, please fill out with your data.
          </CardDescription>
        </FormHeader>
        <FormContent>
          <div className="flex flex-row items-start justify-between gap-3">
            <InputGroup
              label="First name"
              htmlFor="first_name"
              type="text"
              placeholder="ex: Jhon"
              aria-invalid={errors.first_name ? true : false}
              errorMsg={errors.first_name?.message}
              requiredLabel
              {...register("first_name", {
                required: { value: true, message: "first name is required" },
                minLength: {
                  value: 3,
                  message: "first name at least 3 length",
                },
              })}
            />
            <InputGroup
              label="Last name"
              htmlFor="last_name"
              type="text"
              placeholder="ex: Doe"
              aria-invalid={errors.last_name ? true : false}
              errorMsg={errors.last_name?.message}
              {...register("last_name", {
                minLength: { value: 3, message: "last name at least 3 length" },
              })}
            />
          </div>
          <Controller
            control={control}
            name="date_of_birth"
            render={({ field: { onChange, value } }) => (
              <DatePicker
                label="Date of birth"
                htmlFor="date_of_birth"
                placeholder="Select your date of birth"
                aria-invalid={errors ? true : false}
                requiredLabel
                onchange={onChange}
                value={value}
              />
            )}
          />
          <Controller
            control={control}
            name="gender"
            render={({ field: { onChange, value } }) => (
              <RadioOptions
                label="Choose your gender"
                requiredLabel
                value={value}
                onvaluechange={onChange}
              />
            )}
          />
          <InputGroup
            label="Email address"
            htmlFor="email_address"
            type="email"
            placeholder="ex: jhondoe@mail.com"
            aria-invalid={errors.email_address ? true : false}
            errorMsg={errors.email_address?.message}
            requiredLabel
            {...register("email_address", {
              required: { value: true, message: "email address is required" },
              minLength: {
                value: 3,
                message: "email address at least 3 length",
              },
            })}
          />
          <InputGroup
            label="Password email"
            htmlFor="password_email"
            type="password"
            placeholder="ex: ********"
            aria-invalid={errors.password_email ? true : false}
            errorMsg={errors.password_email?.message}
            requiredLabel
            {...register("password_email", {
              required: { value: true, message: "password email is required" },
              minLength: {
                value: 3,
                message: "password email at least 8 length",
              },
            })}
          />
        </FormContent>
        <FormFooter>
          <Button
            size={"lg"}
            className="bg-linear-to-r/oklch from-blue-600 to-blue-900 w-full hover:brightness-90 focus-visible:ring-blue-100 focus-visible:border-blue-600 focus-visible:ring-[3px] disabled:brightness-90 disabled:opacity-100"
            disabled={isLoading ? true : false}
          >
            {isLoading ? (
              <Spinner />
            ) : (
              <p className="text-base font-medium text-white">
                register account
              </p>
            )}
          </Button>
        </FormFooter>
        <div className="w-full">
          <p className="text-sm font-normal text-black text-center">
            Already have an account?{" "}
            <Link href={"/signIn"} className="text-blue-600 hover:underline">
              Sign in here.
            </Link>
          </p>
        </div>
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
