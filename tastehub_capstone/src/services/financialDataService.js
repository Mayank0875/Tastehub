import { API_KEY } from '../utils/constants';

// AI Generator Service
export const generateFinancialData = async (profile) => {
  if (!API_KEY) {
    return generateSyntheticData(profile);
  }

  const prompt = `
    You are a financial transaction generator for an Indian Gig Worker/Student app called "GuardWallet".
    
    Generate a JSON object representing the financial state for this user:
    Name: ${profile.name}
    Role: ${profile.role}
    Income Source: ${profile.incomeSource}
    Risk Profile: ${profile.risk}
    
    REQUIREMENTS:
    1. Generate 8-10 realistic transactions for the last 7 days.
    2. Include mixed English/Hinglish descriptions (e.g., "Chai Sutta Bar", "Zomato Payout", "Room Rent").
    3. If Risk is "High", include impulsive purchases (Movies, expensive food).
    4. If Risk is "Low", include savings/investments.
    5. "type" must be 'income' or 'expense'.
    
    OUTPUT FORMAT (JSON ONLY):
    {
      "transactions": [
        { "id": 1, "desc": "String", "amount": Number, "type": "income"|"expense", "date": "String", "status": "Approved"|"Locked" }
      ],
      "vasooliScore": Number (0-100),
      "safeBalance": Number,
      "realBalance": Number,
      "rentSecured": Number (percentage 0-100)
    }
  `;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });
    
    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    const jsonStr = text.replace(/```json/g, '').replace(/```/g, '');
    return JSON.parse(jsonStr);
  } catch (e) {
    console.error("AI Generation Failed, falling back to local logic", e);
    return generateSyntheticData(profile);
  }
};

export const generateSyntheticData = (profile) => {
  const isHighRisk = profile.risk === 'High';
  
  let txs = [
    { id: 101, desc: `${profile.incomeSource} Payout`, amount: isHighRisk ? 850 : 2000, type: 'income', status: 'Locked (20%)', date: 'Today, 9:00 AM' },
    { id: 102, desc: 'Tapri Chai & Sutta', amount: 40, type: 'expense', status: 'Approved', date: 'Today, 10:30 AM' },
  ];

  if (isHighRisk) {
    txs.push({ id: 103, desc: 'PVR: Movie Night', amount: 600, type: 'expense', status: 'BLOCKED', date: 'Yesterday' });
    txs.push({ id: 104, desc: 'Late Night Biryani', amount: 350, type: 'expense', status: 'Approved', date: 'Yesterday' });
  } else {
    txs.push({ id: 103, desc: 'SIP Auto-Debit', amount: 500, type: 'expense', status: 'Invested', date: 'Yesterday' });
    txs.push({ id: 104, desc: 'Grocery Mart', amount: 1200, type: 'expense', status: 'Approved', date: 'Yesterday' });
  }

  return {
    transactions: txs,
    vasooliScore: isHighRisk ? 85 : 24,
    safeBalance: isHighRisk ? 420 : 5000,
    realBalance: isHighRisk ? 1200 : 15000,
    rentSecured: isHighRisk ? 45 : 90
  };
};

