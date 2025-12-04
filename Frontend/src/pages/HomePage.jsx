// pages/HomePage.jsx
import React from 'react';
import { Link } from '../components/Router';
import UserProfile from '../components/UserProfile';

const HomePage = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="flex-grow">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to Merakicode</h1>
          <p className="text-gray-700 mb-6">
            Start your competitive programming journey with our comprehensive problem set.
          </p>
          <Link
            to="/problemset"
            className="bg-[#1ba3ff] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#007aff] transition-colors duration-200"
          >
            View Problems
          </Link>
        </div>
      </div>
      <UserProfile />
    </div>
  );
};

export default HomePage;