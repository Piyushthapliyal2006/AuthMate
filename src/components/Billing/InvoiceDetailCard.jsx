"use client";

import { useEffect, useState } from "react";
import { getInvoiceDetail } from "@/api";
import SkeletonBox from "@/skeletonComponent/billing/SkeletonBox";
import { motion } from "framer-motion";

export default function InvoiceDetailCard({ invoiceId }) {
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getInvoiceDetail(invoiceId)
      .then(setInvoice)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [invoiceId]);

  if (loading) return <SkeletonBox height={180} />;
  if (!invoice) return <p className="text-gray-500 dark:text-gray-400">Invoice not found.</p>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="border p-4 rounded shadow bg-white dark:bg-gray-900"
    >
      <h4 className="text-lg font-bold mb-2 dark:text-white">Invoice #{invoice.id}</h4>
      <p className="dark:text-gray-300"><strong>Amount Paid:</strong> ₹{invoice.amount_paid}</p>
      <p className="dark:text-gray-300"><strong>Currency:</strong> {invoice.currency}</p>
      <p className="dark:text-gray-300">
        <strong>Period:</strong> {new Date(invoice.period_start).toLocaleDateString()} - {new Date(invoice.period_end).toLocaleDateString()}
      </p>
    </motion.div>
  );
}