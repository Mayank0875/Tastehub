# ✅ Evaluator Checklist - Arena Capstone Project

## 📋 Quick Evaluation Guide (10 Minutes)

This checklist helps evaluators quickly verify all capstone requirements.

---

## 🚀 Setup (2 minutes)

### Step 1: Start the Server
```bash
cd backend
node app.js
```

**Expected Output:**
```
Server is running on port 3030
```

✅ Server starts without errors  
✅ Port 3030 is accessible  

---

## 🧪 Automated Testing (3 minutes)

### Step 2: Run Automated Tests
```bash
# In a new terminal (keep server running)
cd backend
node test-capstone.js
```

**Expected Output:**
```
🚀 Starting Capstone Project Tests

1️⃣  Testing Admin Registration...
✅ Admin registered

2️⃣  Testing User Registration...
✅ User registered

3️⃣  Testing Admin Login...
✅ Admin logged in

4️⃣  Testing User Login...
✅ User logged in

5️⃣  Testing CREATE Problem (Admin)...
✅ Problem created with ID: X

6️⃣  Testing CREATE Contest (Admin)...
✅ Contest created with ID: X

7️⃣  Testing UPDATE Problem (Admin)...
✅ Problem updated

8️⃣  Testing UPDATE Contest (Admin)...
✅ Contest updated

9️⃣  Testing Access Control (User trying admin route)...
✅ Access denied correctly

🔟 Testing GET All Problems (Public)...
✅ Problems fetched

1️⃣1️⃣  Testing GET All Contests (Public)...
✅ Contests fetched

1️⃣2️⃣  Testing DELETE Problem (Admin)...
✅ Problem deleted

1️⃣3️⃣  Testing DELETE Contest (Admin)...
✅ Contest deleted

✨ All tests completed!

📊 Summary:
✅ Authentication: Working
✅ CREATE APIs: 2 (Problem, Contest)
✅ UPDATE APIs: 2 (Problem, Contest)
✅ DELETE APIs: 2 (Problem, Contest)
✅ Access Control: Working

🎉 Capstone requirements met!
```

### Verification Points:
- [ ] All 13 tests pass
- [ ] CREATE operations work (Problem & Contest)
- [ ] UPDATE operations work (Problem & Contest)
- [ ] DELETE operations work (Problem & Contest)
- [ ] Access control prevents unauthorized access
- [ ] Authentication works correctly

---

## 📝 Manual Verification (5 minutes)

### Step 3: Verify with Postman

#### Import Collection
1. Open Postman
2. Click **Import**
3. Select `Arena_Postman_Collection.json`
4. Collection imported successfully

#### Test Authentication (15 marks requirement)
- [ ] **Register User** - POST `/auth/register` → 201 Created
- [ ] **Login Admin** - POST `/auth/login` → 200 OK + JWT token
- [ ] Token is valid and contains user info
- [ ] Password is hashed (check database)

#### Test CREATE APIs (Requirement 1 & 2)
- [ ] **Create Problem** - POST `/admin/problems` → 201 Created
  - Admin token required
  - Returns problem with ID
  - Test cases created
- [ ] **Create Contest** - POST `/admin/contests` → 201 Created
  - Admin token required
  - Returns contest with ID
  - Validates problem IDs

#### Test UPDATE APIs (Requirement 3 & 4)
- [ ] **Update Problem** - PUT `/admin/problems/:id` → 200 OK
  - Admin token required
  - Partial updates work
  - Returns updated data
- [ ] **Update Contest** - PUT `/admin/contests/:id` → 200 OK
  - Admin token required
  - Partial updates work
  - Returns updated data

#### Test DELETE APIs (Requirement 5 & 6)
- [ ] **Delete Problem** - DELETE `/admin/problems/:id` → 200 OK
  - Admin token required
  - Problem removed from database
  - Test cases cascade deleted
- [ ] **Delete Contest** - DELETE `/admin/contests/:id` → 200 OK
  - Admin token required
  - Contest removed from database

#### Test Access Control
- [ ] User token on admin route → 403 Forbidden
- [ ] No token on protected route → 401 Unauthorized
- [ ] Admin token on admin route → Success

---

## 🔍 Code Review Checklist

### Authentication Implementation
- [ ] Password hashing using bcryptjs
- [ ] JWT token generation with expiration
- [ ] Token verification middleware exists
- [ ] Role-based authorization middleware exists
- [ ] Passwords never returned in responses

**Files to Check:**
- `backend/routes/auth.js` - Lines 15-25 (generateToken)
- `backend/routes/auth.js` - Lines 52-54 (password hashing)
- `backend/middleware/auth.js` - Lines 15-50 (authenticateToken)
- `backend/middleware/auth.js` - Lines 58-68 (requireAdmin)

### CRUD Implementation
- [ ] CREATE Problem function exists and works
- [ ] CREATE Contest function exists and works
- [ ] UPDATE Problem function exists and works
- [ ] UPDATE Contest function exists and works
- [ ] DELETE Problem function exists and works
- [ ] DELETE Contest function exists and works

