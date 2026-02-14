'use client'

import React, { useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  User, Mail, Lock, Eye, EyeOff, 
  Loader2, CheckCircle2, ShieldCheck, Sparkles
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function BrandedRegistration() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [showPassword, setShowPassword] = useState(false);

  // 3D PARALLAX EFFECT
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(useSpring(y), [-0.5, 0.5], ["7deg", "-7deg"])
  const rotateY = useTransform(useSpring(x), [-0.5, 0.5], ["-7deg", "7deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'), // New password field
      date: new Date().toLocaleString()
    };

    try {
      const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyzcAwKEl-Exd2E5SzhoPLBcvO2uF9Ezviphs71y_OvSLDZEvIP7gPGmS6X_IlURe5H/exec';
      
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      setStatus('success');
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex items-center justify-center p-6 overflow-hidden relative">
      
      {/* BACKGROUND DECOR */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-[#86C232]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-[#0A4D68]/10 rounded-full blur-[120px]" />
      </div>

      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { x.set(0); y.set(0); }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative z-10 w-full max-w-[460px]"
      >
        <div className="bg-white/90 backdrop-blur-2xl border border-slate-100 p-8 md:p-10 rounded-[3rem] shadow-[0_40px_80px_-15px_rgba(10,77,104,0.15)]">
          <AnimatePresence mode="wait">
            {status !== 'success' ? (
              <motion.div key="form" exit={{ opacity: 0, scale: 0.95 }}>
                
                {/* HEADER */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#86C232]/10 rounded-full mb-4">
                    <ShieldCheck size={14} className="text-[#86C232]" />
                    <span className="text-[10px] font-black uppercase text-[#86C232] tracking-widest">Secure Registration</span>
                  </div>
                  <h1 className="text-3xl font-black text-[#0A4D68]">Register Here</h1>
                  <p className="text-slate-400 text-sm mt-1">Join the Careergize community today</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* NAME */}
                  <div className="space-y-1.5">
                    <Label className="text-[10px] font-black uppercase text-slate-400 ml-1">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                      <Input name="name" placeholder="Alex Morgan" className="h-12 pl-12 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-[#86C232]/50" required />
                    </div>
                  </div>

                  {/* EMAIL */}
                  <div className="space-y-1.5">
                    <Label className="text-[10px] font-black uppercase text-slate-400 ml-1">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                      <Input name="email" type="email" placeholder="alex@careergize.com" className="h-12 pl-12 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-[#86C232]/50" required />
                    </div>
                  </div>

                  {/* PASSWORD */}
                  <div className="space-y-1.5">
                    <Label className="text-[10px] font-black uppercase text-slate-400 ml-1">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                      <Input 
                        name="password" 
                        type={showPassword ? "text" : "password"} 
                        placeholder="••••••••" 
                        className="h-12 pl-12 pr-12 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-[#86C232]/50" 
                        required 
                      />
                      <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-[#0A4D68] transition-colors"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <Button 
                    disabled={status === 'loading'}
                    className="w-full h-14 bg-[#0A4D68] hover:bg-[#0A4D68]/90 text-white font-bold rounded-2xl mt-4 shadow-lg shadow-[#0A4D68]/20 transition-all hover:scale-[1.02]"
                  >
                    {status === 'loading' ? <Loader2 className="animate-spin" /> : "Sign Up Now"}
                  </Button>

                  <p className="text-center text-xs text-slate-400 mt-4">
                    Already have an account? <Link href="/login" className="text-[#0A4D68] font-bold hover:underline">Log in</Link>
                  </p>
                </form>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-10">
                <div className="w-20 h-20 bg-[#86C232]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={40} className="text-[#86C232]" />
                </div>
                <h2 className="text-2xl font-black text-[#0A4D68]">Welcome Aboard!</h2>
                <p className="text-slate-400 mt-2 mb-8">Your account has been created successfully.</p>
                <Link href="/login">
                  <Button className="bg-[#0A4D68] rounded-xl px-8">Login</Button>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}