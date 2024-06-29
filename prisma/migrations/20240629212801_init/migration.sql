/*
  Warnings:

  - You are about to drop the column `jwt` on the `logrequests` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `logrequests` DROP COLUMN `jwt`,
    ADD COLUMN `clientsUuid` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `LogRequests` ADD CONSTRAINT `LogRequests_clientsUuid_fkey` FOREIGN KEY (`clientsUuid`) REFERENCES `Clients`(`uuid`) ON DELETE SET NULL ON UPDATE CASCADE;
