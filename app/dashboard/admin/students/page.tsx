'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  LayoutGrid, Users, LogOut, School, 
  Handshake, GraduationCap, Loader2,
  X, RefreshCw, Search, 
  ShieldCheck, PlusCircle, Trash2, Edit3, AlertTriangle,
  Calendar, Clock, FileText, Tag, UserCheck
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

// 1. URL for Student Data (Fetching)
const STUDENT_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyzcAwKEl-Exd2E5SzhoPLBcvO2uF9Ezviphs71y_OvSLDZEvIP7gPGmS6X_IlURe5H/exec'

// 2. URL for Task Sheet (Posting)
const TASK_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwqpmcrYXG_bLhg_LBdHG9P5T0jbMp7d9TeFFZP_skP7VXjWo08pTRKeb_C-Pi6BkPe/exec'

export default function StudentDatabasePage() {
  const router = useRouter()
  const [students, setStudents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [refreshing, setRefreshing] = useState(false)
  
  // Modals/Drawers State
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [drawerMode, setDrawerMode] = useState<'task' | 'edit'>('task')
  
  // State for the specific student being interacted with
  const [selectedStudent, setSelectedStudent] = useState<any>(null)

  // Task Assignment State
  const [taskData, setTaskData] = useState({
    title: '',
    startDate: '',
    endDate: '',
    priority: 'Medium',
    instructions: '',
    category: 'General',
    spentHours: '0'
  })

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn')
    if (!loggedIn) {
      router.push('/login')
    } else {
      fetchData()
    }
  }, [router])

  // --- FETCH STUDENT DATA FROM FIRST SHEET ---
  const fetchData = async () => {
    setRefreshing(true)
    try {
      // Added a cache buster timestamp and proper error handling
      const res = await fetch(`${STUDENT_SCRIPT_URL}?action=getStudents&t=${Date.now()}`)
      if (!res.ok) throw new Error("Failed to reach student script")
      
      const data = await res.json()
      if (data.students) {
        setStudents(data.students)
      }
    } catch (err) {
      console.error("Database Error:", err)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  // --- DEPLOY TASK TO SECOND SHEET ---
  const handleDeployTask = async () => {
    if (!selectedStudent || !taskData.title) {
      alert("Please select a student and provide a task title.")
      return
    }

    setRefreshing(true)
    
    // We combine student details with task details for the payload
    const payload = {
      action: 'assignTask',
      studentEmail: selectedStudent.email,
      studentName: selectedStudent.fullName,
      ...taskData
    }

    try {
      // IMPORTANT: Using TASK_SCRIPT_URL here
      await fetch(TASK_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Critical for Google Apps Script redirects
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(payload)
      })
      
      alert(`Success! Task deployed to ${selectedStudent.fullName}`)
      setIsDrawerOpen(false)
      
      // Reset Form
      setTaskData({
        title: '', startDate: '', endDate: '',
        priority: 'Medium', instructions: '',
        category: 'General', spentHours: '0'
      })
    } catch (err) {
      console.error("Deploy failed", err)
      alert("Network error: Check if Task Script is deployed to 'Anyone'")
    } finally {
      setRefreshing(false)
    }
  }

  const confirmDelete = async () => {
    if (!selectedStudent) return
    const emailToDelete = selectedStudent.email
    setStudents(prev => prev.filter(s => s.email !== emailToDelete))
    setIsDeleteModalOpen(false)

    try {
      await fetch(STUDENT_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify({ action: 'deleteStudent', email: emailToDelete })
      })
    } catch (err) {
      console.error("Delete failed")
      fetchData()
    }
  }

  const filtered = students.filter(s => 
    s.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.email?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) return (
    <div className="min-h-screen bg-[#0A4D68] flex flex-col items-center justify-center text-white p-4">
      <Loader2 className="animate-spin text-[#86C232] mb-4" size={48} />
      <h2 className="text-xl font-bold">Synchronizing Records...</h2>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      
      <aside className="fixed left-0 top-0 h-full w-64 bg-[#0A4D68] text-white flex flex-col p-6 z-[70] hidden lg:flex">
        <div className="flex items-center gap-3 mb-10">
          <div className="bg-[#86C232] p-2 rounded-lg"><GraduationCap className="text-[#0A4D68]" size={24} /></div>
          <span className="text-xl font-bold tracking-tight text-white italic">Careergize</span>
        </div>
        <nav className="space-y-2 flex-1">
          <SidebarItem icon={<LayoutGrid size={20}/>} label="Overview" />
          <SidebarItem icon={<Users size={20}/>} label="Students" active={true} />
        </nav>
        <div className="mt-auto pt-6 border-t border-white/10">
          <SidebarItem icon={<LogOut size={20} />} label="Logout" onClick={() => {localStorage.clear(); router.push('/login')}} />
        </div>
      </aside>

      <main className="lg:ml-64 p-4 md:p-8 lg:p-12">
        <header className="flex flex-col md:flex-row justify-between items-start gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-black text-[#0A4D68]">Student <span className="text-[#86C232]">Database</span></h1>
            <p className="text-slate-500 text-sm font-semibold mt-1">Direct Sheet Sync • {students.length} Records</p>
          </div>
          <Button onClick={fetchData} variant="outline" className="h-12 bg-white rounded-xl border-slate-300 gap-2 font-bold text-[#0A4D68]">
            <RefreshCw size={16} className={refreshing ? 'animate-spin' : ''} /> Refresh Sync
          </Button>
        </header>

        <div className="relative mb-8">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" placeholder="Search by name, email or track..."
            className="w-full h-16 pl-14 pr-6 bg-white border-2 border-slate-100 rounded-2xl focus:border-[#86C232] outline-none font-bold shadow-sm"
            value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Card className="rounded-3xl border-none shadow-xl bg-white overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-8 py-5 text-[11px] font-black uppercase text-black">Candidate</th>
                  <th className="px-8 py-5 text-[11px] font-black uppercase text-black">Specialization</th>
                    <th className="px-8 py-5 text-[11px] font-black uppercase text-black text-right">Status</th>
                  <th className="px-8 py-5 text-[11px] font-black uppercase text-black text-right">Task</th>
                 
                  <th className="px-8 py-5 text-[11px] font-black uppercase text-black text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map((s, i) => (
                  <tr key={i} className="hover:bg-slate-50/80 transition-all">
                    <td className="px-8 py-6">
                      <p className="font-bold text-black text-[15px]">{s.fullName}</p>
                      <p className="text-[11px] font-bold text-slate-400">{s.email}</p>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-[10px] font-black bg-[#86C232] text-black px-2.5 py-1 rounded-md uppercase">{s.track || 'General'}</span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <p className={`text-[11px] font-bold ${s.status === 'Active' ? 'text-green-500' : 'text-red-500'}`}>{s.status}</p>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <Button 
                        onClick={() => { setSelectedStudent(s); setDrawerMode('task'); setIsDrawerOpen(true); }}
                        className="bg-[#0A4D68] hover:bg-black text-[#86C232] text-[10px] font-black h-9 rounded-lg"
                      >
                        <PlusCircle size={14} className="mr-2" /> Assign Task
                      </Button>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => { setSelectedStudent(s); setDrawerMode('edit'); setIsDrawerOpen(true); }} className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg"><Edit3 size={18}/></button>
                        <button onClick={() => { setSelectedStudent(s); setIsDeleteModalOpen(true); }} className="p-2 hover:bg-red-50 text-red-500 rounded-lg"><Trash2 size={18}/></button>
                      </div>
                    </td>
                  </tr>
                ))}
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
                <h2 className="text-2xl font-black text-[#0A4D68]">{drawerMode === 'task' ? 'Task Deployment' : 'Edit Profile'}</h2>
                <button onClick={() => setIsDrawerOpen(false)} className="p-2 hover:bg-slate-100 rounded-full"><X /></button>
              </div>

              <div className="space-y-6">
                {drawerMode === 'task' ? (
                  <>
                    {/* DROP DOWN FOR STUDENT NAMES */}
                    <div>
                      <label className="text-[11px] font-black uppercase text-black mb-2 block tracking-widest flex items-center gap-2">
                        <UserCheck size={14} className="text-[#86C232]"/> Selected Student
                      </label>
                      <select 
                        value={selectedStudent?.email || ''}
                        onChange={(e) => {
                          const student = students.find(s => s.email === e.target.value);
                          setSelectedStudent(student);
                        }}
                        className="w-full h-12 border-2 border-slate-100 rounded-xl px-4 font-bold text-black focus:border-[#86C232] outline-none bg-white"
                      >
                        <option value="" disabled>Select a student...</option>
                        {students.map((s, idx) => (
                          <option key={idx} value={s.email}>{s.fullName}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] font-black uppercase text-black mb-2 block flex items-center gap-2">
                        <FileText size={14} className="text-[#86C232]"/> Task Title
                      </label>
                      <input 
                        type="text" value={taskData.title}
                        onChange={(e) => setTaskData({...taskData, title: e.target.value})}
                        className="w-full h-12 border-2 border-slate-100 rounded-xl px-4 font-bold text-black" 
                        placeholder="e.g. Core Java Assessment"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[11px] font-black text-black mb-2 block uppercase">Start Date</label>
                        <input type="date" value={taskData.startDate} onChange={(e) => setTaskData({...taskData, startDate: e.target.value})} className="w-full h-12 border-2 border-slate-100 rounded-xl px-4 font-bold" />
                      </div>
                      <div>
                        <label className="text-[11px] font-black text-black mb-2 block uppercase">End Date</label>
                        <input type="date" value={taskData.endDate} onChange={(e) => setTaskData({...taskData, endDate: e.target.value})} className="w-full h-12 border-2 border-slate-100 rounded-xl px-4 font-bold" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[11px] font-black text-black mb-2 block uppercase">Category</label>
                        <select value={taskData.category} onChange={(e) => setTaskData({...taskData, category: e.target.value})} className="w-full h-12 border-2 border-slate-100 rounded-xl px-4 font-bold bg-white">
                          <option>General</option>
                          <option>Technical</option>
                          <option>Marketing</option>
                          <option>Admin</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[11px] font-black text-black mb-2 block uppercase">Priority</label>
                        <select value={taskData.priority} onChange={(e) => setTaskData({...taskData, priority: e.target.value})} className="w-full h-12 border-2 border-slate-100 rounded-xl px-4 font-bold bg-white">
                          <option>Low</option>
                          <option>Medium</option>
                          <option>High</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-black text-black mb-2 block uppercase">Instructions</label>
                      <textarea rows={4} value={taskData.instructions} onChange={(e) => setTaskData({...taskData, instructions: e.target.value})} className="w-full border-2 border-slate-100 rounded-xl p-4 font-bold" placeholder="Mention task details..." />
                    </div>
                  </>
                ) : (
                  <div className="space-y-4">
                    <p className="text-slate-500 font-bold italic">Update details for: {selectedStudent?.fullName}</p>
                    <input type="text" defaultValue={selectedStudent?.fullName} className="w-full h-12 border-2 border-slate-100 rounded-xl px-4" />
                    <input type="text" defaultValue={selectedStudent?.track} className="w-full h-12 border-2 border-slate-100 rounded-xl px-4" />
                  </div>
                )}

                <Button 
                  onClick={drawerMode === 'task' ? handleDeployTask : undefined}
                  disabled={refreshing}
                  className="w-full h-14 font-black uppercase tracking-widest rounded-2xl bg-[#0A4D68] text-[#86C232] hover:bg-black"
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
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsDeleteModalOpen(false)} className="fixed inset-0 bg-[#0A4D68]/80 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-white w-full max-w-sm rounded-3xl p-10 text-center shadow-2xl">
              <AlertTriangle className="text-red-500 mx-auto mb-4" size={48} />
              <h3 className="text-xl font-black mb-2 text-[#0A4D68]">Delete Record?</h3>
              <p className="text-slate-500 mb-6">Remove <span className="font-bold text-black">{selectedStudent?.fullName}</span> from the database?</p>
              <div className="flex flex-col gap-2">
                <Button onClick={confirmDelete} className="bg-red-500 hover:bg-red-600 text-white h-12 rounded-xl font-bold">Delete Student</Button>
                <Button onClick={() => setIsDeleteModalOpen(false)} variant="ghost" className="h-12 font-bold text-slate-400">Cancel</Button>
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
    <div onClick={onClick} className={`flex items-center gap-4 px-4 py-3.5 rounded-xl cursor-pointer transition-all ${active ? 'bg-[#86C232] text-[#0A4D68] font-bold' : 'text-white/60 hover:bg-white/10 hover:text-white'}`}>
      <span>{icon}</span>
      <span className="text-sm">{label}</span>
    </div>
  )
}