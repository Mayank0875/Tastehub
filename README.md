# 🚀 Arena - Online Judge System

## 🎓 Capstone Project: Complete Coding & Evaluation Platform

A full-featured competitive programming platform with **JWT authentication**, **role-based access control**, and comprehensive **CRUD operations** for problems and contests.

### ✅ Capstone Requirements Met
- ✅ **JWT Authentication** (15 marks) - Secure login with password hashing
- ✅ **2 CREATE APIs** - Problem & Contest creation (Admin only)
- ✅ **2 UPDATE APIs** - Problem & Contest updates (Admin only)
- ✅ **2 DELETE APIs** - Problem & Contest deletion (Admin only)
- ✅ **Role-based Access Control** - USER/ADMIN roles
- ✅ **Complete Documentation** - API docs, Postman collection, demo guide

## ✨ Features

- 🔐 **Authentication System** - JWT-based user registration/login
- 📝 **Code Editor** - In-browser code editing with syntax highlighting (C++, Python, JavaScript)
- ⚡ **Real-time Updates** - WebSocket-powered live submission results
- 👨‍💼 **Admin Panel** - Problem and user management interface
- 🎯 **Problem Solving** - Complete problem submission and judging system
- 📊 **Statistics** - User activity and system metrics

## 🛠️ Tech Stack

### Backend
- Node.js + Express.js
- MySQL + Prisma ORM
- JWT Authentication
- Socket.IO for real-time communication
- bcryptjs for password hashing

### Frontend
- React 19
- CodeMirror for code editing
- Tailwind CSS for styling
- Socket.IO client for real-time updates
- Custom routing system

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- MySQL database
- Git

### 1. Clone and Setup
```bash
git clone <your-repo>
cd "Online Judge"
```

### 2. Backend Setup
```bash
cd backend
npm install

# Create .env file with your database URL
echo 'DATABASE_URL="mysql://username:password@localhost:3306/online_judge"
JWT_SECRET="your-secret-key"
PORT=3030' > .env

# Update database schema
npx prisma db push
npx prisma generate

# Create admin user
node create-admin.js
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

### 4. Start Servers
```bash
# Option 1: Use startup script
chmod +x start-servers.sh
./start-servers.sh

# Option 2: Manual start
# Terminal 1: cd backend && node app.js
# Terminal 2: cd frontend && npm run dev
```

## 🌐 Access Points

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3030
- **Admin Panel**: http://localhost:5173/admin (login as admin)

## 👤 Default Admin Credentials

- **Username**: admin
- **Email**: admin@example.com
- **Password**: admin123

## 📋 API Endpoints

### 🔐 Authentication (15 Marks)
- `POST /auth/register` - User registration with password hashing
- `POST /auth/login` - User login with JWT token
- `GET /auth/profile` - Get user profile (auth required)
- `PUT /auth/profile` - Update profile (auth required)

### 📝 Problems
- `GET /problem` - List all problems (public)
- `GET /problem/:id` - Get problem details (public)

### 🏆 Contests (NEW)
- `GET /contests` - List all contests (public)
- `GET /contests/:id` - Get contest details (public)

### 💻 Submissions
- `POST /submit/:id/:ext` - Submit code solution (auth required)

### 👨‍💼 Admin - CRUD Operations (Admin only)

#### ✅ CREATE APIs (Capstone Requirement)
- `POST /admin/problems` - Create problem with test cases
- `POST /admin/contests` - Create contest with problem list

#### 🔄 UPDATE APIs (Capstone Requirement)
- `PUT /admin/problems/:id` - Update problem details
- `PUT /admin/contests/:id` - Update contest information

#### ❌ DELETE APIs (Capstone Requirement)
- `DELETE /admin/problems/:id` - Delete problem
- `DELETE /admin/contests/:id` - Delete contest

#### 👥 User Management
- `GET /admin/users` - List all users
- `PUT /admin/users/:id` - Update user role/status
- `GET /admin/stats` - System statistics

## 🔧 Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   lsof -ti:3030 | xargs kill -9
   ```

