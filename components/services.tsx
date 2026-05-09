"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image"; // Ensure you're using Next.js Image component
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowUpRight, GraduationCap, Code2, 
  ShieldCheck, Briefcase, Globe2, 
  ArrowRight, BrainCircuit, Users
} from "lucide-react";

// For the Internship card, we'll use a high-quality student professional image
// Similar to how you organized fleet assets (e.g., @/assets/cars/fleet/)
const sectors = [
  {
    id: "admissions",
    title: "College Admissions",
    subtitle: "Ivy League & Tier-1 Strategy",
    accent: "#10B981",
    path: "/services/college-admission",
    description: "Navigate university applications with AI-driven strategy and expert mentorship tailored for global excellence.",
    mainIcon: GraduationCap,
    features: ["Ivy League Strategy", "Essay Optimization", "Portfolio Reviews"],
    stats: "2.5k+ Placements"
  },
  {
    id: "internships", // Updated from 'career' to focus on Internships as requested
    title: "Global Internships",
    subtitle: "Fortune 500 Access",
    accent: "#6366F1",
    path: "/services/internships",
    description: "Exclusive access to high-impact roles at tech giants and unicorns. We bridge the gap between academic learning and corporate leadership.",
    mainIcon: Briefcase, // Changed from Rocket to Briefcase for professional context
    features: ["Fortune 500 Placements", "Stipend Negotiation", "Work Permit Support"],
    stats: "98% Success Rate",
    // Replace with your actual student asset path
    image: "/assets/students/intern-profile.jpg" 
  },
  {
    id: "technical",
    title: "Technical Courses",
    subtitle: "High-Impact Skill-Up",
    accent: "#3B82F6",
    path: "/services/technical-training",
    description: "Hands-on technical training in Cloud, Cyber, and Full-stack development to accelerate your trajectory.",
    mainIcon: Code2,
    features: ["DevOps", "CyberSec", "AI/ML"],
    stats: "85% Completion"
  }
];

export default function Services() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="services" className="py-24 bg-[#0B1120] text-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* SECTION HEADER */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-4 tracking-tight"
          >
            Our Service <span className="text-emerald-400">Pillars</span>
          </motion.h2>
        </div>

        {/* SECTOR NAVIGATION */}
        <div className="flex justify-center mb-12">
          <div className="flex bg-[#161D2F] p-1.5 rounded-full border border-white/5 backdrop-blur-md">
            {sectors.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setActiveTab(idx)}
                className={`relative px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                  activeTab === idx ? 'text-[#0B1120]' : 'text-slate-400 hover:text-white'
                }`}
              >
                {activeTab === idx && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute inset-0 bg-emerald-400"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{s.id}</span>
              </button>
            ))}
          </div>
        </div>

        {/* BENTO GRID CONTENT */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-6"
          >
            {/* Main Information Card */}
            <div className="md:col-span-8 bg-[#161D2F] rounded-[2.5rem] p-10 border border-white/5 relative overflow-hidden flex flex-col justify-between min-h-[450px]">
              <div className="relative z-10">
                <span className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.3em] mb-2 block">
                  {sectors[activeTab].subtitle}
                </span>
                <h3 className="text-4xl font-bold text-white/90 mb-6">{sectors[activeTab].title}</h3>
                <p className="text-slate-400 text-xl max-w-lg leading-relaxed mb-10">
                  {sectors[activeTab].description}
                </p>
              </div>

              <div className="flex flex-wrap gap-3 relative z-10">
                {sectors[activeTab].features.map((tag) => (
                  <span key={tag} className="px-5 py-2.5 rounded-full bg-slate-800/50 border border-white/10 text-xs font-medium text-slate-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Card with Student Image for Internships */}
            <div className="md:col-span-4 space-y-6">
              <Link href={sectors[activeTab].path} className="block group h-full">
                <div className={`relative rounded-[2.5rem] p-10 h-full flex flex-col justify-between items-center text-center transition-transform hover:scale-[1.02] overflow-hidden ${activeTab === 1 ? 'bg-transparent border border-white/10' : 'bg-emerald-400'}`}>
                  
                  {/* If it's the Internship tab (index 1), show the student image background */}
                  {activeTab === 1 ? (
                    <>
                      <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-[#0B1120]/40 to-transparent z-10" />
                        <Image 
                          src="/student.jpg" // Placeholder for appropriate student image
                          alt="Student Intern"
                          fill
                          className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                        />
                      </div>
                      <div className="relative z-20 mt-auto">
                        <h4 className="text-2xl font-bold text-white mb-2">Build Your Career</h4>
                        <div className="flex items-center justify-center gap-2 text-emerald-400 font-black uppercase text-xs tracking-widest">
                          Apply Now <ArrowRight size={18} />
                        </div>
                      </div>
                    </>
                  ) : (
                    /* Default style for other tabs */
                    <>
                      <div className="w-20 h-20 rounded-3xl bg-black/10 flex items-center justify-center mb-6">
                        {React.createElement(sectors[activeTab].mainIcon, { size: 40, className: "text-[#0B1120]" })}
                      </div>
                      <h4 className="text-2xl font-bold text-[#0B1120] mb-8">Begin Your Journey</h4>
                      <div className="flex items-center gap-2 text-[#0B1120] font-black uppercase text-xs tracking-widest group-hover:gap-4 transition-all">
                        Get Started <ArrowRight size={18} />
                      </div>
                    </>
                  )}
                </div>
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}