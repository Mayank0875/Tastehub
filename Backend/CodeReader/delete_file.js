// delete_solution_file function is used to delete file sync 
// it is used when i succesfully perform the verdict of user code then i need to delete
// all while create during this process neccasry 


const fs = require('fs')
const path = require('path')




/**
 * Deletes a file at the given path.
 *
 * @param {string} solution_file_path - The absolute or relative path of the file to be deleted.
 * @returns {{ success: boolean, message: string, error?: Error }} 
 *          An object indicating whether the deletion was successful. 
 *          If an error occurs, includes the error object.
 */
function delete_solution_file(solution_file_path){
    try{
        fs.unlinkSync(solution_file_path)
        return { success: true, message: "File deleted successfully" };
    } catch (err){
        return { success: false, message: `Error while deleting the solution file: ${err.message}`, error: err };
    }
};

module.exports = {delete_solution_file};
