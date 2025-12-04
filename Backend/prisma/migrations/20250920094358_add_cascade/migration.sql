-- DropForeignKey
ALTER TABLE `TestCase` DROP FOREIGN KEY `TestCase_problemId_fkey`;

-- DropIndex
DROP INDEX `TestCase_problemId_fkey` ON `TestCase`;

-- AddForeignKey
ALTER TABLE `TestCase` ADD CONSTRAINT `TestCase_problemId_fkey` FOREIGN KEY (`problemId`) REFERENCES `Problem`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
