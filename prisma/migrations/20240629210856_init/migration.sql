-- CreateTable
CREATE TABLE `LogRequests` (
    `uuid` VARCHAR(191) NOT NULL,
    `jwt` VARCHAR(191) NULL,
    `route` VARCHAR(191) NOT NULL,
    `method` VARCHAR(191) NOT NULL,
    `body` VARCHAR(191) NULL,
    `params` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
