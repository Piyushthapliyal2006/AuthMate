import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { CalendarIcon } from 'lucide-react'
import blogData from '@/pages/blogs/[slug]/blog-posts.json'

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

export default function BlogList() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="mx-auto max-w-2xl text-center"
        >
          <motion.h1
            variants={itemVariants}
            className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl"
          >
            Latest Blog Posts
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="mt-2 text-lg leading-8 text-gray-600 dark:text-gray-300"
          >
            Insights, tutorials, and updates from the AuthMate team
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 lg:mx-0 lg:max-w-none lg:grid-cols-3"
        >
          {blogData.posts.map((post) => (
            <motion.article
              key={post.id}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="flex flex-col group"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative w-full overflow-hidden rounded-2xl"
              >
                <img
                  src={post.coverImage}
                  alt={post.title}
                  width={800}
                  height={400}
                  className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <Link
                    to={post.category.toLowerCase()}
                    className="inline-block rounded-full px-3 py-1 text-sm font-medium bg-primary/90 text-white backdrop-blur-sm"
                  >
                    {post.category}
                  </Link>
                </div>
              </motion.div>

              <div className="flex flex-col flex-1 mt-4">
                <div className="flex items-center gap-x-4 text-sm text-gray-500 dark:text-gray-400">
                  <time dateTime={post.date} className="flex items-center">
                    <CalendarIcon className="mr-1 h-4 w-4" />
                    {new Date(post.date).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </time>
                </div>
                <div className="group relative flex flex-1 flex-col">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 dark:text-white group-hover:text-primary">
                    <Link to={`/blog/${post.slug}`}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300 line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
                <div className="relative mt-8 flex items-center gap-x-4">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full bg-gray-100"
                  />
                  <div className="text-sm leading-6">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {post.author.name}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">{post.author.role}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full bg-gray-100 dark:bg-gray-800 px-3 py-1 text-xs font-medium text-gray-600 dark:text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

