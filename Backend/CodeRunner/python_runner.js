//runpython function take nothing use to run py file name as solution.py in submission this should be run after creating solution file
// return the promis with params
// success : true / false
// type : runtime error, tle , compliation error
// message : error msg / output sucess saved


// Command to run python code
// python solution.py < input.txt > output.txt


const {exec} = require('child_process')
const path = require('path')



/**
 * Executes a Python solution file for a single test case.
 *
 * @param {Object} single_tc - An object representing a single test case.
 * @param {number|string} single_tc.problemId - The problem ID associated with the solution.
 * @param {number|string} single_tc.id - The test case ID.
 * @returns {Promise<Object>} A promise that resolves with the execution result:
 *                            - success: boolean indicating success.
 *                            - type: "success" | "Runtime Error" | "TLE".
 *                            - message: A descriptive message about the result.
 * @throws {Object} Rejects with an error object if runtime error or TLE occurs.
 */
function run_python(single_tc){
    const pythonfile = path.join(__dirname, "../", "Submission", `solutionpid${single_tc.problemId}.py`)

    const inputfile = path.join(__dirname, "../", "Submission", `inputpid${single_tc.problemId}tid${single_tc.id}.txt`)
    const outputfile = path.join(__dirname, "../", "Submission", `outputpid${single_tc.problemId}tid${single_tc.id}.txt`)
    return new Promise((resolve, reject) => {
        exec(`python3 "${pythonfile}" < "${inputfile}" > "${ outputfile}"`, {timeout : 1000}, (error, stdout, stderr) => {
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
    })
};


module.exports = {run_python};