# GuardWallet Backend - Quick Reference

## 🚀 Quick Start Commands

```bash
# Install dependencies
npm install

# Verify setup
npm run verify

# Seed sample data
npm run db:seed

# Start backend only
npm run dev:server

# Start frontend + backend
npm run dev:all

# Build for production
npm run build

# Start production server
npm start
```

## 🔗 Database Connection

```bash
# Connection string (already in .env)
DATABASE_URL=postgresql://neondb_owner:npg_C9bpXIrjc5BF@ep-super-pond-a1xzjgw0-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require

# Direct psql access
psql 'postgresql://neondb_owner:npg_C9bpXIrjc5BF@ep-super-pond-a1xzjgw0-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require'
```

## 📡 API Endpoints

### Users
```bash
# Get user state
GET /api/users/:userId/state

# Create/update user
POST /api/users/:userId/state
Body: { name, riskLevel, realBalance, safeBalance, vasooliScore, ... }

# Reset user
POST /api/users/:userId/reset
```

### Transactions
```bash
# Get all transactions
GET /api/transactions/:userId

# Add transaction
POST /api/transactions/:userId
Body: { desc, amount, type, status }

# Update transaction
PUT /api/transactions/:userId/:transactionId
Body: { desc, amount, type, status }

# Delete transaction
DELETE /api/transactions/:userId/:transactionId
```

### Financial
```bash
# Generate financial data
POST /api/financial/generate
Body: { profile: { name, risk, incomeSource } }

# Get FRS breakdown
POST /api/financial/frs-breakdown
Body: { vasooliScore, transactions, rentSecured }

# Analyze income irregularity
POST /api/financial/analyze-irregularity
Body: { transactions }
```

### Health
```bash
# Health check
GET /health
```

## 🗄️ Database Tables

```sql
-- Users
SELECT * FROM users;

-- Transactions
SELECT * FROM transactions WHERE user_id = 'rahul';

-- User with transactions
SELECT u.*, t.* 
FROM users u 
LEFT JOIN transactions t ON u.id = t.user_id 
WHERE u.id = 'rahul';
```

## 🧪 Test Commands

```bash
# Test user creation
curl -X POST http://localhost:3001/api/users/test/state \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","riskLevel":"Medium","realBalance":5000}'

# Test transaction
curl -X POST http://localhost:3001/api/transactions/test \
  -H "Content-Type: application/json" \
  -d '{"desc":"Test","amount":100,"type":"expense"}'

# Get data
curl http://localhost:3001/api/users/test/state
curl http://localhost:3001/api/transactions/test
```

## 📂 Key Files

```
server/
├── db/
│   ├── connection.js    # DB connection pool
│   ├── init.js          # Schema initialization
│   ├── schema.sql       # Database schema
│   └── seed.js          # Sample data
├── api/
│   ├── users.js         # User endpoints
│   ├── transactions.js  # Transaction endpoints
│   └── financial.js     # Financial endpoints
└── index.js             # Main server
```

## 🔧 Environment Variables

```env
DATABASE_URL=postgresql://...    # Required
GEMINI_API_KEY=...              # Required
PORT=3001                       # Optional
NODE_ENV=development            # Optional
VITE_API_URL=http://localhost:3001/api  # Optional
```

## 🐛 Troubleshooting

```bash
# Check database connection
node server/db/test-connection.js

# Verify complete setup
npm run verify

# View server logs
npm run dev:server

# Check health
curl http://localhost:3001/health
```

## 📊 Sample Users (after seeding)

| User ID | Name  | Risk Level | Balance | Score |
|---------|-------|------------|---------|-------|
| rahul   | Rahul | High       | ₹1,200  | 85    |
| priya   | Priya | Medium     | ₹8,000  | 55    |
| amit    | Amit  | Low        | ₹15,000 | 24    |

## 🚢 Deployment

### Vercel
```bash
vercel env add DATABASE_URL
vercel env add GEMINI_API_KEY
vercel
```

### Railway
1. Connect GitHub
2. Add environment variables
3. Deploy

### Environment Variables to Set
- `DATABASE_URL`
- `GEMINI_API_KEY`
- `NODE_ENV=production`

## 📚 Documentation

- `README.md` - Main documentation
- `DATABASE_SETUP.md` - Database setup guide
- `BACKEND_COMPLETE.md` - Implementation details
- `IMPLEMENTATION_SUMMARY.md` - Complete summary
- `QUICK_REFERENCE.md` - This file

## ✅ Status

- ✅ PostgreSQL connected
- ✅ Schema initialized
- ✅ APIs migrated
- ✅ Sample data available
- ✅ Production ready

---

**Need help?** Check the detailed docs or run `npm run verify`
