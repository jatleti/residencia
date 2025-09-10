-- CreateTable
CREATE TABLE `NT_RolesROL` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(255) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,
    `active` INTEGER NOT NULL DEFAULT 1,

    UNIQUE INDEX `NT_RolesROL_id_key`(`id`),
    UNIQUE INDEX `NT_RolesROL_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NT_RolePermissionsRPE` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,
    `active` INTEGER NOT NULL DEFAULT 1,
    `roleId` VARCHAR(191) NULL,
    `createdBy` VARCHAR(191) NULL,
    `deletedBy` VARCHAR(191) NULL,

    UNIQUE INDEX `NT_RolePermissionsRPE_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NT_UserPermissionsUPE` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,
    `active` INTEGER NOT NULL DEFAULT 1,
    `userId` VARCHAR(191) NULL,
    `createdBy` VARCHAR(191) NULL,
    `deletedBy` VARCHAR(191) NULL,

    UNIQUE INDEX `NT_UserPermissionsUPE_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `NT_RolePermissionsRPE` ADD CONSTRAINT `NT_RolePermissionsRPE_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `NT_RolesROL`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NT_UserPermissionsUPE` ADD CONSTRAINT `NT_UserPermissionsUPE_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `NT_UsersUSR`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
