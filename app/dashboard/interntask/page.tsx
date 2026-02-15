'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { 
  Zap, Check, Menu, LayoutGrid, LogOut, GraduationCap, X, 
  MessageSquare, Clock, MoreHorizontal, RefreshCw, 
  Loader2, FileText, Award, CheckSquare, Calendar, AlertCircle, Info
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwqpmcrYXG_bLhg_LBdHG9P5T0jbMp7d9TeFFZP_skP7VXjWo08pTRKeb_C-Pi6BkPe/exec'

export default function InternTaskPage() {
  const router = useRouter()
  const [tasks, setTasks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState<string | null>(null)
  const [filter, setFilter] = useState('all')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null)
  const [selectedTask, setSelectedTask] = useState<any>(null) // New: For Detail Drawer
  const [userEmail, setUserEmail] = useState('')
  const [userName, setUserName] = useState('')

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn')
    const storedEmail = localStorage.getItem('userEmail')
    const storedName = localStorage.getItem('userName')
    
    if (!loggedIn || loggedIn !== 'true') {
      router.push('/login')
    } else {
      if (storedEmail) setUserEmail(storedEmail)
      if (storedName) setUserName(storedName || 'Intern')
      fetchTasks()
    }
  }, [router])

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

  const handleLogout = () => {
    localStorage.clear()
    router.push('/login')
  }

  const handleStatusUpdate = async (taskTitle: string, newStatus: string) => {
    setUpdatingId(taskTitle);
    setOpenDropdownId(null);
    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'updateStatus',
          taskTitle: taskTitle,
          status: newStatus,
          userEmail: userEmail
        })
      });
      setTasks(prev => prev.map(t => 
        t.taskTitle === taskTitle ? { ...t, status: newStatus } : t
      ));
      setTimeout(fetchTasks, 1500);
    } catch (err) {
      console.error("Update failed:", err);
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
          <Link href="/dashboard/interntask"><SidebarItem icon={<CheckSquare size={20} />} label="Tasks & Projects" active /></Link>
          <SidebarItem icon={<MessageSquare size={20} />} label="Mentor Chat" />
          <SidebarItem icon={<Award size={20} />} label="Final Certification" />
        </nav>
        
        <div className="mt-auto pt-6 border-t border-white/10">
          <SidebarItem icon={<LogOut size={20} />} label="Logout" onClick={handleLogout} />
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="transition-all duration-300 lg:ml-64 p-4 md:p-8 lg:p-12 min-h-screen">
        <header className="max-w-7xl mx-auto mb-8 lg:mb-12">
          <div className="flex justify-between items-end mb-8">
            <div className="space-y-1">
              <h1 className="text-3xl md:text-5xl font-black tracking-tight">Focus <span className="text-[#86C232]">Zone</span></h1>
              <p className="text-slate-500 font-bold text-sm">Hello, {userName.split(' ')[0]}! Track your active deployments.</p>
            </div>
            <Button onClick={fetchTasks} variant="ghost" className="rounded-full bg-white shadow-sm hover:bg-slate-50">
               <RefreshCw size={20} className={loading ? 'animate-spin text-[#86C232]' : 'text-[#0A4D68]'} />
            </Button>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar lg:bg-white/50 lg:p-2 lg:rounded-[2rem] lg:w-max lg:border">
            {['all', 'pending', 'in-progress', 'completed'].map((tab) => (
              <button key={tab} onClick={() => setFilter(tab)}
                className={`whitespace-nowrap px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${filter === tab ? 'bg-[#0A4D68] text-white' : 'text-slate-400'}`}>
                {tab.replace('-', ' ')}
              </button>
            ))}
          </div>
        </header>

        <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-12 gap-6 lg:gap-10">
          {/* Progress Card */}
          <div className="xl:col-span-4 space-y-6">
             <Card className="bg-[#0A4D68] p-8 rounded-[3rem] text-white relative overflow-hidden border-none shadow-xl">
               <p className="text-[#86C232] font-bold text-[10px] uppercase tracking-widest mb-4">Overall Mastery</p>
               <h2 className="text-3xl font-black mb-6">{stats}% Success</h2>
               <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                 <motion.div initial={{ width: 0 }} animate={{ width: `${stats}%` }} className="h-full bg-[#86C232]" />
               </div>
               <Zap className="absolute -bottom-6 -right-6 text-white/5 w-32 h-32" />
             </Card>
          </div>

          {/* Tasks List */}
          <div className="xl:col-span-8">
            <LayoutGroup>
              <div className="space-y-4">
                <AnimatePresence mode='popLayout'>
                  {loading && tasks.length === 0 ? (
                    <div className="py-20 flex flex-col items-center">
                       <Loader2 className="animate-spin text-[#86C232] mb-4" size={40} />
                    </div>
                  ) : filteredTasks.map((task, idx) => (
                    <motion.div key={task.taskTitle + idx} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                      <div className="bg-white p-6 rounded-[2.2rem] flex items-center justify-between shadow-sm border border-slate-100 hover:border-[#86C232] transition-all group">
                        <div 
                          className="flex items-center gap-6 overflow-hidden cursor-pointer flex-1"
                          onClick={() => setSelectedTask(task)}
                        >
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border-2 transition-colors ${
                            task.status?.toLowerCase() === 'completed' ? 'bg-[#86C232] border-[#86C232] text-[#0A4D68]' : 
                            task.status?.toLowerCase() === 'in-progress' ? 'bg-blue-500 border-blue-500 text-white' : 'text-slate-300 border-slate-100'
                          }`}>
                            {updatingId === task.taskTitle ? <Loader2 className="animate-spin" size={20} /> : (task.status?.toLowerCase() === 'completed' ? <Check strokeWidth={4} size={20} /> : <Clock size={20} />)}
                          </div>
                          <div className="truncate">
                            <div className="flex items-center gap-2 mb-1">
                               <span className="text-[9px] font-black uppercase text-[#86C232] bg-[#86C232]/10 px-2 py-0.5 rounded">{task.category || 'General'}</span>
                               {task.priority === 'High' || task.priority === 'Urgent' ? (
                                 <span className="text-[9px] font-black uppercase text-red-500 bg-red-50 px-2 py-0.5 rounded flex items-center gap-1">
                                   <AlertCircle size={10}/> {task.priority}
                                 </span>
                               ) : null}
                            </div>
                            <h3 className={`text-xl font-bold truncate ${task.status?.toLowerCase() === 'completed' ? 'line-through opacity-30' : ''}`}>{task.taskTitle}</h3>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1 flex items-center gap-1">
                              <Calendar size={12}/> Due: {task.endDate || 'No Date'}
                            </p>
                          </div>
                        </div>

                        <div className="relative flex items-center gap-2">
                          <button onClick={() => setSelectedTask(task)} className="p-3 bg-slate-50 rounded-2xl text-slate-400 hover:text-[#0A4D68] transition-all">
                            <Info size={20} />
                          </button>
                          
                          <button onClick={() => setOpenDropdownId(openDropdownId === task.taskTitle ? null : task.taskTitle)}
                            className="p-3 bg-slate-50 rounded-2xl text-slate-400 hover:bg-[#0A4D68] hover:text-white transition-all">
                            <MoreHorizontal size={20} />
                          </button>
                          
                          <AnimatePresence>
                            {openDropdownId === task.taskTitle && (
                              <>
                                <div className="fixed inset-0 z-10" onClick={() => setOpenDropdownId(null)} />
                                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="absolute right-0 mt-12 w-48 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 z-20">
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

      {/* TASK DETAIL DRAWER */}
      <AnimatePresence>
        {selectedTask && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedTask(null)} className="fixed inset-0 bg-[#0A4D68]/40 backdrop-blur-sm z-[80]" />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[90] shadow-2xl p-8 overflow-y-auto rounded-l-[3rem]">
              <div className="flex justify-between items-center mb-10">
                <div className="bg-[#86C232]/10 px-4 py-1 rounded-full">
                  <span className="text-[10px] font-black uppercase text-[#86C232] tracking-widest">{selectedTask.category}</span>
                </div>
                <button onClick={() => setSelectedTask(null)} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><X size={24}/></button>
              </div>

              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-black text-[#0A4D68] leading-tight mb-2">{selectedTask.taskTitle}</h2>
                  <div className="flex gap-3">
                    <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-lg ${selectedTask.priority === 'Urgent' ? 'bg-red-500 text-white' : 'bg-slate-100 text-slate-500'}`}>
                      {selectedTask.priority} Priority
                    </span>
                    <span className="text-[10px] font-black uppercase px-3 py-1 rounded-lg bg-blue-50 text-blue-500">
                      {selectedTask.status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-2xl">
                    <p className="text-[9px] font-black uppercase text-slate-400 mb-1 tracking-widest">Start Date</p>
                    <p className="font-bold text-sm">{selectedTask.startDate || '---'}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl">
                    <p className="text-[9px] font-black uppercase text-slate-400 mb-1 tracking-widest">Deadline</p>
                    <p className="font-bold text-sm text-red-500">{selectedTask.endDate || '---'}</p>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400 mb-3 block tracking-widest">Instructions & Deliverables</label>
                  <div className="bg-slate-50/50 border border-slate-100 p-6 rounded-[2rem] min-h-[150px]">
                    <p className="text-sm leading-relaxed font-medium whitespace-pre-wrap">
                      {selectedTask.instructions || "No specific instructions provided for this task. Please reach out to your mentor if you have questions."}
                    </p>
                  </div>
                </div>

                <Button 
                  onClick={() => {
                    handleStatusUpdate(selectedTask.taskTitle, 'in-progress');
                    setSelectedTask(null);
                  }}
                  className="w-full h-16 bg-[#0A4D68] text-[#86C232] font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-[#0A4D68]/20 hover:bg-black transition-all"
                >
                  Mark as In-Progress
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

function SidebarItem({ icon, label, active, onClick }: any) {
  return (
    <div onClick={onClick} className={`flex items-center gap-4 px-4 py-3.5 rounded-xl cursor-pointer transition-all duration-200 
        ${active ? 'bg-[#86C232] text-[#0A4D68] font-bold shadow-lg shadow-[#86C232]/10' : 'text-white/60 hover:bg-white/10 hover:text-white'}`}>
      <span className={active ? 'text-[#0A4D68]' : 'text-inherit'}>{icon}</span>
      <span className="text-sm">{label}</span>
    </div>
  )
}