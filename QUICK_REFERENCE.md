# 🚀 Arena - Quick Reference Card

## 📦 Setup Commands

```bash
# 1. Install dependencies
cd backend && npm install

# 2. Setup database
npx prisma db push && npx prisma generate

# 3. Create admin user
node create-admin.js

# 4. Start server
node app.js
```

---

## 🔑 Default Credentials

**Admin:**
- Username: `admin`
- Password: `admin123`

---

## 🎯 Capstone Requirements

### ✅ Authentication (15 Marks)
- JWT-based authentication
- Password hashing (bcrypt)
- Role-based access control
- Token verification middleware

### ✅ CRUD Operations

| Operation | Endpoint | Method | Auth |
|-----------|----------|--------|------|
| **CREATE Problem** | `/admin/problems` | POST | Admin |
| **CREATE Contest** | `/admin/contests` | POST | Admin |
| **UPDATE Problem** | `/admin/problems/:id` | PUT | Admin |
| **UPDATE Contest** | `/admin/contests/:id` | PUT | Admin |
| **DELETE Problem** | `/admin/problems/:id` | DELETE | Admin |
| **DELETE Contest** | `/admin/contests/:id` | DELETE | Admin |

---

## 📡 All API Endpoints

### Authentication
```
POST   /auth/register      - Register new user
POST   /auth/login         - Login and get JWT
GET    /auth/profile       - Get user profile (auth)
PUT    /auth/profile       - Update profile (auth)
```

### Problems
```
GET    /problem            - List all problems (public)
GET    /problem/:id        - Get problem details (public)
POST   /admin/problems     - Create problem (admin)
PUT    /admin/problems/:id - Update problem (admin)
DELETE /admin/problems/:id - Delete problem (admin)
```

### Contests
```
GET    /contests           - List all contests (public)
GET    /contests/:id       - Get contest details (public)
POST   /admin/contests     - Create contest (admin)
PUT    /admin/contests/:id - Update contest (admin)
DELETE /admin/contests/:id - Delete contest (admin)
```

### Admin
```
GET    /admin/users        - List all users (admin)
PUT    /admin/users/:id    - Update user role (admin)
GET    /admin/stats        - System statistics (admin)
```

---

## 🧪 Testing

### Automated Test
```bash
node test-capstone.js
```

### Postman
Import: `Arena_Postman_Collection.json`

---

## 📝 Sample Requests

### 1. Login
```json
POST /auth/login
{
  "username": "admin",
  "password": "admin123"
}
```

### 2. Create Problem
```json
POST /admin/problems
Authorization: Bearer <token>
{
  "title": "Two Sum",
  "rating": 800,
  "tags": "[\"array\"]",
  "description": "Problem description",
  "constraints": "Constraints",
  "sampleInput": "Input",
  "sampleOutput": "Output",
  "notes": "Notes",
  "testCases": [
    {"input": "test", "output": "result"}
  ]
}
```

### 3. Create Contest
```json
POST /admin/contests
Authorization: Bearer <token>
{
  "name": "Weekly Contest",
  "description": "Contest description",
  "problemIds": [1, 2],
  "startsAt": "2024-12-10T10:00:00Z",
  "endsAt": "2024-12-10T12:00:00Z"
}
```

### 4. Update Problem
```json
PUT /admin/problems/1
Authorization: Bearer <token>
{
  "title": "Updated Title",
  "rating": 900
}
```

### 5. Delete Problem
```
DELETE /admin/problems/1
Authorization: Bearer <token>
```

---

## 🔒 Security Features

✅ JWT authentication  
✅ Password hashing (bcrypt, 12 rounds)  
✅ Role-based authorization  
✅ Input validation  
✅ Token expiration (7 days)  
✅ Protected admin routes  

---

## 📊 Response Format

### Success
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### Error
```json
{
  "success": false,
  "message": "Error description"
}
```

---

## 🐛 Troubleshooting

```bash
# Kill port 3030
lsof -ti:3030 | xargs kill -9

# Reset database
npx prisma db push --force-reset

# Regenerate Prisma client
npx prisma generate

# Check MySQL
mysql -u root -p
```

---

## 📁 Project Structure

```
backend/
├── routes/
│   ├── auth.js          # Authentication
│   ├── admin.js         # Problem CRUD
│   ├── contest.js       # Contest CRUD
│   └── ...
├── middleware/
│   └── auth.js          # JWT & role middleware
├── prisma/
│   └── schema.prisma    # Database schema
├── app.js               # Main server
└── create-admin.js      # Admin setup
```

---

## ✅ Evaluation Checklist

- [x] JWT Authentication (15 marks)
- [x] 2 CREATE APIs (Problem, Contest)
- [x] 2 UPDATE APIs (Problem, Contest)
- [x] 2 DELETE APIs (Problem, Contest)
- [x] Role-based access control
- [x] Input validation
- [x] Error handling
- [x] Postman collection
- [x] Complete documentation

---

## 🎯 Demo Flow (5 min)

1. Start server: `node app.js`
2. Run tests: `node test-capstone.js`
3. Show Postman collection
4. Demonstrate access control
5. Show database records

---

**Server URL:** http://localhost:3030  
**Documentation:** CAPSTONE_README.md  
**Demo Guide:** DEMO_GUIDE.md  
**Postman:** Arena_Postman_Collection.json

---

**Ready for evaluation! 🎉**
