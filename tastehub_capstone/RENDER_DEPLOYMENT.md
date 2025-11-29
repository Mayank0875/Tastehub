# 🚀 Render Deployment Guide

## Overview

This guide will help you deploy GuardWallet to Render with:
- **Backend:** Node.js API on Render Web Service
- **Frontend:** React app on Render Static Site
- **Database:** PostgreSQL (Neon) - already configured

## 📋 Prerequisites

1. GitHub account
2. Render account (free tier works!)
3. Your code pushed to GitHub
4. Neon database URL (already have it)
5. Gemini API key (optional, for AI suggestions)

---

## 🎯 Deployment Steps

### Option 1: One-Click Deploy (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for Render deployment"
   git push origin main
   ```

2. **Connect to Render**
   - Go to https://render.com
   - Click "New +" → "Blueprint"
   - Connect your GitHub repository
   - Render will auto-detect `render.yaml`

3. **Set Environment Variables**
   
   For **guardwallet-backend**:
   - `DATABASE_URL`: Your Neon PostgreSQL URL
   - `GEMINI_API_KEY`: Your Google Gemini API key
   - `NODE_ENV`: production (auto-set)

   For **guardwallet-frontend**:
   - `VITE_API_URL`: Will be auto-set to backend URL

4. **Deploy!**
   - Click "Apply"
   - Wait 5-10 minutes for deployment
   - Done! ✅

---

### Option 2: Manual Deploy

#### Step 1: Deploy Backend

1. **Create Web Service**
   - Go to Render Dashboard
   - Click "New +" → "Web Service"
   - Connect your GitHub repo
   - Select branch: `main`

2. **Configure Backend**
   ```
   Name: guardwallet-backend
   Region: Singapore (or closest to you)
   Branch: main
   Root Directory: (leave empty)
   Environment: Node
   Build Command: npm install
   Start Command: npm start
   Plan: Free
   ```

3. **Add Environment Variables**
   ```
   DATABASE_URL = postgresql://neondb_owner:npg_C9bpXIrjc5BF@ep-super-pond-a1xzjgw0-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
   GEMINI_API_KEY = your_gemini_api_key_here
   NODE_ENV = production
   ```

4. **Advanced Settings**
   - Health Check Path: `/health`
   - Auto-Deploy: Yes

5. **Create Web Service**
   - Click "Create Web Service"
   - Wait for deployment (~5 minutes)
   - Note your backend URL: `https://guardwallet-backend.onrender.com`

#### Step 2: Deploy Frontend

1. **Create Static Site**
   - Go to Render Dashboard
   - Click "New +" → "Static Site"
   - Connect same GitHub repo

2. **Configure Frontend**
   ```
   Name: guardwallet-frontend
   Region: Singapore
   Branch: main
   Root Directory: (leave empty)
   Build Command: npm install && npm run build
   Publish Directory: dist
   ```

3. **Add Environment Variable**
   ```
   VITE_API_URL = https://guardwallet-backend.onrender.com/api
   ```
   (Replace with your actual backend URL from Step 1)

4. **Create Static Site**
   - Click "Create Static Site"
   - Wait for build (~3-5 minutes)
   - Your frontend URL: `https://guardwallet-frontend.onrender.com`

---

## ✅ Verify Deployment

### Test Backend

1. **Health Check**
   ```bash
   curl https://guardwallet-backend.onrender.com/health
   ```
   
   Should return:
   ```json
   {
     "status": "ok",
     "message": "GuardWallet API is running",
     "database": "connected"
   }
   ```

2. **Test API**
   ```bash
   curl -X POST https://guardwallet-backend.onrender.com/api/users/test/state \
     -H "Content-Type: application/json" \
     -d '{"name":"Test","riskLevel":"Medium","realBalance":5000}'
   ```

### Test Frontend

1. Open your frontend URL in browser
2. Should see GuardWallet landing page
3. Try creating a user profile
4. Check if API calls work

---

## 🔧 Configuration Files

### render.yaml (Blueprint)
```yaml
services:
  - type: web
    name: guardwallet-backend
    env: node
    buildCommand: npm install
    startCommand: npm start
    
  - type: web
    name: guardwallet-frontend
    env: static
    buildCommand: npm install && npm run build
    staticPublishPath: ./dist
```

### package.json Scripts
```json
{
  "scripts": {
    "start": "node server/index.js",
    "build": "vite build",
    "dev": "vite",
    "dev:server": "node server/index.js"
  }
}
```

---

## 🌐 Environment Variables

### Backend (.env)
```env
DATABASE_URL=postgresql://neondb_owner:npg_C9bpXIrjc5BF@...
GEMINI_API_KEY=your_key_here
NODE_ENV=production
PORT=3001
```

### Frontend
```env
VITE_API_URL=https://guardwallet-backend.onrender.com/api
```

---

## 🐛 Troubleshooting

### Backend Issues

**Database Connection Failed**
- Check DATABASE_URL is correct
- Verify Neon database is active
- Check Render logs: Dashboard → Service → Logs

**Port Issues**
- Render auto-assigns PORT
- Our code uses `process.env.PORT || 3001`
- No changes needed!

