# 🚀 Arena Deployment Guide

Complete guide to deploy your Arena coding platform to production.

---

## 📋 Pre-Deployment Checklist

### 1. Prepare Your Code
```bash
# Ensure all changes are committed
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2. Environment Variables
Create production `.env` files with secure values.

### 3. Database
Ensure your production database is set up and accessible.

---

## 🎯 Deployment Options

### Option 1: Render (Recommended - Free Tier Available)
### Option 2: Railway (Easy, Free Tier)
### Option 3: Vercel + Railway (Frontend + Backend)
### Option 4: DigitalOcean (Full Control)
### Option 5: AWS (Enterprise)

---

## 🟢 Option 1: Deploy to Render (Recommended)

**Why Render?**
- ✅ Free tier available
- ✅ Easy to use
- ✅ Automatic deployments from Git
- ✅ Built-in database hosting
- ✅ SSL certificates included

### Step 1: Prepare Backend for Render

Create `backend/render.yaml`:
```yaml
services:
  - type: web
    name: arena-backend
    env: node
    buildCommand: npm install && npx prisma generate
    startCommand: node app.js
    envVars:
      - key: DATABASE_URL
        sync: false
      - key: JWT_SECRET
        generateValue: true
      - key: PORT
        value: 3030
```

### Step 2: Deploy Backend

1. **Go to** https://render.com
2. **Sign up** with GitHub
3. **Click** "New +" → "Web Service"
4. **Connect** your repository
5. **Configure:**
   - Name: `arena-backend`
   - Environment: `Node`
   - Build Command: `cd backend && npm install && npx prisma generate`
   - Start Command: `cd backend && node app.js`
   - Instance Type: `Free`

6. **Add Environment Variables:**
   ```
   DATABASE_URL=your_mysql_connection_string
   JWT_SECRET=your_secret_key_here
   PORT=3030
   ```

7. **Click** "Create Web Service"

### Step 3: Set Up Database on Render

1. **Click** "New +" → "MySQL"
2. **Configure:**
   - Name: `arena-db`
   - Database: `arena_production`
   - User: `arena_user`
3. **Copy** the Internal Database URL
4. **Update** backend environment variable `DATABASE_URL`

### Step 4: Deploy Frontend

1. **Build frontend locally:**
   ```bash
   cd frontend
   npm run build
   ```

2. **Update API URL** in frontend code:
   ```javascript
   // Replace all instances of:
   http://localhost:3030
   
   // With your Render backend URL:
   https://arena-backend.onrender.com
   ```

3. **Deploy to Render:**
   - Click "New +" → "Static Site"
   - Connect repository
   - Build Command: `cd frontend && npm install && npm run build`
   - Publish Directory: `frontend/dist`

### Step 5: Run Database Migrations

```bash
# In Render Shell (Backend service)
npx prisma db push
node create-admin.js
```

---

## 🔵 Option 2: Deploy to Railway

**Why Railway?**
- ✅ Very easy setup
- ✅ Free $5 credit monthly
- ✅ One-click database
- ✅ Automatic HTTPS

### Step 1: Deploy Backend

1. **Go to** https://railway.app
2. **Sign up** with GitHub
3. **Click** "New Project" → "Deploy from GitHub repo"
4. **Select** your repository
5. **Add** MySQL database (click "New" → "Database" → "MySQL")
6. **Configure** backend service:
   - Root Directory: `backend`
   - Build Command: `npm install && npx prisma generate`
   - Start Command: `node app.js`

7. **Add Environment Variables:**
   ```
   DATABASE_URL=${{MySQL.DATABASE_URL}}
   JWT_SECRET=your_secret_key
   PORT=3030
   ```

### Step 2: Deploy Frontend

1. **Click** "New" → "GitHub Repo"
2. **Configure:**
   - Root Directory: `frontend`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm run preview`

3. **Update** API URLs in frontend code

---

## 🟣 Option 3: Vercel + Railway

**Best for:** Separate frontend/backend hosting

### Backend on Railway (see Option 2)

### Frontend on Vercel

1. **Go to** https://vercel.com
2. **Import** your repository
3. **Configure:**
   - Framework: Vite
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`

4. **Add Environment Variable:**
   ```
   VITE_API_URL=https://your-railway-backend.up.railway.app
   ```

5. **Update** frontend code to use `import.meta.env.VITE_API_URL`

---

## 🔴 Option 4: DigitalOcean Droplet

**Best for:** Full control, custom setup

### Step 1: Create Droplet

1. **Go to** https://digitalocean.com
2. **Create** Droplet (Ubuntu 22.04)
3. **Choose** $6/month plan
4. **SSH** into server

### Step 2: Install Dependencies

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install MySQL
sudo apt install -y mysql-server

# Install Nginx
sudo apt install -y nginx

# Install PM2
sudo npm install -g pm2
```

### Step 3: Setup MySQL

```bash
sudo mysql_secure_installation

# Create database
sudo mysql -u root -p
CREATE DATABASE arena_production;
CREATE USER 'arena_user'@'localhost' IDENTIFIED BY 'strong_password';
GRANT ALL PRIVILEGES ON arena_production.* TO 'arena_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### Step 4: Deploy Application

```bash
# Clone repository
cd /var/www
sudo git clone https://github.com/yourusername/arena.git
cd arena

# Setup backend
cd backend
npm install
npx prisma generate
npx prisma db push
node create-admin.js

# Start with PM2
pm2 start app.js --name arena-backend
pm2 save
pm2 startup

