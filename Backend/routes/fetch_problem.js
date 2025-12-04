const prisma = require('../lib/prisma');

/**
 * Fetches a list of problems from the database and sends them in the HTTP response.
 *
 * @async
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {Promise<void>} Sends a JSON response with:
 *                          - success: boolean indicating if fetching was successful.
 *                          - data: Array of problem objects with id, title, rating, and tags (if successful).
 *                          - message/error: Error details if fetching fails.
 */
async function fetch_problem(req, res){
    try {
        const problems = await prisma.problem.findMany({
            select : {
                id : true,
                title : true,
                rating : true,
                tags : true,
                createdBy : true,
                createdAt : true,
                creator: {
                    select: {
                        id: true,
                        username: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        return res.status(200).json({
            success: true,
            data: problems
        });
        
    } catch (error) {
        console.error('Fetch problems error:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch problems',
            error: error.message
        });
    }
}

module.exports = { fetch_problem };