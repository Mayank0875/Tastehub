// components/UserProfile.jsx
import React from 'react';
import { Link } from './Router';
import { useAuth } from '../contexts/AuthContext';

const ArrowRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-4 h-4 text-gray-600"
  >
    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
  </svg>
);

const UserProfile = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return (
      <div className="w-full lg:w-80 flex-shrink-0">
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-6 lg:mb-0">
          <div className="text-center text-gray-600">
            <p className="mb-4">Please login to view your profile</p>
            <Link to="/problemset" className="text-[#1ba3ff] hover:underline">
              Browse Problems
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full lg:w-80 flex-shrink-0">
      <div className="bg-white rounded-2xl p-6 shadow-lg mb-6 lg:mb-0">
        <div className="flex items-center gap-2 text-gray-600 font-semibold mb-4">
          <ArrowRightIcon />
          {user.username}
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span role="img" aria-label="email" className="text-xl">
                📧
              </span>
              <div>
                <span className="text-gray-600 text-sm">Email: </span>
                <span className="text-gray-900 font-medium text-sm">
                  {user.email}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span role="img" aria-label="role" className="text-xl">
                {user.role === 'ADMIN' ? '👑' : '👤'}
              </span>
              <div>
                <span className="text-gray-600 text-sm">Role: </span>
                <span className={`font-bold text-sm ${user.role === 'ADMIN' ? 'text-purple-600' : 'text-gray-900'}`}>
                  {user.role}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span role="img" aria-label="joined" className="text-xl">
                📅
              </span>
              <div>
                <span className="text-gray-600 text-sm">Joined: </span>
                <span className="text-gray-900 font-medium text-xs">
                  {new Date(user.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
          <div className="flex-shrink-0">
            <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-3xl font-bold">
              {user.username.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>
        <ul className="mt-6 space-y-2 text-lg">
          <li>
            <Link to="/problemset" className="text-[#1ba3ff] hover:underline">
              Problems
            </Link>
          </li>
          <li>
            <Link to="/submissions" className="text-[#1ba3ff] hover:underline">
              Submissions
            </Link>
          </li>
          <li>
            <Link to="/contests" className="text-[#1ba3ff] hover:underline">
              Contests
            </Link>
          </li>
          {user.role === 'ADMIN' && (
            <li>
              <Link to="/admin" className="text-purple-600 hover:underline font-semibold">
                👑 Admin Panel
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default UserProfile;