'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Zap, Smartphone, Search, Shield } from 'lucide-react'
import Link from 'next/link'

export default function WebDevelopmentPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <div className="bg-white/50 backdrop-blur border-b border-border sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/">
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <ArrowLeft size={16} />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-12 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="animate-fade-in-up">
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Web Development</h1>
              <p className="text-xl text-muted-foreground mb-6">
                Modern, fast, and beautiful websites built with the latest technologies. We create responsive web solutions that drive business results.
              </p>
              <div className="flex gap-4">
                <Link href="/">
                  <Button size="lg" className="bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg">
                    Build Your Website
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative animate-fade-in-left">
              <img
                src="/web-developer-coding-modern-responsive-website.jpg"
                alt="Web Development"
                className="w-full rounded-2xl shadow-2xl object-cover h-96"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 sm:py-24 bg-white/30 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12 text-center">Our Development Features</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Smartphone,
                title: 'Responsive Design',
                description:
                  'Beautiful, mobile-first designs that work perfectly on all devices and screen sizes.',
              },
              {
                icon: Zap,
                title: 'Lightning Fast',
                description:
                  'Optimized performance with fast load times using modern frameworks like React and Next.js.',
              },
              {
                icon: Search,
                title: 'SEO Friendly',
                description:
                  'Built-in SEO optimization to ensure your website ranks well in search engines.',
              },
              {
                icon: Shield,
                title: 'Secure & Scalable',
                description:
                  'Enterprise-grade security and architecture designed to grow with your business.',
              },
            ].map((item, index) => {
              const Icon = item.icon
              return (
                <div key={index} className="bg-background border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <Icon className="w-8 h-8 text-accent mt-1" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12">Technologies We Use</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Frontend',
                description: 'React, Next.js, Tailwind CSS for modern and interactive user interfaces.',
              },
              {
                title: 'Backend',
                description: 'Node.js, Python, and databases optimized for performance and reliability.',
              },
              {
                title: 'Deployment',
                description: 'Vercel, AWS, and cloud platforms for secure and scalable hosting.',
              },
            ].map((item, index) => (
              <div key={index} className="relative p-8 bg-gradient-to-br from-accent/5 to-secondary/5 border border-accent/10 rounded-xl">
                <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Ready to Launch Your Website?</h2>
          <p className="text-lg text-muted-foreground mb-8">Let us build a beautiful, high-performing website for your business.</p>
          <Link href="/">
            <Button size="lg" className="bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg">
              Get Free Consultation
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
