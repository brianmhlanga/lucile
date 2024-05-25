/*
  Warnings:

  - You are about to drop the column `showTime` on the `property` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `property` DROP COLUMN `showTime`,
    ADD COLUMN `showEndTime` DATETIME(3) NULL,
    ADD COLUMN `showStartTime` DATETIME(3) NULL;
