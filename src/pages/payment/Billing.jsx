import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaFileInvoiceDollar,
  FaRegCreditCard,
  FaArrowUpRightFromSquare,
} from 'react-icons/fa6';
import { FaCalendarAlt, FaFileAlt, FaTimesCircle } from 'react-icons/fa';

function Billing() {
  let invoiceId = 1;
  return (
    <main className="min-h-screen pt-24 bg-white dark:bg-gray-900 content-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-6 max-w-5xl mx-auto bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md"
      >
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Billing Overview</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Invoices */}
          <BillingCard
            to="/settings/billing/invoice"
            icon={<FaFileInvoiceDollar className="text-2xl text-indigo-500" />}
            title="Invoices"
            description="View all your billing invoices."
          />

          {/* Subscriptions */}
          <BillingCard
            to="/settings/billing/subscription"
            icon={<FaRegCreditCard className="text-2xl text-green-500" />}
            title="Subscriptions"
            description="Manage your active subscriptions."
          />

          {/* Upgrade */}
          <BillingCard
            to="/pricing"
            icon={<FaArrowUpRightFromSquare className="text-2xl text-orange-500" />}
            title="Upgrade Plan"
            description="Upgrade or change your current plan."
          />

          {/* Upcoming Invoice */}
          <BillingCard
            to="/settings/billing/invoice/upcoming"
            icon={<FaCalendarAlt className="text-2xl text-purple-500" />}
            title="Upcoming Invoice"
            description="Check the next billing invoice details."
          />

          {/* Invoice Detail */}
          <BillingCard
            to={`/settings/billing/invoice/detail/${invoiceId}`}
            icon={<FaFileAlt className="text-2xl text-blue-400" />}
            title="Invoice Detail"
            description="See details of a specific invoice."
          />

          {/* Cancel Subscription */}
          <BillingCard
            to="/settings/billing/subscription/cancel"
            icon={<FaTimesCircle className="text-2xl text-red-500" />}
            title="Cancel Subscription"
            description="Cancel your active plan subscription."
          />
        </div>
      </motion.div>
    </main>
  );
}

function BillingCard({ to, icon, title, description }) {
  return (
    <Link
      to={to}
      className="flex items-start gap-4 p-5 w-full rounded-lg bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100 transition duration-300 shadow-md"
    >
      <div className="mt-1">{icon}</div>
      <div>
        <div className="text-lg font-semibold mb-1">{title}</div>
        <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
      </div>
    </Link>
  );
}

export default Billing;
