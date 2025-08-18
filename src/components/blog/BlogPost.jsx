"use client"

import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { CalendarIcon, ArrowLeft, Clock, User, Tag as TagIcon, Share2, Heart, BookOpen, Eye } from 'lucide-react'

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
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
  floating: {
    y: [-10, 10, -10],
    rotate: [-1, 1, -1],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

export default function BlogPost({ post }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/20 relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.3, 1],
            opacity: [0.05, 0.2, 0.05]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -top-60 -left-60 h-96 w-96 rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 blur-3xl"
        />
        <motion.div
          animate={{ 
            rotate: -360,
            scale: [1.2, 1, 1.4],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-32 -right-60 h-[500px] w-[500px] rounded-full bg-gradient-to-l from-purple-400 via-indigo-400 to-cyan-400 blur-3xl"
        />
        <motion.div
          animate={{ 
            rotate: 180,
            scale: [1, 1.2, 1],
            opacity: [0.08, 0.25, 0.08]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 left-1/4 h-80 w-80 rounded-full bg-gradient-to-r from-emerald-400 to-blue-400 blur-3xl"
        />
      </div>

      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20`}
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
            animate={{
              y: [-20, -80, -20],
              x: [-10, 10, -10],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <motion.article
        className="relative z-10 py-12 sm:py-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          
          {/* Navigation Header */}
          <motion.header 
            variants={itemVariants}
            className="mb-12"
          >
            <Link
              to="/blogs"
              className="group inline-flex items-center gap-3 px-6 py-3 text-sm font-medium text-gray-600 dark:text-gray-300 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 rounded-2xl hover:bg-white dark:hover:bg-gray-800 hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <ArrowLeft className="h-5 w-5 group-hover:-translate-x-2 transition-transform duration-300" />
              <span>Back to blog</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </motion.header>

          {/* Hero Section */}
          <motion.section 
            variants={itemVariants}
            className="text-center mb-16 relative"
          >
            {/* Category Badge */}
            <motion.div
              variants={floatingVariants}
              animate="floating"
              className="mb-8"
            >
              <Link
                to={post.category.toLowerCase()}
                className="relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white text-sm font-semibold rounded-2xl hover:shadow-2xl hover:scale-110 transition-all duration-300 shadow-lg overflow-hidden group"
              >
                <TagIcon className="h-4 w-4 relative z-10" />
                <span className="relative z-10">{post.category}</span>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
              </Link>
            </motion.div>

            {/* Title with enhanced typography */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight mb-8 leading-tight"
            >
              <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
                {post.title}
              </span>
            </motion.h1>

            {/* Enhanced Meta Information */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center justify-center gap-6 text-sm"
            >
              {/* Date Card */}
              <motion.div 
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center gap-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg px-5 py-3 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg"
              >
                <div className="p-2 bg-blue-500/10 rounded-xl">
                  <CalendarIcon className="h-4 w-4 text-blue-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Published</p>
                  <time dateTime={post.date} className="text-gray-700 dark:text-gray-200 font-semibold">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </time>
                </div>
              </motion.div>

              {/* Author Card */}
              <motion.div 
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center gap-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg px-5 py-3 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg"
              >
                <div className="relative">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="h-10 w-10 rounded-xl object-cover ring-2 ring-purple-500/20"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl"></div>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Author</p>
                  <p className="text-gray-700 dark:text-gray-200 font-semibold">{post.author.name}</p>
                </div>
              </motion.div>

              {/* Reading Time Card */}
              <motion.div 
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center gap-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg px-5 py-3 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg"
              >
                <div className="p-2 bg-green-500/10 rounded-xl">
                  <Clock className="h-4 w-4 text-green-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Read time</p>
                  <p className="text-gray-700 dark:text-gray-200 font-semibold">5 min read</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.section>

          {/* Enhanced Cover Image */}
          <motion.section 
            variants={itemVariants}
            className="mb-20"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="relative group"
            >
              {/* Multiple layered blur effects */}
              <div className="absolute -inset-8 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 rounded-3xl blur-2xl group-hover:blur-3xl opacity-50 group-hover:opacity-70 transition-all duration-500"></div>
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400/20 to-purple-600/20 rounded-3xl blur-xl group-hover:scale-105 transition-all duration-500"></div>
              
              {/* Main image container */}
              <div className="relative bg-white/20 dark:bg-gray-800/20 backdrop-blur-lg p-3 rounded-3xl border border-white/30 dark:border-gray-700/30 shadow-2xl">
                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            </motion.div>
          </motion.section>

          {/* Action Buttons */}
          {/* <motion.section 
            variants={itemVariants}
            className="mb-16"
          >
            <motion.div 
              className="flex items-center justify-center gap-4"
              variants={containerVariants}
            >
              {[
                { icon: Heart, label: "Like", color: "red" },
                { icon: Share2, label: "Share", color: "blue" },
                { icon: BookOpen, label: "Save", color: "green" },
                { icon: Eye, label: "Views", color: "purple" }
              ].map(({ icon: Icon, label, color }, index) => (
                <motion.button
                  key={label}
                  variants={itemVariants}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-2 px-5 py-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 rounded-2xl hover:shadow-xl transition-all duration-300 group`}
                >
                  <Icon className={`h-4 w-4 text-${color}-500 group-hover:scale-110 transition-transform duration-200`} />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{label}</span>
                </motion.button>
              ))}
            </motion.div>
          </motion.section> */}

          {/* Enhanced Content Section */}
          <motion.section 
            variants={itemVariants}
            className="mb-16"
          >
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ duration: 0.3 }}
              className="relative group"
            >
              {/* Animated background */}
              <div className="absolute -inset-8 bg-gradient-to-br from-white/40 via-blue-50/40 to-purple-50/40 dark:from-gray-800/40 dark:via-blue-900/20 dark:to-purple-900/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
              
              {/* Content container */}
              <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl p-8 lg:p-16 border border-white/30 dark:border-gray-700/30 shadow-2xl">
                {/* Content header */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-8"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                    <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Article Content</span>
                  </div>
                </motion.div>

                {/* HTML Content */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="prose prose-lg dark:prose-invert prose-blue max-w-none"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                  style={{
                    // Enhanced custom styles for HTML content
                    '--tw-prose-body': 'rgb(55 65 81)',
                    '--tw-prose-headings': 'rgb(17 24 39)',
                    '--tw-prose-links': 'rgb(59 130 246)',
                    '--tw-prose-bold': 'rgb(17 24 39)',
                    '--tw-prose-counters': 'rgb(107 114 128)',
                    '--tw-prose-bullets': 'rgb(209 213 219)',
                    '--tw-prose-hr': 'rgb(229 231 235)',
                    '--tw-prose-quotes': 'rgb(17 24 39)',
                    '--tw-prose-quote-borders': 'rgb(229 231 235)',
                    '--tw-prose-captions': 'rgb(107 114 128)',
                    '--tw-prose-code': 'rgb(17 24 39)',
                    '--tw-prose-pre-code': 'rgb(229 231 235)',
                    '--tw-prose-pre-bg': 'rgb(17 24 39)',
                    '--tw-prose-th-borders': 'rgb(209 213 219)',
                    '--tw-prose-td-borders': 'rgb(229 231 235)',
                    
                    // Dark mode styles
                    '--tw-prose-invert-body': 'rgb(209 213 219)',
                    '--tw-prose-invert-headings': 'rgb(255 255 255)',
                    '--tw-prose-invert-links': 'rgb(96 165 250)',
                    '--tw-prose-invert-bold': 'rgb(255 255 255)',
                    '--tw-prose-invert-counters': 'rgb(156 163 175)',
                    '--tw-prose-invert-bullets': 'rgb(75 85 99)',
                    '--tw-prose-invert-hr': 'rgb(55 65 81)',
                    '--tw-prose-invert-quotes': 'rgb(243 244 246)',
                    '--tw-prose-invert-quote-borders': 'rgb(55 65 81)',
                    '--tw-prose-invert-captions': 'rgb(156 163 175)',
                    '--tw-prose-invert-code': 'rgb(255 255 255)',
                    '--tw-prose-invert-pre-code': 'rgb(209 213 219)',
                    '--tw-prose-invert-pre-bg': 'rgb(0 0 0 / 0.5)',
                    '--tw-prose-invert-th-borders': 'rgb(75 85 99)',
                    '--tw-prose-invert-td-borders': 'rgb(55 65 81)',
                  }}
                />
              </div>
            </motion.div>
          </motion.section>

          {/* Enhanced Tags Section */}
          <motion.section 
            variants={itemVariants}
            className="mb-12"
          >
            <motion.div 
              className="text-center"
              variants={containerVariants}
            >
              <motion.div 
                variants={itemVariants}
                className="mb-8"
              >
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                  <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Tags</span>
                  <div className="h-1 w-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex flex-wrap gap-4 justify-center"
                variants={containerVariants}
              >
                {post.tags.map((tag, index) => (
                  <motion.span
                    key={tag}
                    variants={itemVariants}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    custom={index}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-100/90 via-white/90 to-gray-100/90 dark:from-gray-700/90 dark:via-gray-600/90 dark:to-gray-700/90 text-gray-700 dark:text-gray-200 text-sm font-semibold rounded-2xl backdrop-blur-lg border border-gray-200/50 dark:border-gray-600/50 hover:from-blue-100 hover:to-purple-100 dark:hover:from-blue-800/50 dark:hover:to-purple-800/50 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl group"
                  >
                    <TagIcon className="h-4 w-4 group-hover:rotate-12 transition-transform duration-200" />
                    <span>{tag}</span>
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          </motion.section>
        </div>
      </motion.article>
    </div>
  )
}

