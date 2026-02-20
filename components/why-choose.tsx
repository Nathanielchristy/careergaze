'use client'

import React, { useRef } from "react"
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion"
import { 
  CheckCircle2, Sparkles, Users2, LineChart, 
  ShieldCheck, Cpu, Zap, ArrowUpRight, TrendingUp 
} from "lucide-react"
import Link from 'next/link'

const reasons = [
  {
    title: "Expert Team",
    description: "Industry veterans from Fortune 500 backgrounds leading your development.",
    icon: <Users2 className="w-6 h-6" />,
    color: "#005A8D",
    stats: "15+ Years"
  },
  {
    title: "Proven Results",
    description: "94% of our graduates secure Tier-1 placements within 6 months.",
    icon: <LineChart className="w-6 h-6" />,
    color: "#22C55E",
    stats: "94% Rate"
  },
  {
    title: "Modern Tech Stack",
    description: "Building with Next.js 15, AI-agentic workflows, and Edge Computing.",
    icon: <Cpu className="w-6 h-6" />,
    color: "#A7FF00",
    stats: "Cutting Edge"
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
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative h-full p-8 rounded-[2.5rem] bg-slate-50 border border-slate-200 group hover:bg-white hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-500"
    >
      <div style={{ transform: "translateZ(50px)" }} className="flex flex-col h-full">
        <div 
          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110 duration-500"
          style={{ backgroundColor: `${reason.color}10`, color: reason.color }}
        >
          {reason.icon}
        </div>
        
        <div className="flex-grow">
          <div className="flex items-center gap-2 mb-2">
             <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase">{reason.stats}</span>
          </div>
          <h4 className="text-2xl font-bold text-slate-900 mb-4">{reason.title}</h4>
          <p className="text-slate-500 font-medium leading-relaxed">{reason.description}</p>
        </div>

        <div className="mt-8 flex items-center gap-2 text-[#005A8D] font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
          Learn Insight <ArrowUpRight size={16} />
        </div>
      </div>
    </motion.div>
  );
};

export default function WhyChoose() {
  return (
    <section id="why" className="py-32 bg-white relative overflow-hidden">
      {/* Decorative Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#005A8D 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* HEADER: DYNAMIC SCALE */}
        <div className="grid lg:grid-cols-2 items-end mb-24 gap-12">
          <div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="h-px w-12 bg-[#005A8D]" />
              <span className="text-xs font-black uppercase tracking-[0.4em] text-[#005A8D]">Competitive Edge</span>
            </motion.div>
            <h3 className="text-5xl md:text-7xl font-bold text-slate-900 tracking-tighter leading-[0.9]">
              Engineering <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#005A8D] via-[#22C55E] to-[#A7FF00]">High-Performance</span> <br /> 
              Futures.
            </h3>
          </div>
          <div className="lg:pb-4">
             <p className="text-xl text-slate-500 font-medium max-w-md leading-relaxed">
               We replace generic consulting with <span className="text-slate-900 font-bold underline decoration-[#A7FF00] decoration-4">technical precision</span>. Whether it's code or careers, we build for scale.
             </p>
          </div>
        </div>

        {/* BENTO-STYLE INTERACTIVE GRID */}
        <div className="grid md:grid-cols-3 gap-6">
          {reasons.map((reason, index) => (
            <TiltCard key={index} reason={reason} index={index} />
          ))}
        </div>

        {/* STATS STRIP: PROOF OF IMPACT */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
           {[
             { label: "Active Cohorts", val: "24/7" },
             { label: "Client Growth", val: "+140%" },
             { label: "Dev Efficiency", val: "2.4x" },
             { label: "Global Partners", val: "50+" },
           ].map((stat, i) => (
             <div key={i} className="p-6 rounded-3xl bg-slate-50 border border-slate-100 text-center">
                <p className="text-2xl font-black text-slate-900">{stat.val}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
             </div>
           ))}
        </div>

        {/* UPGRADED CALLOUT: THE "DARK MODE" GLASS CENTER */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-24 relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-[#005A8D] to-[#A7FF00] rounded-[3rem] blur opacity-25 group-hover:opacity-50 transition duration-1000" />
          
          <div className="relative bg-slate-900 rounded-[3rem] p-12 md:p-20 overflow-hidden">
            {/* Animated Background Element */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 border border-white/5 rounded-full"
            />

            <div className="flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
                  <TrendingUp size={14} className="text-[#A7FF00]" />
                  <span className="text-[10px] font-bold text-white uppercase tracking-widest">Growth Phase Active</span>
                </div>
                <h4 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                  Stop following. <br /> 
                  <span className="text-[#A7FF00]">Start Architecting.</span>
                </h4>
                <p className="text-slate-400 text-lg max-w-md leading-relaxed">
                  Get our strategic blueprint designed for high-tier technical and academic expansion.
                </p>
              </div>

              <div className="flex flex-col items-center gap-6">
                <Link href="/get-blueprint">
                  <button className="group relative px-12 py-6 bg-[#A7FF00] text-slate-900 font-black rounded-2xl transition-all shadow-[0_0_30px_rgba(167,255,0,0.3)] hover:shadow-[0_0_50px_rgba(167,255,0,0.5)] hover:scale-105">
                    <span className="flex items-center gap-3 text-lg">
                      SECURE FREE BLUEPRINT
                      <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </span>
                  </button>
                </Link>
                <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em]">Limited Access for Q1 2026</p>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}