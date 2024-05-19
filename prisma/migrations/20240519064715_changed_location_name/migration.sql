/*
  Warnings:

  - You are about to drop the column `name` on the `location` table. All the data in the column will be lost.
  - Added the required column `location_name` to the `Location` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `location` DROP COLUMN `name`,
    ADD COLUMN `location_name` VARCHAR(191) NOT NULL;
