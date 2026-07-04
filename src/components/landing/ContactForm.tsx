"use client";

import React, { useState } from "react";
import { Mail, Clock, CheckCircle } from "lucide-react";

/**
 * ContactForm Component
 * Renders contact details on the left and a contact form with a success state on the right.
 */
export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      // Simulate submission
      setIsSubmitted(true);
    }
  };

  return (
    <section id="contact" className="bg-glass-neutral py-20 px-6 lg:px-8 border-b border-glass-secondary/10 scroll-mt-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        {/* Left Column: Info */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <span className="font-mono text-[0.75rem] text-glass-tertiary tracking-wider uppercase mb-3 block">
              CONTACT
            </span>
            <h2 className="text-[2rem] md:text-[2.25rem] font-semibold tracking-[-0.02em] text-glass-primary">
              Ada pertanyaan?
            </h2>
          </div>
          
          <p className="text-[0.95rem] leading-[1.6] text-glass-secondary max-w-md">
            Tim kami siap membantu menjawab pertanyaan Anda terkait integrasi penggajian, pricing plan, atau kebutuhan kustomisasi instansi Anda.
          </p>

          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-glass-sm bg-glass-surface flex items-center justify-center text-glass-secondary border border-glass-secondary/10">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <span className="font-mono text-[0.7rem] text-glass-secondary block uppercase">EMAIL</span>
                <span className="text-sm font-semibold text-glass-primary">support@payflow.id</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-glass-sm bg-glass-surface flex items-center justify-center text-glass-secondary border border-glass-secondary/10">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <span className="font-mono text-[0.7rem] text-glass-secondary block uppercase">RESPONSE TIME</span>
                <span className="text-sm font-semibold text-glass-primary">Kurang dari 24 jam</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Form Panel */}
        <div className="lg:col-span-7">
          <div className="bg-glass-surface border border-glass-secondary/15 rounded-glass-lg p-6 md:p-8">
            {isSubmitted ? (
              /* Success State */
              <div className="text-center py-10 space-y-4">
                <div className="w-12 h-12 rounded-full bg-green-500/10 text-green-600 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-glass-primary">
                  Pesan Terkirim!
                </h3>
                <p className="text-sm text-glass-secondary max-w-sm mx-auto">
                  Terima kasih sudah menghubungi kami. Tim support kami akan segera menghubungi Anda kembali via email.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: "", email: "", company: "", message: "" });
                  }}
                  className="mt-4 text-xs font-mono font-semibold text-glass-tertiary hover:underline cursor-pointer"
                >
                  KIRIM PESAN BARU
                </button>
              </div>
            ) : (
              /* Active Form */
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="font-mono text-[0.72rem] text-glass-secondary block mb-1.5 uppercase">
                      Nama Lengkap *
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Budi Santoso"
                      className="w-full text-sm px-3.5 py-2.5 bg-glass-neutral/30 border border-glass-secondary/20 rounded-glass-md text-glass-primary placeholder-glass-secondary/40 focus:outline-none focus:border-glass-tertiary focus:bg-glass-surface transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="font-mono text-[0.72rem] text-glass-secondary block mb-1.5 uppercase">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="budi@company.com"
                      className="w-full text-sm px-3.5 py-2.5 bg-glass-neutral/30 border border-glass-secondary/20 rounded-glass-md text-glass-primary placeholder-glass-secondary/40 focus:outline-none focus:border-glass-tertiary focus:bg-glass-surface transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="company" className="font-mono text-[0.72rem] text-glass-secondary block mb-1.5 uppercase">
                    Nama Perusahaan / Yayasan
                  </label>
                  <input
                    type="text"
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Yayasan Kopi Nusantara"
                    className="w-full text-sm px-3.5 py-2.5 bg-glass-neutral/30 border border-glass-secondary/20 rounded-glass-md text-glass-primary placeholder-glass-secondary/40 focus:outline-none focus:border-glass-tertiary focus:bg-glass-surface transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="font-mono text-[0.72rem] text-glass-secondary block mb-1.5 uppercase">
                    Pesan *
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tuliskan pertanyaan Anda di sini..."
                    className="w-full text-sm px-3.5 py-2.5 bg-glass-neutral/30 border border-glass-secondary/20 rounded-glass-md text-glass-primary placeholder-glass-secondary/40 focus:outline-none focus:border-glass-tertiary focus:bg-glass-surface transition-all resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto text-[0.95rem] font-medium bg-glass-tertiary text-glass-surface px-6 py-2.5 rounded-glass-md hover:bg-glass-tertiary/95 transition-all text-center inline-flex items-center justify-center cursor-pointer"
                  >
                    Kirim Pesan
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
