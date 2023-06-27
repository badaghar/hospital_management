-- CreateTable
CREATE TABLE `Opd` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `consultant_doctor` VARCHAR(191) NOT NULL,
    `charges` JSON NOT NULL,
    `paymentMode` VARCHAR(191) NOT NULL,
    `amount` DOUBLE NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `patientId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Opd` ADD CONSTRAINT `Opd_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `Patient`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
