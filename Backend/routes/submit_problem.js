const { run } = require('../CodeRunner/run');
const crypto = require("crypto");
const fs = require('fs')
const path = require("path");


function generateRandomFileName(ext = "txt") {
  const randomStr = crypto.randomBytes(16).toString("hex"); 
  return `${randomStr}.${ext}`;
}




async function submit_problem(req, res) {
    try {
        const { id, ext } = req.params;
        const io = req.app.get('io'); // Get WebSocket instance

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded"
            });
        }

        const fileContent = req.file.buffer.toString("utf-8");
        
        const file_path = path.join(
            __dirname,
            "../",
            "Submission",
            generateRandomFileName(ext)
        );
        fs.writeFileSync(file_path, fileContent, "utf-8");

        // Emit submission started event
        const submissionId = Math.random().toString(36).substr(2, 9);
        io.emit('submission_update', {
            id: submissionId,
            userId: req.user.id,
            username: req.user.username,
            problemId: Number(id),
            status: 'RUNNING',
            message: 'Submission is being processed...'
        });

        // Call your runner
        const response = await run({ id: Number(id) }, { file: file_path, ext });

        fs.unlinkSync(file_path);

        // Emit submission completed event
        io.emit('submission_update', {
            id: submissionId,
            userId: req.user.id,
            username: req.user.username,
            problemId: Number(id),
            status: response.success ? 'ACCEPTED' : 'REJECTED',
            verdict: response.verdict,
            message: response.success ? 'All test cases passed!' : `Failed: ${response.verdict}`
        });

        return res.status(200).json({
            success: true,
            data: response
        });
    } catch (error) {
        console.error("Submit error:", error.message);
        
        // Emit submission error event
        const io = req.app.get('io');
        io.emit('submission_update', {
            id: Math.random().toString(36).substr(2, 9),
            userId: req.user.id,
            username: req.user.username,
            problemId: Number(req.params.id),
            status: 'ERROR',
            message: 'Submission failed due to server error'
        });

        return res.status(500).json({
            success: false,
            message: "Failed to Submit problem",
            error: error.message
        });
    }
}

module.exports = {submit_problem};