/**
 * Authentication Modal Component
 * @fileoverview Modal for user login and registration
 */

import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { X, Eye, EyeOff } from 'lucide-react';

/**
 * Authentication modal with login and register forms
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Whether modal is open
 * @param {Function} props.onClose - Close modal handler
 * @param {string} props.mode - Initial mode ('login' or 'register')
 * @returns {JSX.Element} Authentication modal
 */
const AuthModal = ({ isOpen, onClose, mode = 'login' }) => {
    const { login, register } = useAuth();
    const [currentMode, setCurrentMode] = useState(mode);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    
    // Form state
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    if (!isOpen) return null;

    /**
     * Handle form input changes
     * @param {Event} event - Input change event
     */
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setError(''); // Clear error on input change
    };

    /**
     * Handle form submission
     * @param {Event} event - Form submit event
     */
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (currentMode === 'login') {
                const result = await login({
                    username: formData.username,
                    password: formData.password
                });

                if (result.success) {
                    onClose();
                    resetForm();
                } else {
                    setError(result.error);
                }
            } else {
                // Registration validation
                if (formData.password !== formData.confirmPassword) {
                    setError('Passwords do not match');
                    setLoading(false);
                    return;
                }

                if (formData.password.length < 6) {
                    setError('Password must be at least 6 characters long');
                    setLoading(false);
                    return;
                }

                const result = await register({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password
                });

                if (result.success) {
                    onClose();
                    resetForm();
                } else {
                    setError(result.error);
                }
            }
        } catch (err) {
            setError('An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    /**
     * Reset form data
     */
    const resetForm = () => {
        setFormData({
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        });
        setError('');
    };

    /**
     * Switch between login and register modes
     * @param {string} newMode - New mode ('login' or 'register')
     */
    const switchMode = (newMode) => {
        setCurrentMode(newMode);
        resetForm();
    };

    /**
     * Handle modal close
     */
    const handleClose = () => {
        resetForm();
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b">
                    <h2 className="text-2xl font-bold text-gray-900">
                        {currentMode === 'login' ? 'Sign In' : 'Create Account'}
                    </h2>
                    <button
                        onClick={handleClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6">
                    {/* Error Message */}
                    {error && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                            {error}
                        </div>
                    )}

                    {/* Username */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter your username"
                        />
                    </div>

                    {/* Email (only for registration) */}
                    {currentMode === 'register' && (
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter your email"
                            />
                        </div>
                    )}

                    {/* Password */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter your password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password (only for registration) */}
                    {currentMode === 'register' && (
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Confirm your password"
                            />
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                            loading
                                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                                : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                    >
                        {loading ? 'Processing...' : (currentMode === 'login' ? 'Sign In' : 'Create Account')}
                    </button>
                </form>

                {/* Mode Switch */}
                <div className="px-6 pb-6">
                    <div className="text-center">
                        <span className="text-gray-600">
                            {currentMode === 'login' ? "Don't have an account? " : "Already have an account? "}
                        </span>
                        <button
                            onClick={() => switchMode(currentMode === 'login' ? 'register' : 'login')}
                            className="text-blue-600 hover:text-blue-700 font-semibold"
                        >
                            {currentMode === 'login' ? 'Sign Up' : 'Sign In'}
                        </button>
                    </div>
                    
                    {/* Admin Login Info */}
                    {currentMode === 'login' && (
                        <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                            <p className="text-xs text-purple-800 text-center">
                                <span className="font-semibold">👑 Admin Access:</span> username: <code className="bg-purple-100 px-1 rounded">admin</code> | password: <code className="bg-purple-100 px-1 rounded">admin123</code>
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
