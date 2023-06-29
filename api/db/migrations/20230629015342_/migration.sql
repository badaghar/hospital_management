/*
  Warnings:

  - Added the required column `date` to the `IpdChat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dose` to the `IpdChat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `drug` to the `IpdChat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `route` to the `IpdChat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ipdchat` ADD COLUMN `date` DATETIME(3) NOT NULL,
    ADD COLUMN `dose` VARCHAR(191) NOT NULL,
    ADD COLUMN `drug` VARCHAR(191) NOT NULL,
    ADD COLUMN `route` VARCHAR(191) NOT NULL;
