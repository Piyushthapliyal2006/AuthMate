import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from "@/components/ui/Button";
import SecondaryButton from "@/components/ui/secondary-button";
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Shield,
  Zap,
  Users,
  CheckCircle,
  Star,
  Play,
  Sparkles
} from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const floatingAnimation = {
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export default function Hero() {
  const [showModal, setShowModal] = useState(false);

  const handleModalOpen = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);

  return (
    <div className="relative isolate min-h-screen flex items-center overflow-hidden">
      {/* Enhanced Background with Image */}
      <div className="absolute inset-0 -z-10">
        <div className="relative h-full w-full overflow-hidden">
          {/* Background Image */}
          <img
            src="/Hero.webp"
            alt="Hero Background"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Conditional Dark Overlay - only in dark mode */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 dark:opacity-100 opacity-0"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 via-transparent to-purple-900/30 dark:opacity-100 opacity-20"></div>

          {/* Light mode text enhancement - subtle light overlay for better readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white/20 dark:opacity-0 opacity-100"></div>

          {/* Animated Background Elements */}
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 blur-3xl"
          />
          <motion.div
            animate={{
              rotate: -360,
              scale: [1.2, 1, 1.2],
              opacity: [0.15, 0.4, 0.15]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute top-20 -right-40 h-96 w-96 rounded-full bg-gradient-to-l from-purple-500 to-pink-500 blur-3xl"
          />
          <motion.div
            animate={{
              rotate: 180,
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.25, 0.1]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-20 left-1/2 transform -translate-x-1/2 h-64 w-64 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 blur-3xl"
          />

          {/* Floating Particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [-20, 20, -20],
                x: [-10, 10, -10],
                opacity: [0.3, 0.7, 0.3]
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5
              }}
              className={`absolute w-2 h-2 rounded-full bg-white/40 ${i % 3 === 0 ? 'top-1/4 left-1/4' :
                  i % 3 === 1 ? 'top-1/3 right-1/4' :
                    'bottom-1/3 left-3/4'
                }`}
              style={{
                transform: `translate(${i * 100}px, ${i * 80}px)`
              }}
            />
          ))}
        </div>
      </div>

      {/* Enhanced Content */}
      <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="text-center"
        >
          {/* Announcement Badge */}
          <motion.div variants={fadeInUp} className="mb-8 flex justify-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="group rounded-full px-6 py-2 text-sm font-medium backdrop-blur-lg border border-white/20 bg-white/10 text-white shadow-xl hover:bg-white/20 transition-all duration-300"
            >
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span>✨ New: Advanced security features now available</span>
                <Link to="https://docs.authmate.xyz" className="font-semibold text-blue-300 group-hover:text-blue-200 transition-colors">
                  Learn more
                  <ArrowRight className="w-3 h-3 inline ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </motion.div>

          {/* Main Heading */}
          <motion.div variants={fadeInUp} className="mx-auto max-w-4xl">
            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              <span className="block">Fast, Secure</span>
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Authentication
              </span>
              <span className="block text-4xl sm:text-3xl lg:text-4xl mt-2 text-gray-200">
                for Your Website
              </span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            variants={fadeInUp}
            className="mt-8 mx-auto max-w-2xl text-xl leading-8 text-gray-300"
          >
            AuthMate simplifies user authentication with easy APIs, secure keys, and a powerful dashboard.
            <span className="text-white font-medium"> Focus on building your product</span> while we handle the security.
          </motion.p>

          {/* Features Quick List */}
          <motion.div variants={fadeInUp} className="mt-8 flex flex-wrap justify-center gap-6 text-sm">
            {[
              { icon: Shield, text: "Enterprise Security" },
              { icon: Zap, text: "Lightning Fast" },
              { icon: Users, text: "Easy Integration" }
            ].map((feature, index) => (
              <div key={index} className="flex items-center space-x-2 text-gray-300">
                <feature.icon className="w-4 h-4 text-green-400" />
                <span>{feature.text}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeInUp}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              to="/auth/login"
              size="sm"
              variant="primary"
              className="group bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white text-lg font-semibold shadow-2xl hover:shadow-blue-500/25 transition-all duration-300"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>

            <SecondaryButton
              onClick={handleModalOpen}
              className="group bg-white/10 backdrop-blur-lg border border-white/20 text-lg font-semibold transition-all duration-300"
            >
              <Play className="w-5 h-5 mr-2" />
              <span>Watch Demo</span>
            </SecondaryButton>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div variants={fadeInUp} className="mt-16">
            <p className="text-sm text-gray-400 mb-4">Trusted by developers worldwide</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              {/* Stats */}
              {/* <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">10K+</div>
                  <div className="text-xs text-gray-400">Active Users</div>
                </div>
                <div className="w-px h-8 bg-gray-600"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">99.9%</div>
                  <div className="text-xs text-gray-400">Uptime</div>
                </div>
                <div className="w-px h-8 bg-gray-600"></div>
                <div className="text-center">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <div className="text-xs text-gray-400">5.0 Rating</div>
                </div>
              </div> */}
            </div>
          </motion.div>
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          variants={floatingAnimation}
          animate="animate"
          className="absolute top-20 left-20 hidden lg:block"
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center shadow-2xl">
            <Shield className="w-8 h-8 text-white" />
          </div>
        </motion.div>

        <motion.div
          variants={floatingAnimation}
          animate="animate"
          className="absolute top-40 right-20 hidden lg:block"
          style={{ animationDelay: '2s' }}
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center shadow-2xl">
            <Zap className="w-6 h-6 text-white" />
          </div>
        </motion.div>

        <motion.div
          variants={floatingAnimation}
          animate="animate"
          className="absolute bottom-32 left-32 hidden lg:block"
          style={{ animationDelay: '4s' }}
        >
          <div className="w-14 h-14 rounded-full bg-gradient-to-r from-indigo-400 to-cyan-500 flex items-center justify-center shadow-2xl">
            <Users className="w-7 h-7 text-white" />
          </div>
        </motion.div>
      </div>

      {/* Enhanced Demo Modal */}
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/90 backdrop-blur-lg px-6"
          role="dialog"
          aria-modal="true"
          tabIndex="-1"
          onClick={handleModalClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-900/90 backdrop-blur-xl rounded-2xl max-w-6xl w-full max-h-[90vh] relative p-2 border border-white/10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div>
                <h3 className="text-xl font-semibold text-white">AuthMate Demo</h3>
                <p className="text-sm text-gray-400">See how easy authentication can be</p>
              </div>
              <button
                onClick={handleModalClose}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-200 hover:rotate-90"
                aria-label="Close modal"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="aspect-video rounded-xl overflow-hidden bg-gray-800">
                <iframe
                  src="https://app.supademo.com/embed/cmcj2z50b787l8qsz5jjdjz44?embed_v=2"
                  loading="lazy"
                  title="AuthMate Demo"
                  allow="clipboard-write"
                  allowFullScreen
                  frameBorder="0"
                  className="w-full h-full rounded-xl"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-center p-6 border-t border-white/10">
              <Button
                to="/auth/login"
                size="lg"
                variant="primary"
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              >
                Get Started Now
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
