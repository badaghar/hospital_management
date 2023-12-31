/*
  Warnings:

  - Added the required column `no` to the `HomoMedicine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `potency` to the `HomoMedicine` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `homomedicine` ADD COLUMN `no` VARCHAR(191) NOT NULL,
    ADD COLUMN `potency` VARCHAR(191) NOT NULL;
