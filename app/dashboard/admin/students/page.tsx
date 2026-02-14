'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  LayoutGrid, Users, LogOut, GraduationCap, Loader2,
  X, RefreshCw, Search, PlusCircle, Trash2, Edit3, AlertTriangle,
  FileText, UserCheck, Menu, MessageSquare, ChevronRight
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const STUDENT_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyzcAwKEl-Exd2E5SzhoPLBcvO2uF9Ezviphs71y_OvSLDZEvIP7gPGmS6X_IlURe5H/exec'
const TASK_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwqpmcrYXG_bLhg_LBdHG9P5T0jbMp7d9TeFFZP_skP7VXjWo08pTRKeb_C-Pi6BkPe/exec'

export default function StudentDatabasePage() {
  const router = useRouter()
  const [students, setStudents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [refreshing, setRefreshing] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [drawerMode, setDrawerMode] = useState<'task' | 'edit'>('task')
  const [selectedStudent, setSelectedStudent] = useState<any>(null)

  const [taskData, setTaskData] = useState({
    title: '', startDate: '', endDate: '',
    priority: 'Medium', instructions: '',
    category: 'General', spentHours: '0'
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setRefreshing(true)
    try {
      const res = await fetch(`${STUDENT_SCRIPT_URL}?action=getStudents&t=${Date.now()}`)
      const data = await res.json()
      if (data.students) setStudents(data.students)
    } catch (err) {
      console.error("Database Error:", err)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const handleDeployTask = async () => {
    if (!selectedStudent || !taskData.title) {
      alert("Please select a student and provide a task title.")
      return
    }
    setRefreshing(true)
    const payload = {
      action: 'assignTask',
      studentEmail: selectedStudent.email,
      studentName: selectedStudent.fullName,
      ...taskData
    }
    try {
      await fetch(TASK_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(payload)
      })
      alert(`Success! Task deployed to ${selectedStudent.fullName}`)
      setIsDrawerOpen(false)
      setTaskData({
        title: '', startDate: '', endDate: '',
        priority: 'Medium', instructions: '',
        category: 'General', spentHours: '0'
      })
    } catch (err) {
      alert("Network error: Check script deployment.")
    } finally {
      setRefreshing(false)
    }
  }

  const filtered = students.filter(s => 
    s.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.email?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) return (
    <div className="h-screen bg-slate-50 flex flex-col items-center justify-center">
      <Loader2 className="animate-spin text-[#86C232]" size={40} />
      <p className="text-[#0A4D68] font-bold text-[10px] tracking-widest mt-4 uppercase">Syncing Records</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans overflow-x-hidden">
      
      {/* --- SIDEBAR --- */}
      <aside className={`fixed inset-y-0 left-0 w-64 bg-[#0A4D68] text-white flex flex-col p-6 z-[60] transition-transform duration-300 lg:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="bg-[#86C232] p-2 rounded-lg"><GraduationCap className="text-[#0A4D68]" size={22} /></div>
            <span className="text-xl font-bold italic tracking-tight">Careergize</span>
          </div>
          <button onClick={() => setIsMobileMenuOpen(false)} className="lg:hidden p-1 hover:bg-white/10 rounded"><X size={20}/></button>
        </div>
        
        <nav className="space-y-2 flex-1">
          <Link href="/dashboard/admin"><SidebarItem icon={<LayoutGrid size={20}/>} label="Overview" /></Link>
          <Link href="/dashboard/admin/users"><SidebarItem icon={<Users size={20}/>} label="Registered Users" /></Link>
          <Link href="/dashboard/admin/students"><SidebarItem icon={<Users size={20}/>} label="Students" active /></Link>
          <Link href="/dashboard/admin/Tasks"><SidebarItem icon={<Users size={20}/>} label="Tasks" /></Link>
          <SidebarItem icon={<MessageSquare size={20}/>} label="Chat with Team" />
        </nav>

        <div className="pt-6 border-t border-white/10">
          <SidebarItem icon={<LogOut size={18} />} label="Logout" onClick={() => { localStorage.clear(); router.push('/login'); }} />
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 flex flex-col min-w-0 lg:ml-64 transition-all">
        
        {/* HEADER */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40 flex items-center justify-between px-6 md:px-10">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2 text-[#0A4D68] hover:bg-slate-100 rounded-xl">
              <Menu size={24} />
            </button>
            <h2 className="text-[#0A4D68] font-black text-lg tracking-tight uppercase">Student Database</h2>
          </div>
          
          <div className="flex items-center gap-3">
             <button onClick={fetchData} disabled={refreshing} className="p-2.5 rounded-xl border border-slate-200 text-[#0A4D68] hover:border-[#86C232] transition-all bg-white shadow-sm">
               <RefreshCw size={18} className={refreshing ? 'animate-spin' : ''} />
             </button>
             <div className="w-10 h-10 rounded-xl bg-[#0A4D68] flex items-center justify-center font-bold text-[#86C232] text-xs">AD</div>
          </div>
        </header>

        <div className="p-6 md:p-10 max-w-6xl mx-auto w-full">
          <div className="flex flex-col md:flex-row justify-between items-end gap-4 mb-8">
            <div className="flex-1 w-full relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" placeholder="Search by name, email or track..."
                className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border border-slate-200 focus:border-[#86C232] outline-none transition-all text-sm font-medium shadow-sm"
                value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <Card className="rounded-[2rem] border-none shadow-sm bg-white overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Candidate</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Track</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Status</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filtered.map((s, i) => (
                    <tr key={i} className="hover:bg-slate-50/80 transition-all group">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-xl bg-[#0A4D68]/5 flex items-center justify-center font-bold text-[#0A4D68] text-sm uppercase">
                            {s.fullName?.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-[#0A4D68] text-sm leading-tight">{s.fullName}</p>
                            <p className="text-[11px] font-medium text-slate-400">{s.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <span className="text-[9px] font-black bg-[#86C232]/10 text-[#86C232] px-3 py-1.5 rounded-lg uppercase tracking-wider">{s.track || 'General'}</span>
                      </td>
                      <td className="px-8 py-5 text-center">
                        <span className={`text-[10px] font-bold ${s.status === 'Active' ? 'text-green-500' : 'text-red-400'}`}>{s.status}</span>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <div className="flex justify-end items-center gap-2">
                          <Button 
                            onClick={() => { setSelectedStudent(s); setDrawerMode('task'); setIsDrawerOpen(true); }}
                            className="bg-[#0A4D68] hover:bg-black text-[#86C232] text-[10px] font-black h-8 px-4 rounded-xl shadow-sm"
                          >
                            <PlusCircle size={14} className="mr-2" /> Assign
                          </Button>
                          <button onClick={() => { setSelectedStudent(s); setDrawerMode('edit'); setIsDrawerOpen(true); }} className="p-2 text-slate-300 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-all"><Edit3 size={18}/></button>
                          <button onClick={() => { setSelectedStudent(s); setIsDeleteModalOpen(true); }} className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"><Trash2 size={18}/></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </main>

      {/* DRAWER & MODAL STYLES REMAIN SAME AS THEY ARE OVERLAYS */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsDrawerOpen(false)} className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[80]" />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[90] shadow-2xl p-8 overflow-y-auto rounded-l-[2rem]">
               <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-black text-[#0A4D68] uppercase tracking-tight">{drawerMode === 'task' ? 'Deploy Task' : 'Edit Profile'}</h2>
                <button onClick={() => setIsDrawerOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><X size={20}/></button>
              </div>
              {/* Form content remains same */}
              <div className="space-y-6">
                {drawerMode === 'task' ? (
                  <>
                    <div>
                      <label className="text-[10px] font-black uppercase text-slate-400 mb-2 block tracking-widest flex items-center gap-2">
                        <UserCheck size={14} className="text-[#86C232]"/> Selected Student
                      </label>
                      <select 
                        value={selectedStudent?.email || ''}
                        onChange={(e) => {
                          const student = students.find(s => s.email === e.target.value);
                          setSelectedStudent(student);
                        }}
                        className="w-full h-12 border-2 border-slate-50 rounded-xl px-4 font-bold text-sm text-black focus:border-[#86C232] outline-none bg-slate-50/50 appearance-none"
                      >
                        <option value="" disabled>Select a student...</option>
                        {students.map((s, idx) => (
                          <option key={idx} value={s.email}>{s.fullName}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] font-black uppercase text-slate-400 mb-2 block tracking-widest flex items-center gap-2">
                        <FileText size={14} className="text-[#86C232]"/> Task Title
                      </label>
                      <input 
                        type="text" value={taskData.title}
                        onChange={(e) => setTaskData({...taskData, title: e.target.value})}
                        className="w-full h-12 border-2 border-slate-50 rounded-xl px-4 font-bold text-sm bg-slate-50/50 outline-none focus:border-[#86C232]" 
                        placeholder="e.g. Core Java Assessment"
                      />
                    </div>
                    {/* ... other task inputs ... */}
                  </>
                ) : (
                  <div className="space-y-4">
                    <p className="text-slate-400 font-bold text-xs uppercase italic">Updating: {selectedStudent?.fullName}</p>
                    <input type="text" defaultValue={selectedStudent?.fullName} className="w-full h-12 border-2 border-slate-50 rounded-xl px-4 font-bold text-sm bg-slate-50/50" />
                    <input type="text" defaultValue={selectedStudent?.track} className="w-full h-12 border-2 border-slate-50 rounded-xl px-4 font-bold text-sm bg-slate-50/50" />
                  </div>
                )}

                <Button 
                  onClick={drawerMode === 'task' ? handleDeployTask : undefined}
                  disabled={refreshing}
                  className="w-full h-14 font-black uppercase tracking-widest rounded-2xl bg-[#0A4D68] text-[#86C232] hover:bg-black shadow-xl shadow-[#0A4D68]/20 transition-all"
                >
                  {refreshing ? <Loader2 className="animate-spin" /> : (drawerMode === 'task' ? 'Deploy Task' : 'Update Profile')}
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Delete Modal */}
      <AnimatePresence>
        {isDeleteModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-[100] p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsDeleteModalOpen(false)} className="fixed inset-0 bg-[#0A4D68]/40 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative bg-white w-full max-w-sm rounded-[2.5rem] p-10 text-center shadow-2xl">
              <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className="text-red-500" size={40} />
              </div>
              <h3 className="text-xl font-black mb-2 text-[#0A4D68] uppercase tracking-tight">Delete Record?</h3>
              <p className="text-slate-400 text-sm font-medium mb-8 leading-relaxed">This will permanently remove <span className="font-bold text-black">{selectedStudent?.fullName}</span> from the sync database.</p>
              <div className="flex flex-col gap-3">
                {/* <Button onClick={confirmDelete} className="bg-red-500 hover:bg-red-600 text-white h-12 rounded-2xl font-black uppercase tracking-widest text-[10px]">Confirm Delete</Button> */}
                <Button onClick={() => setIsDeleteModalOpen(false)} variant="ghost" className="h-12 font-black uppercase tracking-widest text-[10px] text-slate-400">Cancel</Button>
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
    <div onClick={onClick} className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${active ? 'bg-[#86C232] text-[#0A4D68] font-bold shadow-lg shadow-[#86C232]/20' : 'text-white/60 hover:text-white hover:bg-white/5'}`}>
      {icon} <span className="text-sm">{label}</span>
    </div>
  )
}