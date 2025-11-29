#!/usr/bin/env node

import { testConnection, initializeDatabase } from './server/db/init.js';
import { query } from './server/db/connection.js';

console.log('🔍 GuardWallet Backend Verification\n');
console.log('=' .repeat(50));

const verify = async () => {
  const results = {
    connection: false,
    schema: false,
    tables: false,
    ready: false
  };

  try {
    // Test 1: Database Connection
    console.log('\n1️⃣  Testing database connection...');
    results.connection = await testConnection();
    if (results.connection) {
      console.log('   ✅ Database connected successfully');
    } else {
      console.log('   ❌ Database connection failed');
      return results;
    }

    // Test 2: Initialize Schema
    console.log('\n2️⃣  Initializing database schema...');
    await initializeDatabase();
    results.schema = true;
    console.log('   ✅ Schema initialized');

    // Test 3: Verify Tables
    console.log('\n3️⃣  Verifying tables...');
    const tablesResult = await query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
      ORDER BY table_name
    `);
    
    const tables = tablesResult.rows.map(r => r.table_name);
    console.log('   Found tables:', tables.join(', '));
    
    const requiredTables = ['users', 'transactions', 'user_settings'];
    const hasAllTables = requiredTables.every(t => tables.includes(t));
    
    if (hasAllTables) {
      console.log('   ✅ All required tables exist');
      results.tables = true;
    } else {
      console.log('   ❌ Missing required tables');
      return results;
    }

    // Test 4: Test CRUD Operations
    console.log('\n4️⃣  Testing CRUD operations...');
    
    // Create test user
    await query(
      `INSERT INTO users (id, name, risk_level, income_source, real_balance, safe_balance, vasooli_score, rent_secured, agent_mode, lock_rate)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name`,
      ['test-verify', 'Test User', 'Medium', 'Testing', 1000, 500, 50, 60, 'Advisor', 0.2]
    );
    console.log('   ✅ User creation successful');

    // Create test transaction
    await query(
      `INSERT INTO transactions (user_id, description, amount, type, status)
       VALUES ($1, $2, $3, $4, $5)`,
      ['test-verify', 'Test Transaction', 100, 'expense', 'Approved']
    );
    console.log('   ✅ Transaction creation successful');

    // Read data
    const userResult = await query('SELECT * FROM users WHERE id = $1', ['test-verify']);
    const txResult = await query('SELECT * FROM transactions WHERE user_id = $1', ['test-verify']);
    
    if (userResult.rows.length > 0 && txResult.rows.length > 0) {
      console.log('   ✅ Data retrieval successful');
    }

    // Cleanup
    await query('DELETE FROM users WHERE id = $1', ['test-verify']);
    console.log('   ✅ Data cleanup successful');

    results.ready = true;

    // Final Summary
    console.log('\n' + '='.repeat(50));
    console.log('\n✅ BACKEND VERIFICATION COMPLETE\n');
    console.log('Status:');
    console.log('  • Database Connection: ✅');
    console.log('  • Schema Initialized: ✅');
    console.log('  • Tables Created: ✅');
    console.log('  • CRUD Operations: ✅');
    console.log('\n🚀 Backend is ready for use!\n');
    console.log('Next steps:');
    console.log('  1. Run: npm run db:seed (optional - adds sample data)');
    console.log('  2. Run: npm run dev:all (starts frontend + backend)');
    console.log('  3. Visit: http://localhost:5173\n');

  } catch (error) {
    console.error('\n❌ Verification failed:', error.message);
    console.error('\nTroubleshooting:');
    console.error('  1. Check DATABASE_URL in .env file');
    console.error('  2. Verify network connectivity');
    console.error('  3. Check Neon database status');
  } finally {
    process.exit(results.ready ? 0 : 1);
  }
};

verify();
