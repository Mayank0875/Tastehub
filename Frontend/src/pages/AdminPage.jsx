/**
 * Admin Panel Page Component
 * @fileoverview Admin interface for managing problems, users, and system statistics
 */

import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import CreateProblemForm from '../components/CreateProblemForm';
import EditProblemForm from '../components/EditProblemForm';
import axios from 'axios';
import { 
    Users, 
    BookOpen, 
    Activity, 
    Plus, 
    Edit, 
    Trash2, 
    Settings,
    UserCheck,
    UserX
} from 'lucide-react';

/**
 * Admin panel with tabs for different management sections
 * @returns {JSX.Element} Admin panel component
 */
const AdminPage = () => {
    const { user, isAdmin } = useAuth();
    const [activeTab, setActiveTab] = useState('problems');
    const [stats, setStats] = useState(null);
    const [problems, setProblems] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreateProblem, setShowCreateProblem] = useState(false);
    const [showEditProblem, setShowEditProblem] = useState(false);
    const [selectedProblem, setSelectedProblem] = useState(null);

    useEffect(() => {
        if (isAdmin) {
            fetchStats();
            fetchProblems();
            fetchUsers();
        }
    }, [isAdmin]);

    /**
     * Fetch system statistics
     */
    const fetchStats = async () => {
        try {
            const response = await axios.get('https://tastehub-smhl.onrender.com/admin/stats');
            if (response.data.success) {
                setStats(response.data.data);
            }
        } catch (error) {
            console.error('Failed to fetch stats:', error);
        }
    };

    /**
     * Fetch all problems
     */
    const fetchProblems = async () => {
        try {
            const response = await axios.get('https://tastehub-smhl.onrender.com/problem');
            if (response.data.success) {
                setProblems(response.data.data);
            }
        } catch (error) {
            console.error('Failed to fetch problems:', error);
        }
    };

    /**
     * Fetch all users
     */
    const fetchUsers = async () => {
        try {
            const response = await axios.get('https://tastehub-smhl.onrender.com/admin/users');
            if (response.data.success) {
                setUsers(response.data.data.users);
            }
        } catch (error) {
            console.error('Failed to fetch users:', error);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Delete a problem
     * @param {number} problemId - Problem ID to delete
     */
    const deleteProblem = async (problemId) => {
        if (window.confirm('Are you sure you want to delete this problem?')) {
            try {
                const response = await axios.delete(`https://tastehub-smhl.onrender.com/admin/problems/${problemId}`);
                if (response.data.success) {
                    fetchProblems();
                }
            } catch (error) {
                console.error('Failed to delete problem:', error);
                alert('Failed to delete problem');
            }
        }
    };

    /**
     * Toggle user active status
     * @param {number} userId - User ID
     * @param {boolean} currentStatus - Current active status
     */
    const toggleUserStatus = async (userId, currentStatus) => {
        try {
            const response = await axios.put(`https://tastehub-smhl.onrender.com/admin/users/${userId}`, {
                isActive: !currentStatus
            });
            if (response.data.success) {
                fetchUsers();
            }
        } catch (error) {
            console.error('Failed to update user status:', error);
        }
    };

    if (!isAdmin) {
        return (
            <div className="text-center py-12">
                <div className="text-red-500 text-xl font-semibold">
                    Access Denied
                </div>
                <div className="text-gray-600 mt-2">
                    You need admin privileges to access this page.
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="text-center py-12">
                <div className="text-gray-600">Loading admin panel...</div>
            </div>
        );
    }

    const tabs = [
        { id: 'problems', label: 'Problems', icon: BookOpen },
        { id: 'users', label: 'Users', icon: Users },
        { id: 'stats', label: 'Statistics', icon: Activity }
    ];

    return (
        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Admin Panel
                </h1>
                <p className="text-gray-600">
                    Manage problems, users, and system statistics
                </p>
            </div>

            {/* Stats Cards */}
            {stats && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm">Total Problems</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.totalProblems}</p>
                            </div>
                            <BookOpen className="h-8 w-8 text-blue-600" />
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm">Total Users</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
                            </div>
                            <Users className="h-8 w-8 text-green-600" />
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm">Total Submissions</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.totalSubmissions}</p>
                            </div>
                            <Activity className="h-8 w-8 text-purple-600" />
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm">Recent (24h)</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.recentSubmissions}</p>
                            </div>
                            <Settings className="h-8 w-8 text-orange-600" />
                        </div>
                    </div>
                </div>
            )}

            {/* Tabs */}
            <div className="bg-white rounded-2xl shadow-lg">
                <div className="border-b border-gray-200">
                    <nav className="flex space-x-8 px-6">
                        {tabs.map(tab => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                                        activeTab === tab.id
                                            ? 'border-blue-500 text-blue-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                                >
                                    <Icon size={20} />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </nav>
                </div>

                <div className="p-6">
                    {/* Problems Tab */}
                    {activeTab === 'problems' && (
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-semibold text-gray-900">Problems</h2>
                                <button
                                    onClick={() => setShowCreateProblem(true)}
                                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    <Plus size={20} />
                                    Create Problem
                                </button>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Title
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Rating
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Tags
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {problems.map(problem => (
                                            <tr key={problem.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {problem.title}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {problem.rating}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <div className="flex flex-wrap gap-1">
                                                        {problem.tags.slice(0, 2).map((tag, index) => (
                                                            <span
                                                                key={index}
                                                                className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded"
                                                            >
                                                                {tag}
                                                            </span>
                                                        ))}
                                                        {problem.tags.length > 2 && (
                                                            <span className="text-xs text-gray-400">
                                                                +{problem.tags.length - 2}
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => {
                                                                setSelectedProblem(problem);
                                                                setShowEditProblem(true);
                                                            }}
                                                            className="text-blue-600 hover:text-blue-800"
                                                            title="Edit Problem"
                                                        >
                                                            <Edit size={16} />
                                                        </button>
                                                        <button
                                                            onClick={() => deleteProblem(problem.id)}
                                                            className="text-red-600 hover:text-red-800"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Users Tab */}
                    {activeTab === 'users' && (
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-semibold text-gray-900">Users</h2>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Username
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Email
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Role
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Submissions
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {users.map(user => (
                                            <tr key={user.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {user.username}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {user.email}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <span className={`px-2 py-1 text-xs rounded-full ${
                                                        user.role === 'ADMIN' 
                                                            ? 'bg-purple-100 text-purple-800' 
                                                            : 'bg-gray-100 text-gray-800'
                                                    }`}>
                                                        {user.role}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <span className={`px-2 py-1 text-xs rounded-full ${
                                                        user.isActive 
                                                            ? 'bg-green-100 text-green-800' 
                                                            : 'bg-red-100 text-red-800'
                                                    }`}>
                                                        {user.isActive ? 'Active' : 'Inactive'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {user._count.submission}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <button
                                                        onClick={() => toggleUserStatus(user.id, user.isActive)}
                                                        className={`p-1 rounded ${
                                                            user.isActive 
                                                                ? 'text-red-600 hover:text-red-800' 
                                                                : 'text-green-600 hover:text-green-800'
                                                        }`}
                                                    >
                                                        {user.isActive ? <UserX size={16} /> : <UserCheck size={16} />}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Statistics Tab */}
                    {activeTab === 'stats' && (
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-6">System Statistics</h2>
                            {stats && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-gray-50 rounded-lg p-6">
                                        <h3 className="text-lg font-medium text-gray-900 mb-4">Overview</h3>
                                        <div className="space-y-3">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Total Problems:</span>
                                                <span className="font-semibold">{stats.totalProblems}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Total Users:</span>
                                                <span className="font-semibold">{stats.totalUsers}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Total Submissions:</span>
                                                <span className="font-semibold">{stats.totalSubmissions}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 rounded-lg p-6">
                                        <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
                                        <div className="space-y-3">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Submissions (24h):</span>
                                                <span className="font-semibold">{stats.recentSubmissions}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Create Problem Modal */}
            {showCreateProblem && (
                <CreateProblemForm
                    onClose={() => setShowCreateProblem(false)}
                    onSuccess={() => {
                        fetchProblems();
                        fetchStats();
                    }}
                />
            )}

            {/* Edit Problem Modal */}
            {showEditProblem && selectedProblem && (
                <EditProblemForm
                    problem={selectedProblem}
                    onClose={() => {
                        setShowEditProblem(false);
                        setSelectedProblem(null);
                    }}
                    onSuccess={() => {
                        fetchProblems();
                        fetchStats();
                    }}
                />
            )}
        </div>
    );
};

export default AdminPage;
