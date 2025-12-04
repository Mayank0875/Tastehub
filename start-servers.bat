@echo off
echo 🚀 Starting Online Judge System...

echo 📡 Starting Backend Server (Port 3030)...
start "Backend Server" cmd /k "cd backend && node app.js"

timeout /t 3 /nobreak >nul

echo 🎨 Starting Frontend Server (Port 5173)...
start "Frontend Server" cmd /k "cd frontend && npm run dev"

echo.
echo ✅ Both servers are starting!
echo 📡 Backend API: http://localhost:3030
echo 🎨 Frontend App: http://localhost:5173
echo.
echo Press any key to exit...
pause >nul
