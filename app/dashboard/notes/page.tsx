'use client'

import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  Search, FileText, PlayCircle, 
  Download, Star, Clock, GraduationCap, LayoutGrid,
  CheckSquare, MessageSquare, Award, LogOut, Menu, X, ArrowLeft
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

/* =====================
   MOCK DATA (Updated)
===================== */
const NOTES = [
  {
    id: 'python-vid-1',
    title: 'Python Learning Reference Video',
    category: 'Backend',
    description: 'Comprehensive guide to Python fundamentals and advanced concepts for backend development.',
    updated: 'Just now',
    type: 'Video',
    videoUrl: 'https://www.youtube.com/embed/K5KVEU3aaeQ?si=UzXMAGO5_dJE8hZh',
    color: 'bg-red-500',
    featured: true
  },
  {
    id: '1',
    title: 'HTML CSS Learning Reference Video',
    category:'Frontend',
    description: 'Comprehensive guide to Python fundamentals and advanced concepts for backend development.',
    updated: 'Just now',
    type: 'Video',
    videoUrl:'https://www.youtube.com/embed/Ney9znuEn_U?si=3cDBVNzqdNTRUzQu',
    color: 'bg-red-500',
    featured: true
  },
  
{
    id: 'Django-vid-1',
    title: 'Django Framework Learning Reference Video',
    category: 'Backend',
    description: 'Comprehensive guide to Django fundamentals and advanced concepts for backend development.',
    updated: 'Just now',
    type: 'Video',
    videoUrl: 'https://www.youtube.com/embed/HRLIEgwYSHc?si=eXbr7ykfS_cCa9wQ',
    color: 'bg-red-500',
    featured: true
  },

]

