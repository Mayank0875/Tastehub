/**
 * Shared Prisma Client Instance
 * This ensures we only have one Prisma client instance across the application
 */

const { PrismaClient } = require('@prisma/client');

// Create a single Prisma instance
const prisma = new PrismaClient({
    log: ['error', 'warn'],
});

// Handle cleanup on process termination
process.on('beforeExit', async () => {
    await prisma.$disconnect();
});

module.exports = prisma;
