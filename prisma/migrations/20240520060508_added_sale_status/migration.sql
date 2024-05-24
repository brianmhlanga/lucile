-- AlterTable
ALTER TABLE `property` ADD COLUMN `listing_status` ENUM('FOR_SALE', 'FOR_RENT') NOT NULL DEFAULT 'FOR_SALE';
