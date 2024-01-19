/*
  Warnings:

  - Added the required column `isWaiting` to the `Ipd` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ipd` ADD COLUMN `isWaiting` BOOLEAN NOT NULL;
