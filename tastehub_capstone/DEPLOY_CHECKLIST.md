# ✅ Render Deployment Checklist

## Pre-Deployment

### 1. Code Ready
- [x] Backend with PostgreSQL complete
- [x] Frontend React app complete
- [x] Suggestions feature implemented
- [x] All APIs tested locally
- [x] Environment variables documented

### 2. Files Check
- [x] `render.yaml` created
- [x] `.gitignore` includes `.env`
- [x] `package.json` has correct scripts
- [x] `.env.example` documented
- [x] README updated

### 3. Environment Variables Prepared
```
DATABASE_URL=postgresql://neondb_owner:npg_C9bpXIrjc5BF@ep-super-pond-a1xzjgw0-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require

GEMINI_API_KEY=your_key_here

NODE_ENV=production
```

---

## Deployment Steps

### Step 1: Push to GitHub ⏳

```bash
# Add all files
git add .

# Commit
git commit -m "Ready for Render deployment with PostgreSQL and AI suggestions"

# Push to main branch
git push origin main
```

**Status:** ⏳ Waiting for you to run these commands

---

### Step 2: Deploy Backend on Render ⏳

1. Go to https://render.com/dashboard
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure:
   ```
   Name: guardwallet-backend
   Region: Singapore
   Branch: main
   Build Command: npm install
   Start Command: npm start
   ```

5. Add Environment Variables:
   - `DATABASE_URL`: (your Neon URL)
   - `GEMINI_API_KEY`: (your Gemini key)
   - `NODE_ENV`: production

6. Click **"Create Web Service"**
7. Wait 5-10 minutes for deployment
8. **Save your backend URL:** `https://guardwallet-backend-XXXX.onrender.com`

**Status:** ⏳ Waiting for deployment

---

### Step 3: Deploy Frontend on Render ⏳

1. Go to https://render.com/dashboard
2. Click **"New +"** → **"Static Site"**
3. Connect same GitHub repository
4. Configure:
   ```
   Name: guardwallet-frontend
   Region: Singapore
   Branch: main
   Build Command: npm install && npm run build
   Publish Directory: dist
   ```

5. Add Environment Variable:
   - `VITE_API_URL`: `https://your-backend-url.onrender.com/api`
   (Use the URL from Step 2)

6. Click **"Create Static Site"**
7. Wait 3-5 minutes for build
8. **Save your frontend URL:** `https://guardwallet-frontend-XXXX.onrender.com`

**Status:** ⏳ Waiting for deployment

---

## Post-Deployment Testing

### Test 1: Backend Health Check ⏳

```bash
curl https://your-backend-url.onrender.com/health
```

**Expected Response:**
```json
{
  "status": "ok",
  "message": "GuardWallet API is running",
  "database": "connected"
}
```

**Status:** ⏳ Pending

---

### Test 2: Create Test User ⏳

```bash
curl -X POST https://your-backend-url.onrender.com/api/users/test/state \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","riskLevel":"Medium","realBalance":5000,"safeBalance":3000,"vasooliScore":50}'
```

**Expected:** User created successfully

**Status:** ⏳ Pending

---

### Test 3: Add Transaction ⏳

```bash
curl -X POST https://your-backend-url.onrender.com/api/transactions/test \
  -H "Content-Type: application/json" \
  -d '{"desc":"Test Transaction","amount":100,"type":"expense","status":"Approved"}'
```

**Expected:** Transaction added

**Status:** ⏳ Pending

---

### Test 4: Get Suggestions ⏳

```bash
curl -X POST https://your-backend-url.onrender.com/api/suggestions/test/analyze
```

**Expected:** Hinglish suggestions returned

**Status:** ⏳ Pending

---

### Test 5: Frontend Access ⏳

1. Open `https://your-frontend-url.onrender.com` in browser
2. Should see GuardWallet landing page
3. Click "Try Prototype"
4. Select a profile
5. Check if data loads from backend

**Status:** ⏳ Pending

---

## Troubleshooting

### If Backend Fails

**Check Logs:**
- Render Dashboard → guardwallet-backend → Logs

**Common Issues:**
- Database connection: Verify DATABASE_URL
- Missing dependencies: Check package.json
- Port issues: Render auto-assigns (we handle this)

**Fix:**
```bash
# Redeploy
Render Dashboard → Manual Deploy → Clear build cache & deploy
```

---

### If Frontend Fails

**Check Logs:**
- Render Dashboard → guardwallet-frontend → Logs

**Common Issues:**
- API URL wrong: Check VITE_API_URL
- Build errors: Run `npm run build` locally first
- CORS issues: Backend already configured

**Fix:**
```bash
# Update environment variable
Render Dashboard → Environment → Update VITE_API_URL

# Redeploy
Manual Deploy → Clear build cache & deploy
```

---

### If Database Connection Fails

**Check:**
1. DATABASE_URL is correct
2. Neon database is active
3. SSL mode is enabled

**Test Connection:**
```bash
psql 'postgresql://neondb_owner:npg_C9bpXIrjc5BF@ep-super-pond-a1xzjgw0-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require'
```

---

## Final Checklist

- [ ] Code pushed to GitHub
- [ ] Backend deployed on Render
- [ ] Frontend deployed on Render
- [ ] Environment variables set
- [ ] Health check passing
- [ ] Test user created
- [ ] Transactions working
- [ ] Suggestions API working
- [ ] Frontend loads correctly
- [ ] Frontend connects to backend

---

## Your Deployment URLs

Fill these in after deployment:

```
Frontend: https://guardwallet-frontend-_____.onrender.com
Backend:  https://guardwallet-backend-_____.onrender.com
API:      https://guardwallet-backend-_____.onrender.com/api
Health:   https://guardwallet-backend-_____.onrender.com/health
```

---

## Next Steps After Deployment

1. **Share URLs** with your team/judges
2. **Monitor** via Render Dashboard
3. **Seed sample data** (optional):
   ```bash
   # Create sample users via API
   curl -X POST https://your-backend/api/users/rahul/state -H "Content-Type: application/json" -d '{"name":"Rahul","riskLevel":"High","vasooliScore":85}'
   ```

4. **Set up monitoring** (optional):
   - Use UptimeRobot to ping health endpoint
   - Prevents free tier sleep

5. **Update documentation** with live URLs

---

## 🎉 Success!

Once all checkboxes are ✅, your GuardWallet app is live on Render!

**Time to deploy:** ~15-20 minutes total

**Cost:** $0/month (free tier)

**Ready to go!** 🚀
