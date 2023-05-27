-- CreateTable
CREATE TABLE `SaleMedicine` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `billNo` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `medicine` JSON NOT NULL,
    `total` DOUBLE NOT NULL,
    `discount` DOUBLE NOT NULL,
    `sgst` DOUBLE NOT NULL,
    `cgst` DOUBLE NOT NULL,
    `grand_total` DOUBLE NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `patientId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SaleMedicine` ADD CONSTRAINT `SaleMedicine_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `Patient`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
