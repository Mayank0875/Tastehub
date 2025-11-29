import { query } from './server/db/connection.js';
import pool from './server/db/connection.js';

console.log('Adding test data for Rahul...\n');

const addData = async () => {
  try {
    // Add transactions
    const transactions = [
      { desc: 'Uber Payout', amount: 3000, type: 'income', status: 'Locked (35%)' },
      { desc: 'Late Night Biryani', amount: 350, type: 'expense', status: 'Approved' },
      { desc: 'PVR Movie Night', amount: 600, type: 'expense', status: 'BLOCKED' },
      { desc: 'Tapri Chai & Sutta', amount: 150, type: 'expense', status: 'Approved' },
      { desc: 'Uber Ride', amount: 180, type: 'expense', status: 'Approved' },
      { desc: 'Zomato Order', amount: 400, type: 'expense', status: 'Approved' }
    ];

    for (const tx of transactions) {
      await query(
        `INSERT INTO transactions (user_id, description, amount, type, status)
         VALUES ($1, $2, $3, $4, $5)`,
        ['rahul', tx.desc, tx.amount, tx.type, tx.status]
      );
      console.log(`✅ Added: ${tx.desc}`);
    }

    console.log('\n✅ All test data added!\n');
    console.log('Now test the API:');
    console.log('curl -X POST http://localhost:3003/api/suggestions/rahul/analyze\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await pool.end();
    process.exit(0);
  }
};

addData();
