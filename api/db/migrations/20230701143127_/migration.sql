/*
  Warnings:

  - Added the required column `summary` to the `IpdSummary` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ipdsummary` ADD COLUMN `summary` JSON NOT NULL;
