import React from 'react'

function Notifications() {
    return (
        <div className='p-6 max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md mt-16'>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Notifications Settings</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-4">
                Webhooks integration Coming Soon!
                Stay tuned for updates on webhook support.
            </p>

            <p className="text-gray-500 dark:text-gray-400 mt-2">
                For more information, please refer to our <a href="https://docs.authmate.xyz" className="text-blue-500 hover:text-blue-600">documentation</a>.
            </p>
        </div>
    )
}

export default Notifications;
