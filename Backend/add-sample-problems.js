const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function addSampleProblems() {
  const problems = [
    {
      title: "Two Sum",
      rating: 1,
      tags: ["array", "hash-table"],
      description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
      constraints: "2 <= nums.length <= 10^4",
      sampleInput: "[2,7,11,15]\n9",
      sampleOutput: "[0,1]",
      notes: "You may assume that each input would have exactly one solution.",
      testcase: [
        { input: "[2,7,11,15]\n9", output: "[0,1]" },
        { input: "[3,2,4]\n6", output: "[1,2]" }
      ]
    },
    {
      title: "Reverse String",
      rating: 1,
      tags: ["string", "two-pointers"],
      description: "Write a function that reverses a string.",
      constraints: "1 <= s.length <= 10^5",
      sampleInput: "hello",
      sampleOutput: "olleh",
      notes: "Do not allocate extra space for another array.",
      testcase: [
        { input: "hello", output: "olleh" },
        { input: "world", output: "dlrow" }
      ]
    },
    {
      title: "Valid Parentheses",
      rating: 2,
      tags: ["string", "stack"],
      description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
      constraints: "1 <= s.length <= 10^4",
      sampleInput: "()[]{}",
      sampleOutput: "true",
      notes: "An input string is valid if open brackets are closed in the correct order.",
      testcase: [
        { input: "()[]{}", output: "true" },
        { input: "(]", output: "false" }
      ]
    }
  ];

  for (const problem of problems) {
    try {
      await prisma.problem.create({
        data: {
          title: problem.title,
          rating: problem.rating,
          tags: problem.tags,
          description: problem.description,
          constraints: problem.constraints,
          sampleInput: problem.sampleInput,
          sampleOutput: problem.sampleOutput,
          notes: problem.notes,
          testCases: {
            create: problem.testcase
          }
        }
      });
      console.log(`✅ Added: ${problem.title}`);
    } catch (error) {
      console.log(`❌ Error adding ${problem.title}:`, error.message);
    }
  }

  await prisma.$disconnect();
  console.log("\n✅ Sample problems added!");
}

addSampleProblems();
