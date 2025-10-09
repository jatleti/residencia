-- AlterTable
ALTER TABLE `NT_InvoicesINV` ADD COLUMN `becaConcedida` INTEGER NULL DEFAULT 0,
    ADD COLUMN `bonificacionConcedida` VARCHAR(255) NULL,
    ADD COLUMN `localizador` VARCHAR(255) NULL,
    ADD COLUMN `obligadoPagoPrecioPublico` INTEGER NULL DEFAULT 0,
    ADD COLUMN `solicitaBeca` INTEGER NULL DEFAULT 0,
    ADD COLUMN `solicitaBonificacion` INTEGER NULL DEFAULT 0,
    ADD COLUMN `tipoBeca` VARCHAR(255) NULL;
