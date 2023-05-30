/*
  Warnings:

  - A unique constraint covering the columns `[purchaseMedicineId]` on the table `PaymentPurchaseMedicine` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `PaymentPurchaseMedicine_purchaseMedicineId_key` ON `PaymentPurchaseMedicine`(`purchaseMedicineId`);
