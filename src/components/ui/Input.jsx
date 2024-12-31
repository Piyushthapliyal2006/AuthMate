"use client"

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Input = ({ label, type, id, required, validate }) => {
  const [value, setValue] = useState('');
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (touched && validate) {
      const validationError = validate(value);
      setError(validationError || '');
    }
  }, [value, touched, validate]);

  const handleChange = (e) => {
    setValue(e.target.value);
    if (!touched) setTouched(true);
  };

  const handleBlur = () => {
    if (!touched) setTouched(true);
  };

  return (
    <div className="mb-4">
      {label && (
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        required={required}
        className={`bg-gray-50 border ${
          touched && error ? 'border-red-500' : 'border-gray-300'
        } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {touched && error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-sm text-red-600 dark:text-red-500"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

export { Input };