**Build Failed**
- Check `package.json` has all dependencies
- Verify `npm install` works locally
- Check Node version (we use latest)

### Frontend Issues

**API Calls Failing**
- Check VITE_API_URL is set correctly
- Verify backend is deployed and running
- Check CORS settings (already configured)

**Build Failed**
- Run `npm run build` locally first
- Check for TypeScript/ESLint errors
- Verify all imports are correct

**Blank Page**
- Check browser console for errors
- Verify `dist` folder is being published
- Check routing configuration

### Database Issues

**Schema Not Initialized**
- Backend auto-initializes on first run
- Check logs for "Database schema initialized"
- If needed, run: `node server/db/init.js`

**Connection Timeout**
- Neon free tier may sleep after inactivity
- First request might be slow (cold start)
- Subsequent requests will be fast

---

## 📊 Render Free Tier Limits

- **Web Services:** 750 hours/month (enough for 1 service 24/7)
- **Static Sites:** Unlimited
- **Bandwidth:** 100 GB/month
- **Build Minutes:** 500 minutes/month
- **Sleep:** Services sleep after 15 min inactivity (free tier)

**Note:** Free tier services sleep when inactive. First request after sleep takes ~30 seconds.

---

## 🚀 Post-Deployment

### 1. Update Frontend API URL

If you deployed backend first, update frontend:
```bash
# In Render Dashboard → guardwallet-frontend → Environment
VITE_API_URL = https://your-actual-backend-url.onrender.com/api
```

Then redeploy frontend (Manual Deploy → Clear build cache & deploy)

### 2. Test Complete Flow

1. Visit frontend URL
2. Click "Try Prototype"
3. Select a profile (Rahul - High Risk)
4. Check if data loads
5. Try adding transactions
6. Test suggestions feature

### 3. Seed Sample Data (Optional)

```bash
# SSH into backend service or use Render Shell
node server/db/seed.js
```

Or create users via API:
```bash
curl -X POST https://your-backend.onrender.com/api/users/rahul/state \
  -H "Content-Type: application/json" \
  -d '{"name":"Rahul","riskLevel":"High","vasooliScore":85}'
```

---

## 🔐 Security Checklist

- ✅ DATABASE_URL is in environment variables (not in code)
- ✅ GEMINI_API_KEY is in environment variables
- ✅ .env file is in .gitignore
- ✅ CORS is configured for your frontend domain
- ✅ SSL/TLS enabled (Render provides free HTTPS)

---

## 📈 Monitoring

### Render Dashboard
- View logs in real-time
- Monitor CPU/Memory usage
- Check deployment history
- View metrics

### Health Check
Set up monitoring:
```bash
# Use a service like UptimeRobot to ping:
https://guardwallet-backend.onrender.com/health
```

---

## 🔄 Updates & Redeployment

### Auto-Deploy (Recommended)
- Push to GitHub main branch
- Render auto-deploys
- Takes 2-5 minutes

### Manual Deploy
- Render Dashboard → Service
- Click "Manual Deploy"
- Select branch
- Click "Deploy"

### Rollback
- Render Dashboard → Service → Events
- Find previous deployment
- Click "Rollback"

---

## 💰 Cost Optimization

### Free Tier Strategy
1. Use 1 backend service (750 hours covers 24/7)
2. Use static site for frontend (unlimited)
3. Use Neon free tier for database
4. Total cost: **$0/month** ✅

### Upgrade When Needed
- Backend: $7/month (no sleep, more resources)
- Database: Neon Pro $19/month (more storage)
- Only upgrade when you have users!

---

## 🎉 Success Checklist

- [ ] Code pushed to GitHub
- [ ] Backend deployed on Render
- [ ] Frontend deployed on Render
- [ ] Environment variables set
- [ ] Database connected
- [ ] Health check passing
- [ ] Frontend loads correctly
- [ ] API calls working
- [ ] Suggestions feature working
- [ ] Sample data added

---

## 📞 Support

### Render Issues
- Render Docs: https://render.com/docs
- Render Community: https://community.render.com
- Status: https://status.render.com

### GuardWallet Issues
- Check logs in Render Dashboard
- Review error messages
- Test locally first
- Check environment variables

---

## 🎯 Quick Deploy Commands

```bash
# 1. Prepare for deployment
git add .
git commit -m "Deploy to Render"
git push origin main

# 2. Go to Render
# https://render.com → New Blueprint → Connect Repo

# 3. Set environment variables in Render Dashboard

# 4. Wait for deployment

# 5. Test
curl https://your-backend.onrender.com/health
```

---

## ✅ Your URLs

After deployment, you'll have:

- **Frontend:** `https://guardwallet-frontend.onrender.com`
- **Backend:** `https://guardwallet-backend.onrender.com`
- **API:** `https://guardwallet-backend.onrender.com/api`
- **Health:** `https://guardwallet-backend.onrender.com/health`

**Save these URLs!** You'll need them for testing and sharing.

---

## 🚀 You're Ready!

Follow the steps above and your GuardWallet app will be live on Render in ~10 minutes!

**Good luck with your deployment!** 🎉
