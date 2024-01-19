/*
  Warnings:

  - Made the column `extra` on table `ipd` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `ipd` MODIFY `extra` JSON NOT NULL;
