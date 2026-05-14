"use client";

import { 
  GraduationCap, 
  Rocket, 
  Briefcase, 
  Code2, 
  ShieldCheck, 
  Cloud, 
  BrainCircuit, 
  ArrowRight,
  Users
} from "lucide-react";
import { motion } from "framer-motion";

export default function ServicePillars() {
  return (
    <section id="services" className="py-24 lg:py-32 bg-[#0B1120] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* HEADER SECTION */}
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4 tracking-tight"
          >
            Our Service Pillars
          </motion.h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Modular solutions designed to accelerate every stage of your professional development.
          </p>
        </div>

        {/* BENTO GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(300px,auto)]">
          
          {/* 1. College Admissions (Large Card) */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-8 bg-[#161D2F] rounded-[2.5rem] p-10 border border-white/5 relative overflow-hidden group"
          >
            <div className="relative z-10 h-full flex flex-col">
              <div className="flex justify-between items-start mb-8">
                <h3 className="text-3xl font-bold text-white/90">College Admissions</h3>
                <GraduationCap size={48} className="text-indigo-400/50" />
              </div>
              <p className="text-slate-400 text-lg max-w-md mb-12">
                Navigate the complexities of top-tier university applications with AI-driven strategy and expert mentorship.
              </p>
              <div className="mt-auto flex flex-wrap gap-3">
                {["Ivy League Strategy", "Essay Optimization", "Portfolio Reviews"].map((tag) => (
                  <span key={tag} className="px-4 py-2 rounded-full bg-slate-800/50 border border-white/10 text-xs font-medium text-slate-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            {/* Subtle Gradient Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[100px] pointer-events-none" />
          </motion.div>

          {/* 2. Internships (Tall Card) */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-4 bg-[#161D2F] rounded-[2.5rem] p-10 border border-white/5 flex flex-col items-center justify-center text-center group"
          >
             <div className="rounded-[2.8rem] overflow-hidden aspect-[1/1] sm:aspect-[4/5]">
                  <img
                    src="/college3.jpg"
                    alt="Careergize Students"
                    className="w-full h-full object-cover"
                  />
                </div>
            <h3 className="text-3xl font-bold text-emerald-400 mb-6">Internships</h3>
            <p className="text-slate-400 mb-10 leading-relaxed">
             We provide internship to college studnets for WebDevelopment
            </p>
            <button className="flex items-center gap-2 text-emerald-400 font-bold hover:gap-4 transition-all">
              View Programs <ArrowRight size={20} />
            </button>
          </motion.div>

          {/* 3. Career Guidance (Small Card) */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-4 bg-[#161D2F] rounded-[2.5rem] p-10 border border-white/5 group"
          >
            <h3 className="text-2xl font-bold mb-6">Career Guidance</h3>
            <p className="text-slate-400 mb-10">
              Long-term career mapping and personal branding for the modern professional.
            </p>
            <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-6 flex items-center gap-4">
               <div className="flex -space-x-3">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-800 bg-slate-700 flex items-center justify-center overflow-hidden">
                      <Users size={18} className="text-slate-400" />
                    </div>
                  ))}
               </div>
               <span className="text-sm font-bold text-slate-300">500+ Experts Online</span>
            </div>
          </motion.div>

          {/* 4. IT Technical Courses (Wide Card) */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-8 bg-[#161D2F] rounded-[2.5rem] p-10 border border-white/5 grid md:grid-cols-2 gap-8 items-center"
          >
            <div>
              <h3 className="text-2xl font-bold text-indigo-400 mb-6">IT Technical Courses</h3>
              <p className="text-slate-400 mb-8">
                Hands-on technical training in Cloud, Cyber, and Full-stack development.
              </p>
              <div className="space-y-2">
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full w-[85%] bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
                </div>
                <p className="text-[10px] uppercase font-bold tracking-widest text-emerald-400">85% Avg. Course Completion</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Code2, label: "DevOps" },
                { icon: ShieldCheck, label: "CyberSec" },
                { icon: Cloud, label: "AWS/Azure" },
                { icon: BrainCircuit, label: "AI/ML" }
              ].map((item) => (
                <div key={item.label} className="bg-slate-900/50 p-6 rounded-2xl border border-white/5 flex flex-col items-center gap-3 hover:bg-indigo-500/5 transition-colors cursor-pointer">
                  <item.icon size={24} className="text-slate-400" />
                  <span className="text-xs font-bold text-slate-200 uppercase tracking-tighter">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}