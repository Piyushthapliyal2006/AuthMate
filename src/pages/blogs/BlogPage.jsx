import Header from '@/components/Headers'
import Footer from '@/components/Footer'
import BlogList from '@/components/blog/BlogList'

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white dark:bg-gray-900">
        <BlogList />
      </main>
      <Footer />
    </>
  )
}

