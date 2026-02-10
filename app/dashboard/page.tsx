'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BookOpen, Calendar, CheckCircle, GraduationCap,
  LayoutGrid, Clock, Bell, LogOut, FileText, 
  CheckSquare, MessageSquare, Award, ExternalLink,
  Search, Download, PlayCircle, Star, ArrowLeft,
  Plus, Paperclip, Send, ChevronRight, Layout, Flag, Target
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
  const [activeTab, setActiveTab] = useState('Workspace')
  const [attendanceMarked, setAttendanceMarked] = useState(false)
  const [currentTime, setCurrentTime] = useState('')

  useEffect(() => {
    setCurrentTime(new Date().toLocaleTimeString())
    const timer = setInterval(() => setCurrentTime(new Date().toLocaleTimeString()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0A4D68]">

      {/* SIDEBAR */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-[#0A4D68] text-white hidden lg:flex flex-col p-6 z-50">
        <div className="flex items-center gap-3 mb-10">
          <div className="bg-[#86C232] p-2 rounded-lg"><GraduationCap className="text-[#0A4D68]" size={24} /></div>
          <span className="text-xl font-bold tracking-tight text-white">Careergize</span>
        </div>

        <nav className="space-y-2 flex-1">
          <SidebarItem 
            icon={<LayoutGrid size={20} />} 
            label="My Workspace" 
            active={activeTab === 'Workspace'} 
            onClick={() => setActiveTab('Workspace')}
          />
          <SidebarItem 
            icon={<FileText size={20} />} 
            label="Learning Notes" 
            active={activeTab === 'Learning Notes'} 
            onClick={() => setActiveTab('Learning Notes')}
          />
          <SidebarItem 
            icon={<CheckSquare size={20} />} 
            label="Tasks & Projects" 
            active={activeTab === 'Tasks & Projects'}
            onClick={() => setActiveTab('Tasks & Projects')}
          />
          <SidebarItem icon={<MessageSquare size={20} />} label="Mentor Chat" />
          <SidebarItem icon={<Award size={20} />} label="Final Certification" />
        </nav>
        
        {/* PROFILE SECTION */}
        <div className="mt-auto pt-6 border-t border-white/10">
          <div className="flex items-center gap-3 p-2 mb-4 bg-white/5 rounded-xl">
            <div className="h-10 w-10 rounded-full bg-[#86C232] flex items-center justify-center font-bold text-[#0A4D68]">JD</div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold truncate">John Doe</p>
              <p className="text-[10px] text-white/40 truncate">john.doe@email.com</p>
            </div>
          </div>
          <SidebarItem icon={<LogOut size={20} />} label="Logout" />
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="lg:ml-64 p-6 lg:p-12">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: WORKSPACE / OVERVIEW */}
          {activeTab === 'Workspace' && (
            <motion.div key="workspace" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <header className="flex flex-col md:flex-row justify-between items-start gap-4 mb-10">
                <div>
                  <h1 className="text-3xl font-extrabold text-[#0A4D68]">
                    Welcome back, <span className="text-[#86C232]">John Doe</span> 👋
                  </h1>
                  <p className="text-slate-500 text-sm">Intern ID: #CG-2026-042</p>
                </div>

                <Card className="p-4 bg-white border-none shadow-sm flex items-center gap-6 rounded-2xl">
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase">Current Time</p>
                    <p className="text-lg font-mono font-bold">{currentTime}</p>
                  </div>
                  <Button 
                    disabled={attendanceMarked}
                    onClick={() => setAttendanceMarked(true)}
                    className={`${attendanceMarked ? 'bg-green-100 text-green-600' : 'bg-[#86C232] text-[#0A4D68]'} rounded-xl font-bold px-6`}
                  >
                    {attendanceMarked ? <><CheckCircle size={18} className="mr-2"/> Present</> : 'Mark Attendance'}
                  </Button>
                </Card>
              </header>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-10">
                <StatBox title="Days Completed" value="18/45" icon={<Calendar className="text-[#86C232]" />} />
                <StatBox title="Tasks Done" value="12" icon={<CheckSquare className="text-[#86C232]" />} />
                <StatBox title="Current Grade" value="A-" icon={<Award className="text-[#86C232]" />} />
                <StatBox title="Learning Hours" value="92h" icon={<Clock className="text-[#86C232]" />} />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  <section>
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <FileText size={20} className="text-[#86C232]" /> Recent Study Notes
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {NOTES.slice(0, 2).map(note => (
                        <NoteCardMini key={note.id} note={note} onClick={() => setActiveTab('Learning Notes')} />
                      ))}
                    </div>
                  </section>
                  <section>
                    <h2 className="text-xl font-bold mb-4">Upcoming Deadlines</h2>
                    <Card className="rounded-[2rem] overflow-hidden border-none shadow-sm bg-white p-2">
                      <table className="w-full text-left">
                        <thead className="bg-slate-50">
                          <tr>
                            <th className="px-6 py-4 text-xs uppercase font-bold text-slate-400">Task Name</th>
                            <th className="px-6 py-4 text-xs uppercase font-bold text-slate-400">Status</th>
                            <th className="px-6 py-4"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {TASKS.map((task) => (
                            <tr key={task.id} className="border-t border-slate-50 hover:bg-slate-50/50 transition-colors">
                              <td className="px-6 py-4 font-bold">{task.title}</td>
                              <td className="px-6 py-4"><StatusBadge status={task.status} /></td>
                              <td className="px-6 py-4 text-right">
                                <Button variant="ghost" size="sm" onClick={() => setActiveTab('Tasks & Projects')} className="text-[#0A4D68]">View</Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </Card>
                  </section>
                </div>

                <div className="space-y-8">
                  <Card className="p-6 rounded-[2rem] bg-[#0A4D68] text-white border-none">
                    <h3 className="font-bold text-lg mb-4">Internship Progress</h3>
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between text-sm mb-2 text-white/80">
                          <span>Completion</span>
                          <span>40%</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-[#86C232] w-[40%] rounded-full shadow-[0_0_10px_#86C232]" />
                        </div>
                      </div>
                      <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                        <p className="text-xs text-white/60 mb-1">Assigned Mentor</p>
                        <p className="font-bold">Engr. Sarah Connor</p>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: LEARNING NOTES */}
          {activeTab === 'Learning Notes' && (
            <LearningNotesContent onBack={() => setActiveTab('Workspace')} />
          )}

          {/* TAB 3: TASKS & PROJECTS */}
          {activeTab === 'Tasks & Projects' && (
            <TasksProjectsContent />
          )}

        </AnimatePresence>
      </main>
    </div>
  )
}

/* =====================
   SUB-COMPONENTS & VIEWS
===================== */

function SidebarItem({ icon, label, active, onClick }: any) {
  return (
    <div 
      onClick={onClick}
      className={`flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 ${
      active ? 'bg-[#86C232] text-[#0A4D68] font-bold shadow-lg shadow-[#86C232]/20' : 'text-white/60 hover:bg-white/10 hover:text-white'
    }`}>
      {icon}
      <span className="text-sm">{label}</span>
    </div>
  )
}

function StatBox({ title, value, icon }: any) {
  return (
    <Card className="p-6 rounded-2xl border-none shadow-sm flex justify-between items-center bg-white">
      <div>
        <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">{title}</p>
        <p className="text-2xl font-black text-[#0A4D68]">{value}</p>
      </div>
      <div className="bg-slate-50 p-3 rounded-xl">{icon}</div>
    </Card>
  )
}

function StatusBadge({ status }: any) {
  const styles: any = {
    pending: 'bg-yellow-100 text-yellow-700',
    submitted: 'bg-blue-100 text-blue-700',
    reviewed: 'bg-green-100 text-green-700',
  }
  return <span className={`px-3 py-1 text-[10px] font-bold rounded-full uppercase ${styles[status]}`}>{status}</span>
}

function NoteCardMini({ note, onClick }: any) {
  return (
    <Card onClick={onClick} className="p-5 border-none shadow-sm bg-white rounded-2xl hover:ring-2 ring-[#86C232] transition-all cursor-pointer group">
      <span className="px-2 py-1 bg-slate-100 text-[#0A4D68] text-[10px] font-bold rounded uppercase group-hover:bg-[#86C232] group-hover:text-white transition-colors">{note.category}</span>
      <h4 className="font-bold mt-3 mb-1">{note.title}</h4>
      <p className="text-xs text-slate-400">{note.updated}</p>
    </Card>
  )
}

/* =====================
   LEARNING NOTES VIEW
===================== */

function LearningNotesContent({ onBack }: { onBack: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
      <Button onClick={onBack} variant="ghost" className="mb-6 hover:bg-white gap-2 text-slate-500">
        <ArrowLeft size={18} /> Back to Workspace
      </Button>

      <header className="mb-10 flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <h1 className="text-4xl font-black text-[#0A4D68]">Learning Notes</h1>
          <p className="text-slate-500 mt-2">Exclusive study materials for your internship path.</p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <Input placeholder="Search topics..." className="pl-12 h-12 bg-white border-none shadow-sm rounded-xl" />
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {NOTES.map((note) => (
          <Card key={note.id} className="border-none shadow-sm bg-white rounded-[2rem] p-6 flex flex-col hover:shadow-xl transition-shadow">
            <div className="flex justify-between mb-4">
              <div className={`p-3 rounded-xl ${note.color} text-white`}>
                {note.type === 'Video' ? <PlayCircle size={20} /> : <FileText size={20} />}
              </div>
              {note.featured && <span className="text-[10px] font-bold text-amber-500 bg-amber-50 px-2 py-1 rounded-full flex items-center gap-1"><Star size={10} fill="currentColor"/> ESSENTIAL</span>}
            </div>
            <h3 className="text-lg font-bold mb-2">{note.title}</h3>
            <p className="text-sm text-slate-500 mb-6 flex-1 line-clamp-2">{note.description}</p>
            <div className="flex items-center justify-between pt-4 border-t border-slate-50">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{note.category}</span>
              <Button size="sm" className="bg-[#F8FAFC] text-[#0A4D68] hover:bg-[#86C232] rounded-lg font-bold border-none">View Note</Button>
            </div>
          </Card>
        ))}
      </div>
    </motion.div>
  )
}

/* =====================
   TASKS & PROJECTS VIEW
===================== */

function TasksProjectsContent() {
  const [selected, setSelected] = useState(TASKS[0])
  
  return (
    <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}>
      <header className="flex flex-col md:flex-row justify-between items-start gap-4 mb-10">
        <div>
          <h1 className="text-4xl font-black text-[#0A4D68]">Tasks & Projects</h1>
          <p className="text-slate-500 mt-2">Manage your deliverables and track milestones.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl bg-white border-slate-200"><Flag size={18} className="mr-2 text-red-500"/> Roadmap</Button>
          <Button className="bg-[#86C232] text-[#0A4D68] font-bold rounded-xl"><Plus size={18} className="mr-2"/> New Submission</Button>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        <div className="xl:col-span-8 space-y-4">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Layout size={20} className="text-[#86C232]"/> Active Board</h2>
          {TASKS.map((task) => (
            <Card 
              key={task.id} 
              onClick={() => setSelected(task)}
              className={`p-6 border-none shadow-sm cursor-pointer transition-all rounded-[2rem] ${selected.id === task.id ? 'ring-2 ring-[#86C232] bg-white' : 'bg-white/60 opacity-70'}`}
            >
              <div className="flex items-center justify-between">
                <div>
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{task.category}</span>
                   <h3 className="text-lg font-bold mt-1">{task.title}</h3>
                   <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1 text-xs text-slate-400"><Clock size={14}/> {task.deadline}</div>
                      <StatusBadge status={task.status} />
                   </div>
                </div>
                <ChevronRight className={selected.id === task.id ? 'text-[#86C232]' : 'text-slate-200'} />
              </div>
            </Card>
          ))}
        </div>

        <div className="xl:col-span-4">
          <Card className="p-8 border-none shadow-xl bg-[#0A4D68] text-white rounded-[2.5rem] sticky top-8">
            <h2 className="text-2xl font-bold mb-2">Submit Work</h2>
            <p className="text-white/50 text-xs mb-8">Upload files for: <span className="text-white">{selected.title}</span></p>
            
            <div className="space-y-6">
              <div className="p-10 border-2 border-dashed border-white/10 rounded-[2rem] flex flex-col items-center justify-center text-center hover:bg-white/5 cursor-pointer">
                <Paperclip className="text-[#86C232] mb-3" size={24} />
                <p className="text-xs font-bold text-white">Attach Assets</p>
                <p className="text-[10px] text-white/30 mt-1">PDF, ZIP, PNG (Max 10MB)</p>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">Repository Link</label>
                <input className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 ring-[#86C232] placeholder:text-white/20" placeholder="https://github.com/..." />
              </div>

              <Button className="w-full bg-[#86C232] text-[#0A4D68] font-black py-7 rounded-2xl shadow-lg shadow-[#86C232]/10 hover:scale-[1.02] transition-transform">
                <Send size={18} className="mr-2" /> SEND SUBMISSION
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  )
}