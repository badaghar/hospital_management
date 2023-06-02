/*
  Warnings:

  - You are about to drop the column `date_of_admission` on the `patient` table. All the data in the column will be lost.
  - You are about to drop the column `doctorFeeId` on the `patient` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `patient` DROP FOREIGN KEY `Patient_doctorFeeId_fkey`;

-- AlterTable
ALTER TABLE `patient` DROP COLUMN `date_of_admission`,
    DROP COLUMN `doctorFeeId`;

-- CreateTable
CREATE TABLE `Opd` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `consultant_doctor` VARCHAR(191) NOT NULL,
    `charges` JSON NOT NULL,
    `paymentMode` DOUBLE NOT NULL,
    `amount` DOUBLE NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `patientId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ipd` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `consultant_doctor` VARCHAR(191) NOT NULL,
    `date_of_admission` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `paid_amount` DOUBLE NOT NULL,
    `patientId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Operation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `operation_name` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `consultant_doctor` VARCHAR(191) NOT NULL,
    `remark` VARCHAR(191) NOT NULL,
    `result` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `ipdId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `IpdCharges` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `charge_type` VARCHAR(191) NOT NULL,
    `charge` DOUBLE NOT NULL,
    `quantity` INTEGER NOT NULL,
    `total` DOUBLE NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `ipdId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `IpdConsultation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `consultation_doctor` VARCHAR(191) NOT NULL,
    `consultation_type` VARCHAR(191) NOT NULL,
    `amount` DOUBLE NOT NULL,
    `ipdId` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `IpdPayment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `amount` DOUBLE NOT NULL,
    `payment_mode` VARCHAR(191) NOT NULL,
    `ipdId` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Charges` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `amount` DOUBLE NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Opd` ADD CONSTRAINT `Opd_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `Patient`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ipd` ADD CONSTRAINT `Ipd_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `Patient`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Operation` ADD CONSTRAINT `Operation_ipdId_fkey` FOREIGN KEY (`ipdId`) REFERENCES `Ipd`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `IpdCharges` ADD CONSTRAINT `IpdCharges_ipdId_fkey` FOREIGN KEY (`ipdId`) REFERENCES `Ipd`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `IpdConsultation` ADD CONSTRAINT `IpdConsultation_ipdId_fkey` FOREIGN KEY (`ipdId`) REFERENCES `Ipd`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `IpdPayment` ADD CONSTRAINT `IpdPayment_ipdId_fkey` FOREIGN KEY (`ipdId`) REFERENCES `Ipd`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
