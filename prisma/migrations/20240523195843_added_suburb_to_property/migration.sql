-- AlterTable
ALTER TABLE `property` ADD COLUMN `suburb_id` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Property` ADD CONSTRAINT `Property_suburb_id_fkey` FOREIGN KEY (`suburb_id`) REFERENCES `Suburbs`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
