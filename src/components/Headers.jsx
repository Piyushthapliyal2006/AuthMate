"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Menu, X } from 'lucide-react'
import { Button, SecondaryButton} from "@/components/index";
import { useTheme } from '@/components/contexts/theme-context'
import { Link } from 'react-router-dom'

const navigation = [
  { name: 'Docs', href: 'https://docs.authmate.xyz' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Blogs', href: '/blogs' },
  { name: 'Beta', href: '/beta' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed w-full top-0 z-50 bg-white dark:bg-gray-900 h-16"
    >
      <nav className="mx-auto flex items-center justify-between p-6 lg:px-8 backdrop-blur-lg bg-white/70 dark:bg-gray-900/70 border-b border-gray-200 dark:border-gray-800">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex lg:flex-1"
        >
          <Link to="/" className="flex items-center gap-2">
            <span className="sr-only">AuthMate</span>
            <motion.img
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
              src="/favicon.svg"
              alt="Logo"
              className="h-16 w-auto"
            />
          </Link>
        </motion.div>

        <div className="flex lg:hidden">
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="text-gray-700 dark:text-gray-200"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open mobile menu"
          >
            <Menu className="h-6 w-6" />
          </motion.button>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="hidden lg:flex lg:gap-x-12"
        >
          {navigation.map((item) => (
            <motion.div
              key={item.name}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to={item.href}
                className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100 hover:text-primary"
              >
                {item.name}
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </motion.button>
          <SecondaryButton to="/auth/login">Log in</SecondaryButton>
          <Button to="/auth/signup">Sign up</Button>
        </motion.div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-gray-500 bg-opacity-75 z-[99]"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close mobile menu"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 right-0 z-[101] w-full overflow-y-auto bg-white dark:bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-8">
                <Link to="/" className="-m-1.5 p-1.5">
                  <span className="sr-only">AuthMate</span>
                  <img
                    className="h-8 w-auto"
                    src="/placeholder.svg"
                    alt="Logo"
                  />
                </Link>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-700 dark:text-gray-200"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close mobile menu"
                >
                  <X className="h-6 w-6" />
                </motion.button>
              </div>
              <nav className="flex-grow">
                <ul className="space-y-4">
                  {navigation.map((item) => (
                    <motion.li
                      key={item.name}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        to={item.href}
                        className="block py-2 text-base font-semibold leading-7 text-gray-900 dark:text-gray-100 hover:text-primary"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>
              <div className="mt-auto pt-6 border-t border-gray-200 dark:border-gray-700">
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 180 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleTheme}
                  className="mb-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                  aria-label="Toggle theme"
                >
                  {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </motion.button>
                <div className="space-y-3">
                  <SecondaryButton to="/auth/login" className="w-full justify-center">Log in</SecondaryButton>
                  <Button to="/auth/signup" className="w-full justify-center">Sign up</Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
