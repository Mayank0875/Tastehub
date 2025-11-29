# 💡 AI-Powered Suggestions Feature

## Overview

The Suggestions feature provides personalized, actionable financial advice in **Hinglish** (Hindi + English mix) to make it relatable for Indian users. It analyzes spending patterns and gives specific recommendations based on the user's Vasooli Score and transaction history.

## Features

### 1. Expense Analysis
- Categorizes expenses (food, entertainment, transport, shopping, bills, unnecessary)
- Calculates spending percentages
- Identifies problem areas
- Compares income vs expenses
- Calculates savings rate

### 2. AI-Powered Suggestions
- Uses Google Gemini AI for intelligent suggestions
- Falls back to rule-based suggestions if AI unavailable
- Provides 3-4 actionable recommendations
- Includes specific savings amounts
- Uses Hinglish for relatability

### 3. Vasooli Bhai Persona
- Aggressive tone for high-risk users (Score > 70)
- Cautionary tone for medium-risk (Score 40-70)
- Encouraging tone for low-risk (Score < 40)
- Uses Indian context (chai, biryani, auto, etc.)

## API Endpoints

### Analyze Expenses
```bash
POST /api/suggestions/:userId/analyze
```

**Response:**
```json
{
  "analysis": {
    "totalExpense": 5000,
    "totalIncome": 8000,
    "spending": {
      "food": 1500,
      "entertainment": 800,
      "transport": 600,
      "shopping": 500,
      "bills": 400,
      "unnecessary": 200,
      "other": 1000
    },
    "spendingPercentage": {
      "food": 30,
      "entertainment": 16,
      ...
    },
    "problems": [
      {
        "category": "food",
        "severity": "high",
        "percentage": 30
      }
    ],
    "savingsRate": 37
  },
  "suggestions": [
    {
      "type": "urgent",
      "title": "🚨 Bhai, emergency mode on kar!",
      "message": "Tera Vasooli Score 85 hai! Matlab rent ka khatra hai...",
      "action": "Lock 50% of balance immediately",
      "savings": 2500
    }
  ],
  "vasooliScore": 85,
  "riskLevel": "High"
}
```

### Quick Actions
```bash
GET /api/suggestions/:userId/quick-actions
```

**Response:**
```json
{
  "actions": [
    {
      "type": "urgent",
      "title": "Bhai, rent ka jugaad kar!",
      "message": "Tera Vasooli Score bahut high hai...",
      "action": "Lock 50% of next income",
      "icon": "🚨"
    }
  ],
  "vasooliScore": 85
}
```

## Suggestion Types

### 1. Urgent/Critical (Red)
- Vasooli Score > 70
- Immediate action required
- Aggressive tone
- Example: "Bhai, emergency mode on kar!"

### 2. Warning/Caution (Yellow/Orange)
- Vasooli Score 40-70
- Preventive measures
- Cautionary tone
- Example: "Thoda sambhal ke kharch kar"

### 3. Good (Green)
- Vasooli Score < 40
- Positive reinforcement
- Encouraging tone
- Example: "Shabash! Accha chal raha hai"

### 4. Invest/Tip (Blue)
- For stable users
- Growth opportunities
- Advisory tone
- Example: "Ab invest karne ka time!"

## Hinglish Examples

### High Risk (Score > 70)
```
🚨 Bhai, emergency mode on kar!
Tera Vasooli Score 85 hai! Matlab rent ka khatra hai. 
Abhi se next ₹2500 lock kar de. Bahar khana band, ghar pe khana shuru!

Action: Lock 50% of balance immediately
Savings: ₹2500
```

### Medium Risk (Score 40-70)
```
⚡ Thoda control kar bhai!
Score 55 pe hai. Abhi sambhal ja. Daily ₹100 bach gaye toh 
month mein ₹3000. Woh tera rent ka 30% ho sakta hai!

Action: Save ₹100 daily
Savings: ₹3000
```

### Low Risk (Score < 40)
```
✅ Shabash! Accha chal raha hai
Vasooli Score sirf 24! Tu disciplined hai bhai. 
Bas aise hi chalta reh. Thoda aur optimize kar toh aur better!

Action: Maintain current discipline
Savings: ₹0
```

## Spending Categories

### Food
Keywords: biryani, chai, food, restaurant, zomato, swiggy, tapri

**Suggestion Example:**
```
🍔 Biryani ka shauk baad mein!
₹1500 food pe? Bhai, ghar ka khana khao. 
Bahar ka khana ₹200/day = ₹6000/month
Ghar ka khana ₹80/day = ₹2400/month
Bach gaye ₹3600!
```

### Entertainment
Keywords: movie, pvr, netflix, prime, hotstar, gaming

**Suggestion Example:**
```
🎬 Movie dekhne se pehle rent dekh!
Entertainment pe ₹800? Netflix/Prime share kar dost ke saath. 
PVR ki jagah OTT dekh. Monthly ₹1000 bach jayenge!
```

