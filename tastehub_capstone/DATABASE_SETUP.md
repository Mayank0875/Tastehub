# Database Setup Guide

## PostgreSQL Database (Neon)

GuardWallet now uses PostgreSQL via Neon for persistent data storage.

### Database Connection

The database connection string is already configured in `.env.example`:

```
DATABASE_URL=postgresql://neondb_owner:npg_C9bpXIrjc5BF@ep-super-pond-a1xzjgw0-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
```

### Setup Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```
   This will install the `pg` (node-postgres) package.

2. **Configure Environment**
   
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   
   The DATABASE_URL is already set in the example file.

3. **Initialize Database**
   
   The database schema will be automatically initialized when you start the server:
   ```bash
   npm run dev:server
   ```
   
   This will:
   - Test the database connection
   - Create all necessary tables (users, transactions, user_settings)
   - Set up indexes and triggers

4. **Seed Sample Data (Optional)**
   
   To populate the database with sample users and transactions:
   ```bash
   node server/db/seed.js
   ```

### Database Schema

#### Users Table
- `id` (VARCHAR) - Primary key, user identifier
- `name` (VARCHAR) - User's name
- `risk_level` (VARCHAR) - Risk level: High, Medium, Low
- `income_source` (VARCHAR) - Source of income
- `real_balance` (DECIMAL) - Actual account balance
- `safe_balance` (DECIMAL) - Safe-to-spend balance (after lock)
- `vasooli_score` (INTEGER) - Financial resilience score (0-100)
- `rent_secured` (INTEGER) - Rent security percentage
- `agent_mode` (VARCHAR) - Agent persona: Advisor, Strict, Vasooli
- `lock_rate` (DECIMAL) - Percentage of income to lock
- `created_at`, `updated_at` (TIMESTAMP)

#### Transactions Table
- `id` (SERIAL) - Primary key, auto-increment
- `user_id` (VARCHAR) - Foreign key to users
- `description` (VARCHAR) - Transaction description
- `amount` (DECIMAL) - Transaction amount
- `type` (VARCHAR) - 'income' or 'expense'
- `status` (VARCHAR) - Transaction status
- `category` (VARCHAR) - Optional category
- `date` (TIMESTAMP) - Transaction date
- `created_at` (TIMESTAMP)

#### User Settings Table
- `user_id` (VARCHAR) - Primary key, foreign key to users
- `rent_amount` (DECIMAL) - Monthly rent amount
- `rent_due_date` (INTEGER) - Day of month rent is due
- `notification_enabled` (BOOLEAN) - Notification preferences
- `created_at`, `updated_at` (TIMESTAMP)

### API Endpoints

All existing API endpoints now use PostgreSQL:

#### User State
- `GET /api/users/:userId/state` - Get user state
- `POST /api/users/:userId/state` - Create/update user state
- `POST /api/users/:userId/reset` - Delete user and all data

#### Transactions
- `GET /api/transactions/:userId` - Get all transactions
- `POST /api/transactions/:userId` - Add new transaction
- `PUT /api/transactions/:userId/:transactionId` - Update transaction
- `DELETE /api/transactions/:userId/:transactionId` - Delete transaction

#### Financial
- `POST /api/financial/generate` - Generate financial data
- `POST /api/financial/frs-breakdown` - Calculate FRS breakdown
- `POST /api/financial/analyze-irregularity` - Analyze income patterns

### Testing the Database

1. **Health Check**
   ```bash
   curl http://localhost:3001/health
   ```
   
   Should return:
   ```json
   {
     "status": "ok",
     "message": "GuardWallet API is running",
     "database": "connected"
   }
   ```

2. **Test User Creation**
   ```bash
   curl -X POST http://localhost:3001/api/users/test-user/state \
     -H "Content-Type: application/json" \
     -d '{"name":"Test User","riskLevel":"Medium","realBalance":5000}'
   ```

3. **Test Transaction Creation**
   ```bash
   curl -X POST http://localhost:3001/api/transactions/test-user \
     -H "Content-Type: application/json" \
     -d '{"desc":"Test Transaction","amount":100,"type":"expense"}'
   ```

### Database Management

#### Direct Database Access

You can connect directly to the database using psql:

```bash
psql 'postgresql://neondb_owner:npg_C9bpXIrjc5BF@ep-super-pond-a1xzjgw0-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require'
```

#### Useful SQL Queries

```sql
-- View all users
SELECT * FROM users;

-- View all transactions for a user
SELECT * FROM transactions WHERE user_id = 'rahul' ORDER BY date DESC;

-- Count transactions by type
SELECT type, COUNT(*) FROM transactions GROUP BY type;

-- Get user with transaction count
SELECT u.name, u.risk_level, COUNT(t.id) as transaction_count
FROM users u
LEFT JOIN transactions t ON u.id = t.user_id
GROUP BY u.id, u.name, u.risk_level;

-- Clear all data
TRUNCATE TABLE transactions, users CASCADE;
```

### Troubleshooting

#### Connection Issues

If you see database connection errors:

1. Check that DATABASE_URL is set in `.env`
2. Verify network connectivity to Neon
3. Check Neon dashboard for database status

#### Schema Issues

To reset the schema:

```bash
# Connect to database
psql 'postgresql://...'

# Drop all tables
DROP TABLE IF EXISTS transactions CASCADE;
DROP TABLE IF EXISTS user_settings CASCADE;
DROP TABLE IF EXISTS users CASCADE;

# Restart server to recreate schema
npm run dev:server
```

### Production Deployment

For production deployments (Vercel, Railway, etc.):

1. Set the `DATABASE_URL` environment variable
2. The schema will be automatically initialized on first run
3. Consider running the seed script to populate sample data

### Migration from In-Memory Storage

The backend has been completely migrated from in-memory Map storage to PostgreSQL. All data is now persisted across server restarts.

Key changes:
- User state is stored in the `users` table
- Transactions are stored in the `transactions` table
- All API endpoints now use async/await with database queries
- Proper error handling and validation
- Automatic schema initialization on startup
