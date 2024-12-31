import Header from '@/components/Headers'
import Footer from '@/components/Footer'
import PricingSection from '@/components/PricingSection'

export default function PricingPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-20 bg-white dark:bg-gray-900 content-container">
        <PricingSection />
      </main>
      <Footer />
    </>
  )
}

