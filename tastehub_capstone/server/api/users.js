import express from 'express';
import { query } from '../db/connection.js';

const router = express.Router();

// Get user state
router.get('/:userId/state', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const result = await query(
      'SELECT * FROM users WHERE id = $1',
      [userId]
    );
    
    if (result.rows.length === 0) {
      // Return default state if user doesn't exist
      return res.json({
        realBalance: 0,
        safeBalance: 0,
        vasooliScore: 0,
        rentSecured: 0,
        agentMode: 'Advisor',
        lockRate: 0.2
      });
    }
    
    const user = result.rows[0];
    res.json({
      realBalance: parseFloat(user.real_balance),
      safeBalance: parseFloat(user.safe_balance),
      vasooliScore: user.vasooli_score,
      rentSecured: user.rent_secured,
      agentMode: user.agent_mode,
      lockRate: parseFloat(user.lock_rate)
    });
  } catch (error) {
    console.error('Error fetching user state:', error);
    res.status(500).json({ error: 'Failed to fetch user state' });
  }
});

// Update user state
router.post('/:userId/state', async (req, res) => {
  try {
    const { userId } = req.params;
    const updates = req.body;
    
    // Check if user exists
    const existingUser = await query(
      'SELECT * FROM users WHERE id = $1',
      [userId]
    );
    
    if (existingUser.rows.length === 0) {
      // Create new user
      const result = await query(
        `INSERT INTO users (id, name, risk_level, income_source, real_balance, safe_balance, 
         vasooli_score, rent_secured, agent_mode, lock_rate)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
         RETURNING *`,
        [
          userId,
          updates.name || 'User',
          updates.riskLevel || 'Medium',
          updates.incomeSource || 'Gig Work',
          updates.realBalance || 0,
          updates.safeBalance || 0,
          updates.vasooliScore || 0,
          updates.rentSecured || 0,
          updates.agentMode || 'Advisor',
          updates.lockRate || 0.2
        ]
      );
      
      const user = result.rows[0];
      return res.json({
        realBalance: parseFloat(user.real_balance),
        safeBalance: parseFloat(user.safe_balance),
        vasooliScore: user.vasooli_score,
        rentSecured: user.rent_secured,
        agentMode: user.agent_mode,
        lockRate: parseFloat(user.lock_rate)
      });
    }
    
    // Update existing user
    const updateFields = [];
    const values = [];
    let paramCount = 1;
    
    if (updates.realBalance !== undefined) {
      updateFields.push(`real_balance = $${paramCount++}`);
      values.push(updates.realBalance);
    }
    if (updates.safeBalance !== undefined) {
      updateFields.push(`safe_balance = $${paramCount++}`);
      values.push(updates.safeBalance);
    }
    if (updates.vasooliScore !== undefined) {
      updateFields.push(`vasooli_score = $${paramCount++}`);
      values.push(updates.vasooliScore);
    }
    if (updates.rentSecured !== undefined) {
      updateFields.push(`rent_secured = $${paramCount++}`);
      values.push(updates.rentSecured);
    }
    if (updates.agentMode !== undefined) {
      updateFields.push(`agent_mode = $${paramCount++}`);
      values.push(updates.agentMode);
    }
    if (updates.lockRate !== undefined) {
      updateFields.push(`lock_rate = $${paramCount++}`);
      values.push(updates.lockRate);
    }
    
    values.push(userId);
    
    const result = await query(
      `UPDATE users SET ${updateFields.join(', ')} WHERE id = $${paramCount} RETURNING *`,
      values
    );
    
    const user = result.rows[0];
    res.json({
      realBalance: parseFloat(user.real_balance),
      safeBalance: parseFloat(user.safe_balance),
      vasooliScore: user.vasooli_score,
      rentSecured: user.rent_secured,
      agentMode: user.agent_mode,
      lockRate: parseFloat(user.lock_rate)
    });
  } catch (error) {
    console.error('Error updating user state:', error);
    res.status(500).json({ error: 'Failed to update user state' });
  }
});

// Reset user state
router.post('/:userId/reset', async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Delete user and all associated data (cascades to transactions)
    await query('DELETE FROM users WHERE id = $1', [userId]);
    
    res.json({ success: true, message: 'User state reset' });
  } catch (error) {
    console.error('Error resetting user state:', error);
    res.status(500).json({ error: 'Failed to reset user state' });
  }
});

export default router;