2. **Database Schema Error**
   ```bash
   cd backend
   npx prisma db push
   npx prisma generate
   ```

3. **Dependency Issues**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

## 📁 Project Structure

```
Online Judge/
├── backend/
│   ├── routes/          # API routes
│   ├── middleware/      # Authentication middleware
│   ├── CodeRunner/      # Code execution system
│   ├── Database/        # Database operations
│   └── prisma/          # Database schema
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── contexts/    # State management
│   │   ├── pages/       # Page components
│   │   └── App.jsx      # Main app component
└── docs/                # Documentation
```

## 🎯 Key Features Explained

### Authentication System
- Secure JWT-based authentication
- Password hashing with bcrypt
- Role-based access control (USER/ADMIN)
- Session management

### Code Editor
- Syntax highlighting for multiple languages
- Auto-completion and bracket matching
- Language-specific templates
- Real-time character/line count

### Real-time Updates
- WebSocket connection for live updates
- Real-time submission status changes
- Live submission feed with filtering
- Connection status monitoring

### Admin Panel
- Problem CRUD operations
- User management with role control
- System statistics dashboard
- Test case management

## 🔒 Security Features

- JWT token authentication
- Password hashing and validation
- Input sanitization
- Role-based authorization
- Secure file handling
- CORS configuration

## 📚 Documentation

### Capstone Project Documentation
- **[CAPSTONE_README.md](CAPSTONE_README.md)** - Complete capstone project documentation
- **[DEMO_GUIDE.md](DEMO_GUIDE.md)** - Step-by-step demo instructions for evaluation
- **[API_DOCUMENTATION.md](API_DOCUMENTATION.md)** - Detailed API reference
- **[QUICK_REFERENCE.md](QUICK_REFERENCE.md)** - Quick reference card
- **[CAPSTONE_SUMMARY.md](CAPSTONE_SUMMARY.md)** - Project summary and requirements
- **[EVALUATOR_CHECKLIST.md](EVALUATOR_CHECKLIST.md)** - Evaluation checklist
- **[Arena_Postman_Collection.json](Arena_Postman_Collection.json)** - Complete Postman API collection

### Technical Documentation
- [SETUP.md](SETUP.md) - Detailed setup guide
- [architecture.md](docs/architecture.md) - System architecture
- All code includes comprehensive JSDoc documentation

## 🧪 Testing

### Automated Testing (Recommended)
```bash
# Terminal 1: Start server
cd backend && node app.js

# Terminal 2: Run automated tests
cd backend && node test-capstone.js
```

This will test all capstone requirements:
- ✅ Authentication (JWT, password hashing)
- ✅ CREATE APIs (Problem, Contest)
- ✅ UPDATE APIs (Problem, Contest)
- ✅ DELETE APIs (Problem, Contest)
- ✅ Access control verification

### Postman Testing
1. Import `Arena_Postman_Collection.json` into Postman
2. Collection includes all endpoints organized by requirement
3. Tokens are automatically saved to variables
4. Follow the demo flow in DEMO_GUIDE.md

## 🎯 Capstone Evaluation

**For evaluators:** See [EVALUATOR_CHECKLIST.md](EVALUATOR_CHECKLIST.md) for quick verification.

**For demo:** See [DEMO_GUIDE.md](DEMO_GUIDE.md) for step-by-step instructions.

**All requirements met:**
- ✅ JWT Authentication (15 marks)
- ✅ 2 CREATE APIs (Problem, Contest)
- ✅ 2 UPDATE APIs (Problem, Contest)
- ✅ 2 DELETE APIs (Problem, Contest)
- ✅ Role-based Access Control
- ✅ Complete Documentation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

## 🎓 Capstone Project Status

**Status:** ✅ Complete and Ready for Evaluation  
**Requirements:** ✅ All Met  
**Documentation:** ✅ Comprehensive  
**Testing:** ✅ Automated + Postman  

**Ready to code? Start solving problems at http://localhost:5173!** 🎉  
**Ready to evaluate? See [DEMO_GUIDE.md](DEMO_GUIDE.md)!** 📝
