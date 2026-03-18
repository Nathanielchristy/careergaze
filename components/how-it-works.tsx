"use client"

import { motion } from "framer-motion"
import { CheckCircle2, ChevronRight, GraduationCap, Map, Send } from "lucide-react"
import { useRef } from "react"

const steps = [
  {
    number: "01",
    title: "Profile Assessment",
    description: "Our experts evaluate your academic history and extracurriculars to identify your strongest university matches.",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=800",
    accent: "#002147" // Navy
  },
  {
    number: "02",
    title: "Strategic Blueprint",
    description: "We craft a personalized application roadmap, including SOP drafting and scholarship strategy.",
    image: "https://images.unsplash.com/photo-1523050335392-93851179ae22?auto=format&fit=crop&q=80&w=800",
    accent: "#D4AF37" // Gold
  },
  {
    number: "03",
    title: "Final Enrollment",
    description: "Navigate interview prep, visa processing, and document filing with end-to-end counselor support.",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800",
    accent: "#22C55E" // Success Green
  },
]

export default function HowItWorks() {
  const containerRef = useRef(null)
  
  return (
    <section id="how" className="py-24 bg-[#FDFDFD] overflow-hidden" ref={containerRef}>
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
              <div className="h-px w-12 bg-[#D4AF37]" />
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#002147]">
                The Journey
              </span>
            </div>
            
            <h3 className="text-5xl md:text-6xl font-serif font-medium text-[#002147] tracking-tight leading-none mb-8">
              Your Path to <br />
              <span className="italic text-[#005A8D]">Acceptance.</span>
            </h3>
            <p className="text-xl text-slate-500 font-medium max-w-lg border-l-4 border-[#D4AF37] pl-6">
              A structured, stress-free framework designed to secure your place in the world's leading institutions.
            </p>
          </motion.div>
        </div>

        {/* Steps Grid */}
        <div className="grid lg:grid-cols-3 gap-10 relative">
          
          {/* Connector Path (Desktop) */}
          <div className="hidden lg:block absolute top-[20%] left-[10%] right-[10%] z-0 h-[1px]">
            <div className="w-full h-full border-b-2 border-dashed border-slate-200" />
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
              <div className="relative bg-white rounded-[2.5rem] border border-slate-100 p-5 transition-all duration-500 hover:shadow-2xl">
                
                {/* Image Section */}
                <div className="relative h-72 w-full rounded-[2rem] overflow-hidden mb-8 border border-slate-50">
                  <motion.img
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.8 }}
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#002147]/60 via-transparent to-transparent" />
                  
                  {/* Floating Step Number */}
                  <div 
                    className="absolute top-4 left-4 w-12 h-12 rounded-xl backdrop-blur-md flex items-center justify-center text-white font-bold text-lg border border-white/20"
                    style={{ backgroundColor: `${step.accent}dd` }}
                  >
                    {step.number}
                  </div>
                </div>

                {/* Content */}
                <div className="px-4 pb-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-2xl font-bold text-[#002147] tracking-tight">
                      {step.title}
                    </h4>
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500"
                      style={{ color: step.accent }}
                    >
                      <CheckCircle2 size={24} />
                    </div>
                  </div>
                  <p className="text-slate-500 font-medium leading-relaxed text-sm">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Mobile Transition Icon */}
              {index < steps.length - 1 && (
                <div className="lg:hidden flex justify-center py-6 text-slate-200">
                  <ChevronRight className="rotate-90" size={32} />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Indicator */}
        <div className="mt-20 flex flex-col items-center gap-6">
          <div className="h-px w-24 bg-slate-200" />
          <p className="text-[#002147] font-bold text-sm tracking-widest uppercase">Start your application today</p>
        </div>
      </div>
    </section>
  )
}