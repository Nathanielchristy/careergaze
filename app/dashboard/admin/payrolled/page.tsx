'use client'

import React, { useState, useEffect, useMemo } from 'react'
import {
  LayoutGrid,
  GraduationCap,
  Layers,
  RefreshCw,
  Loader2,
  Users,
  ChevronDown,
  Banknote,
  MessageSquare 
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

/* ✅ YOUR REAL WORKING URLS */
const SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbxCxoa1SnNeZtptdCuaAVLfGd3YGppx7jHoIigs6aaVLXgTbAfvdYMSyOJ2nsv92fM/exec'

const SCRIPT_URL_TWO =
  'https://script.google.com/macros/s/AKfycbwfikop7AY4_J4Ip42UWYZytOt3RWFSsquuyKBfpgayUDOVdhD7oqfCYCem86qpb3CZpg/exec'

export default function PayrollPage() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState('All')
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  /* ✅ SAFE FETCH (WILL NOT CRASH IF HTML RETURNS) */
  const safeFetch = async (url: string) => {
    const res = await fetch(`${url}?t=${Date.now()}`)
    const text = await res.text()

    try {
      return JSON.parse(text)
    } catch (err) {
      console.error('Invalid JSON response from:', url)
      console.error(text)
      return { students: [] }
    }
  }

  const fetchAndMergeData = async () => {
    setLoading(true)

    try {
      const [result1, result2] = await Promise.all([
        safeFetch(SCRIPT_URL),
        safeFetch(SCRIPT_URL_TWO)
      ])

      const merged = (result1.students || []).map((student: any) => {
        const pay = (result2.students || []).find((p: any) =>
          (p.email || p.emailAddress || '')
            .toLowerCase()
            .trim() ===
          (student.emailAddress || student.email || '')
            .toLowerCase()
            .trim()
        )

        return {
          ...student,
          transactionId: pay?.transactionId || 'N/A',
          status: pay?.status || 'Pending',
          amount: pay?.amount || '0'
        }
      })

      setData(merged)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAndMergeData()
  }, [])

  const handleStatusChange = async (
    email: string,
    newStatus: string
  ) => {
    setUpdatingId(email)

    setData(prev =>
      prev.map(item =>
        (item.emailAddress || item.email) === email
          ? { ...item, status: newStatus }
          : item
      )
    )

    await fetch(SCRIPT_URL_TWO, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, status: newStatus })
    })

    setTimeout(fetchAndMergeData, 1500)
    setUpdatingId(null)
  }

  const filteredData = useMemo(() => {
    return data.filter(student => {
      const matchesTab =
        activeTab === 'All' || student.status === activeTab

      const matchesSearch =
        student.fullName
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (student.emailAddress || student.email)
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase())

      return matchesTab && matchesSearch
    })
  }, [data, activeTab, searchTerm])

  const totalRevenue = useMemo(() => {
    return data
      .filter(d => d.status === 'Approved')
      .reduce(
        (acc, cur) => acc + Number(cur.amount || 0),
        0
      )
  }, [data])

  return (
    <div className="flex h-screen bg-slate-100">

      {/* SIDEBAR */}
      <aside className="hidden lg:flex w-64 bg-[#0A4D68] text-white flex-col px-6 py-8 shrink-0">
        <div className="flex items-center gap-3 mb-12">
          <div className="bg-[#86C232] p-3 rounded-xl text-[#0A4D68]">
            <GraduationCap size={22} />
          </div>
          <span className="text-lg font-bold">
            Careergize
          </span>
        </div>

       <nav className="space-y-2 flex-1">
          <Link href="/dashboard/admin"><SidebarItem icon={<LayoutGrid size={20}/>} label="Overview" /></Link>
          <Link href="/dashboard/admin/users"><SidebarItem icon={<Users size={20}/>} label="Registered Users" /></Link>
          <Link href="/dashboard/admin/students"><SidebarItem icon={<Users size={20}/>} label="Students"/></Link>
          <Link href="/dashboard/admin/payrolled">
           <SidebarItem icon={<Banknote size={20}/>} label="Student Payrolled" />
          </Link>
          <Link href="/dashboard/admin/Tasks"><SidebarItem icon={<Users size={20}/>} label="Tasks" /></Link>
          <SidebarItem icon={<MessageSquare size={20}/>} label="Chat with Team" />
        </nav>

      </aside>

      {/* MAIN */}
      <main className="flex-1 flex flex-col overflow-hidden">

        {/* HEADER */}
        <header className="h-20 bg-white border-b flex items-center justify-between px-10">
          <h1 className="text-xl font-bold text-[#0A4D68]">
            Payroll <span className="text-[#86C232]">Management</span>
          </h1>

          <Button
            onClick={fetchAndMergeData}
            variant="outline"
            className="rounded-lg"
          >
            <RefreshCw
              size={16}
              className={loading ? 'animate-spin' : ''}
            />
          </Button>
        </header>

        <div className="flex-1 overflow-y-auto p-10 space-y-8">

          {/* STATS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard label="Total Students" value={data.length} />
            <StatCard label="Approved" value={data.filter(d => d.status === 'Approved').length} />
            <StatCard label="Revenue" value={`₹${totalRevenue}`} highlight />
          </div>

          {/* FILTERS */}
          <div className="flex flex-col md:flex-row justify-between gap-5">
            <div className="flex gap-3">
              {['All', 'Pending', 'Verifying Transaction', 'Approved'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold ${
                    activeTab === tab
                      ? 'bg-[#0A4D68] text-white'
                      : 'bg-white border border-slate-200 text-slate-500'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <Input
              placeholder="Search..."
              className="md:w-72 rounded-lg bg-white"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>

          {/* TABLE */}
          <Card className="rounded-2xl border border-slate-200 shadow-lg bg-white overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">

                <thead className="bg-slate-50 text-slate-500 uppercase text-xs">
                  <tr>
                    <th className="px-8 py-4 text-left w-[30%]">Student</th>
                    <th className="px-8 py-4 text-left w-[20%]">Track</th>
                    <th className="px-8 py-4 text-left w-[25%]">Payment</th>
                    <th className="px-8 py-4 text-right w-[25%]">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={4} className="py-16 text-center">
                        <Loader2 className="animate-spin mx-auto text-[#86C232]" />
                      </td>
                    </tr>
                  ) : filteredData.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-16 text-center text-slate-400">
                        No data found
                      </td>
                    </tr>
                  ) : (
                    filteredData.map((student, idx) => (
                      <tr key={idx} className="border-t hover:bg-slate-50">

                        <td className="px-8 py-5">
                          <div className="font-semibold text-[#0A4D68]">
                            {student.fullName}
                          </div>
                          <div className="text-xs text-slate-400">
                            {student.emailAddress || student.email}
                          </div>
                        </td>

                        <td className="px-8 py-5">
                          {student.internshipTrack || 'General'}
                        </td>

                        <td className="px-8 py-5">
                          <div className="font-semibold">
                            ₹{student.amount}
                          </div>
                          <div className="text-xs text-slate-400">
                            {student.transactionId}
                          </div>
                        </td>

                        <td className="px-8 py-5 text-right">
                          {updatingId === (student.emailAddress || student.email)
                            ? <Loader2 className="animate-spin ml-auto text-[#86C232]" size={18} />
                            : <StatusDropdown student={student} onStatusChange={handleStatusChange} />
                          }
                        </td>

                      </tr>
                    ))
                  )}
                </tbody>

              </table>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}

