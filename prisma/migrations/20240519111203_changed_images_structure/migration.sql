/*
  Warnings:

  - You are about to drop the column `property_id` on the `images` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `images` DROP FOREIGN KEY `Images_property_id_fkey`;

-- AlterTable
ALTER TABLE `images` DROP COLUMN `property_id`;

-- AlterTable
ALTER TABLE `property` ADD COLUMN `images` JSON NULL;
