-- CreateTable
CREATE TABLE `NT_UsersUSR` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `surname` VARCHAR(191) NULL,
    `permissions` VARCHAR(255) NULL,
    `password` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,
    `active` INTEGER NOT NULL DEFAULT 1,

    UNIQUE INDEX `NT_UsersUSR_id_key`(`id`),
    UNIQUE INDEX `NT_UsersUSR_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NT_UserSessionsUS` (
    `id` VARCHAR(191) NOT NULL,
    `id_user` VARCHAR(191) NOT NULL,
    `tokenid` VARCHAR(191) NOT NULL,
    `active` INTEGER NOT NULL DEFAULT 1,
    `init_session` DATETIME(3) NULL,
    `last_change` DATETIME(3) NULL,
    `ip` VARCHAR(255) NULL,

    UNIQUE INDEX `NT_UserSessionsUS_id_key`(`id`),
    UNIQUE INDEX `NT_UserSessionsUS_tokenid_key`(`tokenid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NT_ApiKeytokenKEY` (
    `id` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `description` VARCHAR(255) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,
    `access_on` DATETIME(3) NULL,
    `ip` VARCHAR(255) NULL,

    UNIQUE INDEX `NT_ApiKeytokenKEY_id_key`(`id`),
    UNIQUE INDEX `NT_ApiKeytokenKEY_token_key`(`token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `NT_UserSessionsUS` ADD CONSTRAINT `NT_UserSessionsUS_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `NT_UsersUSR`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
