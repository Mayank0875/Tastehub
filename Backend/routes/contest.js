/**
 * Contest routes for creating and managing contests
 * @fileoverview Handles contest CRUD operations
 */

const prisma = require('../lib/prisma');

/**
 * Create a new contest (Admin only)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
const createContest = async (req, res) => {
    try {
        const { name, description, problemIds, startsAt, endsAt } = req.body;

        // Validation
        if (!name || !description || !problemIds || !startsAt || !endsAt) {
            return res.status(400).json({
                success: false,
                message: 'Name, description, problemIds, startsAt, and endsAt are required'
            });
        }

        if (!Array.isArray(problemIds) || problemIds.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'At least one problem ID is required'
            });
        }

        // Validate dates
        const start = new Date(startsAt);
        const end = new Date(endsAt);

        if (start >= end) {
            return res.status(400).json({
                success: false,
                message: 'End date must be after start date'
            });
        }

        // Verify all problems exist
        const problems = await prisma.problem.findMany({
            where: {
                id: { in: problemIds.map(id => parseInt(id)) }
            }
        });

        if (problems.length !== problemIds.length) {
            return res.status(400).json({
                success: false,
                message: 'One or more problem IDs are invalid'
            });
        }

        // Create contest
        const contest = await prisma.contest.create({
            data: {
                name,
                description,
                problemIds: problemIds.map(id => parseInt(id)),
                startsAt: start,
                endsAt: end
            }
        });

        res.status(201).json({
            success: true,
            message: 'Contest created successfully',
            data: contest
        });

    } catch (error) {
        console.error('Create contest error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create contest',
            error: error.message
        });
    }
};

/**
 * Get all contests
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
const getContests = async (req, res) => {
    try {
        const contests = await prisma.contest.findMany({
            orderBy: { startsAt: 'desc' }
        });

        res.status(200).json({
            success: true,
            data: contests
        });

    } catch (error) {
        console.error('Get contests error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch contests',
            error: error.message
        });
    }
};

/**
 * Get single contest by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
const getContestById = async (req, res) => {
    try {
        const { id } = req.params;

        const contest = await prisma.contest.findUnique({
            where: { id: parseInt(id) }
        });

        if (!contest) {
            return res.status(404).json({
                success: false,
                message: 'Contest not found'
            });
        }

        // Fetch problem details
        const problems = await prisma.problem.findMany({
            where: {
                id: { in: contest.problemIds }
            },
            select: {
                id: true,
                title: true,
                rating: true,
                tags: true
            }
        });

        res.status(200).json({
            success: true,
            data: {
                ...contest,
                problems
            }
        });

    } catch (error) {
        console.error('Get contest error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch contest',
            error: error.message
        });
    }
};

/**
 * Update contest (Admin only)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
const updateContest = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, problemIds, startsAt, endsAt } = req.body;

        // Check if contest exists
        const existingContest = await prisma.contest.findUnique({
            where: { id: parseInt(id) }
        });

        if (!existingContest) {
            return res.status(404).json({
                success: false,
                message: 'Contest not found'
            });
        }

        // Prepare update data
        const updateData = {};
        if (name) updateData.name = name;
        if (description) updateData.description = description;
        
        if (problemIds) {
            if (!Array.isArray(problemIds) || problemIds.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: 'At least one problem ID is required'
                });
            }

            // Verify all problems exist
            const problems = await prisma.problem.findMany({
                where: {
                    id: { in: problemIds.map(id => parseInt(id)) }
                }
            });

            if (problems.length !== problemIds.length) {
                return res.status(400).json({
                    success: false,
                    message: 'One or more problem IDs are invalid'
                });
            }

            updateData.problemIds = problemIds.map(id => parseInt(id));
        }

        if (startsAt) updateData.startsAt = new Date(startsAt);
        if (endsAt) updateData.endsAt = new Date(endsAt);

        // Validate dates if both are provided
        if (updateData.startsAt && updateData.endsAt) {
            if (updateData.startsAt >= updateData.endsAt) {
                return res.status(400).json({
                    success: false,
                    message: 'End date must be after start date'
                });
            }
        }

        // Update contest
        const updatedContest = await prisma.contest.update({
            where: { id: parseInt(id) },
            data: updateData
        });

        res.status(200).json({
            success: true,
            message: 'Contest updated successfully',
            data: updatedContest
        });

    } catch (error) {
        console.error('Update contest error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update contest',
            error: error.message
        });
    }
};

/**
 * Delete contest (Admin only)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
const deleteContest = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if contest exists
        const existingContest = await prisma.contest.findUnique({
            where: { id: parseInt(id) }
        });

        if (!existingContest) {
            return res.status(404).json({
                success: false,
                message: 'Contest not found'
            });
        }

        // Delete contest
        await prisma.contest.delete({
            where: { id: parseInt(id) }
        });

        res.status(200).json({
            success: true,
            message: 'Contest deleted successfully'
        });

    } catch (error) {
        console.error('Delete contest error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete contest',
            error: error.message
        });
    }
};

module.exports = {
    createContest,
    getContests,
    getContestById,
    updateContest,
    deleteContest
};
