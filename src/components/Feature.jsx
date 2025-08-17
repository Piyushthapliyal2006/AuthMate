import { motion } from 'framer-motion'
import { 
  CloudIcon, 
  ShieldCheckIcon, 
  BoltIcon,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Zap,
  Lock,
  Settings
} from 'lucide-react'

const features = [
  {
    name: 'Lightning Fast Integration',
    description: 'Get your authentication system up and running in minutes with our comprehensive API documentation and SDKs.',
    icon: BoltIcon,
    gradient: 'from-blue-500 to-cyan-500',
    bgGradient: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20',
    iconBg: 'bg-gradient-to-br from-blue-500 to-cyan-500',
    highlights: ['5-minute setup', 'Auto-generated SDKs', 'Zero configuration']
  },
  {
    name: 'Unified Dashboard',
    description: 'Manage all your users, sessions, and security settings from a single, powerful dashboard interface.',
    icon: Settings,
    gradient: 'from-purple-500 to-pink-500',
    bgGradient: 'from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20',
    iconBg: 'bg-gradient-to-br from-purple-500 to-pink-500',
    highlights: ['Real-time analytics', 'User management', 'Session control']
  },
  {
    name: 'Enterprise Security',
    description: 'Bank-grade security with multi-factor authentication, encryption, and compliance standards built-in.',
    icon: Lock,
    gradient: 'from-green-500 to-emerald-500',
    bgGradient: 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20',
    iconBg: 'bg-gradient-to-br from-green-500 to-emerald-500',
    highlights: ['SOC 2 compliant', 'End-to-end encryption', 'Multi-factor auth']
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      ease: 'easeOut',
      duration: 0.8
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      ease: 'easeOut', 
      duration: 0.6,
      type: 'spring',
      stiffness: 100
    } 
  }
}

const featureCardVariants = {
  hidden: { opacity: 0, y: 50 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.7,
      ease: 'easeOut'
    } 
  }
}

export default function Features() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      {/* Enhanced background with multiple gradient layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/20"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-r from-blue-400/20 to-purple-500/20 blur-3xl"
        />
        <motion.div
          animate={{ 
            rotate: -360,
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ 
            duration: 30, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-gradient-to-r from-purple-400/15 to-pink-500/15 blur-3xl"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header section with enhanced styling */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center space-x-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 px-4 py-2 text-sm font-medium text-blue-700 dark:text-blue-300 backdrop-blur-sm border border-blue-200/50 dark:border-blue-700/50"
          >
            <Sparkles className="w-4 h-4" />
            <span>Power-packed Features</span>
          </motion.div>
          
          <motion.h2
            variants={itemVariants}
            className="mt-8 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight"
          >
            <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
              Everything you need to
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              deploy with confidence
            </span>
          </motion.h2>
          
          <motion.p
            variants={itemVariants}
            className="mt-6 text-xl leading-8 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            AuthMate provides enterprise-grade authentication with developer-friendly APIs, 
            comprehensive dashboards, and security features that scale with your business.
          </motion.p>

          {/* CTA section */}
          <motion.div
            variants={itemVariants}
            className="mt-10 flex items-center justify-center space-x-6"
          >
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Free tier available</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>24/7 support</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none"
        >
          <dl className="grid grid-cols-1 gap-y-12 gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <motion.div
                key={feature.name}
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
                className="group relative flex flex-col rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/10 p-8 backdrop-blur-lg shadow-md transition-all hover:shadow-xl"
              >
                <dt className="flex items-center gap-x-4 text-lg font-semibold text-gray-900 dark:text-white">
                  <span className="inline-flex items-center justify-center rounded-full bg-gray-200 dark:bg-white/10 p-2">
                    <feature.icon className="h-6 w-6 text-gray-900 dark:text-white" aria-hidden="true" />
                  </span>
                  {feature.name}
                </dt>
                <dd className="mt-4 text-base text-gray-600 dark:text-white/80 leading-relaxed">
                  {feature.description}
                </dd>
              </motion.div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  )
}
