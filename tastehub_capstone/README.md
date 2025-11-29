# GuardWallet - AI-Powered Financial Coaching Agent

> **"Paisa Bachayega? Ya Main Ghar Aaaun?"**

GuardWallet is an AI-powered financial coaching agent designed specifically for gig workers and informal sector employees who struggle with irregular income and financial discipline. Unlike generic budgeting apps, GuardWallet acts as a **"Cognitive Prosthesis"**—an intelligent partner that actively enforces financial health rather than just tracking it.

## 🎯 Core Philosophy

GuardWallet operates on the principle that human financial behavior is inherently irrational (due to biases like temporal myopia and conative dissonance). Instead of correcting this irrationality with education, GuardWallet **models it and then weaponizes behavioral psychology** (nudging, fear appeals, cognitive partitioning) to enforce savings.

### The "Vasooli Bhai" Persona

The app's standout feature is its agent persona, **"Vasooli Bhai,"** a strict, culturally resonant character (based on the Indian "recovery agent" archetype). This agent uses Hinglish slang and aggressive "fear appeals" to break through user apathy, effectively bullying users into saving for critical future expenses like rent.

## 🏗️ Technical Architecture

GuardWallet is built on a sophisticated **Neuro-Symbolic Multi-Agent Framework** that mimics human cognition:

- **Perception Layer**: Ingests multi-modal data (transactions, psychometrics) using Kafka streams and analyzes income patterns (irregularity) via Fourier Transforms.
- **Cognitive Layer**: Uses Causal Inference engines and a "Theory of Mind" model to predict risks (e.g., rent default) and calculate the user's Financial Resilience Score (FRS).
- **Action Layer**: Executes proactive interventions (nudges) via the "Vasooli" persona, using Reinforcement Learning (RLHF) to optimize timing and tone.

## ✨ Key Features

### 1. The "Safe-to-Spend" Lie
The dashboard displays a deflated balance to the user, secretly locking away a portion of income for essential bills (Cognitive Partitioning).

### 2. Vasooli Score (FRS)
A dynamic score (0-100) that quantifies financial health based on self-regulation and vulnerability, calculated using the Cobb-Douglas Production Function.

### 3. Streak Consistency
Gamifies savings behavior to combat "Conative Dissonance" (the gap between intent and action).

### 4. Sunk Cost Breaker
Detects and aggressively prompts cancellation of unused subscriptions.

### 5. What-If Simulator
Interactive tool to visualize rent survival scenarios based on current spending patterns.

### 6. Agent Modes
Dynamic switching between **Advisor**, **Strict**, and **Vasooli** modes based on financial behavior.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database (Neon database pre-configured)
- Gemini API Key ([Get one here](https://makersuite.google.com/app/apikey))

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd tastehub_capstone
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   The `.env` file is already configured with the database connection. Just add your Gemini API key:
   ```env
   DATABASE_URL=postgresql://neondb_owner:npg_C9bpXIrjc5BF@ep-super-pond-a1xzjgw0-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
   GEMINI_API_KEY=your_gemini_api_key_here
   PORT=3001
   NODE_ENV=development
   VITE_API_URL=http://localhost:3001/api
   ```

4. **Initialize and seed the database (optional)**
   
   The database schema is automatically initialized on server start. To add sample data:
   ```bash
   npm run db:seed
   ```

5. **Run the development server**
   
   Start both frontend and backend:
   ```bash
   npm run dev:all
   ```
   
   Or separately:
   ```bash
   # Terminal 1: Frontend (Vite)
   npm run dev
   
   # Terminal 2: Backend (Express)
   npm run dev:server
   ```

6. **Build for production**
   ```bash
   npm run build
   npm start
   ```

## 📁 Project Structure

```
tastehub_capstone/
├── server/                 # Backend API
│   ├── api/               # API routes
│   │   ├── financial.js   # Financial data generation
│   │   ├── transactions.js # Transaction CRUD (PostgreSQL)
│   │   └── users.js       # User state management (PostgreSQL)
│   ├── db/                # Database layer
│   │   ├── connection.js  # PostgreSQL connection pool
│   │   ├── init.js        # Schema initialization
│   │   ├── schema.sql     # Database schema
│   │   └── seed.js        # Sample data seeder
│   ├── utils/             # Utilities
│   │   ├── aiService.js   # Gemini AI integration
│   │   └── syntheticData.js # Fallback data generator
│   └── index.js           # Express server
├── src/                   # Frontend React app
│   ├── components/        # React components
│   │   ├── features/       # Feature components
│   │   ├── layout/        # Layout components
│   │   ├── pages/         # Page components
│   │   └── ui/            # UI components
│   ├── services/          # API services
│   │   ├── api.js         # API client
│   │   └── financialDataService.js
│   └── utils/             # Utilities
├── dist/                  # Production build
└── package.json
```

## 🌐 Deployment

### Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Set environment variables** in Vercel dashboard:
   - `GEMINI_API_KEY`
   - `NODE_ENV=production`

### Railway

1. **Connect your GitHub repo** to Railway
2. **Set environment variables**:
   - `GEMINI_API_KEY`
   - `PORT` (auto-set by Railway)
3. **Deploy** - Railway will auto-detect and build

### Manual Deployment

1. **Build the frontend**
   ```bash
   npm run build
   ```

2. **Start the server**
   ```bash
   NODE_ENV=production npm start
   ```

## 🔧 API Endpoints

### Financial Data
- `POST /api/financial/generate` - Generate financial data for a user profile
- `POST /api/financial/frs-breakdown` - Calculate FRS score breakdown
- `POST /api/financial/analyze-irregularity` - Analyze income irregularity

### Transactions
- `GET /api/transactions/:userId` - Get all transactions for a user
- `POST /api/transactions/:userId` - Add a new transaction
- `PUT /api/transactions/:userId/:transactionId` - Update a transaction
- `DELETE /api/transactions/:userId/:transactionId` - Delete a transaction

### User State
- `GET /api/users/:userId/state` - Get user state
- `POST /api/users/:userId/state` - Update user state
- `POST /api/users/:userId/reset` - Reset user state

### Health Check
- `GET /health` - Server health check

## 🎨 Features for Judges

The app includes a **"Judge Mode"** that provides:
- Guided tour overlay
- Interactive checklist of key features
- "How to Demo" modal with step-by-step instructions
- Auto-setup with high-risk profile (Rahul)

## 🧪 Testing

```bash
# Run linter
npm run lint

# Build test
npm run build
```

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `GEMINI_API_KEY` | Google Gemini API key | Yes |
| `PORT` | Server port | No (default: 3001) |
| `NODE_ENV` | Environment | No (default: development) |
| `VITE_API_URL` | Frontend API URL | No (default: localhost:3001/api) |

## 🤝 Contributing

This is a hackathon project. For improvements:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is part of the Agentic AI Hackathon 2024.

## 👥 Team

**Team Mavericks**

---

**Built with ❤️ for gig workers who deserve financial security.**
