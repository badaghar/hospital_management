/*
  Warnings:

  - You are about to drop the column `compositionId` on the `product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[productId,batch]` on the table `Medicine` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[compositionId,productId]` on the table `ProductToComposition` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `exp` to the `Medicine` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_compositionId_fkey`;

-- AlterTable
ALTER TABLE `medicine` ADD COLUMN `exp` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `compositionId`;

-- CreateIndex
CREATE UNIQUE INDEX `Medicine_productId_batch_key` ON `Medicine`(`productId`, `batch`);

-- CreateIndex
CREATE UNIQUE INDEX `ProductToComposition_compositionId_productId_key` ON `ProductToComposition`(`compositionId`, `productId`);
