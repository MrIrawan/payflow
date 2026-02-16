"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

import PayFLowLogo from "../../public/images/payflow-logo.svg";
import PayFLowLogoWithTitle from "../../public/images/payflow_logo_with_title.svg";

import { ArrowRight, Clock, Shield, TrendingUp, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-blue-100 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3">
              <Image
                src={PayFLowLogoWithTitle}
                alt="PayFlow Logo"
                width={100}
                height={100}
                className="w-36 h-36"
              />
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="/signIn"
              >
                <Button className="w-fit h-fit px-6 py-2.5 text-blue-600 hover:text-blue-700 font-medium transition-colors bg-transparent hover:bg-gray-100">Masuk</Button>
              </Link>
              <Link
                href="/signUp"
              >
                <Button className="w-fit h-fit px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all hover:shadow-lg hover:shadow-blue-600/30">Daftar Sekarang</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 lg:px-8 h-screen flex flex-row justify-center items-center">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-block">
                <span className="px-4 py-1.5 bg-blue-100 text-blue-600 rounded-full text-sm font-medium flex flex-row gap-3 items-center">
                  Sistem Penggajian Sekolah
                  <span className="flex flex-row justify-center items-center bg-red-200">
                    <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping absolute"></span>
                    <span className="w-2 h-2 rounded-full bg-blue-600 absolute opacity-70"></span>
                  </span>
                </span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Kelola Penggajian
                <span className="text-blue-600"> Lebih Mudah</span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed">
                PayFlow adalah solusi penggajian modern untuk yayasan pendidikan.
                Kelola absensi, hitung gaji, dan buat laporan dengan mudah dan efisien.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/register"
                >
                  <Button className="w-fit h-fit group px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all hover:shadow-xl hover:shadow-blue-600/30 flex items-center gap-2 font-medium">
                    Mulai Sekarang
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link
                  href="/login"
                  className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
                >
                  Masuk ke Akun
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-3xl blur-3xl opacity-20"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-blue-100">
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                    <div>
                      <p className="text-sm text-gray-600">Total Gaji Bulan Ini</p>
                      <p className="text-2xl font-bold text-blue-600">Rp 5.500.000</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-blue-600" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <p className="text-sm text-gray-600">Hari Kerja</p>
                      <p className="text-xl font-bold text-gray-900">22 Hari</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <p className="text-sm text-gray-600">Slip Gaji</p>
                      <p className="text-xl font-bold text-gray-900">12 Slip</p>
                    </div>
                  </div>

                  <div className="h-32 bg-gradient-to-r from-blue-100 to-blue-50 rounded-xl flex items-end p-4 gap-2">
                    <div className="w-1/5 bg-blue-600 rounded-t" style={{ height: '60%' }}></div>
                    <div className="w-1/5 bg-blue-600 rounded-t" style={{ height: '80%' }}></div>
                    <div className="w-1/5 bg-blue-600 rounded-t" style={{ height: '90%' }}></div>
                    <div className="w-1/5 bg-blue-600 rounded-t" style={{ height: '70%' }}></div>
                    <div className="w-1/5 bg-blue-600 rounded-t" style={{ height: '100%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Fitur Unggulan PayFlow
            </h2>
            <p className="text-xl text-gray-600">
              Semua yang Anda butuhkan untuk mengelola penggajian sekolah
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group p-6 rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Users className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Manajemen Guru
              </h3>
              <p className="text-gray-600">
                Kelola data guru dan karyawan dengan mudah dalam satu platform
              </p>
            </div>

            <div className="group p-6 rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Clock className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Absensi Real-time
              </h3>
              <p className="text-gray-600">
                Catat kehadiran secara otomatis dengan sistem yang akurat
              </p>
            </div>

            <div className="group p-6 rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Hitung Gaji Otomatis
              </h3>
              <p className="text-gray-600">
                Perhitungan gaji otomatis berdasarkan hari kerja dan absensi
              </p>
            </div>

            <div className="group p-6 rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Shield className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Laporan Lengkap
              </h3>
              <p className="text-gray-600">
                Buat dan cetak laporan penggajian dengan format profesional
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-12 text-center shadow-2xl">
            <h2 className="text-4xl font-bold text-white mb-4">
              Siap Memulai dengan PayFlow?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Bergabunglah dengan sekolah lain yang sudah menggunakan PayFlow untuk mengelola penggajian mereka
            </p>
            <Link
              href="/signUp"
            >
              <Button className="w-fit h-fit inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-lg hover:shadow-xl transition-all font-medium hover:bg-white">
                Daftar Gratis Sekarang
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Image
              src={PayFLowLogo}
              alt="PayFlow Logo"
              width={40}
              height={40}
              className="w-10 h-10"
            />
            <span className="text-2xl font-bold">PayFlow</span>
          </div>
          <p className="text-gray-400">
            © 2026 PayFlow. Sistem Penggajian untuk Yayasan Pendidikan.
          </p>
        </div>
      </footer>
    </div>
  );
}
