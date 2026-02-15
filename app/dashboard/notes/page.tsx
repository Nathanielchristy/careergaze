'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  Calendar, CheckCircle, GraduationCap, LayoutGrid, 
  Clock, LogOut, FileText, CheckSquare, 
  MessageSquare, Award, Loader2, Menu, X 
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

/* =====================
   MOCK DATA (For UI Sections)
===================== */
const TASKS_PREVIEW = [
  { id: '1', title: 'Weekly Progress Report', deadline: 'Today, 5:00 PM', status: 'pending' },
  { id: '2', title: 'React Performance Audit', deadline: 'Oct 24', status: 'submitted' },
]

const NOTES_PREVIEW = [
  { id: '1', title: 'Advanced State Management', category: 'React', updated: '2h ago' },
  { id: '2', title: 'Database Schema Design', category: 'Backend', updated: 'Yesterday' },
]

const ATTENDANCE_API_URL = "https://script.google.com/macros/s/AKfycbzek8RhvWTHBY2HJJDuqgt1T_mDd84CY4ztGL7aH1MCzisZBMga16SKuosdWKcE0TCa/exec"

export default function InternDashboard() {
  const router = useRouter()
  
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [userName, setUserName] = useState('Intern')
  const [userEmail, setUserEmail] = useState('')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [attendanceMarked, setAttendanceMarked] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoadingStatus, setIsLoadingStatus] = useState(true)
  const [currentTime, setCurrentTime] = useState('')

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
      if (storedEmail) checkServerStatus(storedEmail)
    }

    const timer = setInterval(() => setCurrentTime(new Date().toLocaleTimeString()), 1000)
    return () => clearInterval(timer)
  }, [router])

  const checkServerStatus = async (email: string) => {
    try {
      const res = await fetch(`${ATTENDANCE_API_URL}?email=${encodeURIComponent(email)}&t=${Date.now()}`, {
        method: 'GET',
        mode: 'cors',
        redirect: 'follow'
      })
      const data = await res.json()
      if (data.status === "Present") {
        setAttendanceMarked(true)
        localStorage.setItem('lastAttendanceDate', new Date().toLocaleDateString())
      }
    } catch (e) {
      console.error("Sync error:", e)
      if (localStorage.getItem('lastAttendanceDate') === new Date().toLocaleDateString()) {
        setAttendanceMarked(true)
      }
    } finally {
      setIsLoadingStatus(false)
    }
  }

  const handleAttendance = async () => {
    if (attendanceMarked || isSubmitting) return
    setIsSubmitting(true)

    try {
      await fetch(ATTENDANCE_API_URL, {
        method: 'POST',
        mode: 'no-cors', 
        body: JSON.stringify({
          name: userName,
          email: userEmail,
          status: 'Present',
          hours: 8 
        }),
      })

      setAttendanceMarked(true)
      localStorage.setItem('lastAttendanceDate', new Date().toLocaleDateString())
    } catch (error) {
      alert("Failed to connect. Check your internet or AdBlocker.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleLogout = () => {
    localStorage.clear()
    router.push('/login')
  }

  if (!isAuthorized) return (
    <div className="min-h-screen bg-[#0A4D68] flex items-center justify-center">
      <Loader2 className="animate-spin text-[#86C232]" size={40} />
    </div>
  )

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0A4D68]">
      {/* MOBILE HEADER */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-[#0A4D68] text-white sticky top-0 z-[60]">
        <div className="flex items-center gap-2">
          <GraduationCap className="text-[#86C232]" size={24} />
          <span className="font-bold">Careergize</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}><Menu size={24} /></button>
      </div>

      {/* SIDEBAR */}
      <aside className={`fixed left-0 top-0 h-full w-64 bg-[#0A4D68] text-white p-6 z-[70] transition-transform lg:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center gap-3 mb-10 hidden lg:flex">
          <GraduationCap className="text-[#86C232]" size={28} />
          <span className="text-xl font-bold">Careergize</span>
        </div>
        <nav className="space-y-2 flex-1 mt-8 lg:mt-0">
          <Link href="/dashboard"><SidebarItem icon={<LayoutGrid size={20} />} label="My Workspace" active /></Link>
          <Link href="/dashboard/notes"><SidebarItem icon={<FileText size={20} />} label="Learning Notes" /></Link>
          <Link href="/dashboard/interntask"><SidebarItem icon={<CheckSquare size={20} />} label="Tasks & Projects" /></Link>
          <SidebarItem icon={<MessageSquare size={20} />} label="Mentor Chat" />
          <SidebarItem icon={<Award size={20} />} label="Final Certification" />
        </nav>
        <div className="absolute bottom-6 left-6 right-6 border-t border-white/10 pt-6">
           <SidebarItem icon={<LogOut size={20} />} label="Logout" onClick={handleLogout} />
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="lg:ml-64 p-4 md:p-12 transition-all duration-300">
        <header className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-[#0A4D68]">Welcome back, <span className="text-[#86C232]">{userName}</span> 👋</h1>
            <p className="text-slate-500 italic">Careergize Internship Portal</p>
          </div>

          <Card className="w-full md:w-auto p-4 bg-white border-none shadow-sm flex items-center justify-between md:justify-start gap-6 rounded-2xl">
            <div className="text-right">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Local Time</p>
              <p className="font-mono font-bold text-md">{currentTime}</p>
            </div>
            <Button 
              disabled={attendanceMarked || isSubmitting || isLoadingStatus}
              onClick={handleAttendance}
              className={`rounded-xl font-bold px-8 h-12 transition-all shadow-md ${
                attendanceMarked ? 'bg-green-100 text-green-600' : 'bg-[#86C232] text-[#0A4D68] hover:scale-105'
              }`}
            >
              {isLoadingStatus ? <Loader2 className="animate-spin" size={20} /> : attendanceMarked ? <><CheckCircle size={16} className="mr-2"/> Present</> : 'Check In'}
            </Button>
          </Card>
        </header>

        {/* STATBOXES */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
          <StatBox title="Status" value={attendanceMarked ? "Active" : "Pending"} icon={<Calendar size={18}/>} />
          <StatBox title="Tasks" value="12" icon={<CheckSquare size={18}/>} />
          <StatBox title="Grade" value="A-" icon={<Award size={18}/>} />
          <StatBox title="Hours" value="92h" icon={<Clock size={18}/>} />
        </div>

        {/* LOWER CONTENT SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            
            {/* KNOWLEDGE HUB SECTION */}
            <section>
              <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold flex items-center gap-2">
                    <FileText size={20} className="text-[#86C232]" /> Knowledge Hub
                  </h2>
                  <Link href="/dashboard/notes">
                    <Button variant="link" className="text-[#86C232] text-xs">Explore all</Button>
                  </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {NOTES_PREVIEW.map(note => (
                  <Link href="/dashboard/notes" key={note.id}>
                    <NoteCardMini note={note} />
                  </Link>
                ))}
              </div>
            </section>

            {/* RECENT TASKS SECTION */}
            <section>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Recent Tasks</h2>
                <Link href="/dashboard/interntask">
                  <Button variant="link" className="text-[#86C232] text-xs">View all tasks</Button>
                </Link>
              </div>
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
                        {TASKS_PREVIEW.map((task) => (
                          <tr key={task.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="px-6 py-4 font-bold text-sm">{task.title}</td>
                            <td className="px-6 py-4"><StatusBadge status={task.status} /></td>
                            <td className="px-6 py-4 text-right">
                              <Link href="/dashboard/interntask">
                                <Button variant="ghost" size="sm" className="text-[#0A4D68] h-8">Submit</Button>
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
              </Card>
            </section>
          </div>

          {/* RIGHT SIDEBAR: PROGRAM PROGRESS */}
          <div className="space-y-6">
            <Card className="p-6 rounded-[2rem] bg-[#0A4D68] text-white border-none shadow-xl">
              <h3 className="font-bold text-lg mb-6 text-white">Program Progress</h3>
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
                  <p className="font-bold text-sm text-white">Engr. Varun Vasanthan</p>
                </div>
                <p className="text-xs text-white/40 mt-4 leading-relaxed italic">
                  "The only way to do great work is to love what you do."
                </p>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

/* =====================
   HELPER COMPONENTS
===================== */

function SidebarItem({ icon, label, active, onClick }: any) {
  return (
    <div onClick={onClick} className={`flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition-all ${active ? 'bg-[#86C232] text-[#0A4D68] font-bold shadow-lg shadow-[#86C232]/10' : 'text-white/60 hover:bg-white/10 hover:text-white'}`}>
      {icon} <span className="text-sm">{label}</span>
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
      <div className="bg-slate-50 p-2 md:p-3 rounded-xl text-[#86C232]">{icon}</div>
    </Card>
  )
}

function StatusBadge({ status }: any) {
  const styles: any = { pending: 'bg-yellow-100 text-yellow-700', submitted: 'bg-blue-100 text-blue-700', reviewed: 'bg-green-100 text-green-700' }
  return <span className={`px-2.5 py-0.5 text-[9px] font-black rounded-full uppercase tracking-wider ${styles[status]}`}>{status}</span>
}

function NoteCardMini({ note }: any) {
  return (
    <Card className="p-5 border-none shadow-sm bg-white rounded-2xl hover:shadow-md transition-all cursor-pointer group border-l-4 border-l-transparent hover:border-l-[#86C232]">
      <span className="px-2 py-0.5 bg-slate-100 text-[#0A4D68] text-[9px] font-black rounded uppercase">{note.category}</span>
      <h4 className="font-bold mt-3 mb-1 group-hover:text-[#86C232] transition-colors">{note.title}</h4>
      <p className="text-[10px] text-slate-400">{note.updated}</p>
    </Card>
  )
} 