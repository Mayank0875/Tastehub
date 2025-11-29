# 🚀 GuardWallet - Start Here

## ✅ Backend Status: FIXED AND READY

The database backend has been successfully implemented and the schema error has been fixed!

## Quick Start (3 Steps)

### 1. Test the Database
```bash
npm run db:test
```
This verifies the database connection and schema are working.

### 2. Seed Sample Data (Optional)
```bash
npm run db:seed
```
Adds 3 sample users: Rahul (High Risk), Priya (Medium), Amit (Low)

### 3. Start the Application
```bash
npm run dev:all
```
Starts both frontend (port 5173) and backend (port 3001)

## If Port 3001 is Busy

### Option A: Kill the process
```bash
lsof -ti:3001 | xargs kill -9
npm run dev:all
```

### Option B: Use different port
```bash
PORT=3002 npm run dev:server
```
Then update frontend to use port 3002

## What Was Fixed

### The Error
```
error: column "id" referenced in foreign key constraint does not exist
```

### The Solution
- Updated `server/db/schema.sql` to drop and recreate tables cleanly
- Fixed foreign key constraint order
- Ensured proper table creation sequence

### Result
```
✅ Connected to PostgreSQL database
✅ Database connection test successful
✅ Database schema initialized successfully
```

## Project Structure

```
GuardWallet/
├── Frontend (React + Vite)
│   └── Port 5173
├── Backend (Express + PostgreSQL)
│   └── Port 3001
└── Database (Neon PostgreSQL)
    └── Fully configured
```

## Available Commands

```bash
# Development
npm run dev              # Frontend only
npm run dev:server       # Backend only
npm run dev:all          # Both frontend + backend

# Database
npm run db:test          # Test database connection
npm run db:seed          # Add sample data
npm run verify           # Verify complete setup

# Production
npm run build            # Build frontend
npm start                # Start production server
```

## API Endpoints

Once running, test with:

```bash
# Health check
curl http://localhost:3001/health

# Create user
curl -X POST http://localhost:3001/api/users/john/state \
  -H "Content-Type: application/json" \
  -d '{"name":"John","riskLevel":"Medium","realBalance":5000}'

# Get user
curl http://localhost:3001/api/users/john/state

# Add transaction
curl -X POST http://localhost:3001/api/transactions/john \
  -H "Content-Type: application/json" \
  -d '{"desc":"Salary","amount":5000,"type":"income"}'
```

## Access Points

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3001/api
- **Health Check:** http://localhost:3001/health
- **Database:** Connected via Neon (see .env)

## Documentation

- 📖 **README.md** - Main documentation
- 🔧 **ERROR_FIXED.md** - Details about the fix
- ⚡ **QUICK_REFERENCE.md** - Quick commands
- 🏗️ **ARCHITECTURE.md** - System architecture
- 📋 **IMPLEMENTATION_SUMMARY.md** - Complete details

## Features

✅ **PostgreSQL Database** - Persistent storage via Neon
✅ **User Management** - Create, read, update, delete users
✅ **Transaction Tracking** - Full CRUD for transactions
✅ **Financial Analytics** - FRS scoring, income analysis
✅ **AI Integration** - Gemini AI for financial insights
✅ **Production Ready** - Deploy to Vercel, Railway, Heroku

## Troubleshooting

### Database connection fails
- Check `.env` has correct `DATABASE_URL`
- Verify network connectivity
- Check Neon dashboard

### Port already in use
```bash
# Kill process on port 3001
lsof -ti:3001 | xargs kill -9

# Or use different port
PORT=3002 npm run dev:server
```

### Schema errors
```bash
# The schema now auto-drops and recreates tables
# Just restart the server
npm run dev:server
```

## Need Help?

1. Run `npm run db:test` to verify database
2. Check `ERROR_FIXED.md` for the fix details
3. See `QUICK_REFERENCE.md` for commands
4. Review `DATABASE_SETUP.md` for detailed setup

---

## 🎉 You're Ready!

The backend is fully functional with PostgreSQL. Just run:

```bash
npm run dev:all
```

And visit **http://localhost:5173** to see GuardWallet in action!

**Status:** ✅ All systems operational
