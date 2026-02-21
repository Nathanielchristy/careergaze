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

  // UPDATED Navigation Links Data
  const navLinks = [
    { name: "Home", id: "about", type: "scroll" },
    { name: "Services", id: "services", type: "scroll" },
    { name: "Careers", href: "/careers", type: "link" }, // Added Careers
    { name: "Why Us", id: "why", type: "scroll" },
    { name: "How It Works", id: "how", type: "scroll" },
    { name: "Login", href: "/login", type: "link" }
  ]

  return (
    <header 
      className={`sticky top-0 z-[100] transition-all duration-500 ${
        scrolled 
          ? "bg-white/80 backdrop-blur-xl border-b border-slate-100 shadow-sm py-2" 
          : "bg-white border-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Logo Section */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-4 group cursor-pointer"
          >
            <div className="relative w-12 h-12 md:w-14 md:h-14 p-0.5 rounded-2xl bg-gradient-to-tr from-[#005A8D] to-[#22C55E] shadow-blue-100 shadow-lg group-hover:shadow-[#A7FF00]/20 transition-all duration-500 group-hover:rotate-3">
              <div className="relative w-full h-full overflow-hidden rounded-[14px] bg-white">
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
              <span className="font-black text-xl md:text-2xl tracking-tighter text-slate-900 leading-none">
                Careergize<span className="text-[#22C55E]">.</span>
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
                  className="text-xs font-black uppercase tracking-widest text-slate-500 hover:text-[#005A8D] transition-all duration-300 relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#A7FF00] group-hover:w-full transition-all duration-300" />
                </button>
              ) : (
                <Link
                  key={link.href}
                  href={link.href!}
                  className={`text-xs font-black uppercase tracking-widest transition-all duration-300 relative group flex items-center gap-1 ${
                    link.featured ? "text-[#22C55E]" : "text-slate-500 hover:text-[#005A8D]"
                  }`}
                >
                  {link.name}
                  {link.featured && <Sparkles size={12} className="animate-pulse" />}
                  <span className={`absolute -bottom-1 left-0 w-0 h-0.5 ${link.featured ? "bg-[#22C55E]" : "bg-[#005A8D]"} group-hover:w-full transition-all duration-300`} />
                </Link>
              )
            ))}
          </nav>

          {/* CTA Section */}
          <div className="hidden md:flex items-center gap-4">
            <Button
              onClick={() => scrollToSection("cta")}
              className="bg-[#005A8D] hover:bg-slate-900 text-white rounded-2xl px-8 py-6 h-auto font-black tracking-tighter transition-all shadow-xl shadow-blue-50 flex items-center gap-2 group border-none"
            >
              Consult Now
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-3 bg-slate-50 rounded-xl text-slate-900 transition-colors" 
            onClick={() => setIsOpen(!isOpen)} 
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div 
          className={`md:hidden absolute left-0 right-0 bg-white border-b border-slate-100 transition-all duration-500 ease-in-out overflow-hidden shadow-2xl ${
            isOpen ? "max-h-[700px] opacity-100 py-8" : "max-h-0 opacity-0 py-0"
          }`}
        >
          <div className="flex flex-col gap-6 px-6">
            {navLinks.map((link) => (
               link.type === "scroll" ? (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id!)}
                  className="text-3xl font-black text-slate-900 hover:text-[#22C55E] transition-colors text-left tracking-tighter"
                >
                  {link.name}
                </button>
              ) : (
                <Link
                  key={link.href}
                  href={link.href!}
                  onClick={() => setIsOpen(false)}
                  className={`text-3xl font-black transition-colors text-left tracking-tighter flex items-center gap-2 ${
                    link.featured ? "text-[#22C55E]" : "text-slate-900"
                  }`}
                >
                  {link.name}
                  {link.featured && <span className="text-[10px] bg-[#A7FF00] text-slate-900 px-2 py-1 rounded-lg uppercase tracking-widest">Hiring</span>}
                </Link>
              )
            ))}
            <Button
              onClick={() => {
                setIsOpen(false);
                scrollToSection("cta");
              }}
              className="bg-[#005A8D] hover:bg-slate-900 text-white rounded-2xl w-full py-8 mt-4 font-black text-xl shadow-xl shadow-blue-50"
            >
              Free Consultation
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}