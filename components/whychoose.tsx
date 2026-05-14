'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  GraduationCap, 
  PenTool, 
  MessagesSquare 
} from 'lucide-react'

const steps = [
  {
    id: 1,
    title: "Profile Evaluation",
    description: "Deep dive into your academics, extracurriculars, and unique strengths.",
    icon: <Search className="w-6 h-6 text-cyan-400" />,
  },
  {
    id: 2,
    title: "University Selection",
    description: "Curated list of 'Reach', 'Target', and 'Safety' schools matching your goals.",
    icon: <GraduationCap className="w-6 h-6 text-cyan-400" />,
  },
  {
    id: 3,
    title: "Essay Support",
    description: "Polishing your personal statements to tell a compelling, unique story.",
    icon: <PenTool className="w-6 h-6 text-cyan-400" />,
  },
  {
    id: 4,
    title: "Mock Interviews",
    description: "Rigorous practice sessions with alumni to master the final hurdle.",
    icon: <MessagesSquare className="w-6 h-6 text-cyan-400" />,
  }
]

export default function Roadmap() {
  return (
    <section className="bg-[#0a0a0c] py-24 px-6 min-h-screen flex flex-col justify-center">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-white text-4xl md:text-5xl font-bold mb-4 tracking-tight"
          >
            The Careergize Roadmap
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 text-lg md:text-xl font-medium"
          >
            A data-driven, step-by-step approach to securing your place at a world-class institution.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              {/* Icon Container */}
              <div className="w-14 h-14 bg-[#1a1b1e] rounded-2xl flex items-center justify-center mb-8 border border-white/5 group-hover:border-cyan-500/50 transition-colors duration-500 shadow-xl">
                {step.icon}
              </div>

              {/* Text Content */}
              <h3 className="text-white text-xl font-bold mb-4">
                <span className="mr-2">{step.id}.</span>
                {step.title}
              </h3>
              <p className="text-slate-400 leading-relaxed font-medium">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}