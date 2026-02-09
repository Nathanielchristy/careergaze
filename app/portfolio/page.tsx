'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, Plus } from 'lucide-react'

// Images must be placed in /public folder as: 
// /public/project1.jpg, /public/project2.jpg, etc.
const projects = [
  { title: "edtech dashboard", category: "web app", image: "/project1.jpg" },
  { title: "growth analytics", category: "marketing", image: "/project2.jpg" },
  { title: "admission portal", category: "software", image: "/project3.jpg" },
  { title: "e-commerce website", category: "full stack", image: "/project4.jpg" },
]

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-white text-[#0A4D68] font-sans">
      
      {/* HEADER */}
      <nav className="p-6">
        <Link href="/" className="flex items-center gap-2 text-sm font-black lowercase tracking-tighter text-slate-400 hover:text-blue-600 transition-colors">
          <ChevronLeft size={16} /> back to home
        </Link>
      </nav>

      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter lowercase leading-none">
              selected <br /> <span className="text-blue-600">works.</span>
            </h1>
            <p className="mt-6 text-slate-400 font-bold lowercase tracking-tight max-w-sm">
              high-performance digital solutions
            </p>
          </div>

          {/* PROJECT GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {projects.map((project, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="group cursor-crosshair"
              >
                {/* IMAGE CONTAINER */}
                <div className="relative aspect-[16/10] overflow-hidden rounded-[2.5rem] bg-slate-100 border border-slate-100 shadow-sm transition-all duration-700 group-hover:shadow-2xl group-hover:shadow-blue-200">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  
                  {/* OVERLAY ON HOVER */}
                  <div className="absolute inset-0 bg-[#0A4D68]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-500">
                      <Plus className="text-blue-600" size={32} />
                    </div>
                  </div>
                </div>

                {/* TEXT CONTENT */}
                <div className="mt-8 flex justify-between items-start px-2">
                  <div>
                    <h3 className="text-2xl font-black tracking-tighter lowercase mb-1">
                      {project.title}
                    </h3>
                    <p className="text-sm font-bold text-slate-400 lowercase tracking-tight">
                      {project.category}
                    </p>
                  </div>
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 py-2">
                    © 2026
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-32 p-12 md:p-20 rounded-[3rem] bg-slate-900 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-[#86C232]" />
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter lowercase mb-8">
              have a project <br /> in mind?
            </h2>
            <Link href="/start-project">
              <button className="bg-blue-600 hover:bg-white hover:text-blue-600 text-white px-10 h-16 rounded-full font-black lowercase tracking-tighter text-xl transition-all duration-300">
                start a conversation
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}