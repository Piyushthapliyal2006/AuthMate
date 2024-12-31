import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Button = ({ children, to, className = '', ...props }) => {
    const ButtonComponent = to ? Link : 'button';
    const buttonProps = to ? { to } : props;

    return (
        <ButtonComponent
            className={`relative group inline-block p-px font-semibold leading-6 text-white bg-gray-800 shadow-2xl cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95 ${className}`}
            {...buttonProps}
        >
            <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <motion.span
                className="relative z-10 block px-6 py-3 rounded-xl bg-gray-950"
                whileHover={{ rotate: [0, -1, 1, -1, 0], transition: { duration: 0.5 } }}
            >
                <motion.div
                    className="flex items-center space-x-2"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                    <span>{children}</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </motion.div>
            </motion.span>
        </ButtonComponent>
    );
}

export default Button;

