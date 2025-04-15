import React from 'react';

const Loading: React.FC = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary border-solid"></div>
                <p className="mt-4 text-lg font-medium text-gray-700">Loading...</p>
            </div>
        </div>
    );
};

export default Loading;