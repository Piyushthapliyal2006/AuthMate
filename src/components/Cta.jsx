import { motion } from 'framer-motion'
import Button from "@/components/ui/Button"
import SecondaryButton from "@/components/ui/secondary-button"

export default function Cta() {
  return (
    <div className="relative isolate overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative isolate overflow-hidden rounded-3xl"
        >
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 opacity-20 dark:opacity-40" />
            <div className="absolute inset-0 backdrop-blur-3xl" />
          </div>

          <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-40">
            {/* Text Column */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto"
            >
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Start Securing Your Website in Minutes
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                AuthMate makes it easy to integrate secure user authentication with just a few lines of code. Get started today and ensure your website is protected.
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <Button to="/auth/login">Get Started Free</Button>
                <SecondaryButton to="https://docs.authmate.xyz" variant="secondary">Visit Docs</SecondaryButton>
              </div>
            </motion.div>

            {/* Image Column */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mt-16 sm:mt-24 lg:mt-0 lg:flex-shrink-0 lg:flex-grow"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative mx-auto w-[45rem] max-w-full overflow-hidden rounded-xl shadow-xl ring-1 ring-gray-900/10 dark:ring-white/10"
              >
                <img
                  src="/Dashboard.webp"
                  alt="Dashboard preview"
                  className="w-full"
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
