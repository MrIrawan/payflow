"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

/**
 * Footer Component
 * Renders logo description, social links, navigation menu links,
 * and copyright information.
 */
export default function Footer() {
  return (
    <footer className="bg-glass-surface border-t border-glass-secondary/15 pt-16 pb-12 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Logo & Intro */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <Link href="#" className="flex items-center gap-2">
              <Image
                src="/images/payflow-logo.svg"
                alt="PayFlow Logo"
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <span className="text-lg font-semibold text-glass-primary tracking-tight">
                PayFlow<span className="text-glass-tertiary">.</span>
              </span>
            </Link>
            <p className="text-[0.88rem] leading-[1.5] text-glass-secondary max-w-[200px]">
              Sistem penggajian modern untuk yayasan pendidikan dan bisnis lokal di Indonesia.
            </p>
          </div>

          {/* Product Links */}
          <div className="space-y-4">
            <h4 className="font-mono text-[0.72rem] text-glass-primary tracking-wider uppercase font-semibold">
              PRODUCT
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#features" className="text-sm text-glass-secondary hover:text-glass-primary transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#solutions" className="text-sm text-glass-secondary hover:text-glass-primary transition-colors">
                  Solutions
                </a>
              </li>
              <li>
                <a href="#solutions" className="text-sm text-glass-secondary hover:text-glass-primary transition-colors">
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h4 className="font-mono text-[0.72rem] text-glass-primary tracking-wider uppercase font-semibold">
              COMPANY
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#about" className="text-sm text-glass-secondary hover:text-glass-primary transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <span className="text-sm text-glass-secondary/50 select-none">
                  Blog <span className="text-[0.6rem] font-mono border border-glass-secondary/20 px-1 py-0.5 rounded-glass-sm ml-1">SOON</span>
                </span>
              </li>
              <li>
                <span className="text-sm text-glass-secondary/50 select-none">
                  Careers
                </span>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="space-y-4">
            <h4 className="font-mono text-[0.72rem] text-glass-primary tracking-wider uppercase font-semibold">
              LEGAL
            </h4>
            <ul className="space-y-2.5">
              <li>
                <span className="text-sm text-glass-secondary/60 hover:text-glass-primary transition-colors cursor-pointer">
                  Privacy Policy
                </span>
              </li>
              <li>
                <span className="text-sm text-glass-secondary/60 hover:text-glass-primary transition-colors cursor-pointer">
                  Terms of Service
                </span>
              </li>
              <li>
                <span className="text-sm text-glass-secondary/60 hover:text-glass-primary transition-colors cursor-pointer">
                  Cookie Policy
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright bar */}
        <div className="border-t border-glass-secondary/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-mono text-[0.72rem] text-glass-secondary">
            &copy; 2026 PayFlow. Made with &hearts; in Indonesia.
          </span>
          <div className="flex gap-6 font-mono text-[0.72rem] text-glass-secondary/60">
            <span>v0.1.0-alpha</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
