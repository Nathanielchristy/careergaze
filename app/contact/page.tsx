"use client"

import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Clock, MessageSquare, ShieldCheck, Zap } from "lucide-react"
// import CTA from "@/components/cta" // Reusing your existing CTA component

export default function ContactPage() {
  const contactInfo = [
    {
      icon: <Phone className="text-cyan-400" size={24} />,
      title: "Call Us",
      detail: "+91 80895 75258",
      sub: "Mon-Sat, 9am - 7pm IST",
    },
    {
      icon: <Mail className="text-cyan-400" size={24} />,
      title: "Email Us",
      detail: "info@careergize.com",
      sub: "Online support 24/7",
    },
    {
      icon: <MapPin className="text-cyan-400" size={24} />,
      title: "Visit Us",
      detail: "Global Tech Village",
      sub: "Bangalore, KA, India",
    },
  ]

  const faqs = [
    {
      q: "How soon will I get a response?",
      a: "Our team typically responds within 2-4 hours during business hours via WhatsApp or Email.",
    },
    {
      q: "Do you offer free consultations?",
      a: "Yes! Every new student is entitled to a 15-minute strategy session to architect their career roadmap.",
    },
    {
      q: "Can I switch services later?",
      a: "Absolutely. Our programs are modular; you can start with IT courses and move to internship placements seamlessly.",
    },
  ]

  return (
    <div className="bg-[#0B0E14] min-h-screen pt-32 pb-20 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-black uppercase tracking-[0.3em] mb-6"
          >
            <MessageSquare size={14} /> Contact Support
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6"
          >
            Let's build your <span className="text-cyan-400 text-glow">legacy.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg max-w-2xl mx-auto font-medium"
          >
            Have questions about our Ivy League pathways or IT internships? 
            Our career architects are ready to assist you.
          </motion.p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {contactInfo.map((info, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx }}
              className="p-8 rounded-[2rem] bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-all group"
            >
              <div className="w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {info.icon}
              </div>
              <h3 className="text-white font-bold text-xl mb-2">{info.title}</h3>
              <p className="text-white font-black text-lg mb-1 tracking-tight">{info.detail}</p>
              <p className="text-slate-500 text-sm font-medium">{info.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* The Main Contact Form (Reusing your CTA component) */}
        {/* <div className="mb-32">
            <CTA />
        </div> */}

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-white tracking-tight mb-4">Frequently Asked Questions</h2>
            <div className="h-1 w-20 bg-cyan-500 mx-auto rounded-full" />
          </div>
          
          <div className="grid gap-6">
            {faqs.map((faq, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-3xl bg-slate-900/50 border border-white/5"
              >
                <h4 className="text-cyan-400 font-bold mb-3 flex items-center gap-2">
                  <Zap size={16} /> {faq.q}
                </h4>
                <p className="text-slate-400 leading-relaxed font-medium">
                  {faq.a}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Trust Banner */}
        <div className="mt-32 p-10 rounded-[3rem] bg-gradient-to-r from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-cyan-500 flex items-center justify-center text-slate-950">
                    <ShieldCheck size={32} />
                </div>
                <div>
                    <h4 className="text-white font-black text-2xl tracking-tight">Data Privacy Guaranteed</h4>
                    <p className="text-slate-400 font-medium">Your information is encrypted and never shared with third parties.</p>
                </div>
            </div>
            <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-12 h-12 rounded-full border-4 border-[#0B0E14] bg-slate-800 overflow-hidden">
                        <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" />
                    </div>
                ))}
                <div className="w-12 h-12 rounded-full border-4 border-[#0B0E14] bg-cyan-500 flex items-center justify-center text-[10px] font-black text-slate-950">
                    100+
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}