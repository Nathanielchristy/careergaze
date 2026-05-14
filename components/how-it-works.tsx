'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: "When should I start my application process?",
    answer: "We recommend starting at least 12-18 months before your intended intake. This gives enough time for profile building, exam preparation (SAT/GRE), and crafting high-quality essays."
  },
  {
    question: "How do you help with scholarships?",
    answer: "Our experts identify merit-based and need-based scholarships that align with your profile, helping you optimize your application to maximize financial aid opportunities."
  },
  {
    question: "Can I get help even if my grades are average?",
    answer: "Absolutely. We specialize in holistic profile building, emphasizing extracurriculars, leadership roles, and compelling narratives to offset academic gaps."
  }
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="bg-[#0f1115] text-white py-24 px-6">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-slate-400">Everything you need to know about starting your journey with us.</p>
        </div>

        {/* Accordion */}
        <div className="space-y-4 mb-24">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="rounded-2xl bg-[#1a1d23] border border-white/5 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
              >
                <span className="font-semibold text-slate-200">{faq.question}</span>
                <ChevronDown 
                  className={`w-5 h-5 text-cyan-400 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} 
                />
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="px-6 pb-6 text-slate-400 leading-relaxed text-sm">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* CTA Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-[#2d333d] to-[#16191d] p-12 md:p-20 text-center border border-white/10"
        >
          {/* Subtle Glow Background */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[100px] pointer-events-none" />
          
          <h3 className="text-4xl md:text-5xl font-bold mb-6">Ready to take the first step?</h3>
          <p className="text-slate-300 mb-10 max-w-lg mx-auto">
            Book a free 30-minute consultation with our senior advisors and get a preliminary evaluation of your profile.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto px-8 py-4 bg-[#00e5ff] text-black font-bold rounded-2xl hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all">
              Book a Consultation
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-2xl hover:bg-white/10 transition-all">
              Download Brochure
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  )
}