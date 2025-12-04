#!/bin/bash

# Arena Capstone Project - Quick Setup Script
# This script automates the setup process for evaluation

echo "🚀 Arena Capstone Project - Quick Setup"
echo "========================================"
echo ""

# Check if we're in the right directory
if [ ! -d "backend" ]; then
    echo "❌ Error: backend directory not found!"
    echo "Please run this script from the project root directory."
    exit 1
fi

# Navigate to backend
cd backend

echo "📦 Step 1: Installing dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi
echo "✅ Dependencies installed"
echo ""

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "⚠️  .env file not found. Creating template..."
    cat > .env << EOF
DATABASE_URL="mysql://root:password@localhost:3306/Online_Judge"
JWT_SECRET="arena-secret-key-change-in-production"
PORT=3030
EOF
    echo "✅ .env file created"
    echo "⚠️  Please update DATABASE_URL with your MySQL credentials"
    echo ""
    read -p "Press Enter after updating .env file..."
fi

echo "🗄️  Step 2: Setting up database..."
npx prisma db push
if [ $? -ne 0 ]; then
    echo "❌ Failed to setup database"
    echo "Please check your DATABASE_URL in .env file"
    exit 1
fi
echo "✅ Database schema created"
echo ""

echo "🔧 Step 3: Generating Prisma client..."
npx prisma generate
if [ $? -ne 0 ]; then
    echo "❌ Failed to generate Prisma client"
    exit 1
fi
echo "✅ Prisma client generated"
echo ""

echo "👨‍💼 Step 4: Creating admin user..."
node create-admin.js
echo ""

echo "✅ Setup Complete!"
echo ""
echo "📋 Next Steps:"
echo "1. Start the server: cd backend && node app.js"
echo "2. Run tests: cd backend && node test-capstone.js"
echo "3. Or use Postman: Import Arena_Postman_Collection.json"
echo ""
echo "📚 Documentation:"
echo "- Demo Guide: DEMO_GUIDE.md"
echo "- API Docs: API_DOCUMENTATION.md"
echo "- Quick Ref: QUICK_REFERENCE.md"
echo ""
echo "🎓 Default Admin Credentials:"
echo "   Username: admin"
echo "   Password: admin123"
echo ""
echo "🌐 Server will run on: http://localhost:3030"
echo ""
echo "Ready for evaluation! 🎉"
