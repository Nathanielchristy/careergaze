'use client'

import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BookOpen, Calendar, CheckCircle, GraduationCap,
  LayoutGrid, Clock, Bell, LogOut, FileText, 
  CheckSquare, MessageSquare, Award, ExternalLink
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

/* =====================
   MOCK DATA & TYPES
===================== */

type InternshipTask = {
  id: string
  title: string
  deadline: string
  status: 'pending' | 'submitted' | 'reviewed'
}

const TASKS: InternshipTask[] = [
  { id: '1', title: 'Weekly Progress Report', deadline: 'Today, 5:00 PM', status: 'pending' },
  { id: '2', title: 'React Performance Audit', deadline: 'Oct 24', status: 'submitted' },
  { id: '3', title: 'UI Component Library', deadline: 'Oct 20', status: 'reviewed' },
]

/* =====================
   MAIN COMPONENT
===================== */

export default function InternDashboard() {
  const [attendanceMarked, setAttendanceMarked] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString())

  // Update clock every second
  React.useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date().toLocaleTimeString()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0A4D68]">

      {/* SIDEBAR */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-[#0A4D68] text-white hidden lg:flex flex-col p-6">
        <Brand />
        <nav className="space-y-2 flex-1">
          <SidebarItem icon={<LayoutGrid size={20} />} label="My Workspace" active />
          <SidebarItem icon={<FileText size={20} />} label="Learning Notes" />
          <SidebarItem icon={<CheckSquare size={20} />} label="Tasks & Projects" />
          <SidebarItem icon={<MessageSquare size={20} />} label="Mentor Chat" />
          <SidebarItem icon={<Award size={20} />} label="Final Certification" />
        </nav>
        <SidebarItem icon={<LogOut size={20} />} label="Logout" />
      </aside>

      {/* MAIN CONTENT */}
      <main className="lg:ml-64 p-6 lg:p-12">
        
        {/* HEADER SECTION */}
        <header className="flex flex-col md:flex-row justify-between items-start gap-4 mb-10">
          {/* Replace the h1 in your Header section with this */}
<div>
  <h1 className="text-3xl font-extrabold text-[#0A4D68]">
    Welcome back, <span className="text-[#86C232]">John Doe</span> 👋
  </h1>
  <p className="text-slate-500 text-sm">Intern ID: #CG-2026-042</p>
</div>
          {/* DIGITAL ATTENDANCE CARD */}
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

        {/* TOP STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-10">
          <StatBox title="Days Completed" value="18/45" icon={<Calendar className="text-[#86C232]" />} />
          <StatBox title="Tasks Done" value="12" icon={<CheckSquare className="text-[#86C232]" />} />
          <StatBox title="Current Grade" value="A-" icon={<Award className="text-[#86C232]" />} />
          <StatBox title="Learning Hours" value="92h" icon={<Clock className="text-[#86C232]" />} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COL: TASKS & NOTES */}
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <FileText size={20} className="text-[#86C232]" /> Latest Study Notes
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <NoteCard title="Advanced Next.js Routing" date="Updated 2h ago" tag="Technical" />
                <NoteCard title="Effective Communication" date="Yesterday" tag="Soft Skills" />
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Upcoming Deadlines</h2>
              <Card className="rounded-[2rem] overflow-hidden border-none shadow-sm bg-white">
                <table className="w-full text-left">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-4 text-xs uppercase font-bold text-slate-400">Task Name</th>
                      <th className="px-6 py-4 text-xs uppercase font-bold text-slate-400">Deadline</th>
                      <th className="px-6 py-4 text-xs uppercase font-bold text-slate-400">Status</th>
                      <th className="px-6 py-4"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {TASKS.map((task) => (
                      <tr key={task.id} className="border-t border-slate-50">
                        <td className="px-6 py-4 font-bold">{task.title}</td>
                        <td className="px-6 py-4 text-slate-500 text-sm">{task.deadline}</td>
                        <td className="px-6 py-4">
                          <StatusBadge status={task.status} />
                        </td>
                        <td className="px-6 py-4">
                          <Button variant="ghost" size="sm" className="text-[#0A4D68]">Submit</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
            </section>
          </div>

          {/* RIGHT COL: PROGRESS & MENTOR */}
          <div className="space-y-8">
            <Card className="p-6 rounded-[2rem] bg-[#0A4D68] text-white border-none">
              <h3 className="font-bold text-lg mb-4">Internship Progress</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2 text-white/80">
                    <span>Program Completion</span>
                    <span>40%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full">
                    <div className="h-full bg-[#86C232] w-[40%] rounded-full shadow-[0_0_10px_#86C232]" />
                  </div>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <p className="text-xs text-white/60 mb-1">Assigned Mentor</p>
                  <p className="font-bold">Engr. Sarah Connor</p>
                  <Button variant="link" className="p-0 h-auto text-[#86C232] text-xs">Book 1:1 Session</Button>
                </div>
              </div>
            </Card>

            <Card className="p-6 rounded-[2rem] border-none shadow-sm bg-white">
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <div className="space-y-3">
                <LinkItem title="Program Syllabus" />
                <LinkItem title="Submission Portal" />
                <LinkItem title="Slack Community" />
                <LinkItem title="Leave Request" />
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

/* =====================
   SUB-COMPONENTS
===================== */

function Brand() {
  return (
    <div className="flex items-center gap-3 mb-10">
      <div className="bg-[#86C232] p-2 rounded-lg">
        <GraduationCap className="text-[#0A4D68]" size={24} />
      </div>
      <span className="text-xl font-bold tracking-tight">Careergize</span>
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

function NoteCard({ title, date, tag }: any) {
  return (
    <Card className="p-5 border-none shadow-sm bg-white rounded-2xl hover:ring-2 ring-[#86C232] transition-all cursor-pointer">
      <span className="px-2 py-1 bg-slate-100 text-[#0A4D68] text-[10px] font-bold rounded uppercase">{tag}</span>
      <h4 className="font-bold mt-3 mb-1">{title}</h4>
      <p className="text-xs text-slate-400">{date}</p>
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

function LinkItem({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 cursor-pointer group">
      <span className="text-sm font-medium text-slate-600 group-hover:text-[#0A4D68]">{title}</span>
      <ExternalLink size={14} className="text-slate-300 group-hover:text-[#86C232]" />
    </div>
  )
}

function SidebarItem({ icon, label, active }: any) {
  return (
    <div className={`flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition-colors ${
      active ? 'bg-[#86C232] text-[#0A4D68] font-bold' : 'text-white/60 hover:bg-white/10'
    }`}>
      {icon}
      <span className="text-sm">{label}</span>
    </div>
  )
}