/*
  Warnings:

  - You are about to drop the column `clientid` on the `device` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `intervention` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `device` DROP FOREIGN KEY `Device_clientid_fkey`;

-- AlterTable
ALTER TABLE `device` DROP COLUMN `clientid`;

-- AlterTable
ALTER TABLE `intervention` DROP COLUMN `status`;

-- CreateTable
CREATE TABLE `Intervention_status` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `interventionId` INTEGER NOT NULL,
    `status` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Intervention_status` ADD CONSTRAINT `Intervention_status_interventionId_fkey` FOREIGN KEY (`interventionId`) REFERENCES `Intervention`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
