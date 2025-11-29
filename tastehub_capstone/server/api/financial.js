import express from 'express';
import { generateFinancialData } from '../utils/aiService.js';
import { generateSyntheticData } from '../utils/syntheticData.js';

const router = express.Router();

// Generate financial data for a user profile
router.post('/generate', async (req, res) => {
  try {
    const { profile } = req.body;
    
    if (!profile || !profile.name || !profile.risk) {
      return res.status(400).json({ 
        error: 'Invalid profile data. Required: name, risk, incomeSource' 
      });
    }

    // Try AI generation first, fallback to synthetic
    let data;
    try {
      data = await generateFinancialData(profile);
    } catch (aiError) {
      console.warn('AI generation failed, using synthetic data:', aiError.message);
      data = generateSyntheticData(profile);
    }

    res.json(data);
  } catch (error) {
    console.error('Error generating financial data:', error);
    res.status(500).json({ 
      error: 'Failed to generate financial data',
      message: error.message 
    });
  }
});

// Calculate FRS score breakdown
router.post('/frs-breakdown', (req, res) => {
  try {
    const { vasooliScore, transactions, rentSecured } = req.body;
    
    // Reverse engineer SRI and VI from FRS
    // FRS = 100 * (SRI)^λ * (1-VI)^(1-λ) where λ ≈ 0.6
    const lambda = 0.6;
    const frs = vasooliScore / 100;
    
    // Estimate VI from rent secured (inverse relationship)
    const vi = Math.max(0.1, Math.min(0.9, 1 - (rentSecured / 100)));
    
    // Solve for SRI: SRI = (FRS / (1-VI)^(1-λ))^(1/λ)
    const sri = Math.pow(frs / Math.pow(1 - vi, 1 - lambda), 1 / lambda);
    const clampedSRI = Math.max(0.1, Math.min(0.95, sri));
    
    res.json({
      frs: vasooliScore,
      sri: Math.round(clampedSRI * 100),
      vi: Math.round(vi * 100),
      lambda: lambda * 100,
      explanation: {
        sri: 'Self-Regulation Index: Your ability to stick to savings goals',
        vi: 'Vulnerability Index: Risk of financial distress',
        frs: 'Financial Resilience Score: Overall health (0-100)'
      }
    });
  } catch (error) {
    console.error('Error calculating FRS breakdown:', error);
    res.status(500).json({ error: 'Failed to calculate FRS breakdown' });
  }
});

// Analyze income irregularity
router.post('/analyze-irregularity', (req, res) => {
  try {
    const { transactions } = req.body;
    
    if (!Array.isArray(transactions)) {
      return res.status(400).json({ error: 'Transactions must be an array' });
    }

    const incomes = transactions.filter(t => t.type === 'income');
    
    if (incomes.length <= 1) {
      return res.json({
        label: 'Stable',
        coefficient: 0,
        message: 'Insufficient income data to analyze'
      });
    }

    const amounts = incomes.map(t => Math.abs(t.amount));
    const mean = amounts.reduce((a, b) => a + b, 0) / amounts.length;
    
    if (!mean) {
      return res.json({ label: 'Stable', coefficient: 0 });
    }

    const variance = amounts.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / amounts.length;
    const stdDev = Math.sqrt(variance);
    const cv = stdDev / mean; // coefficient of variation

    let label = 'Stable';
    if (cv > 0.7) label = 'Chaotic';
    else if (cv > 0.3) label = 'Unsteady';

    res.json({
      label,
      coefficient: Math.round(cv * 100) / 100,
      mean: Math.round(mean),
      stdDev: Math.round(stdDev),
      message: `Income pattern: ${label.toLowerCase()} (CV: ${(cv * 100).toFixed(1)}%)`
    });
  } catch (error) {
    console.error('Error analyzing irregularity:', error);
    res.status(500).json({ error: 'Failed to analyze income irregularity' });
  }
});

export default router;

