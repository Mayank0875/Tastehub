import { financialAPI } from './api';

// Use backend API for financial data generation
export const generateFinancialData = async (profile) => {
  try {
    const data = await financialAPI.generate(profile);
    return data;
  } catch (error) {
    console.error('Backend API failed, using fallback:', error);
    // Fallback to synthetic data if backend is unavailable
    return generateSyntheticData(profile);
  }
};

// Fallback synthetic data generator (used if backend is down)
export const generateSyntheticData = (profile) => {
  const isHighRisk = profile.risk === 'High';
  const isMediumRisk = profile.risk === 'Medium';
  
  let txs = [
    { id: 101, desc: `${profile.incomeSource || 'Gig Work'} Payout`, amount: isHighRisk ? 850 : isMediumRisk ? 1500 : 2000, type: 'income', status: 'Locked (20%)', date: 'Today, 9:00 AM' },
    { id: 102, desc: 'Tapri Chai & Sutta', amount: 40, type: 'expense', status: 'Approved', date: 'Today, 10:30 AM' },
  ];

  if (isHighRisk) {
    txs.push(
      { id: 103, desc: 'PVR: Movie Night', amount: 600, type: 'expense', status: 'BLOCKED', date: 'Yesterday' },
      { id: 104, desc: 'Late Night Biryani', amount: 350, type: 'expense', status: 'Approved', date: 'Yesterday' },
      { id: 105, desc: 'Uber Ride', amount: 180, type: 'expense', status: 'Approved', date: '2 days ago' }
    );
  } else if (isMediumRisk) {
    txs.push(
      { id: 103, desc: 'Grocery Mart', amount: 1200, type: 'expense', status: 'Approved', date: 'Yesterday' },
      { id: 104, desc: 'Phone Recharge', amount: 299, type: 'expense', status: 'Approved', date: 'Yesterday' }
    );
  } else {
    txs.push(
      { id: 103, desc: 'SIP Auto-Debit', amount: 500, type: 'expense', status: 'Invested', date: 'Yesterday' },
      { id: 104, desc: 'Grocery Mart', amount: 1200, type: 'expense', status: 'Approved', date: 'Yesterday' }
    );
  }

  return {
    transactions: txs,
    vasooliScore: isHighRisk ? 85 : isMediumRisk ? 55 : 24,
    safeBalance: isHighRisk ? 420 : isMediumRisk ? 2500 : 5000,
    realBalance: isHighRisk ? 1200 : isMediumRisk ? 8000 : 15000,
    rentSecured: isHighRisk ? 45 : isMediumRisk ? 70 : 90
  };
};

