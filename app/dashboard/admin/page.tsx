'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import {
  LayoutGrid, Users, LogOut, School, 
  Handshake, Clock, GraduationCap, Loader2,
  TrendingUp, BookOpen, Briefcase, Menu, X, CheckCircle
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function AdminDashboard() {
  const router = useRouter()
  
  // AUTH & PROFILE STATES (From Reference)
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [userName, setUserName] = useState('Admin')
  const [userEmail, setUserEmail] = useState('')

  // UI STATES
  const [adminData, setAdminData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [currentTime, setCurrentTime] = useState('')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // 1. AUTH GUARD & INITIALIZATION (Reference Logic)
  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn')
    const storedName = localStorage.getItem('userName')
    const storedEmail = localStorage.getItem('userEmail')

    if (!loggedIn || loggedIn !== 'true') {
      router.push('/login')
    } else {
      setUserName(storedName || 'Administrator')
      setUserEmail(storedEmail || 'admin@careergize.com')
      setIsAuthorized(true)
      fetchStaticAdminData()
    }

    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }))
    }, 1000)
    
    return () => clearInterval(timer)
  }, [router])

  const fetchStaticAdminData = () => {
    setLoading(true)
    setTimeout(() => {
      const mockStats = {
        TotalStudents: "1,248",
        PendingStudents: "148",
        Colleges: "42",
        Clients: "18",
        GrowthRate: "12",
        AdminRole: "Head of Operations"
      }
      setAdminData(mockStats)
      setLoading(false)
    }, 1200)
  }

  // 2. LOGOUT HANDLER (Reference Logic)
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('userName')
    localStorage.removeItem('userEmail')
    router.push('/login')
  }

  // 3. LOADING STATE (Reference UI)
  if (!isAuthorized || loading) {
    return (
      <div className="min-h-screen bg-[#0A4D68] flex flex-col items-center justify-center text-white">
        <Loader2 className="animate-spin text-[#86C232] mb-4" size={40} />
        <p className="text-xs font-bold tracking-widest uppercase opacity-50 italic">Verifying Admin Access...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0A4D68]">

      {/* MOBILE HEADER (Reference Style) */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-[#0A4D68] text-white sticky top-0 z-[60] shadow-md">
        <div className="flex items-center gap-2">
          <div className="bg-[#86C232] p-1.5 rounded-lg">
            <GraduationCap className="text-[#0A4D68]" size={20} />
          </div>
          <span className="font-bold tracking-tight">Careergize Admin</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 hover:bg-white/10 rounded-lg">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* SIDEBAR (Merged Reference Styling) */}
      <aside className={`
        fixed left-0 top-0 h-full w-72 bg-[#0A4D68] text-white flex flex-col p-6 z-[70] transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 lg:w-64
      `}>
        <div className="items-center gap-3 mb-10 hidden lg:flex">
          <div className="bg-[#86C232] p-2 rounded-lg">
            <GraduationCap className="text-[#0A4D68]" size={24} />
          </div>
          <span className="text-xl font-bold tracking-tight text-white italic">Careergize</span>
        </div>

        <nav className="space-y-2 flex-1 mt-8 lg:mt-0">
          <SidebarItem icon={<LayoutGrid size={20}/>} label="Overview" active />
          <SidebarItem icon={<Users size={20}/>} label="Students" />
          <SidebarItem icon={<School size={20}/>} label="Colleges" />
          <SidebarItem icon={<Handshake size={20}/>} label="Clients" />
        </nav>

        {/* PROFILE SECTION (Reference Style) */}
        <div className="mt-auto pt-6 border-t border-white/10">
          <div className="flex items-center gap-3 p-3 mb-4 bg-white/5 rounded-2xl border border-white/5">
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

      {/* MAIN CONTENT (Reference spacing/ML-64) */}
      <main className="transition-all duration-300 lg:ml-64 p-4 md:p-8 lg:p-12">
        
        <header className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#0A4D68]">
              Manager <span className="text-[#86C232]">Console</span>
            </h1>
            <p className="text-slate-500 text-sm">Hello, {userName.split(' ')[0]} — You have full system access.</p>
          </div>

          <Card className="w-full md:w-auto p-4 bg-white border-none shadow-sm flex items-center justify-between md:justify-start gap-6 rounded-2xl">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">System Time</p>
              <p className="text-md font-mono font-bold">{currentTime}</p>
            </div>
            <div className="bg-[#86C232]/10 p-2 rounded-xl">
              <Clock className="text-[#86C232]" size={24} />
            </div>
          </Card>
        </header>

        {/* MODIFIED TABS (As per your requirement) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
          <StatBox title="Total Students" value={adminData?.TotalStudents} icon={<Users className="text-[#86C232]" size={18}/>} />
          <StatBox title="Pending Students" value={adminData?.PendingStudents} icon={<Clock className="text-orange-500" size={18}/>} />
          <StatBox title="Colleges" value={adminData?.Colleges} icon={<School className="text-blue-500" size={18}/>} />
          <StatBox title="Clients" value={adminData?.Clients} icon={<Handshake className="text-[#86C232]" size={18}/>} />
        </div>

        {/* GROWTH SECTION (Reference style) */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <Card className="xl:col-span-2 p-8 rounded-[2rem] border-none shadow-sm bg-white relative overflow-hidden">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-xl font-bold mb-1">Growth Analytics</h3>
                <p className="text-slate-400 text-sm font-medium">Monthly network activity</p>
              </div>
              <TrendingUp className="text-[#86C232]" size={32} />
            </div>

            <div className="space-y-8">
              <div>
                <div className="flex justify-between items-end mb-4">
                  <span className="text-4xl font-black text-[#0A4D68]">+{adminData?.GrowthRate}%</span>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Enrollment Growth</span>
                </div>
                <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: `${adminData?.GrowthRate * 4}%` }} 
                    className="h-full bg-gradient-to-r from-[#0A4D68] to-[#86C232] rounded-full" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-50">
                <DetailItem label="Active Region" value="Maharashtra" />
                <DetailItem label="Top College" value="IIT Bombay" />
                <DetailItem label="Success Rate" value="94.2%" />
              </div>
            </div>
          </Card>

          {/* ACTIONS (Reference Style) */}
          <Card className="p-8 rounded-[2rem] border-none shadow-xl bg-[#0A4D68] text-white">
            <h3 className="text-lg font-bold mb-6">Admin Tools</h3>
            <div className="space-y-3">
              <ActionButton label="Review Applications" />
              <ActionButton label="Onboard College" />
              <ActionButton label="Generate Reports" />
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}

/* --- RE-USED HELPER COMPONENTS FROM YOUR REFERENCE --- */

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

function DetailItem({ label, value }: any) {
  return (
    <div>
      <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">{label}</p>
      <p className="font-bold text-xs text-[#0A4D68] truncate">{value}</p>
    </div>
  )
}

function ActionButton({ label }: any) {
  return (
    <button className="w-full py-4 px-6 rounded-2xl text-xs font-bold transition-all flex justify-between items-center bg-white/10 text-white hover:bg-[#86C232] hover:text-[#0A4D68]">
      {label} <TrendingUp size={16}/>
    </button>
  )
}