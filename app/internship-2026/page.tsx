'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  CheckCircle2, Loader2, Sparkles, ChevronRight, Calendar, Cpu, Users
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function Internship2026() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')
  const [ratings, setRatings] = useState({ tech: 3, problem: 3, comm: 3, time: 3 })
  const [mounted, setMounted] = useState(false)

  // Fix hydration mismatch by waiting for client-side mount
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')
    
    const formData = new FormData(e.currentTarget)
    const payload = {
      name: formData.get('name'),
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
    }

    try {
      const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzqakLMPLwBbe18TSeVgTzLVy5pZq1WKPvtXeaMwGUPRdOrqGeHjcS1FB6zOVK2NH37xA/exec'
      
      await fetch(SCRIPT_URL, { 
        method: 'POST', 
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload) 
      })
      
      setTimeout(() => setStatus('success'), 1000)
    } catch (err) { 
      console.error("Submission Error:", err)
      setStatus('idle') 
    }
  }

  // Prevent SSR rendering of the form to avoid mismatch errors
  if (!mounted) return <div className="min-h-screen bg-[#FDFEFF]" />;

  return (
    <div className="min-h-screen bg-[#FDFEFF] text-[#0A4D68] pb-20">
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-[#86C232]/5 rounded-full blur-[120px] -z-10" />
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-[#0A4D68]/5 rounded-full blur-[120px] -z-10" />

      <main className="max-w-4xl mx-auto pt-16 px-6">
        <header className="mb-12 text-center md:text-left">
          <motion.div 
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#86C232]/10 rounded-full text-[#86C232] font-black text-xs uppercase tracking-widest mb-6"
          >
            <Sparkles size={14} /> Careergize Internship 2026 <Sparkles size={14} />
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-4"> 
            Careergize :
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#0A4D68] to-[#86C232]">
              Intern 2026
            </span>
          </h1>
          <p className="text-slate-500 font-medium text-lg">Your journey to excellence begins with a single application.</p>
        </header>

        <AnimatePresence mode="wait">
          {status !== 'success' ? (
            <motion.form 
              key="form" onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-12"
            >
              <section className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-slate-50">
                <h2 className="text-2xl font-black mb-8 flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#0A4D68] rounded-lg flex items-center justify-center text-[#86C232]"><Users size={18}/></div>
                  Personal Identity
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <CustomInput label="Full Name" name="name" placeholder="E.g. Elon Musk" required />
                  <CustomInput label="Email Address" name="email" type="email" placeholder="elon@mars.com" required />
                  <CustomInput label="Phone Number" name="phone" placeholder="+91 99999 88888" required />
                  <CustomInput label="College / University" name="college" placeholder="IIT Bombay / Stanford" required />
                </div>
              </section>

              <section className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-slate-50">
                <h2 className="text-2xl font-black mb-8 flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#86C232] rounded-lg flex items-center justify-center text-[#0A4D68]"><Cpu size={18}/></div>
                  Internship Logistics
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label className="text-xs font-black uppercase text-slate-400">Preferred Track</Label>
                    <select 
                      suppressHydrationWarning
                      name="track" 
                      className="w-full h-14 bg-slate-50 border-none rounded-2xl px-6 font-bold outline-none focus:ring-2 focus:ring-[#86C232]" 
                      required
                    >
                      <option value="">Choose Track...</option>
                      <option>AI & Machine Learning</option>
                      <option>Full-Stack Development</option>
                      <option>Cybersecurity</option>
                      <option>Data Engineering</option>
                      <option>Web Development</option>
                      <option>Digital Marketing</option>
                    </select>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-xs font-black uppercase text-slate-400">Current Standing</Label>
                    <select 
                      suppressHydrationWarning
                      name="academicStanding" 
                      className="w-full h-14 bg-slate-50 border-none rounded-2xl px-6 font-bold outline-none focus:ring-2 focus:ring-[#86C232]" 
                      required
                    >
                      <option value="">Year of Study...</option>
                      <option>2nd Year Undergraduate</option>
                      <option>3rd Year Undergraduate</option>
                      <option>Final Year Undergraduate</option>
                      <option>Postgraduate / Alumni</option>
                    </select>
                  </div>
                  <div className="space-y-3 md:col-span-2">
                    <Label className="text-xs font-black uppercase text-slate-400">Expected Start Date</Label>
                    <div className="relative">
                      <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                      <Input suppressHydrationWarning name="startDate" type="date" className="h-14 pl-14 bg-slate-50 border-none rounded-2xl font-bold" required />
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-[#0A4D68] p-8 md:p-12 rounded-[3rem] text-white shadow-2xl shadow-[#0A4D68]/20">
                <h2 className="text-2xl font-black mb-2">Skill Proficiency Matrix</h2>
                <p className="text-white/60 text-sm mb-10 font-medium">Self-rate your current capabilities (1: Novice — 5: Expert)</p>
                <div className="space-y-8">
                  <SkillRating label="Technical Skills / Programming" value={ratings.tech} onChange={(v: number) => setRatings({...ratings, tech: v})} />
                  <SkillRating label="Problem-Solving / Analytical Thinking" value={ratings.problem} onChange={(v: number) => setRatings({...ratings, problem: v})} />
                  <SkillRating label="Communication / Teamwork" value={ratings.comm} onChange={(v: number) => setRatings({...ratings, comm: v})} />
                  <SkillRating label="Time Management / Organization" value={ratings.time} onChange={(v: number) => setRatings({...ratings, time: v})} />
                </div>
              </section>

              <Button 
                suppressHydrationWarning
                disabled={status === 'loading'}
                className="w-full h-20 bg-[#86C232] hover:bg-[#7db42d] text-[#0A4D68] rounded-[2rem] text-2xl font-black shadow-xl shadow-[#86C232]/20 transition-all hover:scale-[1.02]"
              >
                {status === 'loading' ? <Loader2 className="animate-spin" /> : "SUBMIT APPLICATION"}
              </Button>
            </motion.form>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-20">
              <div className="w-24 h-24 bg-[#86C232] rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-2xl rotate-12">
                <CheckCircle2 size={48} className="text-[#0A4D68]" />
              </div>
              <h2 className="text-5xl font-black mb-4 tracking-tighter">Transmission Successful.</h2>
              <p className="text-slate-500 font-medium text-lg mb-8">We have ingested your profile into our 2026 talent pipeline.</p>
              <Button onClick={() => setStatus('idle')} variant="ghost" className="font-bold text-[#0A4D68]">Apply for another track <ChevronRight size={18}/></Button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}

function CustomInput({ label, ...props }: any) {
  return (
    <div className="space-y-3">
      <Label className="text-xs font-black uppercase text-slate-400 ml-1">{label}</Label>
      <Input 
        suppressHydrationWarning 
        className="h-14 bg-slate-50 border-none rounded-2xl px-6 font-bold focus:ring-2 focus:ring-[#86C232]" 
        {...props} 
      />
    </div>
  )
}

function SkillRating({ label, value, onChange }: { label: string, value: number, onChange: (v: number) => void }) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Label className="text-sm font-bold text-white/90">{label}</Label>
        <span className="text-[#86C232] font-black text-xl">{value}/5</span>
      </div>
      <div className="flex gap-4">
        {[1, 2, 3, 4, 5].map((num) => (
          <button
            suppressHydrationWarning
            key={num} type="button" onClick={() => onChange(num)}
            className={`flex-1 h-12 rounded-xl border-2 transition-all font-black ${
              value >= num ? 'bg-[#86C232] border-[#86C232] text-[#0A4D68]' : 'border-white/10 text-white/30 hover:border-white/40'
            }`}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  )
}