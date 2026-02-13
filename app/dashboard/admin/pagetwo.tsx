'use client'

import React, { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import {
  LayoutGrid, Users, LogOut, School, 
  Handshake, Clock, GraduationCap, Loader2,
  TrendingUp, Menu, X, RefreshCw, Save, AlertTriangle
} from 'lucide-react'
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Cell
} from 'recharts'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzLpJpOZlAkqhgxkgh0EsZXNLnelxYFzw8thFmx_K4cDD2nhcR-ijW8R-XL_hhQM4Ja/exec'

export default function AdminDashboard() {
  const router = useRouter()
  
  // Auth & User States
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [userName, setUserName] = useState('Admin')
  const [userEmail, setUserEmail] = useState('')

  // Data States
  const [students, setStudents] = useState<any[]>([])
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalColleges: 0,
    pendingStudents: 0,
    growthRate: 0 // Will be calculated dynamically
  })
  
  // UI States
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [currentTime, setCurrentTime] = useState('')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  // Modals & Drawers
  const [isChartOpen, setIsChartOpen] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [drawerMode, setDrawerMode] = useState<'task' | 'edit'>('task')
  const [selectedStudent, setSelectedStudent] = useState<any>(null)

  // --- GROWTH CALCULATION LOGIC ---
  const calculateGrowth = (studentList: any[]) => {
    if (!studentList || studentList.length === 0) return 0;

    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    // Filter students by Date column (supports multiple common names)
    const thisMonthCount = studentList.filter(s => {
      const date = new Date(s.timestamp || s.Date || s.joiningDate);
      return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
    }).length;

    const lastMonthCount = studentList.filter(s => {
      const date = new Date(s.timestamp || s.Date || s.joiningDate);
      return date.getMonth() === lastMonth && date.getFullYear() === lastMonthYear;
    }).length;

    if (lastMonthCount === 0) return thisMonthCount > 0 ? 100 : 0;
    
    const growth = ((thisMonthCount - lastMonthCount) / lastMonthCount) * 100;
    return Math.round(growth);
  };

  // --- LIVE CHART DATA LINKED TO STATS ---
  const liveChartData = useMemo(() => [
    { name: 'Total Students', value: stats.totalStudents, color: '#0A4D68' },
    { name: 'Pending Apps', value: stats.pendingStudents, color: '#F59E0B' }, 
    { name: 'Colleges', value: stats.totalColleges, color: '#86C232' },    
    { name: 'Active Clients', value: 18, color: '#64748B' },              
  ], [stats]);

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
      fetchSheetData()
    }

    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }))
    }, 1000)
    
    return () => clearInterval(timer)
  }, [router])

  const fetchSheetData = async () => {
    setRefreshing(true)
    try {
      const response = await fetch(`${SCRIPT_URL}?t=${Date.now()}`)
      const data = await response.json()
      
      if (data.students) {
        setStudents(data.students);
        const actualGrowth = calculateGrowth(data.students);
        
        setStats({
          totalStudents: data.totalStudents || 0,
          totalColleges: data.totalColleges || 0,
          pendingStudents: data.pendingStudents || 0,
          growthRate: actualGrowth
        })
      }
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const handleLogout = () => {
    localStorage.clear()
    router.push('/login')
  }

  if (!isAuthorized || loading) {
    return (
      <div className="min-h-screen bg-[#0A4D68] flex flex-col items-center justify-center text-white">
        <Loader2 className="animate-spin text-[#86C232] mb-4" size={40} />
        <p className="text-xs font-bold tracking-widest uppercase opacity-50 italic">Syncing with Sheet...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0A4D68]">

      {/* MOBILE HEADER */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-[#0A4D68] text-white sticky top-0 z-[60] shadow-md">
        <div className="flex items-center gap-2">
          <div className="bg-[#86C232] p-1.5 rounded-lg"><GraduationCap className="text-[#0A4D68]" size={20} /></div>
          <span className="font-bold">Careergize Admin</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}><Menu size={24} /></button>
      </div>

      {/* SIDEBAR */}
      <aside className={`fixed left-0 top-0 h-full w-72 bg-[#0A4D68] text-white flex flex-col p-6 z-[70] transition-transform duration-300 lg:translate-x-0 lg:w-64 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="items-center gap-3 mb-10 hidden lg:flex">
          <div className="bg-[#86C232] p-2 rounded-lg"><GraduationCap className="text-[#0A4D68]" size={24} /></div>
          <span className="text-xl font-bold italic">Careergize</span>
        </div>

        <nav className="space-y-2 flex-1">
          <SidebarItem icon={<LayoutGrid size={20}/>} label="Overview" active />
          <Link href="/admin/students"><SidebarItem icon={<Users size={20}/>} label="Students" /></Link>
          <SidebarItem icon={<School size={20}/>} label="Colleges" />
          <SidebarItem icon={<Handshake size={20}/>} label="Clients" />
        </nav>

        <div className="mt-auto pt-6 border-t border-white/10">
          <div className="flex items-center gap-3 p-3 mb-4 bg-white/5 rounded-2xl border border-white/5">
            <div className="h-10 w-10 rounded-full bg-[#86C232] flex items-center justify-center font-bold text-[#0A4D68]">{userName.substring(0, 2).toUpperCase()}</div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold truncate text-white">{userName}</p>
              <p className="text-[10px] text-white/40 truncate">{userEmail}</p>
            </div>
          </div>
          <SidebarItem icon={<LogOut size={20} />} label="Logout" onClick={handleLogout} />
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="lg:ml-64 p-4 md:p-8 lg:p-12 transition-all">
        
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div className="space-y-2">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3">
              <span className="text-4xl md:text-5xl font-black tracking-tighter text-[#0A4D68]">Hey, {userName.split(' ')[0]}</span>
              <motion.span animate={{ rotate: [0, 20, 0, 20, 0] }} transition={{ duration: 2.5, repeat: Infinity }} className="text-4xl md:text-5xl inline-block origin-bottom-right">👋</motion.span>
            </motion.div>
            <div className="flex flex-col">
              <h1 className="text-xl md:text-2xl font-bold text-slate-400">Employee<span className="text-[#86C232]"> Workspace</span></h1>
              <div className="flex items-center gap-2 mt-2">
                <div className="h-2 w-2 rounded-full bg-[#86C232] animate-pulse" />
                <p className="text-slate-500 text-[11px] font-black uppercase tracking-widest flex items-center gap-2">
                  Live Data Feed 
                  <button onClick={fetchSheetData} className={`hover:text-[#86C232] ${refreshing ? 'animate-spin' : ''}`}><RefreshCw size={12} /></button>
                </p>
              </div>
            </div>
          </div>

          <Card className="p-1 bg-white border-2 border-slate-100 shadow-2xl rounded-[2.5rem]">
            <div className="flex items-center gap-6 px-8 py-4">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">System Time</p>
                <p className="text-2xl font-mono font-black text-[#0A4D68]">{currentTime}</p>
              </div>
              <div className="bg-[#0A4D68] p-4 rounded-[1.8rem]"><Clock className="text-[#86C232]" size={28} /></div>
            </div>
          </Card>
        </header>

        {/* STAT BOXES */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
          <StatBox title="Total Students" value={stats.totalStudents} icon={<Users className="text-[#86C232]" size={18}/>} />
          <StatBox title="Pending" value={stats.pendingStudents} icon={<Clock className="text-orange-500" size={18}/>} />
          <StatBox title="Colleges" value={stats.totalColleges} icon={<School className="text-blue-500" size={18}/>} />
          <StatBox title="Active Clients" value="18" icon={<Handshake className="text-[#86C232]" size={18}/>} />
        </div>

        {/* GROWTH SECTION */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <motion.div whileHover={{ scale: 1.01 }} onClick={() => setIsChartOpen(true)} className="xl:col-span-2 cursor-pointer">
            <Card className="p-8 rounded-[2rem] bg-white relative overflow-hidden shadow-sm h-full">
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
                    <span className={`text-4xl font-black ${stats.growthRate >= 0 ? 'text-[#0A4D68]' : 'text-red-500'}`}>
                        {stats.growthRate >= 0 ? `+${stats.growthRate}%` : `${stats.growthRate}%`}
                    </span>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Enrollment Growth</span>
                  </div>
                  <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                        initial={{ width: 0 }} 
                        animate={{ width: `${Math.min(Math.max(stats.growthRate, 0), 100)}%` }} 
                        className="h-full bg-gradient-to-r from-[#0A4D68] to-[#86C232] rounded-full" 
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-50 text-center">
                  <DetailItem label="Active Region" value="Maharashtra" />
                  <DetailItem label="Success Rate" value="94.2%" />
                  <DetailItem label="Status" value={stats.growthRate >= 0 ? "Growing" : "Declining"} />
                </div>
              </div>
              <div className="absolute top-4 right-4 bg-slate-100 px-3 py-1 rounded-full text-[9px] font-black uppercase text-slate-400">Expand Chart</div>
            </Card>
          </motion.div>

          <Card className="p-8 rounded-[2rem] bg-[#0A4D68] text-white shadow-xl">
            <h3 className="text-lg font-bold mb-6">Admin Tools</h3>
            <div className="space-y-3">
              <ActionButton label="Review Applications" />
              <ActionButton label="Onboard College" />
              <ActionButton label="Generate Reports" />
            </div>
          </Card>
        </div>
      </main>

      {/* CHART MODAL WITH DYNAMIC MONTH TITLE */}
      <AnimatePresence>
        {isChartOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-[100] p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsChartOpen(false)} className="fixed inset-0 bg-[#0A4D68]/60 backdrop-blur-xl" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-white w-full max-w-4xl rounded-[3rem] shadow-2xl flex flex-col max-h-[90vh]">
                <div className="p-8 border-b border-slate-100 flex justify-between items-center">
                <h2 className="text-2xl font-black text-[#0A4D68]">
                    {new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date())} <span className="text-[#86C232]">Analysis</span>
                </h2>
                <button onClick={() => setIsChartOpen(false)} className="p-3 bg-slate-50 hover:bg-red-50 text-slate-400 rounded-xl transition-all"><X /></button>
                </div>
                <div className="p-10 overflow-y-auto">
                <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={liveChartData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 'bold'}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                        <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'}} />
                        <Bar dataKey="value" radius={[10, 10, 0, 0]} barSize={60}>
                        {liveChartData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                        </Bar>
                    </BarChart>
                    </ResponsiveContainer>
                </div>
                </div>
            </motion.div>
            </div>
        )}
      </AnimatePresence>

      {/* EDIT DRAWER */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsDrawerOpen(false)} className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[80]" />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[90] shadow-2xl p-8 overflow-y-auto">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-black text-[#0A4D68]">{drawerMode === 'task' ? 'Assign Task' : 'Update Profile'}</h2>
                <button onClick={() => setIsDrawerOpen(false)} className="p-2 hover:bg-slate-100 rounded-full"><X /></button>
              </div>
              <div className="space-y-6">
                <div><label className="text-[11px] font-black uppercase text-black mb-2 block">Full Name</label><input type="text" defaultValue={selectedStudent?.fullName} className="w-full h-12 border-2 border-slate-100 rounded-xl px-4 font-bold text-black focus:border-[#86C232] outline-none" /></div>
                <div><label className="text-[11px] font-black uppercase text-black mb-2 block">Institution</label><input type="text" defaultValue={selectedStudent?.college} className="w-full h-12 border-2 border-slate-100 rounded-xl px-4 font-bold text-black focus:border-[#86C232] outline-none" /></div>
                <Button className="w-full h-14 bg-[#86C232] text-[#0A4D68] font-black uppercase rounded-2xl shadow-xl flex gap-2 justify-center items-center hover:bg-black hover:text-white transition-all"><Save size={18} /> Confirm Changes</Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

/* HELPER COMPONENTS */
function SidebarItem({ icon, label, active, onClick }: any) {
  return (
    <div onClick={onClick} className={`flex items-center gap-4 px-4 py-3.5 rounded-xl cursor-pointer transition-all ${active ? 'bg-[#86C232] text-[#0A4D68] font-bold shadow-lg shadow-[#86C232]/10' : 'text-white/60 hover:bg-white/10 hover:text-white'}`}>
      <span>{icon}</span>
      <span className="text-sm">{label}</span>
    </div>
  )
}

function StatBox({ title, value, icon }: any) {
  return (
    <Card className="p-4 md:p-6 rounded-2xl border-none shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center bg-white gap-2">
      <div>
        <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">{title}</p>
        <p className="text-xl md:text-2xl font-black text-[#0A4D68]">{typeof value === 'number' ? value.toLocaleString() : value}</p>
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