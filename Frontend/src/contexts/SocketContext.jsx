/**
 * WebSocket Context for real-time communication
 * @fileoverview Manages WebSocket connection and real-time submission updates
 */

import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext();

/**
 * WebSocket provider component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element} Socket provider
 */
export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [submissionUpdates, setSubmissionUpdates] = useState([]);

    useEffect(() => {
        // Initialize socket connection
        const newSocket = io('http://localhost:3030', {
            transports: ['websocket']
        });

        newSocket.on('connect', () => {
            console.log('Connected to server');
            setIsConnected(true);
        });

        newSocket.on('disconnect', () => {
            console.log('Disconnected from server');
            setIsConnected(false);
        });

        // Listen for submission updates
        newSocket.on('submission_update', (data) => {
            console.log('Submission update received:', data);
            setSubmissionUpdates(prev => [data, ...prev.slice(0, 49)]); // Keep last 50 updates
        });

        setSocket(newSocket);

        // Cleanup on unmount
        return () => {
            newSocket.close();
        };
    }, []);

    /**
     * Emit a custom event to the server
     * @param {string} event - Event name
     * @param {*} data - Event data
     */
    const emit = (event, data) => {
        if (socket && isConnected) {
            socket.emit(event, data);
        }
    };

    /**
     * Listen to a custom event from the server
     * @param {string} event - Event name
     * @param {Function} callback - Event callback
     */
    const on = (event, callback) => {
        if (socket) {
            socket.on(event, callback);
        }
    };

    /**
     * Remove event listener
     * @param {string} event - Event name
     * @param {Function} callback - Event callback
     */
    const off = (event, callback) => {
        if (socket) {
            socket.off(event, callback);
        }
    };

    /**
     * Clear submission updates
     */
    const clearSubmissionUpdates = () => {
        setSubmissionUpdates([]);
    };

    const value = {
        socket,
        isConnected,
        submissionUpdates,
        emit,
        on,
        off,
        clearSubmissionUpdates
    };

    return (
        <SocketContext.Provider value={value}>
            {children}
        </SocketContext.Provider>
    );
};

/**
 * Hook to use socket context
 * @returns {Object} Socket context value
 */
export const useSocket = () => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error('useSocket must be used within a SocketProvider');
    }
    return context;
};
