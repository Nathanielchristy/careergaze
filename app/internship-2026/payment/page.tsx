'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  ShieldCheck, CheckCircle2, ArrowLeft, Loader2, Copy, Check, Hash 
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwfikop7AY4_J4Ip42UWYZytOt3RWFSsquuyKBfpgayUDOVdhD7oqfCYCem86qpb3CZpg/exec'

export default function PaymentPage() {
  const router = useRouter()
  const [isUploading, setIsUploading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [txnId, setTxnId] = useState('')
  const [copied, setCopied] = useState(false)
  const [studentInfo, setStudentInfo] = useState<any>(null)

  // Load the full object from the enrollment step
  useEffect(() => {
    const stored = localStorage.getItem('internshipData')
    if (!stored) {
      router.push('/internship-2026')
      return
    }
    setStudentInfo(JSON.parse(stored))
  }, [router])

  const copyUPI = () => {
    navigator.clipboard.writeText("careergize2802@fbi")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleFinish = async () => {
    if (!txnId.trim()) {
      alert("Please enter the Transaction ID to continue.")
      return
    }
    
    setIsUploading(true)

    // Spread the existing studentInfo so we don't lose College, Track, Phone, etc.
    const payload = {
      ...studentInfo,
      status: "Verifying Transaction",
      transactionId: txnId.trim(),
      amount: "3500"
    }

    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload)
      })

      localStorage.removeItem('internshipData')
      setIsSuccess(true)
    } catch (err) {
      console.error("Upload error:", err)
      alert("Submission failed. Please check your connection.")
    } finally {
      setIsUploading(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#FDFEFF] flex items-center justify-center p-6">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md w-full text-center bg-white p-10 rounded-[3rem] shadow-2xl border border-slate-50">
          <div className="w-20 h-20 bg-[#86C232] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#86C232]/30">
            <CheckCircle2 size={40} className="text-white" />
          </div>
          <h2 className="text-3xl font-black text-[#0A4D68] mb-4 text-balance">Details Logged</h2>
          <p className="text-slate-500 font-medium mb-8 text-sm text-balance">
            Hi {studentInfo?.fullName?.split(' ')[0] || 'there'}, your Transaction ID has been submitted. Verification will be completed within 24-48 hours.
          </p>
          <Link href="/"><Button className="w-full h-14 bg-[#0A4D68] text-[#86C232] rounded-2xl font-black">EXIT PORTAL</Button></Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FDFEFF] text-[#0A4D68] py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/internship-2026" className="inline-flex items-center gap-2 text-slate-400 font-bold text-xs mb-8 hover:text-[#0A4D68]">
          <ArrowLeft size={14} /> RE-EDIT DETAILS
        </Link>

        <header className="mb-10 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4">
            <ShieldCheck size={12} /> Secure Transaction Log
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter italic text-balance">Secure Your <span className="text-[#86C232]">Placement</span></h1>
        </header>

        <div className="grid md:grid-cols-2 gap-10">
          {/* LEFT COLUMN: SCANNER */}
          <div className="bg-white p-6 rounded-[2.5rem] shadow-xl border border-slate-50 text-center relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1.5 bg-[#86C232]" />
            <div className="relative w-full aspect-square bg-white rounded-2xl mb-6 overflow-hidden border-2 border-slate-100 p-2">
              <div className="relative w-full h-full rounded-xl overflow-hidden shadow-inner">
                <Image 
                  src="/careergize_scanner.jpeg" 
                  alt="Careergize UPI Scanner"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="absolute top-4 left-4 w-6 h-6 border-t-4 border-l-4 border-[#86C232] rounded-tl-lg" />
              <div className="absolute top-4 right-4 w-6 h-6 border-t-4 border-r-4 border-[#86C232] rounded-tr-lg" />
              <div className="absolute bottom-4 left-4 w-6 h-6 border-b-4 border-l-4 border-[#86C232] rounded-bl-lg" />
              <div className="absolute bottom-4 right-4 w-6 h-6 border-b-4 border-r-4 border-[#86C232] rounded-br-lg" />
            </div>
            
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Scan with any UPI App</p>
            
            <button onClick={copyUPI} className="flex items-center gap-2 mx-auto bg-slate-50 px-4 py-2 rounded-xl border border-slate-200 hover:bg-white transition-all group">
              <span className="font-bold text-xs text-[#0A4D68]">careergize2802@fbi</span>
              {copied ? <Check size={14} className="text-[#86C232]" /> : <Copy size={14} className="text-slate-300 group-hover:text-[#0A4D68]" />}
            </button>
          </div>

          {/* RIGHT COLUMN: DETAILS & TRANSACTION ID */}
          <div className="space-y-6">
            <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-xl">
               <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#86C232] mb-1">Registration Investment</p>
               <h3 className="text-4xl font-black tracking-tight">₹ 3500.00</h3>
               <div className="h-px bg-white/10 my-6" />
               <p className="text-[10px] opacity-70 leading-relaxed italic text-balance">Verify your payment by entering the 12-digit UTR/Transaction ID below.</p>
            </div>

            <div className="space-y-4">
              <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">UPI Transaction ID (UTR)</Label>
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#86C232] transition-colors">
                  <Hash size={20} />
                </div>
                <Input 
                  type="text" 
                  placeholder="e.g. 412300998811"
                  value={txnId}
                  onChange={(e) => setTxnId(e.target.value)}
                  className="h-16 pl-14 bg-white border-2 border-slate-100 rounded-2xl font-bold text-lg focus:border-[#86C232] transition-all shadow-inner text-black"
                />
              </div>
            </div>

            <Button 
              onClick={handleFinish} 
              disabled={!txnId || isUploading} 
              className="w-full h-20 bg-[#0A4D68] hover:bg-black text-[#86C232] rounded-[2rem] text-xl font-black shadow-lg shadow-black/10 transition-all disabled:opacity-50"
            >
              {isUploading ? (
                <div className="flex items-center gap-3">
                  <Loader2 className="animate-spin" />
                  <span>VERIFYING...</span>
                </div>
              ) : "FINISH ENROLLMENT"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}