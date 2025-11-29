import express from 'express';
import { query } from '../db/connection.js';

const router = express.Router();

// Get transactions for a user
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const result = await query(
      'SELECT * FROM transactions WHERE user_id = $1 ORDER BY date DESC',
      [userId]
    );
    
    const transactions = result.rows.map(row => ({
      id: row.id,
      desc: row.description,
      amount: parseFloat(row.amount),
      type: row.type,
      status: row.status,
      category: row.category,
      date: row.date
    }));
    
    res.json({ transactions });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});

// Add a transaction
router.post('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const transaction = req.body;
    
    if (!transaction.amount || !transaction.type) {
      return res.status(400).json({ 
        error: 'Transaction must have amount and type' 
      });
    }

    const result = await query(
      `INSERT INTO transactions (user_id, description, amount, type, status, category, date)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [
        userId,
        transaction.desc || transaction.description || 'Transaction',
        transaction.amount,
        transaction.type,
        transaction.status || 'Approved',
        transaction.category || null,
        transaction.date || new Date()
      ]
    );
    
    const newTransaction = {
      id: result.rows[0].id,
      desc: result.rows[0].description,
      amount: parseFloat(result.rows[0].amount),
      type: result.rows[0].type,
      status: result.rows[0].status,
      category: result.rows[0].category,
      date: result.rows[0].date
    };

    // Get all transactions for response
    const allTransactions = await query(
      'SELECT * FROM transactions WHERE user_id = $1 ORDER BY date DESC',
      [userId]
    );
    
    const transactions = allTransactions.rows.map(row => ({
      id: row.id,
      desc: row.description,
      amount: parseFloat(row.amount),
      type: row.type,
      status: row.status,
      category: row.category,
      date: row.date
    }));

    res.json({ transaction: newTransaction, transactions });
  } catch (error) {
    console.error('Error adding transaction:', error);
    res.status(500).json({ error: 'Failed to add transaction' });
  }
});

// Update transaction
router.put('/:userId/:transactionId', async (req, res) => {
  try {
    const { userId, transactionId } = req.params;
    const updates = req.body;
    
    const updateFields = [];
    const values = [];
    let paramCount = 1;
    
    if (updates.desc || updates.description) {
      updateFields.push(`description = $${paramCount++}`);
      values.push(updates.desc || updates.description);
    }
    if (updates.amount !== undefined) {
      updateFields.push(`amount = $${paramCount++}`);
      values.push(updates.amount);
    }
    if (updates.type) {
      updateFields.push(`type = $${paramCount++}`);
      values.push(updates.type);
    }
    if (updates.status) {
      updateFields.push(`status = $${paramCount++}`);
      values.push(updates.status);
    }
    if (updates.category) {
      updateFields.push(`category = $${paramCount++}`);
      values.push(updates.category);
    }
    
    values.push(transactionId, userId);
    
    const result = await query(
      `UPDATE transactions 
       SET ${updateFields.join(', ')}
       WHERE id = $${paramCount} AND user_id = $${paramCount + 1}
       RETURNING *`,
      values
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    
    const transaction = {
      id: result.rows[0].id,
      desc: result.rows[0].description,
      amount: parseFloat(result.rows[0].amount),
      type: result.rows[0].type,
      status: result.rows[0].status,
      category: result.rows[0].category,
      date: result.rows[0].date
    };

    res.json({ transaction });
  } catch (error) {
    console.error('Error updating transaction:', error);
    res.status(500).json({ error: 'Failed to update transaction' });
  }
});

// Delete transaction
router.delete('/:userId/:transactionId', async (req, res) => {
  try {
    const { userId, transactionId } = req.params;
    
    await query(
      'DELETE FROM transactions WHERE id = $1 AND user_id = $2',
      [transactionId, userId]
    );
    
    // Get remaining transactions
    const result = await query(
      'SELECT * FROM transactions WHERE user_id = $1 ORDER BY date DESC',
      [userId]
    );
    
    const transactions = result.rows.map(row => ({
      id: row.id,
      desc: row.description,
      amount: parseFloat(row.amount),
      type: row.type,
      status: row.status,
      category: row.category,
      date: row.date
    }));

    res.json({ success: true, transactions });
  } catch (error) {
    console.error('Error deleting transaction:', error);
    res.status(500).json({ error: 'Failed to delete transaction' });
  }
});

export default router;

