/*
  Warnings:

  - Added the required column `isWaiting` to the `IpdInvestigation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lab_name` to the `IpdInvestigation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ipdinvestigation` ADD COLUMN `isWaiting` BOOLEAN NOT NULL,
    ADD COLUMN `lab_name` VARCHAR(191) NOT NULL;
