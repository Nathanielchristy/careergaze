'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { 
  Calendar, CheckCircle, GraduationCap, LayoutGrid, 
  Clock, LogOut, FileText, CheckSquare, 
  MessageSquare, Award, Loader2, Menu 
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

// YOUR NEW API URL
const ATTENDANCE_API_URL = "https://script.google.com/macros/s/AKfycbwL3bdZeM_-QlLrZPXYnWvanA_rdP79-rc61Qr5CH1BIEUegR5xQABex5qFqjiitimP2Q/exec"

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
  const [totalHours, setTotalHours] = useState('0')

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
      
      // Check if already marked for today in this session
      const today = new Date().toLocaleDateString()
      if (localStorage.getItem(`marked_${storedEmail}_${today}`)) {
        setAttendanceMarked(true)
      }

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
        cache: 'no-store'
      })
      const data = await res.json()
      
      if (data.status === "Present") {
        setAttendanceMarked(true)
        const today = new Date().toLocaleDateString()
        localStorage.setItem(`marked_${email}_${today}`, 'true')
      }
      
      if (data.totalHours !== undefined) {
        setTotalHours(data.totalHours.toString())
      }
    } catch (e) {
      console.error("Sync error:", e)
    } finally {
      setIsLoadingStatus(false)
    }
  }

  const handleAttendance = async () => {
    if (attendanceMarked || isSubmitting) return
    setIsSubmitting(true)

    try {
      // 1. STEP ONE: Verify with server one last time before posting
      const verifyRes = await fetch(`${ATTENDANCE_API_URL}?email=${encodeURIComponent(userEmail)}&t=${Date.now()}`)
      const verifyData = await verifyRes.json()

      if (verifyData.status === "Present") {
        alert("⚠️ Access Denied: You have already checked in for today!")
        setAttendanceMarked(true)
        const today = new Date().toLocaleDateString()
        localStorage.setItem(`marked_${userEmail}_${today}`, 'true')
        setIsSubmitting(false)
        return // CANCEL THE PROCESS
      }

      // 2. STEP TWO: Proceed with Check-in if not already marked
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

      // 3. STEP THREE: Success Logic
      setAttendanceMarked(true)
      const today = new Date().toLocaleDateString()
      localStorage.setItem(`marked_${userEmail}_${today}`, 'true')
      alert("✅ Success! Your attendance for today has been recorded.")
      
      // Refresh totals
      checkServerStatus(userEmail)

    } catch (error) {
      alert("Connection error. Please check your internet.")
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
      <main className="lg:ml-64 p-4 md:p-12">
        <header className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold">Welcome, <span className="text-[#86C232]">{userName}</span> 👋</h1>
            <p className="text-slate-500 italic">Careergize Internship Portal</p>
          </div>

          <Card className="p-4 bg-white border-none shadow-sm flex items-center gap-6 rounded-2xl">
            <div className="text-right">
              <p className="text-[10px] font-bold text-slate-400 uppercase">Clock</p>
              <p className="font-mono font-bold text-lg">{currentTime}</p>
            </div>
            <Button 
              disabled={attendanceMarked || isSubmitting || isLoadingStatus}
              onClick={handleAttendance}
              className={`rounded-xl font-bold px-8 h-12 transition-all shadow-md ${
                attendanceMarked 
                ? 'bg-green-100 text-green-600' 
                : 'bg-[#86C232] text-[#0A4D68] hover:scale-105 active:scale-95'
              }`}
            >
              {isLoadingStatus ? (
                <Loader2 className="animate-spin" size={20} />
              ) : attendanceMarked ? (
                <div className="flex items-center gap-2"><CheckCircle size={18} /> Checked In</div>
              ) : (
                'Check In'
              )}
            </Button>
          </Card>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <StatBox title="Status" value={attendanceMarked ? "Active" : "Pending"} icon={<Calendar size={18}/>} />
          <StatBox title="Tasks" value="12" icon={<CheckSquare size={18}/>} />
          <StatBox title="Grade" value="A-" icon={<Award size={18}/>} />
          <StatBox title="Total Hours" value={isLoadingStatus ? "..." : `${totalHours}h`} icon={<Clock size={18}/>} />
        </div>

        <Card className="p-8 rounded-[2rem] bg-[#0A4D68] text-white border-none shadow-xl">
          <h3 className="font-bold text-lg mb-4">Program Progress</h3>
          <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
             <motion.div 
               initial={{ width: 0 }} 
               animate={{ width: `${Math.min((parseFloat(totalHours)/200)*100, 100)}%` }} 
               className="h-full bg-[#86C232]" 
             />
          </div>
          <p className="mt-4 text-sm text-white/60">
            {Math.min(((parseFloat(totalHours)/200)*100), 100).toFixed(1)}% of Internship Completed
          </p>
        </Card>
      </main>
    </div>
  )
}

function SidebarItem({ icon, label, active, onClick }: any) {
  return (
    <div onClick={onClick} className={`flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition-all ${active ? 'bg-[#86C232] text-[#0A4D68] font-bold shadow-lg' : 'text-white/60 hover:bg-white/10 hover:text-white'}`}>
      {icon} <span className="text-sm">{label}</span>
    </div>
  )
}

function StatBox({ title, value, icon }: any) {
  return (
    <Card className="p-6 rounded-2xl border-none shadow-sm bg-white flex justify-between items-center">
      <div>
        <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">{title}</p>
        <p className="text-xl font-black text-[#0A4D68]">{value}</p>
      </div>
      <div className="bg-slate-50 p-3 rounded-xl text-[#86C232]">{icon}</div>
    </Card>
  )
}