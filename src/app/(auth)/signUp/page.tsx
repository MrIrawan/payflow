'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import PayFlowLogoWithTitle from "../../../../public/images/payflow_logo_with_title.svg";

import { UserPlus, Shield, Venus, Mars } from 'lucide-react';
import { InputGroup } from '@/components/InputGroup/input-group';
import { DatePicker } from '@/components/DatePicker/date-picker';
import { FormComponent, FormContent, FormFooter } from '@/components/Form/Form';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export default function RegisterPage() {
  const [selectedGender, setSelectedGender] = useState<"male" | "female" | null>(null);

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
              <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                Masuk di sini
              </Link>
            </p>
          </div>

          <FormComponent asWrapper={false} className='flex flex-col gap-8'>
            <FormContent className='flex flex-col gap-4'>
              {/* first name and last name */}
              <div className='flex flex-row justify-between items-start gap-3'>
                <InputGroup
                  type='text'
                  placeholder='Jhon'
                  label='First Name'
                  htmlFor='first_name'
                />
                <InputGroup
                  type='text'
                  placeholder='Doe'
                  label='Last Name'
                  htmlFor='last_name'
                />
              </div>
              {/* date of birth */}
              <DatePicker
                label='Date of Birth'
                htmlFor='date_of_birth'
                placeholder='Select date'
              />
              {/* gender radio options */}
              <div className='flex flex-col gap-2.5'>
                <Label htmlFor='gender'>Jenis Kelamin</Label>
                <div className='flex flex-row justify-between items-start gap-3'>
                  <Label className={`w-full ring-[1.5px] ${selectedGender === "male" ? "ring-blue-600 bg-blue-100" : "ring-border bg-white"} rounded-md h-[80px] flex flex-col gap-1.5 justify-center items-center`}>
                    <Input
                      type='radio'
                      id='gender'
                      name='gender'
                      value={"male"}
                      className='hidden'
                      checked={selectedGender === "male"}
                      onChange={(e) => setSelectedGender(e.target.value as "male")}
                    />
                    <Mars className={`${selectedGender === "male" ? "text-blue-600" : "text-muted-foreground"} size-7`} />
                    <p className={`${selectedGender === "male" ? "text-blue-600" : "text-muted-foreground"} text-sm font-medium`}>Laki-laki</p>
                  </Label>
                  <Label className={`w-full ring-[1.5px] ${selectedGender === "female" ? "ring-pink-600 bg-pink-100" : "ring-border bg-white"} rounded-md h-[80px] flex flex-col gap-1.5 justify-center items-center`}>
                    <Input
                      type='radio'
                      id='gender'
                      name='gender'
                      value={"female"}
                      className='hidden'
                      checked={selectedGender === "female"}
                      onChange={(e) => setSelectedGender(e.target.value as "female")}
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
              />
              {/* password email */}
              <InputGroup
                type='password'
                placeholder='********'
                label='Password EMail'
                htmlFor='password_email'
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