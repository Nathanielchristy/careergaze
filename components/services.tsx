'use client'

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Rocket, Code2, ArrowRight } from "lucide-react"

const services = [
{
  icon: BookOpen,
  title: "College Admissions & Internship Programs",
  description:
    "Expert college admission guidance with personalized counseling, university selection, application support, and structured internship programs to build real-world skills and career readiness.",
  image: "/student-studying-and-college-admission-process.jpg",
  link: "/services/college-admission",
  accent: "#005A8D" // Deep Blue
}
,
  {
    icon: Code2,
    title: "Full-Stack Web Development",
    description:
      "Custom, high-performance websites built with Next.js and Tailwind CSS. We turn your ideas into scalable digital products.",
    image: "/web-developer-coding-modern-responsive-website.jpg",
    link: "/services/web-development",
    accent: "#22C55E" // Mid Green
  },
  {
    icon: Rocket,
    title: " Digital Marketing",
    description:
      "Scale your brand with SEO, data-backed social media strategies, and high-conversion lead generation campaigns.",
    image: "/digital-marketing-strategy-and-social-media-analyt.jpg",
    link: "/services/digital-marketing",
    accent: "#A7FF00" // Lime Green
  },
]

export default function Services() {
  return (
    <section id="services" className="py-24 bg-white relative">
      {/* Decorative Brand Background Element */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-slate-50 to-transparent opacity-50" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em]">
            <span className="w-2 h-2 rounded-full bg-[#A7FF00] animate-pulse" />
            Our Expertise
          </div>
          
          <h3 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tighter mb-8 leading-[0.95]">
            Solutions Built for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#005A8D] to-[#A7FF00]">Exponential Growth.</span>
          </h3>
        <p className="text-xl text-slate-500 font-medium">
  Combining digital marketing, web development, and career mentorship, we empower students and businesses to succeed in a competitive digital landscape.
</p>

        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-10">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <div key={index} className="group h-full">
                <Card className="relative h-full bg-white border-slate-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_60px_-15px_rgba(0,90,141,0.12)] transition-all duration-700 overflow-hidden flex flex-col rounded-[2.5rem] border-none">
                  
                  {/* Image Container with Brand Gradient Overlay */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-1"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent opacity-90 group-hover:opacity-60 transition-opacity" />
                    
                    {/* Hover Accent Line */}
                    <div 
                      className="absolute bottom-0 left-0 h-1.5 transition-all duration-500 w-0 group-hover:w-full"
                      style={{ backgroundColor: service.accent }}
                    />
                  </div>

                  <CardHeader className="relative pt-10 px-8">
                    {/* Floating Icon Badge with Dynamic Brand Colors */}
                    <div 
                      className="absolute -top-10 left-8 w-20 h-20 bg-white rounded-[2rem] shadow-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 border border-slate-50"
                    >
                      <Icon 
                        className="transition-colors duration-300" 
                        size={32} 
                        style={{ color: service.accent }}
                      />
                    </div>
                    
                    <CardTitle className="text-2xl font-black text-slate-900 tracking-tight leading-none group-hover:text-[#005A8D] transition-colors">
                      {service.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="flex-grow flex flex-col justify-between px-8 pb-10">
                    <CardDescription className="text-slate-500 text-base font-medium leading-relaxed mb-8">
                      {service.description}
                    </CardDescription>
                    
                    <Link href={service.link}>
                      <Button 
                        variant="ghost" 
                        className="w-full group/btn justify-between p-0 hover:bg-transparent text-slate-900 font-black text-sm uppercase tracking-widest"
                      >
                        Learn More
                        <span 
                          className="flex items-center justify-center w-12 h-12 rounded-2xl bg-slate-50 group-hover/btn:text-white transition-all duration-500 group-hover/btn:-rotate-12"
                          style={{ 
                            backgroundColor: 'transparent',
                            border: `2px solid ${service.accent}`,
                         
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = service.accent}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                          <ArrowRight size={20} />
                        </span>
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}