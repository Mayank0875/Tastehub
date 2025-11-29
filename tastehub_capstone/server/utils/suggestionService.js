import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = process.env.GEMINI_API_KEY 
  ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  : null;

// Generate AI-powered suggestions in Hinglish
export const generateAISuggestion = async (user, transactions, analysis) => {
  // If AI is not available, use rule-based suggestions
  if (!genAI) {
    return generateRuleBasedSuggestions(user, transactions, analysis);
  }
  
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const prompt = `
You are "Vasooli Bhai", a strict but caring financial advisor for Indian gig workers. 
Analyze this user's spending and give 3-4 actionable suggestions in HINGLISH (Hindi + English mix).

User Profile:
- Name: ${user.name}
- Risk Level: ${user.risk_level}
- Vasooli Score: ${user.vasooli_score}/100 (higher = more risky)
- Real Balance: ₹${user.real_balance}
- Safe Balance: ₹${user.safe_balance}
- Rent Secured: ${user.rent_secured}%

Spending Analysis:
- Total Expense: ₹${analysis.totalExpense}
- Total Income: ₹${analysis.totalIncome}
- Savings Rate: ${analysis.savingsRate}%
- Food: ${analysis.spendingPercentage.food}% (₹${analysis.spending.food})
- Entertainment: ${analysis.spendingPercentage.entertainment}% (₹${analysis.spending.entertainment})
- Unnecessary: ₹${analysis.spending.unnecessary}

Recent Transactions:
${transactions.slice(0, 5).map(t => `- ${t.desc}: ₹${t.amount} (${t.type})`).join('\n')}

Problems Identified:
${analysis.problems.map(p => `- ${p.category}: ${p.severity} severity`).join('\n')}

INSTRUCTIONS:
1. Use Hinglish (mix of Hindi and English) - be relatable and street-smart
2. Be direct and slightly aggressive if Vasooli Score > 70
3. Use Indian context (chai, biryani, auto, etc.)
4. Give SPECIFIC actionable advice with numbers
5. Use emojis to make it engaging
6. Keep each suggestion under 100 words
7. Format as JSON array with: { type, title, message, action, savings }

Example tone:
- High risk: "Bhai, yeh kya chal raha hai? ₹600 movie pe? Rent ka kya hoga?"
- Medium risk: "Dekh bhai, thoda control kar. Daily ₹200 bach gaye toh month mein ₹6000!"
- Low risk: "Shabash! Aise hi chalta reh. Bas thoda aur improve kar sakte ho."

Return ONLY a JSON array, no other text.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Try to parse AI response
    try {
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        const suggestions = JSON.parse(jsonMatch[0]);
        return suggestions;
      }
    } catch (parseError) {
      console.warn('Failed to parse AI response, using rule-based');
    }
    
    // Fallback to rule-based
    return generateRuleBasedSuggestions(user, transactions, analysis);
    
  } catch (error) {
    console.error('AI suggestion error:', error);
    return generateRuleBasedSuggestions(user, transactions, analysis);
  }
};

// Rule-based suggestions in Hinglish
function generateRuleBasedSuggestions(user, transactions, analysis) {
  const suggestions = [];
  const vasooliScore = user.vasooli_score;
  const problems = analysis.problems;
  
  // High risk suggestions (Vasooli Score > 70)
  if (vasooliScore > 70) {
    suggestions.push({
      type: 'urgent',
      title: '🚨 Bhai, emergency mode on kar!',
      message: `Tera Vasooli Score ${vasooliScore} hai! Matlab rent ka khatra hai. Abhi se next ₹${Math.round(user.real_balance * 0.5)} lock kar de. Bahar khana band, ghar pe khana shuru!`,
      action: 'Lock 50% of balance immediately',
      savings: Math.round(user.real_balance * 0.5)
    });
    
    if (analysis.spending.food > 1000) {
      suggestions.push({
        type: 'critical',
        title: '🍔 Biryani ka shauk baad mein!',
        message: `₹${analysis.spending.food} food pe? Bhai, ghar ka khana khao. Bahar ka khana ₹200/day = ₹6000/month. Ghar ka khana ₹80/day = ₹2400/month. Bach gaye ₹3600!`,
        action: 'Cook at home, save ₹3600/month',
        savings: 3600
      });
    }
    
    if (analysis.spending.entertainment > 500) {
      suggestions.push({
        type: 'warning',
        title: '🎬 Movie dekhne se pehle rent dekh!',
        message: `Entertainment pe ₹${analysis.spending.entertainment}? Netflix/Prime share kar dost ke saath. PVR ki jagah OTT dekh. Monthly ₹1000 bach jayenge!`,
        action: 'Share subscriptions, avoid theaters',
        savings: 1000
      });
    }
  }
  
  // Medium risk suggestions (40-70)
  else if (vasooliScore > 40) {
    suggestions.push({
      type: 'caution',
      title: '⚡ Thoda control kar bhai!',
      message: `Score ${vasooliScore} pe hai. Abhi sambhal ja. Daily ₹100 bach gaye toh month mein ₹3000. Woh tera rent ka 30% ho sakta hai!`,
      action: 'Save ₹100 daily',
      savings: 3000
    });
    
    if (analysis.spending.transport > 500) {
      suggestions.push({
        type: 'tip',
        title: '🚗 Uber/Ola kam kar!',
        message: `Transport pe ₹${analysis.spending.transport}? Metro/bus use kar. Uber ₹150 vs Metro ₹40. Daily 2 trips = ₹220 saved. Month mein ₹6600!`,
        action: 'Use public transport',
        savings: 6600
      });
    }
  }
  
  // Low risk suggestions (< 40)
  else {
    suggestions.push({
      type: 'good',
      title: '✅ Shabash! Accha chal raha hai',
      message: `Vasooli Score sirf ${vasooliScore}! Tu disciplined hai bhai. Bas aise hi chalta reh. Thoda aur optimize kar toh aur better!`,
      action: 'Maintain current discipline',
      savings: 0
    });
    
    suggestions.push({
      type: 'invest',
      title: '💰 Ab invest karne ka time!',
      message: `Tu stable hai. Ab ₹${Math.round(user.safe_balance * 0.2)} SIP mein daal de. Small steps, big returns. Future secure kar!`,
      action: `Start SIP with ₹${Math.round(user.safe_balance * 0.2)}`,
      savings: 0
    });
  }
  
  // Unnecessary spending (applies to all)
  if (analysis.spending.unnecessary > 0) {
    suggestions.push({
      type: 'critical',
      title: '🚬 Yeh kya bakwaas hai?',
      message: `Sutta/alcohol pe ₹${analysis.spending.unnecessary}? Bhai, yeh paisa literally jal raha hai! Band kar isko. Health bhi, wealth bhi!`,
      action: 'Quit smoking/drinking',
      savings: analysis.spending.unnecessary
    });
  }
  
  // Overspending warning
  if (problems.some(p => p.category === 'overspending')) {
    const problem = problems.find(p => p.category === 'overspending');
    suggestions.push({
      type: 'urgent',
      title: '💸 Zyada kharch ho raha hai!',
      message: `Tu apni income ka ${problem.ratio}% kharch kar raha hai! Bhai, 50-60% se zyada nahi hona chahiye. Warna next month kya hoga?`,
      action: 'Reduce expenses by 20%',
      savings: Math.round(analysis.totalExpense * 0.2)
    });
  }
  
  return suggestions.slice(0, 4); // Return max 4 suggestions
}

// Generate Vasooli Bhai's aggressive message
export const generateVasooliBhaiMessage = (vasooliScore, expense, safeBalance) => {
  const messages = {
    high: [
      `Arre bhai! ₹${expense} kharchne ja raha hai? Tere paas sirf ₹${safeBalance} safe hai! Main aa raha hoon! 😠`,
      `Ruk ja bhai! Yeh ₹${expense} ka kharcha nahi hone wala. Pehle rent ka jugaad kar! 🚨`,
      `Kya kar raha hai tu? Score ${vasooliScore} pe hai aur phir bhi kharch? Ghar aa raha hoon main! 😤`,
      `Band kar yeh drama! ₹${expense} nahi milenge tujhe. Pehle rent secure kar! ⛔`
    ],
    medium: [
      `Dekh bhai, ₹${expense} thoda zyada hai. Score ${vasooliScore} pe hai. Soch samajh ke kharch! ⚠️`,
      `Bhai, control kar thoda. Aise kharchega toh Vasooli Bhai ko bulana padega! 😬`,
      `₹${expense}? Seriously? Thoda kam kar, warna problem ho jayegi! ⚡`
    ],
    low: [
      `Hmm, ₹${expense}? Thik hai, par dhyan rakh. Score badhne laga toh main aa jaunga! 👀`,
      `Chalta hai bhai, par limit mein reh. Zyada mat kar! 😊`
    ]
  };
  
  let category = 'low';
  if (vasooliScore > 70) category = 'high';
  else if (vasooliScore > 40) category = 'medium';
  
  const categoryMessages = messages[category];
  return categoryMessages[Math.floor(Math.random() * categoryMessages.length)];
};

// Generate motivational message for good behavior
export const generateMotivationalMessage = (savingsRate, streak) => {
  if (savingsRate > 40) {
    return `🎉 Waah bhai! ${savingsRate}% save kar raha hai! Tu toh champion nikla! Aise hi chalta reh! 💪`;
  } else if (savingsRate > 20) {
    return `👍 Accha hai bhai! ${savingsRate}% savings. Thoda aur push kar, 40% tak le ja! 🚀`;
  } else if (streak > 7) {
    return `🔥 ${streak} din ka streak! Bhai tu consistent hai. Bas amount thoda badha de! 💯`;
  } else {
    return `Chalo, shuru toh kiya. Ab consistency dikha! Daily thoda thoda save kar! 💪`;
  }
};
