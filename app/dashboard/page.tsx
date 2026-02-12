'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import {
  Calendar, CheckCircle, GraduationCap,
  LayoutGrid, Clock, LogOut, FileText, 
  CheckSquare, MessageSquare, Award,
  Search, PlayCircle, Star, ArrowLeft,
  Plus, Paperclip, Send, ChevronRight, Layout, Flag, Target,
  Menu, X, ExternalLink, Loader2
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

/* =====================
   MOCK DATA
===================== */
const TASKS = [
  { id: '1', title: 'Weekly Progress Report', deadline: 'Today, 5:00 PM', status: 'pending', category: 'Admin' },
  { id: '2', title: 'React Performance Audit', deadline: 'Oct 24', status: 'submitted', category: 'Frontend' },
  { id: '3', title: 'UI Component Library', deadline: 'Oct 20', status: 'reviewed', category: 'Design' },
]

const NOTES = [
  { id: '1', title: 'Advanced State Management', category: 'React', description: 'Deep dive into useReducer and Context API.', updated: '2h ago', type: 'PDF', color: 'bg-blue-500', featured: true },
  { id: '2', title: 'Database Schema Design', category: 'Backend', description: 'Normalization vs Denormalization scaling.', updated: 'Yesterday', type: 'Video', color: 'bg-purple-500', featured: false },
  { id: '3', title: 'Modern CSS Frameworks', category: 'UI/UX', description: 'Tailwind patterns and Radix UI.', updated: '3 days ago', type: 'Article', color: 'bg-pink-500', featured: false },
]

