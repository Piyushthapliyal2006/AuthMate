// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import Landing from './pages/Landing';
import Layout from './layout/Layout';

function App() {
    return (
        <Router>
            <div>
                {/* <Navbar /> */}
                <main className="bg-gray-100">
                    <Routes>
                        <Route path="/" element={<Landing />} />
                        <Route element={<Layout />}>
                            <Route path="/about" element={<h1>About Page lorem900</h1>} />
                            <Route path="/services" element={<h1>Services Page</h1>} />
                            <Route path="/contact" element={<h1>Contact Page</h1>} />
                        </Route>
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
