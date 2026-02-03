"use client"

import { useState, useEffect } from "react"
import { Menu, X, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

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

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-white/90 backdrop-blur-xl border-b border-slate-100 shadow-sm py-2" 
          : "bg-white border-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Enhanced Logo Section */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-4 group cursor-pointer"
          >
            <div className="relative w-12 h-12 md:w-14 md:h-14 p-0.5 rounded-2xl bg-gradient-to-tr from-blue-600 to-blue-400 shadow-blue-200 shadow-lg group-hover:shadow-blue-300 transition-all duration-500 group-hover:rotate-3">
              <div className="relative w-full h-full overflow-hidden rounded-[14px] bg-white">
                <Image 
                  src="/logo.jpeg" 
                  alt="Careergize logo" 
                  fill
                  priority
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              {/* Decorative Pulse Effect */}
              <span className="absolute inset-0 rounded-2xl bg-blue-400 animate-ping opacity-0 group-hover:opacity-20 transition-opacity duration-700"></span>
            </div>
            
            <div className="flex flex-col">
              <span className="font-black text-xl md:text-2xl tracking-tighter text-slate-900 leading-none">
                Careergize<span className="text-blue-600">.</span>
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            {[
              
              {name: "Home", id: "about" },
              { name: "Services", id: "services" },
              { name: "Why Us", id: "why" },
              { name: "How It Works", id: "how" }
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-sm font-bold text-slate-500 hover:text-blue-600 transition-all duration-300 relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </nav>

          {/* CTA Section */}
          <div className="hidden md:flex items-center gap-4">
            <Button
              onClick={() => scrollToSection("cta")}
              className="bg-slate-900 hover:bg-blue-600 text-white rounded-2xl px-8 py-6 h-auto font-black tracking-tight transition-all shadow-xl shadow-slate-200 flex items-center gap-2 group border-none"
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
            isOpen ? "max-h-[500px] opacity-100 py-8" : "max-h-0 opacity-0 py-0"
          }`}
        >
          <div className="flex flex-col gap-6 px-6">
            {["about", "Services", "Why Us", "How It Works"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item === "about" ? "about" : item.toLowerCase().replace(/\s+/g, ""))}
                className="text-2xl font-black text-slate-900 hover:text-blue-600 transition-colors text-left lowercase tracking-tighter"
              >
                {item}
              </button>
            ))}
            <Button
              onClick={() => scrollToSection("cta")}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl w-full py-7 mt-4 font-black text-lg shadow-xl shadow-blue-100"
            >
              Get Free Consultation
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}