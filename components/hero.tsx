"use client";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Star, Award } from "lucide-react";
import Link from 'next/link';

export default function AdmissionHero() {
  return (
    <section className="relative overflow-hidden bg-[#0B0E14] font-sans selection:bg-cyan-500/30">
      
      {/* --- ELITE ANNOUNCEMENT BAR --- */}
      <div className="bg-[#002147] py-2 overflow-hidden whitespace-nowrap border-b border-white/5 relative z-50">
        <div className="flex animate-marquee hover:pause items-center">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-10 px-4">
              <span className="flex items-center gap-2 text-cyan-400 font-bold text-[11px] uppercase tracking-[0.2em]">
                <Star size={11} fill="#00ffff" stroke="none" />
                Admissions Open 2026-27
              </span>
              <span className="text-white/70 font-medium text-[11px] uppercase tracking-widest">Limited Priority Seats Available</span>
              <span className="h-1 w-1 bg-cyan-800 rounded-full" />
              <span className="text-white/60 font-medium text-[11px] uppercase tracking-widest">Global University Partners</span>
              <span className="h-1 w-1 bg-cyan-800 rounded-full" />
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 py-16 lg:py-32">
        {/* Adjusted grid to 50/50 split for perfect side-by-side alignment like newonee.jpg */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT CONTENT */}
          <article className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <header className="w-full">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-800/30 mb-8">
                <span className="flex h-2 w-2 rounded-full bg-[#22C55E] animate-pulse" />
                <span className="text-[11px] font-semibold text-cyan-100 uppercase tracking-wider">Counseling Status: Active</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-white mb-8 leading-[1.1]">
                Your Tech Future <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-100 to-cyan-500">
                  Starts Here
                </span>
              </h1>
            </header>

            <p className="text-lg md:text-xl text-slate-400 mb-10 leading-relaxed max-w-lg">
              Empowering students with personalized guidance, industry-ready internships, and top-tier IT training. Join 50,000+ others building their careers today.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Button
                size="lg"
                className="bg-cyan-400 hover:bg-cyan-500 text-slate-950 rounded-xl px-8 h-14 text-base font-bold shadow-lg transition-all"
              >
                Join the Program
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-xl px-8 h-14 text-base font-bold border-none bg-slate-800/50 text-slate-300 hover:bg-slate-800 hover:text-white transition-all"
              >
                <Link href="/courses">Browse Courses</Link>
              </Button>
            </div>

            {/* Stats Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pt-10 border-t border-slate-800/60 w-full">
              {[
                { label: "Admit Rate", val: "98%" },
                { label: "Placements", val: "500+" },
                { label: "Colleges", val: "150+" },
                { label: "Scholarships", val: "10Cr+" }
              ].map((stat, idx) => (
                <div key={idx} className="space-y-1">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</p>
                  <p className="text-2xl font-bold text-white tracking-tight">{stat.val}</p>
                </div>
              ))}
            </div>
          </article>

          {/* RIGHT VISUALS - Matches the layout of newonee.jpg perfectly */}
          <div className="relative w-full flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[540px]">
              {/* The Purple Accent Background Shape from newonee.jpg */}
              <div className="absolute -inset-4 z-0">
                <div className="absolute top-0 left-0 w-32 h-32 bg-purple-600/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-900/30 rounded-full blur-[100px]" />
              </div>

              {/* Main Image Container with exact rounded corners from newonee.jpg */}
              <div className="relative z-10 overflow-hidden rounded-[3rem] bg-purple-900/20 p-1">
                <div className="rounded-[2.8rem] overflow-hidden aspect-[1/1] sm:aspect-[4/5]">
                  <img
                    src="/college.jpg"
                    alt="Careergize Students"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Bottom Floating Badge exactly as seen in newonee.jpg */}
                <div className="absolute bottom-6 left-6 bg-[#1A1D23]/95 backdrop-blur-md px-5 py-3 rounded-xl border border-white/10 flex items-center gap-3 shadow-2xl">
                  <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center shadow-inner">
                    <Award size={20} className="text-white" fill="currentColor" />
                  </div>
                  <div className="pr-2">
                    <p className="text-white text-sm font-bold leading-tight">Top Rated 2026</p>
                    <p className="text-slate-400 text-[10px] font-medium tracking-wide uppercase">Industry Excellence</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: fit-content;
          animation: marquee 35s linear infinite;
        }
      `}</style>
    </section>
  );
}