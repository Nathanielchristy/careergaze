'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  LayoutGrid, Users, LogOut, School, 
  Handshake, GraduationCap, Loader2,
  Menu, X, RefreshCw, Search, Mail, 
  ShieldCheck, Download, PlusCircle, Trash2, Edit3, AlertTriangle
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
  const [selectedStudent, setSelectedStudent] = useState<any>(null)
  
  // Modals/Drawers State
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [drawerMode, setDrawerMode] = useState<'task' | 'edit'>('task')

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn')
    if (!loggedIn) {
      router.push('/login')
    } else {
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

  const confirmDelete = async () => {
    if (!selectedStudent) return
    
    // Optimistic Update
    const emailToDelete = selectedStudent.email
    setStudents(prev => prev.filter(s => s.email !== emailToDelete))
    setIsDeleteModalOpen(false)

    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify({ action: 'deleteStudent', email: emailToDelete })
      })
    } catch (err) {
      console.error("Delete failed")
      fetchData() // Refresh to sync back
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
      
      {/* SIDEBAR - SAME AS BEFORE */}
      <aside className={`fixed left-0 top-0 h-full w-72 bg-[#0A4D68] text-white flex flex-col p-6 z-[70] transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:w-64`}>
        <div className="items-center gap-3 mb-10 hidden lg:flex">
          <div className="bg-[#86C232] p-2 rounded-lg"><GraduationCap className="text-[#0A4D68]" size={24} /></div>
          <span className="text-xl font-bold tracking-tight text-white italic">Careergize</span>
        </div>
        <nav className="space-y-2 flex-1">
          <Link href="/dashboard/admin"><SidebarItem icon={<LayoutGrid size={20}/>} label="Overview" /></Link>
          <SidebarItem icon={<Users size={20}/>} label="Students" active={true} />
          <SidebarItem icon={<School size={20}/>} label="Colleges" />
          <SidebarItem icon={<Handshake size={20}/>} label="Clients" />
        </nav>
        <div className="mt-auto pt-6 border-t border-white/10">
          <SidebarItem icon={<LogOut size={20} />} label="Logout" onClick={handleLogout} />
        </div>
      </aside>

      <main className="transition-all duration-300 lg:ml-64 p-4 md:p-8 lg:p-12">
        <header className="flex flex-col md:flex-row justify-between items-start gap-4 mb-10">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-[#0A4D68]">Student <span className="text-[#86C232]">Registred</span></h1>
            <p className="text-slate-500 text-sm font-semibold mt-1">Management Portal • {students.length} Records</p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Button onClick={fetchData} variant="outline" className="h-12 bg-white rounded-xl border-slate-300 gap-2 font-bold text-[#0A4D68]">
              <RefreshCw size={16} className={refreshing ? 'animate-spin' : ''} /> {refreshing ? 'Syncing...' : 'Refresh'}
            </Button>
          </div>
        </header>

        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" placeholder="Search students..."
            className="w-full h-16 pl-14 pr-6 bg-white border-2 border-slate-100 rounded-2xl focus:border-[#86C232] outline-none font-bold"
            value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Card className="rounded-[1.5rem] border-none shadow-xl bg-white overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200">
                  <th className="px-8 py-5 text-[11px] font-black uppercase text-black">Candidate</th>
                  <th className="px-8 py-5 text-[11px] font-black uppercase text-black">Specialization</th>
                  <th className="px-8 py-5 text-[11px] font-black uppercase text-black">Institution</th>
                  <th className="px-8 py-5 text-[11px] font-black uppercase text-black text-right">Task</th>
                  <th className="px-8 py-5 text-[11px] font-black uppercase text-black text-center">Status</th>
                  <th className="px-8 py-5 text-[11px] font-black uppercase text-black text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                <AnimatePresence>
                  {filtered.map((s, i) => (
                    <motion.tr key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hover:bg-slate-50/80 transition-all">
                      <td className="px-8 py-6">
                        <p className="font-bold text-black text-[15px]">{s.fullName}</p>
                        <p className="text-[11px] font-bold text-slate-400">{s.email}</p>
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-[10px] font-black bg-[#86C232] text-black px-2.5 py-1 rounded-md uppercase">{s.track}</span>
                      </td>
                      <td className="px-8 py-6 text-[13px] font-bold text-black truncate max-w-[150px]">{s.college}</td>
                      
                      {/* RESTORED TASK COLUMN */}
                      <td className="px-8 py-6 text-right">
                        <Button 
                          onClick={() => { setSelectedStudent(s); setDrawerMode('task'); setIsDrawerOpen(true); }}
                          className="bg-[#0A4D68] hover:bg-black text-[#86C232] text-[10px] font-black h-9 rounded-lg px-4"
                        >
                          <PlusCircle size={14} className="mr-2" /> Assign
                        </Button>
                      </td>

                      <td className="px-8 py-6">
                        <div className="flex justify-center">
                          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0A4D68] text-[#86C232] rounded-full text-[10px] font-black uppercase tracking-tighter">
                            <ShieldCheck size={14}/>{s.status}
                          </span>
                        </div>
                      </td>

                      <td className="px-8 py-6">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => { setSelectedStudent(s); setDrawerMode('edit'); setIsDrawerOpen(true); }} className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg"><Edit3 size={18}/></button>
                          <button onClick={() => { setSelectedStudent(s); setIsDeleteModalOpen(true); }} className="p-2 hover:bg-red-50 text-red-500 rounded-lg"><Trash2 size={18}/></button>
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

      {/* TASK / EDIT DRAWER */}
      <AnimatePresence>
  {isDrawerOpen && (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsDrawerOpen(false)} className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[80]" />
      <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[90] shadow-2xl p-8 overflow-y-auto">
        
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-black text-[#0A4D68]">
            {drawerMode === 'task' ? 'New Task' : 'Update Profile'}
          </h2>
          <button onClick={() => setIsDrawerOpen(false)} className="p-2 hover:bg-slate-100 rounded-full"><X /></button>
        </div>

        {selectedStudent && (
          <div className="mb-8 p-5 bg-[#0A4D68] rounded-2xl text-white shadow-lg">
            <p className="text-[10px] font-black text-[#86C232] uppercase mb-1">Target Student</p>
            <p className="text-xl font-bold">{selectedStudent.fullName}</p>
            <p className="text-xs opacity-60 font-medium">{selectedStudent.email}</p>
          </div>
        )}

        <div className="space-y-6">
          {drawerMode === 'task' ? (
            /* --- TASK ASSIGNMENT FIELDS --- */
            <>
              <div>
                <label className="text-[11px] font-black uppercase text-black mb-2 block tracking-widest">Task Title</label>
                <input type="text" placeholder="e.g. Design System Audit" className="w-full h-12 border-2 border-slate-100 rounded-xl px-4 font-bold text-black focus:border-[#86C232] outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-black uppercase text-black mb-2 block tracking-widest">Deadline</label>
                  <input type="date" className="w-full h-12 border-2 border-slate-100 rounded-xl px-4 font-bold text-black focus:border-[#86C232] outline-none" />
                </div>
                <div>
                  <label className="text-[11px] font-black uppercase text-black mb-2 block tracking-widest">Priority</label>
                  <select className="w-full h-12 border-2 border-slate-100 rounded-xl px-4 font-bold text-black focus:border-[#86C232] outline-none bg-white">
                    <option>Standard</option>
                    <option>Urgent</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-[11px] font-black uppercase text-black mb-2 block tracking-widest">Instructions</label>
                <textarea rows={6} placeholder="Describe the task steps..." className="w-full border-2 border-slate-100 rounded-xl p-4 font-bold text-black focus:border-[#86C232] outline-none" />
              </div>
            </>
          ) : (
            /* --- EDIT PROFILE FIELDS --- */
            <>
              <div>
                <label className="text-[11px] font-black uppercase text-black mb-2 block tracking-widest">Full Name</label>
                <input 
                  type="text" 
                  defaultValue={selectedStudent?.fullName} 
                  className="w-full h-12 border-2 border-slate-100 rounded-xl px-4 font-bold text-black focus:border-[#86C232] outline-none" 
                />
              </div>
              <div>
                <label className="text-[11px] font-black uppercase text-black mb-2 block tracking-widest">Institution / College</label>
                <input 
                  type="text" 
                  defaultValue={selectedStudent?.college} 
                  className="w-full h-12 border-2 border-slate-100 rounded-xl px-4 font-bold text-black focus:border-[#86C232] outline-none" 
                />
              </div>
              <div>
                <label className="text-[11px] font-black uppercase text-black mb-2 block tracking-widest">Specialization Track</label>
                <select 
                  defaultValue={selectedStudent?.track}
                  className="w-full h-12 border-2 border-slate-100 rounded-xl px-4 font-bold text-black focus:border-[#86C232] outline-none bg-white"
                >
                  <option>AI & Machine Learning</option>
                  <option>Full-Stack Development</option>
                  <option>UI/UX Design & Research</option>
                  <option>Digital Marketing</option>
                </select>
              </div>
              <div>
                <label className="text-[11px] font-black uppercase text-black mb-2 block tracking-widest">Enrollment Status</label>
                <select 
                  defaultValue={selectedStudent?.status}
                  className="w-full h-12 border-2 border-slate-100 rounded-xl px-4 font-bold text-black focus:border-[#86C232] outline-none bg-white"
                >
                  <option>Registered</option>
                  <option>In-Training</option>
                  <option>Completed</option>
                  <option>On-Hold</option>
                </select>
              </div>
            </>
          )}

          <Button 
            className={`w-full h-14 font-black uppercase tracking-widest rounded-2xl shadow-xl transition-all ${
              drawerMode === 'task' 
                ? 'bg-[#0A4D68] text-[#86C232] hover:bg-black' 
                : 'bg-[#86C232] text-[#0A4D68] hover:bg-black hover:text-white'
            }`}
          >
            {drawerMode === 'task' ? 'Deploy Task' : 'Update Profile'}
          </Button>
        </div>
      </motion.div>
    </>
  )}
</AnimatePresence>

      {/* CUSTOM DELETE POPUP (MODAL) */}
      <AnimatePresence>
        {isDeleteModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-[100] p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsDeleteModalOpen(false)} className="fixed inset-0 bg-[#0A4D68]/80 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-white w-full max-w-sm rounded-[2.5rem] p-10 text-center shadow-2xl">
              <div className="w-20 h-20 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <AlertTriangle size={40} />
              </div>
              <h3 className="text-2xl font-black text-[#0A4D68] mb-2">Are you sure?</h3>
              <p className="text-slate-500 text-sm mb-8 font-medium">You are about to delete <span className="text-black font-bold">{selectedStudent?.fullName}</span>. This action is irreversible.</p>
              
              <div className="flex flex-col gap-3">
                <Button onClick={confirmDelete} className="w-full h-14 bg-red-500 hover:bg-red-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-red-200">Delete Record</Button>
                <Button onClick={() => setIsDeleteModalOpen(false)} variant="ghost" className="w-full h-14 text-slate-400 font-bold hover:bg-slate-50 rounded-2xl">Nevermind, go back</Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

function SidebarItem({ icon, label, active, onClick }: any) {
  return (
    <div onClick={onClick} className={`flex items-center gap-4 px-4 py-3.5 rounded-xl cursor-pointer transition-all ${active ? 'bg-[#86C232] text-[#0A4D68] font-bold shadow-lg shadow-[#86C232]/10' : 'text-white/60 hover:bg-white/10 hover:text-white'}`}>
      <span className={active ? 'text-[#0A4D68]' : 'text-inherit'}>{icon}</span>
      <span className="text-sm">{label}</span>
    </div>
  )
}