'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { CalendarCheck, GraduationCap, Phone, Mail, ArrowRight } from 'lucide-react'

const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
  >
    {children}
  </motion.div>
)

export default function BookConsultationPage() {
  return (
    <div className="min-h-screen bg-white text-[#0A4D68] font-sans">

      {/* HERO */}
      <section className="pt-28 pb-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#86C232]/5 -skew-x-12 translate-x-1/3" />
        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <FadeIn>
            <span className="inline-block px-4 py-1 mb-6 rounded-full bg-[#86C232]/10 text-[#86C232] text-xs font-bold uppercase tracking-widest">
              Free 1-on-1 Session
            </span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">
              Book Your <span className="text-[#86C232]">Career Consultation</span>
            </h1>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">
              Speak directly with Careergize experts for college admissions, internships,
              and long-term career strategy.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* WHY THIS CALL */}
      <section className="py-20 px-6 bg-slate-50 border-y border-slate-100">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            {
              icon: GraduationCap,
              title: 'Personalized Guidance',
              desc: 'Tailored advice based on your academic profile, interests, and goals.',
            },
            {
              icon: CalendarCheck,
              title: 'Clear Roadmap',
              desc: 'Know exactly which exams, colleges, and timelines matter for you.',
            },
            {
              icon: Phone,
              title: 'Direct Expert Call',
              desc: 'No juniors, no scripts. Talk to real counselors with real experience.',
            },
          ].map((item, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="bg-white p-8 rounded-2xl border border-slate-200 hover:shadow-xl transition-all">
                <div className="w-12 h-12 bg-[#86C232]/10 rounded-xl flex items-center justify-center mb-6">
                  <item.icon className="text-[#86C232]" />
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* CONSULTATION FORM */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-10 md:p-14 shadow-xl">
              <h2 className="text-3xl font-bold mb-8 text-center tracking-tight">
                Tell Us About Yourself
              </h2>

              <form className="grid gap-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    placeholder="Student Name"
                    className="w-full px-5 h-14 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#86C232]"
                  />
                  <input
                    type="tel"
                    placeholder="Mobile Number"
                    className="w-full px-5 h-14 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#86C232]"
                  />
                </div>

                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-5 h-14 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#86C232]"
                />

                <select className="w-full px-5 h-14 rounded-xl border border-slate-200 text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#86C232]">
                  <option>Interested In</option>
                  <option>College Admission</option>
                  <option>Internship (2026)</option>
                  <option>Career Counseling</option>
                  <option>Multiple Services</option>
                </select>

                <textarea
                  rows={4}
                  placeholder="Briefly describe your goals or concerns"
                  className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#86C232]"
                />

                <Button
                  size="lg"
                  className="mt-4 bg-[#0A4D68] hover:bg-[#0A4D68]/90 text-white h-16 rounded-xl font-black text-lg flex items-center justify-center gap-2"
                >
                  Book Free Consultation <ArrowRight />
                </Button>

                <p className="text-[11px] text-center text-slate-400 uppercase tracking-widest">
                  We respect your privacy. No spam. No sales pressure.
                </p>
              </form>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="pb-20 text-center">
        <FadeIn>
          <p className="text-sm text-slate-400 mb-4">
            Prefer to talk directly?
          </p>
          <div className="flex justify-center gap-6 text-sm font-bold">
            <a href="tel:+916282744675" className="flex items-center gap-2 text-[#86C232]">
              <Phone size={16} /> Call Now
            </a>
            <a href="mailto:info@careergize.com" className="flex items-center gap-2 text-[#86C232]">
              <Mail size={16} /> Email Us
            </a>
          </div>
        </FadeIn>
      </section>

    </div>
  )
}
