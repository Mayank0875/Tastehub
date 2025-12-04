/**
 * Database Connection Test Script
 * @fileoverview Tests database connectivity and basic operations
 */

const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient();

async function testDatabase() {
    console.log('🔍 Testing Database Connection...\n');
    
    try {
        // Test 1: Basic connection
        console.log('1. Testing basic connection...');
        await prisma.$connect();
        console.log('✅ Database connection successful\n');

        // Test 2: Check if tables exist
        console.log('2. Checking database tables...');
        
        // Test User table
        try {
            const userCount = await prisma.user.count();
            console.log(`✅ User table exists - ${userCount} users found`);
        } catch (error) {
            console.log('❌ User table error:', error.message);
        }

        // Test Problem table
        try {
            const problemCount = await prisma.problem.count();
            console.log(`✅ Problem table exists - ${problemCount} problems found`);
        } catch (error) {
            console.log('❌ Problem table error:', error.message);
        }

        // Test TestCase table
        try {
            const testCaseCount = await prisma.testCase.count();
            console.log(`✅ TestCase table exists - ${testCaseCount} test cases found`);
        } catch (error) {
            console.log('❌ TestCase table error:', error.message);
        }

        // Test Submission table
        try {
            const submissionCount = await prisma.submission.count();
            console.log(`✅ Submission table exists - ${submissionCount} submissions found`);
        } catch (error) {
            console.log('❌ Submission table error:', error.message);
        }

        console.log('\n3. Testing basic CRUD operations...');

        // Test 3: Create a test problem
        try {
            const testProblem = await prisma.problem.create({
                data: {
                    title: 'Test Problem ' + Date.now(),
                    rating: 1000,
                    tags: ['test', 'debug'],
                    description: 'This is a test problem for debugging',
                    constraints: 'No special constraints',
                    sampleInput: '1\n2',
                    sampleOutput: '3',
                    notes: 'Test notes'
                }
            });
            console.log('✅ Problem creation successful:', testProblem.id);

            // Test 4: Create test case for the problem
            const testCase = await prisma.testCase.create({
                data: {
                    problemId: testProblem.id,
                    input: '1 2',
                    output: '3'
                }
            });
            console.log('✅ Test case creation successful:', testCase.id);

            // Test 5: Fetch the problem with test cases
            const fetchedProblem = await prisma.problem.findUnique({
                where: { id: testProblem.id },
                include: { testCases: true }
            });
            console.log('✅ Problem fetch with relations successful');

            // Clean up test data
            await prisma.problem.delete({ where: { id: testProblem.id } });
            console.log('✅ Test data cleanup successful');

        } catch (error) {
            console.log('❌ CRUD operations error:', error.message);
        }

        // Test 6: Check admin user
        console.log('\n4. Checking admin user...');
        try {
            const adminUser = await prisma.user.findFirst({
                where: { role: 'ADMIN' }
            });
            if (adminUser) {
                console.log('✅ Admin user found:', adminUser.username);
            } else {
                console.log('⚠️  No admin user found - run: node create-admin.js');
            }
        } catch (error) {
            console.log('❌ Admin user check error:', error.message);
        }

        console.log('\n🎉 Database test completed successfully!');

    } catch (error) {
        console.error('❌ Database test failed:', error.message);
        console.error('Full error:', error);
        
        // Check common issues
        console.log('\n🔧 Troubleshooting suggestions:');
        console.log('1. Check if MySQL is running');
        console.log('2. Verify DATABASE_URL in .env file');
        console.log('3. Ensure database exists');
        console.log('4. Run: npx prisma db push');
        console.log('5. Run: npx prisma generate');
    } finally {
        await prisma.$disconnect();
    }
}

testDatabase();
