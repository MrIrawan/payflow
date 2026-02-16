'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { FormComponent, FormContent, FormFooter } from '@/components/Form/Form';
import { InputGroup } from '@/components/InputGroup/input-group';

export default function LoginPage() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Form submitted');
  };

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
          <FormComponent asWrapper={false} className='flex flex-col gap-8'>
            <FormContent className='flex flex-col gap-4'>
              <InputGroup
                type='text'
                label='Full Name'
                htmlFor='full_name'
                placeholder='Jhon Doe'
              />
              <InputGroup
                type='email'
                label='Email Address'
                htmlFor='email_address'
                placeholder='jhondoe@mail.com'
                requiredLabel
              />
              <InputGroup
                type='password'
                label='Password Email'
                htmlFor='password_email'
                placeholder='********'
                requiredLabel
              />
            </FormContent>
            <FormFooter>
              <Button className='w-full bg-blue-600 hover:bg-blue-800'>
                <p className='text-sm font-medium text-white'>SignIn to PayFlow</p>
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