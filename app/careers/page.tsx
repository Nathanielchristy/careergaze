"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Briefcase, MapPin, Clock, Search, 
  Upload, X, CheckCircle2, Loader2, 
  Terminal, ArrowRight
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useToast } from "@/components/ui/use-toast"

/* ==========================================================
   1. JOB DATA
   ========================================================== */
const JOBS = [
  {
    id: 'j1',
    title: 'Business Development Analyst',
    department: 'Marketing',
    location: 'Remote',
    type: 'Contract',
  },
  
]

/* ==========================================================
   2. MAIN COMPONENT
   ========================================================== */
export default function JobOpeningsPage() {
  const [selectedJob, setSelectedJob] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { toast } = useToast()

  const closeModal = () => {
    setSelectedJob(null)
    setIsSuccess(false)
  }

  const handleApplySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const fileInput = document.getElementById('resume-upload') as HTMLInputElement
    const file = fileInput?.files?.[0]

    if (!file) {
      toast({ title: "File Missing", description: "Please upload your resume.", variant: "destructive" })
      setIsSubmitting(false)
      return
    }

    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = async () => {
      try {
        const base64String = (reader.result as string).split(',')[1]
        
        const payload = {
          fullName: formData.get('fullName'),
          email: formData.get('email'),
          portfolio: formData.get('portfolio'),
          message: formData.get('message'),
          jobTitle: selectedJob.title,
          fileName: file.name,
          fileType: file.type,
          fileData: base64String
        }

        // UPDATED WITH YOUR NEW URL
        await fetch('https://script.google.com/macros/s/AKfycbyAU-k7A0LK9d38_ApKptziPZVuMOW4kq4pXs1td2y2PrzjSUZCFeIb_i5Lk6kz2uv2/exec', {
          method: 'POST',
          mode: 'no-cors', 
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })

        // Fake a small delay for better UX
        setTimeout(() => {
          setIsSuccess(true)
          setIsSubmitting(false)
          toast({ title: "Deployment Successful", description: "Data logged to Google Cloud." })
        }, 1200)

      } catch (error) {
        console.error("Submission error:", error)
        toast({ title: "Error", description: "System failure during sync.", variant: "destructive" })
        setIsSubmitting(false)
      }
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-slate-200 selection:bg-[#A7FF00] selection:text-black font-sans">
      {/* Background Effect */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Navigation Bar */}
      <nav className="border-b border-white/10 px-6 py-4 flex justify-between items-center bg-[#0A0A0B]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2 font-mono text-sm tracking-tighter">
          <div className="w-2 h-2 rounded-full bg-[#A7FF00] animate-pulse" />
          CAREERGIZE CAREERS
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-20 relative">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Hero Section */}
          <div className="lg:col-span-5 space-y-8">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <h1 className="text-6xl font-black tracking-tight leading-none text-white">
                APPLY TO <br />
                <span className="text-[#A7FF00]">NODE.</span>
              </h1>
              <p className="mt-6 text-slate-400 font-mono text-sm leading-relaxed max-w-sm">
                Submit your credentials to join our high-velocity team. 
              </p>
            </motion.div>

            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                placeholder="search_positions..."
                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 focus:border-[#A7FF00] outline-none font-mono text-sm transition-all text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Job List */}
          <div className="lg:col-span-7 space-y-3">
            {JOBS.filter(j => j.title.toLowerCase().includes(searchQuery.toLowerCase())).map((job) => (
              <motion.div 
                key={job.id}
                whileHover={{ scale: 1.01, backgroundColor: "rgba(255,255,255,0.04)" }}
                onClick={() => { setSelectedJob(job); setIsSuccess(false); }}
                className="group relative bg-white/[0.02] border border-white/10 p-6 rounded-xl transition-all cursor-pointer"
              >
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-white group-hover:text-[#A7FF00]">{job.title}</h3>
                    <div className="flex gap-4 text-xs font-mono text-slate-500">
                      <span>{job.department.toUpperCase()}</span>
                      <span className="opacity-30">/</span>
                      <span>{job.location.toUpperCase()}</span>
                    </div>
                  </div>
                  <ArrowRight className="text-slate-600 group-hover:text-[#A7FF00] transition-transform group-hover:translate-x-1" size={20} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* Slide-out Drawer */}
      <AnimatePresence>
        {selectedJob && (
          <div className="fixed inset-0 z-[100] flex items-center justify-end">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeModal} className="absolute inset-0 bg-black/80 backdrop-blur-md" />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="relative h-full w-full max-w-2xl bg-[#0A0A0B] border-l border-white/10 p-8 lg:p-16 overflow-y-auto">
              {isSuccess ? (
                <div className="h-full flex flex-col justify-center font-mono text-center">
                  <CheckCircle2 className="text-[#A7FF00] mx-auto mb-6" size={60} />
                  <h2 className="text-4xl font-bold text-white tracking-tighter">DATA_SYNCED_SUCCESSFULLY</h2>
                  <p className="mt-4 text-slate-500 italic text-sm">Our team will review your credentials shortly.</p>
                  <Button onClick={closeModal} className="mt-12 bg-[#A7FF00] text-black hover:bg-[#c1ff4d] rounded-none font-bold py-6 px-10 mx-auto">
                    BACK_TO_CAREERS
                  </Button>
                </div>
              ) : (
                <>
                  <button onClick={closeModal} className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors"><X size={24} /></button>
                  <div className="mb-12">
                    <p className="text-[#A7FF00] font-mono text-[10px] tracking-[0.2em] mb-2 uppercase">Protocol Application</p>
                    <h2 className="text-4xl font-black text-white">{selectedJob.title}</h2>
                  </div>

                  <form onSubmit={handleApplySubmit} className="space-y-8 font-mono">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase text-slate-500">Full Name</label>
                        <input name="fullName" required placeholder="required" className="w-full bg-white/5 border-b border-white/20 p-3 outline-none focus:border-[#A7FF00] text-white transition-all placeholder:opacity-20" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase text-slate-500">Email Address</label>
                        <input name="email" type="email" required placeholder="required" className="w-full bg-white/5 border-b border-white/20 p-3 outline-none focus:border-[#A7FF00] text-white transition-all placeholder:opacity-20" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase text-slate-500">Portfolio URL (Optional)</label>
                      <input name="portfolio" placeholder="https://" className="w-full bg-white/5 border-b border-white/20 p-3 outline-none focus:border-[#A7FF00] text-white transition-all" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase text-slate-500">Upload CV (PDF)</label>
                      <label className="flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-lg p-10 cursor-pointer hover:bg-white/[0.02] transition-all group">
                        <Upload size={32} className="text-slate-600 group-hover:text-[#A7FF00] mb-4" />
                        <span className="text-sm text-slate-400">SELECT_BINARY_FILE</span>
                        <input type="file" required id="resume-upload" className="hidden" accept=".pdf,.docx" />
                      </label>
                    </div>

                    <Button disabled={isSubmitting} className="w-full h-16 bg-[#A7FF00] text-black hover:bg-[#c1ff4d] rounded-none font-black text-lg shadow-[0_0_30px_rgba(167,255,0,0.15)]">
                      {isSubmitting ? <Loader2 className="animate-spin" /> : "SUBMIT APPLICATION"}
                    </Button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}