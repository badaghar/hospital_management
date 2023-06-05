/*
  Warnings:

  - Added the required column `doctor_name` to the `SaleMedicine` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `salemedicine` ADD COLUMN `doctor_name` VARCHAR(191) NOT NULL;
