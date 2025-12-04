# 🌱 Database Seeding Guide

## Overview

The seed file populates your database with dummy data for testing and demonstration purposes.

---

## 📦 What Gets Seeded

### 👥 Users (4 total)
1. **Admin User**
   - Email: `admin@arena.com`
   - Password: `password123`
   - Role: ADMIN

2. **Regular Users**
   - Email: `john@example.com` | Password: `password123`
   - Email: `jane@example.com` | Password: `password123`
   - Email: `alice@example.com` | Password: `password123`

### 📝 Problems (8 total)

1. **Two Sum** (Rating: 800)
   - Tags: array, hash-table, easy
   - 3 test cases

2. **Reverse String** (Rating: 600)
   - Tags: string, two-pointers, easy
   - 2 test cases

3. **Palindrome Number** (Rating: 700)
   - Tags: math, easy
   - 3 test cases

4. **Valid Parentheses** (Rating: 900)
   - Tags: string, stack, easy
   - 3 test cases

5. **Merge Two Sorted Lists** (Rating: 1000)
   - Tags: linked-list, recursion, easy
   - 3 test cases

6. **Maximum Subarray** (Rating: 1100)
   - Tags: array, dynamic-programming, medium
   - 3 test cases

7. **Binary Search** (Rating: 750)
   - Tags: array, binary-search, easy
   - 2 test cases

8. **Fibonacci Number** (Rating: 650)
   - Tags: math, recursion, dynamic-programming, easy
   - 3 test cases

### 📤 Submissions (8 total)
- Various submissions from different users
- Mix of JavaScript, Python, and C++ solutions
- All marked as "Accepted"

### 🏆 Contests (3 total)

1. **Beginner Contest #1**
   - Problems: Two Sum, Reverse String, Palindrome Number
   - Date: Dec 10, 2024

2. **Weekly Challenge #42**
   - Problems: Valid Parentheses, Merge Lists, Maximum Subarray
   - Date: Dec 15, 2024

3. **Algorithm Mastery**
   - Problems: Maximum Subarray, Binary Search, Fibonacci
   - Date: Dec 20, 2024

---

## 🚀 How to Run

### Method 1: Using npm script

```bash
cd backend
npm run seed
```

### Method 2: Using Prisma CLI

```bash
cd backend
npx prisma db seed
```

### Method 3: Direct execution

```bash
cd backend
node prisma/seed.js
```

---

## ⚠️ Important Notes

1. **Clears Existing Data**: The seed script will DELETE all existing data before seeding
2. **Run After Migration**: Make sure to run migrations first:
   ```bash
   npx prisma migrate dev
   ```
3. **Database Connection**: Ensure your DATABASE_URL is set in `.env`

---

## 🔄 Complete Setup Flow

```bash
# 1. Navigate to backend
cd backend

# 2. Install dependencies
npm install

# 3. Generate Prisma Client
npx prisma generate

# 4. Run migrations
npx prisma migrate dev

# 5. Seed the database
npm run seed

# 6. Start the server
node app.js
```

---

## 🧪 Testing After Seeding

### Test Login:
```bash
curl -X POST http://localhost:3030/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@arena.com",
    "password": "password123"
  }'
```

### Test Get Problems:
```bash
curl http://localhost:3030/problem
```

### Test Get Specific Problem:
```bash
curl http://localhost:3030/problem/1
```

---

## 🎯 For Production Deployment

### On Render:

1. **Add Seed Command** to your build script:
   ```bash
   npm install && npx prisma generate && npx prisma migrate deploy && npm run seed
   ```

2. **Or run manually** after deployment:
   - Go to Render Dashboard
   - Open Shell for your service
   - Run: `npm run seed`

### Important for Production:
- Change default passwords!
- Use strong passwords
- Don't use dummy data in production
- Consider creating a separate seed file for production with minimal data

---

## 🔧 Customizing Seed Data

Edit `backend/prisma/seed.js` to:
- Add more problems
- Change user credentials
- Add more test cases
- Modify contest dates
- Add more submissions

---

## 🐛 Troubleshooting

### Error: "Cannot find module '@prisma/client'"
```bash
npx prisma generate
```

### Error: "Database connection failed"
- Check your DATABASE_URL in `.env`
- Ensure PostgreSQL is running
- Verify database credentials

### Error: "Table does not exist"
```bash
npx prisma migrate dev
```

### Want to Reset Database:
```bash
npx prisma migrate reset
# This will drop the database, recreate it, run migrations, and seed
```

---

## 📊 Verify Seeded Data

### Using Prisma Studio:
```bash
npx prisma studio
```
Opens a GUI at http://localhost:5555 to view your data

### Using SQL:
```bash
# Connect to your database
psql $DATABASE_URL

# Check counts
SELECT COUNT(*) FROM "User";
SELECT COUNT(*) FROM "Problem";
SELECT COUNT(*) FROM "Submission";
SELECT COUNT(*) FROM "Contest";
```

---

## 🎉 Success!

After seeding, you should have:
- ✅ 4 users ready to login
- ✅ 8 problems to solve
- ✅ 8 sample submissions
- ✅ 3 contests scheduled
- ✅ All test cases loaded

**Ready to test your Arena platform!** 🚀

---

## 🔑 Quick Reference

**Admin Login:**
```
Email: admin@arena.com
Password: password123
```

**Test User Login:**
```
Email: john@example.com
Password: password123
```

**All passwords:** `password123` (change in production!)
