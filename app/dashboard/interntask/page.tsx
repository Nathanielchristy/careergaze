'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { 
  Zap, Layers, Check, Menu, LayoutGrid, LogOut, GraduationCap, X, 
  MessageSquare, Clock, MoreHorizontal, AlertCircle, RefreshCw, 
  Loader2, Star, Flame, Send, FileText, Award
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwqpmcrYXG_bLhg_LBdHG9P5T0jbMp7d9TeFFZP_skP7VXjWo08pTRKeb_C-Pi6BkPe/exec'

export default function InternTaskPage() {
  const [tasks, setTasks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null)
  const [userEmail, setUserEmail] = useState('')
  const [userName, setUserName] = useState('')

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail')
    const storedName = localStorage.getItem('userName')
    if (storedEmail) setUserEmail(storedEmail)
    if (storedName) setUserName(storedName)
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${SCRIPT_URL}?t=${Date.now()}`)
      const data = await res.json()
      setTasks(data.tasks || [])
    } catch (err) {
      console.error("Error fetching tasks:", err)
    } finally {
      setLoading(false)
    }
  }

  const filteredTasks = useMemo(() => {
    return tasks.filter(t => {
      const isMyTask = t.studentEmail?.toLowerCase() === userEmail.toLowerCase() || 
                       t.studentName?.toLowerCase() === userName.toLowerCase();
      const matchesTab = filter === 'all' ? true : t.status?.toLowerCase() === filter.toLowerCase();
      return isMyTask && matchesTab;
    })
  }, [tasks, userEmail, userName, filter])

  const stats = useMemo(() => {
    const myTasks = tasks.filter(t => t.studentEmail?.toLowerCase() === userEmail.toLowerCase());
    const total = myTasks.length;
    const completed = myTasks.filter(t => t.status?.toLowerCase() === 'completed').length;
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  }, [tasks, userEmail]);

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F0F4F8]">
      <Loader2 className="animate-spin text-[#0A4D68]" size={40} />
      <p className="mt-4 text-[#0A4D68] font-black text-[10px] tracking-widest uppercase opacity-40">Energizing Workspace...</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#F0F4F8] text-[#0A4D68]">
      
      {/* MOBILE HEADER */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-[#0A4D68] text-white sticky top-0 z-[60]">
        <div className="flex items-center gap-2">
          <div className="bg-[#86C232] p-1.5 rounded-lg"><GraduationCap className="text-[#0A4D68] w-5 h-5" /></div>
          <span className="font-bold uppercase tracking-wider text-sm">Careergize</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* SIDEBAR */}
      <aside className={`fixed left-0 top-0 h-full w-72 bg-[#0A4D68] text-white flex flex-col p-6 z-[70] transition-transform lg:translate-x-0 lg:w-64 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="items-center gap-3 mb-10 hidden lg:flex">
          <div className="bg-[#86C232] p-2 rounded-lg"><GraduationCap className="text-[#0A4D68] w-6 h-6" /></div>
          <span className="text-xl font-bold italic">Careergize</span>
        </div>
        
        <nav className="space-y-2 flex-1">
          <SidebarItem icon={<LayoutGrid size={20}/>} label="My Workspace" />
            <Link href="/dashboard/notes">
            <SidebarItem icon={<FileText size={20} />} label="Learning Notes" />
          </Link>
          <SidebarItem icon={<Layers size={20}/>} label="Tasks & Projects" active />
          <SidebarItem icon={<MessageSquare size={20}/>} label="Mentor Chat" />
          <SidebarItem icon={<Award size={20}/>} label="Certification" />
        </nav>

        <div className="mt-auto pt-6 border-t border-white/10">
          <button onClick={() => { localStorage.clear(); window.location.reload(); }} className="w-full">
            <SidebarItem icon={<LogOut size={20} />} label="Logout" />
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="lg:ml-64 p-4 md:p-8 lg:p-12 min-h-screen">
        
        <header className="max-w-7xl mx-auto mb-8 lg:mb-12 flex flex-col gap-6">
          <div className="flex justify-between items-end">
            <div className="space-y-1">
              <h1 className="text-3xl md:text-5xl font-black tracking-tight">Carrergize Focus <span className="text-[#86C232]">Zone</span></h1>
              <p className="text-slate-500 font-bold text-sm">Hello, {userName.split(' ')[0]}! Let's energize with careergize.</p>
            </div>
            <Button onClick={fetchTasks} variant="ghost" className="hidden md:flex rounded-full hover:bg-white text-[#0A4D68]">
               <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
            </Button>
          </div>

          {/* FILTER TABS (RESTORED OLD DESIGN) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar lg:bg-white/50 lg:backdrop-blur-md lg:p-2 lg:rounded-[2rem] lg:shadow-sm lg:w-max lg:border lg:border-white">
            {['all', 'pending', 'in-progress', 'completed'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`whitespace-nowrap px-6 py-2.5 md:px-8 md:py-3 rounded-xl md:rounded-[1.5rem] text-xs md:text-sm font-black transition-all uppercase tracking-widest ${
                  filter === tab ? 'bg-[#0A4D68] text-white shadow-lg' : 'bg-white lg:bg-transparent text-slate-400'
                }`}
              >
                {tab.replace('-', ' ')}
              </button>
            ))}
          </div>
        </header>

        <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-12 gap-6 lg:gap-10">
          
          {/* STATS COLUMN */}
          <div className="xl:col-span-4 space-y-4 md:space-y-6">
            <Card className="bg-[#0A4D68] p-6 md:p-8 rounded-[2rem] md:rounded-[3rem] text-white overflow-hidden relative border-none shadow-xl">
              <div className="relative z-10">
                <p className="text-[#86C232] font-bold text-[10px] uppercase tracking-widest mb-2 md:mb-4">Weekly Progress</p>
                <h2 className="text-xl md:text-3xl font-black mb-4 md:mb-6">{stats}% of Tasks done</h2>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden mb-4">
                  <motion.div initial={{width: 0}} animate={{width: `${stats}%`}} className="h-full bg-[#86C232]" />
                </div>
              </div>
              <Zap className="absolute -bottom-6 -right-6 text-white/5 w-24 h-24 md:w-32 md:h-32" />
            </Card>

            <Card className="p-6 md:p-8 rounded-[2rem] md:rounded-[3rem] bg-white border-none shadow-sm flex items-center justify-between group hover:bg-[#86C232] transition-all cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-100 text-orange-600 rounded-xl group-hover:bg-white"><Flame className="w-5 h-5"/></div>
                <div>
                  <p className="font-black text-base md:text-lg group-hover:text-[#0A4D68]">Quick Insight</p>
                  <p className="text-xs text-slate-400 group-hover:text-[#0A4D68]/60">Check latest documentation</p>
                </div>
              </div>
              <Button size="icon" className="rounded-full bg-slate-100 text-slate-400 group-hover:bg-white group-hover:text-[#0A4D68]">
                  <Send size={16} />
              </Button>
            </Card>
          </div>

          {/* TASK LIST COLUMN */}
          <div className="xl:col-span-8">
            <LayoutGroup>
              <motion.div layout className="space-y-3 md:space-y-4">
                <AnimatePresence mode='popLayout'>
                  {filteredTasks.map((task, idx) => (
                    <motion.div
                      key={task.taskTitle + idx}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="relative"
                    >
                      <div className="bg-white p-4 md:p-6 rounded-[1.5rem] md:rounded-[2.2rem] flex items-center justify-between shadow-sm border border-slate-100/50 hover:border-[#86C232] transition-colors">
                        <div className="flex items-center gap-3 md:gap-6 overflow-hidden">
                          
                          <div className={`flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center transition-all border-2 ${
                              task.status?.toLowerCase() === 'completed' ? 'bg-[#86C232] border-[#86C232] text-[#0A4D68]' :
                              task.status?.toLowerCase() === 'in-progress' ? 'bg-blue-500 border-blue-500 text-white' :
                              'border-slate-100 text-slate-300'
                            }`}
                          >
                            {task.status?.toLowerCase() === 'completed' ? <Check size={24} strokeWidth={4} /> : <Clock size={24} />}
                          </div>

                          <div className="overflow-hidden">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-[8px] md:text-[10px] font-black uppercase text-[#86C232] bg-[#86C232]/10 px-1.5 py-0.5 rounded">
                                {task.category || 'General'}
                              </span>
                              <span className="text-[8px] md:text-[10px] font-bold text-slate-300 flex items-center gap-1">
                                <Star className="w-2 h-2" fill="currentColor"/> 20p
                              </span>
                            </div>
                            <h3 className={`text-sm md:text-xl font-bold truncate ${task.status?.toLowerCase() === 'completed' ? 'line-through text-slate-300' : 'text-[#0A4D68]'}`}>
                              {task.taskTitle}
                            </h3>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 md:gap-4 ml-2 relative">
                          <div className="hidden sm:flex flex-col items-end">
                            <span className="text-[8px] font-black text-slate-300 uppercase tracking-tighter text-right">Deadline</span>
                            <span className="text-[10px] md:text-sm font-bold text-slate-500">
                              {task.endDate || 'TBD'}
                            </span>
                          </div>
                          
                          <button 
                            onClick={() => setOpenDropdownId(openDropdownId === task.taskTitle ? null : task.taskTitle)}
                            className={`w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-2xl flex items-center justify-center transition-all ${openDropdownId === task.taskTitle ? 'bg-[#0A4D68] text-white shadow-lg' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
                          >
                            <MoreHorizontal size={24} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </LayoutGroup>

            {filteredTasks.length === 0 && (
              <div className="text-center py-20 border-4 border-dashed border-white rounded-[4rem]">
                <Layers className="mx-auto text-slate-200 mb-4 w-12 h-12 md:w-16 md:h-16" />
                <h2 className="text-xl md:text-2xl font-black text-slate-300 uppercase">Inbox Zero</h2>
                <p className="text-xs md:text-sm text-slate-400 font-bold">You're all caught up!</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

function SidebarItem({ icon, label, active }: any) {
  return (
    <div className={`flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition-all ${
        active 
        ? 'bg-[#86C232] text-[#0A4D68] font-bold shadow-lg' 
        : 'text-white/60 hover:text-white hover:bg-white/5'
      }`}
    >
      {icon} <span className="text-sm">{label}</span>
    </div>
  )
}