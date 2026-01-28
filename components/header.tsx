"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const scrollToSection = (id: string) => {
    setIsOpen(false)
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 group cursor-pointer hover:scale-105 transition-transform">
            <Image 
              src="/logo.svg" 
              alt="Careergize logo" 
              width={40} 
              height={40} 
              priority
              className="group-hover:animate-spin-slow"
            />
            <span className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">Careergize</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8">
            <button
              onClick={() => scrollToSection("services")}
              className="text-sm text-foreground hover:text-primary transition-colors relative group"
            >
              Services
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
            </button>
            <button
              onClick={() => scrollToSection("why")}
              className="text-sm text-foreground hover:text-primary transition-colors relative group"
            >
              Why Us
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
            </button>
            <button
              onClick={() => scrollToSection("how")}
              className="text-sm text-foreground hover:text-primary transition-colors"
            >
              How It Works
            </button>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex gap-4">
            <Button
              onClick={() => scrollToSection("cta")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full"
            >
              Get Free Consultation
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-4">
            <button
              onClick={() => scrollToSection("services")}
              className="text-sm text-foreground hover:text-primary transition-colors text-left"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("why")}
              className="text-sm text-foreground hover:text-primary transition-colors text-left"
            >
              Why Us
            </button>
            <button
              onClick={() => scrollToSection("how")}
              className="text-sm text-foreground hover:text-primary transition-colors text-left"
            >
              How It Works
            </button>
            <Button
              onClick={() => scrollToSection("cta")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full w-full"
            >
              Get Free Consultation
            </Button>
          </nav>
        )}
      </div>
    </header>
  )
}
