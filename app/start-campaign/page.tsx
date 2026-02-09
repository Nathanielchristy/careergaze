'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { 
  Rocket, 
  Target, 
  BarChart, 
  Phone, 
  Mail, 
  ArrowRight,
  ChevronLeft
} from 'lucide-react'

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

export default function StartCampaignPage() {
  return (
    <div className="min-h-screen bg-white text-[#0A4D68] font-sans">
      
      {/* HEADER NAV */}
      <nav className="p-6">
        <Link href="/services/digital-marketing" className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-[#86C232] transition-colors">
          <ChevronLeft size={16} /> BACK TO MARKETING
        </Link>
      </nav>

      {/* HERO */}
      <section className="pt-12 pb-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/5 -skew-x-12 translate-x-1/3" />
        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <FadeIn>
            <span className="inline-block px-4 py-1 mb-6 rounded-full bg-blue-600/10 text-blue-600 text-xs font-bold uppercase tracking-widest">
              Scale Your Brand 2026
            </span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">
              Launch Your <span className="text-blue-600">Growth Engine</span>
            </h1>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
              Tell us about your business goals. Our digital strategists will build a 
              data-driven roadmap to maximize your ROI and visibility.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* WHY PARTNER WITH US */}
      <section className="py-20 px-6 bg-slate-50 border-y border-slate-100">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Target,
              title: 'Precision Targeting',
              desc: 'Reach the exact audience that converts, minimizing wasted ad spend.',
            },
            {
              icon: BarChart,
              title: 'Analytics First',
              desc: 'Every campaign is backed by rigorous data and transparent reporting.',
            },
            {
              icon: Rocket,
              title: 'Rapid Scaling',
              desc: 'Proven frameworks to take your brand from local to national levels.',
            },
          ].map((item, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="bg-white p-8 rounded-2xl border border-slate-200 hover:shadow-xl transition-all h-full">
                <div className="w-12 h-12 bg-blue-600/10 rounded-xl flex items-center justify-center mb-6">
                  <item.icon className="text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* CAMPAIGN FORM */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-10 md:p-14 shadow-xl relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-blue-600 rounded-b-full" />
              
              <h2 className="text-3xl font-bold mb-8 text-center tracking-tight">
                Campaign Requirements
              </h2>

              <form className="grid gap-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    placeholder="Business / Brand Name"
                    className="w-full px-5 h-14 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  <input
                    type="text"
                    placeholder="Contact Person Name"
                    className="w-full px-5 h-14 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <input
                    type="email"
                    placeholder="Business Email"
                    className="w-full px-5 h-14 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full px-5 h-14 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <select className="w-full px-5 h-14 rounded-xl border border-slate-200 text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600">
                    <option>Primary Marketing Goal</option>
                    <option>Lead Generation</option>
                    <option>Brand Awareness</option>
                    <option>Sales / E-commerce</option>
                    <option>Social Media Growth</option>
                  </select>
                  <select className="w-full px-5 h-14 rounded-xl border border-slate-200 text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600">
                    <option>Estimated Monthly Budget</option>
                    <option>₹10,000 - ₹50,000</option>
                    <option>₹50,000 - ₹2,00,000</option>
                    <option>₹2,00,000+</option>
                  </select>
                </div>

                <textarea
                  rows={4}
                  placeholder="Tell us about your target audience or current marketing challenges"
                  className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />

                <Button
                  size="lg"
                  className="mt-4 bg-[#0A4D68] hover:bg-blue-700 text-white h-16 rounded-xl font-black text-lg flex items-center justify-center gap-2 transition-all"
                >
                  Request Campaign Strategy <ArrowRight />
                </Button>

                <p className="text-[11px] text-center text-slate-400 uppercase tracking-widest">
                  Our team will contact you within 24 hours with a custom proposal.
                </p>
              </form>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CONTACT FOOTER */}
      <section className="pb-20 text-center">
        <FadeIn>
          <p className="text-sm text-slate-400 mb-4">
            Need an urgent consultation?
          </p>
          <div className="flex justify-center gap-6 text-sm font-bold">
            <a href="tel:+916282744675" className="flex items-center gap-2 text-blue-600 hover:underline">
              <Phone size={16} /> +91 6282744675
            </a>
            <a href="mailto:marketing@careergize.com" className="flex items-center gap-2 text-blue-600 hover:underline">
              <Mail size={16} /> marketing@careergize.com
            </a>
          </div>
        </FadeIn>
      </section>

    </div>
  )
}