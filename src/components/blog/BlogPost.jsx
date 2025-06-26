"use client"

import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { CalendarIcon, ArrowLeft } from 'lucide-react'

export default function BlogPost({ post }) {
  return (
    <article className="py-8 sm:py-12">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to blog
          </Link>

          <div className="flex flex-col items-center text-center mb-12">
            <Link
              to={post.category.toLowerCase()}
              className="rounded-full px-3 py-1 text-sm font-medium bg-primary/90 text-white"
            >
              {post.category}
            </Link>
            <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              {post.title}
            </h1>
            <div className="mt-6 flex items-center gap-x-4 text-sm text-gray-500 dark:text-gray-400">
              <time dateTime={post.date} className="flex items-center">
                <CalendarIcon className="mr-1 h-4 w-4" />
                {new Date(post.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </time>
              <span>·</span>
              <div className="flex items-center gap-x-2">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  width={24}
                  height={24}
                  className="h-6 w-6 rounded-full bg-gray-100"
                />
                <span>{post.author.name}</span>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="relative"
          >
            <img
              src={post.coverImage}
              alt={post.title}
              width={1200}
              height={600}
              className="aspect-video w-full rounded-2xl object-cover"
              priority
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="prose prose-lg dark:prose-invert mx-auto mt-12"
          >
            {post.content.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-8 flex flex-wrap gap-2"
          >
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full bg-gray-100 dark:bg-gray-800 px-3 py-1 text-sm font-medium text-gray-600 dark:text-gray-300"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </article>
  )
}

