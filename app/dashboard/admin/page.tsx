'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Clock, CheckCircle2, Loader2, RefreshCw, User, Mail, Calendar } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwqpmcrYXG_bLhg_LBdHG9P5T0jbMp7d9TeFFZP_skP7VXjWo08pTRKeb_C-Pi6BkPe/exec'

export default function TaskConsole() {
  const [tasks, setTasks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const fetchTasks = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${SCRIPT_URL}?t=${Date.now()}`)
      const data = await res.json()
      setTasks(data.tasks || [])
    } catch (err) {
      console.error("Error fetching tasks:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchTasks() }, [])

  const filteredTasks = tasks.filter(t => {
    const matchesSearch = t.studentEmail?.toLowerCase().includes(search.toLowerCase()) || 
                          t.studentName?.toLowerCase().includes(search.toLowerCase());
    const matchesTab = filter === 'all' ? true : t.status?.toLowerCase() === filter.toLowerCase();
    return matchesSearch && matchesTab;
  })

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC]">
      <Loader2 className="animate-spin text-[#0A4D68] mb-4" size={40} />
      <p className="text-[#0A4D68] font-bold text-xs tracking-widest uppercase opacity-60">Fetching Task Assignments...</p>
    </div>
  )

  return (
    <div className="p-4 md:p-10 lg:p-16 bg-[#F8FAFC] min-h-screen">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-[#0A4D68]">Task <span className="text-[#86C232]">Management</span></h1>
            <div className="flex items-center gap-2 mt-2">
               <span className="h-2 w-2 rounded-full bg-[#86C232] animate-pulse" />
               <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">Live from Google Sheets</p>
            </div>
          </div>
          <Button onClick={fetchTasks} className="bg-[#0A4D68] hover:bg-[#0d5a7a] rounded-2xl px-8 h-12 font-bold shadow-lg transition-all active:scale-95">
            <RefreshCw size={18} className="mr-2" /> Sync Data
          </Button>
        </header>

        {/* SEARCH & FILTERS */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Search by student name or email..."
              className="w-full h-14 pl-12 pr-4 bg-white border-none shadow-sm rounded-2xl focus:ring-2 focus:ring-[#86C232] outline-none font-medium text-[#0A4D68]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex bg-slate-200/50 p-1.5 rounded-2xl">
            {['all', 'pending', 'completed'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-6 py-2.5 rounded-xl text-[11px] font-black uppercase transition-all ${filter === tab ? 'bg-white text-[#0A4D68] shadow-md' : 'text-slate-500 hover:text-[#0A4D68]'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* TASK CARDS */}
        <div className="grid gap-4">
          {filteredTasks.map((task, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
              <Card className="p-6 border-none shadow-sm rounded-[2.5rem] bg-white hover:shadow-md transition-all group">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                  
                  {/* Student Detail */}
                  <div className="flex items-center gap-4 min-w-[280px]">
                    <div className="bg-[#0A4D68] p-4 rounded-[1.5rem] text-[#86C232] group-hover:scale-110 transition-transform">
                      <User size={24}/>
                    </div>
                    <div>
                      <h3 className="font-black text-[#0A4D68] text-lg">{task.studentName || "Unknown Student"}</h3>
                      <p className="text-xs text-slate-400 font-bold flex items-center gap-1"><Mail size={12}/> {task.studentEmail}</p>
                    </div>
                  </div>

                  {/* Task Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 bg-slate-100 text-slate-500 rounded-md">{task.category}</span>
                      <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${task.priority === 'High' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>{task.priority}</span>
                    </div>
                    <h4 className="font-bold text-[#0A4D68] text-base">{task.taskTitle}</h4>
                    <p className="text-slate-400 text-sm line-clamp-1">{task.instructions}</p>
                  </div>

                  {/* Status & Deadline */}
                  <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between w-full lg:w-auto gap-4 border-t lg:border-t-0 pt-4 lg:pt-0">
                    <div className={`px-4 py-2 rounded-2xl font-black text-[10px] uppercase flex items-center gap-2 ${
                      task.status === 'completed' ? 'bg-[#86C232]/10 text-[#86C232]' : 'bg-orange-100 text-orange-600'
                    }`}>
                      {task.status === 'completed' ? <CheckCircle2 size={14}/> : <Clock size={14}/>}
                      {task.status}
                    </div>
                    <div className="text-right">
                       <p className="text-[9px] font-bold text-slate-300 uppercase">Deadline</p>
                       <p className="text-xs font-black text-[#0A4D68] flex items-center gap-1"><Calendar size={12}/> {task.endDate || 'N/A'}</p>
                    </div>
                  </div>

                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}