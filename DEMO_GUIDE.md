# 🎬 Arena - Complete Demo Guide for Evaluation

## 📋 Quick Setup (5 Minutes)

### Step 1: Install Dependencies
```bash
cd backend
npm install
```

### Step 2: Configure Database
```bash
# Create .env file (if not exists)
echo 'DATABASE_URL="mysql://root:password@localhost:3306/Online_Judge"
JWT_SECRET="your-secret-key-here"
PORT=3030' > .env

# Update database schema
npx prisma db push
npx prisma generate
```

### Step 3: Create Admin User
```bash
node create-admin.js
```

**Default Admin Credentials:**
- Username: `admin`
- Email: `admin@example.com`
- Password: `admin123`

### Step 4: Start Server
```bash
node app.js
```

Server will run on: **http://localhost:3030**

---

## 🧪 Testing Methods

### Method 1: Automated Test Script (Recommended)

```bash
# In a new terminal (keep server running)
cd backend
node test-capstone.js
```

This will automatically test:
- ✅ User & Admin registration
- ✅ Authentication (login)
- ✅ CREATE Problem & Contest
- ✅ UPDATE Problem & Contest
- ✅ DELETE Problem & Contest
- ✅ Access control verification

### Method 2: Postman Collection

1. Open Postman
2. Click **Import**
3. Select `Arena_Postman_Collection.json` from project root
4. Follow the demo flow below

---

## 🎯 Demo Flow for Evaluation (10 Minutes)

### Part 1: Authentication (2 minutes)

#### 1. Register Admin
```
POST http://localhost:3030/auth/register

Body:
{
  "username": "demoadmin",
  "email": "demoadmin@example.com",
  "password": "admin123"
}

Expected: 201 Created + JWT token
```

#### 2. Login Admin
```
POST http://localhost:3030/auth/login

Body:
{
  "username": "admin",
  "password": "admin123"
}

Expected: 200 OK + JWT token
Copy the token for next requests!
```

#### 3. Register Normal User
```
POST http://localhost:3030/auth/register

Body:
{
  "username": "demouser",
  "email": "demouser@example.com",
  "password": "user123"
}

Expected: 201 Created + JWT token
```

---

### Part 2: CREATE APIs (2 minutes)

#### 4. Create Problem (Admin Only) ✅
```
POST http://localhost:3030/admin/problems
Authorization: Bearer <admin_token>

Body:
{
  "title": "Two Sum",
  "rating": 800,
  "tags": "[\"array\", \"hash-table\"]",
  "description": "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
  "constraints": "2 <= nums.length <= 10^4",
  "sampleInput": "[2,7,11,15]\n9",
  "sampleOutput": "[0,1]",
  "notes": "You may assume that each input would have exactly one solution.",
  "testCases": [
    {
      "input": "[2,7,11,15]\n9",
      "output": "[0,1]"
    },
    {
      "input": "[3,2,4]\n6",
      "output": "[1,2]"
    }
  ]
}

Expected: 201 Created + Problem ID
Note the problem ID for next steps!
```

#### 5. Create Contest (Admin Only) ✅
```
POST http://localhost:3030/admin/contests
Authorization: Bearer <admin_token>

Body:
{
  "name": "Weekly Contest 1",
  "description": "First weekly coding contest with beginner-friendly problems",
  "problemIds": [1],
  "startsAt": "2024-12-10T10:00:00Z",
  "endsAt": "2024-12-10T12:00:00Z"
}

Expected: 201 Created + Contest ID
Note the contest ID for next steps!
```

---

### Part 3: UPDATE APIs (2 minutes)

#### 6. Update Problem (Admin Only) ✅
```
PUT http://localhost:3030/admin/problems/1
Authorization: Bearer <admin_token>

Body:
{
  "title": "Two Sum (Updated)",
  "rating": 900,
  "description": "Updated description for Two Sum problem with more details."
}

Expected: 200 OK + Updated problem data
```

#### 7. Update Contest (Admin Only) ✅
```
PUT http://localhost:3030/admin/contests/1
Authorization: Bearer <admin_token>

Body:
{
  "name": "Weekly Contest 1 (Extended)",
  "description": "Extended contest with more time for participants",
  "endsAt": "2024-12-10T14:00:00Z"
}

Expected: 200 OK + Updated contest data
```

---

### Part 4: Access Control Demo (2 minutes)

#### 8. Test User Access to Admin Route (Should Fail)
```
POST http://localhost:3030/admin/problems
Authorization: Bearer <user_token>

Body:
{
  "title": "Unauthorized Problem"
}

Expected: 403 Forbidden
Message: "Admin access required"
```

#### 9. Test No Token Access (Should Fail)
```
POST http://localhost:3030/admin/problems
(No Authorization header)

Expected: 401 Unauthorized
Message: "Access token required"
```

---

### Part 5: DELETE APIs (2 minutes)

