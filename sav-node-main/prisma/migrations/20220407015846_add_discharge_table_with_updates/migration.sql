-- AlterTable
ALTER TABLE `intervention` ADD COLUMN `dischargeId` INTEGER NULL;

-- CreateTable
CREATE TABLE `Discharge` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userid` INTEGER NOT NULL,
    `destination` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Intervention` ADD CONSTRAINT `Intervention_dischargeId_fkey` FOREIGN KEY (`dischargeId`) REFERENCES `Discharge`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Discharge` ADD CONSTRAINT `Discharge_userid_fkey` FOREIGN KEY (`userid`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
