import React from 'react';
import { FaGithub, FaFacebook, FaTwitter, FaYoutube, FaLinkedin } from 'react-icons/fa'; // Using react-icons
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-6">
                {/* Grid for Columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {/* Column 1: Site Navigation */}
                    <div>
                        <h5 className="font-semibold text-lg mb-4">Site Navigation</h5>
                        <ul className="space-y-2">
                            <li><Link to="/dashboard" className="hover:underline">Dashboard</Link></li>
                            <li><Link to="/pricing" className="hover:underline">Pricing</Link></li>
                            <li><Link to="#" className="hover:underline">Services</Link></li>
                            <li><Link to="#" className="hover:underline">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Column 2: Resources */}
                    <div>
                        <h5 className="font-semibold text-lg mb-4">Resources</h5>
                        <ul className="space-y-2">
                            <li><Link to="/blogs" className="hover:underline">Blog</Link></li>
                            <li><Link to="/docs" className="hover:underline">Documentation</Link></li>
                            <li><Link to="#" className="hover:underline">API Reference</Link></li>
                            <li><Link to="#" className="hover:underline">FAQ</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Legal */}
                    <div>
                        <h5 className="font-semibold text-lg mb-4">Legal</h5>
                        <ul className="space-y-2">
                            <li><Link to="#" className="hover:underline">Privacy Policy</Link></li>
                            <li><Link to="#" className="hover:underline">Terms of Service</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Social Media Links */}
                    <div>
                        <h5 className="font-semibold text-lg mb-4">Follow Us</h5>
                        <ul className="flex space-x-4">
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white transition">
                                    <FaGithub className="h-6 w-6" />
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white transition">
                                    <FaFacebook className="h-6 w-6" />
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white transition">
                                    <FaTwitter className="h-6 w-6" />
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white transition">
                                    <FaYoutube className="h-6 w-6" />
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white transition">
                                    <FaLinkedin className="h-6 w-6" />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Newsletter Form */}
                <div className="mt-8">
                    <h5 className="font-semibold text-lg mb-4">Subscribe to our Newsletter</h5>
                    <form className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                        <input
                            type="email"
                            placeholder="Your email address"
                            required
                            className="flex-grow p-2 mb-2 sm:mb-0 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>

                {/* Copyright */}
                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-400">© 2024 AuthMate. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
