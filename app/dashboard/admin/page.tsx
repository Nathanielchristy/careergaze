'use client'

import React, { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import {
  LayoutGrid, Users, LogOut, School, 
  Handshake, Clock, GraduationCap, Loader2,
  TrendingUp, Menu, X, RefreshCw, Save,MessageSquare
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
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalColleges: 0,
    pendingStudents: 0,
    growthRate: 0 
  })
  
  // UI States
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [currentTime, setCurrentTime] = useState('')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  // Modal State
  const [isChartOpen, setIsChartOpen] = useState(false)

  // --- 1. DYNAMIC SUCCESS RATE CALCULATION ---
  const successRate = useMemo(() => {
    if (stats.totalStudents === 0) return "0";
    // Success = (Total - Pending) / Total
    const processed = stats.totalStudents - stats.pendingStudents;
    const rate = (processed / stats.totalStudents) * 100;
    return rate.toFixed(1);
  }, [stats.totalStudents, stats.pendingStudents]);

  // --- 2. GROWTH CALCULATION LOGIC ---
  const calculateGrowth = (studentList: any[]) => {
    if (!studentList || studentList.length === 0) return 0;
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    const thisMonthCount = studentList.filter(s => {
      const d = new Date(s.timestamp || s.Date || s.joiningDate);
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    }).length;

    const lastMonthCount = studentList.filter(s => {
      const d = new Date(s.timestamp || s.Date || s.joiningDate);
      return d.getMonth() === lastMonth && d.getFullYear() === lastMonthYear;
    }).length;

    if (lastMonthCount === 0) return thisMonthCount > 0 ? 100 : 0;
    return Math.round(((thisMonthCount - lastMonthCount) / lastMonthCount) * 100);
  };

  // --- 3. LIVE CHART DATA ---
  const liveChartData = useMemo(() => [
    { name: 'Total Students', value: stats.totalStudents, color: '#0A4D68' },
    { name: 'Pending Apps', value: stats.pendingStudents, color: '#F59E0B' }, 
    { name: 'Colleges', value: stats.totalColleges, color: '#86C232' },    
    { name: 'Active Clients', value: 18, color: '#64748B' },              
  ], [stats]);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn')
    if (!loggedIn || loggedIn !== 'true') {
      router.push('/login')
    } else {
      setUserName(localStorage.getItem('userName') || 'Administrator')
      setUserEmail(localStorage.getItem('userEmail') || 'admin@careergize.com')
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
      
      const actualGrowth = calculateGrowth(data.students || []);
      
      setStats({
        totalStudents: data.totalStudents || 0,
        totalColleges: data.totalColleges || 0,
        pendingStudents: data.pendingStudents || 0,
        growthRate: actualGrowth
      })
    } catch (error) {
      console.error("Fetch error:", error)
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
        <p className="text-xs font-bold tracking-widest uppercase opacity-50">Syncing Live Data...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0A4D68]">

      {/* MOBILE HEADER */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-[#0A4D68] text-white sticky top-0 z-[60]">
        <div className="flex items-center gap-2">
          <div className="bg-[#86C232] p-1.5 rounded-lg"><GraduationCap className="text-[#0A4D68]" size={20} /></div>
          <span className="font-bold">Careergize</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}><Menu size={24} /></button>
      </div>

      {/* SIDEBAR */}
      <aside className={`fixed left-0 top-0 h-full w-72 bg-[#0A4D68] text-white flex flex-col p-6 z-[70] transition-transform lg:translate-x-0 lg:w-64 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="items-center gap-3 mb-10 hidden lg:flex">
          <div className="bg-[#86C232] p-2 rounded-lg"><GraduationCap className="text-[#0A4D68]" size={24} /></div>
          <span className="text-xl font-bold italic">Careergize</span>
        </div>
        <nav className="space-y-2 flex-1">
          <SidebarItem icon={<LayoutGrid size={20}/>} label="Overview" active />
          <Link href="admin/students"><SidebarItem icon={<Users size={20}/>} label="Students" /></Link>
          <SidebarItem icon={<MessageSquare size={20}/>} label="Chat with Team" />
        </nav>
        <div className="mt-auto pt-6 border-t border-white/10">
          <SidebarItem icon={<LogOut size={20} />} label="Logout" onClick={handleLogout} />
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="lg:ml-64 p-4 md:p-8 lg:p-12">
        
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3">
              <span className="text-4xl md:text-5xl font-black text-[#0A4D68]">Hey, {userName.split(' ')[0]}</span>
              <motion.span animate={{ rotate: [0, 20, 0, 20, 0] }} transition={{ duration: 2, repeat: Infinity }} className="text-4xl md:text-5xl inline-block">👋</motion.span>
            </motion.div>
            <p className="text-slate-500 text-[11px] font-black uppercase tracking-widest mt-2 flex items-center gap-2">
              Live Feed <button onClick={fetchSheetData}><RefreshCw size={12} className={refreshing ? 'animate-spin' : ''}/></button>
            </p>
          </div>

          <Card className="px-8 py-4 bg-white border-2 border-slate-100 rounded-[2.5rem] shadow-xl flex items-center gap-6">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase">System Time</p>
              <p className="text-2xl font-mono font-black">{currentTime}</p>
            </div>
            <div className="bg-[#0A4D68] p-4 rounded-[1.8rem]"><Clock className="text-[#86C232]" size={28} /></div>
          </Card>
        </header>

        {/* STAT BOXES */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
          <StatBox title="Total Students" value={stats.totalStudents} icon={<Users className="text-[#86C232]" size={18}/>} />
          <StatBox title="Pending" value={stats.pendingStudents} icon={<Clock className="text-orange-500" size={18}/>} />
          <StatBox title="Colleges" value={stats.totalColleges} icon={<School className="text-blue-500" size={18}/>} />
          <StatBox title="Active Clients" value="18" icon={<Handshake className="text-[#86C232]" size={18}/>} />
        </div>

        {/* GROWTH & SUCCESS ANALYTICS */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <motion.div whileHover={{ scale: 1.01 }} onClick={() => setIsChartOpen(true)} className="xl:col-span-2 cursor-pointer">
            <Card className="p-8 rounded-[2rem] bg-white relative overflow-hidden shadow-sm h-full border-none">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-xl font-bold mb-1">Growth Analytics</h3>
                  <p className="text-slate-400 text-sm">Monthly performance metrics</p>
                </div>
                <TrendingUp className="text-[#86C232]" size={32} />
              </div>
              
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between items-end mb-4">
                    <span className={`text-4xl font-black ${stats.growthRate >= 0 ? 'text-[#0A4D68]' : 'text-red-500'}`}>
                      {stats.growthRate >= 0 ? `+${stats.growthRate}%` : `${stats.growthRate}%`}
                    </span>
                    <span className="text-xs font-bold text-slate-400 uppercase">Enrollment Growth</span>
                  </div>
                  <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }} 
                      animate={{ width: `${Math.min(Math.max(stats.growthRate, 0), 100)}%` }} 
                      className="h-full bg-gradient-to-r from-[#0A4D68] to-[#86C232]" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-50 text-center">
                  <DetailItem label="Active Region" value="India" />
                  <DetailItem label="Success Rate" value={`${successRate}%`} />
                  <DetailItem label="Status" value={Number(successRate) > 80 ? "Optimized" : "Review Required"} />
                </div>
              </div>
            </Card>
          </motion.div>

          <Card className="p-8 rounded-[2rem] bg-[#0A4D68] text-white shadow-xl flex flex-col justify-between">
            <h3 className="text-lg font-bold mb-6">Quick Actions</h3>
            <div className="space-y-3">
              <ActionButton label="Review Applications" />
              <ActionButton label="Manage Colleges" />
              <ActionButton label="System Reports" />
            </div>
          </Card>
        </div>
      </main>

      {/* CHART MODAL */}
      <AnimatePresence>
        {isChartOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-[100] p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsChartOpen(false)} className="fixed inset-0 bg-[#0A4D68]/60 backdrop-blur-xl" />
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="relative bg-white w-full max-w-4xl rounded-[3rem] shadow-2xl p-8">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-2xl font-black text-[#0A4D68]">
                  {new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date())} <span className="text-[#86C232]">Analysis</span>
                </h2>
                <button onClick={() => setIsChartOpen(false)} className="p-2 hover:bg-slate-100 rounded-xl"><X /></button>
              </div>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={liveChartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                    <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
                    <Bar dataKey="value" radius={[10, 10, 0, 0]} barSize={60}>
                      {liveChartData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* UI HELPERS */
function SidebarItem({ icon, label, active, onClick }: any) {
  return (
    <div onClick={onClick} className={`flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition-all ${active ? 'bg-[#86C232] text-[#0A4D68] font-bold' : 'text-white/60 hover:text-white hover:bg-white/5'}`}>
      {icon} <span className="text-sm">{label}</span>
    </div>
  )
}

function StatBox({ title, value, icon }: any) {
  return (
    <Card className="p-6 rounded-2xl border-none shadow-sm flex justify-between items-center bg-white">
      <div>
        <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">{title}</p>
        <p className="text-2xl font-black text-[#0A4D68]">{value.toLocaleString()}</p>
      </div>
      <div className="bg-slate-50 p-3 rounded-xl">{icon}</div>
    </Card>
  )
}

function DetailItem({ label, value }: any) {
  return (
    <div>
      <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">{label}</p>
      <p className="font-bold text-sm text-[#0A4D68]">{value}</p>
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