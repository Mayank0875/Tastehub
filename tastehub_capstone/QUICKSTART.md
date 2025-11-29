# Quick Start Guide

## 🚀 Get GuardWallet Running in 5 Minutes

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Get Gemini API Key
1. Go to https://makersuite.google.com/app/apikey
2. Create a new API key
3. Copy the key

### Step 3: Create Environment File
Create a `.env` file in the root directory:

```env
GEMINI_API_KEY=paste_your_key_here
PORT=3001
NODE_ENV=development
```

### Step 4: Start the App
```bash
npm run dev:all
```

This starts both:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001

### Step 5: Test It
1. Open http://localhost:5173
2. Click "Try Prototype"
3. Select "Rahul Kumar" (High Risk) for full Vasooli experience
4. Try adding an expense larger than "Safe to Spend" to see the block!

## 🎯 What to Test

### For Judges:
1. **Select Rahul (High Risk)** - Shows aggressive Vasooli mode
2. **Try blocking a transaction** - Add expense > Safe balance
3. **Open Analytics tab** - See FRS breakdown, causal map, What-if simulator
4. **Cancel a subscription** - Under Sunk Cost Breaker

### Key Features to Demo:
- ✅ Agent Modes (Advisor → Strict → Vasooli)
- ✅ Cognitive Partitioning (Safe-to-Spend "lie")
- ✅ FRS Score Decomposition
- ✅ Income Irregularity Analysis
- ✅ What-If Rent Survival Simulator
- ✅ Sunk Cost Breaker

## 🐛 Troubleshooting

### "GEMINI_API_KEY not configured"
- Make sure `.env` file exists in root directory
- Check the key is correct (no extra spaces)

### "Cannot connect to API"
- Make sure backend is running: `npm run dev:server`
- Check port 3001 is not in use

### Frontend shows errors
- Clear browser cache
- Check browser console for specific errors
- Verify both frontend and backend are running

## 📦 Production Build

```bash
# Build frontend
npm run build

# Start production server
npm start
```

## 🌐 Deploy

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

**Quick Deploy to Vercel:**
```bash
npm i -g vercel
vercel
# Set GEMINI_API_KEY in Vercel dashboard
vercel --prod
```

---

**Need help?** Check the main [README.md](./README.md) for detailed documentation.

