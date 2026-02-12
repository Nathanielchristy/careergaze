'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  LayoutGrid, Users, LogOut, School, 
  Handshake, GraduationCap, Loader2,
  Menu, X, RefreshCw, Search, Mail, 
  ShieldCheck, Download
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyzcAwKEl-Exd2E5SzhoPLBcvO2uF9Ezviphs71y_OvSLDZEvIP7gPGmS6X_IlURe5H/exec'

export default function StudentDatabasePage() {
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [students, setStudents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [refreshing, setRefreshing] = useState(false)
  const [userName, setUserName] = useState('Admin')

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn')
    const storedName = localStorage.getItem('userName')
    if (!loggedIn) {
      router.push('/login')
    } else {
      setUserName(storedName || 'Administrator')
      fetchData()
    }
  }, [router])

  const fetchData = async () => {
    setRefreshing(true)
    try {
      const res = await fetch(`${SCRIPT_URL}?t=${Date.now()}`)
      const data = await res.json()
      if (data.students) setStudents(data.students)
    } catch (err) {
      console.error("Error:", err)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const handleLogout = () => {
    localStorage.clear()
    router.push('/login')
  }

  const filtered = students.filter(s => 
    s.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.college?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) return (
    <div className="min-h-screen bg-[#0A4D68] flex flex-col items-center justify-center text-white">
      <Loader2 className="animate-spin text-[#86C232] mb-4" size={40} />
      <p className="text-xs font-bold tracking-widest uppercase opacity-50 italic">Loading Student DB...</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      
      {/* MOBILE HEADER */}
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

      {/* SIDEBAR */}
      <aside className={`fixed left-0 top-0 h-full w-72 bg-[#0A4D68] text-white flex flex-col p-6 z-[70] transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:w-64`}>
        <div className="items-center gap-3 mb-10 hidden lg:flex">
          <div className="bg-[#86C232] p-2 rounded-lg">
            <GraduationCap className="text-[#0A4D68]" size={24} />
          </div>
          <span className="text-xl font-bold tracking-tight text-white italic">Careergize</span>
        </div>

        <nav className="space-y-2 flex-1">
          <Link href="/dashboard/admin">
            <SidebarItem icon={<LayoutGrid size={20}/>} label="Overview" active={false} />
          </Link>
          <SidebarItem icon={<Users size={20}/>} label="Students" active={true} />
          <SidebarItem icon={<School size={20}/>} label="Colleges" />
          <SidebarItem icon={<Handshake size={20}/>} label="Clients" />
        </nav>

        <div className="mt-auto pt-6 border-t border-white/10">
          <SidebarItem icon={<LogOut size={20} />} label="Logout" onClick={handleLogout} />
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="transition-all duration-300 lg:ml-64 p-4 md:p-8 lg:p-12">
        
        <header className="flex flex-col md:flex-row justify-between items-start gap-4 mb-10">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-[#0A4D68]">
              Student <span className="text-[#86C232]">Database</span>
            </h1>
            <p className="text-slate-500 text-sm font-semibold mt-1">
              Active Management Portal • {students.length} Total Records
            </p>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Button 
              onClick={fetchData} 
              variant="outline"
              className="flex-1 md:flex-none h-12 bg-white rounded-xl border-slate-300 gap-2 font-bold text-[#0A4D68] hover:border-[#86C232] transition-all"
            >
              <RefreshCw size={16} className={refreshing ? 'animate-spin text-[#86C232]' : ''} />
              {refreshing ? 'Syncing...' : 'Refresh'}
            </Button>
            <Button className="flex-1 md:flex-none h-12 bg-[#0A4D68] hover:bg-black text-white rounded-xl gap-2 font-bold px-6">
              <Download size={16} /> Export
            </Button>
          </div>
        </header>

        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text"
            placeholder="Search candidate, email, or university..."
            className="w-full h-16 pl-14 pr-6 bg-white border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-[#86C232] transition-all font-bold text-black shadow-sm placeholder:text-slate-300 placeholder:font-normal"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Data Table */}
        <Card className="rounded-[1.5rem] border-none shadow-xl bg-white overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200">
                  {/* HEADER TEXT IS NOW BLACK */}
                  <th className="px-8 py-5 text-[11px] font-black uppercase text-black tracking-widest">Candidate Name</th>
                  <th className="px-8 py-5 text-[11px] font-black uppercase text-black tracking-widest">Specialization</th>
                  <th className="px-8 py-5 text-[11px] font-black uppercase text-black tracking-widest">Institution</th>
                  <th className="px-8 py-5 text-[11px] font-black uppercase text-black tracking-widest text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                <AnimatePresence>
                  {filtered.map((s, i) => (
                    <motion.tr 
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-slate-50/80 transition-all cursor-default group"
                    >
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-[#0A4D68] flex items-center justify-center font-bold text-[#86C232] shadow-sm">
                            {s.fullName?.charAt(0)}
                          </div>
                          <div>
                            {/* ENHANCED VISIBILITY: TEXT-BLACK */}
                            <p className="font-bold text-black text-[15px] leading-none mb-1.5">{s.fullName}</p>
                            <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400">
                               <Mail size={12} className="text-[#86C232]"/> {s.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex flex-col gap-1.5">
                          {/* HIGH CONTRAST BADGE */}
                          <span className="text-[10px] font-black bg-[#86C232] text-black px-2.5 py-1 rounded-md w-fit uppercase tracking-tighter shadow-sm">
                            {s.track}
                          </span>
                          <span className="text-[11px] font-bold text-black italic">{s.standing}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-[13px] font-bold text-black">
                        <div className="flex items-center gap-2">
                           <GraduationCap size={16} className="text-[#0A4D68] opacity-40" />
                           <span className="max-w-[220px] truncate">{s.college}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                         <div className="flex justify-center">
                            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0A4D68] text-[#86C232] rounded-full text-[10px] font-black uppercase tracking-tighter">
                               <ShieldCheck size={14}/> Verified
                            </span>
                         </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </Card>
      </main>
    </div>
  )
}

function SidebarItem({ icon, label, active, onClick }: any) {
  return (
    <div onClick={onClick} className={`flex items-center gap-4 px-4 py-3.5 rounded-xl cursor-pointer transition-all duration-200 ${active ? 'bg-[#86C232] text-[#0A4D68] font-bold shadow-lg shadow-[#86C232]/10' : 'text-white/60 hover:bg-white/10 hover:text-white'}`}>
      <span className={active ? 'text-[#0A4D68]' : 'text-inherit'}>{icon}</span>
      <span className="text-sm">{label}</span>
    </div>
  )
}