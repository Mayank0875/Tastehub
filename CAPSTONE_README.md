# 🏆 Capstone Project: Arena – Online Coding & Evaluation Platform

## 📋 Project Overview

**Arena** is a lightweight online coding platform designed for educational use. It allows admins to upload coding problems and contests, while users can log in, view problems, and submit solutions. This project demonstrates secure authentication and comprehensive CRUD operations.

### ✅ Capstone Requirements Met

- ✅ **JWT Authentication** (15 marks)
- ✅ **2 Create APIs** - Problem & Contest creation
- ✅ **2 Update APIs** - Problem & Contest updates
- ✅ **2 Delete APIs** - Problem & Contest deletion
- ✅ **Role-based Access Control** - Admin/User roles
- ✅ **Clean REST APIs** with proper validation

---

## 🎯 Project Goals

1. Build a secure authentication system using JWT
2. Implement CRUD operations for Problems and Contests
3. Ensure role-based access control:
   - **Admin** → can create/update/delete
   - **User** → can only view
4. Keep the project simple, clean, and easy to demonstrate

---

## 🛠️ Tech Stack

| Component | Technology |
|-----------|-----------|
| **Backend** | Node.js + Express.js |
| **Database** | MySQL + Prisma ORM |
| **Authentication** | JWT (jsonwebtoken) |
| **Password Security** | bcryptjs |
| **Frontend** | React.js (optional) |
| **Real-time** | Socket.IO |

---

## 📊 Database Schema

### User
```javascript
{
  id: Integer (Primary Key)
  username: String (Unique)
  email: String (Unique)
  password: String (Hashed)
  role: String (USER | ADMIN)
  isActive: Boolean
  createdAt: DateTime
  updatedAt: DateTime
}
```

### Problem
```javascript
{
  id: Integer (Primary Key)
  title: String (Unique)
  description: Text
  difficulty: Integer (rating)
  tags: JSON Array
  constraints: Text
  sampleInput: Text
  sampleOutput: Text
  notes: Text
  createdAt: DateTime
  updatedAt: DateTime
}
```

### Contest
```javascript
{
  id: Integer (Primary Key)
  name: String
  description: Text
  problemIds: JSON Array
  startsAt: DateTime
  endsAt: DateTime
  createdAt: DateTime
  updatedAt: DateTime
}
```

---

## 🔐 Authentication System (15 Marks)

### Implemented Features

✅ Secure password hashing using bcryptjs  
✅ JWT-based login with 7-day expiration  
✅ Token verification middleware  
✅ Role-based authorization (admin-only routes)  
✅ User profile management  

### Auth APIs

| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|---------------|
| `/auth/register` | POST | Register new user | No |
| `/auth/login` | POST | Login and receive JWT | No |
| `/auth/profile` | GET | Get user profile | Yes |
| `/auth/profile` | PUT | Update profile | Yes |

---

## 📝 CRUD APIs (Capstone Requirement)

### ✅ CREATE APIs (2 Required)

#### 1. Create Problem
```
POST /admin/problems
Authorization: Bearer <admin_token>

Body:
{
  "title": "Two Sum",
  "rating": 800,
  "tags": "[\"array\", \"hash-table\"]",
  "description": "Problem description...",
  "constraints": "Constraints...",
  "sampleInput": "Sample input...",
  "sampleOutput": "Sample output...",
  "notes": "Additional notes...",
  "testCases": [
    { "input": "...", "output": "..." }
  ]
}
```

#### 2. Create Contest
```
POST /admin/contests
Authorization: Bearer <admin_token>

Body:
{
  "name": "Weekly Contest 1",
  "description": "Contest description...",
  "problemIds": [1, 2, 3],
  "startsAt": "2024-12-10T10:00:00Z",
  "endsAt": "2024-12-10T12:00:00Z"
}
```

---

### 🔄 UPDATE APIs (2 Required)

#### 1. Update Problem
```
PUT /admin/problems/:id
Authorization: Bearer <admin_token>

Body:
{
  "title": "Updated Title",
  "rating": 900,
  "description": "Updated description..."
}
```

#### 2. Update Contest
```
PUT /admin/contests/:id
Authorization: Bearer <admin_token>

Body:
{
  "name": "Updated Contest Name",
  "description": "Updated description...",
  "problemIds": [1, 2, 3, 4],
  "endsAt": "2024-12-10T14:00:00Z"
}
```

---

### ❌ DELETE APIs (2 Required)

#### 1. Delete Problem
```
DELETE /admin/problems/:id
Authorization: Bearer <admin_token>
```

#### 2. Delete Contest
```
DELETE /admin/contests/:id
Authorization: Bearer <admin_token>
```

---

## 🌐 Additional APIs (Not Counted in CRUD)

### Public Routes (No Auth Required)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/problem` | GET | List all problems |
| `/problem/:id` | GET | Get single problem |
| `/contests` | GET | List all contests |
| `/contests/:id` | GET | Get single contest |

### Protected Routes (Auth Required)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/submit/:id/:ext` | POST | Submit code solution |

### Admin Routes (Admin Only)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/admin/users` | GET | List all users |
| `/admin/users/:id` | PUT | Update user role/status |
| `/admin/stats` | GET | System statistics |

---

## 🔒 Security Features

✅ JWT token authentication  
✅ Password hashing with bcrypt (12 rounds)  
✅ Input validation on all endpoints  
✅ Role-based authorization middleware  
✅ Secure file handling for code submissions  
✅ CORS configuration  
✅ SQL injection prevention (Prisma ORM)  

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v16+)
- MySQL database
- Git

### 1. Clone Repository
```bash
git clone <your-repo>
cd "Online Judge"
```

