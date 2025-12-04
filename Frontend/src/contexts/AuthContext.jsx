/**
 * Authentication Context for managing user authentication state
 * @fileoverview Provides authentication state and methods throughout the app
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

/**
 * Authentication provider component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element} Authentication provider
 */
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(localStorage.getItem('token'));

    // Configure axios defaults
    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            delete axios.defaults.headers.common['Authorization'];
        }
    }, [token]);

    /**
     * Check if user is authenticated on app load
     */
    useEffect(() => {
        const checkAuth = async () => {
            if (token) {
                try {
                    const response = await axios.get('http://localhost:3030/auth/profile');
                    if (response.data.success) {
                        setUser(response.data.data);
                    } else {
                        logout();
                    }
                } catch (error) {
                    console.error('Auth check failed:', error);
                    logout();
                }
            }
            setLoading(false);
        };

        checkAuth();
    }, [token]);

    /**
     * Register a new user
     * @param {Object} userData - User registration data
     * @param {string} userData.username - Username
     * @param {string} userData.email - Email address
     * @param {string} userData.password - Password
     * @returns {Promise<Object>} Registration result
     */
    const register = async (userData) => {
        try {
            const response = await axios.post('http://localhost:3030/auth/register', userData);
            if (response.data.success) {
                const { user: userInfo, token: authToken } = response.data.data;
                setUser(userInfo);
                setToken(authToken);
                localStorage.setItem('token', authToken);
                return { success: true, data: response.data };
            }
            return { success: false, error: response.data.message };
        } catch (error) {
            return { 
                success: false, 
                error: error.response?.data?.message || 'Registration failed' 
            };
        }
    };

    /**
     * Login user
     * @param {Object} credentials - Login credentials
     * @param {string} credentials.username - Username or email
     * @param {string} credentials.password - Password
     * @returns {Promise<Object>} Login result
     */
    const login = async (credentials) => {
        try {
            const response = await axios.post('http://localhost:3030/auth/login', credentials);
            if (response.data.success) {
                const { user: userInfo, token: authToken } = response.data.data;
                setUser(userInfo);
                setToken(authToken);
                localStorage.setItem('token', authToken);
                return { success: true, data: response.data };
            }
            return { success: false, error: response.data.message };
        } catch (error) {
            return { 
                success: false, 
                error: error.response?.data?.message || 'Login failed' 
            };
        }
    };

    /**
     * Logout user
     */
    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
    };

    /**
     * Update user profile
     * @param {Object} updates - Profile updates
     * @returns {Promise<Object>} Update result
     */
    const updateProfile = async (updates) => {
        try {
            const response = await axios.put('http://localhost:3030/auth/profile', updates);
            if (response.data.success) {
                setUser(response.data.data);
                return { success: true, data: response.data.data };
            }
            return { success: false, error: response.data.message };
        } catch (error) {
            return { 
                success: false, 
                error: error.response?.data?.message || 'Profile update failed' 
            };
        }
    };

    /**
     * Check if user is admin
     * @returns {boolean} True if user is admin
     */
    const isAdmin = () => {
        return user && user.role === 'ADMIN';
    };

    /**
     * Check if user is authenticated
     * @returns {boolean} True if user is logged in
     */
    const isAuthenticated = () => {
        return !!user;
    };

    const value = {
        user,
        loading,
        isAuthenticated: isAuthenticated(),
        isAdmin: isAdmin(),
        register,
        login,
        logout,
        updateProfile
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

/**
 * Hook to use authentication context
 * @returns {Object} Authentication context value
 */
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
