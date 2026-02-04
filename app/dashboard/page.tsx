'use client'

import React, { useEffect, useMemo, useReducer, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Users, Search, RefreshCw, Sparkles, GraduationCap,
  ArrowRight, LayoutGrid, List, ShieldCheck, AlertCircle
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

/* =====================
   TYPES
===================== */

type User = {
  id?: string
  name?: string
  email?: string
  status?: 'verified' | 'pending' | 'blocked'
}

type State = {
  users: User[]
  isLoading: boolean
  error: string | null
  search: string
  view: 'table' | 'grid'
}

type Action =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: User[] }
  | { type: 'FETCH_ERROR'; payload: string }
  | { type: 'SET_SEARCH'; payload: string }
  | { type: 'SET_VIEW'; payload: 'table' | 'grid' }

/* =====================
   REDUCER
===================== */

const initialState: State = {
  users: [],
  isLoading: true,
  error: null,
  search: '',
  view: 'table'
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, isLoading: true, error: null }
    case 'FETCH_SUCCESS':
      return { ...state, isLoading: false, users: action.payload }
    case 'FETCH_ERROR':
      return { ...state, isLoading: false, error: action.payload }
    case 'SET_SEARCH':
      return { ...state, search: action.payload }
    case 'SET_VIEW':
      return { ...state, view: action.payload }
    default:
      return state
  }
}

/* =====================
   MAIN COMPONENT
===================== */

export default function CareergizeDashboardAdvanced() {
  const [state, dispatch] = useReducer(reducer, initialState)

  const fetchUsers = useCallback(async () => {
    dispatch({ type: 'FETCH_START' })
    try {
      const res = await fetch('/api/users', { cache: 'no-store' })
      const data = await res.json()

      if (data?.error === 'ACCESS_DENIED') {
        throw new Error('Google Access Denied: Set Script to Anyone')
      }

      dispatch({
        type: 'FETCH_SUCCESS',
        payload: Array.isArray(data) ? data : []
      })
    } catch (err: any) {
      dispatch({ type: 'FETCH_ERROR', payload: err.message || 'Unknown error' })
    }
  }, [])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const filteredUsers = useMemo(() => {
    const q = state.search.toLowerCase()
    return state.users.filter(u =>
      u.name?.toLowerCase().includes(q) ||
      u.email?.toLowerCase().includes(q)
    )
  }, [state.users, state.search])

  /* =====================
     RENDER
  ===================== */

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0A4D68]">

      {/* SIDEBAR */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-[#0A4D68] text-white hidden lg:flex flex-col p-6">
        <Brand />
        <nav className="space-y-2 flex-1">
          <SidebarItem icon={<LayoutGrid size={20} />} label="Overview" active />
          <SidebarItem icon={<Users size={20} />} label="Students" />
          <SidebarItem icon={<ShieldCheck size={20} />} label="Verification" />
        </nav>
        <SystemStatus error={state.error} />
      </aside>

      {/* MAIN */}
      <main className="lg:ml-64 p-6 lg:p-12">
        <Header loading={state.isLoading} onRefresh={fetchUsers} />

        {state.error && <ErrorBox message={state.error} />}

        <Stats users={state.users.length} />

        <Card className="rounded-[2rem] overflow-hidden">
          <Toolbar
            search={state.search}
            onSearch={v => dispatch({ type: 'SET_SEARCH', payload: v })}
            view={state.view}
            onView={v => dispatch({ type: 'SET_VIEW', payload: v })}
          />

          {state.view === 'table' ? (
            <UserTable loading={state.isLoading} users={filteredUsers} />
          ) : (
            <UserGrid loading={state.isLoading} users={filteredUsers} />
          )}
        </Card>
      </main>
    </div>
  )
}

/* =====================
   SUB COMPONENTS
===================== */

function Brand() {
  return (
    <div className="flex items-center gap-3 mb-10">
      <div className="bg-[#86C232] p-2 rounded-lg">
        <GraduationCap className="text-[#0A4D68]" size={24} />
      </div>
      <span className="text-xl font-bold">Careergize</span>
    </div>
  )
}

function Header({ loading, onRefresh }: any) {
  return (
    <header className="flex flex-col md:flex-row justify-between gap-4 mb-10">
      <div>
        <h1 className="text-3xl font-extrabold">Student Management</h1>
        <p className="text-slate-500">Real-time enrollment monitoring</p>
      </div>
      <Button onClick={onRefresh} className="bg-[#86C232] text-[#0A4D68] rounded-xl">
        <RefreshCw className={`mr-2 ${loading ? 'animate-spin' : ''}`} />
        Sync
      </Button>
    </header>
  )
}

