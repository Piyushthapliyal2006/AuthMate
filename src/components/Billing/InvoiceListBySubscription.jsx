"use client";

import { useEffect, useState } from "react";
import { getInvoicesBySubscription } from "@/api";
import SkeletonBox from "@/skeletonComponent/billing/SkeletonBox";
import { motion } from "framer-motion";

export default function InvoiceListBySubscription({ subscriptionId }) {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getInvoicesBySubscription(subscriptionId)
      .then(setInvoices)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [subscriptionId]);

  if (loading) return <SkeletonBox height={180} />;
  if (!invoices.length) return <p className="text-gray-500 dark:text-gray-400">No invoices found.</p>;

  return (
    <motion.ul
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-2"
    >
      {invoices.map((invoice) => (
        <motion.li
          key={invoice.id}
          whileHover={{ scale: 1.02 }}
          className="border p-3 rounded dark:bg-gray-800 bg-white shadow"
        >
          <p className="dark:text-white"><strong>Amount:</strong> ₹{invoice.amount_paid}</p>
          <p className="dark:text-gray-300"><strong>Paid on:</strong> {new Date(invoice.period_end).toLocaleDateString()}</p>
        </motion.li>
      ))}
    </motion.ul>
  );
}