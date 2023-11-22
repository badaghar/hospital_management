/*
  Warnings:

  - Added the required column `quantity` to the `IpdPrescription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ipdprescription` ADD COLUMN `quantity` INTEGER NOT NULL;