#### 10. Delete Problem (Admin Only) ✅
```
DELETE http://localhost:3030/admin/problems/1
Authorization: Bearer <admin_token>

Expected: 200 OK
Message: "Problem deleted successfully"
```

#### 11. Delete Contest (Admin Only) ✅
```
DELETE http://localhost:3030/admin/contests/1
Authorization: Bearer <admin_token>

Expected: 200 OK
Message: "Contest deleted successfully"
```

---

## 📊 Verification Checklist

### Authentication (15 Marks)
- [x] User registration with validation
- [x] Password hashing (bcrypt)
- [x] JWT token generation
- [x] Token verification middleware
- [x] Role-based access control

### CRUD Operations
- [x] **CREATE Problem** - Admin only, with validation
- [x] **CREATE Contest** - Admin only, with date validation
- [x] **UPDATE Problem** - Admin only, partial updates
- [x] **UPDATE Contest** - Admin only, partial updates
- [x] **DELETE Problem** - Admin only, cascade delete
- [x] **DELETE Contest** - Admin only

### Security Features
- [x] JWT authentication on protected routes
- [x] Admin-only middleware
- [x] Input validation
- [x] Error handling
- [x] Proper HTTP status codes

---

## 🎥 Quick Demo Script (For Presentation)

```bash
# Terminal 1: Start server
cd backend
node app.js

# Terminal 2: Run automated tests
cd backend
node test-capstone.js
```

**Say during demo:**
1. "I've built Arena, a coding platform with JWT authentication"
2. "Let me show you the automated test that covers all requirements"
3. "As you can see, it tests 2 CREATE, 2 UPDATE, and 2 DELETE APIs"
4. "All operations are admin-protected with JWT authentication"
5. "The access control test shows users can't access admin routes"

---

## 📝 Sample API Responses

### Success Response
```json
{
  "success": true,
  "message": "Problem created successfully",
  "data": {
    "problem": {
      "id": 1,
      "title": "Two Sum",
      "rating": 800,
      "tags": ["array", "hash-table"],
      "description": "...",
      "createdAt": "2024-12-04T10:00:00.000Z"
    }
  }
}
```

### Error Response (Unauthorized)
```json
{
  "success": false,
  "message": "Admin access required"
}
```

### Error Response (Validation)
```json
{
  "success": false,
  "message": "Title, rating, tags, description, constraints, sample input, and sample output are required"
}
```

---

## 🔍 Database Verification

### Check Created Data
```bash
# Connect to MySQL
mysql -u root -p

# Use database
USE Online_Judge;

# Check problems
SELECT id, title, rating FROM Problem;

# Check contests
SELECT id, name, startsAt, endsAt FROM Contest;

# Check users
SELECT id, username, email, role FROM User;
```

---

## 🐛 Common Issues & Solutions

### Issue 1: Server won't start
```bash
# Check if port 3030 is in use
lsof -ti:3030 | xargs kill -9

# Restart server
node app.js
```

### Issue 2: Database connection error
```bash
# Check MySQL is running
mysql -u root -p

# Update .env with correct credentials
DATABASE_URL="mysql://root:your_password@localhost:3306/Online_Judge"
```

### Issue 3: Prisma schema out of sync
```bash
npx prisma db push
npx prisma generate
```

### Issue 4: Admin user doesn't exist
```bash
node create-admin.js
```

---

## 📦 What to Submit

1. ✅ Complete source code (backend folder)
2. ✅ `CAPSTONE_README.md` - Project documentation
3. ✅ `Arena_Postman_Collection.json` - API testing
4. ✅ `DEMO_GUIDE.md` - This file
5. ✅ Database schema (prisma/schema.prisma)
6. ✅ Optional: Short video demo (2-3 minutes)

---

## 🎯 Evaluation Points Summary

| Requirement | Implementation | Status |
|-------------|----------------|--------|
| JWT Authentication | bcryptjs + jsonwebtoken | ✅ |
| Password Hashing | bcrypt with 12 rounds | ✅ |
| Token Verification | Middleware on all protected routes | ✅ |
| Role-based Access | Admin/User roles with middleware | ✅ |
| CREATE Problem | POST /admin/problems | ✅ |
| CREATE Contest | POST /admin/contests | ✅ |
| UPDATE Problem | PUT /admin/problems/:id | ✅ |
| UPDATE Contest | PUT /admin/contests/:id | ✅ |
| DELETE Problem | DELETE /admin/problems/:id | ✅ |
| DELETE Contest | DELETE /admin/contests/:id | ✅ |
| Input Validation | All endpoints validated | ✅ |
| Error Handling | Proper status codes & messages | ✅ |
| Documentation | Complete README + Postman | ✅ |

---

## 🚀 Ready for Evaluation!

Your Arena project is complete and ready to demonstrate. All capstone requirements are met with clean, secure, and well-documented code.

**Good luck with your evaluation! 🎉**
