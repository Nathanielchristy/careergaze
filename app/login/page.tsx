'use client'

import React, { useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  Lock, Mail, Eye, EyeOff, Loader2, 
  ArrowRight, AlertCircle 
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function CareergizeLogin() {
  const router = useRouter()
  
  // STATE MANAGEMENT
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  
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

  // LOGIN HANDLER
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw88Ck1hh6Z78G5wYYvEtD9mlvEv-U4eQ7NrRmDjRsl2WbPKBdhgqCVpt7tqJucDAG0/exec'

    try {
      const response = await fetch(
        `${SCRIPT_URL}?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
      )
      
      const data = await response.json()

      if (data.result === 'success') {
        // 1. Save Session Data
        localStorage.setItem('userName', data.name)
        localStorage.setItem('userEmail', email)
        localStorage.setItem('isLoggedIn', 'true')
        
        // 2. ROLE-BASED ROUTING
        // Check if the name in the Google Sheet is exactly "Varun"
       if (data.name && (data.name.toLowerCase() === 'varun' || data.name.toLowerCase() === 'adithyan')) {
    localStorage.setItem('userRole', 'admin')
    router.push('/dashboard/admin') // Redirect to Admin Page
} else {
    localStorage.setItem('userRole', 'intern')
    router.push('/dashboard') // Redirect to Normal Dashboard
}
      } else {
        setError(data.message || 'Access Denied. Please check your credentials.')
      }
    } catch (err) {
      console.error("Login Error:", err)
      setError('Connection failed. Please check your internet or try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex items-center justify-center p-6 overflow-hidden font-sans">
      
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
        <div 
          style={{ transform: "translateZ(50px)" }}
          className="bg-white/70 backdrop-blur-2xl border border-slate-100 p-8 md:p-12 rounded-[3rem] shadow-[0_40px_80px_-15px_rgba(10,77,104,0.15)]"
        >
          {/* LOGO & BRANDING */}
          <div className="flex flex-col items-center mb-10 text-center" style={{ transform: "translateZ(40px)" }}>
            <div className="w-20 h-20 relative p-1 rounded-3xl bg-gradient-to-tr from-[#0A4D68] to-[#86C232] shadow-lg mb-6">
              <div className="w-full h-full bg-white rounded-[22px] overflow-hidden relative">
                 <Image src="/logo.jpeg" alt="Careergize" fill className="object-cover" />
              </div>
            </div>
            <h1 className="text-3xl font-black text-[#0A4D68] tracking-tighter">
              Careergize<span className="text-[#86C232]">.</span>
            </h1>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em] mt-2">Member Portal Access</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6" style={{ transform: "translateZ(30px)" }}>
            
            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-xs font-bold"
              >
                <AlertCircle size={16} />
                {error}
              </motion.div>
            )}

            <div className="group space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-focus-within:text-[#0A4D68] ml-1">Email</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#0A4D68] transition-colors" size={18} />
                <Input 
                  required
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-14 pl-12 bg-slate-50/50 border-slate-100 rounded-2xl focus:ring-4 focus:ring-[#86C232]/10 focus:border-[#86C232] transition-all"
                  placeholder="name@email.com"
                />
              </div>
            </div>

            <div className="group space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-focus-within:text-[#0A4D68] ml-1">Password</Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#0A4D68] transition-colors" size={18} />
                <Input 
                  required
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full h-14 bg-[#0A4D68] hover:bg-[#0A4D68]/90 text-white font-bold text-lg rounded-2xl shadow-xl shadow-[#0A4D68]/20 transition-all border-none"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <>Log In <ArrowRight className="ml-2" size={20} /></>
                )}
              </Button>
            </motion.div>
          </form>

          <div className="mt-10 pt-6 border-t border-slate-50 flex flex-col items-center gap-4" style={{ transform: "translateZ(20px)" }}>
            <Link href="/register" className="text-xs font-bold text-[#86C232] hover:text-[#0A4D68] transition-colors">
              Request Portal Access →
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}