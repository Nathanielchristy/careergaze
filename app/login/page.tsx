'use client'

import React, { useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  Lock, Mail, Eye, EyeOff, Loader2, 
  ArrowRight, ShieldCheck, Fingerprint, Sparkles 
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function CareergizeLogin() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  
  // 3D PARALLAX LOGIC
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex items-center justify-center p-6 overflow-hidden">
      
      {/* BRANDED BACKGROUND ELEMENTS */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-15%] left-[-10%] w-[50%] h-[50%] bg-[#86C232]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[50%] h-[50%] bg-[#0A4D68]/10 rounded-full blur-[120px]" />
      </div>

      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { x.set(0); y.set(0); }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative z-10 w-full max-w-[460px]"
      >
        {/* MAIN 3D CARD */}
        <div 
          style={{ transform: "translateZ(50px)" }}
          className="bg-white/70 backdrop-blur-2xl border border-slate-100 p-8 md:p-12 rounded-[3rem] shadow-[0_40px_80px_-15px_rgba(10,77,104,0.15)]"
        >
          {/* LOGO & BRANDING */}
          <div className="flex flex-col items-center mb-10 text-center" style={{ transform: "translateZ(40px)" }}>
            <div className="w-20 h-20 relative p-1 rounded-3xl bg-gradient-to-tr from-[#0A4D68] to-[#86C232] shadow-lg mb-6 group-hover:rotate-6 transition-transform">
              <div className="w-full h-full bg-white rounded-[22px] overflow-hidden relative">
                 <Image src="/logo.jpeg" alt="Careergize" fill className="object-cover" />
              </div>
            </div>
            <h1 className="text-3xl font-black text-[#0A4D68] tracking-tighter">
              Careergize<span className="text-[#86C232]">.</span>
            </h1>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em] mt-2">Member Portal Access</p>
          </div>

          <form className="space-y-6" style={{ transform: "translateZ(30px)" }}>
            {/* EMAIL FIELD */}
            <div className="group space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-focus-within:text-[#0A4D68] ml-1">Email</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#0A4D68] transition-colors" size={18} />
                <Input 
                  type="email" 
                  className="h-14 pl-12 bg-slate-50/50 border-slate-100 rounded-2xl focus:ring-4 focus:ring-[#86C232]/10 focus:border-[#86C232] transition-all"
                  placeholder="name@email.com"
                />
              </div>
            </div>

            {/* PASSWORD FIELD */}
            <div className="group space-y-2">
              <div className="flex justify-between items-center px-1">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-focus-within:text-[#0A4D68]">Password</Label>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#0A4D68] transition-colors" size={18} />
                <Input 
                  type={showPassword ? "text" : "password"}
                  className="h-14 pl-12 pr-12 bg-slate-50/50 border-slate-100 rounded-2xl focus:ring-4 focus:ring-[#86C232]/10 focus:border-[#86C232] transition-all"
                  placeholder="••••••••"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-[#0A4D68]"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* BRANDED SUBMIT BUTTON */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button className="w-full h-15 bg-[#0A4D68] hover:bg-[#0A4D68]/90 text-white font-bold text-lg rounded-2xl shadow-xl shadow-[#0A4D68]/20 transition-all border-none">
                Log In
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </motion.div>
          </form>

          {/* BOTTOM ACTIONS */}
          <div className="mt-10 pt-6 border-t border-slate-50 flex flex-col items-center gap-4" style={{ transform: "translateZ(20px)" }}>
            <Link href="/register" className="text-xs font-bold text-[#86C232] hover:text-[#0A4D68] transition-colors">
              Request Portal Access →
            </Link>
          </div>
        </div>

        {/* FLOATING DECORATIONS */}
        <motion.div 
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-4 -right-8 w-20 h-20 bg-white rounded-3xl shadow-2xl flex items-center justify-center border border-slate-50"
          style={{ transform: "translateZ(80px)" }}
        >
          <Fingerprint className="text-[#86C232]" size={40} />
        </motion.div>
        
        <motion.div 
          animate={{ x: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-6 -left-10 px-6 py-3 bg-[#86C232] rounded-2xl flex items-center gap-3 shadow-xl shadow-[#86C232]/20"
          style={{ transform: "translateZ(100px)" }}
        >
          <ShieldCheck className="text-[#0A4D68]" size={18} />
          <span className="text-[10px] font-black text-[#0A4D68] uppercase tracking-wider">Enterprise Security</span>
        </motion.div>
      </motion.div>

      {/* SECURITY BAR */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 opacity-40">
        <Sparkles className="text-[#86C232]" size={14} />
        <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em]">Careergize Proprietary System</span>
      </div>
    </div>
  )
}