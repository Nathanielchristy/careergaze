"use client"

import { useState, useEffect } from "react"
import { Menu, X, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    setIsOpen(false)
    
    // REDIRECT LOGIC: If not on home, go home with hash
    if (pathname !== "/") {
      router.push(`/#${id}`)
      return
    }

    // SCROLL LOGIC: If on home, smooth scroll
    if (id === "home" || id === "about") {
      window.scrollTo({ top: 0, behavior: "smooth" })
      return
    }

    const element = document.getElementById(id)
    if (element) {
      const offset = 90 
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth"
      })
    }
  }

  const navLinks = [
    { name: "Home", id: "about", type: "scroll" },
    { name: "Services", id: "services", type: "scroll" },
    // { name: "Why Us", id: "whychoose", type: "scroll" },
    { name: "Careers", href: "/careers", type: "link" },
  ]

  return (
    <header className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
      scrolled ? "bg-[#0B0E14]/90 backdrop-blur-xl border-b border-white/5 py-3" : "bg-transparent py-6"
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 relative rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5">
            <div className="w-full h-full bg-slate-900 rounded-[10px] overflow-hidden relative">
              <Image src="/logo.jpeg" alt="Logo" fill className="object-cover" />
            </div>
          </div>
          <span className="text-white font-black text-2xl tracking-tighter">Careergize<span className="text-cyan-400">.</span></span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            link.type === "scroll" ? (
              <button key={link.id} onClick={() => scrollToSection(link.id!)} className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400 hover:text-white transition-all">
                {link.name}
              </button>
            ) : (
              <Link key={link.href} href={link.href!} className={`text-[11px] font-bold uppercase tracking-[0.15em] ${pathname === link.href ? "text-cyan-400" : "text-slate-400 hover:text-white"}`}>
                {link.name}
              </Link>
            )
          ))}
          <Link href="/contact">
            <Button className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl px-6 border-none">
              Consult Now <ArrowRight size={16} className="ml-2" />
            </Button>
          </Link>
        </nav>

        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "100vh" }} exit={{ opacity: 0, height: 0 }} className="md:hidden absolute top-full left-0 w-full bg-[#0B0E14] z-[99]">
            <div className="flex flex-col p-10 gap-8">
              {navLinks.map(link => (
                <button key={link.name} onClick={() => link.type === "scroll" ? scrollToSection(link.id!) : router.push(link.href!)} className="text-5xl font-black text-white text-left tracking-tighter">
                  {link.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}