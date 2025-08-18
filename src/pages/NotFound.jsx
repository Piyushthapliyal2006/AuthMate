import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { HomeIcon, ArrowLeftIcon, BookOpenIcon, EnvelopeIcon, Squares2X2Icon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const floatingAnimation = {
  y: [-10, 10, -10],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

const glitchAnimation = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const links = [
  { href: '/', label: 'Home', icon: HomeIcon, description: 'Return to homepage' },
  { href: '/dashboard', label: 'Dashboard', icon: Squares2X2Icon, description: 'Access your dashboard' },
  { href: '/docs', label: 'Documentation', icon: BookOpenIcon, description: 'Browse our docs' },
  { href: '/contact', label: 'Contact', icon: EnvelopeIcon, description: 'Get support' },
];

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Animated Background Elements - Matching Login/Signup pages */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-r from-blue-400/60 to-purple-400/60 dark:from-blue-600/40 dark:to-purple-600/40 blur-3xl"
        />
        <motion.div
          animate={{ 
            rotate: -360,
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.4, 0.15]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 -right-40 h-96 w-96 rounded-full bg-gradient-to-l from-purple-400/60 to-pink-400/60 dark:from-purple-600/40 dark:to-pink-600/40 blur-3xl"
        />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-12">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute top-8 left-8"
        >
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 bg-white/95 dark:bg-gray-700/95 backdrop-blur-sm rounded-xl border border-blue-200 dark:border-blue-600 hover:shadow-lg transition-all duration-300"
          >
            <ArrowLeftIcon className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="font-medium">Go Back</span>
          </button>
        </motion.div>

        {/* Main Content Container */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="max-w-4xl mx-auto text-center"
        >
          {/* 404 Number with Glass Morphism */}
          <motion.div
            variants={glitchAnimation}
            className="relative mb-8"
          >
            <div className="relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl border border-white/30 dark:border-gray-600/30 p-12 shadow-2xl ring-1 ring-gray-200/50 dark:ring-gray-600/50">
              <motion.div
                animate={floatingAnimation}
                className="text-8xl md:text-9xl lg:text-[200px] font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent leading-none"
              >
                404
              </motion.div>
              
              {/* Decorative elements */}
              <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-xl"></div>
              <div className="absolute bottom-4 left-4 w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-lg"></div>
            </div>
          </motion.div>

          {/* Error Message */}
          <motion.div variants={fadeInUp} className="mb-8 space-y-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
              Oops! Page Not Found
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              The page you're looking for seems to have wandered off into the digital void. Don't worry, it happens to the best of us!
            </p>
          </motion.div>

          {/* Search Suggestion */}
          <motion.div
            variants={fadeInUp}
            className="mb-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-white/50 dark:border-gray-700/50 p-6 shadow-xl"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <MagnifyingGlassIcon className="h-6 w-6 text-blue-500 dark:text-blue-400" />
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                Looking for something specific?
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Try checking the URL for typos, or use one of the navigation links below to find what you need.
            </p>
          </motion.div>

          {/* Navigation Links Grid */}
          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            {links.map((link, index) => (
              <motion.div
                key={link.href}
                variants={fadeInUp}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="group"
              >
                <Link
                  to={link.href}
                  className="block h-full bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl border border-white/50 dark:border-gray-700/50 p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-600"
                >
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300 shadow-lg">
                      <link.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {link.label}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {link.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Additional Help */}
          <motion.div
            variants={fadeInUp}
            className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 backdrop-blur-sm rounded-2xl border border-blue-200/50 dark:border-blue-800/50 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Still Need Help?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              If you believe this is an error or need assistance, please don't hesitate to reach out to our support team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <EnvelopeIcon className="h-5 w-5" />
                Contact Support
              </Link>
              <Link
                to="/docs"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/90 dark:bg-gray-700/90 text-gray-700 dark:text-gray-200 font-medium rounded-xl border border-gray-300 dark:border-gray-600 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <BookOpenIcon className="h-5 w-5" />
                Browse Docs
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

