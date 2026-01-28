'use client'

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Rocket, Code, ArrowRight } from "lucide-react"

const services = [
  {
    icon: BookOpen,
    title: "College Admission & Internships",
    description:
      "Expert career counseling, college & course selection, admission support, and internship opportunities across Indian institutions.",
    image: "/student-studying-and-college-admission-process.jpg",
    link: "/services/college-admission",
  },
  {
    icon: Rocket,
    title: "Digital Marketing",
    description:
      "Social media marketing, SEO optimization, lead generation, and strategic paid ads for your online growth.",
    image: "/digital-marketing-strategy-and-social-media-analyt.jpg",
    link: "/services/digital-marketing",
  },
  {
    icon: Code,
    title: "Web Development",
    description:
      "Modern, responsive, and SEO-friendly websites built with React and Next.js tailored to your business needs.",
    image: "/web-developer-coding-modern-responsive-website.jpg",
    link: "/services/web-development",
  },
]

export default function Services() {
  return (
    <section id="services" className="py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12 animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Our Services</h2>
          <p className="text-lg text-muted-foreground">
            Comprehensive solutions designed to help you succeed in education and business.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <div 
                key={index} 
                className={`animate-fade-in-up animation-delay-${index * 100} group`}
              >
                <Card className="border-border hover:shadow-2xl transition-all duration-300 hover:border-primary/40 overflow-hidden h-full flex flex-col card-hover hover:scale-105">
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10">
                    <img
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-125 group-hover:scale-120"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center mb-4 group-hover:animate-bounce-in transition-all">
                      <Icon className="text-primary group-hover:animate-icon-bounce" size={24} />
                    </div>
                    <CardTitle className="text-foreground group-hover:text-primary transition-colors">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col justify-between">
                    <CardDescription className="text-muted-foreground mb-4">{service.description}</CardDescription>
                    <Link href={service.link}>
                      <Button variant="outline" className="w-full gap-2 group/btn bg-transparent hover:bg-primary/10 hover:border-primary/40">
                        Learn More
                        <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-2" />
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
