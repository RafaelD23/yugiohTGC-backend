/*
  Warnings:

  - You are about to drop the column `from` on the `TradeOffer` table. All the data in the column will be lost.
  - You are about to drop the column `to` on the `TradeOffer` table. All the data in the column will be lost.
  - Added the required column `reciever` to the `TradeOffer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sender` to the `TradeOffer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `TradeOffer` DROP COLUMN `from`,
    DROP COLUMN `to`,
    ADD COLUMN `reciever` VARCHAR(191) NOT NULL,
    ADD COLUMN `sender` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `TradeOffer` ADD CONSTRAINT `TradeOffer_sender_fkey` FOREIGN KEY (`sender`) REFERENCES `Clients`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TradeOffer` ADD CONSTRAINT `TradeOffer_reciever_fkey` FOREIGN KEY (`reciever`) REFERENCES `Clients`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;
