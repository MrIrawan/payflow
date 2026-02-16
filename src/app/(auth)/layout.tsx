"use client";

import React from "react";
import Image from "next/image";

import { usePathname } from "next/navigation";

import PayFlowLogoWithTitle from "../../../public/images/payflow_logo_with_title.svg";
import { LogIn, Shield, UserPlus } from "lucide-react";

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const path = usePathname();

  console.log(path)
  return (
    <>
      {path === "/signUp" ? (
        <RegisterBranding>
          {children}
        </RegisterBranding>
      ) : (
        <LoginBranding>
          {children}
        </LoginBranding>
      )}
    </>
  );
}

function RegisterBranding({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
        <div className="hidden lg:flex lg:flex-col lg:gap-4">
          <div className="flex items-center gap-3">
            <Image
              src={PayFlowLogoWithTitle}
              alt="PayFlow Logo"
              className="w-56"
            />
            {/* <span className="text-3xl font-bold text-blue-600">PayFlow</span> */}
          </div>

          <div className="flex flex-col gap-1">
            <h1 className="text-4xl font-bold text-gray-900 leading-tight">
              Mulai Perjalanan
              <br />
              <span className="text-blue-600">Anda Bersama Kami</span>
            </h1>
            <p className="text-lg text-gray-600">
              Daftar sekarang dan rasakan kemudahan mengelola penggajian sekolah
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-blue-100 shadow-sm">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Data Aman</p>
                <p className="text-sm text-gray-600">Keamanan data terjamin dengan enkripsi tingkat tinggi</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-blue-100 shadow-sm">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <UserPlus className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Mudah Digunakan</p>
                <p className="text-sm text-gray-600">Interface intuitif yang mudah dipahami</p>
              </div>
            </div>
          </div>
        </div>
        {/* main register form */}
        {children}
      </div>
    </div>
  )
}

function LoginBranding({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex lg:flex-col lg:gap-4">
          <div className="flex items-center gap-3">
            <Image
              src={PayFlowLogoWithTitle}
              alt="PayFlow Logo"
              className="w-56"
            />
            {/* <span className="text-3xl font-bold text-blue-600">PayFlow</span> */}
          </div>

          <div className="flex flex-col gap-1">
            <h1 className="text-4xl font-bold text-gray-900 leading-tight">
              Selamat Datang
              <br />
              <span className="text-blue-600">Kembali</span>
            </h1>
            <p className="text-lg text-gray-600">
              Masuk ke akun Anda untuk mengelola penggajian dengan mudah
            </p>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-3xl blur-2xl opacity-20"></div>
            <div className="relative bg-white rounded-2xl p-8 border border-blue-100 shadow-xl">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <LogIn className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Akses Cepat</p>
                    <p className="text-sm text-gray-600">Login dalam hitungan detik</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* main login form */}
        {children}
      </div>
    </div>
  )
}