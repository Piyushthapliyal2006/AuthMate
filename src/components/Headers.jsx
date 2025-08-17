import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X, ChevronDown, Sparkles } from 'lucide-react';
import { CgProfile } from 'react-icons/cg';
import { FiLogOut, FiBell, FiSettings } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../store/authSlice';
import { Button, SecondaryButton } from '@/components/index';
import { useTheme } from '@/components/contexts/theme-context';
import { Link } from 'react-router-dom';

const navigation = [
  { name: 'Docs', href: 'https://docs.authmate.xyz' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Blogs', href: '/blogs' },
  // { name: 'Beta', href: '/beta' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    dispatch(logout());
    window.location.href = '/auth/login';
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={`fixed w-full top-0 z-50 transition-all duration-500 ${scrolled
        ? 'backdrop-blur-xl bg-white/95 dark:bg-gray-900/95 shadow-xl border-b border-gray-200/50 dark:border-gray-700/50'
        : 'backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/30 dark:border-gray-700/30'
        }`}
    >
      {/* Gradient overlay for visual depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/20 via-transparent to-purple-50/20 dark:from-blue-900/10 dark:via-transparent dark:to-purple-900/10 pointer-events-none"></div>

      <nav className="relative mx-auto flex items-center justify-between p-4 lg:px-8 h-16">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex lg:flex-1"
        >
          <Link to="/" className="flex items-center gap-3 group">
            <span className="sr-only">AuthMate</span>
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                className="relative w-10 h-10 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src="/favicon.svg"
                  alt="Logo"
                  className="h-6 w-6"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-400/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>
              {/* Sparkle effect */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <Sparkles className="w-4 h-4 text-yellow-400" />
              </motion.div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent group-hover:from-blue-500 group-hover:via-purple-500 group-hover:to-indigo-500 transition-all duration-300">
                AuthMate
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Authentication Platform</p>
            </div>
          </Link>
        </motion.div>

        {/* Desktop navigation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="hidden lg:flex lg:gap-x-8"
        >
          {navigation.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group"
            >
              {item.href.startsWith('http') ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-800/50"
                >
                  {item.name}
                  <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 group-hover:w-full group-hover:left-0 transition-all duration-300 rounded-full"></div>
                </a>
              ) : (
                <Link
                  to={item.href}
                  className="relative px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-800/50"
                >
                  {item.name}
                  <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 group-hover:w-full group-hover:left-0 transition-all duration-300 rounded-full"></div>
                </Link>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Desktop actions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-3 items-center"
        >
          {/* Theme toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="relative p-2.5 rounded-xl bg-gray-100/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-200 hover:bg-gray-200/80 dark:hover:bg-gray-700/80 transition-all duration-300 group"
            aria-label="Toggle theme"
          >
            <motion.div
              initial={false}
              animate={{ rotate: theme === 'dark' ? 0 : 180 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5 text-yellow-500 group-hover:text-yellow-400" />
              ) : (
                <Moon className="h-5 w-5 text-blue-600 group-hover:text-blue-500" />
              )}
            </motion.div>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-400/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </motion.button>

          {isAuthenticated ? (
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={toggleUserMenu}
                className="flex items-center space-x-3 p-2 rounded-xl bg-gray-100/80 dark:bg-gray-800/80 hover:bg-gray-200/80 dark:hover:bg-gray-700/80 transition-all duration-300 group"
              >
                <div className="relative">
                  <img
                    src="https://ui-avatars.com/api/?name=Admin&background=4F46E5&color=fff"
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full ring-2 ring-gray-200/50 dark:ring-gray-700/50 group-hover:ring-blue-500/50 transition-all duration-300"
                  />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    Admin User
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    admin@authmate.com
                  </p>
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-300 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
              </motion.button>

              {/* User Dropdown */}
              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-3 w-64 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 z-50"
                  >
                    <div className="p-4 border-b border-gray-200/50 dark:border-gray-700/50">
                      <div className="flex items-center space-x-3">
                        <img
                          src="https://ui-avatars.com/api/?name=Admin&background=4F46E5&color=fff"
                          alt="User Avatar"
                          className="w-12 h-12 rounded-full ring-2 ring-blue-500/20"
                        />
                        <div>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">Admin User</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">admin@authmate.com</p>
                        </div>
                      </div>
                    </div>

                    <div className="py-2">
                      <Link
                        to="/profile"
                        className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50/80 dark:hover:bg-gray-700/50 transition-all duration-200 group"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <CgProfile className="w-5 h-5 text-gray-500 group-hover:text-blue-600 transition-colors" />
                        <span className="group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Profile</span>
                      </Link>

                      <Link
                        to="/settings"
                        className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50/80 dark:hover:bg-gray-700/50 transition-all duration-200 group"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <FiSettings className="w-5 h-5 text-gray-500 group-hover:text-blue-600 transition-colors" />
                        <span className="group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Settings</span>
                      </Link>
                    </div>

                    <div className="border-t border-gray-200/50 dark:border-gray-700/50 py-2">
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 w-full px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50/80 dark:hover:bg-red-900/20 transition-all duration-200 group"
                      >
                        <FiLogOut className="w-5 h-5 group-hover:text-red-700 dark:group-hover:text-red-300 transition-colors" />
                        <span className="group-hover:text-red-700 dark:group-hover:text-red-300 transition-colors">Sign Out</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <SecondaryButton to="/auth/login" className="text-sm">
                Log in
              </SecondaryButton>
              <Button to="/auth/signup" size="sm" variant="primary">
                Sign up
              </Button>
            </div>
          )}
        </motion.div>

        {/* Mobile menu button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="inline-flex lg:hidden items-center justify-center p-2.5 rounded-xl bg-gray-100/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-200 hover:bg-gray-200/80 dark:hover:bg-gray-700/80 transition-all duration-300 group relative"
          aria-label="Open mobile menu"
        >
          <motion.div
            initial={false}
            animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 group-hover:text-red-500 transition-colors" />
            ) : (
              <Menu className="h-6 w-6 group-hover:text-blue-600 transition-colors" />
            )}
          </motion.div>
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </motion.button>
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
            className="fixed inset-y-0 right-0 z-[101] w-full overflow-y-auto bg-white/95 dark:bg-gray-900/95 backdrop-blur-md px-6 py-6 sm:max-w-sm border-l border-gray-200/50 dark:border-gray-700/50"
          >
            <div className="flex flex-col h-full">
              {/* Mobile menu header */}
              <div className="flex items-center justify-between mb-6 sm:mb-8">
                <Link to="/" className="-m-1.5 p-1.5 group">
                  <span className="sr-only">AuthMate</span>
                  <div className="flex items-center space-x-2">
                    <div className="relative p-2 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                      <img className="h-6 w-6" src="/favicon.svg" alt="Logo" />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-400/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-300">
                      AuthMate
                    </span>
                  </div>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2.5 rounded-xl bg-gray-100/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-200 hover:bg-red-100/80 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-all duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close mobile menu"
                >
                  <X className="h-5 w-5" />
                </motion.button>
              </div>

              {/* Mobile navigation */}
              <nav className="flex-grow">
                <div className="space-y-2">
                  {navigation.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {item.href.startsWith('http') ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-100/80 dark:hover:bg-gray-800/80 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 group relative overflow-hidden"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <Sparkles className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                          <span className="font-medium text-base">{item.name}</span>
                          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 group-hover:w-full transition-all duration-300"></div>
                        </a>
                      ) : (
                        <Link
                          to={item.href}
                          className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-100/80 dark:hover:bg-gray-800/80 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 group relative overflow-hidden"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <Sparkles className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                          <span className="font-medium text-base">{item.name}</span>
                          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 group-hover:w-full transition-all duration-300"></div>
                        </Link>
                      )}
                    </motion.div>
                  ))}
                </div>
              </nav>

              {/* Mobile footer actions */}
              <div className="mt-auto pt-6 border-t border-gray-200/50 dark:border-gray-700/50 space-y-4">
                {/* Theme toggle */}
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={toggleTheme}
                  className="flex items-center space-x-3 w-full px-4 py-3 rounded-xl bg-gray-100/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-200 hover:bg-gray-200/80 dark:hover:bg-gray-700/80 transition-all duration-300 group"
                >
                  <motion.div
                    animate={{ rotate: theme === 'dark' ? 0 : 180 }}
                    transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
                  >
                    {theme === 'dark' ? (
                      <Sun className="h-5 w-5 text-yellow-500 group-hover:text-yellow-400" />
                    ) : (
                      <Moon className="h-5 w-5 text-blue-600 group-hover:text-blue-500" />
                    )}
                  </motion.div>
                  <span className="font-medium">Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode</span>
                </motion.button>

                {/* Auth actions */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-3"
                >
                  {isAuthenticated ? (
                    <>
                      <div className="flex items-center space-x-3 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-50/80 to-purple-50/80 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200/50 dark:border-blue-700/50">
                        <div className="relative">
                          <img
                            src="https://ui-avatars.com/api/?name=Admin&background=4F46E5&color=fff"
                            alt="User Avatar"
                            className="w-10 h-10 rounded-full ring-2 ring-blue-500/20"
                          />
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">Admin User</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">admin@authmate.com</p>
                        </div>
                      </div>

                      <Link
                        to="/profile"
                        className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-100/80 dark:hover:bg-gray-800/80 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 group"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <CgProfile className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                        <span className="font-medium">Profile</span>
                      </Link>

                      <Link
                        to="/settings"
                        className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-100/80 dark:hover:bg-gray-800/80 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 group"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <FiSettings className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                        <span className="font-medium">Settings</span>
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50/80 dark:hover:bg-red-900/20 transition-all duration-300 group"
                      >
                        <FiLogOut className="w-5 h-5 group-hover:text-red-700 dark:group-hover:text-red-300 transition-colors" />
                        <span className="font-medium group-hover:text-red-700 dark:group-hover:text-red-300 transition-colors">Sign Out</span>
                      </button>
                    </>
                  ) : (
                    <div className="space-y-3">
                      <SecondaryButton
                        to="/auth/login"
                        className="w-full justify-center"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Log in
                      </SecondaryButton>
                      <Button
                        to="/auth/signup"
                        className="w-full justify-center"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Sign up
                      </Button>
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
