import { query } from './server/db/connection.js';
import pool from './server/db/connection.js';

console.log('🧪 Full Suggestions Feature Test\n');

const test = async () => {
  try {
    // Step 1: Create user
    console.log('1️⃣  Creating user Rahul...');
    await query(
      `INSERT INTO users (id, name, risk_level, income_source, real_balance, safe_balance, vasooli_score, rent_secured, agent_mode, lock_rate)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       ON CONFLICT (id) DO UPDATE SET 
       real_balance = EXCLUDED.real_balance,
       vasooli_score = EXCLUDED.vasooli_score,
       safe_balance = EXCLUDED.safe_balance`,
      ['rahul', 'Rahul', 'High', 'Uber Driver', 1200, 420, 85, 45, 'Vasooli', 0.35]
    );
    console.log('✅ User created\n');

    // Step 2: Add transactions
    console.log('2️⃣  Adding transactions...');
    const transactions = [
      { desc: 'Uber Payout', amount: 3000, type: 'income', status: 'Locked (35%)' },
      { desc: 'Late Night Biryani', amount: 350, type: 'expense', status: 'Approved' },
      { desc: 'PVR Movie Night', amount: 600, type: 'expense', status: 'BLOCKED' },
      { desc: 'Tapri Chai & Sutta', amount: 150, type: 'expense', status: 'Approved' },
      { desc: 'Uber Ride', amount: 180, type: 'expense', status: 'Approved' },
      { desc: 'Zomato Order', amount: 400, type: 'expense', status: 'Approved' }
    ];

    // Delete old transactions first
    await query('DELETE FROM transactions WHERE user_id = $1', ['rahul']);

    for (const tx of transactions) {
      await query(
        `INSERT INTO transactions (user_id, description, amount, type, status)
         VALUES ($1, $2, $3, $4, $5)`,
        ['rahul', tx.desc, tx.amount, tx.type, tx.status]
      );
    }
    console.log(`✅ Added ${transactions.length} transactions\n`);

    // Step 3: Analyze spending
    console.log('3️⃣  Analyzing spending...');
    const txResult = await query(
      'SELECT * FROM transactions WHERE user_id = $1 ORDER BY date DESC',
      ['rahul']
    );

    const userTxs = txResult.rows.map(row => ({
      desc: row.description,
      amount: parseFloat(row.amount),
      type: row.type
    }));

    const expenses = userTxs.filter(t => t.type === 'expense');
    const incomes = userTxs.filter(t => t.type === 'income');
    
    const totalExpense = expenses.reduce((sum, t) => sum + t.amount, 0);
    const totalIncome = incomes.reduce((sum, t) => sum + t.amount, 0);
    const savingsRate = totalIncome > 0 ? Math.round(((totalIncome - totalExpense) / totalIncome) * 100) : 0;

    console.log(`   Total Income: ₹${totalIncome}`);
    console.log(`   Total Expense: ₹${totalExpense}`);
    console.log(`   Savings Rate: ${savingsRate}%`);
    console.log(`   Vasooli Score: 85 (High Risk!)\n`);

    // Step 4: Show expected suggestions
    console.log('4️⃣  Expected Suggestions:\n');
    
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🚨 URGENT: Bhai, emergency mode on kar!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Tera Vasooli Score 85 hai! Matlab rent ka khatra hai.');
    console.log('Abhi se next ₹600 lock kar de. Bahar khana band, ghar pe khana shuru!');
    console.log('');
    console.log('✅ Action: Lock 50% of balance immediately');
    console.log('💰 Savings: ₹600');
    console.log('');

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🍔 CRITICAL: Biryani ka shauk baad mein!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`₹${totalExpense} food pe? Bhai, ghar ka khana khao.`);
    console.log('Bahar ka khana ₹200/day = ₹6000/month');
    console.log('Ghar ka khana ₹80/day = ₹2400/month');
    console.log('Bach gaye ₹3600!');
    console.log('');
    console.log('✅ Action: Cook at home, save ₹3600/month');
    console.log('💰 Savings: ₹3600');
    console.log('');

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🎬 WARNING: Movie dekhne se pehle rent dekh!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Entertainment pe ₹600? Netflix/Prime share kar dost ke saath.');
    console.log('PVR ki jagah OTT dekh. Monthly ₹1000 bach jayenge!');
    console.log('');
    console.log('✅ Action: Share subscriptions, avoid theaters');
    console.log('💰 Savings: ₹1000');
    console.log('');

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🚬 CRITICAL: Yeh kya bakwaas hai?');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Sutta pe ₹150? Bhai, yeh paisa literally jal raha hai!');
    console.log('Band kar isko. Health bhi, wealth bhi!');
    console.log('');
    console.log('✅ Action: Quit smoking/drinking');
    console.log('💰 Savings: ₹150');
    console.log('');

    // Step 5: Instructions
    console.log('═══════════════════════════════════════════════════════════════');
    console.log('✅ TEST DATA READY!');
    console.log('═══════════════════════════════════════════════════════════════\n');

    console.log('📝 Next Steps:\n');
    console.log('1. Start server:');
    console.log('   npm run dev:server\n');
    
    console.log('2. Test API:');
    console.log('   curl -X POST http://localhost:3001/api/suggestions/rahul/analyze\n');
    
    console.log('3. Or use in frontend:');
    console.log('   fetch("http://localhost:3001/api/suggestions/rahul/analyze", {');
    console.log('     method: "POST"');
    console.log('   })\n');

    console.log('4. Quick actions:');
    console.log('   curl http://localhost:3001/api/suggestions/rahul/quick-actions\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error);
  } finally {
    await pool.end();
    process.exit(0);
  }
};

test();
