# ⚡ Quick Deployment Guide

## 🎯 Fastest Way to Deploy (15 minutes)

### Option 1: Render (Recommended for Capstone)

#### Step 1: Prepare Code (2 min)
```bash
./prepare-deployment.sh
git add .
git commit -m "Ready for deployment"
git push origin main
```

#### Step 2: Deploy Backend (5 min)
1. Go to https://render.com
2. Sign up with GitHub
3. Click "New +" → "Web Service"
4. Select your repository
5. Configure:
   - Name: `arena-backend`
   - Root Directory: `backend`
   - Build: `npm install && npx prisma generate`
   - Start: `node app.js`
6. Add environment variables:
   ```
   DATABASE_URL=<your_mysql_url>
   JWT_SECRET=<random_32_char_string>
   ```
7. Click "Create Web Service"

#### Step 3: Setup Database (3 min)
1. Click "New +" → "MySQL"
2. Name: `arena-db`
3. Copy Internal Database URL
4. Update backend `DATABASE_URL` env var
5. Open Shell in backend service:
   ```bash
   npx prisma db push
   node create-admin.js
   ```

#### Step 4: Deploy Frontend (5 min)
1. Update API URL in frontend code:
   ```javascript
   // Find and replace all:
   http://localhost:3030
   // With:
   https://arena-backend.onrender.com
   ```
2. Commit changes
3. Click "New +" → "Static Site"
4. Configure:
   - Root Directory: `frontend`
   - Build: `npm install && npm run build`
   - Publish: `dist`
5. Click "Create Static Site"

#### Step 5: Test (2 min)
1. Visit your frontend URL
2. Login as admin
3. Create a problem
4. Test submission

✅ **Done! Your app is live!**

---

## 🔵 Option 2: Railway (Alternative)

```bash
# 1. Install Railway CLI
npm install -g @railway/cli

# 2. Login
railway login

# 3. Initialize project
railway init

# 4. Add MySQL
railway add

# 5. Deploy
railway up
```

---

## 🟣 Option 3: Vercel (Frontend Only)

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Build frontend
cd frontend
npm run build

# 3. Deploy
vercel --prod
```

(Deploy backend separately on Render/Railway)

---

## 📝 Quick Checklist

Before deployment:
- [ ] Code pushed to GitHub
- [ ] `.env` configured
- [ ] Database ready
- [ ] Admin password changed
- [ ] API URLs updated

After deployment:
- [ ] Test login
- [ ] Test problem creation
- [ ] Test code submission
- [ ] Check logs for errors

---

## 🆘 Quick Fixes

### Backend won't start:
```bash
# Check logs in Render dashboard
# Verify DATABASE_URL is correct
# Ensure Prisma is generated
```

### Frontend shows errors:
```bash
# Check API URL is correct
# Verify CORS is configured
# Check browser console
```

### Database connection failed:
```bash
# Verify DATABASE_URL format:
# mysql://user:pass@host:port/db
```

---

## 🎓 For Capstone Demo

**Recommended Setup:**
- **Backend**: Render Web Service (Free)
- **Database**: Render MySQL (Free)
- **Frontend**: Render Static Site (Free)

**Total Cost**: $0/month
**Setup Time**: 15 minutes
**Demo Ready**: ✅

---

## 📚 Full Guide

For detailed instructions, see **DEPLOYMENT_GUIDE.md**

---

**Need help? Check the troubleshooting section in DEPLOYMENT_GUIDE.md**
