import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaFileInvoiceDollar, FaRegCreditCard, FaArrowUpRightFromSquare } from 'react-icons/fa6';

function Billing() {
  return (
    <>
      {/* Main content */}
      <main className="min-h-screen pt-24 bg-white dark:bg-gray-900 content-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-6 max-w-5xl mx-auto bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md"
        >
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Billing Overview</h2>

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-stretch gap-4">
            {/* Invoices */}
            <Link
              to="/settings/billing/invoice"
              className="flex items-start gap-4 p-5 w-full sm:w-1/3 rounded-lg bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100 transition duration-300 shadow-md"
            >
              <FaFileInvoiceDollar className="text-2xl mt-1 text-indigo-500" />
              <div>
                <div className="text-lg font-semibold mb-1">Invoices</div>
                <p className="text-sm text-gray-600 dark:text-gray-300">View all your billing invoices.</p>
              </div>
            </Link>

            {/* Subscriptions */}
            <Link
              to="/settings/billing/subscription"
              className="flex items-start gap-4 p-5 w-full sm:w-1/3 rounded-lg bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100 transition duration-300 shadow-md"
            >
              <FaRegCreditCard className="text-2xl mt-1 text-green-500" />
              <div>
                <div className="text-lg font-semibold mb-1">Subscriptions</div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Manage your active subscriptions.</p>
              </div>
            </Link>

            {/* Upgrade */}
            <Link
              to="/pricing"
              className="flex items-start gap-4 p-5 w-full sm:w-1/3 rounded-lg bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100 transition duration-300 shadow-md"
            >
              <FaArrowUpRightFromSquare className="text-2xl mt-1 text-orange-500" />
              <div>
                <div className="text-lg font-semibold mb-1">Upgrade Plan</div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Upgrade or change your current plan.</p>
              </div>
            </Link>
          </div>
        </motion.div>
      </main>
    </>
  );
}

export default Billing;
