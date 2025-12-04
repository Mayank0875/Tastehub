/**
 * Admin routes for problem and user management
 * @fileoverview Handles admin-only operations for managing problems and users
 */

const prisma = require('../lib/prisma');
const fs = require('fs');
const path = require('path');

/**
 * Create a new problem with test cases
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
const createProblem = async (req, res) => {
    try {
        const {
            title,
            rating,
            tags,
            description,
            constraints,
            sampleInput,
            sampleOutput,
            notes,
            testCases
        } = req.body;

        // Validation
        if (!title || !rating || !tags || !description || !constraints || !sampleInput || !sampleOutput) {
            return res.status(400).json({
                success: false,
                message: 'Title, rating, tags, description, constraints, sample input, and sample output are required'
            });
        }

        if (!Array.isArray(testCases) || testCases.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'At least one test case is required'
            });
        }

        // Create problem with test cases in a transaction
        const result = await prisma.$transaction(async (tx) => {
            // Create the problem
            const problem = await tx.problem.create({
                data: {
                    title,
                    rating: parseInt(rating),
                    tags: JSON.parse(tags), // Assuming tags come as JSON string
                    description,
                    constraints,
                    sampleInput,
                    sampleOutput,
                    notes: notes || '',
                    createdBy: req.user.id // Store the creator's user ID
                }
            });

            // Create test cases
            const createdTestCases = await Promise.all(
                testCases.map(testCase => 
                    tx.testCase.create({
                        data: {
                            problemId: problem.id,
                            input: testCase.input,
                            output: testCase.output
                        }
                    })
                )
            );

            return { problem, testCases: createdTestCases };
        });

        res.status(201).json({
            success: true,
            message: 'Problem created successfully',
            data: {
                problem: result.problem,
                testCases: result.testCases
            }
        });

    } catch (error) {
        console.error('Create problem error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create problem',
            error: error.message
        });
    }
};

/**
 * Update an existing problem
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
const updateProblem = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            title,
            rating,
            tags,
            description,
            constraints,
            sampleInput,
            sampleOutput,
            notes
        } = req.body;

        // Check if problem exists
        const existingProblem = await prisma.problem.findUnique({
            where: { id: parseInt(id) }
        });

        if (!existingProblem) {
            return res.status(404).json({
                success: false,
                message: 'Problem not found'
            });
        }

        // Prepare update data
        const updateData = {};
        if (title) updateData.title = title;
        if (rating) updateData.rating = parseInt(rating);
        if (tags) updateData.tags = JSON.parse(tags);
        if (description) updateData.description = description;
        if (constraints) updateData.constraints = constraints;
        if (sampleInput) updateData.sampleInput = sampleInput;
        if (sampleOutput) updateData.sampleOutput = sampleOutput;
        if (notes !== undefined) updateData.notes = notes;

        // Update problem
        const updatedProblem = await prisma.problem.update({
            where: { id: parseInt(id) },
            data: updateData
        });

        res.status(200).json({
            success: true,
            message: 'Problem updated successfully',
            data: updatedProblem
        });

    } catch (error) {
        console.error('Update problem error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update problem',
            error: error.message
        });
    }
};

/**
 * Delete a problem and its test cases
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
const deleteProblem = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if problem exists
        const existingProblem = await prisma.problem.findUnique({
            where: { id: parseInt(id) }
        });

        if (!existingProblem) {
            return res.status(404).json({
                success: false,
                message: 'Problem not found'
            });
        }

        // Delete problem (test cases will be deleted automatically due to cascade)
        await prisma.problem.delete({
            where: { id: parseInt(id) }
        });

        res.status(200).json({
            success: true,
            message: 'Problem deleted successfully'
        });

    } catch (error) {
        console.error('Delete problem error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete problem',
            error: error.message
        });
    }
};

/**
 * Add test cases to an existing problem
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
const addTestCases = async (req, res) => {
    try {
        const { id } = req.params;
        const { testCases } = req.body;

        if (!Array.isArray(testCases) || testCases.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Test cases array is required'
            });
        }

        // Check if problem exists
        const existingProblem = await prisma.problem.findUnique({
            where: { id: parseInt(id) }
        });

        if (!existingProblem) {
            return res.status(404).json({
                success: false,
                message: 'Problem not found'
            });
        }

        // Create test cases
        const createdTestCases = await Promise.all(
            testCases.map(testCase => 
                prisma.testCase.create({
                    data: {
                        problemId: parseInt(id),
                        input: testCase.input,
                        output: testCase.output
                    }
                })
            )
        );

        res.status(201).json({
            success: true,
            message: 'Test cases added successfully',
            data: createdTestCases
        });

    } catch (error) {
        console.error('Add test cases error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to add test cases',
            error: error.message
        });
    }
};

/**
 * Get all users with pagination
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
const getUsers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const [users, total] = await Promise.all([
            prisma.user.findMany({
                skip,
                take: limit,
                select: {
                    id: true,
                    username: true,
                    email: true,
                    role: true,
                    isActive: true,
                    createdAt: true,
                    _count: {
                        select: {
                            submission: true
                        }
                    }
                },
                orderBy: { createdAt: 'desc' }
            }),
            prisma.user.count()
        ]);

        res.status(200).json({
            success: true,
            data: {
                users,
                pagination: {
                    page,
                    limit,
                    total,
                    pages: Math.ceil(total / limit)
                }
            }
        });

    } catch (error) {
        console.error('Get users error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch users',
            error: error.message
        });
    }
};

/**
 * Update user role or status
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { role, isActive } = req.body;

        // Check if user exists
        const existingUser = await prisma.user.findUnique({
            where: { id: parseInt(id) }
        });

        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Prevent admin from modifying themselves
        if (parseInt(id) === req.user.id) {
            return res.status(400).json({
                success: false,
                message: 'Cannot modify your own role or status'
            });
        }

        const updateData = {};
        if (role !== undefined) updateData.role = role;
        if (isActive !== undefined) updateData.isActive = isActive;

        const updatedUser = await prisma.user.update({
            where: { id: parseInt(id) },
            data: updateData,
            select: {
                id: true,
                username: true,
                email: true,
                role: true,
                isActive: true,
                createdAt: true,
                updatedAt: true
            }
        });

        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            data: updatedUser
        });

    } catch (error) {
        console.error('Update user error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update user',
            error: error.message
        });
    }
};

/**
 * Get system statistics
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
const getStats = async (req, res) => {
    try {
        const [totalProblems, totalUsers, totalSubmissions, recentSubmissions] = await Promise.all([
            prisma.problem.count(),
            prisma.user.count(),
            prisma.submission.count(),
            prisma.submission.count({
                where: {
                    submittedAt: {
                        gte: new Date(Date.now() - 24 * 60 * 60 * 1000) // Last 24 hours
                    }
                }
            })
        ]);

        res.status(200).json({
            success: true,
            data: {
                totalProblems,
                totalUsers,
                totalSubmissions,
                recentSubmissions
            }
        });

    } catch (error) {
        console.error('Get stats error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch statistics',
            error: error.message
        });
    }
};

module.exports = {
    createProblem,
    updateProblem,
    deleteProblem,
    addTestCases,
    getUsers,
    updateUser,
    getStats
};
