-- AlterTable
ALTER TABLE `NT_UsersUSR` ADD COLUMN `address` VARCHAR(255) NULL,
    ADD COLUMN `city` VARCHAR(255) NULL,
    ADD COLUMN `dateEnded` DATETIME(3) NULL,
    ADD COLUMN `dateStarted` DATETIME(3) NULL,
    ADD COLUMN `department` VARCHAR(255) NULL,
    ADD COLUMN `mobile` VARCHAR(20) NULL,
    ADD COLUMN `nif` VARCHAR(20) NULL,
    ADD COLUMN `nir` VARCHAR(20) NULL,
    ADD COLUMN `phone` VARCHAR(20) NULL,
    ADD COLUMN `position` VARCHAR(255) NULL,
    ADD COLUMN `province` VARCHAR(255) NULL,
    ADD COLUMN `zip` VARCHAR(10) NULL;

-- CreateTable
CREATE TABLE `NT_StudentsSTU` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `surname` VARCHAR(255) NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(255) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,
    `active` INTEGER NOT NULL DEFAULT 1,
    `admitted` INTEGER NOT NULL DEFAULT 0,
    `ingressed` INTEGER NOT NULL DEFAULT 0,
    `graduated` INTEGER NOT NULL DEFAULT 0,
    `birthdate` DATETIME(3) NULL,
    `photo` VARCHAR(255) NULL,
    `code` VARCHAR(100) NULL,
    `nif` VARCHAR(20) NULL,
    `nir` VARCHAR(20) NULL,
    `address` VARCHAR(255) NULL,
    `city` VARCHAR(100) NULL,
    `province` VARCHAR(100) NULL,
    `zip` VARCHAR(10) NULL,
    `phone` VARCHAR(20) NULL,
    `mobile` VARCHAR(20) NULL,

    UNIQUE INDEX `NT_StudentsSTU_id_key`(`id`),
    UNIQUE INDEX `NT_StudentsSTU_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NT_GuardiansGUA` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `surname` VARCHAR(255) NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(255) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,
    `active` INTEGER NOT NULL DEFAULT 1,
    `nif` VARCHAR(20) NULL,
    `address` VARCHAR(255) NULL,
    `city` VARCHAR(100) NULL,
    `province` VARCHAR(100) NULL,
    `zip` VARCHAR(10) NULL,
    `phone` VARCHAR(20) NULL,
    `mobile` VARCHAR(20) NULL,

    UNIQUE INDEX `NT_GuardiansGUA_id_key`(`id`),
    UNIQUE INDEX `NT_GuardiansGUA_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NT_TutorShipsTUS` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,
    `active` INTEGER NOT NULL DEFAULT 1,
    `date` DATETIME(3) NULL,
    `content` TEXT NULL,
    `notes` TEXT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `studentId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `NT_TutorShipsTUS_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NT_AuthorizationsAUT` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,
    `active` INTEGER NOT NULL DEFAULT 1,
    `date` DATETIME(3) NULL,
    `from` DATETIME(3) NULL,
    `to` DATETIME(3) NULL,
    `content` TEXT NULL,
    `notes` TEXT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `studentId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `NT_AuthorizationsAUT_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NT_SanctionsSAN` (
    `id` VARCHAR(191) NOT NULL,
    `type` INTEGER NOT NULL DEFAULT 0,
    `description` TEXT NULL,
    `notes` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,
    `active` INTEGER NOT NULL DEFAULT 1,
    `date` DATETIME(3) NULL,
    `studentId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `NT_SanctionsSAN_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NT_InvoicesINV` (
    `id` VARCHAR(191) NOT NULL,
    `code` VARCHAR(100) NOT NULL,
    `description` VARCHAR(255) NULL,
    `amount` DECIMAL(10, 2) NOT NULL,
    `status` INTEGER NOT NULL DEFAULT 0,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,
    `active` INTEGER NOT NULL DEFAULT 1,
    `studentId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `NT_InvoicesINV_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NT_AttendanceATT` (
    `id` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `status` INTEGER NOT NULL DEFAULT 0,
    `type` INTEGER NOT NULL DEFAULT 0,
    `from` DATETIME(3) NULL,
    `to` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,
    `active` INTEGER NOT NULL DEFAULT 1,
    `studentId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `NT_AttendanceATT_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_StudentToUser` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_StudentToUser_AB_unique`(`A`, `B`),
    INDEX `_StudentToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_GuardianToStudent` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_GuardianToStudent_AB_unique`(`A`, `B`),
    INDEX `_GuardianToStudent_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `NT_TutorShipsTUS` ADD CONSTRAINT `NT_TutorShipsTUS_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `NT_UsersUSR`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NT_TutorShipsTUS` ADD CONSTRAINT `NT_TutorShipsTUS_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `NT_StudentsSTU`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NT_AuthorizationsAUT` ADD CONSTRAINT `NT_AuthorizationsAUT_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `NT_UsersUSR`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NT_AuthorizationsAUT` ADD CONSTRAINT `NT_AuthorizationsAUT_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `NT_StudentsSTU`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NT_SanctionsSAN` ADD CONSTRAINT `NT_SanctionsSAN_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `NT_StudentsSTU`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NT_SanctionsSAN` ADD CONSTRAINT `NT_SanctionsSAN_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `NT_UsersUSR`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NT_InvoicesINV` ADD CONSTRAINT `NT_InvoicesINV_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `NT_StudentsSTU`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NT_InvoicesINV` ADD CONSTRAINT `NT_InvoicesINV_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `NT_UsersUSR`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NT_AttendanceATT` ADD CONSTRAINT `NT_AttendanceATT_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `NT_StudentsSTU`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_StudentToUser` ADD CONSTRAINT `_StudentToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `NT_StudentsSTU`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_StudentToUser` ADD CONSTRAINT `_StudentToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `NT_UsersUSR`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_GuardianToStudent` ADD CONSTRAINT `_GuardianToStudent_A_fkey` FOREIGN KEY (`A`) REFERENCES `NT_GuardiansGUA`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_GuardianToStudent` ADD CONSTRAINT `_GuardianToStudent_B_fkey` FOREIGN KEY (`B`) REFERENCES `NT_StudentsSTU`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
