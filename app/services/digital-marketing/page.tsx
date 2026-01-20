'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, TrendingUp, Share2, BarChart3, Zap } from 'lucide-react'
import Link from 'next/link'

export default function DigitalMarketingPage() {
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
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="animate-fade-in-up">
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Digital Marketing</h1>
              <p className="text-xl text-muted-foreground mb-6">
                Grow your online presence with data-driven digital marketing strategies. We help you reach the right audience and maximize your ROI.
              </p>
              <div className="flex gap-4">
                <Link href="/">
                  <Button size="lg" className="bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg">
                    Start Your Campaign
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative animate-fade-in-left">
              <img
                src="/digital-marketing-strategy-and-social-media-analyt.jpg"
                alt="Digital Marketing"
                className="w-full rounded-2xl shadow-2xl object-cover h-96"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 sm:py-24 bg-white/30 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12 text-center">Our Digital Services</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Share2,
                title: 'Social Media Marketing',
                description:
                  'Strategic content creation and management across Instagram, Facebook, LinkedIn, and other platforms to build your brand.',
              },
              {
                icon: TrendingUp,
                title: 'SEO Optimization',
                description:
                  'Improve your search rankings with proven SEO techniques and on-page optimization strategies.',
              },
              {
                icon: BarChart3,
                title: 'Analytics & Reporting',
                description:
                  'Get detailed insights into your campaign performance with regular reports and actionable recommendations.',
              },
              {
                icon: Zap,
                title: 'Paid Advertising',
                description:
                  'Targeted Google Ads, Facebook Ads, and other platforms to generate qualified leads quickly.',
              },
            ].map((item, index) => {
              const Icon = item.icon
              return (
                <div key={index} className="bg-background border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <Icon className="w-8 h-8 text-secondary mt-1" />
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

      {/* Results */}
      <section className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12">Proven Results</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Increased Traffic',
                description: 'Drive more qualified visitors to your website with targeted campaigns.',
              },
              {
                title: 'Better Engagement',
                description: 'Build meaningful connections with your audience through strategic content.',
              },
              {
                title: 'Higher Conversions',
                description: 'Turn visitors into customers with optimized funnels and persuasive messaging.',
              },
            ].map((item, index) => (
              <div key={index} className="relative p-8 bg-gradient-to-br from-secondary/5 to-accent/5 border border-secondary/10 rounded-xl">
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
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Ready to Grow Your Business?</h2>
          <p className="text-lg text-muted-foreground mb-8">Let us help you reach your target audience and achieve your marketing goals.</p>
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
