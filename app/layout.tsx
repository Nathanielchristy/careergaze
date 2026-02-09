'use client'

import React, { useState } from "react"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { AnimatePresence, motion } from "framer-motion"
import "./globals.css"
import WhatsAppChat from "@/components/WhatsAppChat"
import SplashScreen from "@/components/SplashScreen"
import FloatingBot from "@/components/FloatingBot" // Import the bot here

const geist = Geist({ subsets: ["latin"] })
const geistMono = Geist_Mono({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <html lang="en">
      <body className="font-sans antialiased bg-white">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <SplashScreen key="loader" finishLoading={() => setIsLoading(false)} />
          ) : (
            <motion.div
              key="main-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              {children}
              
              {/* BRAND BOT - Cycles through messages */}
              <FloatingBot /> 
              
              <WhatsAppChat />
              <Analytics />
            </motion.div>
          )}
        </AnimatePresence>
      </body>
    </html>
  )
}