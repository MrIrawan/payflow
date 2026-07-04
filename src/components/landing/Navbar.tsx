"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Navbar Component for PayFlow Landing Page
 * Features responsive mobile drawer and scroll-aware styling.
 */
export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-200 border-b",
        isScrolled
          ? "bg-glass-neutral/95 backdrop-blur-md border-glass-secondary/15 py-4"
          : "bg-glass-neutral border-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="#" className="flex items-center gap-2">
            <Image
              src="/images/payflow-logo.svg"
              alt="PayFlow Logo"
              width={28}
              height={28}
              className="w-7 h-7"
            />
            <span className="text-xl font-semibold text-glass-primary tracking-tight">
              PayFlow<span className="text-glass-tertiary">.</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#about"
              className="text-[0.95rem] text-glass-secondary hover:text-glass-primary transition-colors"
            >
              About
            </a>
            <a
              href="#features"
              className="text-[0.95rem] text-glass-secondary hover:text-glass-primary transition-colors"
            >
              Features
            </a>
            <a
              href="#solutions"
              className="text-[0.95rem] text-glass-secondary hover:text-glass-primary transition-colors"
            >
              Solutions
            </a>
            <a
              href="#contact"
              className="text-[0.95rem] text-glass-secondary hover:text-glass-primary transition-colors"
            >
              Contact
            </a>
          </div>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/signIn"
              className="text-[0.95rem] font-medium text-glass-secondary hover:text-glass-primary px-4 py-2 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/signUp"
              className={cn(
                "text-[0.95rem] font-medium px-5 py-2.5 rounded-glass-md transition-all",
                isScrolled
                  ? "bg-glass-tertiary text-glass-surface hover:bg-glass-tertiary/90"
                  : "bg-transparent border border-glass-secondary text-glass-primary hover:bg-glass-primary hover:text-glass-surface"
              )}
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-glass-secondary hover:text-glass-primary focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={cn(
          "fixed inset-0 top-[65px] z-40 bg-glass-neutral border-t border-glass-secondary/10 px-6 py-6 transition-all duration-300 md:hidden flex flex-col justify-between",
          isMobileMenuOpen
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0 pointer-events-none"
        )}
      >
        <div className="flex flex-col gap-6">
          <a
            href="#about"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-lg text-glass-secondary hover:text-glass-primary border-b border-glass-secondary/5 pb-2"
          >
            About
          </a>
          <a
            href="#features"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-lg text-glass-secondary hover:text-glass-primary border-b border-glass-secondary/5 pb-2"
          >
            Features
          </a>
          <a
            href="#solutions"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-lg text-glass-secondary hover:text-glass-primary border-b border-glass-secondary/5 pb-2"
          >
            Solutions
          </a>
          <a
            href="#contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-lg text-glass-secondary hover:text-glass-primary border-b border-glass-secondary/5 pb-2"
          >
            Contact
          </a>
        </div>

        <div className="flex flex-col gap-3 pb-8">
          <Link
            href="/signIn"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-center font-medium text-glass-secondary hover:text-glass-primary py-3 border border-glass-secondary/30 rounded-glass-md transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/signUp"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-center font-medium bg-glass-tertiary text-glass-surface py-3 rounded-glass-md transition-colors"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
