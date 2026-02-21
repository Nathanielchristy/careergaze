"use client";
import Link from "next/link" // Added Link import
import { Button } from "@/components/ui/button"
import { 
  Code, 
  Globe, 
  LineChart, 
  CheckCircle2, 
  ArrowRight, 
  Laptop, 
  Share2, 
  Rocket, 
  Target 
} from "lucide-react"

const internshipRoles = [
  {
    id: "web-dev",
    title: "Full-Stack Web Development",
    icon: <Code className="text-[#005A8D]" size={32} />,
    duration: "12 Weeks",
    level: "Intermediate",
    description: "Build production-ready applications using the Next.js, TypeScript, and Tailwind CSS stack.",
    skills: ["React & Next.js", "Node.js API Design", "Database Management", "UI/UX Implementation"],
    color: "border-t-[#005A8D]"
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing & Growth",
    icon: <LineChart className="text-[#22C55E]" size={32} />,
    duration: "8 Weeks",
    level: "Beginner - Advanced",
    description: "Master the art of digital brand scaling through SEO, performance marketing, and data analytics.",
    skills: ["SEO Strategy", "Meta & Google Ads", "Content Analytics", "Email Automation"],
    color: "border-t-[#22C55E]"
  }
]

export default function InternshipSection() {
  return (
    <section id="internships" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Area */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-black text-[#005A8D] uppercase tracking-[0.3em] mb-4">Current Openings</h2>
          <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-6">
            Fast-Track Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#005A8D] to-[#22C55E]">Career</span>
          </h3>
          <p className="text-slate-600 text-lg">
            Hands-on experience with real-world projects. Our internships are designed to turn students into industry-ready professionals.
          </p>
        </div>

        {/* Roles Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {internshipRoles.map((role) => (
            <div 
              key={role.id} 
              className={`bg-white rounded-[2rem] p-8 shadow-sm border-t-8 ${role.color} hover:shadow-xl transition-all duration-300 flex flex-col`}
            >
              <div className="flex justify-between items-start mb-6">
                <div className="p-4 bg-slate-50 rounded-2xl">
                  {role.icon}
                </div>
                <span className="px-4 py-1.5 bg-slate-100 text-slate-600 rounded-full text-xs font-bold uppercase tracking-wider">
                  {role.duration}
                </span>
              </div>

              <h4 className="text-2xl font-black text-slate-900 mb-4">{role.title}</h4>
              <p className="text-slate-600 mb-8 leading-relaxed">
                {role.description}
              </p>

              <div className="space-y-4 mb-10 flex-grow">
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">What you'll master:</p>
                <div className="grid grid-cols-2 gap-3">
                  {role.skills.map((skill) => (
                    <div key={skill} className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <CheckCircle2 size={16} className="text-[#22C55E]" />
                      {skill}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* Updated Button with Link */}
                <Button 
                  asChild
                  className="flex-1 bg-slate-900 hover:bg-black text-white h-14 rounded-xl font-bold text-lg transition-transform active:scale-95"
                >
                  <Link href="/internship-2026/enronllment">
                    Enroll Now
                   
                  </Link>
                </Button>
                
                <button className="p-4 rounded-xl border-2 border-slate-100 text-slate-400 hover:text-[#005A8D] hover:border-[#005A8D] transition-colors">
                  <Share2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits Bar */}
        <div className="mt-16 bg-[#005A8D] rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden">
          <div className="absolute right-0 top-0 opacity-10 translate-x-1/4 -translate-y-1/4 pointer-events-none">
             <Globe size={300} />
          </div>
          
          <div className="relative z-10 grid md:grid-cols-3 gap-8 items-center">
            <div className="flex flex-col gap-2">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                <Laptop className="text-[#A7FF00]" size={24} />
              </div>
              <h5 className="text-xl font-bold">100% Remote</h5>
              <p className="text-white/70 text-sm">Work from anywhere in the world with global teams.</p>
            </div>
            
            <div className="flex flex-col gap-2">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                <Target className="text-[#A7FF00]" size={24} />
              </div>
              <h5 className="text-xl font-bold">Project Based</h5>
              <p className="text-white/70 text-sm">Not just busy work. You build real products for real clients.</p>
            </div>

            <div className="flex flex-col gap-2">
               <h5 className="text-2xl font-black text-[#A7FF00]">Ready to start?</h5>
               <p className="text-white/70 text-sm mb-4">Limited slots for the 2026 cohort.</p>
               
               {/* Updated Button with Link */}
               <Button asChild className="bg-[#A7FF00] hover:bg-[#96e600] text-slate-900 font-bold rounded-lg border-none">
                 <Link href="/internship-2026/enronllment">
                    Secure My Spot
                    <ArrowRight size={16} className="ml-2" />
                 </Link>
               </Button>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}