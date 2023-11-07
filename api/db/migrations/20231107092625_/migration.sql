-- CreateTable
CREATE TABLE `IpdPrescription` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ipdId` INTEGER NOT NULL,
    `medicine` VARCHAR(191) NOT NULL,
    `dosage` VARCHAR(191) NOT NULL,
    `timing` VARCHAR(191) NOT NULL,
    `frequency` VARCHAR(191) NOT NULL,
    `duration` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `extra` JSON NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `IpdPrescription` ADD CONSTRAINT `IpdPrescription_ipdId_fkey` FOREIGN KEY (`ipdId`) REFERENCES `Ipd`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
