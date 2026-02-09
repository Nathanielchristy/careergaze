'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Code2, Layout, Database, Terminal, ArrowRight, ChevronLeft } from 'lucide-react'

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

export default function StartProjectPage() {
  return (
    <div className="min-h-screen bg-white text-[#0A4D68] font-sans">
      
      <nav className="p-6">
        <Link href="/" className="flex items-center gap-2 text-sm font-black lowercase tracking-tighter text-slate-400 hover:text-blue-600 transition-colors">
          <ChevronLeft size={16} /> back to home
        </Link>
      </nav>

      <section className="pt-12 pb-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-500/5 -skew-y-6 translate-x-1/4" />
        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <FadeIn>
            <span className="inline-block px-4 py-1 mb-6 rounded-full bg-blue-600/10 text-blue-600 text-xs font-black uppercase tracking-widest">
              web development 2026
            </span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 lowercase">
              build your <span className="text-blue-600">digital product.</span>
            </h1>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg lowercase tracking-tight">
              from saas platforms to custom e-commerce, tell us what you're building. 
              our engineering team will bring your vision to life.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-10 md:p-14 shadow-2xl relative">
              <h2 className="text-3xl font-black mb-8 text-center tracking-tighter lowercase">
                project details<span className="text-blue-600">.</span>
              </h2>

              <form className="grid gap-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <input type="text" placeholder="your name" className="w-full px-5 h-14 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none lowercase font-bold" />
                  <input type="text" placeholder="company name" className="w-full px-5 h-14 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none lowercase font-bold" />
                </div>

                <select className="w-full px-5 h-14 rounded-xl border border-slate-200 text-slate-500 focus:ring-2 focus:ring-blue-600 outline-none lowercase font-bold">
                  <option>project type</option>
                  <option>saas / web app</option>
                  <option>e-commerce store</option>
                  <option>corporate website</option>
                  <option>mobile application</option>
                </select>

                <textarea rows={4} placeholder="describe the features you need..." className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none lowercase font-bold" />

                <Button className="bg-[#0A4D68] hover:bg-blue-700 text-white h-16 rounded-xl font-black text-lg lowercase tracking-tighter">
                  request technical quote <ArrowRight className="ml-2" />
                </Button>
              </form>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}