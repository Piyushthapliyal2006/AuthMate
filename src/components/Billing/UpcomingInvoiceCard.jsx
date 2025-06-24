"use client";

import { useEffect, useState } from "react";
import { getUpcomingInvoice } from "@/api";
import SkeletonBox from "@/skeletonComponent/billing/SkeletonBox";
import { motion } from "framer-motion";

export default function UpcomingInvoiceCard() {
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUpcomingInvoice()
      .then(setInvoice)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <SkeletonBox height={120} />;
  if (!invoice) return <p className="text-gray-500 dark:text-gray-400">No upcoming invoice.</p>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="border p-4 rounded shadow bg-white dark:bg-gray-900"
    >
      <h4 className="text-lg font-bold dark:text-white">Upcoming Invoice</h4>
      <p className="dark:text-gray-300">Amount Due: ₹{invoice.amount_due}</p>
      <p className="dark:text-gray-300">Due By: {new Date(invoice.period_end).toLocaleDateString()}</p>
    </motion.div>
  );
}