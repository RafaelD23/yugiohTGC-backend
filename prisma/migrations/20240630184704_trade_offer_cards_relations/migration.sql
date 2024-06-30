-- AlterTable
ALTER TABLE `TradeOfferCards` ADD COLUMN `tradeOfferUuid` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `TradeOfferCards` ADD CONSTRAINT `TradeOfferCards_tradeOfferUuid_fkey` FOREIGN KEY (`tradeOfferUuid`) REFERENCES `TradeOffer`(`uuid`) ON DELETE SET NULL ON UPDATE CASCADE;
