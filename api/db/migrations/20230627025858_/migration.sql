/*
  Warnings:

  - You are about to drop the column `amount` on the `operation` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Operation` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `operation` DROP COLUMN `amount`;

-- CreateIndex
CREATE UNIQUE INDEX `Operation_name_key` ON `Operation`(`name`);
