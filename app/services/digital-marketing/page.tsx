'use client'

import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { 
  ArrowLeft, TrendingUp, Share2, BarChart3, Zap, 
  Target, MousePointer2, Megaphone, PieChart 
} from 'lucide-react'
import Link from 'next/link'

// --- TypeScript Interface for Animation ---
interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
}

const FadeIn: React.FC<FadeInProps> = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
  >
    {children}
  </motion.div>
)

export default function DigitalMarketingPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-white text-[#0A4D68] font-sans">
      
      {/* 1. NAVIGATION WITH BRAND LOGO */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-4 group">
            <div className="relative w-10 h-10 md:w-12 md:h-12 p-0.5 rounded-2xl bg-gradient-to-tr from-blue-600 to-blue-400 shadow-blue-200 shadow-lg group-hover:shadow-blue-300 transition-all duration-500 group-hover:rotate-3">
              <div className="relative w-full h-full overflow-hidden rounded-[14px] bg-white">
                <Image 
                  src="/logo.jpeg" 
                  alt="Careergize logo" 
                  fill
                  priority
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <span className="absolute inset-0 rounded-2xl bg-blue-400 animate-ping opacity-0 group-hover:opacity-20 transition-opacity duration-700"></span>
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xl md:text-2xl tracking-tighter text-slate-900 leading-none">
                Careergize<span className="text-blue-600">.</span>
              </span>
            </div>
          </Link>
          <Link href="/">
            <Button variant="ghost" size="sm" className="font-bold text-[#0A4D68] hover:text-[#86C232] gap-2">
              <ArrowLeft size={16} /> BACK
            </Button>
          </Link>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section className="relative pt-20 pb-24 overflow-hidden px-6">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#86C232]/5 -skew-x-12 translate-x-1/4" />
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <FadeIn>
            <div className="inline-block px-3 py-1 mb-6 rounded bg-[#86C232]/10 text-[#86C232] text-[10px] font-bold uppercase tracking-[0.2em] border border-[#86C232]/20">
              Growth Analytics 2026
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tighter leading-[1.1] mb-8 text-[#0A4D68]">
              Data-Driven <br /> <span className="text-[#86C232]">Marketing.</span>
            </h1>
            <p className="text-lg text-slate-500 mb-10 leading-relaxed max-w-lg">
              Maximize your ROI with precision-targeted campaigns. We combine creative storytelling with rigorous analytics to scale your brand effectively.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-[#0A4D68] hover:bg-[#0A4D68]/90 text-white px-8 rounded-xl h-14 font-bold shadow-lg shadow-[#0A4D68]/20">
                Start Campaign
              </Button>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="relative">
              <div className="absolute -inset-4 bg-[#86C232]/20 rounded-[2.5rem] blur-3xl" />
              <img
                src="/digital-marketing-strategy-and-social-media-analyt.jpg"
                alt="Digital Marketing"
                className="relative rounded-[2rem] shadow-2xl border-4 border-white object-cover aspect-[4/3]"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 3. SERVICES GRID */}
      <section className="py-24 bg-slate-50/50 px-6 border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center lg:text-left">
            <h2 className="text-xs font-bold text-[#86C232] uppercase tracking-[0.4em] mb-4">Strategic Solutions</h2>
            <h3 className="text-4xl font-bold tracking-tight text-[#0A4D68]">Our Digital Services</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { icon: Share2, title: 'Social Media Marketing', desc: 'Strategic content creation and management across Instagram, Facebook, and LinkedIn to build brand authority.' },
              { icon: TrendingUp, title: 'SEO Optimization', desc: 'Improve search rankings and organic visibility with proven on-page and technical SEO techniques.' },
              { icon: BarChart3, title: 'Analytics & Reporting', desc: 'Actionable insights and transparent reporting to track every dollar of your marketing spend.' },
              { icon: Zap, title: 'Paid Advertising', desc: 'High-conversion PPC campaigns across Google and Social platforms to generate immediate leads.' },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="bg-white p-8 rounded-2xl border border-slate-200/60 hover:border-[#86C232]/30 hover:shadow-xl transition-all group flex gap-6 h-full">
                  <div className="flex-shrink-0 w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center group-hover:bg-[#86C232] transition-colors duration-300">
                    <item.icon className="text-[#0A4D68] group-hover:text-white" size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2 text-[#0A4D68]">{item.title}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PERFORMANCE RESULTS SECTION */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0A4D68] mb-12 tracking-tight">Proven Results</h2>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: MousePointer2, title: 'Increased Traffic', desc: 'Drive qualified, high-intent visitors to your digital assets through targeted organic and paid funnels.' },
              { icon: Megaphone, title: 'Better Engagement', desc: 'Foster meaningful community connections through creative storytelling and community management.' },
              { icon: PieChart, title: 'Higher Conversions', desc: 'Optimize every stage of the customer journey to turn passive browsers into loyal customers.' },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="relative p-8 bg-gradient-to-br from-[#86C232]/5 to-transparent border border-[#86C232]/10 rounded-2xl hover:border-[#86C232]/30 transition-all h-full">
                  <item.icon className="text-[#86C232] mb-4" size={28} />
                  <h3 className="text-xl font-bold text-[#0A4D68] mb-3">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA SECTION */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center p-12 lg:p-20 rounded-[3rem] bg-[#0A4D68] text-white relative overflow-hidden shadow-2xl shadow-[#0A4D68]/20">
          <div className="absolute top-0 right-0 w-full h-1 bg-[#86C232]" />
          <FadeIn>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 tracking-tight">Ready to Scale?</h2>
            <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">
              Partner with our growth experts to reach your target audience and achieve your marketing objectives.
            </p>
            <Link href="/">
              <Button size="lg" className="bg-[#86C232] hover:bg-white hover:text-[#0A4D68] text-[#0A4D68] px-12 rounded-full h-16 font-bold text-lg transition-all">
                Get Free Consultation
              </Button>
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* 6. FOOTER */}
      <footer className="py-12 text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-slate-300">
          © 2026 CAREERGIZE MARKETING. MEASURED BY SUCCESS.
        </p>
      </footer>
    </div>
  )
}