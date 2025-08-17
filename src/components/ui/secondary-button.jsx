import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const SecondaryButton = ({ children, to, className = '', ...props }) => {
  const ButtonComponent = to ? Link : 'button';
  const buttonProps = to ? { to } : props;

  return (
    <ButtonComponent
      className={`relative group inline-block p-px font-semibold leading-6 text-gray-800 dark:text-white bg-gray-200 dark:bg-gray-700 shadow-md cursor-pointer rounded-xl transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95 ${className}`}
      {...buttonProps}
    >
      <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-300 to-purple-300 dark:from-blue-600 dark:to-purple-600 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <span className="relative z-10 block px-6 py-3 rounded-xl bg-white dark:bg-gray-800 transition-colors duration-300 group-hover:bg-opacity-0 dark:group-hover:bg-opacity-0">
      <motion.div
        className="flex items-center space-x-2"
        whileHover={{ x: 5 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <span>{children}</span>
      </motion.div>
    </span>
  </ButtonComponent>
);
}

export default SecondaryButton;

