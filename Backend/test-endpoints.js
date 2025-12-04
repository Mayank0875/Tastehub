/**
 * API Endpoints Test Script
 * @fileoverview Tests all API endpoints for functionality
 */

const { PrismaClient } = require('@prisma/client');
const axios = require('axios');

const prisma = new PrismaClient();
const BASE_URL = 'http://localhost:3030';

async function testEndpoints() {
    console.log('🧪 Testing API Endpoints...\n');
    
    try {
        // Start server in background
        console.log('🚀 Starting server...');
        const { spawn } = require('child_process');
        const server = spawn('node', ['app.js'], { 
            cwd: process.cwd(),
            stdio: 'pipe'
        });

        // Wait for server to start
        await new Promise(resolve => setTimeout(resolve, 3000));

        // Test 1: Health check
        console.log('1. Testing health endpoint...');
        try {
            const response = await axios.get(`${BASE_URL}/`);
            console.log('✅ Health check:', response.data);
        } catch (error) {
            console.log('❌ Health check failed:', error.message);
        }

        // Test 2: Get problems
        console.log('\n2. Testing problems endpoint...');
        try {
            const response = await axios.get(`${BASE_URL}/problem`);
            console.log('✅ Problems endpoint:', response.data.success ? 'Working' : 'Failed');
            console.log('   Problems found:', response.data.data?.length || 0);
        } catch (error) {
            console.log('❌ Problems endpoint failed:', error.response?.data || error.message);
        }

        // Test 3: Get specific problem
        console.log('\n3. Testing specific problem endpoint...');
        try {
            const response = await axios.get(`${BASE_URL}/problem/1`);
            console.log('✅ Specific problem endpoint:', response.data.success ? 'Working' : 'Failed');
            if (response.data.success) {
                console.log('   Problem title:', response.data.data?.title || 'N/A');
            }
        } catch (error) {
            console.log('❌ Specific problem endpoint failed:', error.response?.data || error.message);
        }

        // Test 4: User registration
        console.log('\n4. Testing user registration...');
        const testUser = {
            username: 'testuser' + Date.now(),
            email: 'test' + Date.now() + '@example.com',
            password: 'password123'
        };
        
        try {
            const response = await axios.post(`${BASE_URL}/auth/register`, testUser);
            console.log('✅ Registration:', response.data.success ? 'Working' : 'Failed');
        } catch (error) {
            console.log('❌ Registration failed:', error.response?.data || error.message);
        }

        // Test 5: User login
        console.log('\n5. Testing user login...');
        try {
            const response = await axios.post(`${BASE_URL}/auth/login`, {
                username: testUser.username,
                password: testUser.password
            });
            
            if (response.data.success) {
                console.log('✅ Login: Working');
                const token = response.data.data.token;
                
                // Test 6: Get profile
                console.log('\n6. Testing profile endpoint...');
                try {
                    const profileResponse = await axios.get(`${BASE_URL}/auth/profile`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    console.log('✅ Profile endpoint:', profileResponse.data.success ? 'Working' : 'Failed');
                } catch (error) {
                    console.log('❌ Profile endpoint failed:', error.response?.data || error.message);
                }
            } else {
                console.log('❌ Login failed:', response.data.message);
            }
        } catch (error) {
            console.log('❌ Login failed:', error.response?.data || error.message);
        }

        // Test 7: Admin login
        console.log('\n7. Testing admin login...');
        try {
            const response = await axios.post(`${BASE_URL}/auth/login`, {
                username: 'admin',
                password: 'admin123'
            });
            
            if (response.data.success) {
                console.log('✅ Admin login: Working');
                const adminToken = response.data.data.token;
                
                // Test 8: Admin stats
                console.log('\n8. Testing admin stats...');
                try {
                    const statsResponse = await axios.get(`${BASE_URL}/admin/stats`, {
                        headers: { Authorization: `Bearer ${adminToken}` }
                    });
                    console.log('✅ Admin stats:', statsResponse.data.success ? 'Working' : 'Failed');
                    if (statsResponse.data.success) {
                        console.log('   Stats:', statsResponse.data.data);
                    }
                } catch (error) {
                    console.log('❌ Admin stats failed:', error.response?.data || error.message);
                }
            } else {
                console.log('❌ Admin login failed:', response.data.message);
            }
        } catch (error) {
            console.log('❌ Admin login failed:', error.response?.data || error.message);
        }

        // Clean up
        server.kill();
        console.log('\n🎉 API testing completed!');

    } catch (error) {
        console.error('❌ API test failed:', error.message);
    } finally {
        await prisma.$disconnect();
    }
}

testEndpoints();
