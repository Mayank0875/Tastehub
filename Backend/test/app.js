const {runcpp} = require('../CodeRunner/cpp_runner');
const {runpython} = require('../CodeRunner/python_runner');
const {create_problem} = require('../Database/insert_problem_db')


const problemList = [ 
  {
    title: "Sum of Two Numbers",
    rating: 800,
    tags: ["math", "implementation"],
    description: "Given two integers a and b, output their sum.",
    constraints: "-10^9 <= a, b <= 10^9",
    sampleInput: "3 7",
    sampleOutput: "10",
    notes: "Just output a + b.",
    testcase: [
      { input: "3 7", output: "10" },
      { input: "-5 2", output: "-3" },
      { input: "0 0", output: "0" },
      { input: "1000000000 1000000000", output: "2000000000" }
    ]
  },
  {
    title: "Difference of Two Numbers",
    rating: 800,
    tags: ["math", "implementation"],
    description: "Given two integers a and b, output a - b.",
    constraints: "-10^9 <= a, b <= 10^9",
    sampleInput: "10 4",
    sampleOutput: "6",
    notes: "Order matters: subtract b from a.",
    testcase: [
      { input: "10 4", output: "6" },
      { input: "4 10", output: "-6" },
      { input: "0 0", output: "0" },
      { input: "-5 -3", output: "-2" }
    ]
  },
  {
    title: "Product of Two Numbers",
    rating: 800,
    tags: ["math", "implementation"],
    description: "Given two integers a and b, output their product.",
    constraints: "-10^9 <= a, b <= 10^9",
    sampleInput: "3 4",
    sampleOutput: "12",
    notes: "Output a * b.",
    testcase: [
      { input: "3 4", output: "12" },
      { input: "-5 2", output: "-10" },
      { input: "0 100", output: "0" },
      { input: "10000 10000", output: "100000000" }
    ]
  },
  {
    title: "Check Even or Odd",
    rating: 800,
    tags: ["math", "conditions"],
    description: "Given an integer n, print EVEN if it is even, otherwise ODD.",
    constraints: "-10^9 <= n <= 10^9",
    sampleInput: "7",
    sampleOutput: "ODD",
    notes: "Use n % 2 to check parity.",
    testcase: [
      { input: "7", output: "ODD" },
      { input: "8", output: "EVEN" },
      { input: "0", output: "EVEN" },
      { input: "-3", output: "ODD" }
    ]
  },
  {
    title: "Sum of First N Numbers",
    rating: 900,
    tags: ["math", "loops"],
    description: "Given an integer n, output the sum of the first n natural numbers.",
    constraints: "1 <= n <= 10^6",
    sampleInput: "5",
    sampleOutput: "15",
    notes: "Sum formula = n * (n + 1) / 2.",
    testcase: [
      { input: "5", output: "15" },
      { input: "1", output: "1" },
      { input: "10", output: "55" },
      { input: "1000000", output: "500000500000" }
    ]
  },
  {
    title: "Factorial of a Number",
    rating: 900,
    tags: ["math", "loops"],
    description: "Given an integer n, output n! (factorial of n).",
    constraints: "0 <= n <= 20",
    sampleInput: "5",
    sampleOutput: "120",
    notes: "Factorial grows fast. Keep constraint small.",
    testcase: [
      { input: "0", output: "1" },
      { input: "5", output: "120" },
      { input: "10", output: "3628800" },
      { input: "20", output: "2432902008176640000" }
    ]
  },
  {
    title: "Reverse Digits",
    rating: 900,
    tags: ["implementation", "loops"],
    description: "Given an integer n, output the number obtained by reversing its digits.",
    constraints: "0 <= n <= 10^9",
    sampleInput: "1234",
    sampleOutput: "4321",
    notes: "Do not keep leading zeros in output.",
    testcase: [
      { input: "1234", output: "4321" },
      { input: "100", output: "1" },
      { input: "7", output: "7" },
      { input: "987654321", output: "123456789" }
    ]
  },
  {
    title: "Palindrome Number",
    rating: 900,
    tags: ["implementation", "conditions"],
    description: "Check if a given integer n is a palindrome. Print YES if it is, otherwise NO.",
    constraints: "0 <= n <= 10^9",
    sampleInput: "121",
    sampleOutput: "YES",
    notes: "A palindrome reads the same forward and backward.",
    testcase: [
      { input: "121", output: "YES" },
      { input: "123", output: "NO" },
      { input: "0", output: "YES" },
      { input: "1001", output: "YES" }
    ]
  },
  {
    title: "Greatest of Two Numbers",
    rating: 800,
    tags: ["math", "conditions"],
    description: "Given two integers a and b, print the greater of the two.",
    constraints: "-10^9 <= a, b <= 10^9",
    sampleInput: "7 3",
    sampleOutput: "7",
    notes: "If equal, print either one.",
    testcase: [
      { input: "7 3", output: "7" },
      { input: "3 7", output: "7" },
      { input: "5 5", output: "5" },
      { input: "-1 -2", output: "-1" }
    ]
  },
  {
    title: "Multiplication Table",
    rating: 900,
    tags: ["loops", "implementation"],
    description: "Given an integer n, print its multiplication table from 1 to 10, each result on a new line.",
    constraints: "1 <= n <= 100",
    sampleInput: "3",
    sampleOutput: "3 6 9 12 15 18 21 24 27 30",
    notes: "Output numbers separated by spaces in a single line.",
    testcase: [
      { input: "3", output: "3 6 9 12 15 18 21 24 27 30" },
      { input: "1", output: "1 2 3 4 5 6 7 8 9 10" },
      { input: "10", output: "10 20 30 40 50 60 70 80 90 100" },
      { input: "7", output: "7 14 21 28 35 42 49 56 63 70" }
    ]
  }
];

for(let sampleProblem of problemList){
  create_problem(sampleProblem)
  .then((res) => {
      console.log(res);
  })
  .catch((err) => {
      console.log(err);
  })
}
