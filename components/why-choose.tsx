import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

const reasons = [
  {
    title: "Expert Team",
    description: "Industry professionals with years of proven experience in education and digital solutions.",
  },
  {
    title: "Proven Results",
    description: "Real success stories from our students and business partners who achieved their goals.",
  },
  {
    title: "Personalized Approach",
    description: "Customized strategies tailored to your unique needs, goals, and circumstances.",
  },
  {
    title: "Comprehensive Support",
    description: "End-to-end guidance from initial consultation through successful completion.",
  },
  {
    title: "Latest Technology",
    description: "Cutting-edge tools and methodologies to ensure modern, effective solutions.",
  },
  {
    title: "Affordable & Transparent",
    description: "Competitive pricing with no hidden costs, ensuring excellent value for money.",
  },
]

export default function WhyChoose() {
  return (
    <section id="why" className="py-16 sm:py-24 bg-blue-50/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12 animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Why Careergize</h2>
          <p className="text-lg text-muted-foreground">Here's what sets us apart from the rest.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) => (
            <div key={index} className={`animate-fade-in-up animation-delay-${(index % 3) * 100}`}>
              <Card className="border-border bg-white/50 backdrop-blur hover:bg-white hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="text-accent flex-shrink-0 mt-1" size={20} />
                    <h3 className="font-semibold text-foreground">{reason.title}</h3>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{reason.description}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
