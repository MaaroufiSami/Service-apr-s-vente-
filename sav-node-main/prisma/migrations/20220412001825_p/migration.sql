/*
  Warnings:

  - You are about to drop the column `swapId` on the `swap_status` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `swap_status` DROP FOREIGN KEY `Swap_status_swapId_fkey`;

-- AlterTable
ALTER TABLE `swap_status` DROP COLUMN `swapId`;
