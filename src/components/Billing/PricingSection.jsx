"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckIcon, StarIcon, SparklesIcon, CreditCardIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import Button from "@/components/ui/Button";
import SecondaryButton from "@/components/ui/secondary-button";
import PricingSkeleton from "@/skeletonComponent/billing/PricingSkeleton";
import { fetchPlans, createOrder, verifyPayment } from "@/api";
import { toast } from "react-hot-toast";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      duration: 0.6, 
      ease: "easeOut" 
    }
  }
};

export default function PricingSection() {
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlans()
      .then((data) => setPlans(data))
      .catch(() => toast.error("Failed to fetch plans"))
      .finally(() => setLoading(false));
  }, []);

  const handleSubscribe = async (plan_slug) => {
    try {
      const data = await createOrder(plan_slug);
      if (data.detail?.includes("Free Plan")) {
        toast.success(`Subscribed to ${data.plan_name}`);
        return;
      }

      const options = {
        key: data.razorpay_key_id,
        amount: data.amount,
        currency: data.currency,
        name: data.plan_name,
        order_id: data.order_id,
        handler: async function (response) {
          try {
            await verifyPayment({ ...response, plan_slug });
            toast.success("Subscription successful!");
          } catch (err) {
            toast.error("Payment verification failed");
          }
        },
        theme: { color: "#3b82f6" },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      toast.error("Subscription error. Please try again.");
    }
  };

  const getPrice = (price) =>
    billingCycle === "annual" ? Math.round(price * 10 * 0.9) : price;

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-r from-blue-400/30 to-purple-400/30 dark:from-blue-600/20 dark:to-purple-600/20 blur-3xl"
        />
        <motion.div
          animate={{ 
            rotate: -360,
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.4, 0.15]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 -right-40 h-96 w-96 rounded-full bg-gradient-to-l from-purple-400/30 to-pink-400/30 dark:from-purple-600/20 dark:to-pink-600/20 blur-3xl"
        />
      </div>

      <div className="relative z-10 container px-4 mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto mb-16 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium mb-6"
          >
            <SparklesIcon className="h-4 w-4" />
            Simple, Transparent Pricing
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent mb-6">
            Choose Your Perfect Plan
          </h2>
          
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Scale your authentication needs with our flexible pricing. Start free and upgrade as you grow.
          </p>
        </motion.div>

        {/* Billing Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center mb-16"
        >
          <div className="relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl p-2 shadow-xl border border-white/50 dark:border-gray-700/50">
            <div className="flex relative">
              {/* Sliding Background Highlighter */}
              <motion.div
                className="absolute top-1 bottom-1 w-1/2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl shadow-lg z-0"
                initial={false}
                animate={{
                  left: billingCycle === "monthly" ? "2px" : "50%"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{
                  width: "calc(50% - 2px)"
                }}
              />
              
              {/* Monthly Button */}
              <button
                className={`relative z-10 flex-1 px-6 py-3 text-sm font-semibold rounded-xl transition-colors duration-300 ${
                  billingCycle === "monthly"
                    ? "text-white"
                    : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                }`}
                onClick={() => setBillingCycle("monthly")}
              >
                Monthly
              </button>
              
              {/* Annual Button */}
              <button
                className={`relative z-10 flex-1 px-6 py-3 text-sm font-semibold rounded-xl transition-colors duration-300 ${
                  billingCycle === "annual"
                    ? "text-white"
                    : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                }`}
                onClick={() => setBillingCycle("annual")}
              >
                <span className="flex items-center justify-center gap-2">
                  Annual
                  <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs px-2 py-1 rounded-full font-bold">
                    Save 10%
                  </span>
                </span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-8 lg:grid-cols-3 max-w-7xl mx-auto"
        >
          {loading
            ? Array(3)
                .fill(0)
                .map((_, i) => <PricingSkeleton key={i} />)
            : plans.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  variants={cardVariants}
                  whileHover={{ 
                    y: -8, 
                    scale: 1.02,
                    transition: { duration: 0.3 }
                  }}
                  className={`relative flex flex-col bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl shadow-2xl border transition-all duration-300 overflow-hidden ${
                    plan.featured
                      ? "border-blue-300 dark:border-blue-600 ring-4 ring-blue-500/20 dark:ring-blue-400/20"
                      : "border-white/50 dark:border-gray-700/50 hover:border-blue-200 dark:hover:border-blue-800"
                  }`}
                >
                  {/* Popular Badge */}
                  {plan.featured && (
                    <div className="absolute top-0 left-0 right-0">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-center py-3 px-4">
                        <div className="flex items-center justify-center gap-2">
                          <StarIcon className="h-4 w-4" />
                          <span className="text-sm font-bold">Most Popular</span>
                          <StarIcon className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className={`p-8 ${plan.featured ? "pt-20" : "pt-8"}`}>
                    {/* Plan Header */}
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {plan.name}
                      </h3>
                      
                      <div className="mb-4">
                        <span className="text-5xl font-black bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                          ₹{getPrice(plan.price)}
                        </span>
                        <span className="text-gray-600 dark:text-gray-400 text-lg ml-1">
                          /{billingCycle === "annual" ? "year" : "month"}
                        </span>
                      </div>

                      {billingCycle === "annual" && plan.price > 0 && (
                        <div className="inline-flex items-center gap-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-sm font-medium">
                          <CheckCircleIcon className="h-4 w-4" />
                          Save ₹{Math.round(plan.price * 10 * 0.1 * 12)} annually
                        </div>
                      )}
                    </div>

                    {/* Features List */}
                    <ul className="space-y-4 mb-8 flex-1">
                      {plan.features.map((feature, featureIndex) => (
                        <motion.li
                          key={featureIndex}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * featureIndex }}
                          className="flex items-start gap-3"
                        >
                          <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mt-0.5">
                            <CheckIcon className="h-3.5 w-3.5 text-white" />
                          </div>
                          <span className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            {feature}
                          </span>
                        </motion.li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <div className="space-y-4">
                      {plan.featured ? (
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <button
                            onClick={() => handleSubscribe(plan.slug)}
                            className="w-full group relative flex items-center justify-center gap-2 px-6 py-4 text-white font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
                          >
                            {/* Animated background */}
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            
                            {/* Shimmer effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12"></div>
                            
                            <div className="relative z-10 flex items-center gap-2">
                              <CreditCardIcon className="h-5 w-5" />
                              Get Started
                            </div>
                          </button>
                        </motion.div>
                      ) : (
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <button
                            onClick={() => handleSubscribe(plan.slug)}
                            className="w-full flex items-center justify-center gap-2 px-6 py-4 text-gray-700 dark:text-gray-200 font-semibold bg-white/90 dark:bg-gray-700/90 border-2 border-gray-200 dark:border-gray-600 rounded-2xl shadow-lg hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300"
                          >
                            <ShieldCheckIcon className="h-5 w-5" />
                            Choose Plan
                          </button>
                        </motion.div>
                      )}
                      
                      <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                        {plan.price === 0 ? "No credit card required" : "Cancel anytime"}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-white/50 dark:border-gray-700/50 p-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-3">
              <ShieldCheckIcon className="h-5 w-5 text-green-500" />
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Trusted by developers worldwide
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              30-day money-back guarantee • Secure payments • No setup fees
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
