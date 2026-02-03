'use client'

import React, { useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  User, Mail, Phone, ArrowRight, 
  Sparkles, ShieldCheck, Zap, Loader2, CheckCircle2
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function BrandedRegistration() {
  // State to track the submission process
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // 3D PARALLAX LOGIC
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  // UPDATED: Submit Handler with your specific URL
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
    };

    try {
      // YOUR UPDATED WEB APP URL
      const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxDT0Wer2TNoQXgcHkVMs-q8JX1du_gx5tfKgu-MFyXHwfVQgOiwOTw_F22ZXEUi61T/exec';
      
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Essential for Google Apps Script redirects
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      // Since 'no-cors' doesn't return status, we trigger success state
      setStatus('success');
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex items-center justify-center p-6 overflow-hidden">
      
      {/* BRANDED BACKGROUND BLURS */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-[#86C232]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-[#0A4D68]/10 rounded-full blur-[120px]" />
      </div>

      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { x.set(0); y.set(0); }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative z-10 w-full max-w-[480px]"
      >
        <div 
          style={{ transform: "translateZ(40px)" }}
          className="bg-white/90 backdrop-blur-2xl border border-slate-100 p-8 md:p-12 rounded-[3rem] shadow-[0_40px_80px_-15px_rgba(10,77,104,0.12)]"
        >
          <AnimatePresence mode="wait">
            {status !== 'success' ? (
              <motion.div
                key="form"
                exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
              >
                {/* LOGO SECTION */}
                <div className="flex flex-col items-center mb-10 text-center" style={{ transform: "translateZ(60px)" }}>
                  <div className="relative w-24 h-24 p-1 rounded-[2rem] bg-gradient-to-tr from-[#0A4D68] via-[#86C232] to-[#0A4D68] shadow-2xl mb-6">
                    <div className="w-full h-full bg-white rounded-[1.8rem] overflow-hidden relative">
                       <Image src="/logo.jpeg" alt="Careergize" fill className="object-cover" priority />
                    </div>
                  </div>
                  <h1 className="text-3xl font-black text-[#0A4D68] tracking-tighter">
                    Careergize<span className="text-[#86C232]">.</span>
                  </h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5" style={{ transform: "translateZ(20px)" }}>
                  {/* FULL NAME */}
                  <div className="group space-y-2">
                    <Label className="text-[10px] font-black uppercase text-slate-400 ml-1">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                      <Input 
                        name="name" 
                        type="text" 
                        placeholder="John Doe" 
                        className="h-14 pl-12 bg-slate-50/50 rounded-2xl border-slate-100 focus:border-[#86C232] focus:ring-4 focus:ring-[#86C232]/10 transition-all"
                        required
                      />
                    </div>
                  </div>

                  {/* EMAIL */}
                  <div className="group space-y-2">
                    <Label className="text-[10px] font-black uppercase text-slate-400 ml-1">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                      <Input 
                        name="email" 
                        type="email" 
                        placeholder="john@example.com" 
                        className="h-14 pl-12 bg-slate-50/50 rounded-2xl border-slate-100 focus:border-[#86C232] focus:ring-4 focus:ring-[#86C232]/10 transition-all"
                        required
                      />
                    </div>
                  </div>

                  {/* PHONE */}
                  <div className="group space-y-2">
                    <Label className="text-[10px] font-black uppercase text-slate-400 ml-1">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                      <Input 
                        name="phone" 
                        type="tel" 
                        placeholder="+91 00000 00000" 
                        className="h-14 pl-12 bg-slate-50/50 rounded-2xl border-slate-100 focus:border-[#86C232] focus:ring-4 focus:ring-[#86C232]/10 transition-all"
                        required
                      />
                    </div>
                  </div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button 
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full h-15 bg-[#0A4D68] hover:bg-[#0A4D68]/95 text-white font-bold text-lg rounded-2xl border-none"
                    >
                      {status === 'loading' ? <Loader2 className="animate-spin mr-2" /> : "Apply for Access"}
                    </Button>
                  </motion.div>
                </form>
              </motion.div>
            ) : (
              /* SUCCESS VIEW */
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center"
              >
                <div className="w-24 h-24 bg-[#86C232]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={48} className="text-[#86C232]" />
                </div>
                <h2 className="text-3xl font-black text-[#0A4D68] mb-4">Application Sent!</h2>
                <p className="text-slate-500 mb-8">Data saved successfully. We will contact you shortly.</p>
                <Link href="/">
                  <Button className="rounded-xl bg-[#0A4D68]">Return Home</Button>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}