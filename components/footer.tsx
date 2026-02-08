"use client"

import { useState, useEffect } from "react"
import React from 'react';
import Link from "next/link";
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const [isOpen, setIsOpen] = useState(false)
  const currentYear = new Date().getFullYear();
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
    <footer className="relative bg-slate-900 text-slate-300 py-16 sm:py-20 overflow-hidden font-sans border-t border-slate-800">
      
      {/* Background Decorative Glow (Matches the 'How It Works' section vibe but darker) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[100px] opacity-40" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[100px] opacity-40" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/20 ring-1 ring-white/10">
                <span className="text-white font-bold text-xl">C</span>
              </div>
              <span className="font-bold text-2xl text-white tracking-tight">Careergize</span>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-xs text-sm">
              Empowering individuals and businesses across India with strategic guidance, expert mentorship, and digital excellence.
            </p>
            
            {/* Social Media Links */}
            <div className="flex gap-3">
              {[
                { icon: Linkedin, href: "#" },
                { icon: Instagram, href: "https://www.instagram.com/careergize?igsh=OGUxc25xMThzbTVz" },
                { icon: Twitter, href: "#" },
                { icon: Facebook, href: "#" }
              ].map((social, index) => (
                <a 
                  key={index} 
                  href={social.href} 
                  className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 text-slate-400 hover:text-white transition-all duration-300 ring-1 ring-white/5"
                  aria-label="Social Link"
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links - Services */}
       <div>
  <h4 className="text-white font-semibold text-lg mb-6">Services</h4>
  <ul className="space-y-3">
    {[
      { label: "College Admission", href: "/services/college-admission" },
      { label: "Digital Marketing", href: "/services/digital-marketing" },
      { label: "Web Development", href: "/services/web-development" },
    ].map((item) => (
      <li key={item.label}>
        <a
          href={item.href}
          className="group flex items-center text-sm text-slate-400 hover:text-blue-400 transition-colors"
        >
          <ArrowUpRight
            size={14}
            className="mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-blue-500"
          />
          {item.label}
        </a>
      </li>
    ))}
  </ul>
</div>


          {/* Quick Links - Company */}
       <div>
  <h4 className="text-white font-black text-xl tracking-tighter mb-6 uppercase">
    Company<span className="text-blue-500">.</span>
  </h4>
  <ul className="space-y-3">
    {['Home', 'Services', 'Why Us', 'How it works'].map((item) => (
      <li key={item}>
        <button
          onClick={() => {
            // Mapping names to the IDs used in your page sections
            const idMap: Record<string, string> = {
              'Home': 'about', // or 'hero'
              'Services': 'services',
              'Why Us': 'why',
              'How it works': 'how'
            };
            scrollToSection(idMap[item] || item.toLowerCase().replace(/\s+/g, ""));
          }}
          className="text-sm font-black text-slate-400 hover:text-blue-500 transition-all duration-300 block hover:translate-x-2 text-left lowercase tracking-tighter"
        >
          {item}
        </button>
      </li>
    ))}
  </ul>
</div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-6">Get in Touch</h4>
            <div className="space-y-5">
              
              <a href="mailto:info@careergize.com" className="flex items-start gap-3 text-slate-400 hover:text-white transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/20 transition-colors">
                  <Mail className="w-4 h-4 text-blue-400" />
                </div>
                <span className="text-sm mt-1.5">info@careergize.com</span>
              </a>
              
              <div className="flex items-start gap-3 text-slate-400 group">
                 <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-purple-500/20 transition-colors">
                  <Phone className="w-4 h-4 text-purple-400" />
                </div>
                <div className="space-y-1 text-sm mt-1.5">
                  <a href="tel:+916282744675" className="block hover:text-white transition-colors">+91 6282744675</a>
                  <a href="tel:+918137972372" className="block hover:text-white transition-colors">+91 8137972372</a>
                </div>
              </div>

              <div className="flex items-start gap-3 text-slate-400 group">
                <div className="w-8 h-8 rounded-lg bg-pink-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-pink-500/20 transition-colors">
                  <MapPin className="w-4 h-4 text-pink-400" />
                </div>
                <address className="not-italic text-sm mt-1.5 leading-relaxed">
                  Venpalavattom<br />
                  Trivandrum, Kerala 695029
                </address>
              </div>

            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-slate-800/60 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-xs sm:text-sm text-center md:text-left">
            &copy; {currentYear} Careergize LLP. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs sm:text-sm text-slate-500">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}