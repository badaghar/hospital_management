/*
  Warnings:

  - Added the required column `note` to the `IpdPrescription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ipdprescription` ADD COLUMN `note` VARCHAR(191) NOT NULL;
