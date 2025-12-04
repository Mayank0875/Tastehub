import React from 'react';
import { Link } from '../components/Router';

export const SettingsPage = () => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <Link to="/problemset" className="flex items-center gap-2 text-[#1ba3ff] hover:underline mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 11H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back to Problemset
      </Link>
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Settings</h1>
      <p className="text-gray-700">Configure your account preferences and settings.</p>
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-gray-600">Settings functionality coming soon...</p>
      </div>
    </div>
  );
};

export default SettingsPage;