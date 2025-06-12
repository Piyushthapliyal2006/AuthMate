import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { CgProfile } from 'react-icons/cg';
import { FiLogOut } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../store/authSlice'; // Adjust path as needed
import { Button, SecondaryButton } from '@/components/index';
import { useTheme } from '@/components/contexts/theme-context';
import { Link } from 'react-router-dom';

const navigation = [
  { name: 'Docs', href: 'https://docs.authmate.xyz' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Blogs', href: '/blogs' },
  { name: 'Beta', href: '/beta' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, accessToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!accessToken) {
      const token = localStorage.getItem('accessToken');
      if (token) {
        dispatch(login({ access: token, refresh: localStorage.getItem('refreshToken') }));
      }
    }
  }, [dispatch, accessToken]);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    dispatch(logout());
    window.location.href = '/auth/login';
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed w-full top-0 z-50 bg-white dark:bg-gray-900 h-16"
    >
      <nav className="mx-auto flex items-center justify-between p-6 lg:px-8 backdrop-blur-lg bg-white/70 dark:bg-gray-900/70 border-b border-gray-200 dark:border-gray-800">
        {/* Logo */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex lg:flex-1">
          <Link to="/" className="flex items-center gap-2">
            <span className="sr-only">AuthMate</span>
            <motion.img
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ type: 'spring', stiffness: 300, damping: 10 }}
              src="/favicon.svg"
              alt="Logo"
              className="h-16 w-auto"
            />
          </Link>
        </motion.div>

        {/* Mobile menu toggle */}
        <div className="flex lg:hidden">
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="text-gray-700 dark:text-gray-200"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open mobile menu"
          >
            <Menu className="h-6 w-6" />
          </motion.button>
        </div>

        {/* Desktop navigation */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <motion.div key={item.name} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to={item.href} className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100 hover:text-primary">
                {item.name}
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Desktop actions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </motion.button>

          {isAuthenticated ? (
            <div className="relative group">
              <div className="inline-flex items-center gap-2 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer transition">
                <img
                  src="https://ui-avatars.com/api/?name=Admin&background=4F46E5&color=fff"
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full"
                />
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.25 8.27a.75.75 0 01-.02-1.06z" />
                </svg>
              </div>
              <div className="absolute right-0 mt-2 w-52 rounded-md shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 z-50 opacity-0 group-hover:opacity-100 group-hover:translate-y-1 invisible group-hover:visible transition-all transform duration-200">
                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  <CgProfile className="text-lg" />
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-700 transition"
                >
                  <FiLogOut className="text-lg" />
                  Log Out
                </button>
              </div>
            </div>
          ) : (
            <>
              <SecondaryButton to="/auth/login">Log in</SecondaryButton>
              <Button to="/auth/signup">Sign up</Button>
            </>
          )}
        </motion.div>
      </nav>

      {/* Backdrop for mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-gray-500 bg-opacity-75 z-[99]"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close mobile menu"
          />
        )}
      </AnimatePresence>

      {/* Mobile menu drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 right-0 z-[101] w-full overflow-y-auto bg-white dark:bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-8">
                <Link to="/" className="-m-1.5 p-1.5">
                  <span className="sr-only">AuthMate</span>
                  <img className="h-8 w-auto" src="/favicon.svg" alt="Logo" />
                </Link>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-700 dark:text-gray-200"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close mobile menu"
                >
                  <X className="h-6 w-6" />
                </motion.button>
              </div>
              <nav className="flex-grow">
                <ul className="space-y-4">
                  {navigation.map((item) => (
                    <motion.li key={item.name} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Link
                        to={item.href}
                        className="block py-2 text-base font-semibold leading-7 text-gray-900 dark:text-gray-100 hover:text-primary"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Theme toggle + auth actions */}
              <div className="mt-auto pt-6 border-t border-gray-200 dark:border-gray-700">
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 180 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleTheme}
                  className="mb-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                  aria-label="Toggle theme"
                >
                  {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </motion.button>

                <div className="space-y-3">
                  {isAuthenticated ? (
                    <>
                      <Link
                        to="/profile"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition rounded-md"
                      >
                        <CgProfile className="text-lg" />
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-700 transition rounded-md"
                      >
                        <FiLogOut className="text-lg" />
                        Log Out
                      </button>
                    </>
                  ) : (
                    <>
                      <SecondaryButton to="/auth/login" className="w-full justify-center">
                        Log in
                      </SecondaryButton>
                      <Button to="/auth/signup" className="w-full justify-center">
                        Sign up
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
