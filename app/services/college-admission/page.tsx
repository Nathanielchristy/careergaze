'use client'

import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { 
  ArrowLeft, CheckCircle2, Cpu, Stethoscope, BookOpen, 
  Building2, DollarSign, Palette, ExternalLink, ShieldCheck, 
  Target, Zap 
} from 'lucide-react'
import Link from 'next/link'

// --- TypeScript Interface Fix ---
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

export default function CollegeAdmissionPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const tracks = [
    { icon: Cpu, title: 'Engineering', desc: 'Strategy for IITs, NITs, and IIITs. JEE/GATE specialized counseling.', highlights: ['IIT Strategy', 'Branch Selection'] },
    { icon: Stethoscope, title: 'Medical', desc: 'Expert NEET guidance for AIIMS and top Government Medical Colleges.', highlights: ['NEET Analysis', 'MBBS/BDS Path'] },
    { icon: DollarSign, title: 'Management', desc: 'IIM-focused profile building and roadmap for elite MBA/BBA programs.', highlights: ['CAT/GMAT Prep', 'B-School Selection'] },
    { icon: Building2, title: 'Commerce', desc: 'Strategic entry into SRCC and premier finance and accounting institutions.', highlights: ['CA/CS Guidance', 'Eco/Commerce'] },
    { icon: BookOpen, title: 'Nursing', desc: 'Comprehensive guidance for nursing education and career advancement.', highlights: ['B.Sc Nursing', 'Clinical Path'] },
    { icon: Palette, title: 'Arts & Design', desc: 'Portfolio audit and coaching for NID, NIFT, and leading Liberal Arts.', highlights: ['Portfolio Audit', 'NIFT/NID Prep'] },
  ]

  const benefits = [
    {
      icon: Target,
      title: 'Personalized Approach',
      description: 'We understand that every student is unique. Our counselors tailor guidance based on your individual profile.',
    },
    {
      icon: ShieldCheck,
      title: 'Proven Track Record',
      description: 'Hundreds of students have successfully gained admission to their dream colleges with our support.',
    },
    {
      icon: Zap,
      title: 'End-to-End Support',
      description: 'From initial counseling to final admission, we guide you at every step of your academic journey.',
    },
  ]

  return (
    <div className="min-h-screen bg-white text-[#0A4D68] font-sans">
      
      {/* 1. NAVIGATION */}
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
              Authorized Partner 2026
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tighter leading-[1.1] mb-8 text-[#0A4D68]">
              Strategize Your <span className="text-[#86C232]">Future.</span>
            </h1>
            <p className="text-lg text-slate-500 mb-10 leading-relaxed max-w-lg">
              Professional, end-to-end guidance for college admissions and elite internships. We turn academic goals into career milestones.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-[#0A4D68] hover:bg-[#0A4D68]/90 text-white px-8 rounded-xl h-14 font-bold shadow-lg shadow-[#0A4D68]/20">
                Book Consultation
              </Button>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="relative">
              <div className="absolute -inset-4 bg-[#86C232]/20 rounded-[2.5rem] blur-3xl" />
              <img
                src="/student-studying-and-college-admission-process.jpg"
                alt="Success"
                className="relative rounded-[2rem] shadow-2xl border-4 border-white object-cover aspect-[4/3]"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 3. TRACKS GRID */}
      <section className="py-24 bg-slate-50/50 px-6 border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-xs font-bold text-[#86C232] uppercase tracking-[0.4em] mb-4 text-center lg:text-left">Admissions</h2>
            <h3 className="text-4xl font-bold tracking-tight text-[#0A4D68] text-center lg:text-left">Expert Guidance Tracks</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {tracks.map((track, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="bg-white p-8 rounded-2xl border border-slate-200/60 hover:border-[#86C232]/30 hover:shadow-xl transition-all group flex flex-col h-full">
                  <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#86C232] transition-colors duration-300">
                    <track.icon className="text-[#0A4D68] group-hover:text-white" size={24} />
                  </div>
                  <h4 className="text-xl font-bold mb-3 text-[#0A4D68]">{track.title}</h4>
                  <p className="text-slate-500 text-sm mb-6 flex-grow leading-relaxed">{track.desc}</p>
                  <div className="space-y-2 pt-4 border-t border-slate-50">
                    {track.highlights.map((h, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                        <CheckCircle2 size={14} className="text-[#86C232]" /> {h}
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
     {/* 5. INTERNSHIP BRIDGE */}
<section className="py-24 px-6" aria-labelledby="internship-heading">
  <div className="max-w-7xl mx-auto bg-[#0A4D68] rounded-[3rem] p-12 lg:p-20 relative overflow-hidden shadow-2xl shadow-[#0A4D68]/20">
    {/* Decorative Background Element */}
    <div className="absolute top-0 right-0 w-1/3 h-full bg-[#86C232] opacity-10 -skew-x-12 translate-x-1/2" />
    
    <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
      <div className="text-white space-y-8">
        {/* SEO Optimized Heading: Uses keywords like "2026", "Elite", and "Program" */}
        <h2 id="internship-heading" className="text-4xl lg:text-6xl font-black leading-tight tracking-tighter">
          Launch Your Career: <br />
          <span className="text-[#86C232]">Careergize intership 2026 </span>
        </h2>
        
        {/* Meaningful Content: Focuses on benefits (Mentorship, Projects, Certification) */}
        <div className="space-y-4">
          <p className="text-white/80 text-lg leading-relaxed max-w-md">
            Stop just learning—start building. Our 2026 internship offers <strong>hands-on industry projects</strong>, 1-on-1 <strong>mentorship from experts</strong>, and a path to <strong>pre-placement offers (PPO)</strong>.
          </p>
          
          <ul className="grid grid-cols-1 gap-3">
            <li className="flex items-center gap-3 text-sm font-semibold text-[#86C232]">
              <div className="w-5 h-5 rounded-full bg-[#86C232]/20 flex items-center justify-center">✓</div>
              Industry-Recognized Certifications
            </li>
            <li className="flex items-center gap-3 text-sm font-semibold text-[#86C232]">
              <div className="w-5 h-5 rounded-full bg-[#86C232]/20 flex items-center justify-center">✓</div>
              Real-world Tech Stack Exposure
            </li>
            <li className="flex items-center gap-3 text-sm font-semibold text-[#86C232]">
              <div className="w-5 h-5 rounded-full bg-[#86C232]/20 flex items-center justify-center">✓</div>
              Networking with Top-tier Professionals
            </li>
          </ul>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Link href="/internship-2026">
            <Button size="lg" className="bg-[#86C232] hover:bg-white hover:text-[#0A4D68] text-[#0A4D68] font-black rounded-2xl h-16 px-10 transition-all border-none shadow-xl shadow-[#86C232]/20">
              Apply Now <ExternalLink className="ml-2" size={20} />
            </Button>
          </Link>
          <p className="text-white/40 text-[10px] uppercase tracking-widest self-center font-bold">
            Limited Seats Available <br /> Application Deadline Approaching
          </p>
        </div>

      </div>

      {/* Optimized Image with Alt Text for SEO */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-[#86C232] to-transparent rounded-[2.2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
        <img
          src="/team-support-mentoring-professional-guidance.jpg"
          className="relative rounded-[2rem] shadow-2xl grayscale-[20%] hover:grayscale-0 transition-all duration-500 border border-white/10"
          alt="Students collaborating in the Careergize 2026 Internship Program mentorship session"
        />
      </div>
    </div>
  </div>
</section>
      {/* 4. WHY CHOOSE US */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0A4D68] mb-12 text-center lg:text-left tracking-tight">Why Choose Us</h2>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((item, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <div className="relative p-8 bg-gradient-to-br from-slate-50 to-white border border-slate-100 rounded-2xl hover:border-[#86C232]/20 transition-all h-full">
                  <div className="w-10 h-10 bg-[#86C232]/10 rounded-lg flex items-center justify-center mb-6">
                    <item.icon className="text-[#86C232]" size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-[#0A4D68] mb-3">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

    

      {/* 6. READY TO BEGIN JOURNEY (CTA) */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="p-12 rounded-[2.5rem] bg-slate-50 border border-slate-100 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#86C232] to-transparent" />
               <h2 className="text-4xl font-bold text-[#0A4D68] mb-4 tracking-tight">Ready to Begin Your Journey?</h2>
               <p className="text-lg text-slate-500 mb-10 max-w-xl mx-auto">
                 Connect with our experts for personalized college admission and career guidance today.
               </p>
               <Link href="/">
                <Button size="lg" className="bg-[#0A4D68] hover:bg-[#0A4D68]/90 text-white px-12 rounded-full h-16 font-bold text-lg shadow-xl shadow-[#0A4D68]/20">
                  Get Free Consultation
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="py-12 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-slate-300">
            © 2026 CAREERGIZE ELITE. PROFESSIONAL ADMISSION SYSTEMS.
          </p>
        </div>
      </footer>
    </div>
  )
}