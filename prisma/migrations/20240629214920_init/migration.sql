/*
  Warnings:

  - You are about to drop the column `card_id` on the `clientscards` table. All the data in the column will be lost.
  - Added the required column `cardId` to the `ClientsCards` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `clientscards` DROP COLUMN `card_id`,
    ADD COLUMN `cardId` INTEGER NOT NULL;
