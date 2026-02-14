'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Mail, ArrowLeft, CheckCircle2, Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleResetRequest = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Replace with your Google Script URL
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwqpmcrYXG_bLhg_LBdHG9P5T0jbMp7d9TeFFZP_skP7VXjWo08pTRKeb_C-Pi6BkPe/exec'

    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify({ action: 'forgotPassword', email: email })
      })
      setIsSubmitted(true)
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex items-center justify-center p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-[460px]">
        <div className="bg-white border border-slate-100 p-8 md:p-12 rounded-[3rem] shadow-2xl">
          
          {!isSubmitted ? (
            <>
              <Link href="/login" className="flex items-center gap-2 text-slate-400 hover:text-[#0A4D68] text-xs font-bold mb-8 transition-colors">
                <ArrowLeft size={16} /> BACK TO LOGIN
              </Link>
              <h2 className="text-3xl font-black text-[#0A4D68] tracking-tighter mb-2">Reset Password</h2>
              <p className="text-slate-500 text-sm mb-8 font-medium">Enter your email and we'll notify the admin to reset your access.</p>

              <form onSubmit={handleResetRequest} className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Registered Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <Input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="h-14 pl-12 bg-slate-50/50 rounded-2xl border-slate-100 focus:ring-[#86C232]" placeholder="your@email.com" />
                  </div>
                </div>
                <Button disabled={isLoading} className="w-full h-14 bg-[#0A4D68] text-white font-bold rounded-2xl">
                  {isLoading ? <Loader2 className="animate-spin" /> : "Request Reset"}
                </Button>
              </form>
            </>
          ) : (
            <div className="text-center py-6">
              <div className="w-20 h-20 bg-green-50 text-[#86C232] rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={40} />
              </div>
              <h2 className="text-2xl font-black text-[#0A4D68] mb-2">Request Sent!</h2>
              <p className="text-slate-500 text-sm mb-8">The admin has been notified. Please check back shortly or contact support.</p>
              <Link href="/login">
                <Button variant="outline" className="w-full h-14 rounded-2xl border-slate-200 text-[#0A4D68] font-bold">Return to Login</Button>
              </Link>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}