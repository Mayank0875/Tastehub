// in this file we run the whole execution of the problem when user submit this 
// single_tc function run of single testcase it accept the single testcase and usercodefile detail (like file, ext)
// then this caller compile base on lang 
// same process run for all testcase if any tescase fail retunr the wa/tle/re
// if ac return succes message

// run take two argument 
// problem {detail like id, title, ({user file path, user file exten}) in one obj}

// return promise where all details are written

const fs = require('fs')
const path = require('path')
const { make_file } = require('../CodeReader/make_file')
const { delete_solution_file } = require('../CodeReader/delete_file')
const { run_cpp } = require('../CodeRunner/cpp_runner')
const { run_python } = require('../CodeRunner/python_runner')
const {match_output} = require('../CodeRunner/output_matching')
const {fetch_testcase} = require('../Database/fetch_testcase_db')
const { promises } = require('dns')

// dummy obj for testing purpose
const user_code = {
    file : path.join(__dirname, "../", "Submission", "user_file.cpp"),
    ext : "cpp"
}



/**
 * Runs a single test case for a user's submitted code, evaluates the output, and cleans up temporary files.
 *
 * @async
 * @param {Object} single_tc - An object representing a single test case.
 * @param {number|string} single_tc.problemId - The problem ID associated with the solution.
 * @param {number|string} single_tc.id - The test case ID.
 * @param {Object} user_code_file_details - Details of the user's submitted code file.
 * @param {string} user_code_file_details.file - Path to the user's code file.
 * @param {string} user_code_file_details.ext - File extension of the user's code (e.g., "py", "cpp").
 * @returns {Promise<Object>} A promise that resolves with the verdict of the test case:
 *                            - success: boolean indicating correctness.
 *                            - type: "AC" | "WA" | "Judge Error" | compilation/runtime/TLE errors.
 *                            - message: Descriptive message about the result.
 */
async function run_single_tc(single_tc, user_code_file_details){

    // creating a solution.ext file of code checking
    const solution_file_path = make_file(user_code_file_details.file, user_code_file_details.ext, single_tc.problemId);

    // chossing compiler base on language
    const compiler = (user_code.ext == "py" ? run_python : run_cpp);

    try {
        const response = await compiler(single_tc);
        const verdict = match_output(single_tc);
        return verdict;
    } catch (error) {
        return error;
    } finally {
        // deleting extra files
        delete_solution_file(solution_file_path);
        delete_solution_file(path.join(__dirname, "../", "Submission", `outputpid${single_tc.problemId}tid${single_tc.id}.txt`));
        if(user_code.ext == "cpp"){
            const execfile = path.join(__dirname, "../", "Submission", `solutionpid${single_tc.id}.out`);
            delete_solution_file(execfile);
        }
    }

}



/**
 * Runs all test cases for a given problem using the user's submitted code and returns the overall verdict.
 *
 * @async
 * @param {Object} problem - The problem object containing necessary identifiers to fetch test cases.
 * @param {Object} user_code_file_details - Details of the user's submitted code file.
 * @param {string} user_code_file_details.file - Path to the user's code file.
 * @param {string} user_code_file_details.ext - File extension of the user's code (e.g., "py", "cpp").
 * @returns {Promise<Object>} A promise that resolves with the overall result:
 *                            - success: boolean indicating if all test cases passed.
 *                            - verdict: "AC" if all passed, otherwise the type of first failed test case.
 *                            - details: Array of individual test case results.
 *                            - message: Optional error message if a runtime error occurs.
 */
async function run(problem, user_code_file_details){
    const response = await fetch_testcase(problem);
    const testcase = response.data;
    try {
        const result = await Promise.all(
            testcase.map(tc => run_single_tc(tc, user_code_file_details))
        )
        
        const allpassed = result.every(res => res.type === 'AC');
        if  (allpassed){
            return {
                success : true,
                verdict : 'AC',
                details : result 
            }
        } else {
            const firstfail = result.find(res => res.type !== 'AC');
            return {
                success: false,
                verdict: firstfail.type,
                details: result
            }
        }



    } catch (error) {
        return {
            success : false,
            message : error.message,
            verdict : "Runtime Error"
        }
    } finally {
        for(let single_tc of testcase){
            const input = path.join(__dirname, "../", "Submission", `inputpid${single_tc.problemId}tid${single_tc.id}.txt`);
            const actual = path.join(__dirname, "../", "Submission", `actualpid${single_tc.problemId}tid${single_tc.id}.txt`);

            fs.unlinkSync(input);
            fs.unlinkSync(actual);
        }
    }
}


// run({id : 1}, user_code).then(res => {
//     console.log(res);
// }).catch(err => {
//     console.log(err);
// })


module.exports = {run};

