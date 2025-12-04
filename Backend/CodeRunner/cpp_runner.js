// runcpp function take nothing use to run cpp file name as solution.cpp in submission this should be run after creating solution file
// return the promis with params
// success : true / false
// type : runtime error, tle , compliation error
// message : error msg / output sucess saved


// Command to run cpp code
// g++ solution.cpp -o solution.out
// ./solution.out < input.txt > output.txt


const path = require('path')
const {exec} = require('child_process');




/**
 * Compiles and runs a C++ solution file for a single test case.
 *
 * @async
 * @param {Object} single_tc - An object representing a single test case.
 * @param {number|string} single_tc.problemId - The problem ID associated with the solution.
 * @param {number|string} single_tc.id - The test case ID.
 * @returns {Promise<Object>} A promise that resolves with the execution result:
 *                            - success: boolean indicating success.
 *                            - type: "success" | "Compilation Error" | "Runtime Error" | "TLE".
 *                            - message: A descriptive message about the result.
 * @throws {Object} Rejects with an error object if compilation, runtime, or TLE occurs.
 */
async function run_cpp(single_tc){
    return new Promise((resolve, reject) => {
        const cppfile = path.join(__dirname, "../", "Submission", `solutionpid${single_tc.problemId}.cpp`)
        const execfile = path.join(__dirname, "../", "Submission", `solutionpid${single_tc.problemId}.out`)
        const inputfile = path.join(__dirname, "../", "Submission", `inputpid${single_tc.problemId}tid${single_tc.id}.txt`)
        const outputfile = path.join(__dirname, "../", "Submission", `outputpid${single_tc.problemId}tid${single_tc.id}.txt`)

        // compiling the file
        exec(`g++ "${cppfile}" -o "${execfile}"`, (error, stdout, stderr) => {
            if(error){
                return reject({
                    success : false,
                    type : "Compilation Error",
                    message : stderr || error.message,
                });
            }

            // running the file
            exec(`"${execfile}" < "${inputfile}" > "${outputfile}"`, {timeout : 1000}, (error, stdout, stderr) => {
                if(error){
                    if(error.killed){
                        return reject({
                            success : false,
                            type : "TLE",
                            message : stderr || error.message
                        })
                    }else{
                        return reject({
                            success : false,
                            type : "Runtime Error",
                            message : stderr || error.message
                        })
                    }
                }
                return resolve({
                    success : true,
                    type : "success",
                    message : "Output saved to output.txt"
                });
            });
        });
    })

};

module.exports = {run_cpp};
