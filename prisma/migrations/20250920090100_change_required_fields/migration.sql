-- DropForeignKey
ALTER TABLE `NT_AttendanceATT` DROP FOREIGN KEY `NT_AttendanceATT_studentId_fkey`;

-- DropForeignKey
ALTER TABLE `NT_AuthorizationsAUT` DROP FOREIGN KEY `NT_AuthorizationsAUT_studentId_fkey`;

-- DropForeignKey
ALTER TABLE `NT_AuthorizationsAUT` DROP FOREIGN KEY `NT_AuthorizationsAUT_userId_fkey`;

-- DropForeignKey
ALTER TABLE `NT_InvoicesINV` DROP FOREIGN KEY `NT_InvoicesINV_studentId_fkey`;

-- DropForeignKey
ALTER TABLE `NT_InvoicesINV` DROP FOREIGN KEY `NT_InvoicesINV_userId_fkey`;

-- DropForeignKey
ALTER TABLE `NT_SanctionsSAN` DROP FOREIGN KEY `NT_SanctionsSAN_studentId_fkey`;

-- DropForeignKey
ALTER TABLE `NT_SanctionsSAN` DROP FOREIGN KEY `NT_SanctionsSAN_userId_fkey`;

-- DropForeignKey
ALTER TABLE `NT_TutorShipsTUS` DROP FOREIGN KEY `NT_TutorShipsTUS_studentId_fkey`;

-- DropForeignKey
ALTER TABLE `NT_TutorShipsTUS` DROP FOREIGN KEY `NT_TutorShipsTUS_userId_fkey`;

-- DropIndex
DROP INDEX `NT_AttendanceATT_studentId_fkey` ON `NT_AttendanceATT`;

-- DropIndex
DROP INDEX `NT_AuthorizationsAUT_studentId_fkey` ON `NT_AuthorizationsAUT`;

-- DropIndex
DROP INDEX `NT_AuthorizationsAUT_userId_fkey` ON `NT_AuthorizationsAUT`;

-- DropIndex
DROP INDEX `NT_InvoicesINV_studentId_fkey` ON `NT_InvoicesINV`;

-- DropIndex
DROP INDEX `NT_InvoicesINV_userId_fkey` ON `NT_InvoicesINV`;

-- DropIndex
DROP INDEX `NT_SanctionsSAN_studentId_fkey` ON `NT_SanctionsSAN`;

-- DropIndex
DROP INDEX `NT_SanctionsSAN_userId_fkey` ON `NT_SanctionsSAN`;

-- DropIndex
DROP INDEX `NT_TutorShipsTUS_studentId_fkey` ON `NT_TutorShipsTUS`;

-- DropIndex
DROP INDEX `NT_TutorShipsTUS_userId_fkey` ON `NT_TutorShipsTUS`;

-- AlterTable
ALTER TABLE `NT_AttendanceATT` MODIFY `studentId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `NT_AuthorizationsAUT` MODIFY `userId` VARCHAR(191) NULL,
    MODIFY `studentId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `NT_InvoicesINV` MODIFY `studentId` VARCHAR(191) NULL,
    MODIFY `userId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `NT_SanctionsSAN` MODIFY `studentId` VARCHAR(191) NULL,
    MODIFY `userId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `NT_TutorShipsTUS` MODIFY `userId` VARCHAR(191) NULL,
    MODIFY `studentId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `NT_TutorShipsTUS` ADD CONSTRAINT `NT_TutorShipsTUS_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `NT_UsersUSR`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NT_TutorShipsTUS` ADD CONSTRAINT `NT_TutorShipsTUS_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `NT_StudentsSTU`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NT_AuthorizationsAUT` ADD CONSTRAINT `NT_AuthorizationsAUT_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `NT_UsersUSR`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NT_AuthorizationsAUT` ADD CONSTRAINT `NT_AuthorizationsAUT_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `NT_StudentsSTU`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NT_SanctionsSAN` ADD CONSTRAINT `NT_SanctionsSAN_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `NT_StudentsSTU`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NT_SanctionsSAN` ADD CONSTRAINT `NT_SanctionsSAN_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `NT_UsersUSR`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NT_InvoicesINV` ADD CONSTRAINT `NT_InvoicesINV_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `NT_StudentsSTU`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NT_InvoicesINV` ADD CONSTRAINT `NT_InvoicesINV_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `NT_UsersUSR`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NT_AttendanceATT` ADD CONSTRAINT `NT_AttendanceATT_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `NT_StudentsSTU`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
