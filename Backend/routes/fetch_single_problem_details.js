const prisma = require('../lib/prisma');

async function fetch_single_problem_details(req, res){
    const {id} = req.params;
    try {
        const problem = await prisma.problem.findUnique({
            where : {
                id : Number(id)
            },
            include: {
                creator: {
                    select: {
                        id: true,
                        username: true
                    }
                },
                testCases: {
                    select: {
                        id: true,
                        input: true,
                        output: true
                    }
                }
            }
        });

        if (!problem) {
            return res.status(404).json({
                success: false,
                message: 'Problem not found'
            });
        }

        return res.status(200).json({
            success: true,
            data: problem
        });

    } catch ( error ) {
        console.error('Fetch single problem error:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch problem',
            error: error.message
        });
    }
} 


module.exports = {fetch_single_problem_details};