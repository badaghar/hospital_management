/*
  Warnings:

  - You are about to drop the column `consultant_doctor` on the `operation` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `operation` table. All the data in the column will be lost.
  - You are about to drop the column `ipdId` on the `operation` table. All the data in the column will be lost.
  - You are about to drop the column `operation_name` on the `operation` table. All the data in the column will be lost.
  - You are about to drop the column `remark` on the `operation` table. All the data in the column will be lost.
  - You are about to drop the column `result` on the `operation` table. All the data in the column will be lost.
  - You are about to drop the `opd` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `patientType` to the `Ipd` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount` to the `Operation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Operation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `opd` DROP FOREIGN KEY `Opd_patientId_fkey`;

-- DropForeignKey
ALTER TABLE `operation` DROP FOREIGN KEY `Operation_ipdId_fkey`;

-- AlterTable
ALTER TABLE `ipd` ADD COLUMN `patientType` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `operation` DROP COLUMN `consultant_doctor`,
    DROP COLUMN `date`,
    DROP COLUMN `ipdId`,
    DROP COLUMN `operation_name`,
    DROP COLUMN `remark`,
    DROP COLUMN `result`,
    ADD COLUMN `amount` DOUBLE NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `opd`;

-- CreateTable
CREATE TABLE `IpdChat` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ipdId` INTEGER NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `IpdSummary` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ipdId` INTEGER NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `IpdOperationPayment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `operation_name` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `operation_doctor` VARCHAR(191) NOT NULL,
    `remark` VARCHAR(191) NOT NULL,
    `result` VARCHAR(191) NOT NULL,
    `amount` DOUBLE NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `ipdId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `IpdLabCharges` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `lab_name` VARCHAR(191) NOT NULL,
    `ipdId` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LabCharges` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `amount` DOUBLE NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `LabCharges_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `IpdChat` ADD CONSTRAINT `IpdChat_ipdId_fkey` FOREIGN KEY (`ipdId`) REFERENCES `Ipd`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `IpdSummary` ADD CONSTRAINT `IpdSummary_ipdId_fkey` FOREIGN KEY (`ipdId`) REFERENCES `Ipd`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `IpdOperationPayment` ADD CONSTRAINT `IpdOperationPayment_ipdId_fkey` FOREIGN KEY (`ipdId`) REFERENCES `Ipd`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `IpdLabCharges` ADD CONSTRAINT `IpdLabCharges_ipdId_fkey` FOREIGN KEY (`ipdId`) REFERENCES `Ipd`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