### Transport
Keywords: uber, ola, petrol, metro, auto, ride

**Suggestion Example:**
```
🚗 Uber/Ola kam kar!
Transport pe ₹600? Metro/bus use kar. 
Uber ₹150 vs Metro ₹40. Daily 2 trips = ₹220 saved. 
Month mein ₹6600!
```

### Unnecessary
Keywords: sutta, cigarette, alcohol, beer, wine

**Suggestion Example:**
```
🚬 Yeh kya bakwaas hai?
Sutta/alcohol pe ₹200? Bhai, yeh paisa literally jal raha hai! 
Band kar isko. Health bhi, wealth bhi!
```

## Frontend Components

### SuggestionsPanel
Full-screen modal showing detailed analysis and suggestions.

**Usage:**
```jsx
import SuggestionsPanel from './components/features/SuggestionsPanel';

<SuggestionsPanel 
  userId="rahul" 
  vasooliScore={85}
  onClose={() => setShowSuggestions(false)}
/>
```

### QuickActionsWidget
Dashboard widget showing top 2 quick actions.

**Usage:**
```jsx
import QuickActionsWidget from './components/features/QuickActionsWidget';

<QuickActionsWidget 
  userId="rahul"
  vasooliScore={85}
  onOpenSuggestions={() => setShowSuggestions(true)}
/>
```

## Integration Steps

### 1. Backend Setup
Already integrated! The suggestions API is available at:
- `/api/suggestions/:userId/analyze`
- `/api/suggestions/:userId/quick-actions`

### 2. Frontend Integration

Add to Dashboard component:
```jsx
import { useState } from 'react';
import SuggestionsPanel from './components/features/SuggestionsPanel';
import QuickActionsWidget from './components/features/QuickActionsWidget';

function Dashboard({ user }) {
  const [showSuggestions, setShowSuggestions] = useState(false);

  return (
    <div>
      {/* Add Quick Actions Widget */}
      <QuickActionsWidget 
        userId={user.id}
        vasooliScore={vasooliScore}
        onOpenSuggestions={() => setShowSuggestions(true)}
      />

      {/* Add Suggestions Panel */}
      {showSuggestions && (
        <SuggestionsPanel 
          userId={user.id}
          vasooliScore={vasooliScore}
          onClose={() => setShowSuggestions(false)}
        />
      )}
    </div>
  );
}
```

### 3. Add Button to Trigger Suggestions
```jsx
<button 
  onClick={() => setShowSuggestions(true)}
  className="px-4 py-2 bg-blue-600 text-white rounded-lg"
>
  💡 Get Suggestions
</button>
```

## Testing

### Test Analyze Endpoint
```bash
curl -X POST http://localhost:3001/api/suggestions/rahul/analyze \
  -H "Content-Type: application/json"
```

### Test Quick Actions
```bash
curl http://localhost:3001/api/suggestions/rahul/quick-actions
```

## Customization

### Add New Categories
Edit `server/api/suggestions.js`:
```javascript
const categories = {
  food: ['biryani', 'chai', ...],
  entertainment: ['movie', 'pvr', ...],
  // Add your category
  healthcare: ['doctor', 'medicine', 'hospital']
};
```

### Add New Suggestions
Edit `server/utils/suggestionService.js`:
```javascript
if (analysis.spending.healthcare > 1000) {
  suggestions.push({
    type: 'tip',
    title: '🏥 Health insurance le le bhai!',
    message: 'Medical bills ₹1000+? Insurance lele...',
    action: 'Get health insurance',
    savings: 0
  });
}
```

### Customize Hinglish Tone
Modify the AI prompt in `suggestionService.js`:
```javascript
const prompt = `
You are "Vasooli Bhai"...
[Customize tone, style, and language here]
`;
```

## Benefits

1. **Relatable** - Uses Hinglish and Indian context
2. **Actionable** - Specific steps with savings amounts
3. **Personalized** - Based on user's actual spending
4. **Engaging** - Vasooli Bhai persona makes it fun
5. **Effective** - Shows real impact (₹ saved)

## Future Enhancements

- [ ] WhatsApp notifications with suggestions
- [ ] Weekly spending reports in Hinglish
- [ ] Voice messages from Vasooli Bhai
- [ ] Gamification (badges for following suggestions)
- [ ] Peer comparison ("Tera dost ₹2000 save kar raha hai!")
- [ ] Automated expense blocking based on suggestions
- [ ] ML-based prediction of future problems

## Summary

The Suggestions feature brings GuardWallet's Vasooli Bhai persona to life with:
- ✅ AI-powered analysis
- ✅ Hinglish communication
- ✅ Specific actionable advice
- ✅ Real savings calculations
- ✅ Risk-based tone adjustment
- ✅ Indian context and relatability

**Status: ✅ Ready to use!**
