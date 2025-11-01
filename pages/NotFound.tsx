
import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center h-full">
      <div className="relative">
        <h1 className="text-9xl font-extrabold text-gray-200">404</h1>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <svg className="w-48 h-48 text-[#81c784]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2c2.761 0 5 2.239 5 5s-5 8-5 8-5-5.239-5-8 2.239-5 5-5z" transform="translate(0, -2) scale(0.6)" transform-origin="12 10" />
            </svg>
        </div>
      </div>
      <h2 className="text-4xl font-bold text-gray-800 mt-4">Oops! Page Not Found</h2>
      <p className="text-gray-600 mt-2">Looks like this page has been pruned. Let's get you back on the right path.</p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-2 px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#2e7d32] hover:bg-[#25632b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#81c784] transition-colors"
      >
        <FaHome />
        Go back home
      </Link>
    </div>
  );
};

export default NotFound;
