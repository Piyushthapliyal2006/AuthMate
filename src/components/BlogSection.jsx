import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CalendarIcon } from 'lucide-react';
import axios from 'axios';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

// Helper to format ISO date string to readable format
function formatDate(dateString) {
  if (!dateString) return '';
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, options);
}

export default function BlogSection() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/posts/');
        setPosts(response.data.results || response.data);
      } catch (error) {
        console.error('Failed to fetch blog posts:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  return (
    <section className="py-24 sm:py-32 bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl"
          >
            From the blog
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mt-2 text-lg leading-8 text-gray-600 dark:text-gray-300"
          >
            Learn how to grow your business with our expert advice.
          </motion.p>
        </motion.div>

        {loading ? (
          <p className="text-center mt-20 text-gray-600 dark:text-gray-400">Loading posts...</p>
        ) : posts.length === 0 ? (
          <p className="text-center mt-20 text-gray-600 dark:text-gray-400">No blog posts found.</p>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3"
          >
            {posts.map((post) => (
              <motion.article
                key={post.id}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="
                  rounded-2xl p-8
                  bg-white/70 dark:bg-gray-800/30
                  backdrop-blur-md
                  border border-gray-200 dark:border-white/20
                  shadow-lg dark:shadow-black/30
                  hover:border-blue-400 dark:hover:border-blue-500
                  transition-all duration-300
                "
              >
                <div className="flex items-center gap-x-4 text-xs">
                  <time
                    dateTime={post.date}
                    className="text-gray-500 flex items-center"
                    aria-label={`Published on ${formatDate(post.date)}`}
                  >
                    <CalendarIcon className="mr-1 h-4 w-4" aria-hidden="true" />
                    {formatDate(post.date)}
                  </time>
                  <span className="rounded-full bg-gray-100 dark:bg-gray-800 px-3 py-1.5 font-medium text-gray-600 dark:text-gray-400">
                    {post.category || 'Uncategorized'}
                  </span>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 dark:text-white group-hover:text-blue-500">
                    <Link
                      to={`/blog/${post.slug}`}
                      className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                    >
                      <span className="absolute inset-0" aria-hidden="true" />
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
                    {post.excerpt || 'No description available.'}
                  </p>
                </div>
                <div className="relative mt-8 flex items-center gap-x-4">
                  <img
                    src={post.author?.avatar || '/placeholder.svg'}
                    alt={post.author?.name ? `Avatar of ${post.author.name}` : 'Author avatar'}
                    className="h-10 w-10 rounded-full bg-gray-100 object-cover"
                  />
                  <div className="text-sm leading-6">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {post.author?.name || 'Unknown Author'}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">{post.author?.role || 'Contributor'}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
