import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Button from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { 
  GithubIcon, 
  InstagramIcon, 
  TwitterIcon, 
  YoutubeIcon, 
  LinkedinIcon, 
  SendIcon,
  Mail,
  Heart,
  Sparkles,
  ArrowRight,
  MapPin,
  Phone
} from 'lucide-react'

const navigation = {
  main: [
    { name: 'Dashboard', href: '/dashboard', icon: Sparkles },
    { name: 'Pricing', href: '/pricing', icon: Heart },
    { name: 'Contact', href: '/contact', icon: Mail },
  ],
  resources: [
    { name: 'Blog', href: '/blogs', icon: Sparkles },
    { name: 'Documentation', href: 'https://docs.authmate.xyz', icon: ArrowRight },
    { name: 'API Reference', href: '#', icon: ArrowRight },
  ],
  legal: [
    { name: 'Terms of Service', href: '/terms', icon: ArrowRight },
    { name: 'Privacy Policy', href: '/privacy', icon: ArrowRight },
    { name: 'Cancellation & Refunds', href: '/privacy', icon: ArrowRight },
  ],
  company: [
    { name: 'About Us', href: '/about', icon: Heart },
    { name: 'Careers', href: '/careers', icon: Sparkles },
    { name: 'Contact', href: '/contact', icon: Mail },
  ],
  social: [
    { 
      name: 'GitHub', 
      icon: GithubIcon, 
      href: 'https://github.com/AuthMate-Dev',
      color: 'hover:text-gray-900 dark:hover:text-white',
      bg: 'hover:bg-gray-100 dark:hover:bg-gray-800'
    },
    { 
      name: 'Instagram', 
      icon: InstagramIcon, 
      href: 'https://instagram.com/authmate_dev',
      color: 'hover:text-pink-600',
      bg: 'hover:bg-pink-50 dark:hover:bg-pink-900/20'
    },
    { 
      name: 'Twitter', 
      icon: TwitterIcon, 
      href: 'https://x.com/Authmate_dev',
      color: 'hover:text-blue-500',
      bg: 'hover:bg-blue-50 dark:hover:bg-blue-900/20'
    },
    { 
      name: 'YouTube', 
      icon: YoutubeIcon, 
      href: 'https://www.youtube.com/@AuthMate',
      color: 'hover:text-red-600',
      bg: 'hover:bg-red-50 dark:hover:bg-red-900/20'
    },
    { 
      name: 'LinkedIn', 
      icon: LinkedinIcon, 
      href: 'https://www.linkedin.com/company/authmate/',
      color: 'hover:text-blue-700',
      bg: 'hover:bg-blue-50 dark:hover:bg-blue-900/20'
    },
  ],
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      duration: 0.6
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
}

const socialVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden dark:bg-black/90 backdrop-blur-xl">
      
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/20"></div>
      
      {/* Additional animated background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-0 h-[500px] w-full rounded-full bg-gradient-to-r from-purple-600 to-pink-600 opacity-30 blur-3xl"
          />
        </div>
      </div>
      
      {/* Glass morphism overlay */}
      <div className="absolute inset-0 bg-white/40 dark:bg-gray-900/60 backdrop-blur-sm"></div>
      
    
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-gradient-to-r from-blue-400/30 to-purple-500/30 blur-3xl"
        />
        <motion.div
          animate={{ 
            rotate: -360,
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ 
            duration: 30, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-gradient-to-r from-purple-400/20 to-pink-500/20 blur-3xl"
        />
        <motion.div
          animate={{ 
            y: [-10, 10, -10],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-cyan-300/10 to-blue-400/10 blur-3xl"
        />
      </div>
      

      <div className="relative mx-auto max-w-7xl px-6 pb-12 pt-20 sm:pt-32 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16"
        >
          {/* Brand section */}
          <motion.div variants={itemVariants} className="lg:col-span-4">
            <div className="space-y-8">
              {/* Logo and brand */}
              <Link to="/" className="group inline-flex items-center space-x-3">
                <div className="relative">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                    className="relative h-12 w-12 rounded-2xl p-2 shadow-xl group-hover:shadow-2xl transition-all duration-300"
                  >
                    <img 
                      src="/favicon.svg" 
                      alt="AuthMate Logo" 
                      className="h-full w-full"
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400/30 to-purple-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </motion.div>
                  
                  {/* Sparkle effect */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <Sparkles className="w-4 h-4 text-yellow-400" />
                  </motion.div>
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent group-hover:from-blue-500 group-hover:via-purple-500 group-hover:to-indigo-500 transition-all duration-300">
                    AuthMate
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 -mt-1">
                    Authentication Platform
                  </p>
                </div>
              </Link>

              {/* Description */}
              <div className="space-y-4">
                <p className="text-base leading-7 text-gray-600 dark:text-gray-300">
                  Making authentication simple, secure, and scalable for developers worldwide. 
                  Build with confidence using our modern authentication solutions.
                </p>
                
                {/* Contact info */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-sm text-gray-500 dark:text-gray-400">
                    <MapPin className="w-4 h-4 text-blue-500" />
                    <span>Global • Remote First</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-gray-500 dark:text-gray-400">
                    <Mail className="w-4 h-4 text-blue-500" />
                    <a href="mailto:support@authmate.xyz" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      support@authmate.xyz
                    </a>
                  </div>
                </div>
              </div>

              {/* Social media */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  Follow Us
                </h3>
                <div className="flex space-x-3">
                  {navigation.social.map((item, index) => (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      variants={socialVariants}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ 
                        scale: 1.1, 
                        y: -2,
                        transition: { duration: 0.2 }
                      }}
                      whileTap={{ scale: 0.95 }}
                      className={`relative group p-3 rounded-xl bg-gray-100/50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400 transition-all duration-300 ${item.color} ${item.bg} backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover:border-current hover:shadow-lg`}
                      aria-label={item.name}
                    >
                      <item.icon className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Navigation sections */}
          <motion.div variants={itemVariants} className="lg:col-span-8">
            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
              
              {/* Main Navigation */}
              <div className="space-y-6">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Navigation
                </h3>
                <ul className="space-y-4">
                  {navigation.main.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        className="group flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300"
                      >
                        <item.icon className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                        <span className="group-hover:translate-x-1 transition-transform duration-200">
                          {item.name}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Resources */}
              <div className="space-y-6">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Resources
                </h3>
                <ul className="space-y-4">
                  {navigation.resources.map((item) => (
                    <li key={item.name}>
                      {item.href.startsWith('http') ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300"
                        >
                          <item.icon className="w-4 h-4 text-gray-400 group-hover:text-purple-500 transition-colors" />
                          <span className="group-hover:translate-x-1 transition-transform duration-200">
                            {item.name}
                          </span>
                        </a>
                      ) : (
                        <Link
                          to={item.href}
                          className="group flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300"
                        >
                          <item.icon className="w-4 h-4 text-gray-400 group-hover:text-purple-500 transition-colors" />
                          <span className="group-hover:translate-x-1 transition-transform duration-200">
                            {item.name}
                          </span>
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company */}
              <div className="space-y-6">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent">
                  Company
                </h3>
                <ul className="space-y-4">
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        className="group flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 transition-all duration-300"
                      >
                        <item.icon className="w-4 h-4 text-gray-400 group-hover:text-pink-500 transition-colors" />
                        <span className="group-hover:translate-x-1 transition-transform duration-200">
                          {item.name}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal */}
              <div className="space-y-6">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                  Legal
                </h3>
                <ul className="space-y-4">
                  {navigation.legal.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        className="group flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-all duration-300"
                      >
                        <item.icon className="w-4 h-4 text-gray-400 group-hover:text-green-500 transition-colors" />
                        <span className="group-hover:translate-x-1 transition-transform duration-200">
                          {item.name}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>

        

        {/* Bottom section */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-16 border-t border-gray-200/50 dark:border-gray-700/50 pt-8"
        >
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <span>&copy; {new Date().getFullYear()} AuthMate. All rights reserved.</span>
              <Heart className="w-4 h-4 text-red-500 mx-2" />
              <span>Made with love for developers</span>
            </div>
            
            <div className="mt-4 lg:mt-0">
              <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>All systems operational</span>
                </span>
                <span>Status</span>
                <span>API v2.0</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