/* =====================
   MAIN DASHBOARD COMPONENT
===================== */
export default function InternDashboard() {
  const router = useRouter()
  
  // AUTH & USER STATES
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [userName, setUserName] = useState('Intern')
  const [userEmail, setUserEmail] = useState('')

  // UI STATES
  const [activeTab, setActiveTab] = useState('Workspace')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [attendanceMarked, setAttendanceMarked] = useState(false)
  const [currentTime, setCurrentTime] = useState('')

  // 1. AUTH GUARD & CLOCK INITIALIZATION
  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn')
    const storedName = localStorage.getItem('userName')
    const storedEmail = localStorage.getItem('userEmail')

    if (!loggedIn || loggedIn !== 'true') {
      router.push('/login')
    } else {
      setUserName(storedName || 'Intern')
      setUserEmail(storedEmail || '')
      setIsAuthorized(true)
    }

    setCurrentTime(new Date().toLocaleTimeString())
    const timer = setInterval(() => setCurrentTime(new Date().toLocaleTimeString()), 1000)
    return () => clearInterval(timer)
  }, [router])

  // 2. LOGOUT HANDLER
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('userName')
    localStorage.removeItem('userEmail')
    router.push('/login')
  }

  const navigateTo = (tab: string) => {
    setActiveTab(tab)
    setIsMobileMenuOpen(false)
  }

  // 3. LOADING STATE (Prevents Flash)
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-[#0A4D68] flex flex-col items-center justify-center text-white">
        <Loader2 className="animate-spin text-[#86C232] mb-4" size={40} />
        <p className="text-xs font-bold tracking-widest uppercase opacity-50">Securely Loading...</p>
      </div>
    )
  }

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
          <SidebarItem icon={<LayoutGrid size={20} />} label="My Workspace" active={activeTab === 'Workspace'} onClick={() => navigateTo('Workspace')} />
          <SidebarItem icon={<FileText size={20} />} label="Learning Notes" active={activeTab === 'Learning Notes'} onClick={() => navigateTo('Learning Notes')} />
          <SidebarItem icon={<CheckSquare size={20} />} label="Tasks & Projects" active={activeTab === 'Tasks & Projects'} onClick={() => navigateTo('Tasks & Projects')} />
          <SidebarItem icon={<MessageSquare size={20} />} label="Mentor Chat" />
          <SidebarItem icon={<Award size={20} />} label="Final Certification" />
        </nav>
        
        <div className="mt-auto pt-6 border-t border-white/10">
          <div className="flex items-center gap-3 p-3 mb-4 bg-white/5 rounded-2xl">
            <div className="h-10 w-10 rounded-full bg-[#86C232] flex items-center justify-center font-bold text-[#0A4D68] shrink-0 uppercase">
              {userName.substring(0, 2)}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold truncate text-white">{userName}</p>
              <p className="text-[10px] text-white/40 truncate">{userEmail}</p>
            </div>
          </div>
          <SidebarItem icon={<LogOut size={20} />} label="Logout" onClick={handleLogout} />
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="transition-all duration-300 lg:ml-64 p-4 md:p-8 lg:p-12">
        <AnimatePresence mode="wait">
          
          {activeTab === 'Workspace' && (
            <motion.div key="workspace" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <header className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
                <div>
                  <h1 className="text-2xl md:text-3xl font-extrabold text-[#0A4D68]">
                    Welcome back, <span className="text-[#86C232]">{userName}</span> 👋
                  </h1>
                  <p className="text-slate-500 text-sm">Active Internship Session</p>
                </div>

                <Card className="w-full md:w-auto p-4 bg-white border-none shadow-sm flex items-center justify-between md:justify-start gap-6 rounded-2xl">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Local Time</p>
                    <p className="text-md font-mono font-bold">{currentTime}</p>
                  </div>
                  <Button 
                    disabled={attendanceMarked}
                    onClick={() => setAttendanceMarked(true)}
                    className={`${attendanceMarked ? 'bg-green-100 text-green-600' : 'bg-[#86C232] text-[#0A4D68]'} rounded-xl font-bold px-4 h-11`}
                  >
                    {attendanceMarked ? <><CheckCircle size={16} className="mr-2"/> Present</> : 'Check In'}
                  </Button>
                </Card>
              </header>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
                <StatBox title="Progress" value="18/45" icon={<Calendar className="text-[#86C232]" size={18}/>} />
                <StatBox title="Tasks" value="12" icon={<CheckSquare className="text-[#86C232]" size={18}/>} />
                <StatBox title="Grade" value="A-" icon={<Award className="text-[#86C232]" size={18}/>} />
                <StatBox title="Hours" value="92h" icon={<Clock className="text-[#86C232]" size={18}/>} />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  <section>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold flex items-center gap-2">
                          <FileText size={20} className="text-[#86C232]" /> Study Hub
                        </h2>
                        <Button variant="link" onClick={() => setActiveTab('Learning Notes')} className="text-[#86C232] text-xs">View all</Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {NOTES.slice(0, 2).map(note => (
                        <NoteCardMini key={note.id} note={note} onClick={() => setActiveTab('Learning Notes')} />
                      ))}
                    </div>
                  </section>
                  <section>
                    <h2 className="text-lg font-bold mb-4">Upcoming Deadlines</h2>
                    <Card className="rounded-[1.5rem] overflow-hidden border-none shadow-sm bg-white">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left min-w-[400px]">
                          <thead className="bg-slate-50 border-b border-slate-100">
                            <tr>
                              <th className="px-6 py-4 text-[10px] uppercase font-bold text-slate-400">Task</th>
                              <th className="px-6 py-4 text-[10px] uppercase font-bold text-slate-400">Status</th>
                              <th className="px-6 py-4"></th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-50">
                            {TASKS.map((task) => (
                              <tr key={task.id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-4 font-bold text-sm">{task.title}</td>
                                <td className="px-6 py-4"><StatusBadge status={task.status} /></td>
                                <td className="px-6 py-4 text-right">
                                  <Button variant="ghost" size="sm" onClick={() => setActiveTab('Tasks & Projects')} className="text-[#0A4D68] h-8">Submit</Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </Card>
                  </section>
                </div>

                <div className="space-y-6">
                  <Card className="p-6 rounded-[2rem] bg-[#0A4D68] text-white border-none shadow-xl">
                    <h3 className="font-bold text-lg mb-6">Program Progress</h3>
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between text-xs mb-2 text-white/60 font-medium">
                          <span>Overall Completion</span>
                          <span>40%</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <motion.div initial={{ width: 0 }} animate={{ width: '40%' }} className="h-full bg-[#86C232] rounded-full shadow-[0_0_15px_#86C232]" />
                        </div>
                      </div>
                      <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                        <p className="text-[10px] text-white/40 uppercase font-bold mb-1">Assigned Mentor</p>
                        <p className="font-bold text-sm">Engr. Varun Vasanthan</p>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'Learning Notes' && <LearningNotesContent onBack={() => setActiveTab('Workspace')} />}
          {activeTab === 'Tasks & Projects' && <TasksProjectsContent />}

        </AnimatePresence>
      </main>
    </div>
  )
}

/* =====================
   HELPER COMPONENTS
===================== */

function SidebarItem({ icon, label, active, onClick }: any) {
  return (
    <div onClick={onClick} className={`flex items-center gap-4 px-4 py-3.5 rounded-xl cursor-pointer transition-all duration-200 ${active ? 'bg-[#86C232] text-[#0A4D68] font-bold shadow-lg shadow-[#86C232]/10' : 'text-white/60 hover:bg-white/10 hover:text-white'}`}>
      <span className={active ? 'text-[#0A4D68]' : 'text-inherit'}>{icon}</span>
      <span className="text-sm">{label}</span>
    </div>
  )
}

function StatBox({ title, value, icon }: any) {
  return (
    <Card className="p-4 md:p-6 rounded-2xl border-none shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center bg-white gap-2">
      <div>
        <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">{title}</p>
        <p className="text-xl md:text-2xl font-black text-[#0A4D68] leading-none">{value}</p>
      </div>
      <div className="bg-slate-50 p-2 md:p-3 rounded-xl">{icon}</div>
    </Card>
  )
}

function StatusBadge({ status }: any) {
  const styles: any = { pending: 'bg-yellow-100 text-yellow-700', submitted: 'bg-blue-100 text-blue-700', reviewed: 'bg-green-100 text-green-700' }
  return <span className={`px-2.5 py-0.5 text-[9px] font-black rounded-full uppercase tracking-wider ${styles[status]}`}>{status}</span>
}

function NoteCardMini({ note, onClick }: any) {
  return (
    <Card onClick={onClick} className="p-5 border-none shadow-sm bg-white rounded-2xl hover:shadow-md transition-all cursor-pointer group border-l-4 border-l-transparent hover:border-l-[#86C232]">
      <span className="px-2 py-0.5 bg-slate-100 text-[#0A4D68] text-[9px] font-black rounded uppercase">{note.category}</span>
      <h4 className="font-bold mt-3 mb-1 group-hover:text-[#86C232] transition-colors">{note.title}</h4>
      <p className="text-[10px] text-slate-400">{note.updated}</p>
    </Card>
  )
}

/* =====================
   PAGE CONTENT WRAPPERS
===================== */

function LearningNotesContent({ onBack }: { onBack: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
      <Button onClick={onBack} variant="ghost" className="mb-6 h-9 px-0 hover:bg-transparent text-slate-500 font-bold gap-2">
        <ArrowLeft size={16} /> Dashboard
      </Button>
      <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-[#0A4D68]">Careergize Knowledge Hub</h1>
          <p className="text-slate-500 text-sm mt-1">Access all your internship resources.</p>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <Input placeholder="Search modules..." className="pl-10 h-11 bg-white border-none shadow-sm rounded-xl" />
        </div>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {NOTES.map((note) => (
          <Card key={note.id} className="border-none shadow-sm bg-white rounded-[1.5rem] p-6 flex flex-col hover:translate-y-[-4px] transition-all">
            <div className="flex justify-between items-start mb-6">
              <div className={`p-3 rounded-2xl ${note.color} text-white shadow-lg shadow-black/5`}>
                {note.type === 'Video' ? <PlayCircle size={20} /> : <FileText size={20} />}
              </div>
              {note.featured && <span className="text-[10px] font-bold text-amber-500 bg-amber-50 px-2 py-1 rounded-lg">CORE</span>}
            </div>
            <h3 className="text-lg font-bold mb-2">{note.title}</h3>
            <p className="text-xs text-slate-500 mb-6 flex-1 line-clamp-2">{note.description}</p>
            <div className="flex items-center justify-between pt-4 border-t border-slate-50 mt-auto">
              <span className="text-[9px] font-black text-slate-400 uppercase">{note.category}</span>
              <Button size="sm" className="bg-[#F8FAFC] text-[#0A4D68] hover:bg-[#86C232] rounded-xl font-bold border-none h-8">Open</Button>
            </div>
          </Card>
        ))}
      </div>
    </motion.div>
  )
}

function TasksProjectsContent() {
  const [selected, setSelected] = useState(TASKS[0])
  return (
    <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}>
      <header className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-black text-[#0A4D68]">Deliverables</h1>
          <p className="text-slate-500 text-sm mt-1">Submit your work and track milestones.</p>
        </div>
      </header>
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        <div className="xl:col-span-8 space-y-4">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><Layout size={18} className="text-[#86C232]"/> Project List</h2>
          {TASKS.map((task) => (
            <Card key={task.id} onClick={() => setSelected(task)} className={`p-5 border-none shadow-sm cursor-pointer transition-all rounded-[1.5rem] ${selected.id === task.id ? 'ring-2 ring-[#86C232] bg-white translate-x-1' : 'bg-white/60 hover:bg-white'}`}>
              <div className="flex items-center justify-between">
                <div>
                   <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{task.category}</span>
                   <h3 className="text-md font-bold mt-1 text-[#0A4D68]">{task.title}</h3>
                </div>
                <ChevronRight className={selected.id === task.id ? 'text-[#86C232]' : 'text-slate-200'} size={20} />
              </div>
            </Card>
          ))}
        </div>
        <div className="xl:col-span-4">
          <Card className="p-6 md:p-8 border-none shadow-xl bg-[#0A4D68] text-white rounded-[2rem] sticky top-24">
            <h2 className="text-xl font-bold mb-1">Submit Work</h2>
            <p className="text-white/40 text-xs mb-8">Target: <span className="text-white font-medium">{selected.title}</span></p>
            <div className="space-y-6">
              <div className="p-8 border-2 border-dashed border-white/10 rounded-[1.5rem] flex flex-col items-center justify-center text-center hover:bg-white/5 cursor-pointer">
                <Paperclip className="text-[#86C232] mb-3" size={24} />
                <p className="text-xs font-bold text-white">Upload Files</p>
              </div>
              <Button className="w-full bg-[#86C232] text-[#0A4D68] font-black py-7 rounded-2xl shadow-xl hover:scale-[1.01] transition-transform text-sm tracking-wide">
                <Send size={18} className="mr-2" /> SUBMIT NOW
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  )
}