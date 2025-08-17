import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  CalendarIcon, 
  SearchIcon, 
  FilterIcon, 
  SortAscIcon,
  SortDescIcon,
  BookOpenIcon,
  ClockIcon,
  UserIcon,
  TagIcon,
  TrendingUpIcon,
  ArrowRightIcon,
  EyeIcon,
  HeartIcon,
  ShareIcon,
  Sparkles,
  Grid3X3Icon,
  ListIcon
} from 'lucide-react'
import axios from 'axios'

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { 
      duration: 0.6,
      staggerChildren: 0.1,
      ease: "easeOut"
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
}

const headerVariants = {
  hidden: { opacity: 0, y: -20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
}

const filterVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
}

function SkeletonCard() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="group relative overflow-hidden rounded-3xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 shadow-xl"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20"></div>
      
      <div className="relative p-8 space-y-6">
        {/* Image skeleton */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 h-48 w-full">
          <motion.div
            animate={{ x: [-100, 400] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          />
        </div>
        
        {/* Content skeleton */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-full w-16 relative overflow-hidden">
              <motion.div
                animate={{ x: [-50, 100] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              />
            </div>
            <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-full w-20 relative overflow-hidden">
              <motion.div
                animate={{ x: [-50, 100] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              />
            </div>
          </div>
          
          <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-lg w-3/4 relative overflow-hidden">
            <motion.div
              animate={{ x: [-100, 200] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            />
          </div>
          
          <div className="space-y-2">
            <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded w-full relative overflow-hidden">
              <motion.div
                animate={{ x: [-100, 300] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              />
            </div>
            <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded w-5/6 relative overflow-hidden">
              <motion.div
                animate={{ x: [-100, 250] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              />
            </div>
          </div>
        </div>
        
        {/* Author skeleton */}
        <div className="flex items-center space-x-3 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 relative overflow-hidden">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            />
          </div>
          <div className="space-y-2">
            <div className="h-3 w-24 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded relative overflow-hidden">
              <motion.div
                animate={{ x: [-50, 100] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              />
            </div>
            <div className="h-3 w-16 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded relative overflow-hidden">
              <motion.div
                animate={{ x: [-50, 80] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 1.4 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
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
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
  const [showFilters, setShowFilters] = useState(false)
  const [error, setError] = useState(null)

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
      setError(null)
      const params = { page }
      if (category) params.category = category
      if (tag) params.tag = tag
      if (search) params.search = search
      if (sort) params.ordering = sort === 'newest' ? '-timeStamp' : 'timeStamp'

      // Use environment variable for API URL (consistent with BlogSection.jsx)
      const apiUrl = `${import.meta.env.VITE_PROD_BASE_URL}/api/posts/`
    
      
      const res = await axios.get(apiUrl, { params })
    
      
      // Handle different response structures and validate data
      const postsData = res.data.results || res.data || []
      const validPosts = Array.isArray(postsData) ? postsData : []
      
      setPosts(validPosts)
      setNext(res.data.next)
      setPrev(res.data.previous)

    } catch (err) {
      setError({
        message: 'Failed to load blog posts',
        details: err.response?.status === 404
          ? 'API endpoint not found'
          : 'Make sure the backend server is running'
      })
      
      setError({
        message: 'Failed to load blog posts',
        details: err.response?.status === 404 
          ? 'API endpoint not found' 
          : 'Make sure the backend server is running on http://127.0.0.1:8000'
      })
      // Keep existing posts on error, don't clear them
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
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-blue-900/10 dark:to-purple-900/10">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            y: [-20, 20, -20],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-32 h-32 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-500/20 blur-xl"
        />
        <motion.div
          animate={{ 
            y: [20, -20, 20],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-60 right-20 w-40 h-40 rounded-full bg-gradient-to-br from-purple-400/20 to-pink-500/20 blur-xl"
        />
        <motion.div
          animate={{ 
            y: [-10, 10, -10],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-40 left-1/2 w-24 h-24 rounded-full bg-gradient-to-br from-indigo-400/20 to-blue-500/20 blur-xl"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
        {/* Enhanced Header */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate="show"
          className="mx-auto max-w-4xl text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 dark:border-purple-500/20 mb-6"
          >
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Knowledge Hub</span>
          </motion.div>
          
          <motion.h1
            variants={itemVariants}
            className="text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent sm:text-6xl"
          >
            Latest Blog Posts
          </motion.h1>
          
          <motion.p
            variants={itemVariants}
            className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Explore insights, tutorials, and industry updates from our team of experts. Stay ahead with the latest trends in authentication and user management.
          </motion.p>

          {/* Stats */}
          {/* <motion.div
            variants={itemVariants}
            className="mt-8 flex items-center justify-center space-x-8"
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{posts.length}+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Articles</div>
            </div>
            <div className="w-px h-8 bg-gray-300 dark:bg-gray-700"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">50K+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Readers</div>
            </div>
            <div className="w-px h-8 bg-gray-300 dark:bg-gray-700"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">Weekly</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Updates</div>
            </div>
          </motion.div> */}
        </motion.div>

        {/* Enhanced Search and Controls */}
        <motion.div
          variants={filterVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-12"
        >
          {/* Search and View Toggle */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-8">
            <div className="flex-1 max-w-2xl relative">
              <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for articles, tutorials, guides..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent shadow-lg transition-all duration-300"
              />
            </div>
            
            <div className="flex items-center space-x-4">
              {/* View Mode Toggle */}
              <div className="flex items-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl border border-gray-200/50 dark:border-gray-700/50 p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === 'grid'
                      ? 'bg-blue-500 text-white shadow-lg'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <Grid3X3Icon className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === 'list'
                      ? 'bg-blue-500 text-white shadow-lg'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <ListIcon className="w-5 h-5" />
                </button>
              </div>

              {/* Sort Control */}
              <div className="relative">
                <select
                  value={sortOrder}
                  onChange={handleSortChange}
                  className="appearance-none bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 rounded-xl px-4 py-3 pr-10 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 shadow-lg"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                </select>
                {sortOrder === 'newest' ? (
                  <SortDescIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                ) : (
                  <SortAscIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                )}
              </div>

              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`p-3 rounded-xl border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-lg transition-all duration-300 shadow-lg ${
                  showFilters
                    ? 'bg-blue-500 text-white'
                    : 'bg-white/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <FilterIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Filter Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-6 shadow-lg">
                  {/* Category Filters */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                      <BookOpenIcon className="w-4 h-4 mr-2" />
                      Categories
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {['', 'Development', 'Design', 'Marketing', 'Security', 'Tutorial'].map((cat) => (
                        <motion.button
                          key={cat}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleCategoryFilter(cat)}
                          className={`px-4 py-2 rounded-full border transition-all duration-200 font-medium text-sm ${
                            categoryFilter === cat
                              ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white border-transparent shadow-lg'
                              : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400'
                          }`}
                        >
                          {cat === '' ? 'All Categories' : cat}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Tag Filters */}
                  {allTags.length > 0 && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                        <TagIcon className="w-4 h-4 mr-2" />
                        Tags
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleTagFilter('')}
                          className={`px-3 py-1.5 rounded-full border transition-all duration-200 text-xs font-medium ${
                            tagFilter === ''
                              ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white border-transparent'
                              : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400'
                          }`}
                        >
                          All Tags
                        </motion.button>
                        {allTags.map(tag => (
                          <motion.button
                            key={tag}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleTagFilter(tag)}
                            className={`px-3 py-1.5 rounded-full border transition-all duration-200 text-xs font-medium ${
                              tagFilter === tag
                                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white border-transparent'
                                : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400'
                            }`}
                          >
                            {tag}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Error Display */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl max-w-4xl mx-auto"
          >
            <div className="flex items-center space-x-2 text-red-700 dark:text-red-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="font-medium">{error.message}</p>
                <p className="text-sm opacity-75">{error.details}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Enhanced Blog Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className={`mx-auto ${
            viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' 
              : 'max-w-4xl space-y-8'
          }`}
        >
          {loading
            ? [...Array(6)].map((_, i) => <SkeletonCard key={i} />)
            : posts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="col-span-full flex flex-col items-center justify-center py-20"
              >
                <div className="text-center">
                  <BookOpenIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No posts found</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">Try adjusting your search or filter criteria</p>
                  <button
                    onClick={() => {
                      setSearchQuery('')
                      setCategoryFilter('')
                      setTagFilter('')
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg"
                  >
                    Clear Filters
                  </button>
                </div>
              </motion.div>
            ) : (
              posts.map((post, index) => (
                viewMode === 'grid' ? (
                  <motion.article
                    key={post.sno}
                    variants={itemVariants}
                    whileHover={{ 
                      y: -12,
                      scale: 1.02,
                      transition: { duration: 0.3, ease: "easeOut" }
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative overflow-hidden rounded-3xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-500"
                  >
                    {/* Card gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/10 dark:to-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Floating elements */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <motion.div
                        animate={{ 
                          y: [-5, 5, -5],
                          opacity: [0.2, 0.4, 0.2]
                        }}
                        transition={{ 
                          duration: 4 + index, 
                          repeat: Infinity, 
                          ease: "easeInOut" 
                        }}
                        className="absolute top-4 right-4 w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 opacity-40"
                      />
                    </div>

                    {/* Featured Image */}
                    <div className="relative overflow-hidden rounded-t-3xl">
                      <img
                        src={post.coverImage || '/api/placeholder/800/400'}
                        alt={post.title}
                        className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-xs font-medium text-gray-900 dark:text-white border border-white/50 dark:border-gray-700/50">
                          <TagIcon className="w-3 h-3" />
                          <span>{post.category || 'Article'}</span>
                        </span>
                      </div>

                      {/* Reading time */}
                      <div className="absolute top-4 right-4">
                        <span className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm text-xs font-medium text-white">
                          <ClockIcon className="w-3 h-3" />
                          <span>5 min read</span>
                        </span>
                      </div>

                      {/* Engagement stats */}
                      <div className="absolute bottom-4 right-4 flex items-center space-x-3">
                        <div className="flex items-center space-x-1 text-white/80 text-xs">
                          <EyeIcon className="w-3 h-3" />
                          <span>1.2k</span>
                        </div>
                        <div className="flex items-center space-x-1 text-white/80 text-xs">
                          <HeartIcon className="w-3 h-3" />
                          <span>45</span>
                        </div>
                      </div>
                    </div>

                    <div className="relative p-6">
                      {/* Post metadata */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
                          <CalendarIcon className="w-3 h-3" />
                          <time dateTime={post.date}>
                            {new Date(post.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </time>
                        </div>
                      </div>

                      {/* Post content */}
                      <div className="space-y-3">
                        <h3 className="text-lg font-bold leading-tight text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
                          <Link to={`/blogs/${post.slug}`} className="stretched-link">
                            {post.title}
                          </Link>
                        </h3>
                        
                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-3 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
                          {post.excerpt || 'Discover insights and best practices from our team of experts.'}
                        </p>
                      </div>

                      {/* Author section */}
                      <div className="mt-6 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="relative">
                              <img
                                src={post.author?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(post.author?.name || 'Author')}&background=4F46E5&color=fff`}
                                alt={post.author?.name || 'Author'}
                                className="w-8 h-8 rounded-full object-cover ring-2 ring-gray-200 dark:ring-gray-700 group-hover:ring-blue-500/50 transition-all duration-300"
                              />
                              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                            </div>
                            <div>
                              <p className="text-xs font-medium text-gray-900 dark:text-white">
                                {post.author?.name || 'AuthMate Team'}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {post.author?.role || 'Content Expert'}
                              </p>
                            </div>
                          </div>
                          
                          <motion.div
                            whileHover={{ x: 4 }}
                            className="flex items-center space-x-1 text-xs font-medium text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          >
                            <span>Read more</span>
                            <ArrowRightIcon className="w-3 h-3" />
                          </motion.div>
                        </div>
                      </div>
                    </div>

                    {/* Hover border effect */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  </motion.article>
                ) : (
                  // List View
                  <motion.article
                    key={post.sno}
                    variants={itemVariants}
                    whileHover={{ x: 8 }}
                    className="group flex items-center space-x-6 p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {/* Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={post.coverImage || '/api/placeholder/200/120'}
                        alt={post.title}
                        className="w-32 h-20 object-cover rounded-xl"
                      />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full">
                          {post.category || 'Article'}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(post.date).toLocaleDateString()}
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1 mb-2">
                        <Link to={`/blogs/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h3>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">
                        {post.excerpt || 'Discover insights and best practices from our team of experts.'}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <img
                            src={post.author?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(post.author?.name || 'Author')}&background=4F46E5&color=fff`}
                            alt={post.author?.name || 'Author'}
                            className="w-6 h-6 rounded-full"
                          />
                          <span className="text-xs text-gray-600 dark:text-gray-400">
                            {post.author?.name || 'AuthMate Team'}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                          <div className="flex items-center space-x-1">
                            <ClockIcon className="w-3 h-3" />
                            <span>5 min</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <EyeIcon className="w-3 h-3" />
                            <span>1.2k</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Arrow */}
                    <div className="flex-shrink-0">
                      <ArrowRightIcon className="w-5 h-5 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </motion.article>
                )
              ))
            )}
        </motion.div>

        {/* Enhanced Pagination */}
        {(prev || next) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-16 flex justify-center items-center space-x-4"
          >
            <motion.button
              whileHover={{ scale: prev ? 1.05 : 1 }}
              whileTap={{ scale: prev ? 0.95 : 1 }}
              onClick={() => prev && setPage(page - 1)}
              disabled={!prev}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                prev
                  ? 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 text-gray-900 dark:text-white hover:border-blue-500 dark:hover:border-blue-400 shadow-lg hover:shadow-xl'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed opacity-50'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Previous</span>
            </motion.button>

            <div className="flex items-center space-x-2">
              <span className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                Page {page}
              </span>
            </div>

            <motion.button
              whileHover={{ scale: next ? 1.05 : 1 }}
              whileTap={{ scale: next ? 0.95 : 1 }}
              onClick={() => next && setPage(page + 1)}
              disabled={!next}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                next
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-lg hover:shadow-xl'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed opacity-50'
              }`}
            >
              <span>Next</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </motion.div>
        )}

        {/* Newsletter CTA */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-8 shadow-2xl"
        > */}
          {/* Background effects */}
          {/* <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 via-purple-600/90 to-indigo-600/90"></div>
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative text-center">
            <motion.div
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6"
            >
              <TrendingUpIcon className="w-4 h-4 text-white" />
              <span className="text-sm font-medium text-white">Stay Updated</span>
            </motion.div>
            
            <h3 className="text-2xl font-bold text-white mb-4">
              Never Miss an Update
            </h3>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Get the latest articles, tutorials, and industry insights delivered straight to your inbox. Join our community of developers and stay ahead of the curve.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-6 py-3 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-8 py-3 bg-white text-purple-600 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 shadow-lg"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.div> */}
      </div>
    </div>
  )
}
