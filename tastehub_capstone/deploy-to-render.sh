#!/bin/bash

echo "🚀 GuardWallet - Render Deployment Helper"
echo "=========================================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo -e "${RED}❌ Git not initialized!${NC}"
    echo "Run: git init"
    exit 1
fi

echo -e "${GREEN}✅ Git repository found${NC}"
echo ""

# Check for uncommitted changes
if [[ -n $(git status -s) ]]; then
    echo -e "${YELLOW}⚠️  You have uncommitted changes${NC}"
    echo ""
    git status -s
    echo ""
    read -p "Do you want to commit these changes? (y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo ""
        read -p "Enter commit message: " commit_msg
        git add .
        git commit -m "$commit_msg"
        echo -e "${GREEN}✅ Changes committed${NC}"
    fi
fi

echo ""
echo "📋 Pre-Deployment Checklist:"
echo ""

# Check for required files
files=("render.yaml" "package.json" ".gitignore" ".env.example")
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✅${NC} $file exists"
    else
        echo -e "${RED}❌${NC} $file missing"
    fi
done

echo ""
echo "🔐 Environment Variables Needed:"
echo ""
echo "For Backend (guardwallet-backend):"
echo "  - DATABASE_URL (your Neon PostgreSQL URL)"
echo "  - GEMINI_API_KEY (your Google Gemini API key)"
echo "  - NODE_ENV=production"
echo ""
echo "For Frontend (guardwallet-frontend):"
echo "  - VITE_API_URL (your backend URL + /api)"
echo ""

read -p "Have you prepared these environment variables? (y/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}⚠️  Please prepare environment variables first${NC}"
    echo "See .env.example for reference"
    exit 1
fi

echo ""
echo "🌐 Checking remote repository..."

# Check if remote exists
if git remote | grep -q 'origin'; then
    remote_url=$(git remote get-url origin)
    echo -e "${GREEN}✅ Remote repository: $remote_url${NC}"
else
    echo -e "${RED}❌ No remote repository found${NC}"
    echo ""
    echo "Add your GitHub repository:"
    echo "  git remote add origin https://github.com/yourusername/your-repo.git"
    exit 1
fi

echo ""
read -p "Push to GitHub now? (y/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo "📤 Pushing to GitHub..."
    
    # Get current branch
    branch=$(git rev-parse --abbrev-ref HEAD)
    
    git push origin $branch
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Successfully pushed to GitHub!${NC}"
    else
        echo -e "${RED}❌ Push failed${NC}"
        exit 1
    fi
fi

echo ""
echo "=========================================="
echo -e "${GREEN}✅ Ready for Render Deployment!${NC}"
echo "=========================================="
echo ""
echo "📝 Next Steps:"
echo ""
echo "1. Go to https://render.com/dashboard"
echo ""
echo "2. Deploy Backend:"
echo "   - Click 'New +' → 'Web Service'"
echo "   - Connect your GitHub repo"
echo "   - Name: guardwallet-backend"
echo "   - Build: npm install"
echo "   - Start: npm start"
echo "   - Add environment variables (DATABASE_URL, GEMINI_API_KEY)"
echo ""
echo "3. Deploy Frontend:"
echo "   - Click 'New +' → 'Static Site'"
echo "   - Connect same repo"
echo "   - Name: guardwallet-frontend"
echo "   - Build: npm install && npm run build"
echo "   - Publish: dist"
echo "   - Add VITE_API_URL (your backend URL + /api)"
echo ""
echo "4. Test deployment:"
echo "   curl https://your-backend.onrender.com/health"
echo ""
echo "📖 Full guide: See RENDER_DEPLOYMENT.md"
echo ""
echo "🎉 Good luck with your deployment!"
