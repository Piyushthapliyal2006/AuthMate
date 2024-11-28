import React, { useState } from 'react';

// The CopyContent component accepts props for customizable content and button text.
const CopyContent = ({ content, buttonText = "Copy", successText = "Copied!", className = "" }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        // Create a temporary text area to copy the content
        const textarea = document.createElement('textarea');
        textarea.value = content;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);

        // Set copied state to true for showing confirmation
        setCopied(true);

        // Reset the copied state after 2 seconds
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    return (
        <div className={`flex items-center ${className}`}>
            <button
                onClick={handleCopy}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 focus:outline-none"
            >
                {copied ? successText : buttonText}
            </button>
        </div>
    );
};

export default CopyContent;
