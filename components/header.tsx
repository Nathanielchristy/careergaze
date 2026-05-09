"use client"

import { useState, useEffect } from "react"
import { Menu, X, ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    setIsOpen(false)
    if (id === "about" || id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" })
      return
    }

    const element = document.getElementById(id)
    if (element) {
      const offset = 90 
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = element.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      })
    }
  }

  const navLinks = [
    { name: "Home", id: "about", type: "scroll" },
    { name: "Services", id: "services", type: "scroll" },
    { name: "Careers", href: "/careers", type: "link" },
    { name: "Why Us", id: "why", type: "scroll" },
    { name: "How It Works", id: "how", type: "scroll" },
    { name: "Login", href: "/login", type: "link" }
  ]

  return (
    <header 
      className={`sticky top-0 z-[100] transition-all duration-500 ${
        scrolled 
          ? "bg-[#0B0E14]/80 backdrop-blur-xl border-b border-white/5 py-3" 
          : "bg-[#0B0E14] border-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Logo Section */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="relative w-10 h-10 md:w-11 md:h-11 p-0.5 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 shadow-cyan-500/10 shadow-lg group-hover:shadow-cyan-500/30 transition-all duration-500">
              <div className="relative w-full h-full overflow-hidden rounded-[10px] bg-slate-900">
                <Image 
                  src="/logo.jpeg" 
                  alt="Careergize logo" 
                  fill
                  priority
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
            </div>
            
            <div className="flex flex-col">
              <span className="font-black text-xl md:text-2xl tracking-tighter text-white leading-none">
                Careergize<span className="text-cyan-400">.</span>
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              link.type === "scroll" ? (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id!)}
                  className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400 hover:text-white transition-all duration-300 relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300" />
                </button>
              ) : (
                <Link
                  key={link.href}
                  href={link.href!}
                  className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400 hover:text-white transition-all duration-300 relative group flex items-center gap-1"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300" />
                </Link>
              )
            ))}
          </nav>

          {/* CTA Section */}
          <div className="hidden md:flex items-center gap-4">
            <Button
              onClick={() => scrollToSection("cta")}
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-xl px-6 h-11 font-bold tracking-tight transition-all shadow-lg shadow-cyan-500/10 flex items-center gap-2 group border-none"
            >
              Consult Now
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2.5 bg-slate-800/50 rounded-xl text-white transition-colors" 
            onClick={() => setIsOpen(!isOpen)} 
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div 
          className={`md:hidden absolute left-0 right-0 bg-[#0B0E14] border-b border-white/5 transition-all duration-500 ease-in-out overflow-hidden shadow-2xl ${
            isOpen ? "max-h-[700px] opacity-100 py-10" : "max-h-0 opacity-0 py-0"
          }`}
        >
          <div className="flex flex-col gap-8 px-8">
            {navLinks.map((link) => (
               link.type === "scroll" ? (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id!)}
                  className="text-4xl font-black text-white hover:text-cyan-400 transition-colors text-left tracking-tighter"
                >
                  {link.name}
                </button>
              ) : (
                <Link
                  key={link.href}
                  href={link.href!}
                  onClick={() => setIsOpen(false)}
                  className="text-4xl font-black text-white hover:text-cyan-400 transition-colors text-left tracking-tighter"
                >
                  {link.name}
                </Link>
              )
            ))}
            <Button
              onClick={() => {
                setIsOpen(false);
                scrollToSection("cta");
              }}
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-2xl w-full py-7 mt-4 font-black text-lg"
            >
              Free Consultation
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}