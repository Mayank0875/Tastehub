const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting database seeding...');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await prisma.submission.deleteMany();
    await prisma.testCase.deleteMany();
    await prisma.problem.deleteMany();
    await prisma.contest.deleteMany();
    await prisma.user.deleteMany();

    // Create Users
    console.log('👥 Creating users...');
    const hashedPassword = await bcrypt.hash('password123', 10);

    const admin = await prisma.user.create({
        data: {
            username: 'admin',
            email: 'admin@arena.com',
            password: hashedPassword,
            role: 'ADMIN',
            isActive: true
        }
    });

    const user1 = await prisma.user.create({
        data: {
            username: 'john_doe',
            email: 'john@example.com',
            password: hashedPassword,
            role: 'USER',
            isActive: true
        }
    });

    const user2 = await prisma.user.create({
        data: {
            username: 'jane_smith',
            email: 'jane@example.com',
            password: hashedPassword,
            role: 'USER',
            isActive: true
        }
    });

    const user3 = await prisma.user.create({
        data: {
            username: 'alice_wonder',
            email: 'alice@example.com',
            password: hashedPassword,
            role: 'USER',
            isActive: true
        }
    });

    console.log('✅ Created 4 users (1 admin, 3 regular users)');

    // Create Problems
    console.log('📝 Creating problems...');

    const problem1 = await prisma.problem.create({
        data: {
            title: 'Two Sum',
            rating: 800,
            tags: JSON.stringify(['array', 'hash-table', 'easy']),
            description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
            constraints: `- 2 <= nums.length <= 10^4
- -10^9 <= nums[i] <= 10^9
- -10^9 <= target <= 10^9
- Only one valid answer exists.`,
            sampleInput: `nums = [2,7,11,15], target = 9`,
            sampleOutput: `[0,1]`,
            notes: `Because nums[0] + nums[1] == 9, we return [0, 1].`,
            createdBy: admin.id
        }
    });

    await prisma.testCase.createMany({
        data: [
            {
                problemId: problem1.id,
                input: '[2,7,11,15]\n9',
                output: '[0,1]'
            },
            {
                problemId: problem1.id,
                input: '[3,2,4]\n6',
                output: '[1,2]'
            },
            {
                problemId: problem1.id,
                input: '[3,3]\n6',
                output: '[0,1]'
            }
        ]
    });

    const problem2 = await prisma.problem.create({
        data: {
            title: 'Reverse String',
            rating: 600,
            tags: JSON.stringify(['string', 'two-pointers', 'easy']),
            description: `Write a function that reverses a string. The input string is given as an array of characters s.

You must do this by modifying the input array in-place with O(1) extra memory.`,
            constraints: `- 1 <= s.length <= 10^5
- s[i] is a printable ascii character.`,
            sampleInput: `["h","e","l","l","o"]`,
            sampleOutput: `["o","l","l","e","h"]`,
            notes: `The string "hello" becomes "olleh".`,
            createdBy: admin.id
        }
    });

    await prisma.testCase.createMany({
        data: [
            {
                problemId: problem2.id,
                input: '["h","e","l","l","o"]',
                output: '["o","l","l","e","h"]'
            },
            {
                problemId: problem2.id,
                input: '["H","a","n","n","a","h"]',
                output: '["h","a","n","n","a","H"]'
            }
        ]
    });

    const problem3 = await prisma.problem.create({
        data: {
            title: 'Palindrome Number',
            rating: 700,
            tags: JSON.stringify(['math', 'easy']),
            description: `Given an integer x, return true if x is a palindrome, and false otherwise.

An integer is a palindrome when it reads the same backward as forward.

For example, 121 is a palindrome while 123 is not.`,
            constraints: `- -2^31 <= x <= 2^31 - 1`,
            sampleInput: `121`,
            sampleOutput: `true`,
            notes: `121 reads as 121 from left to right and from right to left.`,
            createdBy: admin.id
        }
    });

    await prisma.testCase.createMany({
        data: [
            {
                problemId: problem3.id,
                input: '121',
                output: 'true'
            },
            {
                problemId: problem3.id,
                input: '-121',
                output: 'false'
            },
            {
                problemId: problem3.id,
                input: '10',
                output: 'false'
            }
        ]
    });

    const problem4 = await prisma.problem.create({
        data: {
            title: 'Valid Parentheses',
            rating: 900,
            tags: JSON.stringify(['string', 'stack', 'easy']),
            description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
            constraints: `- 1 <= s.length <= 10^4
- s consists of parentheses only '()[]{}'.`,
            sampleInput: `"()"`,
            sampleOutput: `true`,
            notes: `The string contains valid parentheses.`,
            createdBy: admin.id
        }
    });

    await prisma.testCase.createMany({
        data: [
            {
                problemId: problem4.id,
                input: '"()"',
                output: 'true'
            },
            {
                problemId: problem4.id,
                input: '"()[]{}"',
                output: 'true'
            },
            {
                problemId: problem4.id,
                input: '"(]"',
                output: 'false'
            }
        ]
    });

    const problem5 = await prisma.problem.create({
        data: {
            title: 'Merge Two Sorted Lists',
            rating: 1000,
            tags: JSON.stringify(['linked-list', 'recursion', 'easy']),
            description: `You are given the heads of two sorted linked lists list1 and list2.

Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.

Return the head of the merged linked list.`,
            constraints: `- The number of nodes in both lists is in the range [0, 50].
- -100 <= Node.val <= 100
- Both list1 and list2 are sorted in non-decreasing order.`,
            sampleInput: `list1 = [1,2,4], list2 = [1,3,4]`,
            sampleOutput: `[1,1,2,3,4,4]`,
            notes: `The merged list is [1,1,2,3,4,4].`,
            createdBy: admin.id
        }
    });

    await prisma.testCase.createMany({
        data: [
            {
                problemId: problem5.id,
                input: '[1,2,4]\n[1,3,4]',
                output: '[1,1,2,3,4,4]'
            },
            {
                problemId: problem5.id,
                input: '[]\n[]',
                output: '[]'
            },
            {
                problemId: problem5.id,
                input: '[]\n[0]',
                output: '[0]'
            }
        ]
    });

    const problem6 = await prisma.problem.create({
        data: {
            title: 'Maximum Subarray',
            rating: 1100,
            tags: JSON.stringify(['array', 'dynamic-programming', 'medium']),
            description: `Given an integer array nums, find the subarray with the largest sum, and return its sum.

A subarray is a contiguous non-empty sequence of elements within an array.`,
            constraints: `- 1 <= nums.length <= 10^5
- -10^4 <= nums[i] <= 10^4`,
            sampleInput: `[-2,1,-3,4,-1,2,1,-5,4]`,
            sampleOutput: `6`,
            notes: `The subarray [4,-1,2,1] has the largest sum 6.`,
            createdBy: admin.id
        }
    });

    await prisma.testCase.createMany({
        data: [
            {
                problemId: problem6.id,
                input: '[-2,1,-3,4,-1,2,1,-5,4]',
                output: '6'
            },
            {
                problemId: problem6.id,
                input: '[1]',
                output: '1'
            },
            {
                problemId: problem6.id,
                input: '[5,4,-1,7,8]',
                output: '23'
            }
        ]
    });

    const problem7 = await prisma.problem.create({
        data: {
            title: 'Binary Search',
            rating: 750,
            tags: JSON.stringify(['array', 'binary-search', 'easy']),
            description: `Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.

You must write an algorithm with O(log n) runtime complexity.`,
            constraints: `- 1 <= nums.length <= 10^4
- -10^4 < nums[i], target < 10^4
- All the integers in nums are unique.
- nums is sorted in ascending order.`,
            sampleInput: `nums = [-1,0,3,5,9,12], target = 9`,
            sampleOutput: `4`,
            notes: `9 exists in nums and its index is 4.`,
            createdBy: admin.id
        }
    });

    await prisma.testCase.createMany({
        data: [
            {
                problemId: problem7.id,
                input: '[-1,0,3,5,9,12]\n9',
                output: '4'
            },
            {
                problemId: problem7.id,
                input: '[-1,0,3,5,9,12]\n2',
                output: '-1'
            }
        ]
    });

    const problem8 = await prisma.problem.create({
        data: {
            title: 'Fibonacci Number',
            rating: 650,
            tags: JSON.stringify(['math', 'recursion', 'dynamic-programming', 'easy']),
            description: `The Fibonacci numbers, commonly denoted F(n) form a sequence, called the Fibonacci sequence, such that each number is the sum of the two preceding ones, starting from 0 and 1.

Given n, calculate F(n).`,
            constraints: `- 0 <= n <= 30`,
            sampleInput: `2`,
            sampleOutput: `1`,
            notes: `F(2) = F(1) + F(0) = 1 + 0 = 1.`,
            createdBy: admin.id
        }
    });

    await prisma.testCase.createMany({
        data: [
            {
                problemId: problem8.id,
                input: '2',
                output: '1'
            },
            {
                problemId: problem8.id,
                input: '3',
                output: '2'
            },
            {
                problemId: problem8.id,
                input: '4',
                output: '3'
            }
        ]
    });

    console.log('✅ Created 8 problems with test cases');

    // Create Submissions
    console.log('📤 Creating submissions...');

    await prisma.submission.createMany({
        data: [
            {
                userId: user1.id,
                problemId: problem1.id,
                code: 'function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) {\n      return [map.get(complement), i];\n    }\n    map.set(nums[i], i);\n  }\n}',
                language: 'javascript',
                verdict: 'Accepted'
            },
            {
                userId: user1.id,
                problemId: problem2.id,
                code: 'function reverseString(s) {\n  let left = 0, right = s.length - 1;\n  while (left < right) {\n    [s[left], s[right]] = [s[right], s[left]];\n    left++;\n    right--;\n  }\n}',
                language: 'javascript',
                verdict: 'Accepted'
            },
            {
                userId: user2.id,
                problemId: problem1.id,
                code: 'def two_sum(nums, target):\n    seen = {}\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in seen:\n            return [seen[complement], i]\n        seen[num] = i',
                language: 'python',
                verdict: 'Accepted'
            },
            {
                userId: user2.id,
                problemId: problem3.id,
                code: 'def is_palindrome(x):\n    if x < 0:\n        return False\n    return str(x) == str(x)[::-1]',
                language: 'python',
                verdict: 'Accepted'
            },
            {
                userId: user3.id,
                problemId: problem4.id,
                code: '#include <stack>\nbool isValid(string s) {\n    stack<char> st;\n    for (char c : s) {\n        if (c == \'(\' || c == \'{\' || c == \'[\') {\n            st.push(c);\n        } else {\n            if (st.empty()) return false;\n            char top = st.top();\n            st.pop();\n            if ((c == \')\' && top != \'(\') || \n                (c == \'}\' && top != \'{\') || \n                (c == \']\' && top != \'[\')) {\n                return false;\n            }\n        }\n    }\n    return st.empty();\n}',
                language: 'cpp',
                verdict: 'Accepted'
            },
            {
                userId: user3.id,
                problemId: problem7.id,
                code: 'int binarySearch(vector<int>& nums, int target) {\n    int left = 0, right = nums.size() - 1;\n    while (left <= right) {\n        int mid = left + (right - left) / 2;\n        if (nums[mid] == target) return mid;\n        if (nums[mid] < target) left = mid + 1;\n        else right = mid - 1;\n    }\n    return -1;\n}',
                language: 'cpp',
                verdict: 'Accepted'
            },
            {
                userId: user1.id,
                problemId: problem6.id,
                code: 'function maxSubArray(nums) {\n  let maxSum = nums[0];\n  let currentSum = nums[0];\n  for (let i = 1; i < nums.length; i++) {\n    currentSum = Math.max(nums[i], currentSum + nums[i]);\n    maxSum = Math.max(maxSum, currentSum);\n  }\n  return maxSum;\n}',
                language: 'javascript',
                verdict: 'Accepted'
            },
            {
                userId: user2.id,
                problemId: problem8.id,
                code: 'def fibonacci(n):\n    if n <= 1:\n        return n\n    a, b = 0, 1\n    for _ in range(2, n + 1):\n        a, b = b, a + b\n    return b',
                language: 'python',
                verdict: 'Accepted'
            }
        ]
    });

    console.log('✅ Created 8 submissions');

    // Create Contests
    console.log('🏆 Creating contests...');

    await prisma.contest.createMany({
        data: [
            {
                name: 'Beginner Contest #1',
                description: 'A contest for beginners featuring easy problems on arrays and strings.',
                problemIds: JSON.stringify([problem1.id, problem2.id, problem3.id]),
                startsAt: new Date('2024-12-10T10:00:00Z'),
                endsAt: new Date('2024-12-10T12:00:00Z')
            },
            {
                name: 'Weekly Challenge #42',
                description: 'Weekly coding challenge with mixed difficulty problems.',
                problemIds: JSON.stringify([problem4.id, problem5.id, problem6.id]),
                startsAt: new Date('2024-12-15T14:00:00Z'),
                endsAt: new Date('2024-12-15T17:00:00Z')
            },
            {
                name: 'Algorithm Mastery',
                description: 'Test your algorithm skills with classic problems.',
                problemIds: JSON.stringify([problem6.id, problem7.id, problem8.id]),
                startsAt: new Date('2024-12-20T09:00:00Z'),
                endsAt: new Date('2024-12-20T12:00:00Z')
            }
        ]
    });

    console.log('✅ Created 3 contests');

    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log('   - 4 Users (1 admin, 3 regular users)');
    console.log('   - 8 Problems with test cases');
    console.log('   - 8 Submissions');
    console.log('   - 3 Contests');
    console.log('\n🔑 Login Credentials:');
    console.log('   Admin:');
    console.log('     Email: admin@arena.com');
    console.log('     Password: password123');
    console.log('\n   Users:');
    console.log('     Email: john@example.com | Password: password123');
    console.log('     Email: jane@example.com | Password: password123');
    console.log('     Email: alice@example.com | Password: password123');
}

main()
    .catch((e) => {
        console.error('❌ Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
