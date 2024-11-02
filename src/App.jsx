// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import Layout from './layout/Layout';
import Landing from './pages/Landing';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Login from './pages/Login';
import ResetPassword from './pages/ResetPassword';
import PasswordResetConfirm from './pages/PasswordResetConfirm';

function App() {
    return (
        <Router>
            <div>
                {/* <Navbar /> */}
                <main className="bg-gray-100">
                    <Routes>
                        <Route path="/" element={<Landing />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/users/reset_password/" element={<ResetPassword />} />
                        <Route path="/password/reset/confirm/:uid/:token" element={<PasswordResetConfirm />} />
                        <Route element={<Layout />}>
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/projects" element={<Projects />} />
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
