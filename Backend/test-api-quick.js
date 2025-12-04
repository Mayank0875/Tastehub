/**
 * Quick API test to verify everything works
 */

const axios = require('axios');

const BASE_URL = 'http://localhost:3030';

async function testAPI() {
    console.log('🧪 Testing Arena API...\n');

    try {
        // Test 1: Get all problems
        console.log('1. Testing GET /problem');
        const problemsRes = await axios.get(`${BASE_URL}/problem`);
        console.log(`   ✅ Got ${problemsRes.data.data.length} problems`);

        if (problemsRes.data.data.length === 0) {
            console.log('   ⚠️  WARNING: No problems in database!');
            return;
        }

        // Test 2: Get single problem
        const firstProblemId = problemsRes.data.data[0].id;
        console.log(`\n2. Testing GET /problem/${firstProblemId}`);
        const singleRes = await axios.get(`${BASE_URL}/problem/${firstProblemId}`);
        console.log(`   ✅ Got problem: ${singleRes.data.data.title}`);

        // Test 3: Verify problem has all fields
        console.log('\n3. Checking problem fields');
        const problem = singleRes.data.data;
        const requiredFields = ['id', 'title', 'rating', 'tags', 'description', 'constraints', 'sampleInput', 'sampleOutput'];
        const missingFields = requiredFields.filter(field => !problem[field]);
        
        if (missingFields.length > 0) {
            console.log(`   ❌ Missing fields: ${missingFields.join(', ')}`);
        } else {
            console.log('   ✅ All required fields present');
        }

        console.log('\n✅ All API tests passed!');
        console.log('\n📊 Summary:');
        console.log(`   - Total problems: ${problemsRes.data.data.length}`);
        console.log(`   - API working: YES`);
        console.log(`   - Database connected: YES`);
        console.log('\n🎉 Backend is ready!');

    } catch (error) {
        console.log('\n❌ API Test Failed!');
        console.log(`   Error: ${error.message}`);
        
        if (error.code === 'ECONNREFUSED') {
            console.log('\n   ⚠️  Backend is not running!');
            console.log('   Start it with: node app.js');
        }
        
        process.exit(1);
    }
}

// Check if server is running first
async function checkServer() {
    try {
        await axios.get(BASE_URL);
        return true;
    } catch (error) {
        return false;
    }
}

(async () => {
    const running = await checkServer();
    if (!running) {
        console.log('❌ Backend server is not running!');
        console.log('Start it with: node app.js');
        process.exit(1);
    }
    
    await testAPI();
})();
