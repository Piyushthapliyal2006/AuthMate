"use client";

import { useState } from "react";
import { cancelSubscription } from "@/api";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

export default function CancelSubscriptionButton({ onCancel = () => {} }) {
  const [loading, setLoading] = useState(false);

  const handleCancel = async () => {
    setLoading(true);
    try {
      console.log("Calling cancelSubscription API (no ID needed)");
      await cancelSubscription(); // No ID passed
      toast.success("Subscription canceled successfully.");
      onCancel(); // Trigger parent callback (e.g., refetch)
    } catch (error) {
      toast.error("Failed to cancel subscription.");
      console.error("Error while canceling subscription:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleCancel}
      disabled={loading}
      aria-busy={loading}
      aria-disabled={loading}
      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50 dark:bg-red-700 dark:hover:bg-red-800"
    >
      {loading ? "Canceling..." : "Cancel Subscription"}
    </motion.button>
  );
}

CancelSubscriptionButton.propTypes = {
  onCancel: PropTypes.func,
};
