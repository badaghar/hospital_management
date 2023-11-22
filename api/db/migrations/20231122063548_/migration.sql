/*
  Warnings:

  - Added the required column `medicineId` to the `IpdPrescription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ipdprescription` ADD COLUMN `medicineId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `IpdPrescription` ADD CONSTRAINT `IpdPrescription_medicineId_fkey` FOREIGN KEY (`medicineId`) REFERENCES `Medicine`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
