'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { 
  Calendar, GraduationCap, LayoutGrid, 
  Clock, LogOut, FileText, CheckSquare, 
  Loader2, Zap, TrendingUp, Menu, X, MessageSquare, Award
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const ATTENDANCE_API_URL = "https://script.google.com/macros/s/AKfycbyRwg3rXbUEjhsOujm_7hxqDyObJxHu6fvuos44o1AYl-VckOOrQmr80EbSWHrgCz35ow/exec"
const TASK_API_URL = "https://script.google.com/macros/s/AKfycbwcHhaOYVNyHduevNR5QoTFBR0TDc0TUFnEmkVXtJSAUJz9-hPTCAJUj3IIEFZuqdET/exec"

export default function InternDashboard() {
  const router = useRouter()
  
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [userName, setUserName] = useState('Intern')
  const [userEmail, setUserEmail] = useState('')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [attendanceMarked, setAttendanceMarked] = useState(false)
  const [serverStatus, setServerStatus] = useState('Pending') 
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoadingStatus, setIsLoadingStatus] = useState(true)
  const [currentTime, setCurrentTime] = useState('')
  const [totalHours, setTotalHours] = useState('0')
  const [rawTasks, setRawTasks] = useState<any[]>([])

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn')
    const storedName = localStorage.getItem('userName')
    const storedEmail = localStorage.getItem('userEmail')

    if (!loggedIn || loggedIn !== 'true') {
      router.push('/login')
    } else {
      setUserName(storedName || 'Intern')
      const email = storedEmail || ''
      setUserEmail(email)
      setIsAuthorized(true)
      if (email) refreshDashboardData(email)
    }

    const timer = setInterval(() => setCurrentTime(new Date().toLocaleTimeString()), 1000)
    return () => clearInterval(timer)
  }, [router])

  const { filteredTasks, totalPoints } = useMemo(() => {
    const myTasks = rawTasks.filter(t => 
      t.studentEmail?.toLowerCase() === userEmail.toLowerCase() || 
      t.studentName?.toLowerCase() === userName.toLowerCase()
    )
    const today = new Date(); today.setHours(0,0,0,0)
    const points = myTasks.reduce((acc, task) => {
      if (task.status?.toLowerCase() === 'completed') {
        const deadlineDate = task.endDate?.includes('/') 
          ? new Date(task.endDate.split('/')[2], task.endDate.split('/')[1]-1, task.endDate.split('/')[0])
          : new Date(task.endDate)
        deadlineDate.setHours(23,59,59,999)
        if (!isNaN(deadlineDate.getTime()) && today <= deadlineDate) return acc + 20
      }
      return acc
    }, 0)
    return { filteredTasks: myTasks, totalPoints: points }
  }, [rawTasks, userEmail, userName])

  const refreshDashboardData = async (email: string) => {
    setIsLoadingStatus(true)
    try {
      await Promise.all([fetchAttendance(email), fetchTasks()])
    } finally {
      setIsLoadingStatus(false)
    }
  }

  const fetchAttendance = async (email: string) => {
    try {
      const res = await fetch(`${ATTENDANCE_API_URL}?email=${encodeURIComponent(email)}&t=${Date.now()}`)
      const data = await res.json()
      if (data.status) {
        setServerStatus(data.status)
        if (data.status === "Present" || data.status === "Active") setAttendanceMarked(true)
      }
      if (data.totalHours !== undefined) setTotalHours(data.totalHours.toString())
    } catch (e) { setServerStatus("Offline") }
  }

  const fetchTasks = async () => {
    try {
      const res = await fetch(`${TASK_API_URL}?t=${Date.now()}`)
      const data = await res.json()
      setRawTasks(data.tasks || [])
    } catch (e) { console.error(e) }
  }

  const handleAttendance = async () => {
    if (attendanceMarked || isSubmitting) return
    setIsSubmitting(true)
    try {
      await fetch(ATTENDANCE_API_URL, {
        method: 'POST',
        mode: 'no-cors', 
        body: JSON.stringify({ name: userName, email: userEmail, status: 'Present', hours: 8 }),
      })
      setAttendanceMarked(true); setServerStatus("Present") 
      refreshDashboardData(userEmail)
    } finally { setIsSubmitting(false) }
  }

  if (!isAuthorized) return (
    <div className="min-h-screen bg-[#0A4D68] flex items-center justify-center">
      <Loader2 className="animate-spin text-[#86C232]" size={40} />
    </div>
  )

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0A4D68] overflow-x-hidden">
      
      {/* MOBILE OVERLAY */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/50 z-[60] lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* NEW SIDEBAR STYLE */}
      <aside className={`fixed left-0 top-0 h-full w-72 bg-[#0A4D68] text-white flex flex-col p-6 z-[70] transition-transform duration-300 lg:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="bg-[#86C232] p-2 rounded-lg">
              <GraduationCap className="text-[#0A4D68]" size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight">Careergize</span>
          </div>
          <button onClick={() => setIsMobileMenuOpen(false)} className="lg:hidden text-white/70 hover:text-white">
            <X size={24} />
          </button>
        </div>
        
       
        <nav className="space-y-2 flex-1 mt-8 lg:mt-0">
          <Link href="/dashboard"><SidebarItem icon={<LayoutGrid size={20} />} label="My Workspace" /></Link>
          <Link href="/dashboard/notes"><SidebarItem icon={<FileText size={20} />} label="Learning Notes" /></Link>
          <Link href="/dashboard/interntask"><SidebarItem icon={<CheckSquare size={20} />} label="Tasks & Projects" active /></Link>
          <SidebarItem icon={<MessageSquare size={20} />} label="Mentor Chat" />
          <SidebarItem icon={<Award size={20} />} label="Final Certification" />
        </nav>

        <div className="mt-auto pt-6 border-t border-white/10">
          <SidebarItem 
            icon={<LogOut size={20} />} 
            label="Logout" 
            onClick={() => { localStorage.clear(); router.push('/login'); }} 
          />
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="lg:ml-72 p-4 md:p-8 lg:p-12 min-h-screen">
        
        {/* HEADER */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 bg-white rounded-xl shadow-sm text-[#0A4D68]"
            >
              <Menu size={24} />
            </button>
            <div>
              <h1 className="text-3xl md:text-5xl font-black tracking-tight">Focus <span className="text-[#86C232]">Zone</span></h1>
              <p className="text-slate-500 font-bold text-xs uppercase tracking-tighter">Intern: {userName}</p>
            </div>
          </div>
          
          <Card className="p-4 bg-white border-none shadow-sm flex items-center gap-4 md:gap-6 rounded-2xl w-full md:w-auto justify-between">
            <div className="text-right">
              <p className="text-[10px] font-bold text-slate-400 uppercase">Live Clock</p>
              <p className="font-mono font-bold text-base md:text-lg">{currentTime}</p>
            </div>
            <Button 
              disabled={attendanceMarked || isSubmitting || isLoadingStatus}
              onClick={handleAttendance}
              className={`rounded-xl font-bold px-6 md:px-8 h-12 transition-all shrink-0 ${attendanceMarked ? 'bg-green-50 text-green-600' : 'bg-[#86C232] text-[#0A4D68]'}`}
            >
              {isLoadingStatus ? <Loader2 className="animate-spin" size={20} /> : attendanceMarked ? '✓ Present' : 'Check In'}
            </Button>
          </Card>
        </header>

        {/* STATISTICS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          <StatBox title="Status" value={isLoadingStatus ? "..." : serverStatus} icon={<Calendar size={18}/>} />
          <StatBox title="Assignments" value={isLoadingStatus ? "..." : filteredTasks.length} icon={<CheckSquare size={18}/>} />
          <StatBox title="Reward Points" value={isLoadingStatus ? "..." : `${totalPoints} XP`} icon={<Zap size={18} className="fill-[#86C232]"/>} highlight />
          <StatBox title="Total Hours" value={isLoadingStatus ? "..." : `${totalHours}h`} icon={<Clock size={18}/>} />
        </div>

        {/* PROGRESS CARD */}
        <Card className="p-6 md:p-10 rounded-[2.5rem] bg-[#0A4D68] text-white border-none shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex justify-between items-end mb-4">
              <h3 className="font-bold text-lg text-[#86C232]">Internship Progress</h3>
              <span className="text-[10px] font-black bg-white/10 px-3 py-1 rounded-full uppercase tracking-tighter">Goal: 200 Hours</span>
            </div>
            <div className="h-4 bg-white/10 rounded-full overflow-hidden">
               <motion.div initial={{ width: 0 }} animate={{ width: `${Math.min((parseFloat(totalHours)/200)*100, 100)}%` }} className="h-full bg-[#86C232] shadow-[0_0_15px_rgba(134,194,50,0.5)]" />
            </div>
            <div className="mt-8 flex items-center gap-4">
              <div className="flex items-center gap-3 bg-white/5 p-3 rounded-2xl">
                <TrendingUp size={20} className="text-[#86C232]" />
                <p className="text-sm md:text-base font-bold">{totalPoints} Experience Points Earned</p>
              </div>
            </div>
          </div>
          <Zap className="absolute -bottom-10 -right-10 text-white/5 w-48 h-48 md:w-64 md:h-64" />
        </Card>
      </main>
    </div>
  )
}

function SidebarItem({ icon, label, active, onClick }: any) {
  return (
    <div onClick={onClick} className={`flex items-center gap-4 px-4 py-4 rounded-2xl cursor-pointer transition-all duration-300 
        ${active ? 'bg-[#86C232] text-[#0A4D68] font-black shadow-xl shadow-[#86C232]/20 scale-[1.02]' : 'text-white/50 hover:bg-white/5 hover:text-white'}`}>
      <span className={active ? 'text-[#0A4D68]' : 'text-inherit'}>{icon}</span>
      <span className="text-sm tracking-tight">{label}</span>
    </div>
  )
}

function StatBox({ title, value, icon, highlight }: any) {
  return (
    <Card className={`p-5 rounded-2xl border-none shadow-sm flex justify-between items-center transition-all ${highlight ? 'bg-white border-b-4 border-[#86C232]' : 'bg-white'}`}>
      <div>
        <p className="text-[10px] uppercase font-bold text-slate-400 mb-1 tracking-wider">{title}</p>
        <p className={`text-xl font-black text-[#0A4D68]`}>{value}</p>
      </div>
      <div className={`p-3 rounded-xl bg-slate-50 text-[#86C232]`}>{icon}</div>
    </Card>
  )
}