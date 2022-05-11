-- CreateTable
CREATE TABLE `Swap_status` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `swapId` INTEGER NOT NULL,
    `interventionId` INTEGER NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `comment` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Swap_status` ADD CONSTRAINT `Swap_status_interventionId_fkey` FOREIGN KEY (`interventionId`) REFERENCES `Intervention`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Swap_status` ADD CONSTRAINT `Swap_status_swapId_fkey` FOREIGN KEY (`swapId`) REFERENCES `Swap`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
