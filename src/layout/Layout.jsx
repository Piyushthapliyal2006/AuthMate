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
            
        </>
    );
}

export default Layout;
