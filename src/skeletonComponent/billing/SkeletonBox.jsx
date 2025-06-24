"use client";

import React from "react";
import { motion } from "framer-motion";

export default function SkeletonBox({ width = "100%", height = 100, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity }}
      className={`bg-gray-200 dark:bg-gray-700 rounded-md ${className}`}
      style={{ width, height }}
    />
  );
}
