import { Button } from "@/components/ui/button"
import { ArrowRight, Phone, Mail } from "lucide-react"

export default function CTA() {
  return (
    <section id="cta" className="relative py-16 sm:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-fade-in-right" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-fade-in-left animation-delay-200" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Ready to Transform Your Future?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join hundreds of students and businesses who have already achieved their goals with Careergize.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+916282744675">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/30 text-primary-foreground rounded-full text-base w-full"
              >
                Get Free Consultation
                <ArrowRight size={20} className="ml-2" />
              </Button>
            </a>
            <a href="mailto:info@careergize.com">
              <Button
                size="lg"
                variant="outline"
                className="rounded-full text-base border-border hover:bg-muted bg-transparent w-full"
              >
                Contact Us
              </Button>
            </a>
          </div>

          <div className="mt-8 pt-8 border-t border-border flex flex-col sm:flex-row gap-4 justify-center text-sm text-muted-foreground">
            <div className="flex items-center gap-2 justify-center">
              <Phone size={16} className="text-accent" />
              <a href="tel:+916282744675" className="hover:text-foreground transition">
                +91 6282744675
              </a>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <Phone size={16} className="text-accent" />
              <a href="tel:+918137972372" className="hover:text-foreground transition">
                +91 8137972372
              </a>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <Mail size={16} className="text-accent" />
              <a href="mailto:info@careergize.com" className="hover:text-foreground transition">
                info@careergize.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
