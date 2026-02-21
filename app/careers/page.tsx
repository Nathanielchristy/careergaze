"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Briefcase, MapPin, Clock, Search, 
  Upload, X, ChevronRight, FileText, 
  CheckCircle2, Globe, Building2, Sparkles 
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useToast } from "@/components/ui/use-toast"

/* =====================
   MOCK JOB DATA
===================== */
const JOBS = [
  {
    id: 'j2',
    title: 'Business Development Analyst',
    department: 'Marketing',
    location: 'Remote',
    type: 'Contract',
    salary: '$40k - $60k',
    tags: ['Technical SEO', 'Analytics', 'Content']
  },
 
]

export default function JobOpeningsPage() {
  const [selectedJob, setSelectedJob] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const { toast } = useToast()

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Application Sent!",
      description: "Our recruitment team will review your profile and get back to you.",
    })
    setSelectedJob(null)
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#020617] font-sans">
      
      {/* HERO SECTION */}
      <section className="pt-24 pb-16 px-6 bg-[#020617] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#A7FF00]/10 blur-[120px] rounded-full" />
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-[#A7FF00] text-xs font-black uppercase tracking-[0.4em] mb-4 block">Careers at Careergize</span>
            <h1 className="text-5xl lg:text-7xl font-black tracking-tighter mb-6">
              Build the Future of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22C55E] to-[#A7FF00]">
                Digital Excellence.
              </span>
            </h1>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg mb-10">
              Join a team of elite engineers, designers, and strategists. We’re looking for high-velocity talent to scale our global infrastructure.
            </p>
          </motion.div>

          {/* SEARCH BAR */}
          <div className="max-w-xl mx-auto relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#A7FF00] transition-colors" size={20} />
            <Input 
              placeholder="Search roles (e.g. Engineer, SEO)..."
              className="h-16 pl-14 pr-6 rounded-2xl bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-[#A7FF00]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* JOB LISTINGS */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl font-black tracking-tight flex items-center gap-2">
            Open Positions <span className="text-sm font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{JOBS.length}</span>
          </h2>
        </div>

        <div className="space-y-4">
          {JOBS.filter(j => j.title.toLowerCase().includes(searchQuery.toLowerCase())).map((job) => (
            <motion.div 
              key={job.id}
              whileHover={{ x: 10 }}
              className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:border-[#22C55E]/30 transition-all cursor-pointer group"
              onClick={() => setSelectedJob(job)}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-[#005A8D] group-hover:bg-[#005A8D] group-hover:text-white transition-colors">
                    <Briefcase size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold group-hover:text-[#005A8D] transition-colors">{job.title}</h3>
                    <div className="flex flex-wrap gap-4 mt-1 text-sm text-slate-500 font-medium">
                      <span className="flex items-center gap-1"><Building2 size={14}/> {job.department}</span>
                      <span className="flex items-center gap-1"><MapPin size={14}/> {job.location}</span>
                      <span className="flex items-center gap-1"><Clock size={14}/> {job.type}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Button className="bg-[#020617] hover:bg-[#22C55E] text-white rounded-xl px-6 font-bold">
                    Apply Now
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* APPLICATION DRAWER / MODAL */}
      <AnimatePresence>
        {selectedJob && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedJob(null)}
              className="fixed inset-0 bg-[#020617]/60 backdrop-blur-sm z-[100]"
            />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full max-w-xl bg-white z-[110] shadow-2xl p-8 lg:p-12 overflow-y-auto"
            >
              <button onClick={() => setSelectedJob(null)} className="absolute top-8 right-8 p-2 hover:bg-slate-100 rounded-full">
                <X size={24} />
              </button>

              <div className="mb-10">
                <span className="text-[10px] font-black text-[#22C55E] uppercase tracking-[0.3em] bg-[#22C55E]/10 px-3 py-1 rounded-full">Application Now</span>
                <h2 className="text-3xl font-black mt-4">{selectedJob.title}</h2>
                <p className="text-slate-500 mt-2 font-medium">{selectedJob.department} • {selectedJob.location}</p>
              </div>

              <form onSubmit={handleApplySubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Full Name</label>
                    <Input required placeholder="John Doe" className="rounded-xl border-slate-100 bg-slate-50 h-12" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Email Address</label>
                    <Input required type="email" placeholder="john@example.com" className="rounded-xl border-slate-100 bg-slate-50 h-12" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Portfolio / LinkedIn URL</label>
                  <Input placeholder="https://..." className="rounded-xl border-slate-100 bg-slate-50 h-12" />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Why Careergize?</label>
                  <textarea 
                    className="w-full min-h-[120px] rounded-xl border-slate-100 bg-slate-50 p-4 text-sm focus:ring-2 focus:ring-[#22C55E] outline-none"
                    placeholder="Tell us what excites you about this role..."
                  />
                </div>

                {/* RESUME UPLOAD ZONE */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Resume / CV</label>
                  <div className="border-2 border-dashed border-slate-200 rounded-[2rem] p-8 text-center hover:border-[#22C55E] transition-colors group bg-slate-50/50">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-slate-400 group-hover:text-[#22C55E] transition-colors">
                      <Upload size={20} />
                    </div>
                    <p className="text-sm font-bold text-slate-600">Click to upload or drag and drop</p>
                    <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-tighter">PDF, DOCX up to 10MB</p>
                    <input type="file" className="hidden" id="resume-upload" />
                    <Button 
                      type="button"
                      variant="ghost" 
                      className="mt-4 text-[#005A8D] font-black text-xs uppercase tracking-widest"
                      onClick={() => document.getElementById('resume-upload')?.click()}
                    >
                      Select File
                    </Button>
                  </div>
                </div>

                <Button className="w-full h-16 bg-[#020617] hover:bg-black text-white font-black rounded-2xl text-lg shadow-xl shadow-slate-200">
                  SUBMIT APPLICATION
                </Button>
                <p className="text-center text-[10px] text-slate-400 font-medium px-8">
                  By submitting, you agree to our Terms of Service and Privacy Policy regarding applicant data.
                </p>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* FOOTER CTA */}
      <section className="bg-white border-t border-slate-100 py-20 px-6 text-center">
        <h2 className="text-3xl font-black mb-4 tracking-tighter">Don't see a perfect fit?</h2>
        <p className="text-slate-500 mb-8 max-w-lg mx-auto font-medium">
          We’re always looking for exceptional talent. Send us an open application and we'll keep you in our talent pool.
        </p>
        <Button variant="outline" className="rounded-xl border-slate-200 font-bold px-10 h-12 hover:bg-slate-50">
          General Application
        </Button>
      </section>
    </div>
  )
}