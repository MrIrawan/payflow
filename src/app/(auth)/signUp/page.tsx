'use client';

import React, { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { SignUpRequest } from '@/types/request';
import { signUpEmployee } from '@/lib/services/signUpEmployee';

import Link from 'next/link';
import Image from 'next/image';

import { Venus, Mars } from 'lucide-react';
import { InputGroup } from '@/components/InputGroup/input-group';
import { DatePicker } from '@/components/DatePicker/date-picker';
import { FormComponent, FormContent, FormFooter } from '@/components/Form/Form';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export default function RegisterPage() {
  const { register, handleSubmit, control, formState: { errors }, watch } = useForm<SignUpRequest>();
  const selectedGender = watch("gender");

  const onSubmit: SubmitHandler<SignUpRequest> = async (data) => {
    console.log(data);
  }

  return (
    <>
      {/* Right Side - Registration Form */}
      <div className="w-full">
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 flex flex-col gap-3">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <Image
              src="/payflow-logo.svg"
              alt="PayFlow Logo"
              width={50}
              height={50}
              className="w-12 h-12"
            />
            <span className="text-2xl font-bold text-blue-600">PayFlow</span>
          </div>

          <div className="flex flex-col gap-1">
            <h2 className="text-3xl font-bold text-gray-900">Buat Akun Baru</h2>
            <p className="text-gray-600">
              Sudah punya akun?{' '}
              <Link href="/signIn" className="text-blue-600 hover:text-blue-700 font-medium">
                Masuk di sini
              </Link>
            </p>
          </div>

          <FormComponent asWrapper={false} className='flex flex-col gap-8' onSubmit={handleSubmit(onSubmit)}>
            <FormContent className='flex flex-col gap-4'>
              {/* first name and last name */}
              <div className='flex flex-row justify-between items-start gap-3'>
                <InputGroup
                  type='text'
                  placeholder='Jhon'
                  label='First Name'
                  htmlFor='first_name'
                  aria-invalid={errors.first_name ? "true" : "false"}
                  errorMsg={errors.first_name?.message}
                  {...register("first_name", {
                    required: {
                      value: true, message: "nama depan wajib di isi."
                    }, minLength: {
                      value: 3, message: "panjang nama depan minimal 3 huruf."
                    }
                  })}
                />
                <InputGroup
                  type='text'
                  placeholder='Doe'
                  label='Last Name'
                  htmlFor='last_name'
                  aria-invalid={errors.last_name ? "true" : "false"}
                  errorMsg={errors.last_name?.message}
                  {...register("last_name", {
                    minLength: {
                      value: 3,
                      message: "panjang nama belakang minimal 3 huruf."
                    }
                  })}
                />
              </div>
              {/* date of birth */}
              <Controller
                control={control}
                name='date_of_birth'
                render={({ field }) => (
                  <DatePicker
                    label='Date of Birth'
                    htmlFor='date_of_birth'
                    placeholder='Select date'
                    value={field.value}
                    onChange={field.onChange}
                    requiredLabel
                  />
                )}
              />
              {/* gender radio options */}
              <div className='flex flex-col gap-2.5'>
                <Label htmlFor='gender'>Jenis Kelamin</Label>
                <div className='flex flex-row justify-between items-start gap-3'>
                  <Label className={`w-full ring-[1.5px] ${selectedGender === "male" ? "ring-blue-600 bg-blue-100" : "ring-border bg-white"} rounded-md h-[80px] flex flex-col gap-1.5 justify-center items-center`}>
                    <Input
                      type='radio'
                      id='gender'
                      value={"male"}
                      className='hidden'
                      {...register("gender", {
                        required: {
                          value: true,
                          message: "jenis kelamin wajib di isi."
                        }
                      })}
                    />
                    <Mars className={`${selectedGender === "male" ? "text-blue-600" : "text-muted-foreground"} size-7`} />
                    <p className={`${selectedGender === "male" ? "text-blue-600" : "text-muted-foreground"} text-sm font-medium`}>Laki-laki</p>
                  </Label>
                  <Label className={`w-full ring-[1.5px] ${selectedGender === "female" ? "ring-pink-600 bg-pink-100" : "ring-border bg-white"} rounded-md h-[80px] flex flex-col gap-1.5 justify-center items-center`}>
                    <Input
                      type='radio'
                      id='gender'
                      value={"female"}
                      className='hidden'
                      {...register("gender", {
                        required: {
                          value: true,
                          message: "jenis kelamin wajib di isi."
                        }
                      })}
                    />
                    <Venus className={`${selectedGender === "female" ? "text-pink-600" : "text-muted-foreground"} size-7`} />
                    <p className={`text-sm font-medium ${selectedGender === "female" ? "text-pink-600" : "text-muted-foreground"}`}>Perempuan</p>
                  </Label>
                </div>
              </div>
              {/* email address */}
              <InputGroup
                type='email'
                placeholder='jhondoe@mail.com'
                label='Email Address'
                htmlFor='email_address'
                aria-invalid={errors.email_address ? "true" : "false"}
                errorMsg={errors.email_address?.message}
                {...register("email_address", {
                  required: {
                    value: true,
                    message: "alamat email wajib di isi."
                  }
                })}
              />
              {/* password email */}
              <InputGroup
                type='password'
                placeholder='********'
                label='Password Email'
                htmlFor='password_email'
                aria-invalid={errors.password_email ? "true" : "false"}
                errorMsg={errors.password_email?.message}
                {...register("password_email", {
                  required: {
                    value: true,
                    message: "password email wajib di isi."
                  },
                  minLength: {
                    value: 5,
                    message: "panjang password email minimal 5 huruf."
                  }
                })}
              />
            </FormContent>
            <FormFooter>
              <Button className='w-full bg-blue-600 hover:bg-blue-800'>SignUp to PayFlow</Button>
            </FormFooter>
          </FormComponent>

          {/* Terms */}
          <p className="mt-6 text-sm text-gray-600 text-center">
            Dengan mendaftar, Anda menyetujui{' '}
            <Link href="/terms" className="text-blue-600 hover:text-blue-700">
              Syarat & Ketentuan
            </Link>{' '}
            serta{' '}
            <Link href="/privacy" className="text-blue-600 hover:text-blue-700">
              Kebijakan Privasi
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}