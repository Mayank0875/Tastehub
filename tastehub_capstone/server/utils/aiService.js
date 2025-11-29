import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = process.env.GEMINI_API_KEY || '';

export const generateFinancialData = async (profile) => {
  if (!API_KEY) {
    throw new Error('GEMINI_API_KEY not configured');
  }

  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

  const prompt = `You are a financial transaction generator for an Indian Gig Worker/Student app called "GuardWallet".

Generate a JSON object representing the financial state for this user:
Name: ${profile.name}
Role: ${profile.role || 'Gig Worker'}
Income Source: ${profile.incomeSource || 'Variable'}
Risk Profile: ${profile.risk}

REQUIREMENTS:
1. Generate 8-10 realistic transactions for the last 7 days.
2. Include mixed English/Hinglish descriptions (e.g., "Chai Sutta Bar", "Zomato Payout", "Room Rent", "Uber Earnings").
3. If Risk is "High", include impulsive purchases (Movies, expensive food, late-night orders).
4. If Risk is "Low", include savings/investments and planned expenses.
5. "type" must be 'income' or 'expense'.
6. Include realistic Indian amounts (₹50 to ₹5000 range).
7. Dates should be relative (e.g., "Today, 9:00 AM", "Yesterday", "2 days ago").

OUTPUT FORMAT (JSON ONLY, no markdown):
{
  "transactions": [
    { "id": 1, "desc": "String", "amount": Number, "type": "income"|"expense", "date": "String", "status": "Approved"|"Locked"|"BLOCKED" }
  ],
  "vasooliScore": Number (0-100, higher = more risky),
  "safeBalance": Number,
  "realBalance": Number,
  "rentSecured": Number (percentage 0-100)
}

Return ONLY valid JSON, no explanations.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Clean the response
    let jsonStr = text.trim();
    jsonStr = jsonStr.replace(/```json/g, '').replace(/```/g, '').trim();
    
    // Try to extract JSON if wrapped in text
    const jsonMatch = jsonStr.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      jsonStr = jsonMatch[0];
    }
    
    const data = JSON.parse(jsonStr);
    
    // Validate and sanitize
    if (!data.transactions || !Array.isArray(data.transactions)) {
      throw new Error('Invalid transaction data');
    }
    
    return {
      transactions: data.transactions.map((tx, idx) => ({
        id: tx.id || idx + 100,
        desc: tx.desc || 'Transaction',
        amount: Math.abs(tx.amount || 0),
        type: tx.type === 'income' ? 'income' : 'expense',
        date: tx.date || 'Today',
        status: tx.status || (tx.type === 'income' ? 'Locked (20%)' : 'Approved')
      })),
      vasooliScore: Math.max(0, Math.min(100, data.vasooliScore || 50)),
      safeBalance: Math.max(0, data.safeBalance || 1000),
      realBalance: Math.max(0, data.realBalance || 2000),
      rentSecured: Math.max(0, Math.min(100, data.rentSecured || 50))
    };
  } catch (error) {
    console.error('AI generation error:', error);
    throw error;
  }
};