**Files to Check:**
- `backend/routes/admin.js` - createProblem (lines 15-80)
- `backend/routes/contest.js` - createContest (lines 15-80)
- `backend/routes/admin.js` - updateProblem (lines 90-150)
- `backend/routes/contest.js` - updateContest (lines 150-230)
- `backend/routes/admin.js` - deleteProblem (lines 160-190)
- `backend/routes/contest.js` - deleteContest (lines 240-280)

### Database Schema
- [ ] User model has role field
- [ ] Problem model exists
- [ ] Contest model exists
- [ ] TestCase model with cascade delete
- [ ] Proper relationships defined

**File to Check:**
- `backend/prisma/schema.prisma`

### API Routes Configuration
- [ ] All auth routes registered
- [ ] All admin routes protected
- [ ] All contest routes registered
- [ ] Middleware applied correctly

**File to Check:**
- `backend/app.js` - Lines 65-95

---

## 📊 Scoring Breakdown

### Authentication (15 Marks)
- [ ] User registration (3 marks)
- [ ] Password hashing (3 marks)
- [ ] JWT generation (3 marks)
- [ ] Token verification (3 marks)
- [ ] Role-based access (3 marks)

### CRUD Operations (Marks vary by institution)
- [ ] CREATE Problem (marks)
- [ ] CREATE Contest (marks)
- [ ] UPDATE Problem (marks)
- [ ] UPDATE Contest (marks)
- [ ] DELETE Problem (marks)
- [ ] DELETE Contest (marks)

### Code Quality
- [ ] Clean code structure
- [ ] Error handling
- [ ] Input validation
- [ ] Comments and documentation
- [ ] RESTful design

### Documentation
- [ ] README complete
- [ ] API documentation
- [ ] Postman collection
- [ ] Demo guide

---

## 🎯 Quick Verification Commands

### Check Database Schema
```bash
cd backend
npx prisma studio
# Opens GUI to view database
```

### Check Admin User Exists
```bash
mysql -u root -p
USE Online_Judge;
SELECT username, email, role FROM User WHERE role = 'ADMIN';
```

### Check Created Problems
```bash
SELECT id, title, rating FROM Problem;
```

### Check Created Contests
```bash
SELECT id, name, startsAt, endsAt FROM Contest;
```

---

## 📝 Evaluation Notes Template

```
Student Name: ___________________
Project: Arena - Online Coding Platform
Date: ___________________

AUTHENTICATION (15 marks)
[ ] Registration works: ___/3
[ ] Password hashing: ___/3
[ ] JWT generation: ___/3
[ ] Token verification: ___/3
[ ] Role-based access: ___/3
Total: ___/15

CRUD OPERATIONS
[ ] CREATE Problem: ___
[ ] CREATE Contest: ___
[ ] UPDATE Problem: ___
[ ] UPDATE Contest: ___
[ ] DELETE Problem: ___
[ ] DELETE Contest: ___

CODE QUALITY
[ ] Clean structure: ___
[ ] Error handling: ___
[ ] Validation: ___
[ ] Documentation: ___

ADDITIONAL NOTES:
_________________________________
_________________________________
_________________________________

TOTAL SCORE: ___________
```

---

## ✅ Final Checklist

### Requirements Met
- [ ] JWT Authentication implemented (15 marks)
- [ ] 2 CREATE APIs working
- [ ] 2 UPDATE APIs working
- [ ] 2 DELETE APIs working
- [ ] Role-based access control
- [ ] Input validation
- [ ] Error handling
- [ ] Documentation complete

### Testing
- [ ] Automated tests pass
- [ ] Postman collection works
- [ ] All endpoints tested
- [ ] Access control verified

### Code Quality
- [ ] Clean, organized code
- [ ] Proper comments
- [ ] Error handling
- [ ] Security best practices

### Documentation
- [ ] README complete
- [ ] API documentation
- [ ] Demo guide
- [ ] Code comments

---

## 🚨 Common Issues to Check

### If Tests Fail

**Server not running:**
```bash
cd backend && node app.js
```

**Database not setup:**
```bash
cd backend
npx prisma db push
npx prisma generate
```

**Admin user missing:**
```bash
cd backend
node create-admin.js
```

**Dependencies missing:**
```bash
cd backend
npm install
```

---

## 📞 Quick Reference

**Server URL:** http://localhost:3030  
**Admin Username:** admin  
**Admin Password:** admin123  

**Key Files:**
- Authentication: `backend/routes/auth.js`
- Problem CRUD: `backend/routes/admin.js`
- Contest CRUD: `backend/routes/contest.js`
- Middleware: `backend/middleware/auth.js`
- Schema: `backend/prisma/schema.prisma`
- Main App: `backend/app.js`

**Documentation:**
- Main: `CAPSTONE_README.md`
- API: `API_DOCUMENTATION.md`
- Demo: `DEMO_GUIDE.md`
- Summary: `CAPSTONE_SUMMARY.md`

---

## ✅ Evaluation Complete

- [ ] All requirements verified
- [ ] Tests passed
- [ ] Code reviewed
- [ ] Documentation checked
- [ ] Score calculated

**Evaluator Signature:** ___________________  
**Date:** ___________________  
**Final Score:** ___________________

---

**This project meets all capstone requirements and is ready for evaluation! 🎉**
