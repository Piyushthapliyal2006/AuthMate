import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CalendarIcon } from 'lucide-react';
import axios from "axios";

const posts = [
  {
    id: 1,
    title: 'Boost your conversion rate',
    href: '#',
    description:
      'Learn how to optimize your authentication flow to increase user signups and reduce drop-offs.',
    date: 'Mar 16, 2024',
    category: { title: 'Marketing', href: '#' },
    author: {
      name: 'Michael Foster',
      role: 'Co-Founder / CTO',
      href: '#',
      imageUrl: '/placeholder.svg?height=256&width=256',
    },
  },
  {
    id: 2,
    title: 'Implementing OAuth 2.0',
    href: '#',
    description:
      'A comprehensive guide to implementing OAuth 2.0 authentication in your applications.',
    date: 'Mar 10, 2024',
    category: { title: 'Technical', href: '#' },
    author: {
      name: 'Sarah Chen',
      role: 'Lead Developer',
      href: '#',
      imageUrl: '/placeholder.svg?height=256&width=256',
    },
  },
  {
    id: 3,
    title: 'Security best practices',
    href: '#',
    description:
      'Essential security practices to protect your users and maintain data integrity.',
    date: 'Mar 5, 2024',
    category: { title: 'Security', href: '#' },
    author: {
      name: 'Alex Johnson',
      role: 'Security Engineer',
      href: '#',
      imageUrl: '/placeholder.svg?height=256&width=256',
    },
  },
]


// const fetchBlogs = async () => {
//   try {
//       const response = await axios.get('http://127.0.0.1:8000/api/blog/posts', {
//           headers: {
//               Accept: "*/*",
//           },
//       });
//       console.log(response.data); // Store the fetched projects
//   } catch (error) {
//       console.error("Error fetching projects:", error);
//   }
// };

// // Fetch projects when the component mounts

//   fetchBlogs();

let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'http://127.0.0.1:8000/api/blog/posts',
  headers: {}
};

async function makeRequest() {
  try {
    const response = await axios.request(config);
    console.log(JSON.stringify(response.data));
  }
  catch (error) {
    console.log(error);
  }
}

makeRequest();


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

export default function BlogSection() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.h2 variants={itemVariants} className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            From the blog
          </motion.h2>
          <motion.p variants={itemVariants} className="mt-2 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Learn how to grow your business with our expert advice.
          </motion.p>
        </motion.div>

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
              className="backdrop-blur-lg bg-white/30 dark:bg-gray-900/30 rounded-2xl p-8 border border-gray-200 dark:border-gray-800"
            >
              <div className="flex items-center gap-x-4 text-xs">
                <time dateTime={post.date} className="text-gray-500 flex items-center">
                  <CalendarIcon className="mr-1 h-4 w-4" />
                  {post.date}
                </time>
                <Link
                  to={post.category.href}
                  className="relative z-10 rounded-full bg-gray-100 dark:bg-gray-800 px-3 py-1.5 font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  {post.category.title}
                </Link>
              </div>
              <div className="group relative">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 dark:text-white group-hover:text-primary">
                  <Link to={post.href}>
                    <span className="absolute inset-0" />
                    {post.title}
                  </Link>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
                  {post.description}
                </p>
              </div>
              <div className="relative mt-8 flex items-center gap-x-4">
                <img src={post.author.imageUrl} alt="" className="h-10 w-10 rounded-full bg-gray-100" />
                <div className="text-sm leading-6">
                  <p className="font-semibold text-gray-900 dark:text-white">
                    <Link to={post.author.href}>
                      <span className="absolute inset-0" />
                      {post.author.name}
                    </Link>
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">{post.author.role}</p>
                </div>
              </div>
            </motion.article>))}
        </motion.div>
      </div>
    </div>
  )
}