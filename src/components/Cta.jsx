import { motion } from 'framer-motion'
import Button from "@/components/ui/Button"
import SecondaryButton from "@/components/ui/secondary-button"
import { 
  ArrowRight, 
  Sparkles, 
  Zap, 
  Shield, 
  Star,
  Rocket,
  CheckCircle,
  Play
} from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      duration: 0.8
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
}

const floatingVariants = {
  animate: {
    y: [-10, 10, -10],
    rotate: [0, 360],
    scale: [1, 1.1, 1],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

export default function Cta() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      {/* Enhanced background with animated gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-r from-blue-400/30 to-purple-500/30 blur-3xl"
        />
        <motion.div
          animate={{ 
            rotate: -360,
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-gradient-to-r from-purple-400/20 to-pink-500/20 blur-3xl"
        />
        
        {/* Floating particles */}
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-20 left-20 w-4 h-4 rounded-full bg-blue-400/40"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 2 }}
          className="absolute top-40 right-32 w-3 h-3 rounded-full bg-purple-400/40"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 4 }}
          className="absolute bottom-32 left-32 w-5 h-5 rounded-full bg-pink-400/40"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative overflow-hidden rounded-3xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 shadow-2xl"
        >
          {/* Gradient overlay for the card */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 dark:from-blue-400/10 dark:via-purple-400/10 dark:to-pink-400/10"></div>
          
          {/* Content container */}
          <div className="relative px-8 py-16 sm:px-16 sm:py-24 lg:flex lg:items-center lg:gap-x-16 lg:px-24 lg:py-32">
            {/* Left content */}
            <motion.div
              variants={itemVariants}
              className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center space-x-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 px-4 py-2 text-sm font-medium text-blue-700 dark:text-blue-300 backdrop-blur-sm border border-blue-200/50 dark:border-blue-700/50 mb-8"
              >
                <Rocket className="w-4 h-4" />
                <span>Ready to Launch</span>
                <Sparkles className="w-4 h-4" />
              </motion.div>

              {/* Main heading */}
              <motion.h2
                variants={itemVariants}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
              >
                <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
                  Start Securing Your
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Website in Minutes
                </span>
              </motion.h2>

              {/* Description */}
              <motion.p
                variants={itemVariants}
                className="text-lg sm:text-xl leading-8 text-gray-600 dark:text-gray-300 mb-8 max-w-2xl"
              >
                AuthMate makes it effortless to integrate enterprise-grade authentication with just a few lines of code. 
                Join thousands of developers who trust us to secure their applications.
              </motion.p>

              {/* Feature highlights */}
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10"
              >
                {[
                  { icon: Zap, text: "5-minute setup" },
                  { icon: Shield, text: "Enterprise security" },
                  { icon: Star, text: "99.9% uptime" },
                  { icon: CheckCircle, text: "Free forever plan" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                    className="flex items-center space-x-3"
                  >
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-green-400 to-green-500 flex items-center justify-center">
                      <item.icon className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {item.text}
                    </span>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA buttons */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
              >
                <Button 
                  to="/auth/signup" 
                  size="sm" 
                  className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <span className="mr-2">Get Started Free</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                >
                  <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors duration-200">
                    <Play className="w-4 h-4 ml-0.5" />
                  </div>
                  <span className="font-medium">Watch Demo</span>
                </motion.button>
              </motion.div>

              {/* Social proof */}
              {/* <motion.div
                variants={itemVariants}
                className="mt-12 pt-8 border-t border-gray-200/50 dark:border-gray-700/50"
              >
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Trusted by developers at leading companies
                </p>
                <div className="flex items-center space-x-8 opacity-60">
                  <div className="text-2xl font-bold text-gray-400">ACME</div>
                  <div className="text-2xl font-bold text-gray-400">TechCorp</div>
                  <div className="text-2xl font-bold text-gray-400">StartupXYZ</div>
                </div>
              </motion.div> */}
            </motion.div>

            {/* Right side - Dashboard preview */}
            <motion.div
              variants={itemVariants}
              className="mt-16 lg:mt-0 lg:flex-shrink-0 lg:flex-grow"
            >
              <motion.div
                whileHover={{ 
                  scale: 1.02,
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
                className="relative mx-auto w-full max-w-2xl"
              >
                {/* Floating elements around the dashboard */}
                <motion.div
                  animate={{ 
                    y: [-5, 5, -5],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ 
                    duration: 8, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  className="absolute -top-6 -right-6 w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 shadow-lg flex items-center justify-center"
                >
                  <Shield className="w-6 h-6 text-white" />
                </motion.div>
                
                <motion.div
                  animate={{ 
                    y: [5, -5, 5],
                    rotate: [360, 180, 0]
                  }}
                  transition={{ 
                    duration: 6, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: 1
                  }}
                  className="absolute -bottom-6 -left-6 w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg flex items-center justify-center"
                >
                  <Zap className="w-5 h-5 text-white" />
                </motion.div>

                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: 2
                  }}
                  className="absolute top-1/2 -right-8 w-6 h-6 rounded-full bg-gradient-to-r from-green-400 to-green-500 shadow-md"
                />

                {/* Main dashboard image container */}
                <div className="relative overflow-hidden rounded-2xl shadow-2xl ring-1 ring-gray-900/10 dark:ring-white/10 bg-white dark:bg-gray-800">
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-xl"></div>
                  
                  <motion.img
                    initial={{ opacity: 0, scale: 1.1 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    src="/Dashboard.webp"
                    alt="AuthMate Dashboard Preview"
                    className="relative w-full h-auto rounded-2xl"
                  />
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent rounded-2xl"></div>
                </div>

                {/* Stats overlay */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.6 }}
                  className="absolute -bottom-4 left-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-xl p-4 shadow-lg border border-gray-200/50 dark:border-gray-700/50"
                >
                  <div className="flex items-center justify-between text-sm">
                    <div className="text-center">
                      <div className="font-bold text-gray-900 dark:text-white">99.9%</div>
                      <div className="text-gray-500 dark:text-gray-400">Uptime</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-gray-900 dark:text-white">500ms</div>
                      <div className="text-gray-500 dark:text-gray-400">Response</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-gray-900 dark:text-white">10M+</div>
                      <div className="text-gray-500 dark:text-gray-400">Requests</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
