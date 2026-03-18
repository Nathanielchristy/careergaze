"use client"

import { 
  ArrowUpRight, 
  GraduationCap, 
  Library, 
  BookOpen, 
  Award,
  ShieldCheck,
  Plus,
  Compass
} from "lucide-react";
import { motion } from "framer-motion";

export default function AdmissionAbout() {
  return (
    <section id="about" className="py-24 lg:py-44 bg-[#FDFDFD] text-[#002147] relative overflow-hidden">
      {/* Subtle Academic Watermark Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30L0 30z' fill='%23002147' fill-rule='evenodd'/%3E%3C/svg%3E")`, backgroundSize: '40px 40px' }} 
      />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* TOP TIER: MISSION */}
        <div className="flex flex-col lg:flex-row gap-12 lg:items-end justify-between mb-32">
          <div className="max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#002147]/5 border border-[#002147]/10 text-[#002147] text-xs font-bold tracking-widest uppercase mb-6"
            >
              <Library size={14} /> The Careergize Legacy
            </motion.div>
            <h2 className="text-6xl lg:text-8xl font-serif font-medium tracking-tight leading-[1.05] mb-8 text-[#002147]">
              Crafting Your <br />
              <span className="text-[#005A8D] italic">Educational Future.</span>
            </h2>
          </div>
          <div className="lg:max-w-sm pb-4">
            <p className="text-slate-600 text-lg leading-relaxed border-l-2 border-[#D4AF37] pl-8">
              We move beyond simple applications. We architect <span className="text-[#002147] font-bold">strategic roadmaps</span> that align student potential with the world’s most <span className="text-[#002147] font-bold">elite institutions</span>.
            </p>
          </div>
        </div>

        {/* MIDDLE TIER: FEATURE ARCHITECTURE */}
        <div className="grid lg:grid-cols-3 gap-px bg-slate-200 border border-slate-200 rounded-[3rem] overflow-hidden shadow-xl">
          
          {/* Card 1: University Selection */}
          <div className="bg-white p-12 hover:bg-[#F8FAFC] transition-colors group">
            <div className="mb-20 flex justify-between items-start">
              <div className="w-14 h-14 rounded-2xl bg-[#002147] flex items-center justify-center text-[#D4AF37] shadow-lg shadow-blue-900/20">
                <Compass size={24} />
              </div>
              <ArrowUpRight className="text-slate-300 group-hover:text-[#002147] transition-colors" />
            </div>
            <h3 className="text-2xl font-bold mb-4 tracking-tight text-[#002147]">University <br />Matching</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-8">
              Data-backed analysis to find colleges where you won't just get in, but thrive. We evaluate rankings, ROI, and campus culture.
            </p>
            <div className="flex gap-2">
              <span className="text-[10px] font-bold px-2 py-1 rounded bg-slate-50 border border-slate-100 text-[#005A8D]">DATA-MATCH</span>
              <span className="text-[10px] font-bold px-2 py-1 rounded bg-slate-50 border border-slate-100 text-[#005A8D]">ROI ANALYSIS</span>
            </div>
          </div>

          {/* Card 2: Documentation & Portfolio */}
          <div className="bg-white p-12 hover:bg-[#F8FAFC] transition-colors group relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-[2px] bg-[#D4AF37]" />
            <div className="mb-20 flex justify-between items-start">
              <div className="w-14 h-14 rounded-2xl bg-[#005A8D] flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                <BookOpen size={24} />
              </div>
              <ArrowUpRight className="text-slate-300 group-hover:text-[#005A8D] transition-colors" />
            </div>
            <h3 className="text-2xl font-bold mb-4 tracking-tight text-[#002147]">Application <br />Mastery</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-8">
              From high-impact SOPs to recommendation strategy. We ensure your profile stands out in a sea of thousands of applicants.
            </p>
            <div className="flex gap-2">
              <span className="text-[10px] font-bold px-2 py-1 rounded bg-slate-50 border border-slate-100 text-[#005A8D]">SOP DESIGN</span>
              <span className="text-[10px] font-bold px-2 py-1 rounded bg-slate-50 border border-slate-100 text-[#005A8D]">PORTFOLIO</span>
            </div>
          </div>

          {/* Card 3: Placement & Scholarship */}
          <div className="bg-white p-12 hover:bg-[#F8FAFC] transition-colors group">
            <div className="mb-20 flex justify-between items-start">
              <div className="w-14 h-14 rounded-2xl bg-[#D4AF37] flex items-center justify-center text-[#002147] shadow-lg shadow-yellow-500/20">
                <Award size={24} />
              </div>
              <ArrowUpRight className="text-slate-300 group-hover:text-[#002147] transition-colors" />
            </div>
            <h3 className="text-2xl font-bold mb-4 tracking-tight text-[#002147]">Financial <br />Strategy</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-8">
              We maximize your chances of securing scholarships and grants, making elite education accessible and affordable.
            </p>
            <div className="flex gap-2">
              <span className="text-[10px] font-bold px-2 py-1 rounded bg-slate-50 border border-slate-100 text-[#005A8D]">GRANTS</span>
              <span className="text-[10px] font-bold px-2 py-1 rounded bg-slate-50 border border-slate-100 text-[#005A8D]">FULL-RIDE</span>
            </div>
          </div>
        </div>

        {/* BOTTOM TIER: CTA & VALIDATION */}
        <div className="mt-12 grid lg:grid-cols-4 gap-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 flex flex-col justify-between shadow-sm">
            <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Success Stories</span>
            <div className="mt-4">
              <h4 className="text-4xl font-bold text-[#002147]">2.5k+</h4>
              <p className="text-slate-500 text-xs">Students Placed</p>
            </div>
          </div>
          
          <div className="bg-[#002147] p-8 rounded-[2.5rem] border border-[#003366] lg:col-span-2 flex items-center justify-between group cursor-pointer overflow-hidden relative">
            <div className="relative z-10">
              <h4 className="text-white text-3xl font-medium tracking-tight leading-none">
                Begin Your <br />
                <span className="text-[#D4AF37] italic">Journey Today</span>
              </h4>
            </div>
            <div className="w-16 h-16 rounded-full bg-[#D4AF37] flex items-center justify-center text-[#002147] group-hover:scale-110 transition-all duration-500 relative z-10 shadow-xl">
              <Plus size={32} />
            </div>
            <div className="absolute inset-0 bg-[#003366] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 flex flex-col justify-between shadow-sm">
            <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Trust Factor</span>
            <div className="mt-4">
              <h4 className="text-4xl font-bold text-[#22C55E]">100%</h4>
              <p className="text-slate-500 text-xs">Transparent Process</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}