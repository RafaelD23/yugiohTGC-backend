-- CreateTable
CREATE TABLE `ClientsCards` (
    `uuid` VARCHAR(191) NOT NULL,
    `card_id` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `clientsUuid` VARCHAR(191) NULL,

    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ClientsCards` ADD CONSTRAINT `ClientsCards_clientsUuid_fkey` FOREIGN KEY (`clientsUuid`) REFERENCES `Clients`(`uuid`) ON DELETE SET NULL ON UPDATE CASCADE;
