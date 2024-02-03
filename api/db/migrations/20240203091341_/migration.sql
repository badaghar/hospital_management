/*
  Warnings:

  - Added the required column `potency` to the `IpdHomoPrescription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ipdhomoprescription` ADD COLUMN `potency` VARCHAR(191) NOT NULL;
