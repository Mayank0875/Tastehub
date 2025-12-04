# Online Judge Setup Guide

This guide will help you set up the Online Judge system with all the new features implemented.

## Features Implemented

✅ **Authentication System** - User registration/login with JWT
✅ **Code Editor Integration** - In-browser code editing with CodeMirror
✅ **Real-time Updates** - WebSocket for live submission results
✅ **Admin Panel** - Problem creation and management interface

## Prerequisites

- Node.js (v16 or higher)
- MySQL database
- Git

## Backend Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Environment Configuration

Create a `.env` file in the backend directory:

```env
# Database Configuration
DATABASE_URL="mysql://username:password@localhost:3306/online_judge"

# JWT Configuration
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"

# Server Configuration
PORT=3030

# Environment
NODE_ENV="development"
```

### 3. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Update database schema (IMPORTANT!)
npx prisma db push

# Create admin user for testing
node create-admin.js
```

**Important**: The `npx prisma db push` command is crucial as it updates your database schema to include the new authentication fields (`role`, `isActive`) that were added to the User model.

### 4. Start Backend Server

```bash
npm start
# or
node app.js
```

The backend will be available at `http://localhost:3030`

## Frontend Setup

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## Database Schema

The system uses the following main entities:

- **Users**: Authentication and user management
- **Problems**: Coding problems with metadata
- **TestCases**: Input/output pairs for automated judging
- **Submissions**: User code submissions with verdicts

### Key Features of Database Schema

- User roles (USER, ADMIN)
- Password hashing with bcrypt
- Cascade deletes for data integrity
- JSON fields for flexible problem tags

## API Endpoints

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /auth/profile` - Get user profile (requires auth)
- `PUT /auth/profile` - Update user profile (requires auth)

### Problems (Public)
- `GET /problem` - List all problems
- `GET /problem/:id` - Get problem details

### Submissions (Authenticated)
- `POST /submit/:id/:ext` - Submit code solution

### Admin (Admin only)
- `POST /admin/problems` - Create problem
- `PUT /admin/problems/:id` - Update problem
- `DELETE /admin/problems/:id` - Delete problem
- `POST /admin/problems/:id/testcases` - Add test cases
- `GET /admin/users` - List users
- `PUT /admin/users/:id` - Update user
- `GET /admin/stats` - Get system statistics

## WebSocket Events

The system uses Socket.IO for real-time communication:

- `submission_update` - Real-time submission status updates

## Code Editor Features

The integrated code editor supports:

- **Languages**: C++, Python, JavaScript
- **Features**: Syntax highlighting, auto-completion, bracket matching
- **Themes**: Light and dark mode
- **Templates**: Default code templates for each language

## Admin Panel Features

- **Problem Management**: Create, edit, delete problems
- **User Management**: View users, toggle active status
- **Statistics**: System overview with key metrics
- **Test Case Management**: Add test cases to problems

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control
- Input validation and sanitization
- Secure file handling for code submissions

## Real-time Features

- Live submission status updates
- Real-time notifications
- WebSocket connection management
- Submission filtering and history

## Development Notes

### Backend Architecture
- Express.js with middleware for authentication
- Prisma ORM for database operations
- Socket.IO for real-time communication
- Multer for file uploads
- bcryptjs for password hashing
- jsonwebtoken for JWT tokens

### Frontend Architecture
- React with custom routing
- Context API for state management
- Axios for HTTP requests
- CodeMirror for code editing
- Socket.IO client for real-time updates
- Tailwind CSS for styling

## Quick Start

### Option 1: Use the Startup Script (Recommended)
```bash
# Make the script executable (if not already)
chmod +x start-servers.sh

# Start both servers
./start-servers.sh
```

### Option 2: Manual Start
```bash
# Terminal 1 - Backend
cd backend
npm install
node app.js

# Terminal 2 - Frontend  
cd frontend
npm install
npm run dev
```

## Troubleshooting

### Dependency Issues (SOLVED ✅)
If you encounter dependency version conflicts:

1. **Clear existing dependencies:**
```bash
cd backend && rm -rf node_modules package-lock.json
cd frontend && rm -rf node_modules package-lock.json
```

2. **Reinstall with correct versions:**
```bash
cd backend && npm install
cd frontend && npm install
```

### Common Issues

1. **Port Already in Use (EADDRINUSE)**
```bash
# Find process using port 3030
lsof -ti:3030

# Kill the process
kill <PID>
```

2. **Database Schema Error (RESOLVED ✅)**
   If you see: `The column 'online_judge.User.role' does not exist in the current database`
   ```bash
   cd backend
   npx prisma db push
   npx prisma generate
   ```

3. **Database Connection**: Ensure MySQL is running and credentials are correct
4. **JWT Secret**: Use a strong, unique JWT secret in production
5. **CORS**: Frontend and backend ports must be properly configured
6. **WebSocket**: Ensure both servers are running for real-time features

### Package Version Conflicts (RESOLVED ✅)
The following versions have been tested and work correctly:

**Frontend Dependencies:**
- `@codemirror/lang-cpp`: `^6.0.3`
- `@codemirror/lang-javascript`: `^6.2.4` 
- `@codemirror/lang-python`: `^6.2.1`
- `@uiw/react-codemirror`: `^4.25.2`

**Backend Dependencies:**
- `bcryptjs`: `^2.4.3`
- `jsonwebtoken`: `^9.0.2`
- `socket.io`: `^4.8.1`

### Logs

Check console logs for detailed error messages:
- Backend: Terminal where you started the server
- Frontend: Browser developer console

### Environment Setup

Create a `.env` file in the backend directory:
```env
DATABASE_URL="mysql://username:password@localhost:3306/online_judge"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
PORT=3030
NODE_ENV="development"
```

## Production Deployment

For production deployment:

1. Set `NODE_ENV=production`
2. Use a strong JWT secret
3. Configure proper CORS origins
4. Use HTTPS for secure communication
5. Set up proper database backups
6. Configure reverse proxy (nginx/Apache)

## Support

For issues or questions, check the console logs and ensure all dependencies are properly installed.
