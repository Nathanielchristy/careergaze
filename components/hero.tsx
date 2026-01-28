import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

export default function Hero() {
  return (
    <section className="relative py-20 sm:py-32 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-blue-50/30 pointer-events-none" />

      {/* Animated blobs */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-blob" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-blob animation-delay-300" />
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-blob animation-delay-600" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="animate-fade-in-left">
            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance mb-6">
              <span className="text-foreground">Your Path to Success</span>
              <br />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Starts Here</span>
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 text-balance">
              From college admissions to building your digital presence, we provide expert guidance every step of the
              way.
            </p>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/30 text-primary-foreground rounded-full text-base hover:scale-105 transition-transform duration-300 group"
              >
                Get Free Consultation
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full text-base border-border hover:bg-muted bg-transparent hover:scale-105 transition-transform duration-300"
              >
                Learn More
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="mt-12 grid grid-cols-3 gap-6">
              <div className="animate-fade-in-up">
                <div className="text-2xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Students Guided</div>
              </div>
              <div className="animate-fade-in-up animation-delay-100">
                <div className="text-2xl font-bold text-accent">95%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
              <div className="animate-fade-in-up animation-delay-200">
                <div className="text-2xl font-bold text-secondary">150+</div>
                <div className="text-sm text-muted-foreground">Businesses Built</div>
              </div>
            </div>
          </div>

          {/* Right image */}
          <div className="animate-fade-in-right animation-delay-200 hidden md:block">
            <img
              src="/professional-team-collaborating-on-career-growth-w.jpg"
              alt="Career growth and success"
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
