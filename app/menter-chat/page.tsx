'use client'

import React from 'react'
import { GraduationCap, LayoutGrid, FileText, CheckSquare, MessageSquare, Award, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function MentorChatPage() {
  const WHATSAPP_LINK = "https://chat.whatsapp.com/H96yVCHXXVpJMhxl7qvqgl?mode=gi_t";

  return (
    <div className="flex h-screen bg-[#F8FAFC]">
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#0A4D68] text-white p-6 hidden lg:flex flex-col">
        <div className="flex items-center gap-3 mb-10">
          <div className="bg-[#86C232] p-2 rounded-lg"><GraduationCap className="text-[#0A4D68]" size={24} /></div>
          <span className="text-xl font-bold">Careergize</span>
        </div>
        <nav className="space-y-2 flex-1 mt-8 lg:mt-0">
          <Link href="/dashboard"><SidebarItem icon={<LayoutGrid size={20} />} label="My Workspace" /></Link>
          <Link href="/dashboard/notes"><SidebarItem icon={<FileText size={20} />} label="Learning Notes" /></Link>
          <Link href="/dashboard/interntask"><SidebarItem icon={<CheckSquare size={20} />} label="Tasks & Projects"  /></Link>
         <Link href='/menter-chat/'><SidebarItem icon={<MessageSquare size={20} />} label="Mentor Chat" /></Link>
          <SidebarItem icon={<Award size={20} />} label="Final Certification" />
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 bg-[#F1F5F9]/30">
        <div className="max-w-2xl w-full bg-white rounded-[2.5rem] p-10 shadow-xl shadow-slate-200 text-center relative overflow-hidden border border-slate-100">
          {/* Decorative Background Blob */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#25D366]/5 rounded-full blur-3xl -mr-32 -mt-32" />
          
          {/* WhatsApp Icon Wrapper */}
          <div className="relative z-10 w-24 h-24 bg-[#25D366] rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-lg shadow-[#25D366]/20 rotate-3 hover:rotate-0 transition-transform duration-500">
             <svg 
               viewBox="0 0 24 24" 
               className="w-12 h-12 fill-white"
               xmlns="http://www.w3.org/2000/svg"
             >
               <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
             </svg>
          </div>

          <div className="relative z-10">
            <h1 className="text-3xl font-black text-[#0A4D68] mb-4">Careergize Mentor Group</h1>
            <p className="text-slate-500 mb-8 max-w-md mx-auto leading-relaxed">
              We've moved our official communication to WhatsApp for faster responses and community networking.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 text-left">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Response Time</p>
                <p className="text-sm font-bold text-[#0A4D68]">Under 15 Minutes</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Availability</p>
                <p className="text-sm font-bold text-[#0A4D68]">Mon - Sat (9am - 7pm)</p>
              </div>
            </div>

            <Button 
              onClick={() => window.open(WHATSAPP_LINK, "_blank")}
              className="w-full bg-[#25D366] hover:bg-[#1ebd58] text-white rounded-2xl h-16 font-black text-lg shadow-xl shadow-[#25D366]/20 group transition-all"
            >
              Open WhatsApp Group
              <ExternalLink className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={20} />
            </Button>

            <p className="mt-6 text-[10px] text-slate-400 font-medium">
              By joining, you agree to our Community Guidelines and Privacy Policy.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

function SidebarItem({ icon, label, active }: any) {
  return (
    <div className={`flex items-center gap-4 px-4 py-3.5 rounded-xl cursor-pointer transition-all duration-200 ${
      active 
        ? 'bg-[#86C232] text-[#0A4D68] font-bold shadow-lg shadow-[#86C232]/10' 
        : 'text-white/60 hover:bg-white/10 hover:text-white'
    }`}>
      {icon} <span className="text-sm">{label}</span>
    </div>
  )
}