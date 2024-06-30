-- CreateTable
CREATE TABLE `Clients` (
    `uuid` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` ENUM('YES', 'NOT') NOT NULL DEFAULT 'YES',

    UNIQUE INDEX `Clients_username_key`(`username`),
    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LogRequests` (
    `uuid` VARCHAR(191) NOT NULL,
    `route` VARCHAR(191) NOT NULL,
    `method` VARCHAR(191) NOT NULL,
    `body` VARCHAR(191) NULL,
    `params` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `clientsUuid` VARCHAR(191) NULL,

    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ClientsCards` (
    `uuid` VARCHAR(191) NOT NULL,
    `cardId` INTEGER NOT NULL,
    `clientsUuid` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `LogRequests` ADD CONSTRAINT `LogRequests_clientsUuid_fkey` FOREIGN KEY (`clientsUuid`) REFERENCES `Clients`(`uuid`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ClientsCards` ADD CONSTRAINT `ClientsCards_clientsUuid_fkey` FOREIGN KEY (`clientsUuid`) REFERENCES `Clients`(`uuid`) ON DELETE SET NULL ON UPDATE CASCADE;
