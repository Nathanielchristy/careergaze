'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, CheckCircle2, Users, Award, Lightbulb } from 'lucide-react'
import Link from 'next/link'

export default function CollegeAdmissionPage() {
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
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">College Admission Guidance</h1>
              <p className="text-xl text-muted-foreground mb-6">
                Your pathway to success in higher education. We provide comprehensive guidance for college selection, course planning, and admission support across top Indian institutions.
              </p>
              <div className="flex gap-4">
                <Link href="/#services" onClick={() => window.scrollTo(0, 0)}>
                  <Button size="lg" className="bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg">
                    Get Started Today
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative animate-fade-in-left">
              <img
                src="/student-studying-and-college-admission-process.jpg"
                alt="College Admission Process"
                className="w-full rounded-2xl shadow-2xl object-cover h-96"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-16 sm:py-24 bg-white/30 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12 text-center">What We Offer</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Users,
                title: 'Expert Counseling',
                description:
                  'One-on-one sessions with experienced counselors to understand your strengths, interests, and career goals.',
              },
              {
                icon: Award,
                title: 'College Selection',
                description:
                  'Comprehensive analysis of top colleges matching your profile, preferences, and future aspirations.',
              },
              {
                icon: Lightbulb,
                title: 'Course Planning',
                description:
                  'Strategic guidance on choosing the right courses and specializations aligned with your career path.',
              },
              {
                icon: CheckCircle2,
                title: 'Admission Support',
                description:
                  'Complete assistance with application forms, entrance exams, interviews, and documentation.',
              },
            ].map((item, index) => {
              const Icon = item.icon
              return (
                <div key={index} className="bg-background border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <Icon className="w-8 h-8 text-primary mt-1" />
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

      {/* Benefits */}
      <section className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12">Why Choose Us</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Personalized Approach',
                description: 'We understand that every student is unique. Our counselors tailor guidance based on your individual profile.',
              },
              {
                title: 'Proven Track Record',
                description: 'Hundreds of students have successfully gained admission to their dream colleges with our support.',
              },
              {
                title: 'End-to-End Support',
                description:
                  'From initial counseling to final admission, we guide you at every step of your academic journey.',
              },
            ].map((item, index) => (
              <div key={index} className="relative p-8 bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10 rounded-xl">
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
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Ready to Begin Your Journey?</h2>
          <p className="text-lg text-muted-foreground mb-8">Connect with our experts for personalized college admission guidance.</p>
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
