// in this we are check the user output (output.txt) with the actual output (actual.txt) and return 
// the object whether is corect or not 
// success : true / false
// type : WA / AC 
// message : worng / submiteed successfully

const fs = require('fs');
const { type } = require('os');
const path = require('path')




/**
 * Compares the output of a user's solution with the expected output for a single test case.
 *
 * @param {Object} single_tc - An object representing a single test case.
 * @param {number|string} single_tc.problemId - The problem ID associated with the solution.
 * @param {number|string} single_tc.id - The test case ID.
 * @returns {{ success: boolean, type: "AC" | "WA" | "Judge Error", message: string }}
 *          An object indicating whether the user's output matches the expected output.
 *          - "AC" if correct, "WA" if wrong answer, "Judge Error" if an error occurs.
 */
function match_output(single_tc){
    const actual_path = path.join(__dirname, "../", "Submission", `actualpid${single_tc.problemId}tid${single_tc.id}.txt`)
    const output_path = path.join(__dirname, "../", "Submission", `outputpid${single_tc.problemId}tid${single_tc.id}.txt`)


    const actual_output = fs.readFileSync(actual_path, "utf-8").trim()
    const user_ouput = fs.readFileSync(output_path, "utf-8").trim()
    try{
        if(actual_output === user_ouput){
            return {
                success : true,
                type : "AC",
                message : "Submitted succesfully"
            }
        } else {
            return {
                success : false,
                type : "WA",
                message : "Wrong Answer"
            }
        }
    } catch (error) {
        return {
            success : false,
            type : "Judge Error",
            message : error.message       
        }
    }

}

module.exports = {match_output};
