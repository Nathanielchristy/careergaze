'use client'

import React, { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { 
  Zap, Layers, Check, Star, Menu,
  LayoutGrid, LogOut, GraduationCap, X, MessageSquare,
  Clock, MoreHorizontal, AlertCircle, Flame, Send, FileText, Award, Loader2
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

// USING YOUR RECENT SCRIPT URL
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwqpmcrYXG_bLhg_LBdHG9P5T0jbMp7d9TeFFZP_skP7VXjWo08pTRKeb_C-Pi6BkPe/exec'

export default function InternFocusZone() {
  const [tasks, setTasks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null)
  const [userEmail, setUserEmail] = useState('')
  const [userName, setUserName] = useState('Intern')

  // --- 1. INITIALIZE USER & FETCH DATA ---
  useEffect(() => {
    const email = localStorage.getItem('userEmail') || ''
    const name = localStorage.getItem('userName') || 'Intern'
    setUserEmail(email)
    setUserName(name)
    fetchUserTasks(email)
  }, [])

  const fetchUserTasks = async (email: string) => {
    setLoading(true)
    try {
      const res = await fetch(`${SCRIPT_URL}?t=${Date.now()}`)
      const data = await res.json()
      
      // Filter tasks strictly for the logged-in user
      const userTasks = (data.tasks || []).filter((t: any) => 
        t.studentEmail?.toLowerCase() === email.toLowerCase()
      )
      setTasks(userTasks)
    } catch (err) {
      console.error("Failed to load tasks", err)
    } finally {
      setLoading(false)
    }
  }

  // --- 2. DYNAMIC CALCULATIONS ---
  const filteredTasks = useMemo(() => {
    return tasks.filter(t => filter === 'all' || t.status?.toLowerCase() === filter.toLowerCase())
  }, [filter, tasks])

  const completionRate = useMemo(() => {
    if (tasks.length === 0) return 0
    const done = tasks.filter(t => t.status?.toLowerCase() === 'completed').length
    return Math.round((done / tasks.length) * 100)
  }, [tasks])

  const urgentTask = useMemo(() => {
    return tasks.find(t => t.priority?.toLowerCase() === 'high' && t.status !== 'completed')
  }, [tasks])

  // --- 3. UI HANDLERS ---
  const handleStatusChange = (index: number, newStatus: string) => {
    // Note: In a real app, you'd send a POST to the script here to update the sheet
    const updated = [...tasks]
    updated[index].status = newStatus
    setTasks(updated)
    setOpenDropdownId(null)
  }

  if (loading) return (
    <div className="min-h-screen bg-[#F0F4F8] flex flex-col items-center justify-center">
      <Loader2 className="animate-spin text-[#0A4D68] mb-4" size={40} />
      <p className="text-[#0A4D68] font-bold text-xs tracking-widest uppercase">Syncing your workspace...</p>
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
          <SidebarItem icon={<LayoutGrid className="w-5 h-5"/>} label="My Workspace" active />
          <SidebarItem icon={<FileText className="w-5 h-5"/>} label="Learning Notes" />
          <SidebarItem icon={<MessageSquare className="w-5 h-5"/>} label="Mentor Chat" />
          <SidebarItem icon={<Award className="w-5 h-5"/>} label="Certification" />
        </nav>

        <div className="mt-auto pt-6 border-t border-white/10">
          <p className="text-[10px] text-white/40 uppercase mb-4 px-4 font-bold tracking-widest">Logged in as {userName}</p>
          <SidebarItem icon={<LogOut className="w-5 h-5" />} label="Logout" onClick={() => { localStorage.clear(); window.location.href='/login'; }} />
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="lg:ml-64 p-4 md:p-8 lg:p-12 min-h-screen">
        
        <header className="max-w-7xl mx-auto mb-8 lg:mb-12 flex flex-col gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl md:text-5xl font-black tracking-tight">Hey {userName.split(' ')[0]}, <span className="text-[#86C232]">Focus!</span></h1>
            <p className="text-slate-500 font-bold text-sm uppercase tracking-widest">You have {tasks.filter(t => t.status !== 'completed').length} active tasks</p>
          </div>

          {/* FILTER TABS */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar lg:bg-white/50 lg:backdrop-blur-md lg:p-2 lg:rounded-[2rem] lg:shadow-sm lg:w-max lg:border lg:border-white">
            {['all', 'pending', 'completed'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`whitespace-nowrap px-6 py-2.5 md:px-8 md:py-3 rounded-xl md:rounded-[1.5rem] text-xs md:text-sm font-black transition-all uppercase tracking-widest ${
                  filter === tab ? 'bg-[#0A4D68] text-white shadow-lg' : 'bg-white lg:bg-transparent text-slate-400 hover:text-[#0A4D68]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </header>

        <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-12 gap-6 lg:gap-10">
          
          {/* STATS COLUMN */}
          <div className="xl:col-span-4 space-y-4 md:space-y-6">
            <Card className="bg-[#0A4D68] p-6 md:p-8 rounded-[2rem] md:rounded-[3rem] text-white overflow-hidden relative border-none shadow-xl">
              <div className="relative z-10">
                <p className="text-[#86C232] font-bold text-[10px] uppercase tracking-widest mb-2 md:mb-4">Goal Progress</p>
                <h2 className="text-xl md:text-3xl font-black mb-4 md:mb-6">{completionRate}% Done</h2>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden mb-4">
                  <motion.div initial={{width: 0}} animate={{width: `${completionRate}%`}} className="h-full bg-[#86C232]" />
                </div>
              </div>
              <Zap className="absolute -bottom-6 -right-6 text-white/5 w-24 h-24 md:w-32 md:h-32" />
            </Card>

            {urgentTask && (
              <Card className="p-6 md:p-8 rounded-[2rem] md:rounded-[3rem] bg-white border-none shadow-sm flex items-center justify-between group hover:bg-orange-500 transition-all cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-orange-100 text-orange-600 rounded-xl group-hover:bg-white"><Flame className="w-5 h-5"/></div>
                  <div>
                    <p className="font-black text-base md:text-lg group-hover:text-white">Priority Focus</p>
                    <p className="text-xs text-slate-400 group-hover:text-white/80 truncate w-32 md:w-48">{urgentTask.taskTitle}</p>
                  </div>
                </div>
                <Button size="icon" className="rounded-full bg-slate-100 text-slate-400 group-hover:bg-white group-hover:text-orange-500">
                   <Send size={16} />
                </Button>
              </Card>
            )}
          </div>

          {/* TASK LIST COLUMN */}
          <div className="xl:col-span-8">
            <LayoutGroup>
              <motion.div layout className="space-y-3 md:space-y-4">
                <AnimatePresence mode='popLayout'>
                  {filteredTasks.map((task, idx) => (
                    <motion.div
                      key={idx}
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
                              'border-slate-100 text-slate-300'
                            }`}
                          >
                            {task.status?.toLowerCase() === 'completed' ? <Check className="w-5 h-5 md:w-6 md:h-6" strokeWidth={4} /> : <Clock className="w-5 h-5 md:w-6 md:h-6" />}
                          </div>

                          <div className="overflow-hidden">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-[8px] md:text-[10px] font-black uppercase text-[#86C232] bg-[#86C232]/10 px-1.5 py-0.5 rounded">
                                {task.category}
                              </span>
                              <span className={`text-[8px] md:text-[10px] font-black uppercase px-2 py-0.5 rounded ${task.priority === 'High' ? 'bg-red-50 text-red-500' : 'bg-slate-50 text-slate-400'}`}>
                                {task.priority}
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
                            <span className={`text-[10px] md:text-sm font-bold text-slate-500`}>
                              {task.endDate || 'No Date'}
                            </span>
                          </div>
                          
                          <button 
                            onClick={() => setOpenDropdownId(openDropdownId === idx ? null : idx)}
                            className={`w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-2xl flex items-center justify-center transition-all ${openDropdownId === idx ? 'bg-[#0A4D68] text-white shadow-lg' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
                          >
                            <MoreHorizontal className="w-5 h-5 md:w-6 md:h-6" />
                          </button>

                          <AnimatePresence>
                            {openDropdownId === idx && (
                              <>
                                <div className="fixed inset-0 z-10" onClick={() => setOpenDropdownId(null)} />
                                <motion.div 
                                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                  animate={{ opacity: 1, scale: 1, y: 0 }}
                                  exit={{ opacity: 0, scale: 0.9, y: 10 }}
                                  className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 z-20"
                                >
                                  {['pending', 'completed'].map((s) => (
                                    <button
                                      key={s}
                                      onClick={() => handleStatusChange(idx, s)}
                                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-colors ${task.status === s ? 'bg-[#86C232]/10 text-[#86C232]' : 'text-slate-400 hover:bg-slate-50'}`}
                                    >
                                      {s}
                                    </button>
                                  ))}
                                </motion.div>
                              </>
                            )}
                          </AnimatePresence>
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
                <h2 className="text-xl md:text-2xl font-black text-slate-300 uppercase tracking-widest">Workspace Clear</h2>
                <p className="text-xs md:text-sm text-slate-400 font-bold">No tasks found for your profile today.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

function SidebarItem({ icon, label, active, onClick }: any) {
  return (
    <div 
      onClick={onClick} 
      className={`flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition-all ${
        active 
        ? 'bg-[#86C232] text-[#0A4D68] font-bold shadow-lg' 
        : 'text-white/60 hover:text-white hover:bg-white/5'
      }`}
    >
      {icon} <span className="text-sm">{label}</span>
    </div>
  )
}