// makefile file function two argument one is path of usercode and ext (means which lang is used)
// then create a solution.ext file then further opreation is done on solution file not on user file


const fs = require('fs')
const path = require('path')


/**
 * Creates a new solution file by copying the content from a user file.
 *
 * @param {string} userfilepath - Path to the user's source file.
 * @param {string} ext - File extension for the new solution file (e.g., "js", "py").
 * @param {string|number} id - Unique identifier to include in the new file's name.
 * @returns {string} The full path of the newly created solution file.
 */

function make_file(userfilepath, ext, id){
    const solution_file_path = path.join(__dirname, "../", "Submission", `solutionpid${id}.${ext}`);
    const usercode = fs.readFileSync(userfilepath, "utf-8");
    fs.writeFileSync(solution_file_path, usercode, "utf-8");
    return solution_file_path;
};






module.exports = {make_file};
