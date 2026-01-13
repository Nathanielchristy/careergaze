import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Rocket, Code } from "lucide-react"

const services = [
  {
    icon: BookOpen,
    title: "College Admission Guidance",
    description:
      "Expert career counseling, college & course selection, and comprehensive admission support across Indian institutions.",
    image: "/student-studying-and-college-admission-process.jpg",
  },
  {
    icon: Rocket,
    title: "Digital Marketing",
    description:
      "Social media marketing, SEO optimization, lead generation, and strategic paid ads for your online growth.",
    image: "/digital-marketing-strategy-and-social-media-analyt.jpg",
  },
  {
    icon: Code,
    title: "Web Development",
    description:
      "Modern, responsive, and SEO-friendly websites built with React and Next.js tailored to your business needs.",
    image: "/web-developer-coding-modern-responsive-website.jpg",
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
              <div key={index} className={`animate-fade-in-up animation-delay-${index * 100}`}>
                <Card className="border-border hover:shadow-lg transition-all duration-300 hover:border-primary/20 overflow-hidden h-full">
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10">
                    <img
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>

                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="text-primary" size={24} />
                    </div>
                    <CardTitle className="text-foreground">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground">{service.description}</CardDescription>
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
