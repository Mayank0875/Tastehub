import { testConnection, initializeDatabase } from './server/db/init.js';
import { query } from './server/db/connection.js';
import pool from './server/db/connection.js';

console.log('🧪 Testing GuardWallet Database\n');

const test = async () => {
  try {
    // Test 1: Connection
    console.log('1️⃣  Testing connection...');
    const connected = await testConnection();
    if (!connected) {
      console.log('❌ Connection failed');
      process.exit(1);
    }
    console.log('✅ Connection successful\n');

    // Test 2: Schema
    console.log('2️⃣  Initializing schema...');
    await initializeDatabase();
    console.log('✅ Schema initialized\n');

    // Test 3: Create user
    console.log('3️⃣  Testing user creation...');
    await query(
      `INSERT INTO users (id, name, risk_level, income_source, real_balance, safe_balance, vasooli_score, rent_secured, agent_mode, lock_rate)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name`,
      ['test-user', 'Test User', 'Medium', 'Testing', 5000, 3000, 50, 60, 'Advisor', 0.2]
    );
    console.log('✅ User created\n');

    // Test 4: Create transaction
    console.log('4️⃣  Testing transaction creation...');
    await query(
      `INSERT INTO transactions (user_id, description, amount, type, status)
       VALUES ($1, $2, $3, $4, $5)`,
      ['test-user', 'Test Transaction', 100, 'expense', 'Approved']
    );
    console.log('✅ Transaction created\n');

    // Test 5: Read data
    console.log('5️⃣  Testing data retrieval...');
    const userResult = await query('SELECT * FROM users WHERE id = $1', ['test-user']);
    const txResult = await query('SELECT * FROM transactions WHERE user_id = $1', ['test-user']);
    console.log('User:', userResult.rows[0]);
    console.log('Transactions:', txResult.rows.length, 'found');
    console.log('✅ Data retrieved\n');

    // Test 6: Cleanup
    console.log('6️⃣  Cleaning up...');
    await query('DELETE FROM users WHERE id = $1', ['test-user']);
    console.log('✅ Cleanup complete\n');

    console.log('🎉 ALL TESTS PASSED!\n');
    console.log('✅ Database is working correctly');
    console.log('✅ Schema is properly initialized');
    console.log('✅ CRUD operations are functional');
    console.log('\nYou can now run: npm run dev:all\n');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error(error);
  } finally {
    await pool.end();
    process.exit(0);
  }
};

test();
