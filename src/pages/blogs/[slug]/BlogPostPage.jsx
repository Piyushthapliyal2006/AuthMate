import Header from '@/components/Headers'
import Footer from '@/components/Footer'
import BlogPost from '@/components/blog/BlogPost'
import blogData from './blog-posts.json'



export async function generateStaticParams() {
  return blogData.posts.map((post) => ({
    slug: post.slug,
  }))
}

export default function BlogPostPage({ params }) {
  const post = blogData.posts.find((post) => post.slug === params.slug)

  if (!post) {
    return null
  }

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

