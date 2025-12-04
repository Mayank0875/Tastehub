// components/Navbar.jsx
import React, { useState } from 'react';
import { Link } from './Router';
import { useAuth } from '../contexts/AuthContext';
import { Zap, User, Settings, LogOut, Shield } from 'lucide-react';

const Navbar = ({ onShowAuth, onShowRealtimeSubmissions }) => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLoginClick = () => {
    onShowAuth('login');
  };

  const handleSignupClick = () => {
    onShowAuth('register');
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  return (
    <nav className="bg-white p-4 rounded-2xl shadow-lg mb-6">
      <div className="container mx-auto max-w-7xl flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/problemset" className="text-xl font-bold text-[#1ba3ff] md:text-2xl">
            Merakicode
          </Link>
          <Link
            to="/problemset"
            className="text-gray-600 hover:text-gray-900 transition-colors duration-200 hidden sm:block"
          >
            Problemset
          </Link>
          <Link
            to="/home"
            className="text-gray-600 hover:text-gray-900 transition-colors duration-200 hidden sm:block"
          >
            Home
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search user..."
              className="bg-gray-200 text-gray-900 placeholder-gray-500 rounded-full px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-[#1ba3ff] transition-all duration-200 w-32 sm:w-48"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Real-time submissions button */}
          {isAuthenticated && (
            <button
              onClick={onShowRealtimeSubmissions}
              className="p-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
              title="Live Submissions"
            >
              <Zap size={20} />
            </button>
          )}

          {/* Authentication buttons */}
          {!isAuthenticated ? (
            <>
              <button
                onClick={handleLoginClick}
                className="bg-[#ffa116] text-white px-4 py-2 rounded-full font-semibold hover:bg-opacity-90 transition-opacity duration-200 hidden lg:block"
              >
                Login
              </button>
              <button
                onClick={handleSignupClick}
                className="bg-transparent border border-[#1ba3ff] text-[#1ba3ff] px-4 py-2 rounded-full font-semibold hover:bg-[#1ba3ff] hover:text-white transition-colors duration-200 hidden lg:block"
              >
                Signup
              </button>
            </>
          ) : (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-full transition-colors duration-200"
              >
                <User size={16} />
                <span className="hidden sm:block font-medium">{user.username}</span>
                {isAdmin && <Shield size={14} className="text-purple-600" />}
              </button>

              {/* User dropdown menu */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="font-medium text-gray-900">{user.username}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                  
                  <Link
                    to="/settings"
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <Settings size={16} />
                    Settings
                  </Link>

                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <Shield size={16} />
                      Admin Panel
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;