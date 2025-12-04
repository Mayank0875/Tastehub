#!/bin/bash

# Online Judge Startup Script
echo "🚀 Starting Online Judge System..."

# Function to kill processes on exit
cleanup() {
    echo "🛑 Stopping servers..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Start Backend Server
echo "📡 Starting Backend Server (Port 3030)..."
cd backend
node app.js &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 2

# Start Frontend Server
echo "🎨 Starting Frontend Server (Port 5173)..."
cd ../frontend
npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ Both servers are running!"
echo "📡 Backend API: http://localhost:3030"
echo "🎨 Frontend App: http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for processes
wait $BACKEND_PID $FRONTEND_PID
