import Header from '@/components/Headers'
import Footer from '@/components/Footer'
import PricingSection from '@/components/Billing/PricingSection'
import { motion } from 'framer-motion'

export default function PricingPage() {
  return (
    <>
      {/* Sticky animated Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-gray-900 shadow-lg"
      >
        <Header />
      </motion.div>

      {/* Main page content */}
      <main className="min-h-screen pt-20 bg-white dark:bg-gray-900 content-container">
        <PricingSection />

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-10"
        >
          <section className="bg-gray-50 dark:bg-gray-800 py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Have questions? We have answers!
              </p>
              {/* Add your FAQ content here */}
            </div>
          </section>
        </motion.div>
      </main>

      {/* Footer */}
      <Footer />
    </>
  )
}
