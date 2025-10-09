-- DropIndex
DROP INDEX `NT_GuardiansGUA_email_key` ON `NT_GuardiansGUA`;

-- DropIndex
DROP INDEX `NT_StudentsSTU_email_key` ON `NT_StudentsSTU`;

-- AlterTable
ALTER TABLE `NT_GuardiansGUA` MODIFY `email` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `NT_StudentsSTU` MODIFY `email` VARCHAR(255) NOT NULL;