/* COMPONENTS */

function StatCard({ label, value, highlight }: any) {
  return (
    <Card className={`p-6 rounded-xl ${
      highlight
        ? 'bg-[#0A4D68] text-white'
        : 'bg-white border border-slate-200'
    }`}>
      <p className="text-xs uppercase text-slate-400">{label}</p>
      <h2 className="text-2xl font-bold mt-2">{value}</h2>
    </Card>
  )
}

function StatusDropdown({ student, onStatusChange }: any) {
  const styles: any = {
    Pending: 'bg-orange-100 text-orange-600',
    'Verifying Transaction': 'bg-blue-100 text-blue-600',
    Approved: 'bg-green-100 text-green-600'
  }

  return (
    <div className="relative w-44 ml-auto">
      <select
        value={student.status}
        onChange={(e) =>
          onStatusChange(student.emailAddress || student.email, e.target.value)
        }
        className={`appearance-none w-full px-4 py-2 rounded-lg text-xs font-semibold border-none ${styles[student.status]}`}
      >
        <option value="Pending">Pending</option>
        <option value="Verifying Transaction">Verifying Transaction</option>
        <option value="Approved">Approved</option>
      </select>

      <ChevronDown
        size={14}
        className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-50"
      />
    </div>
  )
}

function SidebarItem({ icon, label, active }: any) {
  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
      active
        ? 'bg-[#86C232] text-[#0A4D68] font-semibold'
        : 'text-white/70 hover:bg-white/10 hover:text-white'
    }`}>
      {icon}
      <span className="text-sm">{label}</span>
    </div>
  )
}
