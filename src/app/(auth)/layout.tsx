import React from "react";
import Image from "next/image";

import PayFlowLogoWithTitle from "../../../public/images/payflow_logo_with_title.svg";
import { Shield, UserPlus } from "lucide-react";

export default async function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <RegisterBranding>
        {children}
      </RegisterBranding>
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