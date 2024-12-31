"use client"

import { motion } from 'framer-motion'
import { Link } from 'react-router-dom';
import { HomeIcon, LayoutDashboardIcon, BookOpenIcon, MailIcon } from 'lucide-react'
import Button from "@/components/ui/Button"

const glitchAnimation = {
  hidden: {
    opacity: 0,
    y: 0,
    skew: 0
  },
  visible: {
    opacity: 1,
    y: [0, -20, 20, -10, 10, 0],
    skew: [0, -10, 10, -5, 5, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    }
  }
}

const links = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboardIcon },
  { href: '/docs', label: 'Documentation', icon: BookOpenIcon },
  { href: '/contact', label: 'Contact', icon: MailIcon },
]

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-gray-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="relative h-full w-full overflow-hidden">
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -top-40 left-0 right-0 h-[500px] rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-20 blur-3xl"
          />
          <motion.div
            animate={{
              rotate: -360,
              scale: [1.2, 1, 1.2],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-40 right-0 h-[400px] w-[400px] rounded-full bg-gradient-to-l from-blue-500 to-purple-500 opacity-20 blur-3xl"
          />
        </div>
      </div>

      <div className="relative z-10 w-full max-w-2xl mx-auto px-4 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={glitchAnimation}
          className="relative text-[150px] font-black leading-none tracking-tighter text-gray-900 dark:text-white md:text-[200px]"
        >
          404
          <motion.div
            className="absolute inset-0 text-primary opacity-50"
            style={{ clipPath: 'inset(10% 0 10% 0)' }}
            animate={{
              x: [-2, 2, -2],
              y: [-2, 2, -2],
            }}
            transition={{
              duration: 0.2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            404
          </motion.div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl"
        >
          Page not found
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-4 text-lg text-gray-600 dark:text-gray-400"
        >
          Sorry, we couldn't find the page you're looking for.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <Button to="/" className="inline-flex items-center gap-2">
            <HomeIcon className="h-4 w-4" />
            Back to Home
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            You might want to check these links
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {links.map((link) => (
              <motion.div
                key={link.href}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={link.href}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

