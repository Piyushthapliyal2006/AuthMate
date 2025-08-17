import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  to, 
  icon, 
  iconPosition = 'left',
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  className = '', 
  ...props 
}) => {
  const ButtonComponent = to ? Link : 'button';
  const buttonProps = to ? { to } : props;

  // Base styles
  const baseStyles = "relative group inline-flex items-center justify-center font-semibold leading-6 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  // Variant styles
  const variants = {
    primary: "text-white bg-gray-800 shadow-2xl cursor-pointer rounded-xl shadow-zinc-900 hover:scale-105 active:scale-95 focus:ring-blue-500",
    secondary: "text-gray-700 bg-white border-2 border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 focus:ring-gray-500",
    outline: "text-blue-600 bg-transparent border-2 border-blue-600 rounded-xl hover:bg-blue-50 focus:ring-blue-500",
    ghost: "text-gray-600 bg-transparent hover:bg-gray-100 rounded-xl focus:ring-gray-500"
  };

  // Size styles
  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
    xl: "px-10 py-5 text-xl"
  };

  // Icon spacing based on size
  const iconSpacing = {
    sm: "gap-1.5",
    md: "gap-2",
    lg: "gap-2.5",
    xl: "gap-3"
  };

  // Loading spinner
  const LoadingSpinner = () => (
    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );

  // Icon component
  const IconComponent = ({ icon, className = "" }) => {
    if (React.isValidElement(icon)) {
      return React.cloneElement(icon, { 
        className: `${icon.props.className || ''} ${className}`.trim() 
      });
    }
    return null;
  };

  return (
    <ButtonComponent
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${iconSpacing[size]}
        ${className}
      `.replace(/\s+/g, ' ').trim()}
      disabled={disabled || loading}
      {...buttonProps}
    >
      {variant === 'primary' && (
        <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      )}
      
      <motion.span
        className={`relative z-10 flex items-center ${iconSpacing[size]} ${variant === 'primary' ? 'bg-gray-950 rounded-xl px-6 py-3' : ''}`}
        whileHover={variant === 'primary' ? { rotate: [0, -1, 1, -1, 0], transition: { duration: 0.5 } } : {}}
      >
        <motion.div
          className={`flex items-center ${iconSpacing[size]}`}
          whileHover={variant === 'primary' ? { x: 5 } : {}}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          {/* Loading state */}
          {loading && <LoadingSpinner />}
          
          {/* Left icon */}
          {!loading && icon && iconPosition === 'left' && (
            <IconComponent icon={icon} className="flex-shrink-0" />
          )}
          
          {/* Button text */}
          {children && <span className="flex-shrink-0">{children}</span>}
          
          {/* Right icon */}
          {!loading && icon && iconPosition === 'right' && (
            <IconComponent icon={icon} className="flex-shrink-0" />
          )}
        </motion.div>
      </motion.span>
    </ButtonComponent>
  );
};

export default Button;

