'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Loader2, Search, Mail, ShieldCheck, 
  Trash2, RefreshCw, Menu, Users, 
  LogOut, CheckCircle2, AlertCircle, X, 
  ChevronRight, GraduationCap, LayoutGrid, MessageSquare 
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzqhwDibiH-W2UO4gjR2qsCH0vK632WcfqXAeDFNWbRJgR6TvXH1TanWGQ92jZOtJ5M/exec'

export default function RegisteredUsers() {
  const router = useRouter()
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [filterStatus, setFilterStatus] = useState('All')
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error'} | null>(null)

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 4000)
  }

  const fetchUsers = async () => {
    setIsRefreshing(true)
    try {
      const res = await fetch(`${SCRIPT_URL}?action=getUsers&t=${Date.now()}`)
      const data = await res.json()
      setUsers(Array.isArray(data) ? data : [])
    } catch (err) {
      showToast("Failed to sync with Google Sheets", "error")
      setUsers([]) 
    } finally {
      setLoading(false)
      setIsRefreshing(false)
    }
  }

  useEffect(() => { fetchUsers() }, [])

  const handleStatusChange = async (email: string, newStatus: string) => {
    const originalUsers = [...users]
    setUsers(prev => prev.map(u => u.email === email ? { ...u, status: newStatus } : u))
    try {
      await fetch(`${SCRIPT_URL}?action=updateStatus&email=${encodeURIComponent(email)}&status=${newStatus}`, {
        method: 'GET',
        mode: 'no-cors',
        cache: 'no-cache'
      })
      showToast(`Status updated successfully`)
    } catch (err) {
      showToast("Sync Error", "error")
      setUsers(originalUsers)
    }
  }

  const deleteUser = async (email: string) => {
    if(!confirm(`Permanently delete ${email}?`)) return
    const originalUsers = [...users]
    setUsers(prev => prev.filter(u => u.email !== email))
    try {
      await fetch(`${SCRIPT_URL}?action=deleteUser&email=${encodeURIComponent(email)}`, {
        method: 'GET',
        mode: 'no-cors'
      })
      showToast("User removed")
    } catch (err) {
      showToast("Delete failed", "error")
      setUsers(originalUsers)
    }
  }

  const filteredUsers = users.filter(u => {
    const matchesSearch = (u.name || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (u.email || '').toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'All' || u.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const stats = {
    total: users.length,
    approved: users.filter(u => u.status === 'Approved').length,
    pending: users.filter(u => u.status === 'Pending').length
  }

  if (loading) return (
    <div className="h-screen bg-slate-50 flex flex-col items-center justify-center">
      <Loader2 className="animate-spin text-[#86C232]" size={40} />
      <p className="text-[#0A4D68] font-bold text-[10px] tracking-widest mt-4 uppercase">Loading Database</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans overflow-x-hidden">
      {/* --- TOAST --- */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className={`fixed bottom-6 right-6 z-[100] flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border ${
              toast.type === 'success' ? 'bg-[#0A4D68] text-white border-[#86C232]' : 'bg-red-600 text-white border-red-400'
            }`}
          >
            {toast.type === 'success' ? <CheckCircle2 size={18} className="text-[#86C232]" /> : <AlertCircle size={18} />}
            <span className="text-sm font-bold">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

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
          <SidebarItem icon={<LayoutGrid size={20}/>} label="Overview" active />
           <Link href="/dashboard/admin/users"><SidebarItem icon={<Users size={20}/>} label="Registred Users" /></Link>
          <Link href="/dashboard/admin/students"><SidebarItem icon={<Users size={20}/>} label="Students" /></Link>
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
            <h2 className="text-[#0A4D68] font-black text-lg tracking-tight uppercase">Database Management</h2>
          </div>
          
          <div className="flex items-center gap-3">
             <button onClick={fetchUsers} disabled={isRefreshing} className="p-2.5 rounded-xl border border-slate-200 text-[#0A4D68] hover:border-[#86C232] transition-all bg-white shadow-sm">
               <RefreshCw size={18} className={isRefreshing ? 'animate-spin' : ''} />
             </button>
             <div className="w-10 h-10 rounded-xl bg-[#0A4D68] flex items-center justify-center font-bold text-[#86C232] text-xs">AD</div>
          </div>
        </header>

        <div className="p-6 md:p-10 max-w-6xl mx-auto w-full">
          {/* STATS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {[
              { label: 'Total Users', val: stats.total, color: 'bg-white text-[#0A4D68]' },
              { label: 'Approved', val: stats.approved, color: 'bg-[#86C232] text-[#0A4D68]' },
              { label: 'Pending', val: stats.pending, color: 'bg-white text-orange-500 border-orange-100' }
            ].map((s, i) => (
              <div key={i} className={`p-6 rounded-3xl shadow-sm border border-slate-100 ${s.color}`}>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">{s.label}</p>
                <p className="text-3xl font-black">{s.val}</p>
              </div>
            ))}
          </div>

          {/* SEARCH & FILTER */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search database..."
                className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border border-slate-200 focus:border-[#86C232] outline-none transition-all text-sm font-medium shadow-sm"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
              {['All', 'Approved', 'Pending'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${filterStatus === status ? 'bg-[#0A4D68] text-white' : 'text-slate-400 hover:text-[#0A4D68]'}`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* TABLE/GRID */}
          <div className="space-y-3">
            <AnimatePresence mode='popLayout'>
              {filteredUsers.map((user, idx) => (
                <motion.div 
                  layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98 }}
                  key={user.email}
                >
                  <Card className="p-4 md:p-5 border-none shadow-sm hover:shadow-md transition-all bg-white rounded-2xl border-l-4 border-transparent hover:border-l-[#86C232] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    
                    <div className="flex items-center gap-4">
                      <div className={`h-12 w-12 rounded-xl flex items-center justify-center font-bold text-lg ${user.status === 'Approved' ? 'bg-[#86C232]/10 text-[#86C232]' : 'bg-slate-100 text-slate-400'}`}>
                        {user.name ? user.name.charAt(0).toUpperCase() : '?'}
                      </div>
                      <div>
                        <h3 className="font-bold text-[#0A4D68] text-base leading-tight">{user.name || 'User'}</h3>
                        <p className="text-xs text-slate-400 font-medium">{user.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between w-full md:w-auto gap-4 md:gap-8">
                      <div className="relative min-w-[140px]">
                         <select 
                           value={user.status}
                           onChange={(e) => handleStatusChange(user.email, e.target.value)}
                           className={`w-full pl-4 pr-10 py-2.5 text-[10px] font-bold rounded-xl border-2 outline-none appearance-none cursor-pointer ${
                             user.status === 'Approved' ? 'bg-green-50 border-green-100 text-green-700' : 'bg-amber-50 border-amber-100 text-amber-700'
                           }`}
                         >
                           <option value="Approved">Approved</option>
                           <option value="Pending">Pending</option>
                         </select>
                         <ChevronRight size={14} className="absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-slate-400 pointer-events-none" />
                      </div>

                      <button onClick={() => deleteUser(user.email)} className="p-2.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
            {filteredUsers.length === 0 && (
              <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
                <Users className="mx-auto text-slate-200 mb-4" size={48} />
                <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">No matching records found</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

function SidebarItem({ icon, label, active, onClick }: any) {
  return (
    <div onClick={onClick} className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${active ? 'bg-[#86C232] text-[#0A4D68] font-bold shadow-lg' : 'text-white/60 hover:text-white hover:bg-white/5'}`}>
      {icon} <span className="text-sm">{label}</span>
    </div>
  )
}