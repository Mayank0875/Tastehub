import express from 'express';
import { query } from '../db/connection.js';
import { generateAISuggestion } from '../utils/suggestionService.js';

const router = express.Router();

// Get personalized suggestions based on user's expenses
router.post('/:userId/analyze', async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Get user data
    const userResult = await query(
      'SELECT * FROM users WHERE id = $1',
      [userId]
    );
    
    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const user = userResult.rows[0];
    
    // Get recent transactions
    const txResult = await query(
      'SELECT * FROM transactions WHERE user_id = $1 ORDER BY date DESC LIMIT 20',
      [userId]
    );
    
    const transactions = txResult.rows.map(row => ({
      desc: row.description,
      amount: parseFloat(row.amount),
      type: row.type,
      status: row.status,
      date: row.date
    }));
    
    // Analyze spending patterns
    const analysis = analyzeSpending(transactions, user);
    
    // Generate AI-powered suggestions
    const suggestions = await generateAISuggestion(user, transactions, analysis);
    
    res.json({
      analysis,
      suggestions,
      vasooliScore: user.vasooli_score,
      riskLevel: user.risk_level
    });
    
  } catch (error) {
    console.error('Error analyzing expenses:', error);
    res.status(500).json({ error: 'Failed to analyze expenses' });
  }
});

// Analyze spending patterns
function analyzeSpending(transactions, user) {
  const expenses = transactions.filter(t => t.type === 'expense');
  const incomes = transactions.filter(t => t.type === 'income');
  
  const totalExpense = expenses.reduce((sum, t) => sum + t.amount, 0);
  const totalIncome = incomes.reduce((sum, t) => sum + t.amount, 0);
  
  // Categorize expenses
  const categories = {
    food: ['biryani', 'chai', 'food', 'restaurant', 'zomato', 'swiggy', 'tapri'],
    entertainment: ['movie', 'pvr', 'netflix', 'prime', 'hotstar', 'gaming'],
    transport: ['uber', 'ola', 'petrol', 'metro', 'auto', 'ride'],
    shopping: ['amazon', 'flipkart', 'myntra', 'shopping', 'clothes'],
    bills: ['electricity', 'water', 'gas', 'wifi', 'mobile', 'recharge'],
    unnecessary: ['sutta', 'cigarette', 'alcohol', 'beer', 'wine']
  };
  
  const spending = {
    food: 0,
    entertainment: 0,
    transport: 0,
    shopping: 0,
    bills: 0,
    unnecessary: 0,
    other: 0
  };
  
  expenses.forEach(tx => {
    const desc = tx.desc.toLowerCase();
    let categorized = false;
    
    for (const [category, keywords] of Object.entries(categories)) {
      if (keywords.some(keyword => desc.includes(keyword))) {
        spending[category] += tx.amount;
        categorized = true;
        break;
      }
    }
    
    if (!categorized) {
      spending.other += tx.amount;
    }
  });
  
  // Calculate percentages
  const spendingPercentage = {};
  for (const [category, amount] of Object.entries(spending)) {
    spendingPercentage[category] = totalExpense > 0 
      ? Math.round((amount / totalExpense) * 100) 
      : 0;
  }
  
  // Identify problem areas
  const problems = [];
  if (spendingPercentage.food > 30) {
    problems.push({ category: 'food', severity: 'high', percentage: spendingPercentage.food });
  }
  if (spendingPercentage.entertainment > 20) {
    problems.push({ category: 'entertainment', severity: 'high', percentage: spendingPercentage.entertainment });
  }
  if (spending.unnecessary > 0) {
    problems.push({ category: 'unnecessary', severity: 'critical', amount: spending.unnecessary });
  }
  if (totalExpense > totalIncome * 0.8) {
    problems.push({ category: 'overspending', severity: 'critical', ratio: (totalExpense / totalIncome * 100).toFixed(0) });
  }
  
  return {
    totalExpense,
    totalIncome,
    spending,
    spendingPercentage,
    problems,
    savingsRate: totalIncome > 0 ? Math.round(((totalIncome - totalExpense) / totalIncome) * 100) : 0
  };
}

// Get quick action suggestions
router.get('/:userId/quick-actions', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const userResult = await query('SELECT * FROM users WHERE id = $1', [userId]);
    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const user = userResult.rows[0];
    const vasooliScore = user.vasooli_score;
    
    // Generate quick actions based on Vasooli Score
    const actions = [];
    
    if (vasooliScore > 70) {
      actions.push({
        type: 'urgent',
        title: 'Bhai, rent ka jugaad kar!',
        message: 'Tera Vasooli Score bahut high hai. Abhi kuch save kar le, warna Vasooli Bhai aa jayega!',
        action: 'Lock 50% of next income',
        icon: '🚨'
      });
      actions.push({
        type: 'warning',
        title: 'Unnecessary kharcha band kar',
        message: 'Biryani aur movie ka shauk baad mein, pehle rent secure kar!',
        action: 'Review last 5 expenses',
        icon: '⚠️'
      });
    } else if (vasooliScore > 40) {
      actions.push({
        type: 'caution',
        title: 'Thoda sambhal ke kharch kar',
        message: 'Score badh raha hai bhai. Control mein rakh apne aap ko!',
        action: 'Set daily spending limit',
        icon: '⚡'
      });
    } else {
      actions.push({
        type: 'good',
        title: 'Shabash! Accha chal raha hai',
        message: 'Keep it up! Aise hi disciplined reh.',
        action: 'Continue current habits',
        icon: '✅'
      });
    }
    
    res.json({ actions, vasooliScore });
    
  } catch (error) {
    console.error('Error getting quick actions:', error);
    res.status(500).json({ error: 'Failed to get quick actions' });
  }
});

export default router;
