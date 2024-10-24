import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <h1 className="text-9xl font-bold text-red-500">404</h1>
      <h2 className="text-4xl font-semibold text-gray-700 mt-4">Page Not Found</h2>
      <p className="text-xl text-gray-600 mt-6 mb-8">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link 
        to="/signin" 
        className="px-6 py-3 text-lg font-semibold text-blue-500 border-2 border-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out"
      >
        Go back to sign in
      </Link>
    </div>
  );
};

export default NotFound;