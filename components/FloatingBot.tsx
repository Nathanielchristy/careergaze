'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Bot, Sparkles, X } from 'lucide-react'
import Link from 'next/link'

// Define the logic for specific redirects based on the message shown
const botCampaigns = [
  { text: "need a career roadmap? 🗺️", path: "/get-blueprint" },
  { text: "start your college admission.", path: "/services/college-admission" }, // Or specific admission page
  { text: "build your digital product.", path: "/services/web-development" },
  { text: "internship programs started", path: "/internship-2026" },
  { text: "scale with digital marketing.", path: "/services/digital-marketing" },
]

export default function FloatingBot() {
  const [index, setIndex] = useState(0)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % botCampaigns.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  if (isDismissed) return null

  // Helper to get current campaign
  const currentCampaign = botCampaigns[index]

  return (
    <div className="fixed bottom-32 right-8 z-[100] flex flex-col items-end gap-3 pointer-events-none">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 20, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 20, scale: 0.8 }}
          className="bg-white border border-slate-100 shadow-2xl rounded-2xl px-5 py-3 pointer-events-auto relative group max-w-[200px]"
        >
          {/* Close button */}
          <button 
            onClick={() => setIsDismissed(true)}
            className="absolute -top-2 -right-2 bg-white border border-slate-100 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
          >
            <X size={10} className="text-slate-400" />
          </button>

          {/* Dynamic Link based on the message */}
          <Link href={currentCampaign.path}>
            <p className="text-[11px] font-black lowercase tracking-tighter text-slate-900 flex items-center gap-2 cursor-pointer leading-tight">
              <Sparkles size={12} className="text-[#A7FF00] shrink-0" />
              {currentCampaign.text}
            </p>
          </Link>
        </motion.div>
      </AnimatePresence>

      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-auto"
      >
        {/* The Icon also redirects to the current active campaign */}
        <Link href={currentCampaign.path}>
          <div className="relative w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center border-2 border-slate-800 shadow-xl group cursor-pointer hover:border-[#A7FF00] transition-all">
            <div className="absolute inset-0 bg-[#A7FF00]/10 blur-lg rounded-full animate-pulse" />
            <Bot className="text-white group-hover:text-[#A7FF00] transition-colors" size={22} />
          </div>
        </Link>
      </motion.div>
    </div>
  )
}