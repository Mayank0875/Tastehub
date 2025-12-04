# 🌱 Quick Seed Reference

## Run Seed Command
```bash
cd backend
npm run seed
```

## 🔑 Login Credentials

### Admin Account
```
Email: admin@arena.com
Password: password123
```

### Test Users
```
john@example.com  | password123
jane@example.com  | password123
alice@example.com | password123
```

## 📊 Seeded Data

- **4 Users** (1 admin + 3 regular)
- **8 Problems** (with test cases)
  - Two Sum
  - Reverse String
  - Palindrome Number
  - Valid Parentheses
  - Merge Two Sorted Lists
  - Maximum Subarray
  - Binary Search
  - Fibonacci Number
- **8 Submissions** (sample solutions)
- **3 Contests** (scheduled events)

## ⚡ Quick Commands

```bash
# Seed database
npm run seed

# View data in GUI
npx prisma studio

# Reset and reseed
npx prisma migrate reset

# Check data counts
node -e "const { PrismaClient } = require('@prisma/client'); const prisma = new PrismaClient(); (async () => { console.log('Users:', await prisma.user.count()); console.log('Problems:', await prisma.problem.count()); await prisma.\$disconnect(); })()"
```

## 🎯 What to Do Next

1. Start backend: `node app.js`
2. Login as admin: `admin@arena.com` / `password123`
3. View problems in frontend
4. Test submissions
5. Check admin panel

## ⚠️ Important

- Seed clears ALL existing data
- Run migrations first: `npx prisma migrate dev`
- Change passwords for production!
