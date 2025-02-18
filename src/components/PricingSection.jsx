"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import Button from "@/components/ui/Button"
import SecondaryButton from "@/components/ui/secondary-button"

const plans = [
  {
    name: 'Basic',
    price: 9,
    features: ['100 API calls/day', 'Basic support', 'Single project'],
    featured: false,
  },
  {
    name: 'Pro',
    price: 29,
    features: ['1000 API calls/day', 'Priority support', 'Multiple projects', 'Advanced analytics'],
    featured: true,  // Featured plan
  },
  {
    name: 'Enterprise',
    price: 99,
    features: ['Unlimited API calls', '24/7 dedicated support', 'Custom integrations', 'SLA guarantees'],
    featured: false,
  },
]

export default function PricingSection() {
  const [billingCycle, setBillingCycle] = useState('monthly')

  return (
    <section className="py-24">
      <div className="container px-4 mx-auto">
        <div className="max-w-2xl mx-auto mb-16 text-center">
          <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Pricing Plans</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">Choose the perfect plan for your authentication needs</p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="relative inline-flex">
            <button
              className={`px-4 py-2 text-sm font-medium ${billingCycle === 'monthly' ? 'text-white bg-blue-600' : 'text-gray-700 bg-gray-200 dark:text-gray-300 dark:bg-gray-700'
                } rounded-l-lg`}
              onClick={() => setBillingCycle('monthly')}
            >
              Monthly
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium ${billingCycle === 'annual' ? 'text-white bg-blue-600' : 'text-gray-700 bg-gray-200 dark:text-gray-300 dark:bg-gray-700'
                } rounded-r-lg`}
              onClick={() => setBillingCycle('annual')}
            >
              Annual
            </button>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`flex flex-col p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg ${plan.featured ? 'border-4 border-blue-500 bg-blue-50 dark:bg-blue-900 relative' : ''}`}
            >
              {plan.featured && (
                <span className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-bl-lg">
                  Recommended
                </span>
              )}
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">${billingCycle === 'annual' ? plan.price * 10 : plan.price}</span>
                <span className="text-gray-600 dark:text-gray-400">/{billingCycle === 'annual' ? 'year' : 'month'}</span>
              </div>
              <ul className="mb-6 space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-600 dark:text-gray-400">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
              {plan.featured ? (
                <Button className="mt-auto">Choose Plan</Button>
              ) : (
                <SecondaryButton className="mt-auto">Choose Plan</SecondaryButton>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
