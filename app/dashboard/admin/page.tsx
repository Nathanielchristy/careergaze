'use client'

import React, { useState, useEffect, useMemo, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import {
  LayoutGrid, Users, LogOut, School, 
  Handshake, Clock, GraduationCap, Loader2,
  TrendingUp, Menu, X, RefreshCw, MessageSquare,
  Bell, AlertTriangle, Info, CheckCircle
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
  const notificationRef = useRef<HTMLDivElement>(null)
  
  // Auth & User States
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [userName, setUserName] = useState('Admin')

  // Data States
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalColleges: 0,
    pendingStudents: 0,
    growthRate: 0 
  })
  
  // UI & Notification States
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [currentTime, setCurrentTime] = useState('')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isChartOpen, setIsChartOpen] = useState(false)
  const [notifications, setNotifications] = useState<any[]>([])
  const [showNotifications, setShowNotifications] = useState(false)

  // Success Rate Calculation
  const successRate = useMemo(() => {
    if (stats.totalStudents === 0) return "0";
    const processed = stats.totalStudents - stats.pendingStudents;
    return ((processed / stats.totalStudents) * 100).toFixed(1);
  }, [stats.totalStudents, stats.pendingStudents]);

  // Chart Data
  const liveChartData = useMemo(() => [
    { name: 'Total Students', value: stats.totalStudents, color: '#0A4D68' },
    { name: 'Pending Apps', value: stats.pendingStudents, color: '#F59E0B' }, 
    { name: 'Colleges', value: stats.totalColleges, color: '#86C232' },    
    { name: 'Active Clients', value: 18, color: '#64748B' },              
  ], [stats]);

  const fetchSheetData = async () => {
    setRefreshing(true)
    try {
      const response = await fetch(`${SCRIPT_URL}?t=${Date.now()}`)
      const data = await response.json()
      
      // Update Main Stats
      setStats({
        totalStudents: data.totalStudents || 0,
        totalColleges: data.totalColleges || 0,
        pendingStudents: data.pendingStudents || 0,
        growthRate: 12 // Default or calculate from student list
      })

      // Update Notifications (Extracting pending resets from sheet data)
      if (data.resets) {
        const resetAlerts = data.resets
          .filter((r: any) => r.status === 'Pending Reset')
          .map((r: any) => ({
            id: r.email,
            title: 'Reset Request',
            message: `${r.email} requested a password change.`,
            type: 'alert'
          }))
        setNotifications(resetAlerts)
      }
    } catch (error) {
      console.error("Fetch error:", error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn')
    if (!loggedIn || loggedIn !== 'true') {
      router.push('/login')
    } else {
      setUserName(localStorage.getItem('userName') || 'Administrator')
      setIsAuthorized(true)
      fetchSheetData()
    }

    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }))
    }, 1000)

    const handleClickOutside = (e: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(e.target as Node)) {
        setShowNotifications(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      clearInterval(timer)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [router])

  if (!isAuthorized || loading) {
    return (
      <div className="min-h-screen bg-[#0A4D68] flex flex-col items-center justify-center text-white">
        <Loader2 className="animate-spin text-[#86C232] mb-4" size={40} />
        <p className="text-xs font-bold tracking-widest uppercase opacity-50">Syncing Admin Panel...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0A4D68]">

      {/* FIXED TOP HEADER */}
      <header className="fixed top-0 right-0 left-0 lg:left-64 h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 z-50 flex items-center justify-between px-6 lg:px-12">
        <div className="lg:hidden flex items-center gap-2">
          <div className="bg-[#86C232] p-1.5 rounded-lg"><GraduationCap className="text-[#0A4D68]" size={20} /></div>
          <span className="font-bold">Careergize</span>
        </div>

        <div className="hidden lg:block text-[10px] font-black uppercase text-slate-400 tracking-widest">
          System Overview / Admin Portal
        </div>

        <div className="flex items-center gap-4">
          {/* NOTIFICATION CENTER */}
          <div className="relative" ref={notificationRef}>
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-3 bg-slate-50 hover:bg-slate-100 rounded-2xl text-[#0A4D68] transition-all relative"
            >
              <Bell size={20} />
              {notifications.length > 0 && (
                <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full" />
              )}
            </button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-4 w-80 bg-white rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden z-50"
                >
                  <div className="p-5 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                    <h3 className="font-black text-xs uppercase tracking-widest text-slate-400">Activity</h3>
                    <span className="text-[10px] font-bold text-[#86C232]">{notifications.length} New</span>
                  </div>
                  <div className="max-h-[350px] overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((n) => (
                        <div key={n.id} className="p-4 hover:bg-slate-50 flex gap-3 border-b border-slate-50 last:border-0 transition-colors cursor-pointer">
                          <AlertTriangle className="text-orange-500 shrink-0" size={16}/>
                          <div>
                            <p className="text-xs font-bold">{n.title}</p>
                            <p className="text-[10px] text-slate-500 mt-0.5 leading-relaxed">{n.message}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-10 text-center text-slate-400">
                        <CheckCircle className="mx-auto mb-2 opacity-20" size={32} />
                        <p className="text-xs font-bold uppercase tracking-widest">All Clear</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2"><Menu size={24} /></button>
        </div>
      </header>

      {/* SIDEBAR */}
      <aside className={`fixed left-0 top-0 h-full w-72 bg-[#0A4D68] text-white flex flex-col p-6 z-[70] transition-transform lg:translate-x-0 lg:w-64 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="bg-[#86C232] p-2 rounded-lg"><GraduationCap className="text-[#0A4D68]" size={24} /></div>
            <span className="text-xl font-bold italic">Careergize</span>
          </div>
          <button onClick={() => setIsMobileMenuOpen(false)} className="lg:hidden"><X /></button>
        </div>
        <nav className="space-y-2 flex-1">
          <SidebarItem icon={<LayoutGrid size={20}/>} label="Overview" active />
           <Link href="admin/users"><SidebarItem icon={<Users size={20}/>} label="Registred Users" /></Link>
          <Link href="admin/students"><SidebarItem icon={<Users size={20}/>} label="Students" /></Link>
          <Link href="admin/Tasks"><SidebarItem icon={<Users size={20}/>} label="Tasks" /></Link>
          <SidebarItem icon={<MessageSquare size={20}/>} label="Chat with Team" />
        </nav>
        <div className="mt-auto pt-6 border-t border-white/10">
          <SidebarItem icon={<LogOut size={20} />} label="Logout" onClick={() => { localStorage.clear(); router.push('/login'); }} />
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="lg:ml-64 p-4 md:p-8 lg:p-12 pt-28">
        
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-4xl md:text-5xl font-black text-[#0A4D68]">Hey, {userName.split(' ')[0]} 👋</h1>
            </div>
            <div className="text-slate-500 text-[11px] font-black uppercase tracking-widest mt-2 flex items-center gap-2">
              Live Feed <button onClick={fetchSheetData}><RefreshCw size={12} className={refreshing ? 'animate-spin' : ''}/></button>
            </div>
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
                  <h3 className="text-xl font-bold mb-1 text-[#0A4D68]">Growth Analytics</h3>
                  <p className="text-slate-400 text-sm">Real-time enrollment tracking</p>
                </div>
                <TrendingUp className="text-[#86C232]" size={32} />
              </div>
              
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between items-end mb-4">
                    <span className="text-4xl font-black text-[#0A4D68]">+{stats.growthRate}%</span>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Enrollment Growth</span>
                  </div>
                  <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }} 
                      animate={{ width: `${stats.growthRate}%` }} 
                      className="h-full bg-[#86C232]" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-50 text-center">
                  <DetailItem label="Region" value="Global" />
                  <DetailItem label="Success Rate" value={`${successRate}%`} />
                  <DetailItem label="Status" value="Healthy" />
                </div>
              </div>
            </Card>
          </motion.div>

          <Card className="p-8 rounded-[2rem] bg-[#0A4D68] text-white shadow-xl flex flex-col justify-between">
            <h3 className="text-lg font-bold mb-6">Quick Actions</h3>
            <div className="space-y-3">
              <Link href="admin/students" className="block w-full">
                <ActionButton label="Review Students" />
              </Link>
              <Link href="admin/Tasks" className="block w-full">
                <ActionButton label="Manage Tasks" />
              </Link>
              <ActionButton label="System Broadcast" />
            </div>
          </Card>
        </div>
      </main>

      {/* CHART MODAL */}
      <AnimatePresence>
        {isChartOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-[100] p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsChartOpen(false)} className="fixed inset-0 bg-[#0A4D68]/60 backdrop-blur-xl" />
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="relative bg-white w-full max-w-4xl rounded-[3rem] shadow-2xl p-8 overflow-hidden">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-2xl font-black text-[#0A4D68]">Performance Breakdown</h2>
                <button onClick={() => setIsChartOpen(false)} className="p-2 hover:bg-slate-100 rounded-xl"><X /></button>
              </div>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={liveChartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                    <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px rgba(0,0,0,0.1)'}} />
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