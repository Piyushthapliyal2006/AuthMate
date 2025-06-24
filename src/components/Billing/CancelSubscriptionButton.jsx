"use client";

import { useState } from "react";
import { cancelSubscription } from "@/api";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

export default function CancelSubscriptionButton({ subscriptionId, onCancel }) {
  const [loading, setLoading] = useState(false);

  const handleCancel = async () => {
    setLoading(true);
    try {
      await cancelSubscription(subscriptionId);
      toast.success("Subscription canceled successfully.");
      onCancel?.();
    } catch (error) {
      toast.error("Failed to cancel subscription.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleCancel}
      disabled={loading}
      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50 dark:bg-red-700 dark:hover:bg-red-800"
    >
      {loading ? "Canceling..." : "Cancel Subscription"}
    </motion.button>
  );
}