export default function LearningNotesPage() {
  const router = useRouter()
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    localStorage.clear()
    router.push('/login')
  }

  const filteredNotes = useMemo(() => {
    return NOTES.filter((note) => {
      const matchesCategory = activeCategory === 'All' || note.category === activeCategory;
      const matchesSearch = 
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0A4D68]">
      
      {/* MOBILE HEADER */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-[#0A4D68] text-white sticky top-0 z-[60] shadow-md">
        <div className="flex items-center gap-2">
          <div className="bg-[#86C232] p-1.5 rounded-lg">
            <GraduationCap className="text-[#0A4D68]" size={20} />
          </div>
          <span className="font-bold tracking-tight">Careergize</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 hover:bg-white/10 rounded-lg">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* SIDEBAR */}
      <aside className={`
        fixed left-0 top-0 h-full w-72 bg-[#0A4D68] text-white flex flex-col p-6 z-[70] transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 lg:w-64
      `}>
        <div className="items-center gap-3 mb-10 hidden lg:flex">
          <div className="bg-[#86C232] p-2 rounded-lg">
            <GraduationCap className="text-[#0A4D68]" size={24} />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">Careergize</span>
        </div>

          <nav className="space-y-2 flex-1 mt-8 lg:mt-0">
          <Link href="/dashboard"><SidebarItem icon={<LayoutGrid size={20} />} label="My Workspace" /></Link>
          <Link href="/dashboard/notes"><SidebarItem icon={<FileText size={20} />} label="Learning Notes" /></Link>
          <Link href="/dashboard/interntask"><SidebarItem icon={<CheckSquare size={20} />} label="Tasks & Projects"/></Link>
          <SidebarItem icon={<MessageSquare size={20} />} label="Mentor Chat" />
          <SidebarItem icon={<Award size={20} />} label="Final Certification" />
        </nav>
        
        
        <div className="mt-auto pt-6 border-t border-white/10">
          <SidebarItem icon={<LogOut size={20} />} label="Logout" onClick={handleLogout} />
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="lg:ml-64 p-6 md:p-8 lg:p-12">
        <header className="mb-12">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <div>
              <h1 className="text-4xl font-black text-[#0A4D68]">Careergize Learning Notes</h1>
              <p className="text-slate-500 mt-2">Access exclusive internship study materials and documentation.</p>
            </div>

            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <Input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search topics, keywords..." 
                className="pl-12 h-14 bg-white border-none shadow-sm rounded-2xl ring-1 ring-slate-100 focus-visible:ring-[#86C232]"
              />
            </div>
          </div>
        </header>

        {/* CATEGORY FILTER */}
        <div className="flex gap-3 mb-10 overflow-x-auto pb-2 no-scrollbar">
          {['All', 'Backend', 'Frontend', 'UI/UX', 'Soft Skills'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                activeCategory === cat 
                  ? 'bg-[#0A4D68] text-white shadow-lg' 
                  : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* SEARCH RESULTS GRID */}
        {filteredNotes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNotes.map((note) => (
              <NoteCard key={note.id} note={note} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
              <Search size={24} />
            </div>
            <h3 className="text-lg font-bold">No notes found</h3>
            <p className="text-slate-500 text-sm">Try adjusting your search or category filter.</p>
            <Button 
              variant="link" 
              onClick={() => {setSearchQuery(''); setActiveCategory('All')}}
              className="text-[#86C232] mt-2 font-bold"
            >
              Clear all filters
            </Button>
          </div>
        )}

        {/* FOOTER SECTION */}
        <section className="mt-20 p-10 bg-[#0A4D68] rounded-[2.5rem] md:rounded-[4rem] text-center text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Can't find what you're looking for?</h2>
            <p className="text-white/60 mb-8 text-sm max-w-lg mx-auto">Request a specific topic or ask your mentor for custom documentation.</p>
            <Button className="bg-[#86C232] text-[#0A4D68] font-black rounded-xl px-10 h-14 hover:scale-105 transition-transform uppercase tracking-wider text-xs">
              Request New Topic
            </Button>
          </div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#86C232]/10 rounded-full blur-[100px] -mr-32 -mt-32" />
        </section>
      </main>
    </div>
  )
}

/* =====================
   SUB-COMPONENTS
===================== */

function SidebarItem({ icon, label, active, onClick }: any) {
  return (
    <div 
      onClick={onClick} 
      className={`flex items-center gap-4 px-4 py-3.5 rounded-xl cursor-pointer transition-all duration-200 ${
        active 
          ? 'bg-[#86C232] text-[#0A4D68] font-bold shadow-lg shadow-[#86C232]/10' 
          : 'text-white/60 hover:bg-white/10 hover:text-white'
      }`}
    >
      <span className={active ? 'text-[#0A4D68]' : 'text-inherit'}>{icon}</span>
      <span className="text-sm">{label}</span>
    </div>
  )
}

function NoteCard({ note }: { note: any }) {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <motion.div whileHover={{ y: -8 }} transition={{ type: 'spring', stiffness: 300 }}>
      <Card className="h-full border-none shadow-sm hover:shadow-xl transition-shadow bg-white rounded-[2.5rem] p-8 flex flex-col group overflow-hidden">
        
        {/* VIDEO PLAYER MODE */}
        {isPlaying && note.videoUrl ? (
          <div className="flex flex-col h-full animate-in fade-in zoom-in duration-300">
            <div className="flex justify-between items-center mb-4">
              <button 
                onClick={() => setIsPlaying(false)} 
                className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-[#0A4D68] transition-colors"
              >
                <ArrowLeft size={14} /> Back to Details
              </button>
              <span className="text-[10px] font-black text-red-500 uppercase tracking-widest bg-red-50 px-2 py-1 rounded-md">
                Playing
              </span>
            </div>
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black ring-4 ring-slate-50">
              <iframe 
                width="100%" 
                height="100%" 
                src={note.videoUrl} 
                title={note.title}
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
              ></iframe>
            </div>
            <h3 className="text-lg font-bold text-[#0A4D68] mt-4 line-clamp-1">{note.title}</h3>
            <p className="text-xs text-slate-400 mt-1">Resource Type: YouTube Reference</p>
          </div>
        ) : (
          /* STANDARD INFO MODE */
          <>
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

            <div className="flex-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{note.category}</span>
              <h3 className="text-xl font-bold text-[#0A4D68] mt-1 mb-3 group-hover:text-[#86C232] transition-colors">
                {note.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-6 line-clamp-2">
                {note.description}
              </p>
            </div>

            <div className="pt-6 border-t border-slate-50 flex items-center justify-between mt-auto">
              <div className="flex items-center gap-2 text-slate-400">
                <Clock size={14} />
                <span className="text-[10px] font-medium">{note.updated}</span>
              </div>
              <div className="flex gap-2">
                {note.type !== 'Video' && (
                  <Button size="icon" variant="ghost" className="rounded-full text-slate-400 hover:text-[#86C232] hover:bg-[#86C232]/10">
                    <Download size={18} />
                  </Button>
                )}
                <Button 
                  onClick={() => note.type === 'Video' && note.videoUrl ? setIsPlaying(true) : null}
                  className="rounded-xl bg-[#F8FAFC] text-[#0A4D68] hover:bg-[#86C232] hover:text-[#0A4D68] border-none font-bold text-xs px-5"
                >
                  {note.type === 'Video' ? 'Watch Now' : 'Open'}
                </Button>
              </div>
            </div>
          </>
        )}
      </Card>
    </motion.div>
  )
}