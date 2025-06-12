import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Button from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { GithubIcon, InstagramIcon, FacebookIcon, TwitterIcon, YoutubeIcon, LinkedinIcon, SendIcon } from 'lucide-react'

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
    // { name: 'Facebook', icon: FacebookIcon, href: '#' },
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
    <footer className="relative bg-white dark:bg-gray-900">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute bottom-0 left-0 right-0 h-[500px] bg-gradient-to-t from-background to-transparent dark:from-gray-800 dark:to-transparent" />
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
            className="absolute bottom-0 h-[500px] w-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-10 blur-3xl"
          />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="xl:grid xl:grid-cols-3 xl:gap-8"
        >
          <motion.div variants={itemVariants} className="space-y-8">
            <Link to="/" className="flex items-center">
              <img
                className="h-20 w-auto"
                src="/favicon.svg"
                alt="AuthMate"
              />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">AuthMate</span>
            </Link>
            <p className="text-sm leading-6 text-gray-600 dark:text-gray-300">
              Making authentication simple and secure for developers worldwide.
            </p>
            <div className="flex space-x-6">
              {navigation.social.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  whileHover={{ scale: 1.2 }}
                  className="text-gray-400 hover:text-primary"
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
                <h3 className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">Site Navigation</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.main.map((item) => (
                    <li key={item.name}>
                      <Link to={item.href} className="text-sm leading-6 text-gray-600 dark:text-gray-300 hover:text-primary">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">Resources</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.resources.map((item) => (
                    <li key={item.name}>
                      <Link to={item.href} className="text-sm leading-6 text-gray-600 dark:text-gray-300 hover:text-primary">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">Legal</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.legal.map((item) => (
                    <li key={item.name}>
                      <Link to={item.href} className="text-sm leading-6 text-gray-600 dark:text-gray-300 hover:text-primary">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">Subscribe to our newsletter</h3>
                <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
                  Stay updated with our latest features and releases.
                </p>
                <form className="mt-6 flex max-w-md gap-x-4">
                  <Input
                    type="email"
                    required
                    placeholder="Enter your email"
                    className="min-w-0 flex-auto"
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