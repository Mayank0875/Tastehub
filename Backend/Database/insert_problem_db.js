// use to create problem and tc and insert in problme database in create problem we accept obj with proper datatype 
// mention down follow the same convetion for not to get error

// problem = {
//     title : String,
//     rating : Number,
//     tags : Array,
//     description : String,
//     constraints : String,
//     sampleInput : String,
//     sampleOutput : String,
//     testcase : Array of Object like this [{input : '', output : ''}]
//     notes : String
// }

// follow the same varible name also


const {PrismaClient} = require("@prisma/client")
const Prisma = new PrismaClient();

/**
 * Creates a new problem in the database along with its associated test cases.
 *
 * @async
 * @param {Object} problem - An object containing the details of the problem to create.
 * @param {string} problem.title - The title of the problem.
 * @param {number} problem.rating - The difficulty rating of the problem.
 * @param {string[]} problem.tags - Tags associated with the problem.
 * @param {string} problem.description - The description of the problem.
 * @param {string} problem.constraints - Constraints for the problem.
 * @param {string} problem.sampleInput - Sample input for the problem.
 * @param {string} problem.sampleOutput - Sample output for the problem.
 * @param {Object[]} problem.testcase - Array of test case objects to create with the problem.
 * @param {string} problem.notes - Additional notes for the problem.
 * @returns {Promise<Object>} A promise that resolves with:
 *                            - success: boolean indicating if the problem was created successfully.
 *                            - data: The created problem object including test cases (if successful).
 *                            - type: Error type or message if creation fails.
 */
async function create_problem(problem){
    try {
        // make a problem and add it to problem table and adding tc at a time 
        const response = await Prisma.problem.create({
            data : {
                title : problem.title,
                rating : problem.rating,
                tags : problem.tags,
                description : problem.description,
                constraints : problem.constraints,
                sampleInput : problem.sampleInput,
                sampleOutput : problem.sampleOutput,
                testCases : {
                    create : problem.testcase
                },
                notes : problem.notes
            },
            include : {testCases : true}
        })
        return {
            success : true,
            data : response 
        }

    } catch (error) {
        return {
            success : false,
            type : error.message || "Unknown Error"
        }
    } finally {
        Prisma.$disconnect();
    }
}


module.exports = {create_problem}