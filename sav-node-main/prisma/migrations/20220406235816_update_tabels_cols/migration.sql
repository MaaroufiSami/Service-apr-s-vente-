/*
  Warnings:

  - Added the required column `batteryId` to the `Device` table without a default value. This is not possible if the table is not empty.
  - Added the required column `supplier` to the `Device` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Intervention` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `device` ADD COLUMN `batteryId` VARCHAR(191) NOT NULL,
    ADD COLUMN `supplier` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `intervention` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `status` VARCHAR(191) NOT NULL;
