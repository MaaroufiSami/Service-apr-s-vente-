-- CreateTable
CREATE TABLE `Intervention` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `imei` VARCHAR(191) NOT NULL,
    `clientId` VARCHAR(191) NOT NULL,
    `panneType` VARCHAR(191) NULL,
    `accessories` VARCHAR(191) NULL,
    `terminalPret` INTEGER NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `workflow` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Intervention` ADD CONSTRAINT `Intervention_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`cin`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Intervention` ADD CONSTRAINT `Intervention_imei_fkey` FOREIGN KEY (`imei`) REFERENCES `Device`(`imei`) ON DELETE RESTRICT ON UPDATE CASCADE;
