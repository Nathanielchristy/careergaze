'use client'

import React from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { 
  GraduationCap, Medal, Globe2, ShieldCheck, 
  ArrowUpRight, Landmark, ScrollText, Users
} from "lucide-react"
import Link from 'next/link'

const reasons = [
  {
    title: "Elite Mentorship",
    description: "Our counselors are alumni from Ivy League and top global universities, bringing first-hand expertise.",
    icon: <Users className="w-6 h-6" />,
    color: "#002147", // Navy
    stats: "Top 1% Mentors"
  },
  {
    title: "Guaranteed Admit",
    description: "Our strategic profile building ensures a 98% acceptance rate into student's top three choice colleges.",
    icon: <Medal className="w-6 h-6" />,
    color: "#22C55E", // Emerald Success
    stats: "98% Success"
  },
  {
    title: "Global Network",
    description: "Direct partnerships with over 150+ international and national universities for simplified admissions.",
    icon: <Globe2 className="w-6 h-6" />,
    color: "#D4AF37", // Gold
    stats: "150+ Partners"
  }
]

// FEATURE CARD WITH 3D TILT EFFECT
const TiltCard = ({ reason, index }: { reason: any, index: number }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative h-full p-8 rounded-[2.5rem] bg-white border border-slate-200 group hover:shadow-2xl transition-all duration-500"
    >
      <div style={{ transform: "translateZ(50px)" }} className="flex flex-col h-full">
        <div 
          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110 duration-500 shadow-sm"
          style={{ backgroundColor: `${reason.color}10`, color: reason.color }}
        >
          {reason.icon}
        </div>
        
        <div className="flex-grow">
          <span className="text-[10px] font-black tracking-widest text-[#D4AF37] uppercase mb-2 block">{reason.stats}</span>
          <h4 className="text-2xl font-bold text-[#002147] mb-4">{reason.title}</h4>
          <p className="text-slate-500 font-medium leading-relaxed">{reason.description}</p>
        </div>

        <div className="mt-8 flex items-center gap-2 text-[#002147] font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
          View Success Stories <ArrowUpRight size={16} />
        </div>
      </div>
    </motion.div>
  );
};

export default function WhyChoose() {
  return (
    <section id="why" className="py-32 bg-[#F8FAFC] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* HEADER */}
        <div className="grid lg:grid-cols-2 items-end mb-24 gap-12">
          <div>
            <motion.div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-[#D4AF37]" />
              <span className="text-xs font-black uppercase tracking-[0.4em] text-[#D4AF37]">The Careergize Edge</span>
            </motion.div>
            <h3 className="text-5xl md:text-7xl font-serif font-medium text-[#002147] tracking-tight leading-[1.1]">
              Defining <br /> 
              <span className="italic text-[#005A8D]">Academic</span> <br /> 
              Excellence.
            </h3>
          </div>
          <div className="lg:pb-4">
             <p className="text-xl text-slate-500 font-medium max-w-md leading-relaxed border-l-4 border-[#002147] pl-6">
               We replace guesswork with <span className="text-[#002147] font-bold">strategic precision</span>. From SOP drafting to interview prep, we handle the complexity of global admissions.
             </p>
          </div>
        </div>

        {/* BENTO GRID */}
        <div className="grid md:grid-cols-3 gap-6">
          {reasons.map((reason, index) => (
            <TiltCard key={index} reason={reason} index={index} />
          ))}
        </div>

        {/* STATS STRIP */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
           {[
             { label: "Counseling Hours", val: "10k+" },
             { label: "Scholarships Won", val: "₹1Cr+" },
             { label: "Visa Success", val: "100%" },
             { label: "Partner Colleges", val: "150+" },
           ].map((stat, i) => (
             <div key={i} className="p-8 rounded-[2rem] bg-white border border-slate-100 text-center shadow-sm">
                <p className="text-3xl font-bold text-[#002147] mb-1">{stat.val}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
             </div>
           ))}
        </div>

        {/* UPGRADED CALLOUT: DARK NAVY GLASS */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-24 relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-[#002147] to-[#D4AF37] rounded-[3rem] blur opacity-20 group-hover:opacity-40 transition duration-1000" />
          
          <div className="relative bg-[#002147] rounded-[3rem] p-12 md:p-20 overflow-hidden border border-[#D4AF37]/20">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
                  <Landmark size={14} className="text-[#D4AF37]" />
                  <span className="text-[10px] font-bold text-white uppercase tracking-widest">Enrollment Phase: 2026</span>
                </div>
                <h4 className="text-4xl md:text-6xl font-serif text-white mb-6">
                  Don't leave your <br /> 
                  <span className="text-[#D4AF37] italic">future to chance.</span>
                </h4>
                <p className="text-blue-100/70 text-lg max-w-md leading-relaxed">
                  Join our next counseling cohort and secure your seat in a top-tier institution.
                </p>
              </div>

              <div className="flex flex-col items-center gap-6">
                <Link href="/book-session">
                  <button className="group relative px-10 py-6 bg-[#D4AF37] text-[#002147] font-bold rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-xl">
                    <span className="flex items-center gap-3 text-lg">
                      BOOK CONSULTATION
                      <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </span>
                  </button>
                </Link>
                <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em]">Limited Slots for March Cycle</p>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}