import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from "@/components/ui/Button";
import SecondaryButton from "@/components/ui/secondary-button";
import { Link } from 'react-router-dom';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export default function Hero() {
  const [showModal, setShowModal] = useState(false);

  const handleModalOpen = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);

  return (
    <div className="relative isolate min-h-screen flex items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="relative h-full w-full overflow-hidden">
          <motion.div
            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-40 left-0 right-0 h-[500px] rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-20 blur-3xl will-change-transform"
          />
          <img src="/Hero.webp" alt="Hero BG Image" className="relative z-0 w-full h-full object-cover" />
          <motion.div
            animate={{ rotate: -360, scale: [1.2, 1, 1.2] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute top-40 right-0 h-[400px] w-[400px] rounded-full bg-gradient-to-l from-blue-500 to-purple-500 opacity-20 blur-3xl will-change-transform"
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 text-white text-center">
        <motion.div
          initial="initial"
          animate="animate"
          variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.div variants={fadeInUp} className="mx-auto max-w-3xl">
            <div className="mb-8 inline-flex justify-center">
              <motion.div
                variants={fadeInUp}
                className="rounded-full px-4 py-1.5 text-sm font-medium backdrop-blur-lg border border-gray-800 bg-gray-900/30 text-gray-100"
              >
                View docs site to
                <Link to="https://docs.authmate.xyz" className="font-semibold text-primary ml-2 dark:text-gray-100">
                  Learn more <span aria-hidden="true">→</span>
                </Link>
              </motion.div>
            </div>

            <motion.h1 variants={fadeInUp} className="text-4xl font-bold tracking-tight sm:text-6xl">
              Fast, Secure Authentication
              <br />
              for Your Website
            </motion.h1>

            <motion.p variants={fadeInUp} className="mt-6 text-lg leading-8 text-gray-300">
              AuthMate simplifies user authentication with easy APIs, secure keys, and a powerful dashboard so you can focus on your product.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="mt-10 flex items-center justify-center gap-x-6"
            >
              <Button to="/auth/login" size="sm" variant="primary">Get Started Free</Button>
              <SecondaryButton onClick={handleModalOpen}>Watch Demo</SecondaryButton>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Demo Modal */}
      {showModal && (
        <div
          className="fixed mt-24 inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-md px-6"
          role="dialog"
          aria-modal="true"
          tabIndex="-1"
        >
          <div className="bg-gray-900 rounded-lg max-w-5xl w-full max-h-[90vh] relative p-6 flex flex-col">
            <button
              onClick={handleModalClose}
              className="absolute top-1 right-1 text-white text-4xl font-bold hover:text-red-400"
              aria-label="Close modal"
            >
              &times;
            </button>
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden flex-grow max-h-[80vh]">
              <div className="relative w-full max-h-[80vh] aspect-[2.18] p-10">
                <iframe
                  src="https://app.supademo.com/embed/cmcj2z50b787l8qsz5jjdjz44?embed_v=2"
                  loading="lazy"
                  title="AuthMate Demo"
                  allow="clipboard-write"
                  allowFullScreen
                  frameBorder="0"
                  className="absolute top-0 left-0 w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
