"use client"

import { motion } from "framer-motion"
import { ArrowRight, CheckCircle2, MoveRight } from "lucide-react"
import { useRef } from "react"

const steps = [
  {
    number: "01",
    title: "Strategic Consultation",
    description: "Connect with our experts to audit your goals and map out your unique competitive advantages.",
    image: "/consultation-meeting-discussion-career-goals.jpg",
    accent: "#005A8D" // Logo Blue
  },
  {
    number: "02",
    title: "The Growth Blueprint",
    description: "We architect a personalized roadmap combining technical assets and career strategy.",
    image: "/strategic-planning-roadmap-business-strategy.jpg",
    accent: "#22C55E" // Mid-way Green
  },
  {
    number: "03",
    title: "Guided Execution",
    description: "Launch your strategy with end-to-end support to ensure your success is permanent.",
    image: "/team-support-mentoring-professional-guidance.jpg",
    accent: "#A7FF00" // Logo Lime
  },
]

export default function HowItWorks() {
  const containerRef = useRef(null)
  
  return (
    <section id="how" className="py-24 bg-white overflow-hidden" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="relative mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-gradient-to-r from-[#005A8D] to-[#A7FF00]" />
              <span className="text-xs font-black uppercase tracking-[0.3em] text-[#005A8D]">
                the process
              </span>
            </div>
            
            <h3 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter leading-none mb-8">
              Engineered for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#005A8D] to-[#22C55E]">Success.</span>
            </h3>
            <p className="text-xl text-slate-500 font-medium max-w-lg">
              A high-precision framework designed to take you from vision to undisputed authority.
            </p>
          </motion.div>
        </div>

        {/* Steps Grid */}
        <div className="grid lg:grid-cols-3 gap-10 relative">
          
          {/* Brand Gradient Connector Path (Desktop) */}
          <div className="hidden lg:block absolute top-[20%] left-[10%] right-[10%] z-0 h-[2px]">
            <div className="w-full h-full bg-gradient-to-r from-[#005A8D] via-[#22C55E] to-[#A7FF00] opacity-20" />
            <div className="absolute top-0 left-0 w-full h-full border-b-2 border-dashed border-slate-300 opacity-30" />
          </div>

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group relative z-10"
            >
              <div className="relative bg-white rounded-[3rem] border border-slate-50 p-6 transition-all duration-500 hover:shadow-[0_40px_80px_-20px_rgba(0,90,141,0.08)]">
                
                {/* Image Section with Logo-Gradient Frame */}
                <div className="relative h-64 w-full rounded-[2.2rem] overflow-hidden mb-8 border-4 border-white shadow-sm">
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
                  
                  {/* Floating Step Number */}
                  <div 
                    className="absolute top-4 left-4 px-4 py-2 rounded-2xl backdrop-blur-md text-white font-black text-sm border border-white/20"
                    style={{ backgroundColor: `${step.accent}cc` }}
                  >
                    {step.number}
                  </div>
                </div>

                {/* Content */}
                <div className="px-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-2xl font-black text-slate-900 tracking-tight transition-colors group-hover:text-[#005A8D]">
                      {step.title}
                    </h4>
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 opacity-20 group-hover:opacity-100"
                      style={{ color: step.accent }}
                    >
                      <CheckCircle2 size={24} />
                    </div>
                  </div>
                  <p className="text-slate-500 font-medium leading-relaxed text-base">
                    {step.description}
                  </p>
                </div>

                {/* Action Link Footer */}
               
              </div>

              {/* Mobile Transition Icon */}
              {index < steps.length - 1 && (
                <div className="lg:hidden flex justify-center py-6 text-slate-200">
                  <ArrowRight className="rotate-90" size={32} style={{ color: step.accent }} />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Brand Bottom Indicator */}
        <div className="mt-24 h-2 w-full bg-slate-50 rounded-full overflow-hidden relative">
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            className="absolute inset-0 bg-gradient-to-r from-[#005A8D] via-[#22C55E] to-[#A7FF00]"
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </div>
      </div>
    </section>
  )
}