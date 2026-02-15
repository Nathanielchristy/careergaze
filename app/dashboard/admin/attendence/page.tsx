'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Calendar as CalendarIcon, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  LayoutGrid,
  FileText,
  CheckSquare,
  MessageSquare,
  Award,
  LogOut,
  GraduationCap,
  Menu,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function AttendancePage() {
  const [userName, setUserName] = useState('Intern')
  const [userEmail, setUserEmail] = useState('')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [attendanceLogs, setAttendanceLogs] = useState([
    { date: '2023-10-20', status: 'Present', time: '09:15 AM' },
    { date: '2023-10-21', status: 'Present', time: '09:02 AM' },
    { date: '2023-10-22', status: 'Late', time: '10:30 AM' },
  ])

  useEffect(() => {
    setUserName(localStorage.getItem('userName') || 'Intern')
    setUserEmail(localStorage.getItem('userEmail') || '')
  }, [])

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0A4D68]">
      
      {/* MOBILE HEADER */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-[#0A4D68] text-white sticky top-0 z-[60] shadow-md">
        <div className="flex items-center gap-2">
          <div className="bg-[#86C232] p-1.5 rounded-lg"><GraduationCap size={20} className="text-[#0A4D68]" /></div>
          <span className="font-bold">Careergize</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2"><Menu size={24} /></button>
      </div>

      {/* SIDEBAR (Unified) */}
      <aside className={`fixed left-0 top-0 h-full w-72 bg-[#0A4D68] text-white flex flex-col p-6 z-[70] transition-transform lg:translate-x-0 lg:w-64 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="items-center gap-3 mb-10 hidden lg:flex">
          <div className="bg-[#86C232] p-2 rounded-lg"><GraduationCap size={24} className="text-[#0A4D68]" /></div>
          <span className="text-xl font-bold text-white">Careergize</span>
        </div>
        <nav className="space-y-2 flex-1">
          <Link href="/dashboard"><SidebarItem icon={<LayoutGrid size={20}/>} label="My Workspace" /></Link>
          <Link href="/dashboard/notes"><SidebarItem icon={<FileText size={20}/>} label="Learning Notes" /></Link>
          <Link href="/dashboard/interntask"><SidebarItem icon={<CheckSquare size={20}/>} label="Tasks & Projects" /></Link>
          <SidebarItem icon={<CalendarIcon size={20}/>} label="Attendance" active />
          <SidebarItem icon={<MessageSquare size={20}/>} label="Mentor Chat" />
        </nav>
        <div className="mt-auto pt-6 border-t border-white/10">
          <SidebarItem icon={<LogOut size={20}/>} label="Logout" />
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="lg:ml-64 p-4 md:p-8 lg:p-12">
        <header className="mb-10">
          <h1 className="text-3xl font-black text-[#0A4D68]">Attendance <span className="text-[#86C232]">Tracker</span></h1>
          <p className="text-slate-500 font-medium">Keep track of your consistency and daily check-ins.</p>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* STATS CARDS */}
          <div className="xl:col-span-1 space-y-6">
            <Card className="p-8 rounded-[2.5rem] bg-[#0A4D68] text-white border-none shadow-xl relative overflow-hidden">
               <div className="relative z-10">
                 <p className="text-[#86C232] text-[10px] font-black uppercase tracking-widest mb-2">Monthly Progress</p>
                 <h2 className="text-4xl font-black mb-4">92%</h2>
                 <p className="text-white/60 text-sm">You have been present for 22 out of 24 working days this month.</p>
               </div>
               <CheckCircle className="absolute -bottom-4 -right-4 w-32 h-32 text-white/5" />
            </Card>

            <div className="grid grid-cols-2 gap-4">
               <StatSmall title="Late Days" value="02" icon={<Clock className="text-orange-500" size={16}/>} />
               <StatSmall title="Absences" value="00" icon={<AlertCircle className="text-red-500" size={16}/>} />
            </div>
          </div>

          {/* ATTENDANCE HISTORY TABLE */}
          <div className="xl:col-span-2">
            <Card className="rounded-[2.5rem] border-none shadow-sm bg-white overflow-hidden">
              <div className="p-6 border-b border-slate-50 flex justify-between items-center">
                <h3 className="font-bold">Recent Logs</h3>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="rounded-xl"><ChevronLeft size={18}/></Button>
                  <Button variant="ghost" size="icon" className="rounded-xl"><ChevronRight size={18}/></Button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50/50">
                    <tr>
                      <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400">Date</th>
                      <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400">Time</th>
                      <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {attendanceLogs.map((log, i) => (
                      <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-8 py-5 font-bold text-sm">{log.date}</td>
                        <td className="px-8 py-5 text-sm text-slate-500 font-mono">{log.time}</td>
                        <td className="px-8 py-5">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                            log.status === 'Present' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
                          }`}>
                            {log.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

        </div>
      </main>
    </div>
  )
}

/* HELPER COMPONENTS */

function SidebarItem({ icon, label, active }: any) {
  return (
    <div className={`flex items-center gap-4 px-4 py-3.5 rounded-xl cursor-pointer transition-all duration-200 
      ${active ? 'bg-[#86C232] text-[#0A4D68] font-bold shadow-lg shadow-[#86C232]/10' : 'text-white/60 hover:bg-white/10 hover:text-white'}`}>
      <span className={active ? 'text-[#0A4D68]' : 'text-inherit'}>{icon}</span>
      <span className="text-sm">{label}</span>
    </div>
  )
}

function StatSmall({ title, value, icon }: any) {
  return (
    <Card className="p-5 rounded-[2rem] border-none shadow-sm bg-white flex flex-col items-center justify-center text-center">
      <div className="mb-2 p-2 bg-slate-50 rounded-lg">{icon}</div>
      <p className="text-[9px] font-black uppercase text-slate-400 mb-1">{title}</p>
      <p className="text-xl font-bold text-[#0A4D68]">{value}</p>
    </Card>
  )
}