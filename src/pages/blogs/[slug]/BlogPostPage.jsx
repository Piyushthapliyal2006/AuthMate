import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Header from '@/components/Headers'
import Footer from '@/components/Footer'
import BlogPost from '@/components/blog/BlogPost'

export default function BlogPostPage() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchBySlug() {
      try {
        setLoading(true)
        console.log('Fetching blog post with slug:', slug)
        
        // Use environment variable for API URL
        const baseURL = import.meta.env.VITE_PROD_BASE_URL || 'http://127.0.0.1:8000'
        const apiURL = `${baseURL}/api/blog/posts/${slug}/`
        console.log('API URL:', apiURL)
        
        const res = await axios.get(apiURL)
        console.log('Blog post response:', res.data)
        setPost(res.data)
      } catch (err) {
        console.error('Error fetching blog post:', err)
        console.error('Error response:', err.response)
        if (err.response?.status === 404) {
          setError('Post not found.')
        } else {
          setError('Failed to load post.')
        }
      } finally {
        setLoading(false)
      }
    }

    if (slug) fetchBySlug()
  }, [slug])

  if (loading)
    return (
      <>
        <Header />
        <main className="min-h-screen bg-white dark:bg-gray-900 pt-24">
          <div className="max-w-4xl mx-auto px-4 py-20">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-md mb-4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md mb-2 w-3/4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md mb-8 w-1/2"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-5/6"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-4/5"></div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
    
  if (error)
    return (
      <>
        <Header />
        <main className="min-h-screen bg-white dark:bg-gray-900 pt-24">
          <div className="max-w-4xl mx-auto px-4 py-20 text-center">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">Oops!</h2>
              <p className="text-red-600 dark:text-red-400 mb-6">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white dark:bg-gray-900">
        <BlogPost post={post} />
      </main>
      <Footer />
    </>
  )
}
