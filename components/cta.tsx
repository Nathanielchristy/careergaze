"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Phone, Mail, Send, CheckCircle2, Shield, ArrowUpRight, Zap } from "lucide-react"

export default function CTA() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const message = `Name: ${formData.name}%0AEmail: ${formData.email}%0APhone: ${formData.phone}`
      const whatsappUrl = `https://wa.me/918089575258?text=${message}`
      window.open(whatsappUrl, "_blank")
      
      setIsSuccess(true)
      setTimeout(() => {
        setFormData({ name: "", email: "", phone: "" })
        setIsSuccess(false)
      }, 3000)
    } catch (error) {
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="cta" className="relative py-24 bg-white overflow-hidden">
      {/* Brand Ambient Glows */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#005A8D]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#A7FF00]/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="bg-white rounded-[3.5rem] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,90,141,0.1)] flex flex-col lg:flex-row items-stretch border border-slate-50">
          
          {/* Left Side: The "Power" Side */}
          <div className="lg:w-2/5 bg-slate-900 p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden">
            {/* Logo-inspired Gradient Flare */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#005A8D]/20 via-[#22C55E]/10 to-[#A7FF00]/20 rounded-full blur-3xl -mr-40 -mt-40" />
            
            <div className="relative z-10">
              <div className="mb-12 w-16 h-16 bg-gradient-to-br from-[#005A8D] to-[#22C55E] rounded-2xl flex items-center justify-center shadow-lg shadow-[#005A8D]/20">
                <Zap className="text-white w-8 h-8" />
              </div>
              
              <h2 className="text-4xl lg:text-6xl font-black tracking-tighter mb-8 leading-[0.95] text-white">
                Let's architect <br /> your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22C55E] to-[#A7FF00]">future</span> together.
              </h2>
              <p className="text-slate-400 mb-12 text-lg font-medium leading-relaxed">
                Unlock elite academic pathways and build a dominant digital brand with the Careergize blueprint.
              </p>

              <div className="space-y-6">
                <a href="tel:+918089575258" className="flex items-center gap-5 group">
                  <div className="w-12 h-12 bg-slate-800 border border-slate-700 rounded-xl flex items-center justify-center text-[#A7FF00] group-hover:bg-[#005A8D] group-hover:text-white transition-all duration-500">
                    <Phone size={20} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-black">Direct Line</span>
                    <span className="font-bold text-white text-xl tracking-tight">+91 80895 75258</span>
                  </div>
                </a>
                <a href="mailto:info@careergize.com" className="flex items-center gap-5 group">
                  <div className="w-12 h-12 bg-slate-800 border border-slate-700 rounded-xl flex items-center justify-center text-[#A7FF00] group-hover:bg-[#005A8D] group-hover:text-white transition-all duration-500">
                    <Mail size={20} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-black">Official Email</span>
                    <span className="font-bold text-white text-xl tracking-tight">info@careergize.com</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Bottom Trust Section */}
            <div className="relative z-10 pt-10 border-t border-slate-800 mt-16">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-5 h-5 text-[#22C55E]" />
                <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#22C55E]">Growth Guaranteed</span>
              </div>
              <p className="text-sm text-slate-500 font-bold">
                Trusted by 100+ high-achievers. Your data is 100% secure and private.
              </p>
            </div>
          </div>

          {/* Right Side: The "Action" Side */}
          <div className="lg:w-3/5 p-8 lg:p-20 bg-white flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  onSubmit={handleSubmit}
                  className="space-y-8"
                >
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Full Name</label>
                      <input
                        required
                        type="text"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border-2 border-transparent rounded-[1.25rem] px-6 py-5 text-slate-900 focus:border-[#005A8D] focus:bg-white transition-all outline-none placeholder:text-slate-300 font-bold text-lg"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Email Address</label>
                        <input
                          required
                          type="email"
                          name="email"
                          placeholder="hello@careergize.com"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full bg-slate-50 border-2 border-transparent rounded-[1.25rem] px-6 py-5 text-slate-900 focus:border-[#005A8D] focus:bg-white transition-all outline-none placeholder:text-slate-300 font-bold text-lg"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Mobile Number</label>
                        <input
                          required
                          type="tel"
                          name="phone"
                          placeholder="+91 00000 00000"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full bg-slate-50 border-2 border-transparent rounded-[1.25rem] px-6 py-5 text-slate-900 focus:border-[#005A8D] focus:bg-white transition-all outline-none placeholder:text-slate-300 font-bold text-lg"
                        />
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-20 bg-slate-900 hover:bg-[#005A8D] text-white font-black text-xl rounded-2xl transition-all duration-500 group mt-4 border-none shadow-2xl relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      {isSubmitting ? "Initiating..." : "Start Your Transformation"}
                      <ArrowUpRight className="ml-3 w-6 h-6 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </span>
                    {/* Hover Gradient Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#005A8D] to-[#22C55E] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </Button>
                  
                  <div className="flex items-center justify-center gap-10 py-4 border-t border-slate-50">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-[#22C55E]" />
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Priority Reply</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-[#22C55E]" />
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Free Consultation</span>
                    </div>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10"
                >
                  <div className="w-28 h-28 bg-[#A7FF00]/10 text-[#22C55E] rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 border-2 border-[#A7FF00]/20 shadow-xl">
                    <CheckCircle2 className="w-14 h-14" />
                  </div>
                  <h3 className="text-4xl font-black text-slate-900 mb-4 tracking-tighter">Strategizing...</h3>
                  <p className="text-slate-500 font-bold text-xl">Connecting you with our admissions & tech lead on WhatsApp.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}