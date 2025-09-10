-- DropIndex
DROP INDEX `NT_UserSessionsUS_tokenid_key` ON `NT_UserSessionsUS`;

-- AlterTable
ALTER TABLE `NT_UserSessionsUS` MODIFY `tokenid` TEXT NOT NULL;
