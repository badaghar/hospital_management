/*
  Warnings:

  - Added the required column `amount` to the `IpdLabCharges` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ipdlabcharges` ADD COLUMN `amount` DOUBLE NOT NULL;
