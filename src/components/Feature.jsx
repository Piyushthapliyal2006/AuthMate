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
      staggerChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export default function Features() {
  return (
    <div className="py-24 sm:py-32 relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.h2 variants={itemVariants} className="text-base font-semibold leading-7 text-primary">
            Deploy faster
          </motion.h2>
          <motion.p variants={itemVariants} className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
            Everything you need to deploy your app
          </motion.p>
          <motion.p variants={itemVariants} className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
            AuthMate helps you seamlessly integrate authentication, manage users, and keep your platforms secure without the hassle.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none"
        >
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <motion.div 
                key={feature.name}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="backdrop-blur-lg bg-white/30 dark:bg-gray-900/30 rounded-2xl p-8 border border-gray-200 dark:border-gray-800"
              >
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-gray-100">
                  <feature.icon className="h-5 w-5 flex-none text-primary" aria-hidden="true" />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-400">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </motion.div>
            ))}
          </dl>
        </motion.div>
      </div>
    </div>
  )
}


