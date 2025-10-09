-- AlterTable
ALTER TABLE `NT_InvoicesINV` ADD COLUMN `april` INTEGER NULL DEFAULT 0,
    ADD COLUMN `august` INTEGER NULL DEFAULT 0,
    ADD COLUMN `december` INTEGER NULL DEFAULT 0,
    ADD COLUMN `february` INTEGER NULL DEFAULT 0,
    ADD COLUMN `january` INTEGER NULL DEFAULT 0,
    ADD COLUMN `july` INTEGER NULL DEFAULT 0,
    ADD COLUMN `june` INTEGER NULL DEFAULT 0,
    ADD COLUMN `march` INTEGER NULL DEFAULT 0,
    ADD COLUMN `may` INTEGER NULL DEFAULT 0,
    ADD COLUMN `november` INTEGER NULL DEFAULT 0,
    ADD COLUMN `october` INTEGER NULL DEFAULT 0,
    ADD COLUMN `seasonId` VARCHAR(191) NULL,
    ADD COLUMN `september` INTEGER NULL DEFAULT 0;

-- CreateTable
CREATE TABLE `NT_SeasonsSEA` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NULL,
    `startDate` DATETIME(3) NULL,
    `endDate` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,
    `active` INTEGER NOT NULL DEFAULT 1,

    UNIQUE INDEX `NT_SeasonsSEA_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NT_StudentSeasonsSSE` (
    `id` VARCHAR(191) NOT NULL,
    `studentId` VARCHAR(191) NOT NULL,
    `seasonId` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `from` DATETIME(3) NULL,
    `to` DATETIME(3) NULL,
    `active` INTEGER NOT NULL DEFAULT 1,

    UNIQUE INDEX `NT_StudentSeasonsSSE_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NT_DiariesDIA` (
    `id` VARCHAR(191) NOT NULL,
    `code` VARCHAR(100) NULL,
    `title` VARCHAR(255) NULL,
    `description` VARCHAR(500) NULL,
    `content` TEXT NULL,
    `type` INTEGER NOT NULL DEFAULT 0,
    `date` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,
    `active` INTEGER NOT NULL DEFAULT 1,
    `studentId` VARCHAR(191) NULL,

    UNIQUE INDEX `NT_DiariesDIA_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `NT_InvoicesINV` ADD CONSTRAINT `NT_InvoicesINV_seasonId_fkey` FOREIGN KEY (`seasonId`) REFERENCES `NT_SeasonsSEA`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NT_StudentSeasonsSSE` ADD CONSTRAINT `NT_StudentSeasonsSSE_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `NT_StudentsSTU`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NT_StudentSeasonsSSE` ADD CONSTRAINT `NT_StudentSeasonsSSE_seasonId_fkey` FOREIGN KEY (`seasonId`) REFERENCES `NT_SeasonsSEA`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NT_DiariesDIA` ADD CONSTRAINT `NT_DiariesDIA_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `NT_StudentsSTU`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
