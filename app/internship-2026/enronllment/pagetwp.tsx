'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  Loader2, Calendar, Cpu, Users, ChevronLeft, ArrowRight, 
  Menu, X, GraduationCap, LayoutGrid, LogOut, MessageSquare, AlertCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

/* ✅ YOUR SCRIPT URLS */
// The sheet where enrollment data is SAVED
const ENROLL_POST_URL = 'https://script.google.com/macros/s/AKfycbx2gdjV00ysWEsD2rjNO_Y4BoK4WW0Md2qy3QhUcISfxkBpQlSEDE1953dWAoCmJnzv/exec'
// The sheet where registered users are CHECKED (from your previous prompt)
const REGISTRATION_CHECK_URL = 'https://script.google.com/macros/s/AKfycbyN3pJ89QNfLVGUHIo2osxNewnnWOLI3AC3x1a7kRxGvoCjCquNMhVJL2FMazEeboU/exec'

export default function InternshipEnrollment() {
  const router = useRouter()
  const [status, setStatus] = useState<'idle' | 'loading' | 'redirecting'>('idle')
  const [error, setError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  /* ✅ Payroll-style Safe Fetch Logic */
  const verifyUserRegistration = async (inputEmail: string, inputName: string) => {
    try {
      const res = await fetch(`${REGISTRATION_CHECK_URL}?action=getUsers&t=${Date.now()}`)
      const text = await res.text()
      const result = JSON.parse(text)
      
      const userList = result.users || result.students || result.data || []
      
      // ✅ Payroll-style Merging/Matching Logic
      return userList.find((u: any) => {
        const dbEmail = (u.Email || u.email || u.emailAddress || "").toLowerCase().trim()
        const dbName = (u.Name || u.name || u.fullName || "").toLowerCase().trim()
        const dbStatus = (u.Status || u.status || "").toLowerCase().trim()

        return (
          dbEmail === inputEmail.toLowerCase().trim() && 
          dbName === inputName.toLowerCase().trim() &&
          dbStatus === 'approved' // Only let approved registrations through
        )
      })
    } catch (err) {
      console.error('Verification failed', err)
      return null
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')
    setError(null)

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const name = formData.get('name') as string

    // 1. PERFORM THE CHECK (Payroll Reference Logic)
    const registeredUser = await verifyUserRegistration(email, name)

    if (!registeredUser) {
      setError("Registration not found or not yet 'Approved'. Please register first or contact support.")
      setStatus('idle')
      return
    }

    // 2. IF VERIFIED, PREPARE DATA
    const enrollmentData = {
      fullName: name,
      email: email,
      phone: formData.get('phone') as string,
      college: formData.get('college') as string,
      track: formData.get('track') as string,
      startDate: formData.get('startDate') as string,
      status: 'Lead - Payment Pending',
      amount: '3500'
    }

    try {
      localStorage.setItem('internshipData', JSON.stringify(enrollmentData))
      
      // 3. POST TO ENROLLMENT SHEET
      await fetch(ENROLL_POST_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(enrollmentData)
      })

      setStatus('redirecting')
      router.push('/internship-2026/payment')
    } catch (err) {
      setError("Submission failed. Please try again.")
      setStatus('idle')
    }
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans overflow-x-hidden">
      
      {/* SIDEBAR (Consistent with Admin Style) */}
      <aside className={`fixed inset-y-0 left-0 w-64 bg-[#0A4D68] text-white flex flex-col p-6 z-[60] transition-transform duration-300 lg:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="bg-[#86C232] p-2 rounded-lg"><GraduationCap className="text-[#0A4D68]" size={22} /></div>
            <span className="text-xl font-bold italic tracking-tight">Careergize</span>
          </div>
          <button onClick={() => setIsMobileMenuOpen(false)} className="lg:hidden p-1 hover:bg-white/10 rounded"><X size={20}/></button>
        </div>
        
        <nav className="space-y-2 flex-1">
          <Link href="/services/college-admission"><SidebarItem icon={<LayoutGrid size={20}/>} label="Enrollment Hub" active/></Link> 
          <SidebarItem icon={<MessageSquare size={20}/>} label="Support Chat" />
        </nav>

        <div className="pt-6 border-t border-white/10">
          <SidebarItem icon={<LogOut size={18} />} label="Logout" onClick={() => { localStorage.clear(); router.push('/login'); }} />
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col min-w-0 lg:ml-64">
        <header className="h-20 bg-white/80 backdrop-blur-md border-b flex lg:hidden items-center justify-between px-6">
          <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 text-[#0A4D68] hover:bg-slate-100 rounded-xl"><Menu size={24} /></button>
          <h2 className="text-[#0A4D68] font-black text-sm uppercase">Verification</h2>
        </header>

        <div className="p-6 md:p-10 max-w-4xl mx-auto w-full">
          <div className="mb-10">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-[#0A4D68]">
              Final <span className="text-[#86C232]">Enrollment</span>
            </h1>
            <p className="mt-2 text-slate-500 font-bold text-sm">Energize your career with Careergize.</p>
          </div>

          {/* Error Message Box */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-xl flex items-center gap-3 text-red-700 animate-pulse">
              <AlertCircle size={20} />
              <p className="text-xs font-bold uppercase tracking-wide">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
              <h2 className="text-lg font-black mb-8 flex items-center gap-3 text-[#0A4D68] uppercase tracking-tight">
                <Users className="text-[#86C232]" size={20} /> Personal Details
              </h2>
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
                <CustomInput label="Full Name" name="name" placeholder="As per registration" required />
                <CustomInput label="Email Address" name="email" type="email" placeholder="john@example.com" required />
                <CustomInput label="Phone Number" name="phone" placeholder="+91" required />
                <CustomInput label="College / University" name="college" placeholder="Your College" required />
              </div>
            </section>

            <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
              <h2 className="text-lg font-black mb-8 flex items-center gap-3 text-[#0A4D68] uppercase tracking-tight">
                <Cpu className="text-[#86C232]" size={20} /> Selection
              </h2>
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase text-slate-400 ml-1">Internship Track</Label>
                  <select name="track" required className="w-full h-12 rounded-xl px-5 bg-slate-50 border-none font-bold text-sm focus:ring-2 focus:ring-[#86C232] outline-none">
                    <option value="">Select Track</option>
                    <option>Web Development</option>
                    <option>Digital Marketing</option>
                    <option>UI/UX Design</option>
                    <option>Data Science</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase text-slate-400 ml-1">Start Date</Label>
                  <Input type="date" name="startDate" className="h-12 bg-slate-50 border-none rounded-xl font-bold" required />
                </div>
              </div>
            </section>

            <Button
              type="submit"
              disabled={status !== 'idle'}
              className="w-full h-16 bg-[#0A4D68] text-[#86C232] rounded-2xl text-lg font-black shadow-xl shadow-[#0A4D68]/10 hover:bg-black transition-all"
            >
              {status === 'loading' ? (
                <div className="flex items-center gap-3"><Loader2 className="animate-spin" /> VERIFYING & SYNCING...</div>
              ) : status === 'redirecting' ? (
                'SUCCESS! REDIRECTING...'
              ) : (
                <div className="flex items-center gap-2 uppercase tracking-widest text-sm">
                  Complete Registration <ArrowRight size={18} />
                </div>
              )}
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}

/* REUSABLE UI COMPONENTS */

function SidebarItem({ icon, label, active, onClick }: any) {
  return (
    <div onClick={onClick} className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${active ? 'bg-[#86C232] text-[#0A4D68] font-bold shadow-lg shadow-[#86C232]/20' : 'text-white/60 hover:text-white hover:bg-white/5'}`}>
      {icon} <span className="text-sm">{label}</span>
    </div>
  )
}

function CustomInput({ label, ...props }: any) {
  return (
    <div className="space-y-2">
      <Label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">{label}</Label>
      <Input className="h-12 bg-slate-50 border-none rounded-xl font-bold px-5 focus:ring-2 focus:ring-[#86C232] placeholder:text-slate-300" {...props} />
    </div>
  )
}