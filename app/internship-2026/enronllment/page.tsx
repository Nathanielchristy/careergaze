'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  CheckCircle2, Loader2, Sparkles, ChevronRight, Calendar, Cpu, Users, 
  ChevronLeft, ShieldCheck, ArrowRight, Home
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { useRouter } from 'next/navigation' // Added for navigation

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwlTCslhGYMdb60DJT_6SSIGWlmFFSGu5omo6Rb3JvY92y5bg_KsWRHp6W6AKnWdkOv/exec'

export default function Internship2026() {
  const router = useRouter()
  const [status, setStatus] = useState<'idle' | 'loading' | 'redirecting' | 'success'>('idle')
  const [ratings, setRatings] = useState({ tech: 3, problem: 3, comm: 3, time: 3 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')
    
    const formData = new FormData(e.currentTarget)
    const payload = {
      fullName: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      college: formData.get('college'),
      track: formData.get('track'),
      academicStanding: formData.get('academicStanding'),
      startDate: formData.get('startDate'),
      skillTech: ratings.tech,
      skillProblem: ratings.problem,
      skillComm: ratings.comm,
      skillTime: ratings.time,
      status: 'Registered'
    }

    try {
      await fetch(SCRIPT_URL, { 
        method: 'POST', 
        mode: 'no-cors', 
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload) 
      })
      
      setStatus('redirecting')

      // Show the Feb 16 message for 4 seconds, then go home
      setTimeout(() => {
        router.push('/') // Redirects to your home page
      }, 4000)

    } catch (err) { 
      console.error("Submission Error:", err)
      alert("Submission failed. Please try again.")
      setStatus('idle') 
    }
  }

  if (!mounted) return <div className="min-h-screen bg-[#FDFEFF]" />;

  return (
    <div className="min-h-screen bg-[#FDFEFF] text-[#0A4D68] pb-20">
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-[#86C232]/5 rounded-full blur-[120px] -z-10" />
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-[#0A4D68]/5 rounded-full blur-[120px] -z-10" />
      
      <nav className="p-6">
        <Link href="/" className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-[#86C232] transition-colors">
          <ChevronLeft size={16} /> BACK TO HOME
        </Link>
      </nav>

      <main className="max-w-4xl mx-auto pt-8 px-6">
        <header className="mb-12 text-center md:text-left">
          <motion.div 
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#86C232]/10 rounded-full text-[#86C232] font-black text-xs uppercase tracking-widest mb-6"
          >
            <h1>Careergize Internship 2026 </h1> 
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-4"> 
            Internship <span className="text-[#86C232]">Enrollment</span>
          </h1>
          <p className="text-slate-500 font-medium text-lg italic">Reserve your spot in the upcoming cohort.</p>
        </header>

        <AnimatePresence mode="wait">
          {(status === 'idle' || status === 'loading') ? (
            <motion.form 
              key="form" onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-12"
            >
              {/* CANDIDATE INFO */}
              <section className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-slate-50">
                <h2 className="text-2xl font-black mb-8 flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#0A4D68] rounded-lg flex items-center justify-center text-[#86C232]"><Users size={18}/></div>
                  Candidate Identity
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <CustomInput label="Full Name" name="name" placeholder="John Doe" required />
                  <CustomInput label="Email Address" name="email" type="email" placeholder="john@example.com" required />
                  <CustomInput label="Phone Number" name="phone" placeholder="+91" required />
                  <CustomInput label="College / University" name="college" placeholder="University Name" required />
                </div>
              </section>

              {/* TRACK INFO */}
              <section className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-slate-50">
                <h2 className="text-2xl font-black mb-8 flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#86C232] rounded-lg flex items-center justify-center text-[#0A4D68]"><Cpu size={18}/></div>
                  Track Selection
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label className="text-xs font-black uppercase text-slate-400">Internship Track</Label>
                    <select name="track" className="w-full h-14 bg-slate-50 border-none rounded-2xl px-6 font-bold text-black" required>
                      <option value="">Select Tech Stack...</option>
                      <option>Web Development</option>
                      <option>Digital Marketing</option>
                      <option>UI/UX Design & Research</option>
                       <option>Data Science</option>
                    </select>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-xs font-black uppercase text-slate-400">Available From</Label>
                    <div className="relative text-black">
                      <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                      <Input name="startDate" type="date" className="h-14 pl-14 bg-slate-50 border-none rounded-2xl font-bold text-black" required />
                    </div>
                  </div>
                </div>
              </section>

              <Button 
                type="submit"
                disabled={status === 'loading'}
                className="w-full h-24 bg-[#0A4D68] hover:bg-black text-[#86C232] rounded-[2rem] text-2xl font-black shadow-xl flex items-center justify-between px-12 group transition-all"
              >
                {status === 'loading' ? (
                  <span className="flex items-center gap-3 mx-auto text-white text-lg">
                    <Loader2 className="animate-spin" /> REGISTERING...
                  </span>
                ) : (
                  <>
                    <span>REGISTER NOW</span>
                    <ArrowRight size={32} className="group-hover:translate-x-2 transition-transform" />
                  </>
                )}
              </Button>
            </motion.form>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              className="text-center py-20 bg-white rounded-[4rem] shadow-3xl border border-slate-100"
            >
              <div className="w-24 h-24 bg-[#86C232]/20 rounded-[2rem] flex items-center justify-center mx-auto mb-8">
                <Calendar size={48} className="text-[#86C232] animate-pulse" />
              </div>
              <h2 className="text-5xl font-black mb-4 tracking-tighter text-[#0A4D68]">Registration Saved.</h2>
              
              <div className="max-w-md mx-auto bg-[#0A4D68] p-8 rounded-[2.5rem] mb-10 text-white shadow-xl shadow-[#0A4D68]/20">
                 <p className="text-[12px] font-black uppercase tracking-[0.2em] text-[#86C232] mb-3">Program Update</p>
                 <h3 className="text-4xl font-black">FEB 16, 2026</h3>
                 <div className="h-1 w-12 bg-[#86C232] mx-auto my-4 rounded-full" />
                 <p className="text-sm font-medium opacity-70">Enrollment and portal access officially starts on Feb 16....</p>
              </div>

              <div className="flex justify-center items-center gap-3 text-slate-400 font-bold">
                <Home size={18} className="text-[#86C232]" />
                <span className="text-sm uppercase tracking-widest">Navigating Home</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}

// HELPER COMPONENTS
function CustomInput({ label, ...props }: any) {
  return (
    <div className="space-y-3">
      <Label className="text-xs font-black uppercase text-slate-400 ml-1">{label}</Label>
      <Input className="h-14 bg-slate-50 border-none rounded-2xl px-6 font-bold text-black focus:ring-2 focus:ring-[#86C232]" {...props} />
    </div>
  )
}