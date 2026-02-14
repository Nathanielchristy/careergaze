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
  const [updatingId, setUpdatingId] = useState<string | null>(null) // Track which task is syncing
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

  // NEW: Function to update status in Google Sheets
  const handleStatusUpdate = async (taskTitle: string, newStatus: string) => {
    setUpdatingId(taskTitle);
    setOpenDropdownId(null);
    
    try {
      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Apps Script requires no-cors for simple redirects
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'updateStatus',
          taskTitle: taskTitle,
          status: newStatus,
          userEmail: userEmail
        })
      });

      // Since 'no-cors' doesn't return a body, we optimistically update UI
      setTasks(prev => prev.map(t => 
        t.taskTitle === taskTitle ? { ...t, status: newStatus } : t
      ));
      
      // Refresh data after a short delay to ensure sheet synced
      setTimeout(fetchTasks, 1500);
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update status. Please try again.");
    } finally {
      setUpdatingId(null);
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

  if (loading && tasks.length === 0) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F0F4F8]">
      <Loader2 className="animate-spin text-[#0A4D68]" size={40} />
      <p className="mt-4 text-[#0A4D68] font-black text-[10px] tracking-widest uppercase opacity-40">Energizing Workspace...</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#F0F4F8] text-[#0A4D68]">
      
      {/* SIDEBAR (Shortened for brevity, same as yours) */}
      <aside className={`fixed left-0 top-0 h-full w-72 bg-[#0A4D68] text-white flex flex-col p-6 z-[70] transition-transform lg:translate-x-0 lg:w-64 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="items-center gap-3 mb-10 hidden lg:flex">
          <div className="bg-[#86C232] p-2 rounded-lg"><GraduationCap size={24} /></div>
          <span className="text-xl font-bold italic">Careergize</span>
        </div>
        <nav className="space-y-2 flex-1">
          <SidebarItem icon={<LayoutGrid size={20}/>} label="My Workspace" />
          <Link href="/dashboard/notes"><SidebarItem icon={<FileText size={20} />} label="Learning Notes" /></Link>
          <SidebarItem icon={<Layers size={20}/>} label="Tasks & Projects" active />
        </nav>
      </aside>

      <main className="lg:ml-64 p-4 md:p-8 lg:p-12 min-h-screen">
        <header className="max-w-7xl mx-auto mb-8 lg:mb-12 flex flex-col gap-6">
          <div className="flex justify-between items-end">
            <div className="space-y-1">
              <h1 className="text-3xl md:text-5xl font-black tracking-tight">Carrergize Focus <span className="text-[#86C232]">Zone</span></h1>
              <p className="text-slate-500 font-bold text-sm">Hello, {userName.split(' ')[0]}! Let's update your progress.</p>
            </div>
            <Button onClick={fetchTasks} variant="ghost" className="rounded-full bg-white shadow-sm">
               <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
            </Button>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar lg:bg-white/50 lg:backdrop-blur-md lg:p-2 lg:rounded-[2rem] lg:shadow-sm lg:w-max lg:border lg:border-white">
            {['all', 'pending', 'in-progress', 'completed'].map((tab) => (
              <button key={tab} onClick={() => setFilter(tab)}
                className={`whitespace-nowrap px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${filter === tab ? 'bg-[#0A4D68] text-white' : 'text-slate-400'}`}>
                {tab.replace('-', ' ')}
              </button>
            ))}
          </div>
        </header>

        <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-12 gap-6 lg:gap-10">
          <div className="xl:col-span-4 space-y-6">
             {/* Progress Card */}
             <Card className="bg-[#0A4D68] p-8 rounded-[3rem] text-white relative overflow-hidden border-none shadow-xl">
               <p className="text-[#86C232] font-bold text-[10px] uppercase tracking-widest mb-4">Mastery Score</p>
               <h2 className="text-3xl font-black mb-6">{stats}% Completed</h2>
               <div className="h-3 bg-white/10 rounded-full overflow-hidden"><motion.div animate={{width: `${stats}%`}} className="h-full bg-[#86C232]" /></div>
               <Zap className="absolute -bottom-6 -right-6 text-white/5 w-32 h-32" />
             </Card>
          </div>

          <div className="xl:col-span-8">
            <LayoutGroup>
              <div className="space-y-4">
                <AnimatePresence mode='popLayout'>
                  {filteredTasks.map((task, idx) => (
                    <motion.div key={task.taskTitle + idx} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <div className="bg-white p-6 rounded-[2.2rem] flex items-center justify-between shadow-sm border border-slate-100 hover:border-[#86C232] transition-all">
                        <div className="flex items-center gap-6 overflow-hidden">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border-2 ${
                            task.status?.toLowerCase() === 'completed' ? 'bg-[#86C232] border-[#86C232] text-[#0A4D68]' : 
                            task.status?.toLowerCase() === 'in-progress' ? 'bg-blue-500 border-blue-500 text-white' : 'text-slate-300'
                          }`}>
                            {updatingId === task.taskTitle ? <Loader2 className="animate-spin" /> : (task.status?.toLowerCase() === 'completed' ? <Check strokeWidth={4} /> : <Clock />)}
                          </div>
                          <div className="truncate">
                            <span className="text-[10px] font-black uppercase text-[#86C232]">{task.category || 'TASK'}</span>
                            <h3 className={`text-xl font-bold truncate ${task.status?.toLowerCase() === 'completed' ? 'line-through opacity-40' : ''}`}>{task.taskTitle}</h3>
                          </div>
                        </div>

                        {/* STATUS DROPDOWN */}
                        <div className="relative">
                          <button onClick={() => setOpenDropdownId(openDropdownId === task.taskTitle ? null : task.taskTitle)}
                            className="p-3 bg-slate-50 rounded-2xl text-slate-400 hover:bg-slate-100 transition-colors">
                            <MoreHorizontal />
                          </button>
                          
                          <AnimatePresence>
                            {openDropdownId === task.taskTitle && (
                              <>
                                <div className="fixed inset-0 z-10" onClick={() => setOpenDropdownId(null)} />
                                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 z-20">
                                  {['pending', 'in-progress', 'completed'].map((s) => (
                                    <button key={s} onClick={() => handleStatusUpdate(task.taskTitle, s)}
                                      className="w-full text-left px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 flex items-center gap-2">
                                      <div className={`w-2 h-2 rounded-full ${s === 'completed' ? 'bg-green-500' : s === 'in-progress' ? 'bg-blue-500' : 'bg-slate-300'}`} />
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
              </div>
            </LayoutGroup>
          </div>
        </div>
      </main>
    </div>
  )
}

function SidebarItem({ icon, label, active }: any) {
  return (
    <div className={`flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition-all ${active ? 'bg-[#86C232] text-[#0A4D68] font-bold shadow-lg' : 'text-white/60 hover:text-white hover:bg-white/5'}`}>
      {icon} <span className="text-sm">{label}</span>
    </div>
  )
}