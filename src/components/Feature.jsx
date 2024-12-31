// import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'

// const features = [
//   {
//     name: 'Quick Integration',
//     description:
//       'Effortless API integration with full guides to get your authentication system live fast. Perfect for developers looking to save time and focus on core features.',
//     icon: CloudArrowUpIcon,
//   },
//   {
//     name: 'Powerful User Dashboard',
//     description:
//       'Manage and monitor your users easily across all your projects from a single, intuitive dashboard. Stay informed and in control with detailed insights and tools.',
//     icon: ServerIcon,
//   },
//   {
//     name: 'Unique Project Credentials',
//     description:
//       'Create unique API keys for each project to enhance security and maintain control. Ideal for developers managing multiple websites or applications.',
//     icon: LockClosedIcon,
//   },
// ]

// export default function Feature() {
//   return (
//     <div className="overflow-hidden bg-white py-24 sm:py-32" id='features'>
//       <div className="mx-auto max-w-7xl px-6 lg:px-8">
//         <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
//           <div className="lg:pr-8 lg:pt-4">
//             <div className="lg:max-w-lg">
//               <h2 className="text-base/7 font-semibold text-indigo-600">Deploy faster</h2>
//               <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
//                 A better workflow
//               </p>
//               <p className="mt-6 text-lg/8 text-gray-600">
//                 AuthMate helps you seamlessly integrate authentication, manage users, and keep your platforms secure without the hassle.
//               </p>
//               <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-gray-600 lg:max-w-none">
//                 {features.map((feature) => (
//                   <div key={feature.name} className="relative pl-9">
//                     <dt className="inline font-semibold text-gray-900">
//                       <feature.icon aria-hidden="true" className="absolute left-1 top-1 h-5 w-5 text-indigo-600" />
//                       {feature.name}
//                     </dt>{' '}
//                     <dd className="inline">{feature.description}</dd>
//                   </div>
//                 ))}
//               </dl>
//             </div>
//           </div>
//           <img
//             alt="AuthMate dashboard"
//             src="https://tailwindui.com/plus/img/component-images/dark-project-app-screenshot.png" // Replace with actual AuthMate dashboard or relevant image
//             width={2432}
//             height={1442}
//             className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
//           />
//         </div>
//       </div>
//     </div>
//   )
// }

"use client"

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


