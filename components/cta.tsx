"use client"

import React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Phone, Mail } from "lucide-react"

export default function CTA() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const message = `Name: ${formData.name}%0AEmail: ${formData.email}%0APhone: ${formData.phone}`
      const whatsappUrl = `https://wa.me/916282744675?text=${message}`
      window.open(whatsappUrl, "_blank")

      setSubmitMessage("Form submitted! Opening WhatsApp...")
      setTimeout(() => {
        setFormData({ name: "", email: "", phone: "" })
        setSubmitMessage("")
      }, 1500)
    } catch (error) {
      setSubmitMessage("Error submitting form. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="cta" className="relative py-16 sm:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-blob" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-blob animation-delay-300" />
      <div className="absolute top-1/2 right-1/3 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-blob animation-delay-600" />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="animate-fade-in-up text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Ready to Transform Your Future?</h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Get in touch with our experts. Fill out the form below and we'll connect with you soon.
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur rounded-2xl shadow-2xl p-8 animate-fade-in-up card-hover border border-primary/10">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your Name"
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground transition"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your@email.com"
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground transition"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="+91 XXXXXXXXXX"
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground transition"
              />
            </div>

            {submitMessage && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                {submitMessage}
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-2xl hover:shadow-primary/40 text-primary-foreground rounded-lg py-3 font-semibold hover:scale-105 transition-transform duration-300 group"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Get Free Consultation"}
              {!isSubmitting && <span className="ml-2 group-hover:animate-icon-bounce inline-block">→</span>}
            </Button>
          </form>
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
    </section>
  )
}
