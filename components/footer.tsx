import { Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-foreground text-primary-foreground py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-accent to-secondary rounded-lg flex items-center justify-center">
                <span className="text-foreground font-bold text-sm">C</span>
              </div>
              <span className="font-bold text-lg">Careergize</span>
            </div>
            <p className="text-sm text-primary-foreground/70">Transforming careers and businesses in India.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-primary-foreground/70 hover:text-primary-foreground transition">
                  College Admission
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/70 hover:text-primary-foreground transition">
                  Digital Marketing
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/70 hover:text-primary-foreground transition">
                  Web Development
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-primary-foreground/70 hover:text-primary-foreground transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/70 hover:text-primary-foreground transition">
                  Success Stories
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/70 hover:text-primary-foreground transition">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Get in Touch</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-accent" />
                <a
                  href="mailto:info@careergize.com"
                  className="text-primary-foreground/70 hover:text-primary-foreground transition"
                >
                  info@careergize.com
                </a>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Phone size={16} className="text-accent" />
                  <a
                    href="tel:+916282744675"
                    className="text-primary-foreground/70 hover:text-primary-foreground transition"
                  >
                    +91 6282744675
                  </a>
                </div>
                <div className="flex items-center gap-2 ml-6">
                  <a
                    href="tel:+918137972372"
                    className="text-primary-foreground/70 hover:text-primary-foreground transition"
                  >
                    +91 8137972372
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={16} className="text-accent mt-0.5 flex-shrink-0" />
                <div className="text-primary-foreground/70">
                  <p>Venpalavattom</p>
                  <p>Trivandrum, 695029</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm text-primary-foreground/70">
          <p>&copy; 2026 Careergize LLP. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
