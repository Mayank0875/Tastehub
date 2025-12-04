/**
 * Simple API test script
 * @fileoverview Tests the main API endpoints
 */

const axios = require('axios');

const BASE_URL = 'http://localhost:3030';

async function testAPI() {
    try {
        console.log('🧪 Testing API endpoints...\n');

        // Test 1: Health check
        console.log('1. Testing health check...');
        const healthResponse = await axios.get(`${BASE_URL}/`);
        console.log('✅ Health check:', healthResponse.data);

        // Test 2: Get problems (public endpoint)
        console.log('\n2. Testing get problems...');
        const problemsResponse = await axios.get(`${BASE_URL}/problem`);
        console.log('✅ Problems endpoint:', problemsResponse.data.success ? 'Working' : 'Failed');

        // Test 3: User registration
        console.log('\n3. Testing user registration...');
        const registerData = {
            username: 'testuser' + Date.now(),
            email: 'test' + Date.now() + '@example.com',
            password: 'password123'
        };
        
        const registerResponse = await axios.post(`${BASE_URL}/auth/register`, registerData);
        console.log('✅ Registration:', registerResponse.data.success ? 'Working' : 'Failed');

        // Test 4: User login
        console.log('\n4. Testing user login...');
        const loginResponse = await axios.post(`${BASE_URL}/auth/login`, {
            username: registerData.username,
            password: registerData.password
        });
        
        if (loginResponse.data.success) {
            console.log('✅ Login: Working');
            const token = loginResponse.data.data.token;
            
            // Test 5: Get profile (authenticated endpoint)
            console.log('\n5. Testing authenticated profile endpoint...');
            const profileResponse = await axios.get(`${BASE_URL}/auth/profile`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log('✅ Profile endpoint:', profileResponse.data.success ? 'Working' : 'Failed');
        } else {
            console.log('❌ Login: Failed');
        }

        // Test 6: Admin login
        console.log('\n6. Testing admin login...');
        const adminLoginResponse = await axios.post(`${BASE_URL}/auth/login`, {
            username: 'admin',
            password: 'admin123'
        });
        
        if (adminLoginResponse.data.success) {
            console.log('✅ Admin login: Working');
            const adminToken = adminLoginResponse.data.data.token;
            
            // Test 7: Admin stats endpoint
            console.log('\n7. Testing admin stats endpoint...');
            const statsResponse = await axios.get(`${BASE_URL}/admin/stats`, {
                headers: { Authorization: `Bearer ${adminToken}` }
            });
            console.log('✅ Admin stats:', statsResponse.data.success ? 'Working' : 'Failed');
        } else {
            console.log('❌ Admin login: Failed');
        }

        console.log('\n🎉 API testing completed!');

    } catch (error) {
        console.error('❌ API test failed:', error.response?.data || error.message);
    }
}

// Run tests if server is available
testAPI();
