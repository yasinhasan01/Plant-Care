
import React from 'react';
import { FaLeaf } from 'react-icons/fa';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-full min-h-64">
      <div className="flex flex-col items-center">
        <FaLeaf className="text-5xl text-[#2e7d32] animate-spin" />
        <p className="mt-4 text-lg text-gray-600">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
