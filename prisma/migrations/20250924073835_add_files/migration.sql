-- CreateTable
CREATE TABLE `NT_FilesFIL` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(255) NULL,
    `description` VARCHAR(255) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,
    `active` INTEGER NOT NULL DEFAULT 1,
    `type` INTEGER NULL DEFAULT 0,
    `url` VARCHAR(255) NULL,
    `userId` VARCHAR(191) NULL,
    `studentId` VARCHAR(191) NULL,

    UNIQUE INDEX `NT_FilesFIL_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `NT_FilesFIL` ADD CONSTRAINT `NT_FilesFIL_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `NT_UsersUSR`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NT_FilesFIL` ADD CONSTRAINT `NT_FilesFIL_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `NT_StudentsSTU`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
