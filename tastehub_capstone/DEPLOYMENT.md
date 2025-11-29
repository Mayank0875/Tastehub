# Deployment Guide for GuardWallet

## Quick Start

### Local Development

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment**
   Create `.env` file:
   ```env
   GEMINI_API_KEY=your_key_here
   PORT=3001
   NODE_ENV=development
   ```

3. **Run development servers**
   ```bash
   npm run dev:all
   ```
   - Frontend: http://localhost:5173
   - Backend: http://localhost:3001

## Production Deployment

### Option 1: Vercel (Recommended)

**Steps:**
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in project root
3. Set environment variables in Vercel dashboard:
   - `GEMINI_API_KEY` (required)
   - `NODE_ENV=production`
4. Deploy: `vercel --prod`

**Note:** Vercel will automatically:
- Build the frontend (`npm run build`)
- Deploy the Express server
- Route `/api/*` to the server
- Serve static files from `/dist`

### Option 2: Railway

**Steps:**
1. Connect GitHub repo to Railway
2. Railway auto-detects Node.js project
3. Set environment variables:
   - `GEMINI_API_KEY` (required)
   - `PORT` (auto-set by Railway)
4. Deploy automatically on push

**Build Command:** `npm run build`  
**Start Command:** `npm start`

### Option 3: Manual Server (VPS/Cloud)

**Steps:**
1. **Build the frontend**
   ```bash
   npm run build
   ```

2. **Set environment variables**
   ```bash
   export GEMINI_API_KEY=your_key
   export NODE_ENV=production
   export PORT=3001
   ```

3. **Start the server**
   ```bash
   npm start
   ```

4. **Use PM2 for process management** (optional)
   ```bash
   npm install -g pm2
   pm2 start server/index.js --name guardwallet
   pm2 save
   pm2 startup
   ```

5. **Set up reverse proxy** (Nginx example)
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location /api {
           proxy_pass http://localhost:3001;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }

       location / {
           root /path/to/tastehub_capstone/dist;
           try_files $uri $uri/ /index.html;
       }
   }
   ```

## Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `GEMINI_API_KEY` | Google Gemini API key | ✅ Yes | - |
| `PORT` | Server port | No | 3001 |
| `NODE_ENV` | Environment | No | development |
| `VITE_API_URL` | Frontend API URL | No | http://localhost:3001/api |

## Health Check

After deployment, verify the server is running:
```bash
curl https://your-domain.com/health
```

Expected response:
```json
{
  "status": "ok",
  "message": "GuardWallet API is running"
}
```

## Troubleshooting

### Backend not responding
- Check `GEMINI_API_KEY` is set correctly
- Verify port is not blocked by firewall
- Check server logs for errors

### Frontend can't connect to API
- Set `VITE_API_URL` environment variable to your backend URL
- Rebuild frontend: `npm run build`
- Check CORS settings in `server/index.js`

### Build fails
- Ensure all dependencies are installed: `npm install`
- Check Node.js version (requires 18+)
- Review build logs for specific errors

## Post-Deployment Checklist

- [ ] Environment variables set correctly
- [ ] Health check endpoint responds
- [ ] Frontend loads correctly
- [ ] API endpoints work (test `/api/financial/generate`)
- [ ] Transactions persist (test adding a transaction)
- [ ] AI generation works (test with a profile)

## Support

For issues, check:
1. Server logs
2. Browser console
3. Network tab for API errors
4. Environment variables

