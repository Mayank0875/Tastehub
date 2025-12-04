// pages/NotFoundPage.jsx
import React from 'react';
import { Link } from '../components/Router';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-6">Page not found</p>
        <Link
          to="/problemset"
          className="bg-[#1ba3ff] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#007aff] transition-colors duration-200"
        >
          Go to Problemset
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;