# Build frontend
cd ../frontend
npm install
npm run build
```

### Step 5: Configure Nginx

```bash
sudo nano /etc/nginx/sites-available/arena
```

```nginx
server {
    listen 80;
    server_name your-domain.com;

    # Frontend
    location / {
        root /var/www/arena/frontend/dist;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:3030;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/arena /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Step 6: Setup SSL (Let's Encrypt)

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

---

## ☁️ Option 5: AWS (Enterprise)

### Services Needed:
- **EC2** - Application server
- **RDS** - MySQL database
- **S3** - Static file hosting
- **CloudFront** - CDN
- **Route 53** - DNS

### Quick Setup:

1. **RDS MySQL:**
   - Create MySQL instance
   - Note connection string

2. **EC2 Instance:**
   - Launch Ubuntu instance
   - Follow DigitalOcean steps above

3. **S3 + CloudFront:**
   - Create S3 bucket
   - Upload frontend build
   - Create CloudFront distribution

---

## 🔧 Production Configuration

### Backend `.env` (Production)

```env
# Database
DATABASE_URL="mysql://user:password@host:3306/database"

# JWT
JWT_SECRET="use-a-very-long-random-string-here"

# Server
PORT=3030
NODE_ENV=production

# CORS (update with your frontend URL)
FRONTEND_URL="https://your-frontend-domain.com"
```

### Frontend Environment

Update all API calls from:
```javascript
http://localhost:3030
```

To:
```javascript
https://your-backend-domain.com
```

Or use environment variables:
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3030';
```

---

## 🔒 Security Checklist

### Before Deployment:

- [ ] Change default admin password
- [ ] Use strong JWT_SECRET (32+ characters)
- [ ] Enable HTTPS/SSL
- [ ] Set up CORS properly
- [ ] Use environment variables (never commit secrets)
- [ ] Enable rate limiting
- [ ] Set up database backups
- [ ] Configure firewall rules
- [ ] Update all default credentials
- [ ] Remove console.logs from production code

### Update CORS in `backend/app.js`:

```javascript
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}));
```

---

## 📊 Post-Deployment

### 1. Test Everything

```bash
# Test backend
curl https://your-backend.com/

# Test API
curl https://your-backend.com/problem

# Test frontend
open https://your-frontend.com
```

### 2. Monitor Application

**Render/Railway:**
- Check logs in dashboard
- Monitor resource usage

**DigitalOcean/AWS:**
```bash
# View PM2 logs
pm2 logs arena-backend

# Monitor resources
htop
```

### 3. Set Up Monitoring

**Options:**
- **Sentry** - Error tracking
- **LogRocket** - Session replay
- **UptimeRobot** - Uptime monitoring
- **Google Analytics** - User analytics

---

## 🔄 Continuous Deployment

### GitHub Actions (Automatic Deployment)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Deploy to Render
      run: |
        curl -X POST ${{ secrets.RENDER_DEPLOY_HOOK }}
```

---

## 💰 Cost Comparison

| Platform | Free Tier | Paid Plan | Best For |
|----------|-----------|-----------|----------|
| **Render** | ✅ 750hrs/month | $7/month | Beginners |
| **Railway** | $5 credit/month | $5/month | Easy setup |
| **Vercel** | ✅ Unlimited | $20/month | Frontend |
| **DigitalOcean** | ❌ | $6/month | Full control |
| **AWS** | ✅ 12 months | Variable | Enterprise |

---

## 🐛 Common Deployment Issues

### Issue: Database Connection Failed
```bash
# Check DATABASE_URL format
mysql://username:password@host:port/database

# Test connection
mysql -h host -u username -p
```

### Issue: Build Failed
```bash
# Clear cache
rm -rf node_modules package-lock.json
npm install

# Check Node version
node --version  # Should be 16+
```

### Issue: CORS Error
```javascript
// Update backend CORS
app.use(cors({
    origin: 'https://your-frontend-domain.com'
}));
```

### Issue: 404 on Refresh
```nginx
# Add to nginx config
try_files $uri $uri/ /index.html;
```

---

## 📝 Deployment Checklist

### Pre-Deployment:
- [ ] All tests passing
- [ ] Code committed to Git
- [ ] Environment variables documented
- [ ] Database schema finalized
- [ ] Admin user created

### Deployment:
- [ ] Backend deployed
- [ ] Database created and migrated
- [ ] Frontend deployed
- [ ] Environment variables set
- [ ] CORS configured

### Post-Deployment:
- [ ] Test all features
- [ ] Check logs for errors
- [ ] Monitor performance
- [ ] Set up backups
- [ ] Document deployment process

---

## 🎯 Recommended: Quick Start with Render

**Fastest way to deploy (15 minutes):**

1. **Push code to GitHub**
2. **Sign up on Render.com**
3. **Create MySQL database**
4. **Deploy backend** (connect GitHub repo)
5. **Deploy frontend** (static site)
6. **Run migrations** in Render shell
7. **Test and enjoy!**

---

## 📚 Additional Resources

- **Render Docs:** https://render.com/docs
- **Railway Docs:** https://docs.railway.app
- **Vercel Docs:** https://vercel.com/docs
- **DigitalOcean Tutorials:** https://www.digitalocean.com/community/tutorials
- **AWS Getting Started:** https://aws.amazon.com/getting-started/

---

## 🎉 You're Ready to Deploy!

Choose your platform and follow the guide above. For capstone/demo purposes, **Render** is the easiest option.

**Good luck with your deployment!** 🚀
