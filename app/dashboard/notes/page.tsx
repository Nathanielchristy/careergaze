'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, BookOpen, FileText, PlayCircle, 
  Download, ArrowLeft, Star, Clock, Filter 
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

/* =====================
   MOCK DATA
===================== */
const NOTES = [
  {
    id: '1',
    title: 'Advanced State Management',
    category: 'React',
    description: 'Deep dive into useReducer, Context API, and Zustand patterns.',
    updated: '2 hours ago',
    type: 'PDF',
    color: 'bg-blue-500',
    featured: true
  },
  {
    id: '2',
    title: 'Database Schema Design',
    category: 'Backend',
    description: 'Normalization vs Denormalization and scaling PostgreSQL.',
    updated: 'Yesterday',
    type: 'Video',
    color: 'bg-purple-500',
    featured: false
  },
  {
    id: '3',
    title: 'Modern CSS Frameworks',
    category: 'UI/UX',
    description: 'Why Tailwind is winning and how to use Radix UI.',
    updated: '3 days ago',
    type: 'Article',
    color: 'bg-pink-500',
    featured: false
  },
  // Add more as needed...
]

export default function LearningNotesPage() {
  const [activeCategory, setActiveCategory] = useState('All')

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0A4D68] p-6 lg:p-12">
      
      {/* BACK NAVIGATION */}
      <Button variant="ghost" className="mb-6 hover:bg-white gap-2 text-slate-500">
        <ArrowLeft size={18} /> Back to Dashboard
      </Button>

      {/* HEADER SECTION */}
      <header className="mb-12">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2 text-[#86C232] font-bold">
              <BookOpen size={20} />
              <span className="uppercase text-xs tracking-widest">Resource Library</span>
            </div>
            <h1 className="text-4xl font-black text-[#0A4D68]">Learning Notes</h1>
            <p className="text-slate-500 mt-2">Access exclusive internship study materials and documentation.</p>
          </div>

          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <Input 
              placeholder="Search topics, keywords..." 
              className="pl-12 h-14 bg-white border-none shadow-sm rounded-2xl ring-1 ring-slate-100"
            />
          </div>
        </div>
      </header>

      {/* CATEGORY FILTER */}
      <div className="flex gap-3 mb-10 overflow-x-auto pb-2">
        {['All', 'React', 'Backend', 'UI/UX', 'Soft Skills'].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
              activeCategory === cat 
                ? 'bg-[#0A4D68] text-white shadow-lg' 
                : 'bg-white text-slate-500 hover:bg-slate-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* MAIN CONTENT GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {NOTES.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>

      {/* FOOTER / REQUEST SECTION */}
      <section className="mt-20 p-10 bg-[#0A4D68] rounded-[3rem] text-center text-white relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-2">Can't find what you're looking for?</h2>
          <p className="text-white/60 mb-6 text-sm">Request a specific topic or ask your mentor for custom notes.</p>
          <Button className="bg-[#86C232] text-[#0A4D68] font-bold rounded-xl px-8 hover:scale-105 transition-transform">
            Request Note Topic
          </Button>
        </div>
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#86C232]/10 rounded-full blur-3xl -mr-20 -mt-20" />
      </section>
    </div>
  )
}

/* =====================
   SUB-COMPONENTS
===================== */

function NoteCard({ note }: { note: any }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Card className="h-full border-none shadow-sm hover:shadow-xl transition-shadow bg-white rounded-[2.5rem] p-8 flex flex-col">
        {/* Header: Icon & Category */}
        <div className="flex justify-between items-start mb-6">
          <div className={`p-4 rounded-2xl ${note.color} text-white shadow-lg`}>
            {note.type === 'Video' ? <PlayCircle size={24} /> : <FileText size={24} />}
          </div>
          {note.featured && (
            <span className="flex items-center gap-1 text-[10px] font-black text-amber-500 bg-amber-50 px-2 py-1 rounded-full uppercase">
              <Star size={10} fill="currentColor" /> Essential
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{note.category}</span>
          <h3 className="text-xl font-bold text-[#0A4D68] mt-1 mb-3 group-hover:text-[#86C232] transition-colors">
            {note.title}
          </h3>
          <p className="text-sm text-slate-500 leading-relaxed mb-6 line-clamp-2">
            {note.description}
          </p>
        </div>

        {/* Footer: Metadata & Buttons */}
        <div className="pt-6 border-t border-slate-50 flex items-center justify-between mt-auto">
          <div className="flex items-center gap-2 text-slate-400">
            <Clock size={14} />
            <span className="text-[10px] font-medium">{note.updated}</span>
          </div>
          <div className="flex gap-2">
            <Button size="icon" variant="ghost" className="rounded-full text-slate-400 hover:text-[#86C232]">
              <Download size={18} />
            </Button>
            <Button className="rounded-xl bg-[#F8FAFC] text-[#0A4D68] hover:bg-[#86C232] hover:text-[#0A4D68] border-none font-bold text-xs">
              Open Note
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}