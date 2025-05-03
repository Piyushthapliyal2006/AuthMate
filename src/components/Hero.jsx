import { motion } from 'framer-motion'
import Button from "@/components/ui/Button"
import SecondaryButton from "@/components/ui/secondary-button"
import { Link } from 'react-router-dom'

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export default function Hero() {
  return (
    <div className="relative isolate pt-24 min-h-screen flex items-center">
      {/* Background gradient */}
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

      <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <motion.div
          initial="initial"
          animate="animate"
          variants={{
            animate: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          className="text-center"
        >
          <motion.div
            variants={fadeInUp}
            className="relative z-10 mx-auto max-w-3xl"
          >
            <div className="mb-8 inline-flex">
              <motion.div
                variants={fadeInUp}
                className="rounded-full px-4 py-1.5 text-sm font-medium 
                  backdrop-blur-lg border border-gray-200 dark:border-gray-800 
                  bg-white/30 dark:bg-gray-900/30 
                  text-gray-900 dark:text-gray-100"
              >
                This site is currently in Beta Mode
                <Link to="/beta" className="font-semibold text-primary ml-2">
                  Read more <span aria-hidden="true">→</span>
                </Link>
              </motion.div>
            </div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-6xl"
            >
              Fast, Secure Authentication
              <br />
              for Your Website
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400"
            >
              AuthMate simplifies user authentication with easy APIs, secure keys, and a powerful dashboard—so you can focus on your product.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="mt-10 flex items-center justify-center gap-x-6"
            >
              <Button to="/auth/login">Get Started Free</Button>
              <SecondaryButton to="/demo">Watch Demo</SecondaryButton>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}