import { motion } from 'framer-motion'
import { CloudIcon, ShieldCheckIcon, BoltIcon } from 'lucide-react'

const features = [
  {
    name: 'Quick Integration',
    description: 'Effortless API integration with full guides to get your authentication system live fast.',
    icon: BoltIcon,
  },
  {
    name: 'Powerful Dashboard',
    description: 'Manage users easily across all your projects from a single, intuitive dashboard.',
    icon: CloudIcon,
  },
  {
    name: 'Enterprise Security',
    description: 'Bank-grade security with unique API keys for each project to enhance control.',
    icon: ShieldCheckIcon,
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      ease: 'easeOut',
      duration: 0.6
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { ease: 'easeOut', duration: 0.5 } }
}

export default function Features() {
  return (
    <section className="relative py-24 sm:py-32 bg-white dark:bg-transparent transition-colors duration-300">
      {/* Subtle overlay with blur (only in dark mode) */}
      <div className="absolute inset-0 -z-10 hidden dark:block bg-black/30 backdrop-blur-md" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.h2
            variants={itemVariants}
            className="text-base font-semibold leading-7 text-gray-700 dark:text-white/80"
          >
            Deploy faster
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white"
          >
            Everything you need to deploy your app
          </motion.p>
          <motion.p
            variants={itemVariants}
            className="mt-6 text-lg leading-8 text-gray-600 dark:text-white/80"
          >
            AuthMate helps you seamlessly integrate authentication, manage users, and keep your platforms secure—without the hassle.
          </motion.p>
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
