-- CreateTable
CREATE TABLE `Available_client` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `interventionId` INTEGER NOT NULL,
    `shop` VARCHAR(191) NOT NULL,
    `isAvailable` BOOLEAN NOT NULL,
    `callAt` VARCHAR(191) NOT NULL,
    `pec` VARCHAR(191) NOT NULL,
    `comment` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Available_client` ADD CONSTRAINT `Available_client_interventionId_fkey` FOREIGN KEY (`interventionId`) REFERENCES `Intervention`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
