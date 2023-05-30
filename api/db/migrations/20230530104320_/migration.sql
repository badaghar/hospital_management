/*
  Warnings:

  - A unique constraint covering the columns `[invoiceNo]` on the table `PurchaseMedicine` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE `PaymentPurchaseMedicine` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `purchaseMedicineId` INTEGER NOT NULL,
    `total` DOUBLE NOT NULL,
    `balance` DOUBLE NOT NULL,
    `paid` DOUBLE NOT NULL,
    `method` VARCHAR(191) NOT NULL,
    `remark` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `PurchaseMedicine_invoiceNo_key` ON `PurchaseMedicine`(`invoiceNo`);

-- AddForeignKey
ALTER TABLE `PaymentPurchaseMedicine` ADD CONSTRAINT `PaymentPurchaseMedicine_purchaseMedicineId_fkey` FOREIGN KEY (`purchaseMedicineId`) REFERENCES `PurchaseMedicine`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