function Toolbar({ search, onSearch, view, onView }: any) {
  return (
    <div className="p-6 flex justify-between gap-4 border-b">
      <div className="relative w-full max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
        <Input
          value={search}
          onChange={e => onSearch(e.target.value)}
          placeholder="Search students"
          className="pl-12 h-12 rounded-xl"
        />
      </div>
      <div className="flex gap-2">
        <Button size="icon" variant={view === 'table' ? 'default' : 'ghost'} onClick={() => onView('table')}>
          <List />
        </Button>
        <Button size="icon" variant={view === 'grid' ? 'default' : 'ghost'} onClick={() => onView('grid')}>
          <LayoutGrid />
        </Button>
      </div>
    </div>
  )
}

function UserTable({ users, loading }: any) {
  return (
    <table className="w-full">
      <thead className="bg-slate-50 text-xs uppercase">
        <tr>
          <th className="px-8 py-4">Student</th>
          <th className="px-8 py-4">Email</th>
          <th className="px-8 py-4">College</th>
          <th className="px-8 py-4">Phone</th>
          <th className="px-8 py-4">Status</th>
          <th className="px-8 py-4">Action</th>
        </tr>
      </thead>
      <tbody>
        <AnimatePresence>
          {loading ? <LoadingRows /> : users.map((u: User, i: number) => (
            <motion.tr key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <td className="px-8 py-4 font-bold">{u.name}</td>
              <td className="px-8 py-4 text-slate-500">{u.email}</td>
              <td className="px-8 py-4">ABC University</td>
              <td className="px-8 py-4">+1 234 567 8901</td>
              <td className="px-8 py-4"><StatusBadge status={u.status} /></td>
              <td className="px-8 py-4"><Button variant="ghost">Details</Button></td>
            </motion.tr>
          ))}
        </AnimatePresence>
      </tbody>
    </table>
  )
}

function UserGrid({ users, loading }: any) {
  if (loading) return <div className="p-10">Loading...</div>
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {users.map((u: User, i: number) => (
        <motion.div key={i} whileHover={{ scale: 1.03 }} className="p-6 bg-slate-50 rounded-2xl">
          <h3 className="font-bold text-lg">{u.name}</h3>
          <p className="text-sm text-slate-500">{u.email}</p>
          <StatusBadge status={u.status} />
        </motion.div>
      ))}
    </div>
  )
}

function StatusBadge({ status = 'verified' }: any) {
  const map: any = {
    verified: 'bg-green-100 text-green-700',
    pending: 'bg-yellow-100 text-yellow-700',
    blocked: 'bg-red-100 text-red-700'
  }
  return (
    <span className={`px-3 py-1 text-xs font-bold rounded-full ${map[status]}`}>{status}</span>
  )
}

function Stats({ users }: any) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
      <StatBox title="Total Students" value={users} icon={<Users />} />
      <StatBox title="Active" value="12" icon={<Sparkles />} />
      <StatBox title="Pending" value="0" icon={<RefreshCw />} />
    </div>
  )
}

function StatBox({ title, value, icon }: any) {
  return (
    <div className="bg-white p-6 rounded-2xl border flex justify-between items-center">
      <div>
        <p className="text-xs uppercase text-slate-400">{title}</p>
        <p className="text-3xl font-black">{value}</p>
      </div>
      <div>{icon}</div>
    </div>
  )
}

function SystemStatus({ error }: any) {
  return (
    <div className="bg-white/10 p-4 rounded-xl">
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${error ? 'bg-red-400' : 'bg-green-400 animate-pulse'}`} />
        <span className="text-xs uppercase">{error ? 'Error' : 'Live'}</span>
      </div>
    </div>
  )
}

function ErrorBox({ message }: any) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl flex gap-2">
      <AlertCircle size={18} />
      {message}
    </motion.div>
  )
}

function SidebarItem({ icon, label, active }: any) {
  return (
    <div className={`flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer ${active ? 'bg-[#86C232] text-[#0A4D68]' : 'text-white/60 hover:bg-white/10'}`}>
      {icon}
      {label}
    </div>
  )
}

function LoadingRows() {
  return [1, 2, 3].map(i => (
    <tr key={i} className="animate-pulse">
      <td colSpan={4} className="px-8 py-6">
        <div className="h-6 bg-slate-100 rounded" />
      </td>
    </tr>
  ))
}
