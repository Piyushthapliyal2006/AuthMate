import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { CalendarIcon } from 'lucide-react'
import axios from 'axios'

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

function SkeletonCard() {
  return (
    <div
      className="
        animate-pulse rounded-2xl
        bg-white/70 dark:bg-gray-900/70
        backdrop-blur-md
        border border-gray-200 dark:border-gray-700
        shadow-lg dark:shadow-black/60
        p-4 space-y-4
      "
    >
      <div className="h-48 bg-gray-200 dark:bg-gray-800 rounded-md w-full"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
      <div className="flex items-center gap-4 mt-4">
        <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-800"></div>
        <div className="space-y-2">
          <div className="h-3 w-24 bg-gray-300 dark:bg-gray-600 rounded"></div>
          <div className="h-3 w-16 bg-gray-300 dark:bg-gray-600 rounded"></div>
        </div>
      </div>
    </div>
  )
}

export default function BlogList() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [next, setNext] = useState(null)
  const [prev, setPrev] = useState(null)
  const [page, setPage] = useState(1)
  const [categoryFilter, setCategoryFilter] = useState('')
  const [tagFilter, setTagFilter] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery)
  const [sortOrder, setSortOrder] = useState('newest') // or 'oldest'

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery)
      setPage(1)
    }, 500)

    return () => clearTimeout(handler)
  }, [searchQuery])

  const fetchPosts = async (page = 1, category = '', tag = '', search = '', sort = 'newest') => {
    try {
      setLoading(true)
      const params = { page }
      if (category) params.category = category
      if (tag) params.tag = tag
      if (search) params.search = search
      if (sort) params.ordering = sort === 'newest' ? '-timeStamp' : 'timeStamp'

      const res = await axios.get('http://127.0.0.1:8000/api/posts/', { params })
      setPosts(res.data.results)
      setNext(res.data.next)
      setPrev(res.data.previous)
    } catch (err) {
      console.error('Failed to load posts:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts(page, categoryFilter, tagFilter, debouncedSearch, sortOrder)
  }, [page, categoryFilter, tagFilter, debouncedSearch, sortOrder])

  const handleCategoryFilter = (category) => {
    setCategoryFilter(category)
    setPage(1)
  }

  const handleTagFilter = (tag) => {
    setTagFilter(tag)
    setPage(1)
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleSortChange = (e) => {
    setSortOrder(e.target.value)
    setPage(1)
  }

  const allTags = Array.from(new Set(posts.flatMap(post => post.tags)))

  return (
    <div className="py-24 sm:py-32 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
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
            className="mt-2 text-lg leading-8 text-gray-600 dark:text-gray-400"
          >
            Insights, tutorials, and updates from the AuthMate team
          </motion.p>
        </motion.div>

        {/* Search and Sort Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-10 max-w-3xl mx-auto">
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full sm:w-2/3 rounded-md border border-gray-600 bg-gray-800 px-4 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <select
            value={sortOrder}
            onChange={handleSortChange}
            className="w-full sm:w-1/3 rounded-md border border-gray-600 bg-gray-800 px-4 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>

        {/* Category Filters */}
        <div className="flex justify-center gap-4 mt-6 flex-wrap">
          {['', 'Development', 'Design', 'Marketing'].map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryFilter(cat)}
              className={`px-4 py-2 rounded-full border transition-colors
                ${
                  categoryFilter === cat
                    ? 'bg-primary text-white border-primary'
                    : 'bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700 hover:text-white'
                }
              `}
            >
              {cat === '' ? 'All' : cat}
            </button>
          ))}
        </div>

        {/* Tag Filters */}
        {allTags.length > 0 && (
          <div className="flex justify-center gap-4 mt-6 flex-wrap">
            <span className="font-semibold text-gray-300 mr-2 self-center">Filter by Tag:</span>
            <button
              onClick={() => handleTagFilter('')}
              className={`px-3 py-1 rounded-full border
                ${
                  tagFilter === ''
                    ? 'bg-primary text-white border-primary'
                    : 'bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700 hover:text-white'
                }
              `}
            >
              All
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => handleTagFilter(tag)}
                className={`px-3 py-1 rounded-full border
                  ${
                    tagFilter === tag
                      ? 'bg-primary text-white border-primary'
                      : 'bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700 hover:text-white'
                  }
                `}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        {/* Blog Grid */}
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {loading
            ? [...Array(6)].map((_, i) => <SkeletonCard key={i} />)
            : posts.map((post) => (
                <motion.article
                  key={post.sno}
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                  className="
                    flex flex-col
                    bg-white/90 dark:bg-gray-900/90
                    backdrop-blur-md
                    border border-gray-300 dark:border-gray-700
                    shadow-lg dark:shadow-black/60
                    rounded-2xl overflow-hidden
                    group transition-all duration-300
                  "
                >
                  <motion.div className="relative w-full overflow-hidden rounded-t-2xl">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      width={800}
                      height={400}
                      className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <Link
                        to={`/category/${post.category.toLowerCase()}`}
                        className="inline-block rounded-full px-3 py-1 text-sm font-medium bg-primary/90 text-white backdrop-blur-sm"
                      >
                        {post.category}
                      </Link>
                    </div>
                  </motion.div>

                  <div className="flex flex-col flex-1 p-4">
                    <div className="flex items-center gap-x-4 text-sm text-gray-400">
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
                      <p className="mt-5 text-sm leading-6 text-gray-600 dark:text-gray-300 line-clamp-4">
                        {post.excerpt || 'No excerpt available for this post.'}
                      </p>
                    </div>
                    <div className="mt-6 flex items-center gap-x-4">
                      <img
                        src={post.author?.avatar}
                        alt={post.author?.name || 'Unknown Author'}
                        width={40}
                        height={40}
                        className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-800"
                      />
                      <div className="text-sm leading-6">
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {post.author?.name || 'Unknown Author'}
                        </p>
                        <p className="text-gray-600 dark:text-gray-300">{post.author?.role}</p>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
        </div>

        {/* Pagination */}
        <nav className="flex justify-center mt-12 gap-6">
          <button
            onClick={() => prev && setPage(page - 1)}
            disabled={!prev}
            className={`rounded-md px-3 py-2 text-sm font-semibold
              ${
                prev
                  ? 'bg-primary text-white hover:bg-primary-dark focus:ring-2 focus:ring-primary'
                  : 'cursor-not-allowed bg-gray-700 text-gray-500'
              }
            `}
          >
            Previous
          </button>
          <button
            onClick={() => next && setPage(page + 1)}
            disabled={!next}
            className={`rounded-md px-3 py-2 text-sm font-semibold
              ${
                next
                  ? 'bg-primary text-white hover:bg-primary-dark focus:ring-2 focus:ring-primary'
                  : 'cursor-not-allowed bg-gray-700 text-gray-500'
              }
            `}
          >
            Next
          </button>
        </nav>
      </div>
    </div>
  )
}
