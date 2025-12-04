/**
 * Real-time Submissions Component
 * @fileoverview Displays live submission updates from WebSocket
 */

import React, { useState, useEffect } from 'react';
import { useSocket } from '../contexts/SocketContext';
import { 
    CheckCircle, 
    XCircle, 
    Clock, 
    AlertCircle, 
    Code, 
    User,
    Zap
} from 'lucide-react';

/**
 * Real-time submissions feed component
 * @param {Object} props - Component props
 * @param {boolean} props.show - Whether to show the component
 * @param {Function} props.onClose - Close handler
 * @returns {JSX.Element} Real-time submissions component
 */
const RealtimeSubmissions = ({ show, onClose }) => {
    const { submissionUpdates, clearSubmissionUpdates } = useSocket();
    const [filter, setFilter] = useState('all'); // all, accepted, rejected, running

    useEffect(() => {
        if (show) {
            // Clear updates when component is shown to focus on new ones
            // clearSubmissionUpdates();
        }
    }, [show]);

    /**
     * Get status icon based on submission status
     * @param {string} status - Submission status
     * @returns {JSX.Element} Status icon
     */
    const getStatusIcon = (status) => {
        switch (status) {
            case 'ACCEPTED':
                return <CheckCircle className="h-5 w-5 text-green-500" />;
            case 'REJECTED':
                return <XCircle className="h-5 w-5 text-red-500" />;
            case 'RUNNING':
                return <Clock className="h-5 w-5 text-yellow-500 animate-spin" />;
            case 'ERROR':
                return <AlertCircle className="h-5 w-5 text-red-500" />;
            default:
                return <Code className="h-5 w-5 text-gray-500" />;
        }
    };

    /**
     * Get status color based on submission status
     * @param {string} status - Submission status
     * @returns {string} CSS color classes
     */
    const getStatusColor = (status) => {
        switch (status) {
            case 'ACCEPTED':
                return 'bg-green-50 border-green-200';
            case 'REJECTED':
                return 'bg-red-50 border-red-200';
            case 'RUNNING':
                return 'bg-yellow-50 border-yellow-200';
            case 'ERROR':
                return 'bg-red-50 border-red-200';
            default:
                return 'bg-gray-50 border-gray-200';
        }
    };

    /**
     * Get verdict badge color
     * @param {string} verdict - Submission verdict
     * @returns {string} CSS color classes
     */
    const getVerdictColor = (verdict) => {
        switch (verdict) {
            case 'AC':
                return 'bg-green-100 text-green-800';
            case 'WA':
                return 'bg-red-100 text-red-800';
            case 'TLE':
                return 'bg-orange-100 text-orange-800';
            case 'RE':
                return 'bg-purple-100 text-purple-800';
            case 'CE':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    /**
     * Filter submissions based on current filter
     * @param {Array} submissions - All submissions
     * @returns {Array} Filtered submissions
     */
    const filterSubmissions = (submissions) => {
        if (filter === 'all') return submissions;
        return submissions.filter(sub => {
            switch (filter) {
                case 'accepted':
                    return sub.status === 'ACCEPTED';
                case 'rejected':
                    return sub.status === 'REJECTED';
                case 'running':
                    return sub.status === 'RUNNING';
                default:
                    return true;
            }
        });
    };

    /**
     * Format timestamp to relative time
     * @param {string} timestamp - ISO timestamp
     * @returns {string} Relative time string
     */
    const formatTime = (timestamp) => {
        const now = new Date();
        const time = new Date(timestamp);
        const diff = now - time;
        
        if (diff < 60000) return 'Just now';
        if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
        if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
        return time.toLocaleDateString();
    };

    if (!show) return null;

    const filteredSubmissions = filterSubmissions(submissionUpdates);

    return (
        <div className="fixed bottom-4 right-4 w-96 max-h-96 bg-white rounded-2xl shadow-xl border border-gray-200 z-50">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-blue-500" />
                    <h3 className="font-semibold text-gray-900">Live Submissions</h3>
                    {submissionUpdates.length > 0 && (
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                            {submissionUpdates.length}
                        </span>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={clearSubmissionUpdates}
                        className="text-gray-400 hover:text-gray-600 text-sm"
                    >
                        Clear
                    </button>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        ×
                    </button>
                </div>
            </div>

            {/* Filter */}
            <div className="p-3 border-b border-gray-200">
                <div className="flex gap-2">
                    {['all', 'accepted', 'rejected', 'running'].map(filterType => (
                        <button
                            key={filterType}
                            onClick={() => setFilter(filterType)}
                            className={`px-3 py-1 text-xs rounded-full transition-colors ${
                                filter === filterType
                                    ? 'bg-blue-100 text-blue-800'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Submissions List */}
            <div className="max-h-64 overflow-y-auto">
                {filteredSubmissions.length === 0 ? (
                    <div className="p-6 text-center text-gray-500">
                        <Code className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                        <p className="text-sm">No submissions yet</p>
                        <p className="text-xs text-gray-400">Submissions will appear here in real-time</p>
                    </div>
                ) : (
                    <div className="p-2">
                        {filteredSubmissions.map((submission, index) => (
                            <div
                                key={`${submission.id}-${index}`}
                                className={`mb-2 p-3 rounded-lg border transition-all duration-300 ${getStatusColor(submission.status)}`}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex items-start gap-2 flex-1">
                                        {getStatusIcon(submission.status)}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <User className="h-4 w-4 text-gray-400" />
                                                <span className="font-medium text-sm text-gray-900 truncate">
                                                    {submission.username}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600 mb-1">
                                                Problem {submission.problemId}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {submission.message}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-1 ml-2">
                                        {submission.verdict && (
                                            <span className={`text-xs px-2 py-1 rounded-full ${getVerdictColor(submission.verdict)}`}>
                                                {submission.verdict}
                                            </span>
                                        )}
                                        <span className="text-xs text-gray-400">
                                            {formatTime(new Date().toISOString())}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Footer */}
            {submissionUpdates.length > 0 && (
                <div className="p-3 border-t border-gray-200 bg-gray-50">
                    <p className="text-xs text-gray-500 text-center">
                        Showing {filteredSubmissions.length} of {submissionUpdates.length} submissions
                    </p>
                </div>
            )}
        </div>
    );
};

export default RealtimeSubmissions;
