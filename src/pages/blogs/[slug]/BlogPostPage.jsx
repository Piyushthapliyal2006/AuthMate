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
        const res = await axios.get(`http://127.0.0.1:8000/api/blog/posts/${slug}/`)
        setPost(res.data)
      } catch (err) {
        console.error(err)
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
    return <div className="py-20 text-center">Loading post...</div>
  if (error)
    return <div className="py-20 text-center text-red-500">{error}</div>

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white dark:bg-gray-900 pt-24">
        <BlogPost post={post} />
      </main>
      <Footer />
    </>
  )
}
