'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  Loader2, Calendar, Cpu, Users, ArrowRight, 
  X, GraduationCap, LayoutGrid, LogOut, MessageSquare, Menu
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

// --- CONFIGURATION ---
const ENROLLMENT_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx2gdjV00ysWEsD2rjNO_Y4BoK4WW0Md2qy3QhUcISfxkBpQlSEDE1953dWAoCmJnzv/exec'
const DATABASE_CHECK_URL = 'https://script.google.com/macros/s/AKfycbxCEYMCGy05ldMm0hJ2RIcyX1bsxvPPo6mc4AQvBzNcgWcXHu481hfc3qw97-i1231I/exec'

export default function InternshipEnrollment() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'redirecting'>('idle')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')
    setError('')

    const formData = new FormData(e.currentTarget)
    const email = (formData.get('email') as string).toLowerCase().trim()
    
    const enrollmentData = {
      fullName: formData.get('name') as string,
      email: email,
      phone: formData.get('phone') as string,
      college: formData.get('college') as string,
      track: formData.get('track') as string,
      startDate: formData.get('startDate') as string,
      status: 'Lead - Payment Pending',
      amount: '3500'
    }

    try {
      // 1. VERIFY IF EMAIL EXISTS IN DATABASE
      const verifyResponse = await fetch(`${DATABASE_CHECK_URL}?email=${encodeURIComponent(email)}`)
      const verifyData = await verifyResponse.json()
      console.log('Verification Response:', verifyData)
      if (verifyData.result !== 'success') {
        setError('Verification Failed: This email is not registered in our database. Please register first.')
        setStatus('idle')
        return // Stop the process here
      }

      // 2. IF VERIFIED, SAVE TO LOCALSTORAGE & POST TO ENROLLMENT SHEET
      localStorage.setItem('internshipData', JSON.stringify(enrollmentData))
      
      await fetch(ENROLLMENT_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(enrollmentData)
      })

      setStatus('redirecting')
      
      // Small delay for smooth transition
      setTimeout(() => {
        router.push('/internship-2026/payment')
      }, 1000)

    } catch (err) {
      console.error(err)
      setError('Connection Error: Could not reach the server. Please check your internet.')
      setStatus('idle')
    }
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans overflow-x-hidden">
      
      {/* --- SIDEBAR --- */}
      <aside className={`fixed inset-y-0 left-0 w-64 bg-[#0A4D68] text-white flex flex-col p-6 z-[60] transition-transform duration-300 lg:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="bg-[#86C232] p-2 rounded-lg">
              <GraduationCap className="text-[#0A4D68]" size={22} />
            </div>
            <span className="text-xl font-bold italic tracking-tight">Careergize</span>
          </div>
          <button onClick={() => setIsMobileMenuOpen(false)} className="lg:hidden p-1 hover:bg-white/10 rounded">
            <X size={20}/>
          </button>
        </div>
        
        <nav className="space-y-2 flex-1">
          <Link href="/services/college-admission">
            <SidebarItem icon={<LayoutGrid size={20}/>} label="Admissions" />
          </Link> 
          <SidebarItem icon={<MessageSquare size={20}/>} label="Support Team" />
        </nav>

        <div className="pt-6 border-t border-white/10">
          <SidebarItem 
            icon={<LogOut size={18} />} 
            label="Logout" 
            onClick={() => { localStorage.clear(); router.push('/login'); }} 
          />
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 flex flex-col min-w-0 lg:ml-64 transition-all">
        
        {/* MOBILE HEADER */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40 flex lg:hidden items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 text-[#0A4D68] hover:bg-slate-100 rounded-xl">
              <Menu size={24} />
            </button>
            <h2 className="text-[#0A4D68] font-black text-sm uppercase">Enrollment</h2>
          </div>
        </header>

        <div className="p-6 md:p-10 max-w-4xl mx-auto w-full">
          <div className="mb-10">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-[#0A4D68]">
              Enroll <span className="text-[#86C232]">Here</span>
            </h1>
            <p className="mt-2 text-slate-500 font-bold text-sm">Verify your details and start your journey.</p>
          </div>

          {/* ERROR ALERT */}
          {error && (
            <div className="mb-8 p-5 bg-red-50 border-l-4 border-red-500 rounded-2xl flex flex-col gap-2">
              <p className="text-red-700 font-black text-sm">{error}</p>
              <Link href="/register" className="text-xs text-red-600 underline font-bold">
                Don't have an account? Register here first →
              </Link>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Candidate Details */}
            <section className="bg-white p-6 md:p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
              <h2 className="text-lg font-black mb-8 flex items-center gap-3 text-[#0A4D68] uppercase tracking-tight">
                <Users className="text-[#86C232]" size={20} /> Identity Check
              </h2>
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
                <CustomInput label="Full Name" name="name" placeholder="John Doe" required />
                <CustomInput label="Email Address" name="email" type="email" placeholder="john@example.com" required />
                <CustomInput label="Phone Number" name="phone" placeholder="+91 00000 00000" required />
                <CustomInput label="College / University" name="college" placeholder="IIT Bombay" required />
              </div>
            </section>

            {/* Selection */}
            <section className="bg-white p-6 md:p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
              <h2 className="text-lg font-black mb-8 flex items-center gap-3 text-[#0A4D68] uppercase tracking-tight">
                <Cpu className="text-[#86C232]" size={20} /> Internship Details
              </h2>
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Select Track</Label>
                  <select name="track" required className="w-full h-12 rounded-xl px-5 bg-slate-50 border-none font-bold text-sm outline-none focus:ring-2 focus:ring-[#86C232] appearance-none">
                    <option value="">Select Track</option>
                    <option>Web Development</option>
                    <option>Digital Marketing</option>
                    <option>UI/UX Design</option>
                    <option>Data Science</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Preferred Start Date</Label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <Input type="date" name="startDate" className="pl-12 h-12 bg-slate-50 border-none rounded-xl font-bold" required />
                  </div>
                </div>
              </div>
            </section>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={status !== 'idle'}
              className="w-full h-16 bg-[#0A4D68] text-[#86C232] rounded-2xl text-lg font-black shadow-xl hover:bg-black transition-all"
            >
              {status === 'loading' ? (
                <div className="flex items-center gap-3">
                  <Loader2 className="animate-spin" /> VERIFYING & SAVING...
                </div>
              ) : status === 'redirecting' ? (
                'VERIFIED! OPENING PAYMENT...'
              ) : (
                <div className="flex items-center gap-2 uppercase tracking-widest text-sm">
                  Proceed to Enrollment <ArrowRight size={18} />
                </div>
              )}
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}

// --- SUB-COMPONENTS ---

function SidebarItem({ icon, label, active, onClick }: any) {
  return (
    <div 
      onClick={onClick} 
      className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${
        active 
          ? 'bg-[#86C232] text-[#0A4D68] font-bold shadow-lg shadow-[#86C232]/20' 
          : 'text-white/60 hover:text-white hover:bg-white/5'
      }`}
    >
      {icon} <span className="text-sm">{label}</span>
    </div>
  )
}

function CustomInput({ label, ...props }: any) {
  return (
    <div className="space-y-2">
      <Label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">
        {label}
      </Label>
      <Input 
        className="h-12 bg-slate-50 border-none rounded-xl font-bold px-5 focus:ring-2 focus:ring-[#86C232] placeholder:text-slate-300" 
        {...props} 
      />
    </div>
  )
}