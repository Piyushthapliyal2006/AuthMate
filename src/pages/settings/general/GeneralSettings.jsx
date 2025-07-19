import React from 'react'
import { Link } from 'react-router-dom';

function GeneralSettings() {
    return (
        <>      
          <div className='p-6 max-w-8xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md mt-16'>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">General Settings</h2>
            

            <p className="text-gray-500 dark:text-gray-400 mt-2">
                For more information, please refer to our <a href="https://docs.authmate.xyz" className="text-blue-500 hover:text-blue-600">documentation</a>.
            </p>
            <ul className='mt-4 space-y-2 text-gray-700 dark:text-gray-300'>
                <li><Link to="/settings/profile" className="text-gray-300 hover:text-gray-400">Edit Profile</Link></li>
                <li><Link to="/settings/password" className="text-gray-300 hover:text-gray-400">Change Password</Link></li>
                <li><Link to="/settings/api-keys" className="text-gray-300 hover:text-gray-400">Manage API Keys</Link></li>
                <li><Link to="/settings/delete-account" className="text-red-500 hover:text-red-300">Delete Account</Link></li>
            </ul>
        </div>
        </>

    )
}

export default GeneralSettings;
