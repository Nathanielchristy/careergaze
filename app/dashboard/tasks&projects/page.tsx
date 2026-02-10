'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  CheckSquare, Clock, AlertCircle, Plus, 
  Paperclip, Send, ChevronRight, Layout,
  MoreVertical, Target, Flag
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

/* =====================
   MOCK DATA
===================== */
const PROJECTS = [
  {
    id: 'p1',
    title: 'E-Commerce Dashboard',
    description: 'Build a responsive admin panel using Next.js and Tailwind CSS.',
    status: 'In Progress',
    progress: 65,
    priority: 'High',
    deadline: 'Oct 28'
  },
  {
    id: 'p2',
    title: 'API Integration',
    description: 'Connect the frontend to the secure Stripe payment gateway.',
    status: 'Todo',
    progress: 0,
    priority: 'Medium',
    deadline: 'Nov 05'
  },
  {
    id: 'p3',
    title: 'Auth System',
    description: 'Implement Role-Based Access Control (RBAC) with NextAuth.',
    status: 'Completed',
    progress: 100,
    priority: 'High',
    deadline: 'Oct 15'
  }
]

export default function TasksProjectsPage() {
  const [selectedProject, setSelectedProject] = useState(PROJECTS[0])

  return (
    <div className="space-y-8">
      {/* HEADER SECTION */}
      <header className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-4xl font-black text-[#0A4D68]">Tasks & Projects</h1>
          <p className="text-slate-500 mt-2">Manage your deliverables and track project milestones.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl border-slate-200 bg-white">
            <Flag size={18} className="mr-2 text-red-500" /> View Roadmap
          </Button>
          <Button className="bg-[#86C232] text-[#0A4D68] font-bold rounded-xl shadow-lg shadow-[#86C232]/20">
            <Plus size={18} className="mr-2" /> New Request
          </Button>
        </div>
      </header>

      {/* PROJECT SUMMARY BAR */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Active Projects" value="2" sub="Working now" color="bg-blue-500" />
        <StatCard title="Completed" value="8" sub="Total finished" color="bg-green-500" />
        <StatCard title="Upcoming" value="3" sub="Next in queue" color="bg-amber-500" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* LEFT: PROJECT LIST (8 Cols) */}
        <div className="xl:col-col-span-8 space-y-6 xl:col-span-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Layout size={20} className="text-[#86C232]" /> Current Board
            </h2>
          </div>

          <div className="space-y-4">
            {PROJECTS.map((project) => (
              <motion.div 
                key={project.id}
                whileHover={{ x: 5 }}
                onClick={() => setSelectedProject(project)}
              >
                <Card className={`p-6 border-none shadow-sm cursor-pointer transition-all ${
                  selectedProject.id === project.id ? 'ring-2 ring-[#86C232] bg-white' : 'bg-white/50'
                }`}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          project.priority === 'High' ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {project.priority} Priority
                        </span>
                        <span className="text-xs text-slate-400 font-medium">Deadline: {project.deadline}</span>
                      </div>
                      <h3 className="text-lg font-bold">{project.title}</h3>
                      <p className="text-sm text-slate-500 line-clamp-1">{project.description}</p>
                    </div>
                    
                    <div className="w-full md:w-48">
                       <div className="flex justify-between text-xs font-bold mb-2">
                         <span>Progress</span>
                         <span>{project.progress}%</span>
                       </div>
                       <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-[#86C232] transition-all duration-700" 
                            style={{ width: `${project.progress}%` }} 
                          />
                       </div>
                    </div>
                    <ChevronRight className="text-slate-300 hidden md:block" />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* RIGHT: SUBMISSION & DETAILS (4 Cols) */}
        <div className="xl:col-span-4">
          <Card className="p-8 border-none shadow-xl bg-[#0A4D68] text-white rounded-[2.5rem] sticky top-8">
            <h2 className="text-2xl font-bold mb-2">Submit Work</h2>
            <p className="text-white/60 text-sm mb-8">Upload your progress for {selectedProject.title}.</p>
            
            <div className="space-y-6">
              <div className="p-6 border-2 border-dashed border-white/20 rounded-2xl flex flex-col items-center justify-center text-center hover:bg-white/5 transition-colors cursor-pointer">
                <Paperclip className="text-[#86C232] mb-2" />
                <p className="text-xs font-medium">Attach files or drop screenshots</p>
                <p className="text-[10px] text-white/40 mt-1">PDF, ZIP, PNG (Max 10MB)</p>
              </div>

              <div>
                <label className="text-xs font-bold text-white/60 uppercase block mb-2">Submission Link</label>
                <input 
                  type="text" 
                  placeholder="GitHub or Figma URL"
                  className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 ring-[#86C232]"
                />
              </div>

              <Button className="w-full bg-[#86C232] text-[#0A4D68] font-bold py-6 rounded-2xl hover:scale-[1.02] transition-transform">
                <Send size={18} className="mr-2" /> Submit Project
              </Button>

              <div className="pt-6 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <AlertCircle size={16} className="text-amber-400" />
                  <p className="text-[11px] text-white/60">
                    Need help? Contact your mentor before the {selectedProject.deadline} deadline.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

/* =====================
   SUB-COMPONENTS
===================== */

function StatCard({ title, value, sub, color }: any) {
  return (
    <Card className="p-6 border-none shadow-sm bg-white rounded-2xl relative overflow-hidden">
      <div className={`absolute left-0 top-0 h-full w-1.5 ${color}`} />
      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{title}</p>
      <div className="flex items-baseline gap-2 mt-1">
        <h3 className="text-3xl font-black text-[#0A4D68]">{value}</h3>
        <span className="text-xs text-slate-400 font-medium">{sub}</span>
      </div>
    </Card>
  )
}