'use client'

import { motion } from 'framer-motion'
import { useEffect } from 'react'
import Image from 'next/image'

export default function SplashScreen({ finishLoading }: { finishLoading: () => void }) {
  useEffect(() => {
    const timeout = setTimeout(() => finishLoading(), 3000)
    return () => clearTimeout(timeout)
  }, [finishLoading])

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-white overflow-hidden">

      {/* MAIN CINEMATIC CONTAINER */}
      <motion.div
        initial={{ opacity: 0, scale: 0.25 }}
        animate={{
          opacity: 1,
          scale: [0.25, 1.15, 1],
          filter: ['blur(16px)', 'blur(0px)'],
        }}
        transition={{
          duration: 1.6,
          ease: [0.16, 1, 0.3, 1], // cinematic easing
        }}
        className="relative"
      >

        {/* GLOW AURA */}
        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.25, 0.6, 0.25],
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: 'easeInOut',
          }}
          className="absolute inset-0 bg-blue-400/30 blur-[140px] rounded-full"
        />

        {/* PARALLAX DRIFT LAYER */}
        <motion.div
          animate={{
            scale: [1, 1.025, 1],
            x: [0, 6, -6, 0],
            y: [0, -4, 4, 0],
            rotate: [0, 0.6, -0.6, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 8,
            ease: 'easeInOut',
          }}
          className="relative"
        >
          {/* LOGO */}
          <div className="relative w-48 h-48 md:w-64 md:h-64">
            <Image
              src="/logotwo.png"
              alt="Careergize Logo"
              fill
              priority
              className="object-contain"
            />
          </div>
        </motion.div>

        {/* BRAND TEXT */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: 0.9,
            duration: 1,
            ease: 'easeOut',
          }}
          className="text-center mt-8"
        >
          <h1 className="text-3xl font-black tracking-tighter text-[#0A4D68]">
            Careergize<span className="text-blue-600">.</span>
          </h1>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 48 }}
            transition={{ delay: 1.2, duration: 0.7, ease: 'easeOut' }}
            className="h-1 bg-gradient-to-r from-blue-600 to-[#86C232] mx-auto mt-2 rounded-full"
          />
        </motion.div>

      </motion.div>
    </div>
  )
}
