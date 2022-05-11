/*
  Warnings:

  - You are about to drop the column `locale` on the `intervention_status` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `intervention_status` DROP COLUMN `locale`,
    ADD COLUMN `local` VARCHAR(191) NULL;
