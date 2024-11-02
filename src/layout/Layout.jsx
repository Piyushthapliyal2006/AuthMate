import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from "../components/Navbar";

function Layout() {
    return (
        <>
            <Navbar />
            <div>
                <Outlet />  {/* This is where the nested routes will render */}
            </div>
            <footer className = "bg-gray-800 text-white p-8">
                <div className = "container mx-auto">
                    <div className = "grid grid-cols-1 md:grid-cols-4 gap-8">
                        {/* <!-- Column 1: Site Navigation --> */}
                        <div>
                            <h5 className = "font-semibold mb-2">Site Navigation</h5>
                            <ul className = "space-y-1">
                                <li><a href="#" className = "hover:underline">Home</a></li>
                                <li><a href="#" className = "hover:underline">About Us</a></li>
                                <li><a href="#" className = "hover:underline">Services</a></li>
                                <li><a href="#" className = "hover:underline">Contact</a></li>
                            </ul>
                        </div>
                        {/* <!-- Column 2: Social Media Links --> */}
                        <div>
                            <h5 className = "font-semibold mb-2">Follow Us</h5>
                            <ul className = "space-y-1">
                                <li><a href="#" className = "hover:underline">GitHub</a></li>
                                <li><a href="#" className = "hover:underline">Facebook</a></li>
                                <li><a href="#" className = "hover:underline">X</a></li>
                                <li><a href="#" className = "hover:underline">YouTube</a></li>
                                <li><a href="#" className = "hover:underline">LinkedIn</a></li>
                            </ul>
                        </div>
                        {/* <!-- Column 3: Resources --> */}
                        <div>
                            <h5 className = "font-semibold mb-2">Resources</h5>
                            <ul className = "space-y-1">
                                <li><a href="#" className = "hover:underline">Blog</a></li>
                                <li><a href="#" className = "hover:underline">Documentation</a></li>
                                <li><a href="#" className = "hover:underline">API Reference</a></li>
                                <li><a href="#" className = "hover:underline">FAQ</a></li>
                            </ul>
                        </div>
                        {/* <!-- Column 4: Legal --> */}
                        <div>
                            <h5 className = "font-semibold mb-2">Legal</h5>
                            <ul className = "space-y-1">
                                <li><a href="#" className = "hover:underline">Privacy Policy</a></li>
                                <li><a href="#" className = "hover:underline">Terms of Service</a></li>
                            </ul>
                        </div>
                    </div>

                    {/* <!-- Newsletter Form --> */}
                    <div className = "mt-8">
                        <h5 className = "font-semibold mb-2">Subscribe to our Newsletter</h5>
                        <form className = "flex flex-col md:flex-row md:items-center w-1">
                            <input type="email" placeholder="Your email address" required className = "flex-grow p-2 mb-2 md:mb-0 md:mr-2 border border-gray-300 rounded" />
                            <button type="submit" className = "bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">Subscribe</button>
                        </form>
                    </div>

                    <div className = "mt-8 text-center">
                        <p className = "text-sm">© 2024 Your Company Name. All rights reserved.</p>
                    </div>
                </div>
            </footer>


        </>
    );
}

export default Layout;
