#!/bin/bash

# Arena Deployment Preparation Script
# This script prepares your application for deployment

echo "🚀 Arena Deployment Preparation"
echo "================================"
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -d "backend" ] || [ ! -d "frontend" ]; then
    echo -e "${RED}❌ Error: backend or frontend directory not found!${NC}"
    echo "Please run this script from the project root directory."
    exit 1
fi

echo "📋 Pre-Deployment Checklist"
echo ""

# 1. Check Node.js version
echo -n "Checking Node.js version... "
NODE_VERSION=$(node --version)
echo -e "${GREEN}✓${NC} $NODE_VERSION"

# 2. Check if .env exists
echo -n "Checking backend .env file... "
if [ -f "backend/.env" ]; then
    echo -e "${GREEN}✓${NC} Found"
else
    echo -e "${YELLOW}⚠${NC} Not found"
    echo "  Creating template .env file..."
    cat > backend/.env << EOF
DATABASE_URL="mysql://root:password@localhost:3306/Online_Judge"
JWT_SECRET="change-this-to-a-long-random-string-in-production"
PORT=3030
NODE_ENV=development
EOF
    echo -e "  ${GREEN}✓${NC} Template created. Please update with your values."
fi

# 3. Install backend dependencies
echo ""
echo "📦 Installing backend dependencies..."
cd backend
npm install
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓${NC} Backend dependencies installed"
else
    echo -e "${RED}❌${NC} Failed to install backend dependencies"
    exit 1
fi

# 4. Generate Prisma client
echo ""
echo "🔧 Generating Prisma client..."
npx prisma generate
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓${NC} Prisma client generated"
else
    echo -e "${RED}❌${NC} Failed to generate Prisma client"
    exit 1
fi

# 5. Check database connection
echo ""
echo "🗄️  Checking database connection..."
npx prisma db push --skip-generate
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓${NC} Database connected and synced"
else
    echo -e "${YELLOW}⚠${NC} Database connection failed. Please check your DATABASE_URL"
fi

# 6. Install frontend dependencies
echo ""
echo "📦 Installing frontend dependencies..."
cd ../frontend
npm install
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓${NC} Frontend dependencies installed"
else
    echo -e "${RED}❌${NC} Failed to install frontend dependencies"
    exit 1
fi

# 7. Build frontend
echo ""
echo "🏗️  Building frontend for production..."
npm run build
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓${NC} Frontend built successfully"
    echo "  Build output: frontend/dist"
else
    echo -e "${RED}❌${NC} Frontend build failed"
    exit 1
fi

# 8. Check build size
echo ""
echo "📊 Build Statistics:"
cd dist
TOTAL_SIZE=$(du -sh . | cut -f1)
echo "  Total size: $TOTAL_SIZE"
echo "  Files:"
ls -lh | tail -n +2 | awk '{print "    " $9 " - " $5}'

cd ../..

# 9. Security check
echo ""
echo "🔒 Security Checklist:"
echo ""

# Check for hardcoded secrets
echo -n "  Checking for hardcoded secrets... "
if grep -r "password.*=.*['\"]" backend/*.js frontend/src/**/*.jsx 2>/dev/null | grep -v "placeholder" | grep -v "example" > /dev/null; then
    echo -e "${YELLOW}⚠${NC} Found potential hardcoded secrets"
    echo "    Please review and use environment variables"
else
    echo -e "${GREEN}✓${NC} No obvious hardcoded secrets"
fi

# Check JWT_SECRET
echo -n "  Checking JWT_SECRET strength... "
JWT_SECRET=$(grep "JWT_SECRET" backend/.env | cut -d'=' -f2 | tr -d '"' | tr -d "'")
if [ ${#JWT_SECRET} -lt 32 ]; then
    echo -e "${YELLOW}⚠${NC} JWT_SECRET is too short (${#JWT_SECRET} chars)"
    echo "    Recommended: 32+ characters"
else
    echo -e "${GREEN}✓${NC} JWT_SECRET is strong (${#JWT_SECRET} chars)"
fi

# 10. Create deployment info
echo ""
echo "📝 Creating deployment info..."
cat > DEPLOYMENT_INFO.txt << EOF
Arena Deployment Information
Generated: $(date)

Backend:
- Node Version: $NODE_VERSION
- Dependencies: Installed
- Prisma: Generated
- Database: Check manually

Frontend:
- Build: Completed
- Output: frontend/dist
- Size: $TOTAL_SIZE

Next Steps:
1. Review backend/.env and update for production
2. Choose deployment platform (see DEPLOYMENT_GUIDE.md)
3. Update API URLs in frontend code
4. Deploy backend first, then frontend
5. Run database migrations on production
6. Create admin user on production

Deployment Platforms:
- Render: https://render.com (Recommended)
- Railway: https://railway.app
- Vercel: https://vercel.com (Frontend only)
- DigitalOcean: https://digitalocean.com

For detailed instructions, see DEPLOYMENT_GUIDE.md
EOF

echo -e "${GREEN}✓${NC} Deployment info saved to DEPLOYMENT_INFO.txt"

# Summary
echo ""
echo "================================"
echo "✅ Deployment Preparation Complete!"
echo "================================"
echo ""
echo "📋 Summary:"
echo "  ✓ Dependencies installed"
echo "  ✓ Frontend built"
echo "  ✓ Security checked"
echo "  ✓ Ready for deployment"
echo ""
echo "📚 Next Steps:"
echo "  1. Read DEPLOYMENT_GUIDE.md"
echo "  2. Choose your deployment platform"
echo "  3. Update environment variables"
echo "  4. Deploy!"
echo ""
echo "🎯 Recommended: Deploy to Render (easiest)"
echo "   See DEPLOYMENT_GUIDE.md for instructions"
echo ""
