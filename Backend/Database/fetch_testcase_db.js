const {PrismaClient} = require('@prisma/client')
const fs = require('fs')
const path = require('path')
const Prisma = new PrismaClient()

/**
 * Fetches test cases for a given problem from the database and creates corresponding input and output files.
 *
 * @async
 * @param {Object} problem - The problem object containing the problem ID.
 * @param {number|string} problem.id - The unique identifier of the problem.
 * @returns {Promise<Object>} A promise that resolves with:
 *                            - success: boolean indicating if test cases were fetched successfully.
 *                            - message: A descriptive message about the operation.
 *                            - data: Array of test case objects (if successful).
 */
async function fetch_testcase(problem){
    try {

        //getting testCase from testcase table using problem id
        const testcase = await Prisma.testCase.findMany({
            where : {problemId : problem.id}
        });

        //making input.txt or actual.txt file in submission folder
        for(let single_tc of testcase){
            const input = path.join(__dirname, "../", "Submission", `inputpid${single_tc.problemId}tid${single_tc.id}.txt`);
            const actual = path.join(__dirname, "../", "Submission", `actualpid${single_tc.problemId}tid${single_tc.id}.txt`);

            fs.writeFileSync(input, single_tc.input, "utf-8");
            fs.writeFileSync(actual, single_tc.output, "utf-8");
        }

        return {
            success : true,
            message : "TestCases Gernated",
            data : testcase
        }

    } catch (error) {
        return {
            success : false,
            message : error.message || "Problem Not Found"
        }
    } finally {
        Prisma.$disconnect();
    }
}

module.exports = {fetch_testcase};