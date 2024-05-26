-- CreateTable
CREATE TABLE `user` (
    `id` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NULL,
    `first_name` VARCHAR(191) NOT NULL,
    `surname` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone_number` VARCHAR(191) NOT NULL,
    `whatsapp_number` VARCHAR(191) NOT NULL,
    `role` ENUM('AGENT', 'ADMIN', 'SUPER_ADMIN', 'REALTOR', 'USER') NOT NULL DEFAULT 'USER',
    `status` BOOLEAN NOT NULL DEFAULT true,
    `password` VARCHAR(191) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `user_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `images` (
    `id` VARCHAR(191) NOT NULL,
    `image_name` VARCHAR(191) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `location` (
    `id` VARCHAR(191) NOT NULL,
    `location_name` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `updated_at` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `suburbs` (
    `id` VARCHAR(191) NOT NULL,
    `suburb_name` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `location_id` VARCHAR(191) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `property` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` LONGTEXT NULL,
    `address` LONGTEXT NULL,
    `owner_name` VARCHAR(191) NULL,
    `refrence_code` VARCHAR(191) NULL,
    `owner_email` VARCHAR(191) NULL,
    `owner_phone` VARCHAR(191) NULL,
    `showDate` DATETIME(3) NULL,
    `showStartTime` DATETIME(3) NULL,
    `showEndTime` DATETIME(3) NULL,
    `on_show` BOOLEAN NOT NULL DEFAULT false,
    `amount` DOUBLE NOT NULL,
    `listing_status` ENUM('FOR_SALE', 'FOR_RENT') NOT NULL DEFAULT 'FOR_SALE',
    `status` ENUM('LISTED', 'ARCHIVED', 'SOLD') NOT NULL DEFAULT 'LISTED',
    `location_id` VARCHAR(191) NOT NULL,
    `suburb_id` VARCHAR(191) NULL,
    `images` JSON NULL,
    `other_features` JSON NULL,
    `type_id` VARCHAR(191) NOT NULL,
    `agent_id` VARCHAR(191) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `features` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `total` INTEGER NULL,
    `property_id` VARCHAR(191) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `propertytype` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `updated_at` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `suburbs` ADD CONSTRAINT `suburbs_location_id_fkey` FOREIGN KEY (`location_id`) REFERENCES `location`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `property` ADD CONSTRAINT `property_suburb_id_fkey` FOREIGN KEY (`suburb_id`) REFERENCES `suburbs`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `property` ADD CONSTRAINT `property_location_id_fkey` FOREIGN KEY (`location_id`) REFERENCES `location`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `property` ADD CONSTRAINT `property_agent_id_fkey` FOREIGN KEY (`agent_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `property` ADD CONSTRAINT `property_type_id_fkey` FOREIGN KEY (`type_id`) REFERENCES `propertytype`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `features` ADD CONSTRAINT `features_property_id_fkey` FOREIGN KEY (`property_id`) REFERENCES `property`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
