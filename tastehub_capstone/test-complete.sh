#!/bin/bash

echo "🧪 Testing GuardWallet Suggestions Feature"
echo ""

# Kill any existing processes
pkill -f "node server/index.js" 2>/dev/null
sleep 2

# Start server on port 3005
echo "1️⃣  Starting server on port 3005..."
PORT=3005 node server/index.js &
SERVER_PID=$!
sleep 5

# Test health
echo ""
echo "2️⃣  Testing health endpoint..."
curl -s http://localhost:3005/health | jq '.'

# Create user
echo ""
echo "3️⃣  Creating test user Rahul..."
curl -s -X POST http://localhost:3005/api/users/rahul/state \
  -H "Content-Type: application/json" \
  -d '{"name":"Rahul","riskLevel":"High","incomeSource":"Uber Driver","realBalance":1200,"safeBalance":420,"vasooliScore":85,"rentSecured":45,"agentMode":"Vasooli","lockRate":0.35}' | jq '.'

# Add transactions
echo ""
echo "4️⃣  Adding transactions..."
curl -s -X POST http://localhost:3005/api/transactions/rahul \
  -H "Content-Type: application/json" \
  -d '{"desc":"Uber Payout","amount":3000,"type":"income","status":"Locked (35%)"}' > /dev/null

curl -s -X POST http://localhost:3005/api/transactions/rahul \
  -H "Content-Type: application/json" \
  -d '{"desc":"Late Night Biryani","amount":350,"type":"expense","status":"Approved"}' > /dev/null

curl -s -X POST http://localhost:3005/api/transactions/rahul \
  -H "Content-Type: application/json" \
  -d '{"desc":"PVR Movie Night","amount":600,"type":"expense","status":"BLOCKED"}' > /dev/null

curl -s -X POST http://localhost:3005/api/transactions/rahul \
  -H "Content-Type: application/json" \
  -d '{"desc":"Tapri Chai & Sutta","amount":150,"type":"expense","status":"Approved"}' > /dev/null

echo "✅ Transactions added"

# Test suggestions
echo ""
echo "5️⃣  Testing suggestions API..."
echo ""
curl -s -X POST http://localhost:3005/api/suggestions/rahul/analyze | jq '.'

# Test quick actions
echo ""
echo "6️⃣  Testing quick actions..."
echo ""
curl -s http://localhost:3005/api/suggestions/rahul/quick-actions | jq '.'

# Cleanup
echo ""
echo "7️⃣  Cleaning up..."
kill $SERVER_PID 2>/dev/null

echo ""
echo "✅ Test complete!"
echo ""
echo "To use in your app:"
echo "  - Server runs on port 3001 (or set PORT env var)"
echo "  - API: POST /api/suggestions/:userId/analyze"
echo "  - API: GET /api/suggestions/:userId/quick-actions"
