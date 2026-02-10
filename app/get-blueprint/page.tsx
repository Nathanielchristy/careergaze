'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { 
  ChevronLeft, 
  ArrowRight, 
  CheckCircle2, 
  Loader2, 
  Sparkles,
  FileText,
  Mail
} from 'lucide-react'

export default function GetBlueprintPage() {
  const [status, setStatus] = useState<'idle' | 'generating' | 'success'>('idle')
  const [loadingText, setLoadingText] = useState('analyzing profile...')

  // This handles the "Fake" loading sequence to build value
  useEffect(() => {
    if (status === 'generating') {
      const timers = [
        setTimeout(() => setLoadingText('matching admission benchmarks...'), 1200),
        setTimeout(() => setLoadingText('calculating growth trajectory...'), 2400),
        setTimeout(() => setLoadingText('finalizing your blueprint...'), 3600),
        setTimeout(() => setStatus('success'), 4800),
      ]
      return () => timers.forEach(clearTimeout)
    }
  }, [status])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('generating')
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-[#A7FF00]/30">
      
      {/* NAVBAR */}
      <nav className="p-6">
        <Link href="/" className="flex items-center gap-2 text-sm font-black lowercase tracking-tighter text-slate-400 hover:text-[#005A8D] transition-colors">
          <ChevronLeft size={16} /> back to home
        </Link>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          
          {/* STAGE 1: THE FORM */}
          {status === 'idle' && (
            <motion.div 
              key="form-stage"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="text-center mb-12">
                <span className="px-4 py-1 rounded-full bg-slate-900 text-[#A7FF00] text-[10px] font-black uppercase tracking-[0.2em]">
                  limited 2026 edition
                </span>
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter lowercase mt-6 leading-[0.9]">
                  get your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#005A8D] to-[#22C55E]">free blueprint.</span>
                </h1>
                <p className="mt-6 text-slate-500 font-bold lowercase tracking-tight max-w-xl mx-auto">
                  your personalized roadmap for college admissions and digital brand scaling.
                </p>
              </div>

              <div className="max-w-2xl mx-auto bg-white border-2 border-slate-100 rounded-[3rem] p-8 md:p-12 shadow-2xl shadow-slate-200/50">
                <form onSubmit={handleSubmit} className="grid gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">full name</label>
                    <input required type="text" placeholder="e.g. aryan sharma" className="w-full px-6 h-14 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-[#A7FF00] outline-none font-bold lowercase transition-all" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">whatsapp or email</label>
                    <input required type="text" placeholder="where should we send the pdf?" className="w-full px-6 h-14 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-[#A7FF00] outline-none font-bold lowercase transition-all" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">interest area</label>
                    <select className="w-full px-6 h-14 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-[#A7FF00] outline-none font-bold lowercase appearance-none cursor-pointer">
                      <option>college admissions</option>
                      <option>digital marketing growth</option>
                      <option>web development & tech</option>
                      <option>internship - webdev</option>
                      <option>internship - marketing</option>
                    </select>
                  </div>

                  <Button type="submit" className="w-full h-16 bg-slate-900 hover:bg-[#005A8D] text-white rounded-2xl font-black text-lg lowercase tracking-tighter transition-all active:scale-95 mt-4">
                    generate my blueprint <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </form>
              </div>
            </motion.div>
          )}

          {/* STAGE 2: THE GENERATION PROCESS */}
          {status === 'generating' && (
            <motion.div 
              key="loading-stage"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-24 text-center"
            >
              <div className="relative mb-12">
                <div className="absolute inset-0 bg-[#A7FF00]/20 blur-3xl rounded-full animate-pulse" />
                <Loader2 className="w-20 h-20 text-[#005A8D] animate-spin relative z-10" strokeWidth={3} />
              </div>
              <h2 className="text-3xl font-black tracking-tighter lowercase mb-4 transition-all duration-500">
                {loadingText}
              </h2>
              <div className="w-64 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 4.8, ease: "linear" }}
                  className="h-full bg-gradient-to-r from-[#005A8D] to-[#A7FF00]"
                />
              </div>
            </motion.div>
          )}

          {/* STAGE 3: SUCCESS STATE */}
          {status === 'success' && (
            <motion.div 
              key="success-stage"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-xl mx-auto text-center py-12"
            >
              <div className="w-24 h-24 bg-[#A7FF00] rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-[#A7FF00]/40">
                <CheckCircle2 size={48} className="text-slate-900" />
              </div>
              <h2 className="text-5xl font-black tracking-tighter lowercase mb-6">
                blueprint ready<span className="text-[#005A8D]">.</span>
              </h2>
              <p className="text-slate-500 font-bold lowercase tracking-tight mb-10 leading-relaxed">
                excellent choice.growth roadmap is being sent to your inbox right now.
              </p>

              <div className="flex flex-col gap-4">
                <Button asChild className="h-16 bg-slate-900 text-white rounded-2xl font-black lowercase tracking-tighter text-lg transition-all active:scale-95">
                  <Link href="/portfolio">view success stories</Link>
                </Button>
                <Button asChild variant="ghost" className="h-14 font-black lowercase tracking-tighter text-slate-400">
                  <Link href="/">return to home</Link>
                </Button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* FOOTER DECOR */}
      <div className="fixed bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#005A8D] via-[#22C55E] to-[#A7FF00]" />
    </div>
  )
}