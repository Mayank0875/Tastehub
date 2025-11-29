import { query } from './connection.js';

// Seed database with sample data
export const seedDatabase = async () => {
  try {
    console.log('🌱 Seeding database with sample data...');
    
    // Sample users
    const users = [
      {
        id: 'rahul',
        name: 'Rahul',
        risk_level: 'High',
        income_source: 'Uber Driver',
        real_balance: 1200,
        safe_balance: 420,
        vasooli_score: 85,
        rent_secured: 45,
        agent_mode: 'Vasooli',
        lock_rate: 0.35
      },
      {
        id: 'priya',
        name: 'Priya',
        risk_level: 'Medium',
        income_source: 'Freelance Designer',
        real_balance: 8000,
        safe_balance: 2500,
        vasooli_score: 55,
        rent_secured: 70,
        agent_mode: 'Strict',
        lock_rate: 0.25
      },
      {
        id: 'amit',
        name: 'Amit',
        risk_level: 'Low',
        income_source: 'Software Engineer',
        real_balance: 15000,
        safe_balance: 5000,
        vasooli_score: 24,
        rent_secured: 90,
        agent_mode: 'Advisor',
        lock_rate: 0.15
      }
    ];
    
    for (const user of users) {
      await query(
        `INSERT INTO users (id, name, risk_level, income_source, real_balance, safe_balance, 
         vasooli_score, rent_secured, agent_mode, lock_rate)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
         ON CONFLICT (id) DO UPDATE SET
         name = EXCLUDED.name,
         risk_level = EXCLUDED.risk_level,
         income_source = EXCLUDED.income_source,
         real_balance = EXCLUDED.real_balance,
         safe_balance = EXCLUDED.safe_balance,
         vasooli_score = EXCLUDED.vasooli_score,
         rent_secured = EXCLUDED.rent_secured,
         agent_mode = EXCLUDED.agent_mode,
         lock_rate = EXCLUDED.lock_rate`,
        [
          user.id, user.name, user.risk_level, user.income_source,
          user.real_balance, user.safe_balance, user.vasooli_score,
          user.rent_secured, user.agent_mode, user.lock_rate
        ]
      );
    }
    
    // Sample transactions for Rahul
    const rahulTransactions = [
      { desc: 'Uber Payout', amount: 850, type: 'income', status: 'Locked (35%)' },
      { desc: 'Tapri Chai & Sutta', amount: 40, type: 'expense', status: 'Approved' },
      { desc: 'PVR: Movie Night', amount: 600, type: 'expense', status: 'BLOCKED' },
      { desc: 'Late Night Biryani', amount: 350, type: 'expense', status: 'Approved' },
      { desc: 'Uber Ride', amount: 180, type: 'expense', status: 'Approved' }
    ];
    
    for (const tx of rahulTransactions) {
      await query(
        `INSERT INTO transactions (user_id, description, amount, type, status)
         VALUES ($1, $2, $3, $4, $5)`,
        ['rahul', tx.desc, tx.amount, tx.type, tx.status]
      );
    }
    
    // Sample transactions for Priya
    const priyaTransactions = [
      { desc: 'Freelance Project Payment', amount: 1500, type: 'income', status: 'Locked (25%)' },
      { desc: 'Grocery Mart', amount: 1200, type: 'expense', status: 'Approved' },
      { desc: 'Phone Recharge', amount: 299, type: 'expense', status: 'Approved' }
    ];
    
    for (const tx of priyaTransactions) {
      await query(
        `INSERT INTO transactions (user_id, description, amount, type, status)
         VALUES ($1, $2, $3, $4, $5)`,
        ['priya', tx.desc, tx.amount, tx.type, tx.status]
      );
    }
    
    // Sample transactions for Amit
    const amitTransactions = [
      { desc: 'Salary Credit', amount: 2000, type: 'income', status: 'Locked (15%)' },
      { desc: 'SIP Auto-Debit', amount: 500, type: 'expense', status: 'Invested' },
      { desc: 'Grocery Mart', amount: 1200, type: 'expense', status: 'Approved' }
    ];
    
    for (const tx of amitTransactions) {
      await query(
        `INSERT INTO transactions (user_id, description, amount, type, status)
         VALUES ($1, $2, $3, $4, $5)`,
        ['amit', tx.desc, tx.amount, tx.type, tx.status]
      );
    }
    
    console.log('✅ Database seeded successfully');
    return true;
  } catch (error) {
    console.error('❌ Failed to seed database:', error);
    throw error;
  }
};

// Run seed if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}
