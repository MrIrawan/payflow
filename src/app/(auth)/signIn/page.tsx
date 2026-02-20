'use client';

import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';

import { SignInRequest } from '@/types/request';
import { signInEmployee } from '@/lib/services/employee/auth/signInEmployee';

import Link from 'next/link';
import Image from 'next/image';

import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { FormComponent, FormContent, FormFooter } from '@/components/Form/Form';
import { InputGroup } from '@/components/InputGroup/input-group';
import { Spinner } from '@/components/ui/spinner';
import { toast } from 'sonner';
import { Toaster } from '@/components/Toaster/toaster';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<SignInRequest>();
  const router = useRouter();

  const onSubmit: SubmitHandler<SignInRequest> = async (data) => {
    setIsLoading(true);

    try {
      const response = await signInEmployee(data);

      if (response.data.data.success === false) {
        toast.custom(() => <Toaster variant='error' title='tidak bisa melakukan proses masuk' description={`${response.data.data.message || "kami tidak bisa memproses masuk ke akun anda."}`} />)
        return;
      }

      toast.custom(() => <Toaster variant='success' title='selamat! anda berhasil masuk.' description='selamat datang kembali! lihat apa yang terjadi pada penggajian anda.' />)
      router.push("/employee");
    } catch (error) {
      toast.custom(() => <Toaster variant='error' title='kami tidak bisa memproses' description={`${error || "terjadi suatu error sehingga kami tidak bisa memproses."}`} />)
    } finally {
      setIsLoading(false);
      reset();
    }
  }

  return (
    <>
      {/* Right Side - Login Form */}
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
            <h2 className="text-3xl font-bold text-gray-900">Masuk ke Akun</h2>
            <p className="text-gray-600">
              Belum punya akun?{' '}
              <Link href="/signUp" className="text-blue-600 hover:text-blue-700 font-medium">
                Daftar di sini
              </Link>
            </p>
          </div>
          {/* form component here */}
          <FormComponent asWrapper={false} className='flex flex-col gap-8' onSubmit={handleSubmit(onSubmit)}>
            <FormContent className='flex flex-col gap-4'>
              <InputGroup
                type='text'
                label='Full Name'
                htmlFor='full_name'
                placeholder='Jhon Doe'
                aria-invalid={errors.username ? "true" : "false"}
                errorMsg={errors.username?.message}
                {...register("username", {
                  minLength: {
                    value: 3,
                    message: "panjang nama lengkap minimal 3 huruf."
                  }
                })}
              />
              <InputGroup
                type='email'
                label='Email Address'
                htmlFor='email_address'
                placeholder='jhondoe@mail.com'
                requiredLabel
                aria-invalid={errors.email_address ? "true" : "false"}
                errorMsg={errors.email_address?.message}
                {...register("email_address", {
                  required: {
                    value: true,
                    message: "alamat email wajib di isi."
                  }
                })}
              />
              <InputGroup
                type='password'
                label='Password Email'
                htmlFor='password_email'
                placeholder='********'
                requiredLabel
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
              <Button className='w-full bg-blue-600 hover:bg-blue-800'>
                {isLoading ? (<Spinner />) : (<p className='text-sm font-medium text-white'>SignIn to PayFlow</p>)}
              </Button>
            </FormFooter>
          </FormComponent>
          {/* Divider */}
          <div className='w-full flex flex-row items-center justify-center gap-3 overflow-hidden'>
            <Separator className='w-fit' />
            <p className='text-muted-foreground font-medium'>Atau</p>
            <Separator className='w-fit' />
          </div>

          {/* Back to Home */}
          <Link href={"/"}>
            <Button className='w-full ring ring-border bg-white hover:bg-muted'>
              <p className='text-base font-medium text-muted-foreground'>Kembali ke beranda</p>
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}