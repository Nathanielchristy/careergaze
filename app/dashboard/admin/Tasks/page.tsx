'use client'

import React, { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { 
  Zap, Flame, Layers, Check, Star, Menu,
  LayoutGrid, Users, LogOut, GraduationCap, X, MessageSquare,
  Clock, MoreHorizontal, AlertCircle, Plus,Banknote
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const INITIAL_TASKS = [
  { id: 1, title: 'Verify Rahul Sharma Documents', priority: 'high', status: 'pending', deadline: '2h left', category: 'KYC', points: 50 },
  { id: 2, title: 'Partner Meet: MIT College', priority: 'medium', status: 'in-progress', deadline: 'Tomorrow', category: 'Relations', points: 30 },
  { id: 3, title: 'Update Sheet for Feb Intake', priority: 'low', status: 'completed', deadline: 'Done', category: 'Admin', points: 10 },
  { id: 4, title: 'Review 12 Pending Apps', priority: 'high', status: 'pending', deadline: 'Today', category: 'Urgent', points: 100 },
];

export default function TaskPageWithSidebar() {
  const router = useRouter()
  const [filter, setFilter] = useState('all')
  const [tasks, setTasks] = useState(INITIAL_TASKS)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null)

  const filteredTasks = useMemo(() => {
    return tasks.filter(t => filter === 'all' || t.status === filter)
  }, [filter, tasks])

  const handleStatusChange = (id: number, newStatus: string) => {
    setTasks(prev => prev.map(t => 
      t.id === id ? { ...t, status: newStatus } : t
    ))
    setOpenDropdownId(null)
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans overflow-x-hidden">
      
      {/* --- SIDEBAR (Updated to match other pages) --- */}
      <aside className={`fixed inset-y-0 left-0 w-64 bg-[#0A4D68] text-white flex flex-col p-6 z-[60] transition-transform duration-300 lg:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="bg-[#86C232] p-2 rounded-lg"><GraduationCap className="text-[#0A4D68]" size={22} /></div>
            <span className="text-xl font-bold italic tracking-tight">Careergize</span>
          </div>
          <button onClick={() => setIsMobileMenuOpen(false)} className="lg:hidden p-1 hover:bg-white/10 rounded"><X size={20}/></button>
        </div>
        
          <nav className="space-y-2 flex-1">
          <Link href="/dashboard/admin"><SidebarItem icon={<LayoutGrid size={20}/>} label="Overview" /></Link>
          <Link href="/dashboard/admin/users"><SidebarItem icon={<Users size={20}/>} label="Registered Users" /></Link>
          <Link href="/dashboard/admin/students"><SidebarItem icon={<Users size={20}/>} label="Students"/></Link>
          <Link href="/dashboard/admin/payrolled">
           <SidebarItem icon={<Banknote size={20}/>} label="Student Payrolled" />
          </Link>
          <Link href="/dashboard/admin/Tasks"><SidebarItem icon={<Users size={20}/>} label="Tasks" /></Link>
          <SidebarItem icon={<MessageSquare size={20}/>} label="Chat with Team" />
        </nav>
        <div className="pt-6 border-t border-white/10">
          <SidebarItem icon={<LogOut size={18} />} label="Logout" onClick={() => { localStorage.clear(); router.push('/login'); }} />
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 flex flex-col min-w-0 lg:ml-64 transition-all">
        
        {/* HEADER (Updated to match other pages) */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40 flex items-center justify-between px-6 md:px-10">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2 text-[#0A4D68] hover:bg-slate-100 rounded-xl">
              <Menu size={24} />
            </button>
            <h2 className="text-[#0A4D68] font-black text-lg tracking-tight uppercase">Focus Zone</h2>
          </div>
          
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-[#0A4D68] flex items-center justify-center font-bold text-[#86C232] text-xs">AD</div>
          </div>
        </header>

        <div className="p-6 md:p-10 max-w-6xl mx-auto w-full">
          
          {/* FILTER TABS */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar mb-8">
            {['all', 'pending', 'in-progress', 'completed'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`whitespace-nowrap px-6 py-2.5 rounded-xl text-[10px] font-black transition-all uppercase tracking-widest ${
                  filter === tab ? 'bg-[#0A4D68] text-[#86C232] shadow-lg shadow-[#0A4D68]/20' : 'bg-white text-slate-400 border border-slate-100'
                }`}
              >
                {tab.replace('-', ' ')}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
            
            {/* STATS COLUMN */}
            <div className="xl:col-span-4 space-y-6">
              <Card className="bg-[#0A4D68] p-8 rounded-[2rem] text-white overflow-hidden relative border-none shadow-xl shadow-[#0A4D68]/20">
                <div className="relative z-10">
                  <p className="text-[#86C232] font-bold text-[10px] uppercase tracking-widest mb-4">Daily Goal</p>
                  <h2 className="text-2xl font-black mb-6 italic">60% Completed</h2>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-4">
                    <motion.div initial={{width: 0}} animate={{width: '60%'}} className="h-full bg-[#86C232]" />
                  </div>
                </div>
                <Zap className="absolute -bottom-6 -right-6 text-white/5 w-32 h-32" />
              </Card>

              <Card className="p-6 rounded-[2rem] bg-white border-none shadow-sm flex items-center gap-4 group hover:bg-[#86C232] transition-all cursor-pointer">
                <div className="p-3 bg-orange-100 text-orange-600 rounded-xl group-hover:bg-white transition-colors"><Flame className="w-5 h-5"/></div>
                <div>
                  <p className="font-black text-sm uppercase tracking-tight text-[#0A4D68]">High Priority</p>
                  <p className="text-[10px] font-bold text-slate-400 group-hover:text-[#0A4D68]/60 uppercase">2 items remaining</p>
                </div>
              </Card>
            </div>

            {/* TASK LIST COLUMN */}
            <div className="xl:col-span-8">
              <LayoutGroup>
                <motion.div layout className="space-y-4">
                  <AnimatePresence mode='popLayout'>
                    {filteredTasks.map((task) => (
                      <motion.div
                        key={task.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                      >
                        <div className="bg-white p-5 rounded-[1.8rem] flex items-center justify-between shadow-sm border border-slate-100 hover:border-[#86C232] transition-all group">
                          <div className="flex items-center gap-5 overflow-hidden">
                            <div className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center transition-all border-2 ${
                                task.status === 'completed' ? 'bg-[#86C232] border-[#86C232] text-[#0A4D68]' :
                                task.status === 'in-progress' ? 'bg-blue-500 border-blue-500 text-white' :
                                'border-slate-50 bg-slate-50 text-slate-300'
                              }`}
                            >
                              {task.status === 'completed' && <Check size={20} strokeWidth={4} />}
                              {task.status === 'in-progress' && <Clock size={20} strokeWidth={3} />}
                              {task.status === 'pending' && <AlertCircle size={20} strokeWidth={2} />}
                            </div>

                            <div className="overflow-hidden">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-[9px] font-black uppercase text-[#86C232] bg-[#86C232]/10 px-2 py-0.5 rounded-lg">
                                  {task.category}
                                </span>
                                <span className="text-[9px] font-bold text-slate-300 flex items-center gap-1 uppercase">
                                  <Star size={10} fill="currentColor"/> {task.points} pts
                                </span>
                              </div>
                              <h3 className={`font-bold truncate text-sm md:text-base ${task.status === 'completed' ? 'line-through text-slate-300' : 'text-[#0A4D68]'}`}>
                                {task.title}
                              </h3>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 relative">
                            <div className="hidden sm:flex flex-col items-end">
                              <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest">Deadline</span>
                              <span className={`text-[11px] font-black uppercase ${task.priority === 'high' && task.status !== 'completed' ? 'text-red-500' : 'text-slate-500'}`}>
                                {task.deadline}
                              </span>
                            </div>
                            
                            <button 
                              onClick={() => setOpenDropdownId(openDropdownId === task.id ? null : task.id)}
                              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${openDropdownId === task.id ? 'bg-[#0A4D68] text-white' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
                            >
                              <MoreHorizontal size={20} />
                            </button>

                            <AnimatePresence>
                              {openDropdownId === task.id && (
                                <>
                                  <div className="fixed inset-0 z-10" onClick={() => setOpenDropdownId(null)} />
                                  <motion.div 
                                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: 10 }}
                                    className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 z-20"
                                  >
                                    {['pending', 'in-progress', 'completed'].map((s) => (
                                      <button
                                        key={s}
                                        onClick={() => handleStatusChange(task.id, s)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors ${task.status === s ? 'bg-[#86C232]/10 text-[#86C232]' : 'text-slate-400 hover:bg-slate-50'}`}
                                      >
                                        <div className={`w-2 h-2 rounded-full ${s === 'completed' ? 'bg-green-500' : s === 'in-progress' ? 'bg-blue-500' : 'bg-slate-300'}`} />
                                        {s.replace('-', ' ')}
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
                <div className="text-center py-20 bg-white rounded-[2rem] border-2 border-dashed border-slate-100">
                  <Layers className="mx-auto text-slate-200 mb-4 w-12 h-12" />
                  <h2 className="text-lg font-black text-slate-300 uppercase tracking-tighter">Inbox Zero</h2>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Everything is completed!</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* FLOATING ACTION BUTTON */}
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-8 right-8 w-16 h-16 bg-[#86C232] text-[#0A4D68] rounded-[1.5rem] shadow-2xl shadow-[#86C232]/30 flex items-center justify-center z-50 border-4 border-white"
        >
          <Plus size={28} strokeWidth={3} />
        </motion.button>
      </main>
    </div>
  )
}

function SidebarItem({ icon, label, active, onClick }: any) {
  return (
    <div 
      onClick={onClick} 
      className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${
        active 
        ? 'bg-[#86C232] text-[#0A4D68] font-bold shadow-lg shadow-[#86C232]/20' 
        : 'text-white/60 hover:text-white hover:bg-white/5'
      }`}
    >
      {icon} <span className="text-sm">{label}</span>
    </div>
  )
}