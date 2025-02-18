"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Button from "../../components/ui/Button"
import Header from '../../components/Headers'
import Footer from '../../components/Footer'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

const pulseAnimation = {
  scale: [1, 1.05, 1],
  transition: {
    duration: 2,
    repeat: Infinity,
  },
}

export default function BetaPage() {
  const [timeLeft, setTimeLeft] = useState({})

  useEffect(() => {
    const timer = setInterval(() => {
      const difference = new Date('2025-03-15') - new Date()
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <>
      <Header />
      <main className="min-h-screen mt-8 pt-20 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4 content-container">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Welcome to AuthMate Beta!
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            className="text-xl text-gray-700 dark:text-gray-300 mb-8"
          >
            We're excited to have you on board as we fine-tune our authentication platform.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 mb-12"
          >
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Full Version Coming Soon!
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Our team is working hard to bring you even more features and improvements.
              The full version of AuthMate will be released on March 15, 2025.
            </p>

            <motion.div
              animate={pulseAnimation}
              className="grid grid-cols-4 gap-4 text-center"
            >
              {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                  <div className="text-3xl font-bold text-primary">{value}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{unit}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            className="space-y-4"
          >
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
              What to expect in the full version:
            </h3>
            <ul className="text-left text-gray-700 dark:text-gray-300 space-y-2">
              <motion.li
                variants={fadeInUp}
                className="flex items-center"
              >
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="mr-2 text-primary"
                >
                  ⚡
                </motion.span>
                Enhanced performance and scalability
              </motion.li>
              <motion.li
                variants={fadeInUp}
                className="flex items-center"
              >
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="mr-2 text-primary"
                >
                  🔒
                </motion.span>
                Advanced security features
              </motion.li>
              <motion.li
                variants={fadeInUp}
                className="flex items-center"
              >
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="mr-2 text-primary"
                >
                  🔌
                </motion.span>
                More integrations with popular platforms
              </motion.li>
              <motion.li
                variants={fadeInUp}
                className="flex items-center"
              >
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="mr-2 text-primary"
                >
                  📊
                </motion.span>
                Comprehensive analytics dashboard
              </motion.li>
            </ul>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            className="mt-12"
          >
            <Button href="/">
              Start Exploring AuthMate Beta
            </Button>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  )
}

