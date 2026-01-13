import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

const steps = [
  {
    number: "01",
    title: "Free Consultation",
    description: "Schedule a no-obligation consultation with our experts to understand your goals and needs.",
    image: "/consultation-meeting-discussion-career-goals.jpg",
  },
  {
    number: "02",
    title: "Custom Strategy",
    description: "We develop a personalized roadmap tailored to your specific situation and aspirations.",
    image: "/strategic-planning-roadmap-business-strategy.jpg",
  },
  {
    number: "03",
    title: "Guided Support",
    description: "Our team provides comprehensive support throughout your journey to ensure success.",
    image: "/team-support-mentoring-professional-guidance.jpg",
  },
]

export default function HowItWorks() {
  return (
    <section id="how" className="py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12 animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">How It Works</h2>
          <p className="text-lg text-muted-foreground">
            Our simple three-step process gets you started on your path to success.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className={`relative animate-fade-in-up animation-delay-${index * 150}`}>
              <Card className="border-border bg-gradient-to-br from-white to-blue-50/30 h-full overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-40 overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
                  <img
                    src={step.image || "/placeholder.svg"}
                    alt={step.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>

                <CardHeader>
                  <div className="text-4xl font-bold text-primary/20 mb-2">{step.number}</div>
                  <CardTitle className="text-foreground text-xl">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:flex absolute top-1/2 right-0 w-8 h-0.5 transform translate-x-full items-center justify-center">
                  <ArrowRight className="text-primary/30" size={20} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