### 2. Backend Setup
```bash
cd backend
npm install

# Create .env file
echo 'DATABASE_URL="mysql://username:password@localhost:3306/arena_db"
JWT_SECRET="your-secret-key-here"
PORT=3030' > .env

# Update database schema
npx prisma db push
npx prisma generate
```

### 3. Create Admin User
```bash
node create-admin.js
```

### 4. Start Backend Server
```bash
node app.js
```

Server will run on: `http://localhost:3030`

---

## 🧪 Testing with Postman

### Import Collection
1. Open Postman
2. Click **Import**
3. Select `Arena_Postman_Collection.json`
4. Collection will be imported with all endpoints

### Demo Flow (For Evaluation)

#### Step 1: Register Users
1. **Register Admin** → Use "Register Admin" request
2. **Register User** → Use "Register User" request

#### Step 2: Login
1. **Login Admin** → Token saved automatically to `{{adminToken}}`
2. **Login User** → Token saved automatically to `{{token}}`

#### Step 3: CREATE Operations (Admin)
1. **Create Problem** → POST `/admin/problems`
2. **Create Contest** → POST `/admin/contests`

#### Step 4: UPDATE Operations (Admin)
1. **Update Problem** → PUT `/admin/problems/1`
2. **Update Contest** → PUT `/admin/contests/1`

#### Step 5: DELETE Operations (Admin)
1. **Delete Problem** → DELETE `/admin/problems/1`
2. **Delete Contest** → DELETE `/admin/contests/1`

#### Step 6: Access Control Test
1. Try accessing admin routes with user token → Should get **403 Forbidden**
2. Try accessing protected routes without token → Should get **401 Unauthorized**

---

## 📁 Project Structure

```
Arena/
├── backend/
│   ├── routes/
│   │   ├── auth.js           # Authentication routes
│   │   ├── admin.js          # Admin CRUD operations
│   │   ├── contest.js        # Contest CRUD operations
│   │   ├── fetch_problem.js  # Public problem routes
│   │   └── submit_problem.js # Code submission
│   ├── middleware/
│   │   └── auth.js           # JWT & role middleware
│   ├── prisma/
│   │   └── schema.prisma     # Database schema
│   ├── CodeRunner/           # Code execution system
│   ├── Database/             # DB operations
│   ├── app.js                # Main server file
│   └── package.json
├── frontend/                 # React frontend (optional)
├── Arena_Postman_Collection.json
├── CAPSTONE_README.md
└── README.md
```

---

## 📊 API Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message"
}
```

---

## 🎓 Evaluation Checklist

### Authentication (15 Marks)
- [x] User registration with password hashing
- [x] User login with JWT generation
- [x] Token verification middleware
- [x] Role-based access control
- [x] Secure password storage

### CRUD Operations
- [x] **Create Problem** (Admin only)
- [x] **Create Contest** (Admin only)
- [x] **Update Problem** (Admin only)
- [x] **Update Contest** (Admin only)
- [x] **Delete Problem** (Admin only)
- [x] **Delete Contest** (Admin only)

### Additional Features
- [x] Input validation on all endpoints
- [x] Proper error handling
- [x] RESTful API design
- [x] Database relationships (Prisma)
- [x] Postman collection for testing

---

## 🎬 Demo Script

### For Quick Evaluation (5 minutes)

1. **Start Server**: `cd backend && node app.js`
2. **Open Postman**: Import collection
3. **Register Admin**: POST `/auth/register` (admin credentials)
4. **Login Admin**: POST `/auth/login` → Get token
5. **Create Problem**: POST `/admin/problems` (with admin token)
6. **Create Contest**: POST `/admin/contests` (with admin token)
7. **Update Problem**: PUT `/admin/problems/1`
8. **Update Contest**: PUT `/admin/contests/1`
9. **Delete Problem**: DELETE `/admin/problems/1`
10. **Delete Contest**: DELETE `/admin/contests/1`
11. **Test Access Control**: Try admin route with user token → 403 error

---

## 📝 Default Admin Credentials

After running `create-admin.js`:

```
Username: admin
Email: admin@example.com
Password: admin123
```

---

## 🐛 Troubleshooting

### Database Connection Error
```bash
# Check MySQL is running
mysql -u root -p

# Update DATABASE_URL in .env
DATABASE_URL="mysql://root:password@localhost:3306/arena_db"
```

### Port Already in Use
```bash
# Kill process on port 3030
lsof -ti:3030 | xargs kill -9
```

### Prisma Schema Issues
```bash
cd backend
npx prisma db push
npx prisma generate
```

---

## 📄 Deliverables

✅ Complete backend code with all routes  
✅ Database schema (Prisma)  
✅ Authentication & authorization middleware  
✅ Postman collection for testing  
✅ Comprehensive README documentation  
✅ Working demo ready for evaluation  

---

## 🎯 Key Highlights for Evaluation

1. **Clean Code**: Well-organized, documented, and follows best practices
2. **Security**: JWT authentication, password hashing, role-based access
3. **Validation**: Input validation on all endpoints
4. **Error Handling**: Proper error responses with status codes
5. **RESTful Design**: Standard HTTP methods and status codes
6. **Database**: Proper schema design with relationships
7. **Testing**: Complete Postman collection for easy testing

---

## 👨‍💻 Author

**Arena Platform**  
Capstone Project - Online Coding & Evaluation System

---

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review Postman collection examples
3. Verify database connection and schema

---

**Ready for Evaluation! 🚀**

All capstone requirements met:
- ✅ JWT Authentication (15 marks)
- ✅ 2 Create APIs
- ✅ 2 Update APIs  
- ✅ 2 Delete APIs
- ✅ Role-based Access Control
- ✅ Complete Documentation
