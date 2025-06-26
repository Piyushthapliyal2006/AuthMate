import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Button from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { GithubIcon, InstagramIcon, TwitterIcon, YoutubeIcon, LinkedinIcon, SendIcon } from 'lucide-react'

const navigation = {
  main: [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Contact', href: '/contact' },
  ],
  resources: [
    { name: 'Blog', href: '/blogs' },
    { name: 'Documentation', href: 'https://docs.authmate.xyz' },
    { name: 'API Reference', href: '#' },
  ],
  legal: [
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Cancellation & Refunds', href: '/privacy' },
  ],
  social: [
    { name: 'GitHub', icon: GithubIcon, href: 'https://github.com/AuthMate-Dev' },
    { name: 'Instagram', icon: InstagramIcon, href: 'https://instagram.com/authmate_dev' },
    { name: 'Twitter', icon: TwitterIcon, href: 'https://x.com/Authmate_dev' },
    { name: 'YouTube', icon: YoutubeIcon, href: 'https://www.youtube.com/@AuthMate' },
    { name: 'LinkedIn', icon: LinkedinIcon, href: 'https://www.linkedin.com/company/authmate/' },
  ],
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export default function Footer() {
  return (
    <footer className="relative bg-white/30 dark:bg-black/30 backdrop-blur-xl border-t border-white/10 dark:border-gray-700/30 shadow-2xl transition-all duration-300 rounded-t-2xl">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-0 h-[500px] w-full rounded-full bg-gradient-to-r from-purple-600 to-pink-600 opacity-20 blur-3xl"
          />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 text-gray-800 dark:text-gray-100">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="xl:grid xl:grid-cols-3 xl:gap-8"
        >
          <motion.div variants={itemVariants} className="space-y-8">
            <Link to="/" className="flex items-center">
              <img className="h-20 w-auto" src="/favicon.svg" alt="AuthMate" />
              <span className="ml-2 text-xl font-bold">AuthMate</span>
            </Link>
            <p className="text-sm leading-6 text-gray-700 dark:text-gray-300">
              Making authentication simple and secure for developers worldwide.
            </p>
            <div className="flex space-x-6">
              {navigation.social.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  whileHover={{ scale: 1.2 }}
                  className="text-gray-500 hover:text-primary dark:hover:text-white"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6">Site Navigation</h3>
                <ul className="mt-6 space-y-4">
                  {navigation.main.map((item) => (
                    <li key={item.name}>
                      <Link to={item.href} className="text-sm text-gray-700 dark:text-gray-300 hover:text-primary">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6">Resources</h3>
                <ul className="mt-6 space-y-4">
                  {navigation.resources.map((item) => (
                    <li key={item.name}>
                      <Link to={item.href} className="text-sm text-gray-700 dark:text-gray-300 hover:text-primary">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6">Legal</h3>
                <ul className="mt-6 space-y-4">
                  {navigation.legal.map((item) => (
                    <li key={item.name}>
                      <Link to={item.href} className="text-sm text-gray-700 dark:text-gray-300 hover:text-primary">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6">Subscribe to our newsletter</h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Stay updated with our latest features and releases.
                </p>
                <form className="mt-6 flex max-w-md gap-x-4">
                  <Input
                    type="email"
                    required
                    placeholder="Enter your email"
                    className="min-w-0 flex-auto bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm border border-gray-300 dark:border-gray-700 text-black dark:text-white placeholder:text-gray-400"
                  />
                  <Button type="submit">
                    <SendIcon className="h-4 w-4" />
                    <span className="sr-only">Subscribe</span>
                  </Button>
                </form>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-16 border-t border-gray-900/10 dark:border-gray-100/10 pt-8 sm:mt-20 lg:mt-24"
        >
          <p className="text-xs leading-5 text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} AuthMate. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
